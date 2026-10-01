'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AdminSidebar } from '@/components/AdminSidebar';
import { SurveyCharts } from '@/components/SurveyCharts';
import { Berita, SurveiPengunjung, Komentar } from '@/types';
import { getStoredBerita, getStoredSurvei, getStoredKomentar } from '@/lib/store';
import {
  Newspaper,
  MessageSquare,
  BarChart3,
  Eye,
  PlusCircle,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [surveiList, setSurveiList] = useState<SurveiPengunjung[]>([]);
  const [komentarList, setKomentarList] = useState<Komentar[]>([]);

  useEffect(() => {
    setBeritaList(getStoredBerita());
    setSurveiList(getStoredSurvei());
    setKomentarList(getStoredKomentar());
  }, []);

  const totalViews = beritaList.reduce((acc, curr) => acc + (curr.views || 0), 0);

  return (
    <div className="min-h-screen flex bg-black text-white font-sans selection:bg-black selection:text-white">
      {/* Sidebar Navigation */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 bg-zinc-50 text-zinc-950 overflow-y-auto p-6 sm:p-10">
        {/* Top bar header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 mb-8">
          <div>
            <div className="flex items-center gap-2 text-zinc-800 text-xs font-black uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-black" />
              <span>Pusat Kendali Portal Berita</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-black">
              Dashboard Administrator
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Pantau performa artikel, moderasi interaksi, dan analisis survei kepuasan masyarakat.
            </p>
          </div>

          <Link
            href="/admin/berita/tambah"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition transform hover:-translate-y-0.5 self-start sm:self-center"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tulis Berita Baru</span>
          </Link>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Total Artikel
              </p>
              <h3 className="text-2xl font-black text-black mt-1">{beritaList.length}</h3>
              <p className="text-[11px] text-zinc-600 font-bold mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-black" />
                <span>Terbit Aktif</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-black border border-zinc-200 flex items-center justify-center">
              <Newspaper className="w-5 h-5" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Total Pembaca
              </p>
              <h3 className="text-2xl font-black text-black mt-1">{totalViews}</h3>
              <p className="text-[11px] text-zinc-400 font-medium mt-1">Akumulasi views</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-black border border-zinc-200 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Total Komentar
              </p>
              <h3 className="text-2xl font-black text-black mt-1">{komentarList.length}</h3>
              <p className="text-[11px] text-zinc-400 font-medium mt-1">Aspirasi publik</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-black border border-zinc-200 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-5 rounded-3xl border border-zinc-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Responden Survei
              </p>
              <h3 className="text-2xl font-black text-black mt-1">{surveiList.length}</h3>
              <p className="text-[11px] text-zinc-600 font-bold mt-1">10 Indikator</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-black border border-zinc-200 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-black text-black">Analisis Survei Kepuasan</h2>
              <p className="text-xs text-zinc-500">
                Visualisasi respon pengunjung terhadap keterbukaan & layanan informasi
              </p>
            </div>
            <Link
              href="/admin/survei"
              className="text-xs font-bold text-black hover:underline flex items-center gap-1"
            >
              <span>Detail Laporan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <SurveyCharts surveiData={surveiList} />
        </div>

        {/* Recent News Quick Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-4">
            <div>
              <h3 className="text-sm font-black text-black">Berita Terbaru yang Diterbitkan</h3>
              <p className="text-xs text-zinc-400">Daftar artikel aktif di portal publik</p>
            </div>
            <Link
              href="/admin/berita"
              className="text-xs font-bold text-black hover:underline flex items-center gap-1"
            >
              <span>Kelola Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-100 text-zinc-400 uppercase text-[10px] font-bold tracking-wider">
                  <th className="py-3 px-3">Judul Berita</th>
                  <th className="py-3 px-3">Kategori</th>
                  <th className="py-3 px-3">Instansi / Penulis</th>
                  <th className="py-3 px-3">Tanggal</th>
                  <th className="py-3 px-3">Views</th>
                  <th className="py-3 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {beritaList.slice(0, 5).map((news) => (
                  <tr key={news.id} className="hover:bg-zinc-50 transition">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0 border border-zinc-200">
                          <Image
                            src={news.gambar || '/images/image.png'}
                            alt={news.judul}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <span className="font-bold text-zinc-900 line-clamp-1 max-w-xs">
                          {news.judul}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2.5 py-0.5 rounded bg-zinc-100 text-zinc-900 border border-zinc-200 font-bold text-[10px]">
                        {news.kategori}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-zinc-600">
                      <p className="font-bold text-zinc-900">{news.pembuat || 'Faiz Ali'}</p>
                      <p className="text-[10px] text-zinc-400">{news.instansi}</p>
                    </td>
                    <td className="py-3.5 px-3 text-zinc-500 font-mono text-[11px]">
                      {new Date(news.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3.5 px-3 font-bold text-zinc-900">{news.views}</td>
                    <td className="py-3.5 px-3 text-right">
                      <Link
                        href={`/berita/${news.id}`}
                        target="_blank"
                        className="px-3 py-1 text-[11px] font-bold text-black bg-zinc-100 hover:bg-zinc-200 rounded-lg transition border border-zinc-200"
                      >
                        Lihat
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

