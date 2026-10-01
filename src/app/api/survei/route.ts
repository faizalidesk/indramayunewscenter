import { NextResponse } from 'next/server';
import { INITIAL_SURVEI } from '@/lib/data';

export async function GET() {
  return NextResponse.json(INITIAL_SURVEI);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newSurvei = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json(newSurvei, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Gagal mengirim survei' }, { status: 400 });
  }
}
