'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LogIn, ArrowRight, CheckCircle2, Lock, Mail, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMsg('Berhasil masuk ke portal!');
      setTimeout(() => router.push('/'), 1000);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl p-2 mx-auto ring-1 ring-blue-100">
              <Image src="/images/logo3.png" alt="Logo" width={48} height={48} className="object-contain" />
            </div>
          </Link>
          <h1 className="text-2xl font-black text-slate-900">Masuk Akun Pengunjung</h1>
          <p className="text-xs text-slate-500">
            Masuk untuk menyimpan artikel favorit dan berkontribusi opini publik.
          </p>
        </div>

        {msg && (
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{msg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email / Nama Pengguna</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Kata Sandi</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-blue-500/25 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Memproses...' : 'Masuk Sekarang'}</span>
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500 space-y-2">
          <p>
            Belum punya akun?{' '}
            <Link href="/register" className="font-bold text-blue-600 hover:underline">
              Daftar akun baru
            </Link>
          </p>
          <p>
            <Link href="/admin" className="text-slate-400 hover:text-slate-700">
              Masuk sebagai Administrator
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
