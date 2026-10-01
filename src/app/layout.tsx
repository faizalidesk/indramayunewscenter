import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Indramayu News Center — Portal Berita Resmi & Terpercaya',
  description:
    'Portal Publikasi Berita Resmi, Agenda Pembangunan, dan Survei Pelayanan Informasi Publik Indramayu News Center.',
  keywords: [
    'Indramayu News Center',
    'INC Portal',
    'Indramayu',
    'Berita Indramayu',
    'Portal Berita',
    'Informasi Publik',
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
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-950 selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
