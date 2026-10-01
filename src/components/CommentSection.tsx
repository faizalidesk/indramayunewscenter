'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, Send, CheckCircle2, LogIn, UserPlus, UserCheck, LogOut } from 'lucide-react';
import { Komentar, User } from '@/types';
import { getStoredKomentar, saveKomentarList, getCurrentUser, logoutUser } from '@/lib/store';

interface CommentSectionProps {
  beritaId: number;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ beritaId }) => {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Komentar[]>([]);
  const [isi, setIsi] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    const all = getStoredKomentar();
    const filtered = all.filter((c) => c.beritaId === beritaId);
    setComments(filtered);
  }, [beritaId]);

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !isi.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newKomentar: Komentar = {
        id: Date.now(),
        beritaId,
        nama: currentUser.name || currentUser.email.split('@')[0],
        isi: isi.trim(),
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      };

      const all = getStoredKomentar();
      const updated = [newKomentar, ...all];
      saveKomentarList(updated);

      setComments((prev) => [newKomentar, ...prev]);
      setIsi('');
      setIsSubmitting(false);
      setSuccessMsg(true);

      setTimeout(() => setSuccessMsg(false), 4000);
    }, 400);
  };

  const redirectUrl = encodeURIComponent(pathname || `/berita/${beritaId}`);

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-xs mt-10">
      <div className="flex items-center justify-between pb-6 border-b border-zinc-100 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-zinc-100 text-black border border-zinc-200">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-black">Kolom Komentar</h3>
            <p className="text-xs text-zinc-500">
              {comments.length} tanggapan masyarakat untuk artikel ini
            </p>
          </div>
        </div>
      </div>

      {/* Form or Login Prompt */}
      {currentUser ? (
        <form onSubmit={handleSubmit} className="mb-10 space-y-4 bg-zinc-50 p-5 rounded-2xl border border-zinc-200">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-200">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">
                {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="text-xs">
                <span className="text-zinc-500">Masuk sebagai: </span>
                <span className="font-bold text-zinc-900">{currentUser.name}</span>
                <span className="text-zinc-400 ml-1.5 font-mono text-[11px]">({currentUser.email})</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="text-[11px] text-zinc-500 hover:text-black font-semibold flex items-center gap-1 transition"
            >
              <LogOut className="w-3 h-3" />
              Keluar
            </button>
          </div>

          {successMsg && (
            <div className="flex items-center gap-2 p-3 bg-zinc-900 text-white rounded-xl text-xs font-medium border border-zinc-800 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-zinc-300 flex-shrink-0" />
              <span>Komentar Anda berhasil dipublikasikan! Terima kasih atas aspirasi Anda.</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-zinc-800 mb-1">
              Tulis Komentar & Opini Anda <span className="text-black">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              placeholder="Tuliskan tanggapan yang santun, objektif, dan beretika..."
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-300 rounded-xl text-xs sm:text-sm text-zinc-900 focus:ring-2 focus:ring-black focus:border-black focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Mengirim Komentar...' : 'Kirim Komentar'}</span>
          </button>
        </form>
      ) : (
        <div className="mb-10 bg-zinc-50 p-6 sm:p-8 rounded-2xl border border-zinc-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mx-auto shadow-sm">
            <LogIn className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h4 className="text-base font-black text-black">Masuk untuk Berkomentar</h4>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Anda harus masuk ke akun terlebih dahulu sebelum dapat memberikan tanggapan atau menyampaikan aspirasi pada berita ini.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href={`/login?redirect=${redirectUrl}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk Akun</span>
            </Link>
            <Link
              href={`/register?redirect=${redirectUrl}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-300 text-xs sm:text-sm font-bold rounded-xl transition"
            >
              <UserPlus className="w-4 h-4 text-zinc-600" />
              <span>Daftar Akun Baru</span>
            </Link>
          </div>
        </div>
      )}

      {/* List Komentar */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-zinc-400 text-xs">
            Belum ada komentar untuk artikel ini. Jadilah yang pertama memberikan tanggapan!
          </div>
        ) : (
          comments.map((komentar) => (
            <div
              key={komentar.id}
              className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-400 transition"
            >
              <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-xs">
                {komentar.nama.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="text-xs font-bold text-zinc-900">{komentar.nama}</h5>
                  <span className="text-[10px] text-zinc-400 font-mono">
                    {new Date(komentar.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed break-words">
                  {komentar.isi}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};


