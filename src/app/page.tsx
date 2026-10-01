'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroFeatured } from '@/components/HeroFeatured';
import { NewsCard } from '@/components/NewsCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { Berita } from '@/types';
import { getStoredBerita } from '@/lib/store';
import { Sparkles, ArrowRight, BarChart3, Newspaper, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setBeritaList(getStoredBerita());
  }, []);

  // Filter logic
  const filtered = beritaList.filter((b) => {
    const matchCategory = selectedCategory === 'Semua' || b.kategori === selectedCategory;
    const matchQuery =
      b.judul.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.isi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.kategori.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery && b.status === 'Published';
  });

  const featured = beritaList.find((b) => b.isUtama) || beritaList[0];
  const trending = [...beritaList].sort((a, b) => b.views - a.views);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-950 font-sans selection:bg-black selection:text-white">
      <Navbar onSearch={(q) => setSearchQuery(q)} searchQuery={searchQuery} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* If no search query, show the hero spotlight */}
        {!searchQuery && selectedCategory === 'Semua' && featured && (
          <HeroFeatured featured={featured} trending={trending} />
        )}

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <div className="flex items-center gap-2 text-zinc-600 font-extrabold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Publikasi & Informasi Terkini</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-black">
              {searchQuery ? `Hasil Pencarian: "${searchQuery}"` : 'Kabar Indramayu Hari Ini'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500 font-medium hidden sm:inline-block">
              Menampilkan {filtered.length} artikel
            </span>
            <Link
              href="/berita"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-zinc-200 hover:border-black text-xs font-bold text-black transition shadow-xs"
            >
              <span>Buka Seluruh Arsip</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Category Pill Filters */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* Grid List of News */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-zinc-200 p-8 shadow-xs max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center mx-auto mb-3 text-zinc-400">
              <Newspaper className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-zinc-900 text-sm">Tidak Ditemukan Berita</h3>
            <p className="text-zinc-500 text-xs mt-1">
              Tidak ada berita yang sesuai dengan kategori atau kata kunci &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Semua');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2.5 bg-black text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition cursor-pointer"
            >
              Reset Filter & Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filtered.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        )}

        {/* Survey Callout Banner (Symmetrically Balanced) */}
        <section className="mt-16 bg-black text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-zinc-900">
          <div className="max-w-3xl mx-auto text-center space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white text-black text-[10px] font-black uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Survei Partisipasi Publik
            </span>
            <h3 className="text-2xl sm:text-3xl font-black leading-tight text-white">
              Bantu Kami Meningkatkan Kualitas Informasi & Layanan Indramayu News Center
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Ikuti survei kepuasan pengunjung ringkas (10 pertanyaan) untuk memberikan masukan atas transparansi, akurasi pemberitaan, dan kemudahan akses portal.
            </p>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/survei"
                className="px-6 py-3 bg-white text-black hover:bg-zinc-200 font-bold text-xs sm:text-sm rounded-xl transition shadow-md inline-flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4 text-black" />
                <span>Mulai Isi Survei Sekarang</span>
              </Link>
              <Link
                href="/admin/survei"
                className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm rounded-xl transition border border-zinc-800"
              >
                Lihat Rekapitulasi Survei
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
