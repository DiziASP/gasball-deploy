import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { Payload } from '../../types/database.types';

export interface UserUpdatePayload {
  username?: String | null;
  first_name?: String | null;
  last_name?: String | null;
  phone_number?: String | null;
}

export const updateUser = async (
  userUpdatePayload: Payload<'users'>,
  id: string
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
