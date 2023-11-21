import {
  FieldFilter,
  createField,
  getFieldByKeeperId,
  getFields
} from '@/services/field';
import { NextRequest, NextResponse } from 'next/server';
import { Payload } from '../../../../types/database.types';

export async function POST(request: Request) {
  const fieldPayload: Payload<'fields'> = await request.json();

  // only accept keeperId, name, location, pricePerHour, syntheticGrass, indoor, playerBench, watcherBench, available
  if (
    fieldPayload.keeperId === undefined ||
    fieldPayload.name === undefined ||
    fieldPayload.location === undefined ||
    fieldPayload.pricePerHour === undefined ||
    fieldPayload.syntheticGrass === undefined ||
    fieldPayload.indoor === undefined ||
    fieldPayload.playerBench === undefined ||
    fieldPayload.watcherBench === undefined ||
    fieldPayload.available === undefined ||
    fieldPayload.id ||
    fieldPayload.created_at ||
    fieldPayload.updated_at
  ) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Bad request! Body parameters are not correct'
      },
      { status: 400 }
    );
  }

  // execute create
  const { data, error } = await createField(fieldPayload);

  // Check for supabase errors
  if (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error.message
      },
      { status: 400 }
    );
  }

  // successful return
  return NextResponse.json(
    {
      status: 'success',
      message: 'User updated succesfully',
      data: { field: data }
    },
    { status: 200 }
  );
}

export async function GET(request: NextRequest) {
  const searchQuery = request.nextUrl.searchParams;

  const keeperId =
    searchQuery.get('keeperId') !== null ? searchQuery.get('keeperId') : null;
  const filters: FieldFilter = {
    name: searchQuery.get('name'),
    priceStart:
      searchQuery.get('priceStart') !== null
        ? Number(searchQuery.get('priceStart'))
        : null,
    priceEnd:
      searchQuery.get('priceEnd') !== null
        ? Number(searchQuery.get('priceEnd'))
        : null,
    syntheticGrass:
      searchQuery.get('syntheticGrass') !== null
        ? searchQuery.get('syntheticGrass') === 'true'
        : null,
    indoor:
      searchQuery.get('indoor') !== null
        ? searchQuery.get('indoor') === 'true'
        : null,
    playerBench:
      searchQuery.get('playerBench') !== null
        ? searchQuery.get('playerBench') === 'true'
        : null,
    watcherBench:
      searchQuery.get('watcherBench') !== null
        ? searchQuery.get('watcherBench') === 'true'
        : null,
    available:
      searchQuery.get('available') !== null
        ? searchQuery.get('available') === 'true'
        : null
  };

  const { data, error } = keeperId === null
    ? await getFields(filters)
    : await getFieldByKeeperId(keeperId);
  if (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error.message
      },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { status: 'success', message: 'Field succesfully fetched', data },
    { status: 200 }
  );
}
