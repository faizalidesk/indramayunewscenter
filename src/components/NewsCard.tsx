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
  const getCategoryColor = (kategori: string) => {
    switch (kategori?.toLowerCase()) {
      case 'pendidikan':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'teknologi':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pemerintahan':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'kesehatan':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'sosial':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    }
  };

  const formattedDate = new Date(news.createdAt).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  if (layout === 'compact') {
    return (
      <Link
        href={`/berita/${news.id}`}
        className="group flex gap-3 items-center p-3 bg-white rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-xs transition"
      >
        <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
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
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getCategoryColor(news.kategori)}`}>
              {news.kategori}
            </span>
            <span className="text-[11px] text-slate-400">{formattedDate}</span>
          </div>
          <h4 className="text-xs font-semibold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition">
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
        className="group flex flex-col sm:flex-row gap-5 p-4 bg-white rounded-2xl border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition duration-300"
      >
        <div className="relative w-full sm:w-56 h-44 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
          <Image
            src={news.gambar || '/images/image.png'}
            alt={news.judul}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
            sizes="(max-width: 640px) 100vw, 224px"
          />
          <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full border shadow-xs ${getCategoryColor(news.kategori)}`}>
            {news.kategori}
          </span>
        </div>
        <div className="flex flex-col justify-between flex-1 py-1">
          <div>
            <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                {formattedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {news.pembuat || 'Admin'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                {news.views} views
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 mb-2 leading-snug">
              {news.judul}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
              {news.isi.replace(/\\r|\\n/g, ' ')}
            </p>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition duration-200">
            <span>Baca Selengkapnya</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    );
  }

  // Standard Grid Card
  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 hover:border-blue-300 hover:shadow-lg overflow-hidden flex flex-col transition duration-300">
      <Link href={`/berita/${news.id}`} className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 block">
        <Image
          src={news.gambar || '/images/image.png'}
          alt={news.judul}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
        <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full border shadow-xs backdrop-blur-xs ${getCategoryColor(news.kategori)}`}>
          {news.kategori}
        </span>
      </Link>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-500" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              {news.views}
            </span>
          </div>

          <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition text-base line-clamp-2 mb-2 leading-snug">
            <Link href={`/berita/${news.id}`}>{news.judul}</Link>
          </h3>

          <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
            {news.isi.replace(/\\r|\\n/g, ' ')}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium truncate max-w-[150px]">
            {news.instansi || 'Diskominfo'}
          </span>
          <Link
            href={`/berita/${news.id}`}
            className="flex items-center gap-1 text-blue-600 font-semibold group-hover:translate-x-1 transition"
          >
            <span>Selengkapnya</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};
