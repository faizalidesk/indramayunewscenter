'use client';

import { Berita, Komentar, SurveiPengunjung, User } from '@/types';
import { INITIAL_BERITA, INITIAL_KOMENTAR, INITIAL_SURVEI } from './data';

const BERITA_KEY = 'inc_portal_berita_data';
const KOMENTAR_KEY = 'inc_portal_komentar_data';
const SURVEI_KEY = 'inc_portal_survei_data';
const CURRENT_USER_KEY = 'inc_portal_current_user';
const REGISTERED_USERS_KEY = 'inc_portal_registered_users';

const DEFAULT_USERS: User[] = [
  { id: 1, name: 'Faiz Ali', email: 'admin@diskominfo.go.id', role: 'admin' },
  { id: 2, name: 'Budi Santoso', email: 'budi@gmail.com', role: 'pengunjung' },
];

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

// User Authentication State
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User | null) {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

export function logoutUser() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getRegisteredUsers(): User[] {
  if (typeof window === 'undefined') return DEFAULT_USERS;
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    if (!raw) {
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_USERS;
  }
}

export function loginOrRegisterUser(email: string, name?: string, role: 'admin' | 'pengunjung' = 'pengunjung'): User {
  const users = getRegisteredUsers();
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  
  if (existing) {
    setCurrentUser(existing);
    return existing;
  }

  const cleanName = name?.trim() || email.split('@')[0];
  const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
  const newUser: User = {
    id: Date.now(),
    name: formattedName,
    email: email.trim(),
    role: email.includes('admin') ? 'admin' : role,
  };

  const updated = [newUser, ...users];
  if (typeof window !== 'undefined') {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(updated));
  }
  setCurrentUser(newUser);
  return newUser;
}
