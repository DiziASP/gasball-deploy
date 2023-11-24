import { getAllUser, getUserByRole } from '@/services/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchQuery = request.nextUrl.searchParams;
  const role =
    searchQuery.get('role') !== null ? searchQuery.get('role') : null;

  // execute register
  const { data, error } =
    role === null ? await getAllUser() : await getUserByRole(role);

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
