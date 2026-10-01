import { Berita, Komentar, SurveiPengunjung } from '@/types';

export const INITIAL_BERITA: Berita[] = [
  {
    id: 77,
    instansi: 'Indramayu News Center',
    pembuat: 'Faiz Ali',
    judul: 'Berkat Bank Sampah, Murid Di Kecamatan Lelea Peroleh Cuan',
    isi: `INDRAMAYU NEWS CENTER — Upaya penanganan permasalahan sampah sepatutnya menjadi persoalan bersama. Sampah jika tidak dikelola dengan baik akan menimbulkan dampak buruk terhadap lingkungan seperti kawasan permukiman menjadi kumuh hingga berpotensi menyebabkan terjadinya bencana alam.

Namun jika penanganan masalah sampah dilakukan dengan bersama-sama, maka akan berimbas pula terhadap kehidupan masyarakat itu sendiri baik lingkungan menjadi bersih sampai bisa mendapatkan keuntungan dari hasil pengelolaan sampah yang baik dan benar.

Hal itulah yang kemudian dilakukan Camat Lelea Kabupaten Indramayu, Tanti Widyasari untuk menangani sampah di wilayahnya. Tanti membentuk Bank Sampah dan berkerjasama dengan sejumlah sekolah di masing-masing wilayah Kecamatan Lelea Kabupaten Indramayu.

Dijelaskan Tanti Widyasari kepada Indramayu News Center, sejumlah siswa sekolah di Kecamatan Lelea diajak untuk bagaimana bisa memilah sampah yang bernilai ekonomis, untuk kemudian disetorkan melalui Bank Sampah yang dikelola oleh Pramuka di sekolah masing-masing dan sudah bekerjasama dengan sejumlah pengepul sampah.

"Murid-murid kita ini bisa mengumpulkan sampah seperti botol minuman plastik dan lainnya yang bernilai ekonomis. Nanti sistemnya 60% untuk pihak sekolah dan 40% untuk murid atau sebaliknya juga bisa. Sehingga anak-anak ini selain dapat uang jajan tambahan juga bisa masuk ke buku tabungan sekolah," ujar Tanti di ruang kerjanya Selasa (8/2/2022).

Disamping itu, pihaknya juga sudah membentuk Satuan Tugas (Satgas) Kebersihan yang dibentuk di tingkat kecamatan dan desa untuk melakukan kegiatan Jumat Bersih (Jumsih) setiap menjelang akhir pekan dilingkungan perkantoran dan permukiman masyarakat.`,
    kategori: 'Pendidikan',
    status: 'Published',
    createdAt: '2025-06-01 20:25:03',
    views: 342,
    gambar: '/images/1748834703_IMG-20220208-WA0009.jpg',
    isUtama: true,
  },
  {
    id: 78,
    instansi: 'Indramayu News Center',
    pembuat: 'Faiz Ali',
    judul: 'Evaluasi Perkembangan Inovasi & Transformasi Digital Daerah Berlabel Smart City',
    isi: `INDRAMAYU NEWS CENTER — Kementerian Komunikasi dan Informatika RI mengevaluasi gerakan smart city yang telah berjalan di 75 Kota dan Kabupaten termasuk Kabupaten Indramayu. Acara yang berlangsung di Hotel Aston Banyuwangi itu digelar selama tiga hari dengan menghadirkan empat tim evaluator yang melakukan wawancara pada perwakilan masing-masing daerah berlabel smart city. Tim Evaluator terdiri dari beberapa Kementerian dan Lembaga, Akademisi, dan Pelaku Industri Teknologi Informasi.

Indikator penilaian di antaranya Smart Branding, Smart Mobility, dan Smart Environment. Dalam sambutannya, Kasubdit Layanan Aplikasi Informatika Pemerintahan Daerah Kemenkominfo RI Hasyim Gautama mengatakan, sasaran evaluasi adalah 75 Kabupaten dan Kota yang masuk gerakan smart city.

Dia menjelaskan, tujuan utama gerakan smart city adalah pola pikir untuk memunculkan inovasi daerah. Tidak harus bidang teknologi informasi, inovasi juga terbuka untuk dibangun di bidang lain. "Biasanya pembangunan di daerah by sektor, sekarang kita dorong by inovasi, dan inovasi tidak hanya informasi," kata Hasyim.`,
    kategori: 'Teknologi',
    status: 'Published',
    createdAt: '2025-06-01 20:32:30',
    views: 512,
    gambar: '/images/1748835150_WhatsApp-Image-2019-06-18-at-15.06.19.jpeg',
    isUtama: true,
  },
  {
    id: 76,
    instansi: 'Dinas Pariwisata dan Kebudayaan',
    pembuat: 'Faiz Ali',
    judul: 'Pesona Seni Tari Tradisional Indramayu Memukau Panggung Budaya Jawa Barat',
    isi: `INDRAMAYU NEWS CENTER — Keragaman budaya dan seni tradisional Kabupaten Indramayu kembali menarik perhatian masyarakat luas. Pagelaran Tari Topeng Indramayu dan seni Ronggeng Ketuk yang ditampilkan oleh sanggar seni binaan daerah memukau ratusan penonton dalam festival seni budaya tahunan.

Kepala Dinas Pariwisata menyampaikan bahwa penguatan kebudayaan lokal terus didorong melalui regenerasi penari muda serta pementasan rutin di ruang-ruang publik. Upaya ini ditujukan agar identitas kearifan lokal tetap hidup dan menjadi daya tarik pariwisata unggulan daerah.`,
    kategori: 'Sosial',
    status: 'Published',
    createdAt: '2025-05-31 14:50:39',
    views: 289,
    gambar: '/images/dancer1.jpg',
    isUtama: false,
  },
  {
    id: 75,
    instansi: 'Dinas Kesehatan Kabupaten Indramayu',
    pembuat: 'Faiz Ali',
    judul: 'Pencanangan Gerakan Hidup Sehat dan Vaksinasi Terpadu di Seluruh Puskesmas',
    isi: `INDRAMAYU NEWS CENTER — Dinas Kesehatan Kabupaten Indramayu meluncurkan program Gerakan Masyarakat Hidup Sehat (GERMAS) yang dibarengi dengan layanan cek kesehatan berkala serta imunisasi terpadu gratis bagi keluarga di 49 Puskesmas se-Kabupaten.

Langkah preventif ini difokuskan pada deteksi dini penyakit tidak menular (PTM), peningkatan gizi balita untuk pencegahan stunting, serta edukasi sanitasi lingkungan sehat bagi masyarakat pesisir dan pedesaan.`,
    kategori: 'Kesehatan',
    status: 'Published',
    createdAt: '2025-05-30 11:20:00',
    views: 418,
    gambar: '/images/pkk.jpg',
    isUtama: false,
  },
  {
    id: 74,
    instansi: 'Pemerintah Kabupaten Indramayu',
    pembuat: 'Redaksi Indramayu News Center',
    judul: 'Digitalisasi Pelayanan Publik: Akses Administrasi Kependudukan Cepat dan Transparan',
    isi: `INDRAMAYU NEWS CENTER — Transformasi digital di lingkungan Pemkab Indramayu semakin dimatangkan dengan penyediaan sistem administrasi kependudukan online terintegrasi. Masyarakat kini dapat mengurus dokumen kependudukan seperti KTP elektronik, Kartu Keluarga, dan Akta Kelahiran melalui aplikasi terpadu tanpa antre panjang di kantor dinas.

Bupati Indramayu menegaskan bahwa birokrasi yang cepat, ramah, dan bebas pungli adalah komitmen utama dalam memberikan pelayanan prima bagi seluruh warga.`,
    kategori: 'Pemerintahan',
    status: 'Published',
    createdAt: '2025-05-28 09:15:00',
    views: 670,
    gambar: '/images/buatkartu.jpg',
    isUtama: false,
  },
  {
    id: 73,
    instansi: 'Dinas Koperasi dan UMKM',
    pembuat: 'Redaksi Indramayu News Center',
    judul: 'Pemberdayaan UMKM Lokal Melalui Pelatihan Pemasaran Digital dan Sertifikasi Halal',
    isi: `INDRAMAYU NEWS CENTER — Ratusan pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) di Kabupaten Indramayu mengikuti pelatihan intensif mengenai strategi pemasaran e-commerce, fotografi produk, serta pendampingan sertifikasi halal gratis yang difasilitasi oleh dinas terkait.

Diharapkan produk unggulan seperti olahan mangga gedong gincu, kerupuk ikan, dan batik Paoman dapat menembus pasar nasional hingga mancanegara melalui ekosistem digital.`,
    kategori: 'Layanan Publik',
    status: 'Published',
    createdAt: '2025-05-25 14:00:00',
    views: 195,
    gambar: '/images/LOKAL.png',
    isUtama: false,
  }
];

export const INITIAL_KOMENTAR: Komentar[] = [
  {
    id: 1,
    beritaId: 77,
    nama: 'Budi Santoso',
    isi: 'Program bank sampah di sekolah sangat bagus! Selain mendidik anak-anak cinta kebersihan, mereka juga belajar menabung sejak dini.',
    createdAt: '2025-06-02 09:15:00',
  },
  {
    id: 2,
    beritaId: 77,
    nama: 'Siti Rahmawati',
    isi: 'Semoga program ini bisa diterapkan di seluruh kecamatan lain di Indramayu. Sangat menginspirasi.',
    createdAt: '2025-06-02 11:45:00',
  },
  {
    id: 3,
    beritaId: 78,
    nama: 'Ahmad Fauzi',
    isi: 'Keren Indramayu masuk dalam evaluasi Smart City, semoga infrastruktur digital di pedesaan makin merata!',
    createdAt: '2025-06-03 14:20:00',
  }
];

export const INITIAL_SURVEI: SurveiPengunjung[] = [
  {
    id: 1,
    nama: 'Ahmad Subagja',
    q1: 'setuju', q2: 'setuju', q3: 'setuju', q4: 'setuju', q5: 'setuju',
    q6: 'setuju', q7: 'setuju', q8: 'setuju', q9: 'setuju', q10: 'setuju',
    createdAt: '2025-06-01 10:00:00'
  },
  {
    id: 2,
    nama: 'Dewi Lestari',
    q1: 'setuju', q2: 'setuju', q3: 'setuju', q4: 'setuju', q5: 'setuju',
    q6: 'tidak setuju', q7: 'setuju', q8: 'setuju', q9: 'setuju', q10: 'setuju',
    createdAt: '2025-06-01 12:30:00'
  },
  {
    id: 3,
    nama: 'Rian Pratama',
    q1: 'setuju', q2: 'setuju', q3: 'tidak setuju', q4: 'setuju', q5: 'setuju',
    q6: 'setuju', q7: 'setuju', q8: 'setuju', q9: 'setuju', q10: 'setuju',
    createdAt: '2025-06-02 08:15:00'
  },
  {
    id: 4,
    nama: 'Nurul Hidayah',
    q1: 'setuju', q2: 'setuju', q3: 'setuju', q4: 'setuju', q5: 'setuju',
    q6: 'setuju', q7: 'setuju', q8: 'setuju', q9: 'setuju', q10: 'setuju',
    createdAt: '2025-06-02 15:40:00'
  },
  {
    id: 5,
    nama: 'Hendra Gunawan',
    q1: 'setuju', q2: 'setuju', q3: 'setuju', q4: 'tidak setuju', q5: 'setuju',
    q6: 'setuju', q7: 'setuju', q8: 'setuju', q9: 'setuju', q10: 'setuju',
    createdAt: '2025-06-03 11:20:00'
  }
];

export const CATEGORIES = [
  'Semua',
  'Pendidikan',
  'Teknologi',
  'Pemerintahan',
  'Kesehatan',
  'Sosial',
  'Layanan Publik',
] as const;
