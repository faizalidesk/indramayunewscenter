import { NextResponse } from 'next/server';
import { INITIAL_BERITA } from '@/lib/data';

export async function GET() {
  return NextResponse.json(INITIAL_BERITA);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newBerita = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
      views: 0,
    };
    return NextResponse.json(newBerita, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Gagal membuat berita' }, { status: 400 });
  }
}
