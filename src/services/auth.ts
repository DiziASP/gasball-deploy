import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { Payload } from '../../types/database.types';

export interface AccountCredentials {
  email: string;
  password: string;
}

// Registers a new user in auth.users; Then, a new duplicate row in public.users is created using a trigger
export const registerAndCreateAccount = async (
  accountPayload: Payload<'users'>,
  password: string,
  requestUrl: URL
) => {
  const supabase = createClient(cookies());
  const query = supabase.auth.signUp({
    email: accountPayload.email as string,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
      data: {
        username: accountPayload.username,
        full_name: accountPayload.full_name,
        phone_number: accountPayload.phone_number,
        role: accountPayload.role
      }
    }
  });
  const { data, error } = await query;
  return { data, error };
};

export const signIn = async (accountCredentials: AccountCredentials) => {
  const supabase = createClient(cookies());
  const query = supabase.auth.signInWithPassword({
    ...accountCredentials
  });
  const { data, error } = await query;
  return { data, error };
};

export const signOut = async () => {
  const supabase = createClient(cookies());
  const query = supabase.auth.signOut();
  const { error } = await query;
  return { error };
};

export const getCurrentUser = async () => {
  const supabase = createClient(cookies());
  const query = supabase.auth.getUser();
  const { data, error } = await query;
  return { data, error };
};
