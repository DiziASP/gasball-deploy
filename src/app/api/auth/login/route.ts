import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { AuthApiError, AuthInvalidCredentialsError, AuthUnknownError } from '@supabase/supabase-js';

export async function GET(request :NextRequest) {
  const { origin } = request.nextUrl;

  return NextResponse.redirect(`${origin}/auth/login`);
}

export async function POST(request :NextRequest) {
  const { email, password } = await request.json();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) 
    return new NextResponse(error.message, { status: error.status || 500 });

  /* Success */
  const { origin } = request.nextUrl;
  return NextResponse.redirect(`${origin}/`);
}
