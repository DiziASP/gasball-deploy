import { NextRequest, NextResponse } from 'next/server';
import { Payload } from '../../../../types/database.types';
import { createReservation } from '@/services/reservations';

export async function GET(request: NextRequest) {}

export async function POST(request: NextRequest) {
  const reservationPayload: Payload<'reservations'> = await request.json();

  if (
    // Check if required fields are present
    !reservationPayload.customerId ||
    !reservationPayload.customerName ||
    !reservationPayload.date ||
    !reservationPayload.fieldId ||
    !reservationPayload.hourRange ||
    reservationPayload.paidStatus === null
  ) {
    return NextResponse.json(
      { status: 'error', message: 'Bad request' },
      { status: 400 }
    );
  }

  const reservation = await createReservation(reservationPayload);

  if (reservation.error) {
    NextResponse.json(
      {
        status: 'error',
        message: 'Something went wrong'
      },
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      status: 'success',
      message: 'Reservation created successfuly',
      data: { reservation: reservation.data }
    },
    { status: 200 }
  );
}
