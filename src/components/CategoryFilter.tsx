import React from 'react';
import { CATEGORIES } from '@/lib/data';
import {
  Layers,
  GraduationCap,
  Cpu,
  Landmark,
  HeartPulse,
  Users,
  Building2,
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Semua':
        return <Layers className="w-3.5 h-3.5" />;
      case 'Pendidikan':
        return <GraduationCap className="w-3.5 h-3.5" />;
      case 'Teknologi':
        return <Cpu className="w-3.5 h-3.5" />;
      case 'Pemerintahan':
        return <Landmark className="w-3.5 h-3.5" />;
      case 'Kesehatan':
        return <HeartPulse className="w-3.5 h-3.5" />;
      case 'Sosial':
        return <Users className="w-3.5 h-3.5" />;
      case 'Layanan Publik':
        return <Building2 className="w-3.5 h-3.5" />;
      default:
        return <Layers className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none my-6">
      {CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              isSelected
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-600/30'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {getCategoryIcon(cat)}
            <span>{cat}</span>
          </button>
        );
      })}
    </div>
  );
};
