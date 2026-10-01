'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Berita } from '@/types';
import { getStoredBerita, saveBeritaList } from '@/lib/store';
import {
  ArrowLeft,
  Save,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function TambahBeritaPage() {
  const router = useRouter();

  const [instansi, setInstansi] = useState('Indramayu News Center');
  const [pembuat, setPembuat] = useState('Faiz Ali');
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('Teknologi');
  const [isi, setIsi] = useState('');
  const [gambar, setGambar] = useState('/images/1748834703_IMG-20220208-WA0009.jpg');
  const [status, setStatus] = useState<'Published' | 'Pending' | 'Draft'>('Published');
  const [isUtama, setIsUtama] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Available image presets for easy selection
  const imagePresets = [
    { label: 'Bank Sampah / Edukasi', path: '/images/1748834703_IMG-20220208-WA0009.jpg' },
    { label: 'Smart City / Evaluasi', path: '/images/1748835150_WhatsApp-Image-2019-06-18-at-15.06.19.jpeg' },
    { label: 'Tari Tradisional / Seni', path: '/images/dancer1.jpg' },
    { label: 'Kesehatan / Puskesmas', path: '/images/pkk.jpg' },
    { label: 'Pelayanan Publik / KTP', path: '/images/buatkartu.jpg' },
    { label: 'UMKM / Produk Lokal', path: '/images/LOKAL.png' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul.trim() || !isi.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newBerita: Berita = {
        id: Date.now(),
        instansi,
        pembuat,
        judul: judul.trim(),
        kategori,
        isi: isi.trim(),
        status,
        gambar,
        isUtama,
        views: 1,
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      };

      const existing = getStoredBerita();
      // If marked as utama, remove previous isUtama flag
      const updated = isUtama
        ? [newBerita, ...existing.map((b) => ({ ...b, isUtama: false }))]
        : [newBerita, ...existing];

      saveBeritaList(updated);
      setIsSubmitting(false);
      setSuccess(true);

      setTimeout(() => {
        router.push('/admin/berita');
      }, 1500);
    }, 600);
  };

  return (
    <div className="min-h-screen flex bg-black text-white font-sans selection:bg-black selection:text-white">
      <AdminSidebar />

      <main className="flex-1 bg-zinc-50 text-zinc-950 overflow-y-auto p-6 sm:p-10">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/admin/berita"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-black transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Berita</span>
          </Link>
        </div>

        <div className="max-w-4xl bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200 shadow-sm">
          <div className="pb-6 border-b border-zinc-100 mb-8">
            <div className="flex items-center gap-2 text-zinc-800 text-xs font-black uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-black" />
              <span>Publikasi Baru</span>
            </div>
            <h1 className="text-2xl font-black text-black">
              Tulis & Terbitkan Berita Baru
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Lengkapi informasi artikel berikut untuk ditayangkan pada portal publik Indramayu News Center.
            </p>
          </div>

          {success && (
            <div className="mb-6 p-4 bg-zinc-900 border border-zinc-800 text-white rounded-2xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-zinc-300" />
              <span>Berita berhasil diterbitkan! Mengalihkan ke halaman daftar...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Judul Berita */}
            <div>
              <label className="block text-xs font-bold text-zinc-900 mb-1.5">
                Judul Berita / Tajuk Utama <span className="text-black">*</span>
              </label>
              <input
                type="text"
                required
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Masukkan judul berita yang menarik dan informatif..."
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-xs sm:text-sm font-bold text-zinc-900 focus:bg-white focus:ring-2 focus:ring-black focus:border-black focus:outline-none transition"
              />
            </div>

            {/* Grid 2 Kolom: Kategori & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-900 mb-1.5">
                  Kategori Berita <span className="text-black">*</span>
                </label>
                <select
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-xs sm:text-sm font-semibold text-zinc-800 focus:bg-white focus:ring-2 focus:ring-black focus:outline-none transition"
                >
                  <option value="Teknologi">Teknologi</option>
                  <option value="Pendidikan">Pendidikan</option>
                  <option value="Pemerintahan">Pemerintahan</option>
                  <option value="Kesehatan">Kesehatan</option>
                  <option value="Sosial">Sosial</option>
                  <option value="Layanan Publik">Layanan Publik</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-900 mb-1.5">
                  Status Penayangan
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-xs sm:text-sm font-semibold text-zinc-800 focus:bg-white focus:ring-2 focus:ring-black focus:outline-none transition"
                >
                  <option value="Published">Published (Langsung Terbit)</option>
                  <option value="Pending">Pending (Menunggu Persetujuan)</option>
                  <option value="Draft">Draft (Simpan Konsep)</option>
                </select>
              </div>
            </div>

            {/* Grid 2 Kolom: Instansi & Penulis */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-900 mb-1.5">
                  Instansi / Sumber Rilis
                </label>
                <input
                  type="text"
                  value={instansi}
                  onChange={(e) => setInstansi(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-xs sm:text-sm font-medium text-zinc-800 focus:bg-white focus:ring-2 focus:ring-black focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-900 mb-1.5">
                  Nama Penulis / Redaktur
                </label>
                <input
                  type="text"
                  value={pembuat}
                  onChange={(e) => setPembuat(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-xs sm:text-sm font-medium text-zinc-800 focus:bg-white focus:ring-2 focus:ring-black focus:outline-none transition"
                />
              </div>
            </div>

            {/* Pilihan Gambar Thumbnail */}
            <div>
              <label className="block text-xs font-bold text-zinc-900 mb-2">
                Pilih Gambar Sampul Artikel
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                {imagePresets.map((img) => {
                  const isChosen = gambar === img.path;
                  return (
                    <button
                      key={img.path}
                      type="button"
                      onClick={() => setGambar(img.path)}
                      className={`relative h-24 rounded-2xl overflow-hidden border-2 transition cursor-pointer text-left ${
                        isChosen ? 'border-black ring-2 ring-black/20' : 'border-zinc-200 hover:border-zinc-400'
                      }`}
                    >
                      <Image src={img.path} alt={img.label} fill className="object-cover" sizes="150px" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                        <span className="text-[10px] text-white font-bold leading-tight line-clamp-1">
                          {img.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={gambar}
                  onChange={(e) => setGambar(e.target.value)}
                  placeholder="Atau masukkan URL / path gambar..."
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-300 rounded-xl text-xs text-zinc-800 focus:bg-white focus:ring-2 focus:ring-black focus:outline-none transition"
                />
              </div>
            </div>

            {/* Checkbox Berita Utama */}
            <div className="flex items-center gap-2.5 p-3.5 bg-zinc-100 rounded-2xl border border-zinc-200">
              <input
                type="checkbox"
                id="isUtama"
                checked={isUtama}
                onChange={(e) => setIsUtama(e.target.checked)}
                className="w-4 h-4 text-black rounded border-zinc-300 focus:ring-black cursor-pointer"
              />
              <label htmlFor="isUtama" className="text-xs font-bold text-black cursor-pointer">
                Jadikan sebagai Berita Utama (Hero Spotlight di Halaman Depan)
              </label>
            </div>

            {/* Isi Artikel */}
            <div>
              <label className="block text-xs font-bold text-zinc-900 mb-1.5">
                Konten Lengkap Berita <span className="text-black">*</span>
              </label>
              <textarea
                required
                rows={8}
                value={isi}
                onChange={(e) => setIsi(e.target.value)}
                placeholder="Tuliskan isi berita secara lengkap di sini. Gunakan baris baru untuk memisahkan paragraf..."
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-xs sm:text-sm text-zinc-900 leading-relaxed focus:bg-white focus:ring-2 focus:ring-black focus:outline-none transition"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-zinc-100 flex items-center justify-end gap-3">
              <Link
                href="/admin/berita"
                className="px-5 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs sm:text-sm font-bold rounded-xl transition border border-zinc-200"
              >
                Batal
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-black hover:bg-zinc-800 text-white text-xs sm:text-sm font-black rounded-xl shadow-md transition cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSubmitting ? 'Menerbitkan...' : 'Terbitkan Artikel'}</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

