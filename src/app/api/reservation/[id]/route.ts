import { getReservationById } from '@/services/reservations';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const id = requestUrl.pathname.split('/').pop();

  const { data, error } = await getReservationById(id);
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
      message: 'Reservations succesfully fetched',
      data: { reservation: data }
    },
    { status: 200 }
  );
}
