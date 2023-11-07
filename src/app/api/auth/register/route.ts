import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`
    }
  });

  if (error) {
    return NextResponse.json(
      { message: `${error.name} - ${error.message}` },
      { status: error.status }
    );
  }

  return NextResponse.json(
    { message: 'Account succesfully created', data },
    { status: 200 }
  );
}
