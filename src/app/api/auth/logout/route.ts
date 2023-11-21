import { signOut } from '@/services/auth';
import { NextRequest, NextResponse } from 'next/server';

// POST /api/auth/logout
// request body: {}
// status: {
//   success: 200
// }
export async function POST(request: NextRequest) {
  // execute logout
  const { error } = await signOut();

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
    { status: 'success', message: 'Account logged out succesfully' },
    { status: 200 }
  );
}
