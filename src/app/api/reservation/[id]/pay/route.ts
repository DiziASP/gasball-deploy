import { payReservation } from '@/services/reservations';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const id = requestUrl.pathname.split('/').reverse()[1];

  const { data, error } = await payReservation(id);

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
      message: 'Reservation paid for succesfully',
      data: { reservation: data }
    },
    { status: 200 }
  );
}
