'use client';

import { useEffect, useState } from 'react';
import {
  FieldPayload,
  ReservationPayload
} from '../../../../../../types/payload.types';
import { OrderSummaryCard } from '@/components/ui/order-summary';
import { PaymentCard } from '@/components/ui/payment';
import Error from 'next/error';
import { useRouter } from 'next/navigation';

export default function PaymentPage({ params }: { params: { id: string } }) {
  const { push } = useRouter();

  const reservationId = params.id;
  const [reservation, setReservation] = useState<ReservationPayload>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPaying, setIsPaying] = useState<boolean>(true);
  const [field, setField] = useState<FieldPayload>();

  async function handlePayOnClick(e: any) {
    e.preventDefault();

    setIsLoading(true);
    try {
      const origin = 'http://localhost:3000';
      const res = await fetch(
        `${origin}/api/reservation/${reservation?.id}/pay`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const json = await res.json();
      const data: ReservationPayload = json['data']['reservation'];
      console.log(data);
      setIsLoading(false);
      setIsPaying(!data.paidStatus);
      // return data['data']['reservation'];
    } catch (err) {
      // console.log(err);
    }
  }

  useEffect(() => {
    const fetchReservation = async () => {
      const origin = 'http://localhost:3000';
      console.log(origin);
      const res = await fetch(`${origin}/api/reservation/${reservationId}`);
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json['message']);
      }
      const data: ReservationPayload = json['data']['reservation'];
      setReservation(data);
      setField(data.fields);
      setIsPaying(!data.paidStatus);
    };
    fetchReservation().catch((e: Error) => {
      push('/not-found');
    });
  }, [reservationId, push]);

  useEffect(() => {
    if (!isPaying) {
      console.log('kfwoajiogbaiho');
      setTimeout(() => {
        push('/');
      }, 5000);
    }
  }, [isPaying, push]);

  return (
    <div className="flex-1 my-12 rounded-3xl px-96 py-[72px]">
      <div className="flex flex-row justify-around gap-4">
        <PaymentCard
          isPaying={isPaying}
          isLoading={isLoading}
          handlePayOnClick={handlePayOnClick}
        />
        {isPaying && (
          <OrderSummaryCard field={field} reservation={reservation} />
        )}
      </div>
    </div>
  );
}
