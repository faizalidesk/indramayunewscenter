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
import { Sparkles, ArrowRight, BarChart3 } from 'lucide-react';

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

        {/* Category Pill Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-zinc-600 font-extrabold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-black" />
              <span>Publikasi & Informasi Terkini</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-black">
              Kabar Indramayu Hari Ini
            </h2>
          </div>

          <Link
            href="/berita"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:text-zinc-600 transition"
          >
            <span>Buka Seluruh Arsip</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* Grid List of News */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-zinc-200 p-8">
            <p className="text-zinc-500 text-sm font-medium">
              Tidak ada berita yang sesuai dengan kategori atau pencarian &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Semua');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2.5 bg-black text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        )}

        {/* Survey Callout Banner */}
        <section className="mt-16 bg-black text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl border border-zinc-800">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white text-black text-[10px] font-black uppercase tracking-wider">
              Suara Anda Berarti
            </span>
            <h3 className="text-2xl sm:text-3xl font-black leading-tight text-white">
              Bantu Kami Meningkatkan Kualitas Portal Informasi & Layanan Publik
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Ikuti survei kepuasan pengunjung cepat (10 pertanyaan) untuk memberikan penilaian atas akurasi berita, kemudahan navigasi, dan transparansi portal Diskominfo.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/survei"
                className="px-6 py-3 bg-white text-black hover:bg-zinc-200 font-bold text-xs sm:text-sm rounded-xl transition shadow-lg inline-flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4 text-black" />
                <span>Mulai Isi Survei Sekarang</span>
              </Link>
              <Link
                href="/admin/survei"
                className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm rounded-xl transition border border-zinc-800"
              >
                Lihat Hasil Survei
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

