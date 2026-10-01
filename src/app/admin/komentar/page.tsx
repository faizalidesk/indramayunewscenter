'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Komentar, Berita } from '@/types';
import { getStoredKomentar, getStoredBerita, saveKomentarList } from '@/lib/store';
import { MessageSquare, Trash2, Search, ExternalLink, CheckCircle } from 'lucide-react';

export default function AdminKomentarPage() {
  const [komentarList, setKomentarList] = useState<Komentar[]>([]);
  const [beritaList, setBeritaList] = useState<Berita[]>([]);
  const [search, setSearch] = useState('');
  const [deletedMsg, setDeletedMsg] = useState(false);

  useEffect(() => {
    setKomentarList(getStoredKomentar());
    setBeritaList(getStoredBerita());
  }, []);

  const handleDelete = (id: number) => {
    if (confirm('Hapus komentar ini?')) {
      const updated = komentarList.filter((k) => k.id !== id);
      setKomentarList(updated);
      saveKomentarList(updated);
      setDeletedMsg(true);
      setTimeout(() => setDeletedMsg(false), 3000);
    }
  };

  const getBeritaJudul = (beritaId: number) => {
    const found = beritaList.find((b) => b.id === beritaId);
    return found ? found.judul : `Artikel #${beritaId}`;
  };

  const filtered = komentarList.filter(
    (k) =>
      k.nama.toLowerCase().includes(search.toLowerCase()) ||
      k.isi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-black text-white font-sans selection:bg-black selection:text-white">
      <AdminSidebar />

      <main className="flex-1 bg-zinc-50 text-zinc-950 overflow-y-auto p-6 sm:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 mb-8">
          <div>
            <div className="flex items-center gap-2 text-zinc-800 text-xs font-black uppercase tracking-wider mb-1">
              <MessageSquare className="w-4 h-4 text-black" />
              <span>Interaksi Masyarakat</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-black">
              Moderasi Komentar Artikel
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Pantau dan moderasi komentar masyarakat yang masuk pada seluruh artikel berita.
            </p>
          </div>
        </div>

        {deletedMsg && (
          <div className="mb-6 p-4 bg-zinc-900 border border-zinc-800 text-white rounded-2xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-zinc-300" />
            <span>Komentar berhasil dihapus!</span>
          </div>
        )}

        {/* Search */}
        <div className="bg-white p-4 rounded-3xl border border-zinc-200 shadow-xs mb-6 max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari pengirim atau isi komentar..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white"
            />
          </div>
        </div>

        {/* Comments Table */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase text-[10px] font-bold tracking-wider">
                  <th className="py-3.5 px-4">Pengirim Komentar</th>
                  <th className="py-3.5 px-4">Isi Tanggapan</th>
                  <th className="py-3.5 px-4">Pada Artikel</th>
                  <th className="py-3.5 px-4">Waktu</th>
                  <th className="py-3.5 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-zinc-400">
                      Tidak ada komentar yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-50 transition">
                      <td className="py-4 px-4 font-bold text-zinc-900 flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {item.nama.charAt(0).toUpperCase()}
                        </div>
                        <span>{item.nama}</span>
                      </td>
                      <td className="py-4 px-4 text-zinc-700 max-w-sm">
                        <p className="line-clamp-2 leading-relaxed">{item.isi}</p>
                      </td>
                      <td className="py-4 px-4 text-black font-bold max-w-xs">
                        <Link
                          href={`/berita/${item.beritaId}`}
                          target="_blank"
                          className="hover:underline flex items-center gap-1 line-clamp-1"
                        >
                          <span className="truncate">{getBeritaJudul(item.beritaId)}</span>
                          <ExternalLink className="w-3 h-3 flex-shrink-0 text-zinc-400" />
                        </Link>
                      </td>
                      <td className="py-4 px-4 text-zinc-400 font-mono text-[11px] whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => handleDelete(item.id)}
                          title="Hapus Komentar Ini"
                          className="p-2 text-zinc-500 hover:text-black hover:bg-zinc-100 rounded-xl transition cursor-pointer border border-zinc-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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

