import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Calendar, CalendarProps } from '@/components/ui/calendar';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScheduleDay } from '@/components/ui/schedule-day';
import Reservation from '@/components/ui/reservation';
import React, { useState, useReducer } from 'react';

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
  hourlyPrice: number;
  keeperID: number;
  keeperContact: string;
  address: string;
  datePlots: oneDaySlot[];
};

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

const lapangan: Field = {
  id: 1,
  name: 'Lapangan GACOR',
  syntheticGrass: true,
  indoor: false,
  playerBench: true,
  watcherBench: true,
  available: true,
  hourlyPrice: 50000,
  keeperID: 1,
  keeperContact: '08123222222',
  address: 'Jl. Pelisiran Naura Valda Prameswari Warna Orange No. 19',
  datePlots: datePlotsForField
};

type Reservation = {
  ID: number;
  field: Field;
  totalHours: number;
};

export default async function FieldDetail({
  params
}: {
  params: { id: string };
}) {
  return (
    <div className="mx-4 my-4 inline-flex flex-nowrap justify-around bg-white py-7 rounded-2xl h-screen">
      <div>
        <Image
          src="/assets/images/field.jpg"
          alt=""
          width={840}
          height={560}
          className="z-1 h-[540px] object-cover rounded-3xl shadow-2xl"
        />
        <div className="flex w-[805px] gap-[20px] p-[25px] relative bg-white rounded-[21px] -mt-60 pt-4 px-4 max-h-56 ml-5">
          <div className="flex flex-col w-[444px] items-start  relative">
            <div className="relative w-fit mt-[-1.00px] font-h-4 font-[number:var(--h-8-font-weight)] text-slate-900 text-[length:var(--h-4-font-size)] tracking-[var(--h-4-letter-spacing)] leading-[var(--h-4-line-height)] whitespace-nowrap [font-style:var(--h-4-font-style)]">
              <b className="text-2xl">{lapangan.name}{' '}{params.id}</b>
            </div>
            <p className="relative self-stretch font-body font-[number:var(--body-font-weight)] text-slate-900 text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
              {lapangan.address}
              <br />
              {lapangan.syntheticGrass
                ? 'Rumput Sintentis'
                : 'Rumput Alami'}{' '}
              {lapangan.indoor ? '• Indoor' : '• Outdoor'}{' '}
              {lapangan.playerBench && '• Bench Pemain'}{' '}
              {lapangan.watcherBench && '• Bench Penonton'}
            </p>

            <a href="https://wa.me/6281355538777">
              <div className="inline-flex items-start gap-[15px] p-[8px] relative flex-[0_0_auto] bg-slate-100 hover:bg-slate-200 rounded-2xl mt-3">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="inline-flex flex-col items-start gap-[0px] relative flex-[0_0_auto]">
                  <div className="font-semibold relative w-fit mt-[-1.00px] font-small  text-[#000000] text-[length:var(--small-font-size)] tracking-[var(--small-letter-spacing)] leading-[var(--small-line-height)] whitespace-nowrap [font-style:var(--small-font-style)]">
                    Mamang Penjaga
                  </div>
                  <div className="relative w-[227px] font-small font-[number:var(--subtle-font-weight)] text-slate-500 text-[length:var(--subtle-font-size)] tracking-tight leading-5 [font-style:var(--subtle-font-style)]">
                    WhatssApp
                    <br />
                    0854321426127
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="inline-block h-[195px] w-0.5 self-stretch bg-neutral-200 opacity-100 dark:opacity-50"></div>
          <div className="flex flex-col items-end relative flex-1 self-stretch grow">
            <div className="relative w-fit mt-[-1.00px] font-h-4 font-[number:var(--h-4-font-weight)] text-slate-900 text-[length:var(--h-4-font-size)] tracking-[var(--h-4-letter-spacing)] leading-[var(--h-4-line-height)] whitespace-nowrap [font-style:var(--h-4-font-style)]">
              <b className="text-xl">
                Rp{' '}
                {lapangan.hourlyPrice
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

      {/* <div className="grid gap-5 h-full mb-5"> */}
      {/* <Calendar className="bg-white rounded-2xl shadow-xl"></Calendar> */}
      <Reservation lapangan={lapangan}></Reservation>
      {/* <div className="overflow-y-scroll h-full bg-white rounded-2xl shadow-xl no-scrollbar">
          <ScheduleDay price={lapangan.hourlyPrice} statusArray={lapangan.datePlots[1].statusArray} totalHours={0}></ScheduleDay>
        </div> */}
      {/* </div> */}
    </div>
  );
}
