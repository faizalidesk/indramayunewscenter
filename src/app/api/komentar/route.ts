import { NextResponse } from 'next/server';
import { INITIAL_KOMENTAR } from '@/lib/data';

export async function GET() {
  return NextResponse.json(INITIAL_KOMENTAR);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newKomentar = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json(newKomentar, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Gagal mengirim komentar' }, { status: 400 });
  }
}
