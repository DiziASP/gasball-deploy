'use client';

import React from 'react';
import { Schedule } from '@/components/ui/schedule';

export const SchedulDay = (): JSX.Element => {
  return (
    <div className="flex flex-col w-[300px] items-end px-[10px] py-[4px] relative bg-[#ffffff] rounded-[23px] shadow-shadow text-[12px]">
      <Schedule className="!relative" status="default" />
      <div className="flex items-center justify-end gap-[8px] relative self-stretch w-full flex-[0_0_auto] mt-[-4px]">
        <div className="relative w-fit mt-[-1.00px] font-detail font-[number:var(--detail-font-weight)] text-slate-500 text-[12px] text-center tracking-[var(--detail-letter-spacing)] leading-[var(--detail-line-height)] whitespace-nowrap [font-style:var(--detail-font-style)]">
          07.00
        </div>
        <img
          className="relative flex-1 grow h-px object-cover"
          alt="Line"
          src="image.svg"
        />
      </div>
      <Schedule className="!mt-[-4px] !relative" status="booked" />
      <div className="flex items-center justify-end gap-[8px] relative self-stretch w-full flex-[0_0_auto] mt-[-4px]">
        <div className="relative w-fit mt-[-1.00px] font-detail font-[number:var(--detail-font-weight)] text-slate-500 text-[12px] text-center tracking-[var(--detail-letter-spacing)] leading-[var(--detail-line-height)] whitespace-nowrap [font-style:var(--detail-font-style)]">
          08.00
        </div>
        <img
          className="relative flex-1 grow h-px object-cover"
          alt="Line"
          src="image.svg"
        />
      </div>
      <Schedule className="!mt-[-4px] !relative" status="booked" />
      <div className="flex items-center justify-end gap-[8px] relative self-stretch w-full flex-[0_0_auto] mt-[-4px]">
        <div className="relative w-fit mt-[-1.00px] font-detail font-[number:var(--detail-font-weight)] text-slate-500 text-center tracking-[var(--detail-letter-spacing)] leading-[var(--detail-line-height)] whitespace-nowrap [font-style:var(--detail-font-style)]">
          09.00
        </div>
        <img
          className="relative flex-1 grow h-px object-cover"
          alt="Line"
          src="line-23-2.svg"
        />
      </div>
      <Schedule className="!mt-[-4px] !relative" status="default" />
      <div className="flex items-center justify-end gap-[8px] relative self-stretch w-full flex-[0_0_auto] mt-[-4px]">
        <div className="relative w-fit mt-[-1.00px] font-detail font-[number:var(--detail-font-weight)] text-slate-500 text-center tracking-[var(--detail-letter-spacing)] leading-[var(--detail-line-height)] whitespace-nowrap [font-style:var(--detail-font-style)]">
          10.00
        </div>
        <img
          className="relative flex-1 grow h-px object-cover"
          alt="Line"
          src="line-23-3.svg"
        />
      </div>
      <Schedule className="!mt-[-4px] !relative" status="default" />
      <div className="flex items-center justify-end gap-[8px] relative self-stretch w-full flex-[0_0_auto] mt-[-4px]">
        <div className="relative w-fit mt-[-1.00px] font-detail font-[number:var(--detail-font-weight)] text-slate-500  text-center tracking-[var(--detail-letter-spacing)] leading-[var(--detail-line-height)] whitespace-nowrap [font-style:var(--detail-font-style)]">
          11.00
        </div>
        <img
          className="relative flex-1 grow h-px object-cover"
          alt="Line"
          src="line-23-4.svg"
        />
      </div>
      <Schedule className="!mt-[-4px] !relative" status="default" />
      <div className="flex items-center justify-end gap-[8px] relative self-stretch w-full flex-[0_0_auto] mt-[-4px]">
        <div className="relative w-fit mt-[-1.00px] font-detail font-[number:var(--detail-font-weight)] text-slate-500 text-center tracking-[var(--detail-letter-spacing)] leading-[var(--detail-line-height)] whitespace-nowrap [font-style:var(--detail-font-style)]">
          12.00
        </div>
        <img
          className="relative flex-1 grow h-px object-cover"
          alt="Line"
          src="line-23-5.svg"
        />
      </div>
      <Schedule className="!mt-[-4px] !relative" status="booked" />
      <div className="flex items-center justify-end gap-[8px] relative self-stretch w-full flex-[0_0_auto] mt-[-4px]">
        <div className="relative w-fit mt-[-1.00px] font-detail font-[number:var(--detail-font-weight)] text-slate-500 text-center tracking-[var(--detail-letter-spacing)] leading-[var(--detail-line-height)] whitespace-nowrap [font-style:var(--detail-font-style)]">
          13.00
        </div>
        <img
          className="relative flex-1 grow h-px object-cover"
          alt="Line"
          src="line-23-6.svg"
        />
      </div>
      <Schedule className="!mt-[-4px] !relative" status="default" />
      <div className="flex items-center justify-end gap-[8px] relative self-stretch w-full flex-[0_0_auto] mt-[-4px]">
        <div className="relative w-fit mt-[-1.00px] font-detail font-[number:var(--detail-font-weight)] text-slate-500 text-center tracking-[var(--detail-letter-spacing)] leading-[var(--detail-line-height)] whitespace-nowrap [font-style:var(--detail-font-style)]">
          14.00
        </div>
        <img
          className="relative flex-1 grow h-px object-cover"
          alt="Line"
          src="line-23-7.svg"
        />
      </div>
      <Schedule className="!mt-[-4px] !relative" status="default" />
      <div className="flex items-center justify-end gap-[8px] relative self-stretch w-full flex-[0_0_auto] mt-[-4px]">
        <div className="relative w-fit mt-[-1.00px] font-detail font-[number:var(--detail-font-weight)] text-slate-500 text-center tracking-[var(--detail-letter-spacing)] leading-[var(--detail-line-height)] whitespace-nowrap [font-style:var(--detail-font-style)]">
          15.00
        </div>
        <img
          className="relative flex-1 grow h-px object-cover"
          alt="Line"
          src="line-23-8.svg"
        />
      </div>
      <Schedule className="!mt-[-4px] !relative" status="booked" />
      <div className="flex items-center justify-end gap-[8px] relative self-stretch w-full flex-[0_0_auto] mt-[-4px]">
        <div className="relative w-fit mt-[-1.00px] font-detail font-[number:var(--detail-font-weight)] text-slate-500 text-center tracking-[var(--detail-letter-spacing)] leading-[var(--detail-line-height)] whitespace-nowrap [font-style:var(--detail-font-style)]">
          16.00
        </div>
        <img
          className="relative flex-1 grow h-px object-cover"
          alt="Line"
          src="line-23-9.svg"
        />
      </div>
      <Schedule className="!mt-[-4px] !relative" status="booked" />
      <div className="flex items-center justify-end gap-[8px] relative self-stretch w-full flex-[0_0_auto] mt-[-4px]">
        <div className="relative w-fit mt-[-1.00px] font-detail font-[number:var(--detail-font-weight)] text-slate-500 text-center tracking-[var(--detail-letter-spacing)] leading-[var(--detail-line-height)] whitespace-nowrap [font-style:var(--detail-font-style)]">
          17.00
        </div>
        <img
          className="relative flex-1 grow h-px object-cover"
          alt="Line"
          src="line-23-10.svg"
        />
      </div>
      <Schedule className="!mt-[-4px] !relative" status="default" />
      <div className="flex items-center justify-end gap-[8px] relative self-stretch w-full flex-[0_0_auto] mt-[-4px]">
        <div className="relative w-fit mt-[-1.00px] font-detail font-[number:var(--detail-font-weight)] text-slate-500 text-center tracking-[var(--detail-letter-spacing)] leading-[var(--detail-line-height)] whitespace-nowrap [font-style:var(--detail-font-style)]">
          18.00
        </div>
        <img
          className="relative flex-1 grow h-px object-cover"
          alt="Line"
          src="line-23-11.svg"
        />
      </div>
      <Schedule className="!mt-[-4px] !relative" status="default" />
      <div className="flex items-center justify-end gap-[8px] relative self-stretch w-full flex-[0_0_auto] mt-[-4px]">
        <div className="relative w-fit mt-[-1.00px] font-detail font-[number:var(--detail-font-weight)] text-slate-500 text-center tracking-[var(--detail-letter-spacing)] leading-[var(--detail-line-height)] whitespace-nowrap [font-style:var(--detail-font-style)]">
          19.00
        </div>
        <img
          className="relative flex-1 grow h-px object-cover"
          alt="Line"
          src="line-23-12.svg"
        />
      </div>
      <Schedule className="!mt-[-4px] !relative" status="default" />
      <div className="flex items-center justify-end gap-[8px] relative self-stretch w-full flex-[0_0_auto] mt-[-4px]">
        <div className="relative w-fit mt-[-1.00px] font-detail font-[number:var(--detail-font-weight)] text-slate-500 text-center tracking-[var(--detail-letter-spacing)] leading-[var(--detail-line-height)] whitespace-nowrap [font-style:var(--detail-font-style)]">
          20.00
        </div>
        <img
          className="relative flex-1 grow h-px object-cover"
          alt="Line"
          src="line-23-13.svg"
        />
      </div>
      <Schedule className="!mt-[-4px] !relative" status="booked" />
      <div className="flex items-center justify-end gap-[8px] relative self-stretch w-full flex-[0_0_auto] mt-[-4px]">
        <div className="relative w-fit mt-[-1.00px] font-detail font-[number:var(--detail-font-weight)] text-slate-500 text-center tracking-[var(--detail-letter-spacing)] leading-[var(--detail-line-height)] whitespace-nowrap [font-style:var(--detail-font-style)]">
          21.00
        </div>
        <img
          className="relative flex-1 grow h-px object-cover"
          alt="Line"
          src="line-23-14.svg"
        />
      </div>
      <Schedule className="!mt-[-4px] !relative" status="default" />
    </div>
  );
};
