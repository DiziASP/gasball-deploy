import { UserUpdatePayload, updateUser } from '@/services/user';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  const requestUrl = new URL(request.url);

  const id = requestUrl.pathname.split('/').pop();
  const { username, first_name, last_name, phone_number } =
    await request.json();
  console.log(id, username, first_name, last_name, phone_number);

  if (!username || !first_name || !last_name || !phone_number) {
    return NextResponse.json(
      {
        status: 'FieldError',
        message:
          'Request MUST include username, first_name, last_name, phone_number'
      },
      { status: 422 }
    );
  }

  const { data, error } = await updateUser(
    { username, first_name, last_name, phone_number } as UserUpdatePayload,
    id
  );

  if (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error.message
      },
      { status: 400 }
    );
  }

  if (data?.length === 0) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'User unauthorized to make changes'
      },
      { status: 403 }
    );
  }

  return NextResponse.json(
    { status: 'success', message: 'Account succesfully updated', data },
    { status: 200 }
  );
}
