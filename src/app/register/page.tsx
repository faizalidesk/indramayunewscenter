'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { UserPlus, Lock, Mail, User, CheckCircle2, ArrowLeft } from 'lucide-react';
import { loginOrRegisterUser } from '@/lib/store';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setLoading(true);
    setTimeout(() => {
      const user = loginOrRegisterUser(email.trim(), name.trim(), 'pengunjung');
      setLoading(false);
      setMsg(`Akun berhasil dibuat! Selamat datang, ${user.name}.`);

      setTimeout(() => {
        if (redirect) {
          router.push(redirect);
        } else {
          router.push('/');
        }
      }, 700);
    }, 500);
  };

  const loginHref = redirect ? `/login?redirect=${encodeURIComponent(redirect)}` : '/login';

  return (
    <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-zinc-200 shadow-xl space-y-6">
      <div className="text-center space-y-2">
        <Link href="/" className="inline-block">
          <div className="w-14 h-14 bg-zinc-100 rounded-2xl p-2 mx-auto ring-1 ring-zinc-200">
            <Image src="/images/logo3.png" alt="Logo" width={48} height={48} className="object-contain" />
          </div>
        </Link>
        <h1 className="text-2xl font-black text-black">Daftar Akun Pengunjung</h1>
        <p className="text-xs text-zinc-500">
          {redirect ? 'Daftar akun untuk langsung menulis komentar pada artikel.' : 'Bergabunglah untuk mendapatkan akses penuh informasi publik Indramayu.'}
        </p>
      </div>

      {msg && (
        <div className="p-3 bg-zinc-900 text-white rounded-xl text-xs font-semibold flex items-center gap-2 border border-zinc-800 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-zinc-300 flex-shrink-0" />
          <span>{msg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-zinc-800 mb-1">Nama Lengkap</label>
          <div className="relative">
            <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Budi Gunawan"
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm text-zinc-900 focus:ring-2 focus:ring-black focus:bg-white outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-800 mb-1">Alamat Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
            <input
              type="email"
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
              placeholder="Minimal 6 karakter"
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm text-zinc-900 focus:ring-2 focus:ring-black focus:bg-white outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-black hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <UserPlus className="w-4 h-4" />
          <span>{loading ? 'Mendaftarkan...' : 'Buat Akun Sekarang'}</span>
        </button>
      </form>

      <div className="pt-4 border-t border-zinc-100 text-center text-xs text-zinc-500 space-y-2">
        <p>
          Sudah memiliki akun?{' '}
          <Link href={loginHref} className="font-bold text-black hover:underline">
            Masuk di sini
          </Link>
        </p>
        <p>
          <Link href="/" className="inline-flex items-center gap-1 text-zinc-500 hover:text-black font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" />
            Kembali ke Beranda
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 p-4 font-sans selection:bg-black selection:text-white">
      <Suspense fallback={<div className="text-zinc-500 text-sm">Memuat form pendaftaran...</div>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
