import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { data, error } = await supabase.from('countries').select('*');

  if (!error) {
    return NextResponse.json({ message: data }, { status: 200 });
  }

  return NextResponse.json({ message: error.message }, { status: 500 });
}
