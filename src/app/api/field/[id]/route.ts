import {
  FieldPayload,
  deleteField,
  getFieldById,
  updateField
} from '@/services/field';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const id = requestUrl.pathname.split('/').pop();

  const { data, error } = await getFieldById(id);
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

export async function PUT(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const id = requestUrl.pathname.split('/').pop();

  const fieldPayload: FieldPayload = await request.json();

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

  const { data, error } = await updateField(id, fieldPayload);

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
    { status: 'success', message: 'Field succesfully updated', data },
    { status: 200 }
  );
}

export async function DELETE(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const id = requestUrl.pathname.split('/').pop();
  const { error } = await deleteField(id);
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
    { status: 'success', message: 'Field succesfully deleted' },
    { status: 200 }
  );
}
