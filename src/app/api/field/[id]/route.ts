import { deleteField, getFieldById, updateField } from '@/services/field';
import { NextRequest, NextResponse } from 'next/server';
import { Payload } from '../../../../../types/database.types';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const id = requestUrl.pathname.split('/').pop();

  const { data, error } = await getFieldById(id);
  if (error) {
    // console.log(error);
    return NextResponse.json(
      {
        status: 'error',
        message: error.message
      },
      { status: 400 }
    );
  }
  return NextResponse.json(
    {
      status: 'success',
      message: 'Field succesfully fetched',
      data: { field: data }
    },
    { status: 200 }
  );
}

export async function PUT(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const id = requestUrl.pathname.split('/').pop();

  const fieldPayload: Payload<'fields'> = await request.json();

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
    {
      status: 'success',
      message: 'Field succesfully updated',
      data: { field: data }
    },
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
