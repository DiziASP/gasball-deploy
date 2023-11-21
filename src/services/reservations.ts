import { createClient } from '@/lib/supabase/server';
import { Payload } from '../../types/database.types';
import { cookies } from 'next/headers';

export interface ReservationFilter {
  yearStart: number | null;
  monthStart: number | null;
  yearEnd: number | null;
  monthEnd: number | null;
  paidStatus: boolean | null;
}

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

export const getReservations = async (reservationFilter: ReservationFilter) => {
  const { yearStart, yearEnd, monthStart, monthEnd, paidStatus } =
    reservationFilter;
  const supabase = createClient(cookies());
  const query = supabase.from('reservations').select();

  console.log(yearStart, monthStart, yearEnd, monthEnd);

  if (paidStatus !== null) {
    query.eq('paidStatus', paidStatus);
  }
  if (
    yearStart !== null &&
    monthStart !== null &&
    yearEnd !== null &&
    monthEnd !== null
  ) {
    const startDate = new Date(yearStart, monthStart, 1).toISOString();
    const endDate = new Date(yearEnd, monthEnd, 1).toISOString();
    query.lt('orderDate', endDate);
    query.gt('orderDate', startDate);
  }
  const { data, error } = await query;
  return { data, error };
};

export const getReservationById = async (id: string | null | undefined) => {
  const supabase = createClient(cookies());
  const query = supabase
    .from('reservations')
    .select()
    .eq('id', id as string)
    .single();
  const { data, error } = await query;
  return { data, error };
};

export const getReservationByFieldId = async (
  fieldId: string | null | undefined
) => {
  const supabase = createClient(cookies());
  const query = supabase
    .from('reservations')
    .select()
    .eq('fieldId', fieldId as string);
  const { data, error } = await query;
  return { data, error };
};

export const getReservationByCustomerId = async (
  customerId: string | null | undefined
) => {
  const supabase = createClient(cookies());
  const query = supabase
    .from('reservations')
    .select()
    .eq('customerId', customerId as string);
  const { data, error } = await query;
  return { data, error };
};

export const payReservation = async (id: string | null | undefined) => {
  const supabase = createClient(cookies());
  const query = supabase
    .from('reservations')
    .update({ paidStatus: true })
    .eq('id', id as string)
    .select()
    .single();
  const { data, error } = await query;
  return { data, error };
};
