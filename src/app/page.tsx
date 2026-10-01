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
import { Sparkles, ArrowRight, CheckCircle2, MessageCircle, BarChart3 } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar onSearch={(q) => setSearchQuery(q)} searchQuery={searchQuery} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* If no search query, show the hero spotlight */}
        {!searchQuery && selectedCategory === 'Semua' && featured && (
          <HeroFeatured featured={featured} trending={trending} />
        )}

        {/* Category Pill Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Publikasi & Informasi Terkini</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Kabar Indramayu Hari Ini
            </h2>
          </div>

          <Link
            href="/berita"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
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
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <p className="text-slate-500 text-sm">
              Tidak ada berita yang sesuai dengan kategori atau pencarian &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Semua');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition"
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
        <section className="mt-16 bg-gradient-to-r from-blue-900 via-indigo-900 to-sky-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-blue-800">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider">
              Suara Anda Berarti
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Bantu Kami Meningkatkan Kualitas Portal Informasi & Layanan Publik
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Ikuti survei kepuasan pengunjung cepat (10 pertanyaan) untuk memberikan penilaian atas akurasi berita, kemudahan navigasi, dan transparansi portal Diskominfo.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/survei"
                className="px-6 py-3 bg-white text-blue-950 hover:bg-blue-50 font-bold text-xs sm:text-sm rounded-xl transition shadow-lg inline-flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4 text-blue-700" />
                <span>Mulai Isi Survei Sekarang</span>
              </Link>
              <Link
                href="/admin/survei"
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm rounded-xl transition"
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
