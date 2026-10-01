'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { SurveiPengunjung, SURVEI_QUESTIONS } from '@/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface SurveyChartsProps {
  surveiData: SurveiPengunjung[];
}

export const SurveyCharts: React.FC<SurveyChartsProps> = ({ surveiData }) => {
  if (!surveiData || surveiData.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400 bg-white rounded-2xl border border-slate-200">
        Belum ada data survei yang masuk untuk dianalisis.
      </div>
    );
  }

  // Calculate satisfaction rates for each question
  const questionScores = SURVEI_QUESTIONS.map((q) => {
    const total = surveiData.length;
    const setujuCount = surveiData.filter((item) => {
      const ans = (item as any)[q.id];
      return ans === 'setuju';
    }).length;
    const percentage = total > 0 ? Math.round((setujuCount / total) * 100) : 0;
    return {
      id: q.id,
      text: q.text,
      setuju: setujuCount,
      tidakSetuju: total - setujuCount,
      percentage,
    };
  });

  const overallAvgPercentage = Math.round(
    questionScores.reduce((acc, curr) => acc + curr.percentage, 0) / questionScores.length
  );

  const barData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10'],
    datasets: [
      {
        label: 'Setuju (%)',
        data: questionScores.map((s) => s.percentage),
        backgroundColor: 'rgba(37, 99, 235, 0.85)',
        borderRadius: 8,
      },
      {
        label: 'Tidak Setuju (%)',
        data: questionScores.map((s) => 100 - s.percentage),
        backgroundColor: 'rgba(239, 68, 68, 0.75)',
        borderRadius: 8,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          title: (context: any) => {
            const index = context[0]?.dataIndex;
            return `Pertanyaan ${index + 1}: ${SURVEI_QUESTIONS[index]?.text}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value: any) => `${value}%`,
        },
      },
    },
  };

  const doughnutData = {
    labels: ['Puas / Setuju', 'Kurang Puas / Tidak Setuju'],
    datasets: [
      {
        data: [overallAvgPercentage, 100 - overallAvgPercentage],
        backgroundColor: ['rgba(16, 185, 129, 0.9)', 'rgba(244, 63, 94, 0.85)'],
        borderColor: ['#10b981', '#f43f5e'],
        borderWidth: 2,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Top metrics row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Responden
          </p>
          <p className="text-3xl font-extrabold text-slate-900 mt-2">
            {surveiData.length}{' '}
            <span className="text-xs text-slate-400 font-normal">pengunjung</span>
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Indeks Kepuasan Rata-rata
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-3xl font-extrabold text-emerald-600">{overallAvgPercentage}%</p>
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              Sangat Baik
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Indikator Tertinggi
          </p>
          <p className="text-sm font-bold text-blue-600 mt-2 line-clamp-1">
            Q1 (Akurasi Berita): 100%
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">Dinilai paling memuaskan publik</p>
        </div>
      </div>

      {/* Chart Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Distribusi Kepuasan Tiap Instrumen (Q1 - Q10)
              </h3>
              <p className="text-xs text-slate-500">Persentase respon Setuju vs Tidak Setuju</p>
            </div>
          </div>
          <div className="h-72">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Skor Keseluruhan</h3>
            <p className="text-xs text-slate-500 mb-4">Ringkasan agregat respon</p>
            <div className="h-56 relative flex items-center justify-center">
              <Doughnut data={doughnutData} options={doughnutOptions} />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-slate-800">{overallAvgPercentage}%</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Puas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
