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
  Building2,
  Share2,
  ArrowLeft,
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
      <div className="min-h-screen flex flex-col bg-zinc-50">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-xl font-bold text-zinc-800">Memuat artikel...</h2>
          <p className="text-xs text-zinc-500 mt-2">Sedang mengambil data berita dari portal</p>
          <button
            onClick={() => router.push('/berita')}
            className="mt-4 px-5 py-2.5 bg-black text-white rounded-xl text-xs font-bold"
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
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-950 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 hover:text-black transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Berita</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-zinc-800 hover:border-black text-xs font-bold transition cursor-pointer shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-black" />
                  <span className="text-black">Tautan Tersalin!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Bagikan</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article Content (8 Cols) */}
          <article className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200 shadow-xs">
            {/* Header / Meta */}
            <div className="space-y-4 mb-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-black text-white text-xs font-black uppercase tracking-wider">
                  {berita.kategori}
                </span>
                <span className="px-3 py-1 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-bold">
                  {berita.status}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black leading-tight">
                {berita.judul}
              </h1>

              {/* Author & Timestamp Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-100 text-xs text-zinc-500">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-black text-sm">
                    {berita.pembuat ? berita.pembuat.charAt(0) : 'A'}
                  </div>
                  <div>
                    <p className="font-bold text-black">{berita.pembuat || 'Admin Diskominfo'}</p>
                    <p className="text-zinc-400 flex items-center gap-1 font-medium">
                      <Building2 className="w-3 h-3 text-zinc-400" />
                      {berita.instansi}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                    {formattedDate}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Eye className="w-3.5 h-3.5 text-zinc-400" />
                    {berita.views} kali dilihat
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {berita.gambar && (
              <div className="relative w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden mb-8 bg-zinc-100 border border-zinc-200 shadow-xs">
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
            <div className="prose prose-zinc max-w-none text-zinc-800 text-sm sm:text-base leading-relaxed space-y-5">
              {berita.isi.split(/\r?\n\r?\n/).map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags & Footer Info */}
            <div className="mt-10 pt-6 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="font-bold text-zinc-800">Topik:</span>
                <span className="px-2.5 py-1 bg-zinc-100 border border-zinc-200 rounded-lg text-zinc-800 font-medium">
                  #{berita.kategori}
                </span>
                <span className="px-2.5 py-1 bg-zinc-100 border border-zinc-200 rounded-lg text-zinc-800 font-medium">
                  #Indramayu
                </span>
                <span className="px-2.5 py-1 bg-zinc-100 border border-zinc-200 rounded-lg text-zinc-800 font-medium">
                  #Diskominfo
                </span>
              </div>
            </div>

            {/* Interactive Comment Section */}
            <CommentSection beritaId={berita.id} />
          </article>

          {/* Sidebar / Related Articles (4 Cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-xs">
              <h3 className="text-xs font-black text-black pb-3 border-b border-zinc-100 mb-4 uppercase tracking-wider">
                Berita Terkait
              </h3>
              <div className="space-y-3">
                {relatedList.map((rel) => (
                  <NewsCard key={rel.id} news={rel} layout="compact" />
                ))}
              </div>
            </div>

            {/* Survey Quick Callout Box */}
            <div className="bg-black text-white rounded-3xl p-6 shadow-xl border border-zinc-800 space-y-3">
              <h4 className="font-black text-base">Evaluasi Pelayanan Kami</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Bagaimana penilaian Anda terhadap kemudahan akses dan akurasi informasi yang disajikan di portal ini?
              </p>
              <Link
                href="/survei"
                className="block w-full py-2.5 text-center bg-white hover:bg-zinc-200 text-black font-extrabold text-xs rounded-xl transition"
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

