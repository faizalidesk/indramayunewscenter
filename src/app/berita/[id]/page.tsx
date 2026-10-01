'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CommentSection } from '@/components/CommentSection';
import { NewsCard } from '@/components/NewsCard';
import { Berita } from '@/types';
import { getStoredBerita, saveBeritaList } from '@/lib/store';
import {
  Calendar,
  Eye,
  User,
  Building2,
  Share2,
  ArrowLeft,
  Bookmark,
  Check,
} from 'lucide-react';

export default function BeritaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const idStr = params.id as string;
  const beritaId = parseInt(idStr, 10);

  const [berita, setBerita] = useState<Berita | null>(null);
  const [relatedList, setRelatedList] = useState<Berita[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const list = getStoredBerita();
    const found = list.find((b) => b.id === beritaId);

    if (found) {
      // Increment views count locally
      const updatedList = list.map((item) =>
        item.id === beritaId ? { ...item, views: item.views + 1 } : item
      );
      saveBeritaList(updatedList);
      setBerita({ ...found, views: found.views + 1 });

      // Related news from same category or random
      const related = list
        .filter((b) => b.id !== beritaId)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      setRelatedList(related);
    }
  }, [beritaId]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (!berita) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-xl font-bold text-slate-800">Memuat artikel...</h2>
          <p className="text-xs text-slate-500 mt-2">Sedang mengambil data berita dari portal</p>
          <button
            onClick={() => router.push('/berita')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold"
          >
            Kembali ke Katalog
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const formattedDate = new Date(berita.createdAt).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Berita</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition cursor-pointer shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Tautan Tersalin!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Bagikan</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article Content (8 Cols) */}
          <article className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs">
            {/* Header / Meta */}
            <div className="space-y-4 mb-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                  {berita.kategori}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                  {berita.status}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                {berita.judul}
              </h1>

              {/* Author & Timestamp Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    {berita.pembuat ? berita.pembuat.charAt(0) : 'A'}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{berita.pembuat || 'Admin Diskominfo'}</p>
                    <p className="text-slate-400 flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      {berita.instansi}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    {formattedDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    {berita.views} kali dilihat
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {berita.gambar && (
              <div className="relative w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden mb-8 bg-slate-100 border border-slate-200 shadow-xs">
                <Image
                  src={berita.gambar}
                  alt={berita.judul}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>
            )}

            {/* Article Text Content */}
            <div className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-5">
              {berita.isi.split(/\r?\n\r?\n/).map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags & Footer Info */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-700">Topik:</span>
                <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700">
                  #{berita.kategori}
                </span>
                <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700">
                  #Indramayu
                </span>
                <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700">
                  #Diskominfo
                </span>
              </div>
            </div>

            {/* Interactive Comment Section */}
            <CommentSection beritaId={berita.id} />
          </article>

          {/* Sidebar / Related Articles (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100 mb-4 uppercase tracking-wider">
                Berita Terkait
              </h3>
              <div className="space-y-3">
                {relatedList.map((rel) => (
                  <NewsCard key={rel.id} news={rel} layout="compact" />
                ))}
              </div>
            </div>

            {/* Survey Quick Callout Box */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-6 shadow-md border border-blue-800 space-y-3">
              <h4 className="font-bold text-base">Evaluasi Pelayanan Kami</h4>
              <p className="text-xs text-blue-200 leading-relaxed">
                Bagaimana penilaian Anda terhadap kemudahan akses dan akurasi informasi yang disajikan di portal ini?
              </p>
              <Link
                href="/survei"
                className="block w-full py-2.5 text-center bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs rounded-xl transition"
              >
                Isi Survei 1 Menit
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
