'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Newspaper,
  PlusCircle,
  BarChart3,
  MessageSquare,
  Globe,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Dashboard Utama', icon: LayoutDashboard },
    { href: '/admin/berita', label: 'Kelola Berita', icon: Newspaper },
    { href: '/admin/berita/tambah', label: 'Tulis Berita Baru', icon: PlusCircle },
    { href: '/admin/survei', label: 'Hasil & Analisis Survei', icon: BarChart3 },
    { href: '/admin/komentar', label: 'Moderasi Komentar', icon: MessageSquare },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-slate-300 min-h-screen flex flex-col justify-between border-r border-slate-800 p-4">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-3 border-b border-slate-800">
          <div className="w-10 h-10 bg-white/10 rounded-xl p-1 flex items-center justify-center">
            <Image
              src="/images/logo3.png"
              alt="Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-sm tracking-wide">INC ADMIN</span>
              <span className="bg-amber-400/20 text-amber-400 text-[10px] font-bold px-1.5 py-0.2 rounded border border-amber-400/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Diskominfo Indramayu</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Menu Administrator
          </p>
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Portal Link */}
      <div className="pt-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition"
        >
          <Globe className="w-4 h-4 text-blue-400" />
          <span>Lihat Website Publik</span>
        </Link>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
              A
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">Administrator</p>
              <p className="text-[10px] text-emerald-400 font-medium">● Online Vercel</p>
            </div>
          </div>
          <Link
            href="/"
            title="Keluar"
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-white/5 transition"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
};
