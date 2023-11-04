/**
 * @swagger
 * /api/auth/register:
 *   get:
 *     description: Registering User
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
