'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, X, ShieldCheck, Newspaper, BarChart3, Home, LogIn } from 'lucide-react';

interface NavbarProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch, searchQuery = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (onSearch) onSearch(val);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="bg-amber-400 text-slate-900 font-bold px-2 py-0.5 rounded-full text-[10px] tracking-wide uppercase">
              Breaking News
            </span>
            <span className="truncate">
              Portal Berita Resmi Diskominfo Kabupaten Indramayu — Cepat, Akurat, dan Transparan
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-200">
            <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex-shrink-0 bg-blue-50 rounded-xl p-1 shadow-xs ring-1 ring-blue-100 group-hover:scale-105 transition">
              <Image
                src="/images/logo3.png"
                alt="Logo Indramayu"
                width={48}
                height={48}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-900 via-indigo-800 to-sky-700 bg-clip-text text-transparent">
                  INC PORTAL
                </span>
                <span className="text-[10px] uppercase font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                  2.0
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Indramayu News Center • Diskominfo
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="Cari berita, agenda, pengumuman..."
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-full text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 font-medium text-sm text-slate-700">
            <Link
              href="/"
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-blue-700 flex items-center gap-1.5 transition"
            >
              <Home className="w-4 h-4 text-slate-500" />
              Beranda
            </Link>
            <Link
              href="/berita"
              className="px-3 py-2 rounded-lg hover:bg-slate-100 hover:text-blue-700 flex items-center gap-1.5 transition"
            >
              <Newspaper className="w-4 h-4 text-slate-500" />
              Katalog Berita
            </Link>
            <Link
              href="/survei"
              className="px-3 py-2 rounded-lg hover:bg-blue-50 text-blue-700 font-semibold flex items-center gap-1.5 transition"
            >
              <BarChart3 className="w-4 h-4 text-blue-600" />
              Survei Kepuasan
            </Link>
            
            <div className="h-6 w-px bg-slate-200 mx-2" />

            <Link
              href="/admin"
              className="px-3.5 py-2 rounded-lg bg-slate-900 text-white hover:bg-blue-800 flex items-center gap-1.5 font-medium transition shadow-xs"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Admin Panel
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="relative w-full mb-3">
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder="Cari berita..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 font-medium"
          >
            Beranda
          </Link>
          <Link
            href="/berita"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-100 font-medium"
          >
            Katalog Berita
          </Link>
          <Link
            href="/survei"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg text-blue-700 font-semibold bg-blue-50"
          >
            Survei Kepuasan Pengunjung
          </Link>
          <Link
            href="/admin"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-lg bg-slate-900 text-white font-medium text-center"
          >
            Admin Dashboard
          </Link>
        </div>
      )}
    </header>
  );
};
