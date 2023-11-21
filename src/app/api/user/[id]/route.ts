import { deleteUser, getUserById, updateUser } from '@/services/user';
import { AuthError } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { Payload } from '../../../../../types/database.types';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const id: string | undefined = requestUrl.pathname.split('/').pop();

  // execute register
  const { data, error } = await getUserById(id);

  // Check for supabase errors
  if (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error.message
      },
      { status: Number(error.code) }
    );
  }

  // successful return
  return NextResponse.json(
    {
      status: 'success',
      message: 'User fetched succesfully',
      data: { user: data }
    },
    { status: 200 }
  );
}

export async function PUT(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const id: string | undefined = requestUrl.pathname.split('/').pop();
  const userPayload: Payload<'users'> = await request.json();

  // only accept full_name, phone_number, and username changes
  if (
    userPayload.full_name === undefined ||
    userPayload.phone_number === undefined ||
    userPayload.username === undefined ||
    userPayload.created_at ||
    userPayload.email ||
    userPayload.id ||
    userPayload.role ||
    userPayload.updated_at
  ) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Bad request! Body parameters are not correct'
      },
      { status: 400 }
    );
  }

  // execute update
  const { data, error } = await updateUser(userPayload, id);

  // Check for supabase errors
  if (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error.message
      },
      { status: Number(error.code) }
    );
  }

  // successful return
  return NextResponse.json(
    {
      status: 'success',
      message: 'User updated succesfully',
      data: { user: data }
    },
    { status: 200 }
  );
}

export async function DELETE(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const id: string | undefined = requestUrl.pathname.split('/').pop();

  // execute delete
  const { error } = await deleteUser(id);

  // Check for auth errors
  if (error && error instanceof AuthError) {
    return NextResponse.json(
      {
        status: 'error',
        message: error.message
      },
      { status: error.status }
    );
  }

  // Check for supabase errors
  if (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error.message
      },
      { status: Number(error.code) }
    );
  }

  // successful return
  return NextResponse.json(
    {
      status: 'success',
      message: 'User deleted succesfully'
    },
    { status: 200 }
  );
}
