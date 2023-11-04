import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { AuthApiError, AuthError } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  const { origin } = request.nextUrl;

  return NextResponse.redirect(`${origin}/auth/register`);
}

export async function POST(request: NextRequest) {
  const { username, email, password } = await request.json();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username }
    }
  });

  if (!error) {
    const { origin } = request.nextUrl;
    return NextResponse.redirect(`${origin}/auth/login`);
  }
  return new NextResponse(error.message, { status: error.status || 500 });
}
