'use client';

import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '@/components/AdminSidebar';
import { SurveyCharts } from '@/components/SurveyCharts';
import { SurveiPengunjung, SURVEI_QUESTIONS } from '@/types';
import { getStoredSurvei } from '@/lib/store';
import { BarChart3, Users, CheckCircle, XCircle, Search, Download } from 'lucide-react';

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
    <div className="min-h-screen flex bg-slate-900 text-slate-100 font-sans">
      <AdminSidebar />

      <main className="flex-1 bg-slate-50 text-slate-900 overflow-y-auto p-6 sm:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
          <div>
            <div className="flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
              <BarChart3 className="w-4 h-4" />
              <span>Evaluasi & Indeks Kepuasan</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Hasil & Analisis Survei Pengunjung
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Rekapitulasi respon 10 indikator kepuasan publik terhadap portal informasi Diskominfo Indramayu.
            </p>
          </div>
        </div>

        {/* Visual Charts & Key Metrics */}
        <div className="mb-10">
          <SurveyCharts surveiData={surveiList} />
        </div>

        {/* Breakdown of 10 Questions */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs mb-8">
          <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100 mb-4 uppercase tracking-wider">
            Daftar 10 Indikator Survei Kepuasan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SURVEI_QUESTIONS.map((q, idx) => (
              <div
                key={q.id}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs"
              >
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                  Q{idx + 1}
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">{q.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Respondent Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Daftar Responden Survei</h3>
              <p className="text-xs text-slate-400">Rincian jawaban tiap pengguna yang berpartisipasi</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama responden..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                  <th className="py-3 px-4">Nama Responden</th>
                  <th className="py-3 px-2 text-center">Q1</th>
                  <th className="py-3 px-2 text-center">Q2</th>
                  <th className="py-3 px-2 text-center">Q3</th>
                  <th className="py-3 px-2 text-center">Q4</th>
                  <th className="py-3 px-2 text-center">Q5</th>
                  <th className="py-3 px-2 text-center">Q6</th>
                  <th className="py-3 px-2 text-center">Q7</th>
                  <th className="py-3 px-2 text-center">Q8</th>
                  <th className="py-3 px-2 text-center">Q9</th>
                  <th className="py-3 px-2 text-center">Q10</th>
                  <th className="py-3 px-4 text-right">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="text-center py-10 text-slate-400">
                      Tidak ada data responden ditemukan.
                    </td>
                  </tr>
                ) : (
                  filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-800">{item.nama}</td>
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
                            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" title="Setuju" />
                          ) : (
                            <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500" title="Tidak Setuju" />
                          )}
                        </td>
                      ))}
                      <td className="py-3.5 px-4 text-right text-slate-400 text-[11px]">
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
