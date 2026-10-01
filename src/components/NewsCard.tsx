import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Eye, User, ArrowUpRight } from 'lucide-react';
import { Berita } from '@/types';

interface NewsCardProps {
  news: Berita;
  layout?: 'grid' | 'horizontal' | 'compact';
}

export const NewsCard: React.FC<NewsCardProps> = ({ news, layout = 'grid' }) => {
  const formattedDate = new Date(news.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  if (layout === 'compact') {
    return (
      <Link
        href={`/berita/${news.id}`}
        className="group flex gap-3.5 items-center p-3.5 bg-white rounded-2xl border border-zinc-200 hover:border-black hover:shadow-xs transition"
      >
        <div className="relative w-20 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-zinc-100 border border-zinc-200">
          <Image
            src={news.gambar || '/images/image.png'}
            alt={news.judul}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
            sizes="80px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-800 border border-zinc-200">
              {news.kategori}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">{formattedDate}</span>
          </div>
          <h4 className="text-xs font-bold text-zinc-900 line-clamp-2 group-hover:text-black transition leading-snug">
            {news.judul}
          </h4>
        </div>
      </Link>
    );
  }

  if (layout === 'horizontal') {
    return (
      <Link
        href={`/berita/${news.id}`}
        className="group flex flex-col sm:flex-row gap-5 p-5 bg-white rounded-3xl border border-zinc-200 hover:border-black hover:shadow-md transition duration-300"
      >
        <div className="relative w-full sm:w-60 h-44 rounded-2xl overflow-hidden flex-shrink-0 bg-zinc-100 border border-zinc-200">
          <Image
            src={news.gambar || '/images/image.png'}
            alt={news.judul}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
            sizes="(max-width: 640px) 100vw, 240px"
          />
          <span className="absolute top-3 left-3 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md bg-black text-white shadow-xs uppercase tracking-wider">
            {news.kategori}
          </span>
        </div>
        <div className="flex flex-col justify-between flex-1 py-1">
          <div>
            <div className="flex items-center gap-3 text-xs text-zinc-400 mb-2">
              <span className="flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                {formattedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-zinc-400" />
                {news.pembuat || 'Admin'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-zinc-400" />
                {news.views} views
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-black transition line-clamp-2 mb-2 leading-snug">
              {news.judul}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 line-clamp-2 leading-relaxed">
              {news.isi.replace(/\\r|\\n/g, ' ')}
            </p>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs font-bold text-black group-hover:translate-x-1 transition duration-200">
            <span>Baca Selengkapnya</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    );
  }

  // Standard Grid Card (Symmetrical 1:1 structured grid item)
  return (
    <article className="group bg-white rounded-3xl border border-zinc-200 hover:border-black hover:shadow-lg overflow-hidden flex flex-col justify-between transition duration-300 h-full">
      <div>
        <Link href={`/berita/${news.id}`} className="relative h-48 sm:h-52 w-full overflow-hidden bg-zinc-100 block border-b border-zinc-100">
          <Image
            src={news.gambar || '/images/image.png'}
            alt={news.judul}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
          <span className="absolute top-3.5 left-3.5 text-[10px] font-extrabold px-2.5 py-1 rounded-md bg-black text-white shadow-xs uppercase tracking-wider">
            {news.kategori}
          </span>
        </Link>

        <div className="p-5 pb-0">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2.5">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1 font-mono text-[11px]">
              <Eye className="w-3 h-3 text-zinc-400" />
              {news.views}
            </span>
          </div>

          <h3 className="font-bold text-zinc-900 group-hover:text-black transition text-base line-clamp-2 mb-2.5 leading-snug">
            <Link href={`/berita/${news.id}`}>{news.judul}</Link>
          </h3>

          <p className="text-xs text-zinc-600 line-clamp-3 leading-relaxed mb-4">
            {news.isi.replace(/\\r|\\n/g, ' ')}
          </p>
        </div>
      </div>

      <div className="p-5 pt-0">
        <div className="pt-3.5 border-t border-zinc-100 flex items-center justify-between text-xs">
          <span className="text-zinc-500 font-medium truncate max-w-[140px]">
            {news.instansi || 'Diskominfo'}
          </span>
          <Link
            href={`/berita/${news.id}`}
            className="inline-flex items-center gap-1 text-black font-bold group-hover:translate-x-1 transition"
          >
            <span>Selengkapnya</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
