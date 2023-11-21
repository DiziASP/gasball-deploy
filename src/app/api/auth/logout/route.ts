import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json(
      {
        status: error.name,
        message: error.message
      },
      { status: error.status }
    );
  }

  return NextResponse.json(
    { message: 'User succesfully logged out' },
    { status: 200 }
  );
}
