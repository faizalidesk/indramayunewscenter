'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LogIn, CheckCircle2, Lock, Mail } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 p-4 font-sans selection:bg-black selection:text-white">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-zinc-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <div className="w-14 h-14 bg-zinc-100 rounded-2xl p-2 mx-auto ring-1 ring-zinc-200">
              <Image src="/images/logo3.png" alt="Logo" width={48} height={48} className="object-contain" />
            </div>
          </Link>
          <h1 className="text-2xl font-black text-black">Masuk Akun Pengunjung</h1>
          <p className="text-xs text-zinc-500">
            Masuk untuk menyimpan artikel favorit dan berkontribusi opini publik.
          </p>
        </div>

        {msg && (
          <div className="p-3 bg-zinc-900 text-white rounded-xl text-xs font-semibold flex items-center gap-2 border border-zinc-800">
            <CheckCircle2 className="w-4 h-4 text-zinc-300" />
            <span>{msg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-800 mb-1">Email / Nama Pengguna</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm text-zinc-900 focus:ring-2 focus:ring-black focus:bg-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-800 mb-1">Kata Sandi</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm text-zinc-900 focus:ring-2 focus:ring-black focus:bg-white outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Memproses...' : 'Masuk Sekarang'}</span>
          </button>
        </form>

        <div className="pt-4 border-t border-zinc-100 text-center text-xs text-zinc-500 space-y-2">
          <p>
            Belum punya akun?{' '}
            <Link href="/register" className="font-bold text-black hover:underline">
              Daftar akun baru
            </Link>
          </p>
          <p>
            <Link href="/admin" className="text-zinc-500 font-semibold hover:text-black">
              Masuk sebagai Administrator
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

