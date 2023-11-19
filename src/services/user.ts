import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export interface UserUpdatePayload {
  username: String;
  first_name: String;
  last_name: String;
  phone_number: String;
}

export const updateUser = async (
  userUpdatePayload: UserUpdatePayload,
  id: string | undefined
) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('users')
    .update({ ...userUpdatePayload })
    .eq('id', id)
    .select();

  return { data, error };
};