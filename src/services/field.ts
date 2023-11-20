import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { DbResult, Payload, Tables } from '../../types/database.types';

export interface FieldFilter {
  name?: string | null;
  priceStart?: number | null;
  priceEnd?: number | null;
  syntheticGrass?: boolean | null;
  indoor?: boolean | null;
  playerBench?: boolean | null;
  watcherBench?: boolean | null;
  available?: boolean | null;
}

export const createField = async (fieldPayload: Payload<"fields">) => {
  const supabase = createClient(cookies());

  const { data, error } = await supabase
    .from('fields')
    .insert([{ ...fieldPayload }])
    .select();

  return { data, error };
};

export const updateField = async (id: string, fieldPayload: Payload<'fields'>) => {
  const supabase = createClient(cookies());

  const { data, error } = await supabase
    .from('fields')
    .update({ ...fieldPayload })
    .eq('id', id)
    .select();

  return { data, error };
};

export const deleteField = async (id: string) => {
  const supabase = createClient(cookies());
  const { error } = await supabase.from('fields').delete().eq('id', id);
  return { error };
};

export const getFieldById = async (id: string) => {
  const supabase = createClient(cookies());

  const { data, error } = await supabase
    .from('fields')
    .select('*')
    .eq('id', id);

  return { data, error };
};

export const getFields = async (fieldFilter: FieldFilter) => {
  const {
    name,
    priceStart,
    priceEnd,
    syntheticGrass,
    indoor,
    playerBench,
    watcherBench,
    available
  } = fieldFilter;
  const supabase = createClient(cookies());

  let query = supabase.from('fields').select();
  if (priceStart) {
    query.gte('pricePerHour', priceStart);
  }
  if (priceEnd) {
    query.lte('pricePerHour', priceEnd);
  }
  if (syntheticGrass) {
    query.eq('syntheticGrass', syntheticGrass);
  }
  if (indoor) {
    query.eq('indoor', indoor);
  }
  if (playerBench) {
    query.eq('playerBench', playerBench);
  }
  if (watcherBench) {
    query.eq('watcherBench', watcherBench);
  }
  if (available) {
    query.eq('available', available);
  }
  if (name) {
    query.textSearch('name', name);
  }

  const { data, error } = await query;
  return { data, error };
};
