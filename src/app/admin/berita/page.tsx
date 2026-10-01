'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Berita } from '@/types';
import { getStoredBerita, saveBeritaList } from '@/lib/store';
import {
  Newspaper,
  PlusCircle,
  Search,
  Trash2,
  ExternalLink,
  CheckCircle,
  Filter,
} from 'lucide-react';

export default function AdminBeritaPage() {
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    setBeritaList(getStoredBerita());
  }, []);

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      const updated = beritaList.filter((b) => b.id !== id);
      setBeritaList(updated);
      saveBeritaList(updated);
      setDeleteSuccess(true);
      setTimeout(() => setDeleteSuccess(false), 3000);
    }
  };

  const filtered = beritaList.filter((b) => {
    const matchCat = filterCategory === 'Semua' || b.kategori === filterCategory;
    const matchSearch =
      b.judul.toLowerCase().includes(search.toLowerCase()) ||
      b.instansi.toLowerCase().includes(search.toLowerCase()) ||
      b.pembuat.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen flex bg-black text-white font-sans selection:bg-black selection:text-white">
      <AdminSidebar />

      <main className="flex-1 bg-zinc-50 text-zinc-950 overflow-y-auto p-6 sm:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 mb-8">
          <div>
            <div className="flex items-center gap-2 text-zinc-800 text-xs font-black uppercase tracking-wider mb-1">
              <Newspaper className="w-4 h-4 text-black" />
              <span>Manajemen Konten Publikasi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-black">
              Kelola Berita & Informasi
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Publikasikan berita baru, perbarui artikel eksisting, atau kelola status penayangan.
            </p>
          </div>

          <Link
            href="/admin/berita/tambah"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition transform hover:-translate-y-0.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tambah Berita Baru</span>
          </Link>
        </div>

        {deleteSuccess && (
          <div className="mb-6 p-4 bg-zinc-900 border border-zinc-800 text-white rounded-2xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-zinc-300" />
            <span>Berita berhasil dihapus dari database!</span>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-3xl border border-zinc-200 shadow-xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul, instansi, penulis..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Filter className="w-4 h-4 text-zinc-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold text-zinc-800 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="Semua">Semua Kategori</option>
              <option value="Pendidikan">Pendidikan</option>
              <option value="Teknologi">Teknologi</option>
              <option value="Pemerintahan">Pemerintahan</option>
              <option value="Kesehatan">Kesehatan</option>
              <option value="Sosial">Sosial</option>
              <option value="Layanan Publik">Layanan Publik</option>
            </select>
          </div>
        </div>

        {/* Table of News */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase text-[10px] font-bold tracking-wider">
                  <th className="py-3.5 px-4">Thumbnail & Judul</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4">Instansi & Penulis</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Views</th>
                  <th className="py-3.5 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-zinc-400">
                      Tidak ada berita yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  filtered.map((news) => (
                    <tr key={news.id} className="hover:bg-zinc-50 transition">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0 border border-zinc-200">
                            <Image
                              src={news.gambar || '/images/image.png'}
                              alt={news.judul}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-zinc-900 line-clamp-1 max-w-sm block">
                              {news.judul}
                            </span>
                            <span className="text-[11px] text-zinc-400 font-mono mt-0.5 block">
                              {new Date(news.createdAt).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded bg-zinc-100 text-zinc-900 border border-zinc-200 font-bold text-[10px]">
                          {news.kategori}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-bold text-zinc-900">{news.pembuat || 'Admin'}</p>
                        <p className="text-[10px] text-zinc-400 line-clamp-1">{news.instansi}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded bg-black text-white font-bold text-[10px]">
                          {news.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-bold text-zinc-900">{news.views}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            href={`/berita/${news.id}`}
                            target="_blank"
                            title="Pratinjau Halaman Publik"
                            className="p-2 text-black hover:bg-zinc-100 rounded-xl transition border border-zinc-200"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(news.id)}
                            title="Hapus Berita"
                            className="p-2 text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-xl transition cursor-pointer border border-zinc-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

