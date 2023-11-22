import { NextRequest, NextResponse } from 'next/server';
import { Payload } from '../../../../types/database.types';
import {
  ReservationFilter,
  createReservation,
  getReservationByCustomerId,
  getReservationByFieldId,
  getReservationByKeeperId,
  getReservations
} from '@/services/reservations';

export async function GET(request: NextRequest) {
  const searchQuery = request.nextUrl.searchParams;
  const fieldId = searchQuery.get('fieldId');
  const customerId = searchQuery.get('customerId');
  const keeperId = searchQuery.get('keeperId');
  const filters: ReservationFilter = {
    yearStart:
      searchQuery.get('yearStart') !== null
        ? Number(searchQuery.get('yearStart'))
        : null,
    monthStart:
      searchQuery.get('monthStart') !== null
        ? Number(searchQuery.get('monthStart'))
        : null,
    yearEnd:
      searchQuery.get('yearEnd') !== null
        ? Number(searchQuery.get('yearEnd'))
        : null,
    monthEnd:
      searchQuery.get('monthEnd') !== null
        ? Number(searchQuery.get('monthEnd'))
        : null,
    paidStatus:
      searchQuery.get('paidStatus') !== null
        ? searchQuery.get('paidStatus') === 'true'
        : null
  };

  let data, error;

  if (fieldId) {
    ({ data, error } = await getReservationByFieldId(fieldId));
  } else if (customerId) {
    ({ data, error } = await getReservationByCustomerId(customerId));
  } else if (keeperId) {
    ({ data, error } = await getReservationByKeeperId(keeperId));
  } else {
    ({ data, error } = await getReservations(filters));
  }

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
      message: 'Reservation succesfully fetched',
      data: { reservation: data }
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  const reservationPayload: Payload<'reservations'> = await request.json();

  if (
    reservationPayload.customerId === undefined ||
    reservationPayload.customerName === undefined ||
    reservationPayload.fieldId === undefined ||
    reservationPayload.hourRange === undefined ||
    reservationPayload.orderDate === undefined ||
    reservationPayload.totalPrice === undefined ||
    reservationPayload.created_at ||
    reservationPayload.id ||
    reservationPayload.paidStatus ||
    reservationPayload.updated_at
  ) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'Bad request! Body parameters are not correct'
      },
      { status: 400 }
    );
  }

  reservationPayload.paidStatus = false; // awalnya reservation fasle semuah
  const { data, error } = await createReservation(reservationPayload);

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
      message: 'Reservation updated succesfully',
      data: { reservation: data }
    },
    { status: 200 }
  );
}
