import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'INC PORTAL — Indramayu News Center | Diskominfo',
  description:
    'Portal Publikasi Berita Resmi, Agenda Pembangunan, dan Survei Pelayanan Informasi Publik Diskominfo Kabupaten Indramayu.',
  keywords: [
    'Indramayu',
    'Diskominfo',
    'Berita Indramayu',
    'Portal Berita',
    'Smart City',
    'Pelayanan Publik',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="icon" href="/images/logo3.png" />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
