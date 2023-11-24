'use client';

import { useEffect, useState } from 'react';
import {
  FieldPayload,
  ReservationPayload
} from '../../../../../../types/payload.types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Image from 'next/image';
import { MdCalendarMonth, MdLocationPin } from 'react-icons/md';
import { HiOutlineClock, HiOutlineMinus } from 'react-icons/hi';

import { FaRegCheckCircle } from 'react-icons/fa';
import { Separator } from '@radix-ui/react-separator';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { OrderSummaryCard } from '@/components/ui/order-summary';
import { PaymentCard } from '@/components/ui/payment';

async function getReservation(reservationId: string) {
  try {
    const origin = 'http://localhost:3000';
    const res = await fetch(`${origin}/api/reservation/${reservationId}`);
    const data = await res.json();
    // console.log(data);
    return data['data']['reservation'];
  } catch (err) {
    console.log(err);
    // harusnya ke not found ini
  }
}

export default function PaymentPage({ params }: { params: { id: string } }) {
  const keeperId = params.id;
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
      const data: ReservationPayload = await res.json();
      console.log(data);
      setIsLoading(false);
      setIsPaying(data.paidStatus);
      // return data['data']['reservation'];
    } catch (err) {
      // console.log(err);
    }
  }

  useEffect(() => {
    getReservation(keeperId).then((data: ReservationPayload) => {
      // if (data.paidStatus) {
      //   // redirect ke not found jg
      // }
      console.log(data);
      setReservation(data);
      setField(data.fields);
      // console.log(data);
    });
  }, [keeperId]);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

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
