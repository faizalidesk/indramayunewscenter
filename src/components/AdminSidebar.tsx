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
    <aside className="w-64 bg-black text-zinc-300 min-h-screen flex flex-col justify-between border-r border-zinc-900 p-4">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-3 border-b border-zinc-900">
          <div className="w-11 h-11 bg-white border border-zinc-800 rounded-xl p-1 flex items-center justify-center overflow-hidden flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Logo INC"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-white text-sm tracking-wide">INC ADMIN</span>
              <span className="bg-white text-black text-[9px] font-black px-1.5 py-0.2 rounded">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-medium">Indramayu News Center</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          <p className="px-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
            Pusat Kendali
          </p>
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? 'bg-white text-black shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Portal Link */}
      <div className="pt-4 border-t border-zinc-900 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition"
        >
          <Globe className="w-4 h-4 text-white" />
          <span>Lihat Portal Publik</span>
        </Link>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center text-xs font-black">
              A
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">Administrator</p>
              <p className="text-[10px] text-zinc-400 font-medium">Online Mode</p>
            </div>
          </div>
          <Link
            href="/"
            title="Keluar"
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
};

