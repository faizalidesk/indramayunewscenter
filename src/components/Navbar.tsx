'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, X, ShieldCheck, Newspaper, BarChart3, Home, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { User } from '@/types';
import { getCurrentUser, logoutUser } from '@/lib/store';

interface NavbarProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch, searchQuery = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(searchQuery);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (onSearch) onSearch(val);
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200 shadow-xs transition-all">
      {/* Top Banner Ticker */}
      <div className="bg-black text-white text-xs py-1.5 px-4 font-medium border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden whitespace-nowrap">
            <span className="bg-white text-black font-extrabold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
              Warta Resmi
            </span>
            <span className="truncate text-zinc-300 text-xs">
              Portal Berita Resmi Indramayu News Center — Cepat, Akurat, dan Terpercaya
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-zinc-400 text-xs font-mono">
            <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-12 h-12 flex-shrink-0 bg-white rounded-2xl p-1 shadow-xs ring-1 ring-zinc-200 group-hover:ring-black transition overflow-hidden flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Logo Indramayu News Center"
                width={48}
                height={48}
                className="object-contain w-full h-full"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-black">
                  INC PORTAL
                </span>
                <span className="text-[10px] uppercase font-extrabold bg-black text-white px-1.5 py-0.5 rounded tracking-wider">
                  RESMI
                </span>
              </div>
              <span className="text-[11px] text-zinc-500 font-medium">
                Indramayu News Center
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
                placeholder="Cari berita, agenda, rilis kebijakan..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-100/80 border border-zinc-200 rounded-full text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white focus:border-black transition"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-2.5" />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 font-medium text-sm text-zinc-700">
            <Link
              href="/"
              className="px-3.5 py-2 rounded-xl hover:bg-zinc-100 hover:text-black flex items-center gap-1.5 transition"
            >
              <Home className="w-4 h-4 text-zinc-500" />
              <span>Beranda</span>
            </Link>
            <Link
              href="/berita"
              className="px-3.5 py-2 rounded-xl hover:bg-zinc-100 hover:text-black flex items-center gap-1.5 transition"
            >
              <Newspaper className="w-4 h-4 text-zinc-500" />
              <span>Katalog Berita</span>
            </Link>
            <Link
              href="/survei"
              className="px-3.5 py-2 rounded-xl hover:bg-zinc-100 hover:text-black font-semibold flex items-center gap-1.5 transition"
            >
              <BarChart3 className="w-4 h-4 text-zinc-700" />
              <span>Survei Kepuasan</span>
            </Link>
            
            <div className="h-5 w-px bg-zinc-200 mx-2" />

            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 border border-zinc-200 text-xs">
                  <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center font-bold text-[10px]">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-bold text-zinc-800 max-w-[100px] truncate">{user.name}</span>
                </div>
                {user.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="px-3 py-2 rounded-xl bg-black text-white hover:bg-zinc-800 flex items-center gap-1.5 text-xs font-bold transition"
                  >
                    <ShieldCheck className="w-4 h-4 text-zinc-300" />
                    <span>Admin</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  title="Keluar akun"
                  className="p-2 rounded-xl text-zinc-500 hover:text-black hover:bg-zinc-100 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Link
                  href="/login"
                  className="px-3.5 py-2 rounded-xl hover:bg-zinc-100 text-zinc-800 hover:text-black flex items-center gap-1.5 text-xs font-bold transition"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Masuk</span>
                </Link>
                <Link
                  href="/admin"
                  className="px-3.5 py-2 rounded-xl bg-black text-white hover:bg-zinc-800 flex items-center gap-1.5 text-xs font-bold transition shadow-xs"
                >
                  <ShieldCheck className="w-4 h-4 text-zinc-300" />
                  <span>Admin</span>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-zinc-800 hover:bg-zinc-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="relative w-full mb-3">
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              placeholder="Cari berita..."
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-100 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
          </div>

          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-xl text-zinc-800 hover:bg-zinc-100 font-medium text-sm"
          >
            Beranda
          </Link>
          <Link
            href="/berita"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-xl text-zinc-800 hover:bg-zinc-100 font-medium text-sm"
          >
            Katalog Berita
          </Link>
          <Link
            href="/survei"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-xl text-black font-bold bg-zinc-100 text-sm"
          >
            Survei Kepuasan Pengunjung
          </Link>

          {user ? (
            <div className="pt-2 border-t border-zinc-100 space-y-2">
              <div className="flex items-center justify-between px-3 py-2 bg-zinc-50 rounded-xl">
                <span className="text-xs font-bold text-zinc-900">{user.name}</span>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-xs text-zinc-500 hover:text-black font-semibold"
                >
                  Keluar
                </button>
              </div>
              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2.5 rounded-xl bg-black text-white font-bold text-center text-sm"
                >
                  Admin Dashboard
                </Link>
              )}
            </div>
          ) : (
            <div className="pt-2 border-t border-zinc-100 grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-xl border border-zinc-300 text-zinc-900 font-bold text-center text-xs"
              >
                Masuk
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-xl bg-black text-white font-bold text-center text-xs"
              >
                Admin
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};


