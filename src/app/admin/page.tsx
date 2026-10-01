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
    <div className="min-h-screen flex bg-slate-900 text-slate-100 font-sans">
      {/* Sidebar Navigation */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 bg-slate-50 text-slate-900 overflow-y-auto p-6 sm:p-10">
        {/* Top bar header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
          <div>
            <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Pusat Kendali Portal Berita</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Dashboard Administrator
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Pantau performa artikel, moderasi interaksi, dan analisis survei kepuasan masyarakat.
            </p>
          </div>

          <Link
            href="/admin/berita/tambah"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-blue-500/20 transition transform hover:-translate-y-0.5 self-start sm:self-center"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tulis Berita Baru</span>
          </Link>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Card 1 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Artikel
              </p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{beritaList.length}</h3>
              <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>Terbit Aktif</span>
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Newspaper className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Pembaca
              </p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{totalViews}</h3>
              <p className="text-[11px] text-slate-400 font-medium mt-1">Akumulasi views</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Komentar
              </p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{komentarList.length}</h3>
              <p className="text-[11px] text-slate-400 font-medium mt-1">Aspirasi publik</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Responden Survei
              </p>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{surveiList.length}</h3>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">10 Indikator</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Analisis Survei Kepuasan</h2>
              <p className="text-xs text-slate-500">
                Visualisasi respon pengunjung terhadap keterbukaan & layanan informasi
              </p>
            </div>
            <Link
              href="/admin/survei"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>Detail Laporan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <SurveyCharts surveiData={surveiList} />
        </div>

        {/* Recent News Quick Table */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Berita Terbaru yang Diterbitkan</h3>
              <p className="text-xs text-slate-400">Daftar artikel aktif di portal publik</p>
            </div>
            <Link
              href="/admin/berita"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>Kelola Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-3">Judul Berita</th>
                  <th className="py-3 px-3">Kategori</th>
                  <th className="py-3 px-3">Instansi / Penulis</th>
                  <th className="py-3 px-3">Tanggal</th>
                  <th className="py-3 px-3">Views</th>
                  <th className="py-3 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {beritaList.slice(0, 5).map((news) => (
                  <tr key={news.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                          <Image
                            src={news.gambar || '/images/image.png'}
                            alt={news.judul}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <span className="font-semibold text-slate-800 line-clamp-1 max-w-xs">
                          {news.judul}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold text-[11px]">
                        {news.kategori}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-600">
                      <p className="font-medium text-slate-800">{news.pembuat || 'Faiz Ali'}</p>
                      <p className="text-[10px] text-slate-400">{news.instansi}</p>
                    </td>
                    <td className="py-3.5 px-3 text-slate-500">
                      {new Date(news.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-700">{news.views}</td>
                    <td className="py-3.5 px-3 text-right">
                      <Link
                        href={`/berita/${news.id}`}
                        target="_blank"
                        className="px-2.5 py-1 text-[11px] font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition"
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
