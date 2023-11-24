'use client';

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Reservation from '@/components/ui/reservation';
import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';

type oneDaySlot = {
  date: Date;
  statusArray: boolean[];
};

type Field = {
  id: string;
  name: string;
  syntheticGrass: boolean;
  indoor: boolean;
  playerBench: boolean;
  watcherBench: boolean;
  available: boolean;
  pricePerHour: number;
  users: {
    id: string;
    full_name: string;
    phone_number: string;
  };
  location: string;
  datePlots: oneDaySlot[];
};

async function fetchFieldData(fieldId: string) {
  const apiUrl = `/api/field/${fieldId}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

const datePlotsForField: oneDaySlot[] = [
  {
    date: new Date(2023, 10, 19),
    statusArray: [
      true,
      false,
      true,
      false,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      true
    ]
  },
  {
    date: new Date(2023, 10, 20),
    statusArray: [
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      true,
      true,
      true
    ]
  },
  {
    date: new Date(2023, 10, 21),
    statusArray: [
      true,
      false,
      true,
      false,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
      false
    ]
  }
];

type ReservationData = {
  id: string;
  fieldId: string;
  customerId: string;
  customerName: string;
  orderDate: string;
  hourRange: number;
  totalPrice: number;
  paidStatus: boolean;
  created_at: string;
  updated_at: string;
};

type user_self = {
  id: string;
  email: string;
  username: string;
  full_name: string;
  phone_number: string;
  role: string;
  created_at: string;
  updated_at: string;
};

const user_dummy: user_self = {
  id: '51e976c9-c4af-4ef0-bd10-70b990d761cb',
  email: 'awokawok@gmail.com',
  username: 'awokawok',
  full_name: 'Siapahayo',
  phone_number: '081355538777',
  role: 'customer',
  created_at: '2021-10-29T07:19:07.945001+00:00',
  updated_at: '2021-10-29T07:19:07.945001+00:00'
};

async function fetchReservationData(id: string) {
  try {
    const apiUrl = `/api/reservation?fieldId=${id}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    const reservationData: ReservationData[] = responseData.data.reservation;

    console.log('Fetched reservation data:', reservationData);
    return reservationData;
  } catch (error) {
    console.log(error);
  }
}

async function getSelf() {
  try {
    const apiUrl = `/api/auth/self`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const res = await response.json();
    console.log('Fetched user data:', res);
    return res;
  } catch (error) {
    console.log(error);
  }
}

function convertReservationToTimeSlots(
  reservations: ReservationData[]
): oneDaySlot[] {
  const timeSlots: oneDaySlot[] = [];

  reservations.forEach((reservation) => {
    const date = new Date(reservation.orderDate);
    const statusArray = new Array(23).fill(false);

    const startHour = date.getUTCHours();
    const startIdx = startHour < 23 ? startHour : 0;

    const endIdx = Math.min(startIdx + reservation.hourRange, 23); // Batasan akhir statusArray

    for (let i = startIdx; i < endIdx; i++) {
      statusArray[i] = true;
    }

    const existingTimeSlot = timeSlots.find(
      (slot) => slot.date.getTime() === date.setUTCHours(0, 0, 0, 0)
    );

    if (existingTimeSlot) {
      existingTimeSlot.statusArray = existingTimeSlot.statusArray.map(
        (status, index) => {
          return status || statusArray[index];
        }
      );
    } else {
      timeSlots.push({
        date: new Date(date.setUTCHours(0, 0, 0, 0)),
        statusArray: statusArray
      });
    }
  });

  console.log('Converted reservation data:', timeSlots);
  return timeSlots;
}

interface ScheduleData {
  orderDate: string;
  hourRange: number;
}

export default function FieldDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [lapangan, setLapangan] = useState<Field>();
  const [self, setSelf] = useState<user_self>();
  const [timeSlots, setTimeSlots] = useState<oneDaySlot[]>();
  useEffect(() => {
    const fetchLapangan = async () => {
      const res = await fetchFieldData(params.id);
      const lapangan = res.data.field;
      lapangan.datePlots = datePlotsForField;
      const reservation = await fetchReservationData(params.id);
      if (reservation) {
        lapangan.datePlots = convertReservationToTimeSlots(reservation);
      } else {
        lapangan.datePlots = [];
      }
      setLapangan(lapangan);
    };
    const fetchSelf = async () => {
      const res = await getSelf();
      const self = res?.data.user;
      setSelf(self);
    };
    fetchLapangan();
    fetchSelf();
  }, []);

  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    orderDate: '',
    hourRange: 0
  });

  const handleScheduleDataChange = (data: ScheduleData) => {
    setScheduleData(data);
  };

  const handleBookButtonClicked = async ({
    FieldID,
    CustomerID,
    CustomerName,
    HourRange,
    TotalPrice,
    orderDate
  }: {
    FieldID: string;
    CustomerID: string;
    CustomerName: string;
    orderDate: string;
    HourRange: number;
    TotalPrice: number;
  }) => {
    console.log(
      FieldID,
      CustomerID,
      CustomerName,
      orderDate,
      HourRange,
      TotalPrice
    );
    console.log('booked');
    const apiUrl = `/api/reservation`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fieldId: FieldID,
        customerId: CustomerID,
        customerName: CustomerName,
        orderDate: orderDate,
        hourRange: HourRange,
        totalPrice: TotalPrice
      })
    });
    if (!response.ok) {
      alert('ga bisa dipost');
      console.log(
        FieldID,
        CustomerID,
        CustomerName,
        orderDate,
        HourRange,
        TotalPrice
      );
      throw new Error('Network response was not ok');
    }
    router.push(`field/${FieldID}/payment`);
  };

  return (
    <div className="grid w-full h-full my-5 place-content-center">
      <div className="flex w-fit min-w-[80%] h-fit mx-4 my-4 p-7 bg-white rounded-2xl">
        {lapangan && self ? (
          <div className="flex flex-row h-fit gap-5">
            <div className="grid w-full h-fit place-content-center">
              <img
                src="/assets/images/field.jpg"
                alt=""
                className="z-1 w-full h-fit object-cover rounded-3xl shadow-2xl"
              />
              <div className="flex w-full">
                <div className="flex flex-row z-2 w-full h-fit gap-10 p-5 bg-white rounded-[21px] -mt-60 m-5">
                  <div className="flex flex-col">
                    <div className="mb-2">
                      <b className="text-2xl leading-normal">
                        {lapangan?.name}
                      </b>
                    </div>
                    <text className="relative self-stretch font-body font-[number:var(--body-font-weight)] text-slate-900 text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-normal [font-style:var(--body-font-style)]">
                      {lapangan?.location}
                      <br />
                      {lapangan?.syntheticGrass
                        ? 'Rumput Sintentis'
                        : 'Rumput Alami'}{' '}
                      {lapangan?.indoor ? '• Indoor' : '• Outdoor'}{' '}
                      {lapangan?.playerBench && '• Bench Pemain'}{' '}
                      {lapangan?.watcherBench && '• Bench Penonton'}
                    </text>

                    <a href="https://wa.me/6281355538777">
                      <div className="inline-flex items-start gap-3 p-2 relative flex-[0_0_auto] bg-slate-100 hover:bg-slate-200 rounded-2xl mt-3">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="inline-flex flex-col items-start gap-[0px] relative flex-[0_0_auto]">
                          <div className="font-semibold relative w-fit -mt-1 font-small  text-[#000000] text-[length:var(--small-font-size)] tracking-[var(--small-letter-spacing)] leading-[var(--small-line-height)] whitespace-nowrap [font-style:var(--small-font-style)]">
                            {lapangan?.users.full_name}
                          </div>
                          <div className="relative w-[227px] font-small font-[number:var(--subtle-font-weight)] text-slate-500 text-[length:var(--subtle-font-size)] tracking-tight leading-5 [font-style:var(--subtle-font-style)]">
                            WhatssApp
                            <br />
                            {lapangan?.users.phone_number}
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="inline-block h-20 w-0.5 self-stretch bg-neutral-200 opacity-100 dark:opacity-50"></div>
                  <div className="flex flex-col items-end relative flex-1 self-stretch grow">
                    <div className="relative w-fit mt-[-1.00px] font-h-4 font-[number:var(--h-4-font-weight)] text-slate-900 text-[length:var(--h-4-font-size)] tracking-[var(--h-4-letter-spacing)] leading-[var(--h-4-line-height)] whitespace-nowrap [font-style:var(--h-4-font-style)]">
                      <b className="text-xl">
                        Rp{' '}
                        {lapangan?.pricePerHour
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                        /Jam
                      </b>
                    </div>
                    <div className="inline-flex flex-col items-end justify-end relative flex-1 grow">
                      <div className="inline-flex flex-col items-end gap-[10px] relative flex-[0_0_auto]">
                        <p
                          id="totalhours"
                          className="relative w-fit mt-[-1.00px] [font-family:'Inter-Regular',Helvetica] font-normal text-[#64748b] text-[12px] tracking-[0] leading-[16px]"
                        >
                          <span id="hoursValue">0</span> Jam
                          <br />
                        </p>
                        <div className="inline-flex items-center justify-end gap-[10px] relative flex-[0_0_auto]">
                          <div className="relative w-[120px] [font-family:'Inter-Bold',Helvetica] font-bold text-slate-900 text-[20px] tracking-[0] leading-[20px] whitespace-nowrap">
                            Rp <span id="priceValue">0</span>{' '}
                          </div>
                          <button
                            id="bookButton"
                            className="cursor-not-allowed opacity-50 inline-flex items-center justify-center gap-[10px] px-[16px] py-[8px] relative flex-[0_0_auto] bg-[#0f172a] rounded-[6px] all-[unset] box-border"
                            onClick={() => {
                              handleBookButtonClicked({
                                FieldID: lapangan.id,
                                CustomerID: self.id,
                                CustomerName: self.full_name,
                                HourRange: scheduleData.hourRange,
                                TotalPrice:
                                  scheduleData.hourRange *
                                  lapangan.pricePerHour,
                                orderDate: scheduleData.orderDate
                              });
                            }}
                          >
                            <div className="relative w-fit mt-[-1.00px] font-body-medium font-[number:var(--body-medium-font-weight)] text-[#ffffff] text-[length:var(--body-medium-font-size)] tracking-[var(--body-medium-letter-spacing)] leading-[var(--body-medium-line-height)] whitespace-nowrap [font-style:var(--body-medium-font-style)]">
                              Book
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-fit h-[800px]">
              <Reservation
                lapangan={lapangan}
                scheduleData={scheduleData}
                onScheduleDataChange={handleScheduleDataChange}
              ></Reservation>
            </div>
          </div>
        ) : (
          <h1 className="pt-48">loading..</h1>
        )}
      </div>
    </div>
  );
}
