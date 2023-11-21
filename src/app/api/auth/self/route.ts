import { getCurrentUser } from '@/services/auth';
import { getUserById } from '@/services/user';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/auth/self
// request body: {}
// response: {
//     "status": "success",
//     "message": "Current logged in account fetched succesfully",
//     "data": {
//         "user": {
//             "id": "6b7442c3-3e05-4b80-8f68-e693e0b27460",
//             "username": "admin",
//             "full_name": "Admin",
//             "phone_number": "081593201831",
//             "role": "admin"
//         }
//     }
// }
// status: {
//   success: 200
//   unauthorized: 401; No user is logged in
// }
export async function GET(request: NextRequest) {
  // execute logout
  const authUser = await getCurrentUser();

  // Check for auth errors
  if (authUser.error) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'No user is signed in'
      },
      { status: authUser.error.status }
    );
  }

  // execute get user with id from authUser
  const { data, error } = await getUserById(authUser.data.user?.id);

  // Check for supabase errors
  if (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error.message
      },
      { status: 400 }
    );
  }

  // successful return
  return NextResponse.json(
    {
      status: 'success',
      message: 'Current logged in account fetched succesfully',
      data: { user: data }
    },
    { status: 200 }
  );
}
