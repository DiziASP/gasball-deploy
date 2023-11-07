import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.json();
  const { email, password } = formData;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

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
    { status: 'success', message: 'Account succesfully logged in', data },
    { status: 200 }
  );
}
