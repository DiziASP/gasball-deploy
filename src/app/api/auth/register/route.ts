import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.json();

  const { email, password, username, first_name, last_name, phone_number } =
    formData;

  const role = formData.role || 'pelanggan';

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  console.log(
    email,
    password,
    username,
    first_name,
    last_name,
    phone_number,
    role
  );

  if (!username || !first_name || !last_name || !phone_number) {
    return NextResponse.json(
      {
        status: 'FieldError',
        message:
          'Request MUST include email, password, username, first_name, last_name, phone_name'
      },
      { status: 422 }
    );
  }

  // Add new row for a user to auth.users table. Trigger will run to add the newly created row from auth.users to public.users
  // TODO: create triggers for update
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
      data: {
        username,
        first_name,
        last_name,
        phone_number,
        role
      }
    }
  });

  if (error) {
    return NextResponse.json(
      {
        status: error.name,
        message: error.message
      },
      { status: error.status }
    );
  }

  return NextResponse.json(
    { status: 'success', message: 'Account succesfully created', data },
    { status: 200 }
  );
}
