// POST /api/field

import {
  FieldFilter,
  createField,
  getFields
} from '@/services/field';
import { NextRequest, NextResponse } from 'next/server';
import { Payload } from '../../../../types/database.types';

// Creates a field
export async function POST(request: Request) {
  const fieldPayload: Payload<"fields"> = await request.json();

  if (
    !fieldPayload.keeperId ||
    !fieldPayload.name ||
    !fieldPayload.pricePerHour ||
    fieldPayload.syntheticGrass === null ||
    fieldPayload.indoor === null ||
    fieldPayload.playerBench === null ||
    fieldPayload.watcherBench === null ||
    fieldPayload.available === null
  ) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Missing required field'
      },
      { status: 422 }
    );
  }

  const { data, error } = await createField(fieldPayload);
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
    { status: 'success', message: 'Field succesfully created', data },
    { status: 200 }
  );
}

// GET /api/field
// Gets all field with query params
export async function GET(request: NextRequest) {
  const searchQuery = request.nextUrl.searchParams;
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

  const { data, error } = await getFields(filters);
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
