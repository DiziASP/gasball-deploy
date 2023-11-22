'use client';



import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Reservation from '@/components/ui/reservation';
import React, { useState, useEffect } from 'react';


type oneDaySlot = {
  date: Date;
  statusArray: boolean[];
};

type Field = {
  id: number;
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
  const apiUrl = `http://localhost:3000/api/field/${fieldId}`;

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

const reservations: ReservationData[] = [
  {
    id: 'b7b187d9-76c4-4f0a-99df-e6d8e9bde978',
    fieldId: 'cb42a9dc-61a0-455a-8afc-c497d5c8c5b4',
    customerId: '51e976c9-c4af-4ef0-bd10-70b990d761cb',
    customerName: 'Siapahayo',
    orderDate: '2023-11-20T10:00:00+00:00',
    hourRange: 2,
    totalPrice: 150000,
    paidStatus: false,
    created_at: '2023-11-21T07:19:07.945001+00:00',
    updated_at: '2023-11-21T07:19:07.945001+00:00'
  },
  {
    id: 'b7b187d9-76c4-4f0a-99df-e6d8e9bde978',
    fieldId: 'cb42a9dc-61a0-455a-8afc-c497d5c8c5b4',
    customerId: '51e976c9-c4af-4ef0-bd10-70b990d761cb',
    customerName: 'Siapahayo',
    orderDate: '2023-11-20T01:00:00+00:00',
    hourRange: 2,
    totalPrice: 150000,
    paidStatus: false,
    created_at: '2023-11-21T07:19:07.945001+00:00',
    updated_at: '2023-11-21T07:19:07.945001+00:00'
  },
  {
    id: 'b7b187d9-76c4-4f0a-99df-e6d8e9bde978',
    fieldId: 'cb42a9dc-61a0-455a-8afc-c497d5c8c5b4',
    customerId: '51e976c9-c4af-4ef0-bd10-70b990d761cb',
    customerName: 'Siapahayo',
    orderDate: '2023-11-21T01:00:00+00:00',
    hourRange: 3,
    totalPrice: 150000,
    paidStatus: false,
    created_at: '2023-11-21T07:19:07.945001+00:00',
    updated_at: '2023-11-21T07:19:07.945001+00:00'
  }
  // Tambahkan data reservasi lainnya jika ada
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

async function fetchReservationData(id: string) {
  try {
    const apiUrl = `http://localhost:3000/api/reservation/${id}`;
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

  return timeSlots;
}

export default function FieldDetail({
  params
}: {
  params: { id: string };
}) {
  const id_test = '64e77936-e38e-449d-a008-fc7dde586c3f';

  const [datePlotsForField, setDatePlotsForField] = useState<oneDaySlot[]>([]);
  const [reservation, setReservation] = useState<ReservationData[]>([]);
  const [lapangan, setLapangan] = useState<Field>();

useEffect(() => {
  const fetchData = async () => {
    const res = await fetchFieldData(id_test);
      const fieldData = res.data.field;
      setLapangan(res.data.field);
      const res2 = await fetchReservationData(id_test);
      if (res2) {
        setReservation(res2);
        const datePlots = convertReservationToTimeSlots(res2);
        setDatePlotsForField(datePlots);

        // Update the datePlots in lapangan
        const updatedLapangan = { ...fieldData, datePlots };
        setLapangan(updatedLapangan);
      } 
      else {
        const updatedLapangan = { ...fieldData, datePlots: [] };
        setLapangan(updatedLapangan);
      }
  };
  console.log(lapangan);

  fetchData();
}, []);

  // const res = await fetchFieldData(id_test);
  // const lapangan = res.data.field;
  // lapangan.datePlots = datePlotsForField;
  // const reservation = await fetchReservationData(id_test);
  // if (reservation) {
  //   lapangan.datePlots = convertReservationToTimeSlots(reservation);
  // } else {
  //   lapangan.datePlots = [];
  // }
  const handleBookButtonClicked = async () => {
    const apiUrl = `http://localhost:3000/api/reservation`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fieldId: id_test,
        customerId: '51e976c9-c4af-4ef0-bd10-70b990d761cb',
        orderDate: '2023-11-21T01:00:00+00:00',
        hourRange: 3,
        totalPrice: 150000,
        paidStatus: false
      })
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    console.log('Fetched reservation data:', responseData);

  }

  return (
    <div className="mx-4 my-4 inline-flex flex-nowrap justify-around bg-white py-7 rounded-2xl h-screen">
      <div>
        <img
          src="/assets/images/field.jpg"
          alt=""
          className="z-1 w-full h-full object-cover rounded-3xl shadow-2xl"
        />
        <div className="flex w-148 gap-2 p-4 relative bg-white rounded-[21px] -mt-60 pt-4 px-4 max-h-56 mx-6">
          <div className="flex flex-col items-start  relative">
            <div className="relative w-fit -mt-1 font-h-4 font-[number:var(--h-8-font-weight)] text-slate-900 text-[length:var(--h-4-font-size)] tracking-[var(--h-4-letter-spacing)] leading-[var(--h-4-line-height)] whitespace-nowrap [font-style:var(--h-4-font-style)]">
              <b className="text-2xl">{lapangan?.name}</b>
            </div>
            <p className="relative self-stretch font-body font-[number:var(--body-font-weight)] text-slate-900 text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
              {lapangan?.location}
              <br />
              {lapangan?.syntheticGrass
                ? 'Rumput Sintentis'
                : 'Rumput Alami'}{' '}
              {lapangan?.indoor ? '• Indoor' : '• Outdoor'}{' '}
              {lapangan?.playerBench && '• Bench Pemain'}{' '}
              {lapangan?.watcherBench && '• Bench Penonton'}
            </p>

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
                  <div className="relative w-fit [font-family:'Inter-Bold',Helvetica] font-bold text-slate-900 text-[20px] tracking-[0] leading-[20px] whitespace-nowrap">
                    Rp <span id="priceValue">0</span>{' '}
                  </div>
                  <button
                    id="bookButton"
                    className="cursor-not-allowed opacity-50 inline-flex items-center justify-center gap-[10px] px-[16px] py-[8px] relative flex-[0_0_auto] bg-[#0f172a] rounded-[6px] all-[unset] box-border"
                    // onClick={handleBookButtonClicked}
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

      <Reservation lapangan={lapangan}></Reservation>
    </div>
  );
}
