import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight, TrendingUp, Sparkles, Flame, Eye } from 'lucide-react';
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
        <div className="lg:col-span-8 relative rounded-3xl overflow-hidden shadow-sm group min-h-[440px] lg:min-h-[500px] flex flex-col justify-end bg-black border border-zinc-900">
          <Image
            src={featured.gambar || '/images/image.png'}
            alt={featured.judul}
            fill
            priority
            className="object-cover group-hover:scale-105 transition duration-700 opacity-65"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

          <div className="relative z-10 p-6 sm:p-8 lg:p-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white text-black text-xs font-black tracking-wider uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-black" />
                Berita Utama
              </span>
              <span className="px-3 py-1 rounded-lg bg-zinc-900/90 border border-zinc-700 text-zinc-200 text-xs font-semibold backdrop-blur-md">
                {featured.kategori}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-medium">
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

            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800/80">
              <div className="flex items-center gap-3 text-xs text-zinc-300">
                <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-black text-xs shadow-xs">
                  {featured.pembuat ? featured.pembuat.charAt(0) : 'R'}
                </div>
                <div>
                  <p className="font-bold text-white">{featured.pembuat || 'Redaksi Indramayu News Center'}</p>
                  <p className="text-[11px] text-zinc-400">{featured.instansi || 'Indramayu News Center'}</p>
                </div>
              </div>

              <Link
                href={`/berita/${featured.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs sm:text-sm font-bold shadow-md transition transform hover:-translate-y-0.5"
              >
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Side Trending Spotlight (4 Cols) */}
        <div className="lg:col-span-4 bg-white text-black rounded-3xl p-6 sm:p-7 border border-zinc-200 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-5">
              <div className="flex items-center gap-2 text-black font-black text-xs uppercase tracking-wider">
                <Flame className="w-4 h-4 text-black" />
                <span>Trending & Populer</span>
              </div>
              <span className="text-[10px] font-extrabold bg-black text-white px-2 py-0.5 rounded-md">
                Pilihan Warga
              </span>
            </div>

            <div className="space-y-4">
              {trending.slice(0, 3).map((item, index) => (
                <Link
                  key={item.id}
                  href={`/berita/${item.id}`}
                  className="group flex items-start gap-3.5 p-3 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-black transition duration-200"
                >
                  <span className="text-xl font-black text-zinc-400 group-hover:text-black transition flex-shrink-0 w-6">
                    0{index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">
                        {item.kategori}
                      </span>
                      <span className="text-[10px] text-zinc-400 flex items-center gap-1 font-mono">
                        <Eye className="w-3 h-3" />
                        {item.views}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-black line-clamp-2 leading-snug">
                      {item.judul}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-200">
            <Link
              href="/berita"
              className="w-full py-3 px-4 rounded-xl bg-black hover:bg-zinc-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition shadow-xs"
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
