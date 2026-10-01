export interface Berita {
  id: number;
  instansi: string;
  pembuat: string;
  judul: string;
  isi: string;
  kategori: string;
  status: 'Published' | 'Pending' | 'Draft';
  createdAt: string;
  updatedAt?: string;
  views: number;
  gambar?: string;
  isUtama?: boolean;
}

export interface Komentar {
  id: number;
  beritaId: number;
  nama: string;
  isi: string;
  createdAt: string;
}

export interface SurveiPengunjung {
  id: number;
  nama: string;
  q1: 'setuju' | 'tidak setuju';
  q2: 'setuju' | 'tidak setuju';
  q3: 'setuju' | 'tidak setuju';
  q4: 'setuju' | 'tidak setuju';
  q5: 'setuju' | 'tidak setuju';
  q6: 'setuju' | 'tidak setuju';
  q7: 'setuju' | 'tidak setuju';
  q8: 'setuju' | 'tidak setuju';
  q9: 'setuju' | 'tidak setuju';
  q10: 'setuju' | 'tidak setuju';
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'pengunjung';
  profilePhoto?: string;
}

export const SURVEI_QUESTIONS = [
  { id: 'q1', text: 'Informasi dan berita yang disajikan pada portal ini sangat akurat dan terpercaya.' },
  { id: 'q2', text: 'Tampilan website portal berita ini bersih, modern, dan mudah dinavigasi.' },
  { id: 'q3', text: 'Berita dan pengumuman yang dipublikasikan selalu diperbarui secara berkala (up-to-date).' },
  { id: 'q4', text: 'Kecepatan akses dan pemuatan halaman website cepat dan responsif di perangkat saya.' },
  { id: 'q5', text: 'Topik dan kategori berita yang disediakan sangat relevan dengan kebutuhan masyarakat.' },
  { id: 'q6', text: 'Fitur pencarian dan penyaringan berita berfungsi dengan baik dan memudahkan saya mencari informasi.' },
  { id: 'q7', text: 'Bahasa dan gaya penulisan artikel mudah dipahami oleh seluruh kalangan.' },
  { id: 'q8', text: 'Fitur interaktif seperti kolom komentar dan survei berjalan lancar dan mudah digunakan.' },
  { id: 'q9', text: 'Portal berita ini memberikan transparansi kinerja instansi pemerintah daerah dengan baik.' },
  { id: 'q10', text: 'Secara keseluruhan, saya merasa puas dengan layanan dan informasi pada portal website ini.' },
] as const;
