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
        colors: ['#000000', '#52525b', '#a1a1aa', '#ffffff'],
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
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-zinc-200 shadow-xl text-center max-w-2xl mx-auto space-y-6 animate-in zoom-in-95">
        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto ring-8 ring-zinc-100">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-black bg-zinc-100 px-3 py-1 rounded-full border border-zinc-300">
            Survei Berhasil Dikirim
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-black">
            Terima Kasih Atas Partisipasi Anda!
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed max-w-md mx-auto">
            Apresiasi dan masukan dari Saudara/i <strong className="text-black">{nama}</strong> sangat berharga untuk terus meningkatkan kualitas layanan dan publikasi informasi Indramayu News Center.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-black hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold rounded-xl transition flex items-center justify-center gap-2"
          >
            <span>Kembali ke Beranda</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-black text-xs sm:text-sm font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer border border-zinc-200"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Isi Survei Baru</span>
          </button>

          <Link
            href="/admin/survei"
            className="w-full sm:w-auto px-6 py-3 bg-zinc-900 hover:bg-black text-white text-xs sm:text-sm font-bold rounded-xl transition flex items-center justify-center gap-2"
          >
            <BarChart2 className="w-4 h-4 text-zinc-300" />
            <span>Lihat Hasil Analisis</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200 shadow-md">
      {/* Header Form */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 mb-8">
        <div>
          <div className="flex items-center gap-2 text-zinc-900 font-black text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Evaluasi Mutu Pelayanan Informasi</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-zinc-900">
            Survei Kepuasan Pengunjung Portal
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Mohon kesediaan Anda memberikan penilaian objektif demi peningkatan kualitas portal.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="sm:text-right bg-zinc-50 p-3 rounded-2xl border border-zinc-200">
          <div className="text-xs font-bold text-zinc-800">
            Progres Pengisian: <span className="text-black font-black">{answeredCount} / 10</span>
          </div>
          <div className="w-full sm:w-40 h-2 bg-zinc-200 rounded-full mt-1.5 overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nama Responden */}
        <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2">
          <label className="block text-xs font-bold text-zinc-900">
            Nama Lengkap / Identitas Responden <span className="text-black">*</span>
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
            className="w-full px-4 py-2.5 bg-white border border-zinc-300 rounded-xl text-xs sm:text-sm text-zinc-900 focus:ring-2 focus:ring-black focus:border-black focus:outline-none transition"
          />
        </div>

        {errorMsg && (
          <div className="p-3.5 bg-zinc-100 border border-zinc-300 rounded-xl text-black text-xs font-bold">
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
                    ? 'bg-zinc-50 border-black ring-1 ring-black/10'
                    : 'bg-white border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4 justify-between flex-col sm:flex-row">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-zinc-900 leading-relaxed">
                      {q.text}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center pt-2 sm:pt-0">
                    <button
                      type="button"
                      onClick={() => handleChoice(q.id, 'setuju')}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        currentVal === 'setuju'
                          ? 'bg-black text-white shadow-xs'
                          : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-black border border-zinc-200'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Setuju</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleChoice(q.id, 'tidak setuju')}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        currentVal === 'tidak setuju'
                          ? 'bg-zinc-800 text-white shadow-xs'
                          : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-black border border-zinc-200'
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
        <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400">
            Pastikan seluruh pertanyaan telah dijawab sebelum mengirimkan survei.
          </p>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 bg-black hover:bg-zinc-800 text-white text-xs sm:text-sm font-black rounded-xl shadow-md transition transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Kirim Jawaban Survei</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

