'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { Komentar } from '@/types';
import { getStoredKomentar, saveKomentarList } from '@/lib/store';

interface CommentSectionProps {
  beritaId: number;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ beritaId }) => {
  const [comments, setComments] = useState<Komentar[]>([]);
  const [nama, setNama] = useState('');
  const [isi, setIsi] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    const all = getStoredKomentar();
    const filtered = all.filter((c) => c.beritaId === beritaId);
    setComments(filtered);
  }, [beritaId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim() || !isi.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newKomentar: Komentar = {
        id: Date.now(),
        beritaId,
        nama: nama.trim(),
        isi: isi.trim(),
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      };

      const all = getStoredKomentar();
      const updated = [newKomentar, ...all];
      saveKomentarList(updated);

      setComments((prev) => [newKomentar, ...prev]);
      setNama('');
      setIsi('');
      setIsSubmitting(false);
      setSuccessMsg(true);

      setTimeout(() => setSuccessMsg(false), 4000);
    }, 400);
  };

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

      {/* Form Input Komentar */}
      <form onSubmit={handleSubmit} className="mb-10 space-y-4 bg-zinc-50 p-5 rounded-2xl border border-zinc-200">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-800">
          Tinggalkan Komentar & Pendapat Anda
        </h4>

        {successMsg && (
          <div className="flex items-center gap-2 p-3 bg-zinc-900 text-white rounded-xl text-xs font-medium border border-zinc-800 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-zinc-300 flex-shrink-0" />
            <span>Komentar Anda berhasil dipublikasikan! Terima kasih atas aspirasi Anda.</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-zinc-800 mb-1">
              Nama Lengkap <span className="text-black">*</span>
            </label>
            <input
              type="text"
              required
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Contoh: Budi Gunawan"
              className="w-full px-3.5 py-2.5 bg-white border border-zinc-300 rounded-xl text-xs sm:text-sm text-zinc-900 focus:ring-2 focus:ring-black focus:border-black focus:outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-800 mb-1">
            Isi Komentar / Tanggapan <span className="text-black">*</span>
          </label>
          <textarea
            required
            rows={3}
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
            placeholder="Tuliskan komentar yang sopan, konstruktif, dan relevan..."
            className="w-full px-3.5 py-2.5 bg-white border border-zinc-300 rounded-xl text-xs sm:text-sm text-zinc-900 focus:ring-2 focus:ring-black focus:border-black focus:outline-none transition"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition cursor-pointer disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{isSubmitting ? 'Mengirim...' : 'Kirim Komentar'}</span>
        </button>
      </form>

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

