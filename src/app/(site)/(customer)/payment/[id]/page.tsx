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
  const [isPaying, setIsPaying] = useState<boolean>(false);

  const [field, setField] = useState<FieldPayload>();

  useEffect(() => {
    getReservation(keeperId).then((data: ReservationPayload) => {
      // if (data.paidStatus) {
      //   // redirect ke not found jg
      // }
      setReservation(data);
      setField(data.fields);
      // console.log(data);
    });
  }, [keeperId]);

  return (
    <div className="flex-1 my-12 rounded-3xl px-96 py-[72px]">
      <div className="flex flex-row justify-around gap-4">
        <Card className="w-full px-4 py-8 drop-shadow-xl rounded-3xl flex flex-col align-middle justify-between gap-8">
          <CardHeader>
            <CardTitle className="flex justify-center items-center gap-2">
              <div
                className={
                  isPaying ? 'flex gap-2 text-neutral-400' : 'flex gap-2'
                }
              >
                <span>
                  <p className="text-sm">Payment</p>
                </span>
                <HiOutlineMinus />
                <FaRegCheckCircle />
              </div>
              <HiOutlineMinus />
              <span>
                <p className="text-sm">Verification</p>
              </span>
            </CardTitle>
            <CardDescription>
              Scan this QR code to continue the transaction
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <Image
              src={'/assets/images/qrcode.png'}
              alt="A picture of QR Code"
              width={250}
              height={250}
            />
          </CardContent>
          <CardFooter className="flex align-middle justify-center">
            <Button className="px-8 border-neutral-600 h-7" variant={'outline'}>
              Already paid?
            </Button>
          </CardFooter>
        </Card>
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
      </div>
    </div>
  );
}
