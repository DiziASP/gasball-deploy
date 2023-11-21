import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Payload } from '../../../../../types/database.types';
import { registerAndCreateAccount } from '@/services/auth';

// POST /api/auth/register
// request body: {
//   "email": "admin@gmail.com",
//   "password": "adminadmin",
//   "username": "admin",
//   "full_name": "Admin",
//   "phone_number": "081593201831",
//   "role": "admin"
// }
// status: {
//   success: 200,
//   bad request: 400; One or many of the body parameters are not present
// }
export async function POST(request: NextRequest) {
  const bodyRequest = await request.json();
  const requestUrl = new URL(request.url);

  const accountPayload: Payload<'users'> = bodyRequest;
  const { password } = bodyRequest;

  // Check for body parameters
  if (
    !accountPayload.email ||
    !accountPayload.full_name ||
    !accountPayload.phone_number ||
    !accountPayload.role ||
    !accountPayload.username ||
    !password
  ) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Bad request! All body parameters should be present'
      },
      { status: 400 }
    );
  }

  // execute register
  const { data, error } = await registerAndCreateAccount(
    accountPayload,
    password,
    requestUrl
  );

  // Check for supabase errors
  if (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error.message
      },
      { status: error.status }
    );
  }

  // successful return
  return NextResponse.json(
    { status: 'success', message: 'Account created succesfully', data: data },
    { status: 200 }
  );
}
