import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { message: `No user is signed in` },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { message: 'Current user in session succefully fetched', user },
    { status: 200 }
  );
}
