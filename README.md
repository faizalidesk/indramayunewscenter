# 🌐 INC PORTAL 2.0 (Indramayu News Center) — Vercel Native

Portal Publikasi Berita Resmi, Interaksi Komentar, dan Survei Kepuasan Pengunjung **Diskominfo Kabupaten Indramayu**, didesain ulang dari **Laravel 10** menjadi **Next.js (App Router, TypeScript, Tailwind CSS, Chart.js)** yang siap di-deploy secara instan ke **Vercel**.

---

## ✨ Fitur Utama

### 🏛️ Portal Publik (Pengunjung & Warga)
- **Berita Utama & Spotlight**: Tampilan hero modern dengan breaking news banner & trending list.
- **Katalog & Filter Kategori**: Filter instan berdasarkan topik (*Pendidikan, Teknologi, Pemerintahan, Kesehatan, Sosial, Layanan Publik*) serta pencarian cepat.
- **Tampilan Artikel & Detail**: Layout baca bersih, sharing link, hitung estimasi baca, dan counter pembaca.
- **Kolom Komentar Interaktif**: Partisipasi publik dalam memberikan tanggapan secara real-time.
- **Survei Kepuasan 10 Indikator**: Formulir survei interaktif evaluasi layanan informasi publik dengan feedback animasi confetti.
- **Autentikasi Pengunjung**: Login dan registrasi responsif untuk pembaca.

### 🛡️ Panel Administrator (`/admin`)
- **Dashboard Metrik**: Total berita terbit, total pembaca, total komentar, dan jumlah responden survei.
- **Analisis Visual Survei**: Grafik Bar Chart & Donut Chart (Chart.js) untuk persentase kepuasan tiap pertanyaan Q1 - Q10.
- **Kelola Berita (CRUD)**: Tabel manajemen berita dengan filter status (*Published/Pending/Draft*), fitur hapus, serta form tulis berita baru dengan preset gambar.
- **Moderasi Komentar**: Monitoring dan penghapusan komentar spam dari pengguna.
- **Rekap Responden**: Tabel lengkap rincian respon survei masyarakat.

---

## 🚀 Cara Menjalankan Secara Lokal

1. Masuk ke direktori proyek:
   ```bash
   cd websiteinc-next
   ```
2. Pastikan dependensi terpasang:
   ```bash
   npm install
   ```
3. Jalankan server development:
   ```bash
   npm run dev
   ```
4. Buka browser di [http://localhost:3000](http://localhost:3000).

---

## ☁️ Panduan Deploy ke Vercel

1. **Push ke GitHub / Git Repository**:
   ```bash
   git add .
   git commit -m "feat: complete redesign of Diskominfo news portal"
   git push origin main
   ```
2. **Import ke Vercel**:
   - Buka [vercel.com](https://vercel.com) dan login.
   - Klik **"Add New"** > **"Project"**.
   - Pilih repository GitHub Anda, atur root directory ke `websiteinc-next` (atau root folder).
   - Klik **Deploy**.

Website akan langsung online dengan domain otomatis `*.vercel.app` dalam hitungan detik!
