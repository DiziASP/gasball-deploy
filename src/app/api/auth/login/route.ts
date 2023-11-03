import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  return NextResponse.json(
    { message: 'This is the login route' },
    { status: 200 }
  );
}
