import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { Payload } from '../../types/database.types';

export interface UserUpdatePayload {
  username?: String | null;
  first_name?: String | null;
  last_name?: String | null;
  phone_number?: String | null;
}

export const getAllUser = async () => {
  const supabase = createClient(cookies());
  const query = supabase.from('users').select();
  const { data, error } = await query;
  return { data, error };
};

export const getUserByRole = async (role: string) => {
  const supabase = createClient(cookies());
  const query = supabase.from('users').select().eq('role', role);
  const { data, error } = await query;
  return { data, error };
};

export const getUserById = async (id: string | undefined) => {
  const supabase = createClient(cookies());
  const query = supabase
    .from('users')
    .select()
    .eq('id', id as string)
    .single();
  const { data, error } = await query;
  return { data, error };
};

export const updateUser = async (
  userPayload: Payload<'users'>,
  id: string | undefined
) => {
  const supabase = createClient(cookies());
  const query = supabase
    .from('users')
    .update({ ...userPayload })
    .eq('id', id as string)
    .select()
    .single();
  const { data, error } = await query;
  return { data, error };
};

export const deleteUser = async (id: string | undefined) => {
  const supabase = createClient(cookies());
  const authUser = await supabase.auth.admin.deleteUser(id as string);
  if (authUser.error) {
    const error = authUser.error;
    return { error };
  }
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', id as string);
  return { error };
};

const mockData = [
  {
    email: 'abil@gmail.com',
    password: 'abilabil',
    username: 'abilium',
    full_name: 'Abil Saffa',
    phone_number: '081285557881',
    role: 'penjaga'
  },
  {
    email: 'dizi@gmail.com',
    password: 'dizidizi',

    username: 'dizicintarpl',
    full_name: 'Raden Dizi',
    phone_number: '081283217473',
    role: 'penjaga'
  },
  {
    email: 'naura@gmail.com',
    password: 'nauranaura',
    username: 'naurajawir',
    full_name: 'Naura Valda',
    phone_number: '081238726423',
    role: 'penjaga'
  },
  {
    email: 'ojan@gmail.com',
    password: 'ojanojan',
    username: 'ojanfigma',
    full_name: 'Rozan Ghosani',
    phone_number: '088893471944',
    role: 'pelanggan'
  },
  {
    email: 'hugo@gmail.com',
    password: 'hugohugo',
    username: 'hugorz',
    full_name: 'Hugo Tani',
    phone_number: '081310482948',
    role: 'pelanggan'
  },
  {
    email: 'frendy@gmail.com',
    password: 'frendyfrendy',
    username: 'frendyctf',
    full_name: 'Frendy Sanusi',
    phone_number: '088838219741',
    role: 'pelanggan'
  },
  {
    email: 'admin@gmail.com',
    password: 'adminadmin',
    username: 'admin',
    full_name: 'Admin',
    phone_number: '081593201831',
    role: 'admin'
  }
];
