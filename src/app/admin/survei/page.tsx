'use client';

import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@/components/AdminSidebar';
import { SurveyCharts } from '@/components/SurveyCharts';
import { SurveiPengunjung, SURVEI_QUESTIONS } from '@/types';
import { getStoredSurvei } from '@/lib/store';
import { BarChart3, Search } from 'lucide-react';

export default function AdminSurveiPage() {
  const [surveiList, setSurveiList] = useState<SurveiPengunjung[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSurveiList(getStoredSurvei());
  }, []);

  const filtered = surveiList.filter((s) =>
    s.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-black text-white font-sans selection:bg-black selection:text-white">
      <AdminSidebar />

      <main className="flex-1 bg-zinc-50 text-zinc-950 overflow-y-auto p-6 sm:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 mb-8">
          <div>
            <div className="flex items-center gap-2 text-zinc-800 text-xs font-black uppercase tracking-wider mb-1">
              <BarChart3 className="w-4 h-4 text-black" />
              <span>Evaluasi & Indeks Kepuasan</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-black">
              Hasil & Analisis Survei Pengunjung
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Rekapitulasi respon 10 indikator kepuasan publik terhadap portal informasi Indramayu News Center.
            </p>
          </div>
        </div>

        {/* Visual Charts & Key Metrics */}
        <div className="mb-10">
          <SurveyCharts surveiData={surveiList} />
        </div>

        {/* Breakdown of 10 Questions */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-xs mb-8">
          <h3 className="text-xs font-black text-black pb-3 border-b border-zinc-100 mb-4 uppercase tracking-wider">
            Daftar 10 Indikator Survei Kepuasan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SURVEI_QUESTIONS.map((q, idx) => (
              <div
                key={q.id}
                className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-start gap-3 text-xs"
              >
                <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                  Q{idx + 1}
                </span>
                <p className="text-zinc-800 leading-relaxed font-semibold">{q.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Respondent Table */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-black text-black">Daftar Responden Survei</h3>
              <p className="text-xs text-zinc-400">Rincian jawaban tiap pengguna yang berpartisipasi</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama responden..."
                className="w-full pl-9 pr-3 py-2 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase text-[10px] font-bold tracking-wider">
                  <th className="py-3.5 px-4">Nama Responden</th>
                  <th className="py-3.5 px-2 text-center">Q1</th>
                  <th className="py-3.5 px-2 text-center">Q2</th>
                  <th className="py-3.5 px-2 text-center">Q3</th>
                  <th className="py-3.5 px-2 text-center">Q4</th>
                  <th className="py-3.5 px-2 text-center">Q5</th>
                  <th className="py-3.5 px-2 text-center">Q6</th>
                  <th className="py-3.5 px-2 text-center">Q7</th>
                  <th className="py-3.5 px-2 text-center">Q8</th>
                  <th className="py-3.5 px-2 text-center">Q9</th>
                  <th className="py-3.5 px-2 text-center">Q10</th>
                  <th className="py-3.5 px-4 text-right">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="text-center py-10 text-zinc-400">
                      Tidak ada data responden ditemukan.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-zinc-50 transition">
                      <td className="py-3.5 px-4 font-bold text-zinc-900">{item.nama}</td>
                      {[
                        item.q1,
                        item.q2,
                        item.q3,
                        item.q4,
                        item.q5,
                        item.q6,
                        item.q7,
                        item.q8,
                        item.q9,
                        item.q10,
                      ].map((ans, i) => (
                        <td key={i} className="py-3.5 px-2 text-center">
                          {ans === 'setuju' ? (
                            <span className="inline-block w-2.5 h-2.5 rounded-full bg-black" title="Setuju" />
                          ) : (
                            <span className="inline-block w-2.5 h-2.5 rounded-full bg-zinc-300 ring-1 ring-zinc-400" title="Tidak Setuju" />
                          )}
                        </td>
                      ))}
                      <td className="py-3.5 px-4 text-right text-zinc-400 font-mono text-[11px]">
                        {new Date(item.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

