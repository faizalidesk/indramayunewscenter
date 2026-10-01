'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle, ThumbsUp, ThumbsDown, Sparkles, ArrowRight, RefreshCw, BarChart2 } from 'lucide-react';
import { SURVEI_QUESTIONS, SurveiPengunjung } from '@/types';
import { getStoredSurvei, saveSurveiList } from '@/lib/store';
import Link from 'next/link';

export const SurveyForm: React.FC = () => {
  const [nama, setNama] = useState('');
  const [answers, setAnswers] = useState<Record<string, 'setuju' | 'tidak setuju'>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChoice = (questionId: string, choice: 'setuju' | 'tidak setuju') => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: choice,
    }));
    setErrorMsg('');
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / SURVEI_QUESTIONS.length) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) {
      setErrorMsg('Harap isi nama Anda terlebih dahulu sebelum mengirim survei.');
      return;
    }

    if (answeredCount < SURVEI_QUESTIONS.length) {
      setErrorMsg(`Harap jawab seluruh ${SURVEI_QUESTIONS.length} pertanyaan (saat ini ${answeredCount}/${SURVEI_QUESTIONS.length}).`);
      return;
    }

    const newSurvei: SurveiPengunjung = {
      id: Date.now(),
      nama: nama.trim(),
      q1: answers.q1 || 'setuju',
      q2: answers.q2 || 'setuju',
      q3: answers.q3 || 'setuju',
      q4: answers.q4 || 'setuju',
      q5: answers.q5 || 'setuju',
      q6: answers.q6 || 'setuju',
      q7: answers.q7 || 'setuju',
      q8: answers.q8 || 'setuju',
      q9: answers.q9 || 'setuju',
      q10: answers.q10 || 'setuju',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };

    const currentSurveis = getStoredSurvei();
    saveSurveiList([newSurvei, ...currentSurveis]);

    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  const handleReset = () => {
    setNama('');
    setAnswers({});
    setIsSubmitted(false);
    setErrorMsg('');
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center max-w-2xl mx-auto space-y-6 animate-in zoom-in-95">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
          <CheckCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Survei Berhasil Dikirim
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Terima Kasih Atas Partisipasi Anda!
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            Apresiasi dan masukan dari Saudara/i <strong className="text-slate-800">{nama}</strong> sangat berharga untuk terus meningkatkan kualitas layanan dan portal berita Diskominfo Indramayu.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition flex items-center justify-center gap-2"
          >
            <span>Kembali ke Beranda</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Isi Survei Baru</span>
          </button>

          <Link
            href="/admin/survei"
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition flex items-center justify-center gap-2"
          >
            <BarChart2 className="w-4 h-4 text-amber-400" />
            <span>Lihat Hasil Analisis</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
      {/* Header Form */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Evaluasi Mutu Pelayanan Informasi</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Survei Kepuasan Pengunjung Portal
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Mohon kesediaan Anda memberikan penilaian objektif demi perbaikan berkelanjutan.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="sm:text-right bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
          <div className="text-xs font-bold text-slate-700">
            Progres Pengisian: <span className="text-blue-600 font-black">{answeredCount} / 10</span>
          </div>
          <div className="w-full sm:w-40 h-2.5 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nama Responden */}
        <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-2">
          <label className="block text-xs font-bold text-slate-800">
            Nama Lengkap / Identitas Responden <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={nama}
            onChange={(e) => {
              setNama(e.target.value);
              setErrorMsg('');
            }}
            placeholder="Masukkan nama Anda (misal: Ahmad Fauzi)"
            className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
          />
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Daftar 10 Pertanyaan */}
        <div className="space-y-4">
          {SURVEI_QUESTIONS.map((q, idx) => {
            const currentVal = answers[q.id];
            return (
              <div
                key={q.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 ${
                  currentVal
                    ? 'bg-slate-50/60 border-blue-200 ring-1 ring-blue-100'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4 justify-between flex-col sm:flex-row">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                      {q.text}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center pt-2 sm:pt-0">
                    <button
                      type="button"
                      onClick={() => handleChoice(q.id, 'setuju')}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                        currentVal === 'setuju'
                          ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-600/30'
                          : 'bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Setuju</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleChoice(q.id, 'tidak setuju')}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                        currentVal === 'tidak setuju'
                          ? 'bg-rose-600 text-white shadow-xs shadow-rose-600/30'
                          : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-700'
                      }`}
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                      <span>Tidak Setuju</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            Pastikan seluruh pertanyaan telah dijawab sebelum mengirimkan survei.
          </p>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-blue-500/25 transition transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Kirim Jawaban Survei</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
