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
      <div className="p-8 text-center text-zinc-400 bg-white rounded-3xl border border-zinc-200">
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
        backgroundColor: '#18181b',
        borderRadius: 6,
      },
      {
        label: 'Tidak Setuju (%)',
        data: questionScores.map((s) => 100 - s.percentage),
        backgroundColor: '#d4d4d8',
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#18181b',
          font: { weight: 'bold' as const },
        },
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
      x: {
        grid: { display: false },
        ticks: { color: '#71717a' },
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: { color: '#f4f4f5' },
        ticks: {
          color: '#71717a',
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
        backgroundColor: ['#18181b', '#d4d4d8'],
        borderColor: ['#000000', '#e4e4e7'],
        borderWidth: 1.5,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '74%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#18181b',
          font: { size: 11, weight: 'bold' as const },
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Top metrics row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-xs">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Total Responden
          </p>
          <p className="text-3xl font-black text-black mt-2">
            {surveiData.length}{' '}
            <span className="text-xs text-zinc-400 font-normal">pengunjung</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-xs">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Indeks Kepuasan Rata-rata
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-3xl font-black text-black">{overallAvgPercentage}%</p>
            <span className="text-xs font-black bg-black text-white px-2.5 py-0.5 rounded-full">
              Sangat Baik
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-xs">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Indikator Tertinggi
          </p>
          <p className="text-sm font-black text-zinc-900 mt-2 line-clamp-1">
            Q1 (Akurasi Berita): 100%
          </p>
          <p className="text-[11px] text-zinc-500 mt-0.5">Dinilai paling memuaskan publik</p>
        </div>
      </div>

      {/* Chart Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-black text-black">
                Distribusi Kepuasan Tiap Instrumen (Q1 - Q10)
              </h3>
              <p className="text-xs text-zinc-500">Persentase respon Setuju vs Tidak Setuju</p>
            </div>
          </div>
          <div className="h-72">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Doughnut Chart */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-black mb-1">Skor Keseluruhan</h3>
            <p className="text-xs text-zinc-500 mb-4">Ringkasan agregat respon</p>
            <div className="h-56 relative flex items-center justify-center">
              <Doughnut data={doughnutData} options={doughnutOptions} />
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-black text-black">{overallAvgPercentage}%</span>
                <span className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-widest">Puas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

