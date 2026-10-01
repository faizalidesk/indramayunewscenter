'use client';

import { Berita, Komentar, SurveiPengunjung } from '@/types';
import { INITIAL_BERITA, INITIAL_KOMENTAR, INITIAL_SURVEI } from './data';

const BERITA_KEY = 'inc_portal_berita_data';
const KOMENTAR_KEY = 'inc_portal_komentar_data';
const SURVEI_KEY = 'inc_portal_survei_data';

// Helper to get from local storage or fallback to initial
export function getStoredBerita(): Berita[] {
  if (typeof window === 'undefined') return INITIAL_BERITA;
  try {
    const raw = localStorage.getItem(BERITA_KEY);
    if (!raw) {
      localStorage.setItem(BERITA_KEY, JSON.stringify(INITIAL_BERITA));
      return INITIAL_BERITA;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_BERITA;
  }
}

export function saveBeritaList(items: Berita[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BERITA_KEY, JSON.stringify(items));
}

export function getStoredKomentar(): Komentar[] {
  if (typeof window === 'undefined') return INITIAL_KOMENTAR;
  try {
    const raw = localStorage.getItem(KOMENTAR_KEY);
    if (!raw) {
      localStorage.setItem(KOMENTAR_KEY, JSON.stringify(INITIAL_KOMENTAR));
      return INITIAL_KOMENTAR;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_KOMENTAR;
  }
}

export function saveKomentarList(items: Komentar[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KOMENTAR_KEY, JSON.stringify(items));
}

export function getStoredSurvei(): SurveiPengunjung[] {
  if (typeof window === 'undefined') return INITIAL_SURVEI;
  try {
    const raw = localStorage.getItem(SURVEI_KEY);
    if (!raw) {
      localStorage.setItem(SURVEI_KEY, JSON.stringify(INITIAL_SURVEI));
      return INITIAL_SURVEI;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SURVEI;
  }
}

export function saveSurveiList(items: SurveiPengunjung[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SURVEI_KEY, JSON.stringify(items));
}
