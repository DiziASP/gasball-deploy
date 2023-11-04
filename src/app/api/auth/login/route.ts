/**
 * @swagger
 * /api/auth/login:
 *   get:
 *     description: Logging In and Redirect user to Main Page
 *     parameters:
 *        - email: email
 *        - password: password
 *     responses:
 *       200:
 *         description: Login Successful
 */
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error)
    return new NextResponse(error.message, { status: error.status || 500 });

  /* Success */
  const { origin } = request.nextUrl;
  return NextResponse.redirect(`${origin}/`);
}
