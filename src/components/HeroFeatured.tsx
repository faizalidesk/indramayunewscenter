import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { Berita } from '@/types';

interface HeroFeaturedProps {
  featured: Berita;
  trending: Berita[];
}

export const HeroFeatured: React.FC<HeroFeaturedProps> = ({ featured, trending }) => {
  if (!featured) return null;

  const formattedDate = new Date(featured.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Main Big Feature (8 Cols) */}
        <div className="lg:col-span-8 relative rounded-3xl overflow-hidden shadow-xl group min-h-[420px] lg:min-h-[480px] flex flex-col justify-end bg-black border border-zinc-800">
          <Image
            src={featured.gambar || '/images/image.png'}
            alt={featured.judul}
            fill
            priority
            className="object-cover group-hover:scale-105 transition duration-700 opacity-60 grayscale group-hover:grayscale-0"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

          <div className="relative z-10 p-6 sm:p-8 lg:p-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white text-black text-xs font-black tracking-wider uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                Berita Utama
              </span>
              <span className="px-3 py-1 rounded-md bg-zinc-900/90 border border-zinc-700 text-zinc-200 text-xs font-semibold backdrop-blur-md">
                {featured.kategori}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                <span>{formattedDate}</span>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight drop-shadow-sm group-hover:text-zinc-200 transition">
              <Link href={`/berita/${featured.id}`}>{featured.judul}</Link>
            </h2>

            <p className="text-zinc-300 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 max-w-3xl leading-relaxed">
              {featured.isi.replace(/\\r|\\n/g, ' ')}
            </p>

            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold border border-zinc-700">
                  <User className="w-3.5 h-3.5 text-zinc-300" />
                </div>
                <div>
                  <p className="font-bold text-white">{featured.pembuat || 'Redaksi'}</p>
                  <p className="text-[11px] text-zinc-400">{featured.instansi}</p>
                </div>
              </div>

              <Link
                href={`/berita/${featured.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs sm:text-sm font-bold shadow-lg transition transform hover:-translate-y-0.5"
              >
                <span>Baca Lengkap</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Side Trending Spotlight (4 Cols) */}
        <div className="lg:col-span-4 bg-zinc-950 text-white rounded-3xl p-6 border border-zinc-800 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-4">
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 text-zinc-400" />
                <span>Trending Terkini</span>
              </div>
              <span className="text-[10px] font-bold bg-zinc-900 text-zinc-300 px-2 py-0.5 rounded border border-zinc-700">
                Terpopuler
              </span>
            </div>

            <div className="space-y-4">
              {trending.slice(0, 3).map((item, index) => (
                <Link
                  key={item.id}
                  href={`/berita/${item.id}`}
                  className="group flex items-start gap-3.5 p-2.5 rounded-2xl hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition"
                >
                  <span className="text-xl font-black text-zinc-600 group-hover:text-white transition">
                    0{index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">
                      {item.kategori}
                    </span>
                    <h4 className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-white line-clamp-2 leading-snug">
                      {item.judul}
                    </h4>
                    <span className="text-[11px] text-zinc-500 mt-1 block">
                      {item.views} pembaca
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800">
            <Link
              href="/berita"
              className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              <span>Jelajahi Semua Arsip Berita</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

