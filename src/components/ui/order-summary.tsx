import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { MdCalendarMonth, MdLocationPin } from 'react-icons/md';
import { HiOutlineClock } from 'react-icons/hi';
import { Separator } from './separator';
import { Button } from './button';
import { FieldPayload, ReservationPayload } from '../../../types/payload.types';
import Image from 'next/image';

function extractDate(date: string) {
  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ];
  const tanggal = new Date(date);
  return `${tanggal.getDate()} ${
    months[tanggal.getMonth()]
  } ${tanggal.getFullYear()}`;
}

function extractTime(date: string, range: number) {
  const startTime = new Date(date).getHours();
  const endTime = new Date(date).getHours() + range;
  return `${startTime}.00 - ${endTime}.00`;
}

interface Props {
  reservation: ReservationPayload | undefined;
  field: FieldPayload | undefined;
}

export const OrderSummaryCard = ({ reservation, field }: Props): JSX.Element => {
  return (
    <Card className="w-full px-4 py-8 drop-shadow-xl rounded-3xl">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 my-4">
        <Image
          src={'/assets/images/field_cropped.jpg'}
          alt="A picture of a football field"
          width={600}
          height={100}
          className="rounded-xl"
        />
        <div>
          <h4 className="my-2">{field?.name}</h4>
          <span className="flex flex-row items-center gap-2 text-neutral-600">
            <MdLocationPin className="shrink-0" />
            <span>
              <p className="text-sm">{field?.location}</p>
            </span>
          </span>
          <div className="flex flex-row items-center gap-16 my-2">
            <span className="flex flex-row items-center gap-2 text-neutral-600">
              <MdCalendarMonth className="shrink-0" />
              <span>
                <p className="text-sm break-all">
                  {extractDate(reservation?.orderDate as string)}
                </p>
              </span>
            </span>
            <span className="flex flex-row items-center gap-2 text-neutral-600">
              <HiOutlineClock className="shrink-0" />
              <span>
                <p className="text-sm break-all">
                  {extractTime(
                    reservation?.orderDate as string,
                    Number(reservation?.hourRange)
                  )}
                </p>
              </span>
            </span>
          </div>
        </div>
      </CardContent>
      <Separator className="mx-16 border" />
      <CardContent className="flex justify-between mt-8">
        <h3 className="self-end">Total</h3>
        <div>
          <p className="text-right text-xs">{`Rp${field?.pricePerHour?.toLocaleString()} * ${reservation?.hourRange} Jam`}</p>
          <h3 className="text-right">
            Rp {reservation?.totalPrice.toLocaleString()}
          </h3>
        </div>
      </CardContent>
      <CardFooter className="flex align-middle justify-center mt-6">
        <Button className="px-8 border-neutral-600 h-7">Edit</Button>
      </CardFooter>
    </Card>
  );
};
