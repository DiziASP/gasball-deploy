import { createClient } from '@/lib/supabase/server';
import { Payload } from '../../types/database.types';
import { cookies } from 'next/headers';




export const createReservation = async (
  reservationPayload: Payload<'reservations'>
) => {
  const supabase = createClient(cookies());
  const query = supabase
    .from('reservations')
    .insert([{ ...reservationPayload }])
    .select()
    .single();
  const { data, error } = await query;
  return { data, error };
};

export const getReservation = async () => {
  const supabase = createClient(cookies());
  const query = supabase.from('reservations').select();

  // filters go here

  const { data, error } = await query;
  return { data, error };
};

export const getReservationById = async (id: string) => {
  const supabase = createClient(cookies());
  const query = supabase.from('reservations').select().eq('id', id).single();
  const { data, error } = await query;
  return { data, error };
};

export const getReservationByFieldId = async (fieldId: string) => {
  const supabase = createClient(cookies());
  const query = supabase.from('reservations').select().eq('fieldId', fieldId);
  const { data, error } = await query;
  return { data, error };
};

export const getReservationByCustomerId = async (customerId: string) => {
  const supabase = createClient(cookies());
  const query = supabase
    .from('reservations')
    .select()
    .eq('customerId', customerId);
  const { data, error } = await query;
  return { data, error };
};

export const updateReservation = async (
  id: string,
  reservationPayload: Payload<'reservations'>
) => {
  const supabase = createClient(cookies());
  const query = supabase
    .from('reservations')
    .update({ ...reservationPayload })
    .eq('id', id)
    .select()
    .single();
  const { data, error } = await query;
  return { data, error };
};

export const deleteReservation = async (id: string) => {
  const supabase = createClient(cookies());
  const query = supabase.from('reservations').delete().eq('id', id);
  const { error } = await query;
  return { error };
};
