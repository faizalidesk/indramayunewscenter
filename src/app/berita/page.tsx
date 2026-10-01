'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { NewsCard } from '@/components/NewsCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { Berita } from '@/types';
import { getStoredBerita } from '@/lib/store';
import { Newspaper, Search, Grid, List } from 'lucide-react';

export default function BeritaCatalogPage() {
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'horizontal'>('grid');

  useEffect(() => {
    setBeritaList(getStoredBerita());
  }, []);

  const filtered = beritaList.filter((b) => {
    const matchCategory = selectedCategory === 'Semua' || b.kategori === selectedCategory;
    const matchQuery =
      b.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.isi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.kategori.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery && b.status === 'Published';
  });

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-950 font-sans">
      <Navbar onSearch={(q) => setSearchQuery(q)} searchQuery={searchQuery} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="bg-black text-white rounded-3xl p-8 sm:p-10 mb-8 border border-zinc-800 shadow-xl">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white text-black text-xs font-black uppercase tracking-wider">
              <Newspaper className="w-3.5 h-3.5 text-black" />
              <span>Arsip Publikasi & Berita Resmi</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Katalog Informasi Indramayu
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Jelajahi seluruh rilis berita, dokumentasi kegiatan, transparansi kebijakan, dan agenda pemerintah daerah.
            </p>
          </div>
        </div>

        {/* Filter & View Mode Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
          />

          <div className="flex items-center gap-2 self-end sm:self-center">
            <span className="text-xs text-zinc-500 font-bold">
              Menampilkan {filtered.length} artikel
            </span>
            <div className="flex items-center bg-white border border-zinc-200 rounded-xl p-1 shadow-xs">
              <button
                onClick={() => setLayoutMode('grid')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  layoutMode === 'grid' ? 'bg-black text-white' : 'text-zinc-500 hover:text-black'
                }`}
                title="Tampilan Kotak (Grid)"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutMode('horizontal')}
                className={`p-1.5 rounded-lg transition cursor-pointer ${
                  layoutMode === 'horizontal' ? 'bg-black text-white' : 'text-zinc-500 hover:text-black'
                }`}
                title="Tampilan Baris (List)"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* News List */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-zinc-200 p-8">
            <Search className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
            <p className="text-zinc-700 font-bold text-sm">
              Tidak ada berita yang ditemukan.
            </p>
            <p className="text-xs text-zinc-400 mt-1">
              Coba cari dengan kata kunci lain atau pilih kategori yang berbeda.
            </p>
          </div>
        ) : layoutMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((news) => (
              <NewsCard key={news.id} news={news} layout="grid" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((news) => (
              <NewsCard key={news.id} news={news} layout="horizontal" />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

