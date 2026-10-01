'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SurveyForm } from '@/components/SurveyForm';
import { BarChart3, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function SurveiPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-950 font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Banner Intro */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black text-white text-xs font-black uppercase tracking-wider">
            <BarChart3 className="w-4 h-4 text-zinc-300" />
            <span>Survei Kepuasan Masyarakat</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight">
            Indeks Kepuasan Pengunjung Portal Berita
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Dinas Komunikasi dan Informatika Kabupaten Indramayu berkomitmen menghadirkan keterbukaan informasi publik yang berkualitas, akuntabel, dan transparan.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-semibold text-zinc-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-black" />
              Anonim & Terenkripsi
            </span>
            <span className="flex items-center gap-1.5">
              <HeartHandshake className="w-4 h-4 text-black" />
              10 Indikator Evaluasi Mutu
            </span>
          </div>
        </div>

        {/* Survey Form */}
        <SurveyForm />
      </main>

      <Footer />
    </div>
  );
}

