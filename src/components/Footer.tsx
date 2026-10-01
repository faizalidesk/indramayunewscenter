import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Globe, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-zinc-400 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Instansi Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl p-1.5 flex items-center justify-center">
                <Image
                  src="/images/logo3.png"
                  alt="Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-base tracking-wide">INC PORTAL</h3>
                <p className="text-xs text-zinc-400 font-medium">Diskominfo Kab. Indramayu</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-zinc-400">
              Pusat publikasi berita resmi, agenda pembangunan, dan layanan keterbukaan informasi publik Pemerintah Kabupaten Indramayu.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-zinc-400">
              <Shield className="w-4 h-4 text-white" />
              <span>Sistem Terverifikasi & Terbuka</span>
            </div>
          </div>

          {/* Col 2: Kategori Populer */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Kategori Informasi</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/berita?kategori=Pemerintahan" className="hover:text-white transition">
                  Pemerintahan & Kebijakan
                </Link>
              </li>
              <li>
                <Link href="/berita?kategori=Pendidikan" className="hover:text-white transition">
                  Pendidikan & Beasiswa
                </Link>
              </li>
              <li>
                <Link href="/berita?kategori=Teknologi" className="hover:text-white transition">
                  Teknologi & Smart City
                </Link>
              </li>
              <li>
                <Link href="/berita?kategori=Kesehatan" className="hover:text-white transition">
                  Kesehatan & Sanitasi
                </Link>
              </li>
              <li>
                <Link href="/berita?kategori=Layanan Publik" className="hover:text-white transition">
                  Layanan Publik & UMKM
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Akses Cepat */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Akses Cepat</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/berita" className="hover:text-white transition">
                  Arsip & Katalog Berita
                </Link>
              </li>
              <li>
                <Link href="/survei" className="hover:text-white transition text-zinc-200 font-semibold underline underline-offset-4">
                  Survei Kepuasan Pengunjung
                </Link>
              </li>
              <li>
                <Link href="/admin/survei" className="hover:text-white transition">
                  Statistik & Hasil Survei
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition">
                  Portal Administrator
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Kontak & Kantor */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">Kontak Instansi</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-zinc-400 flex-shrink-0 mt-0.5" />
                <span>Jl. Mayor Dasuki No. 28, Indramayu, Jawa Barat 45214</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <span>(0234) 272-xxx / Call Center 112</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <span>diskominfo@indramayukab.go.id</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                <span>www.indramayukab.go.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
          <p>© {new Date().getFullYear()} Dinas Komunikasi dan Informatika Kabupaten Indramayu.</p>
          <p className="flex items-center gap-1 text-zinc-500">
            Edisi Monokrom Minimalis • Next.js & React
          </p>
        </div>
      </div>
    </footer>
  );
};

