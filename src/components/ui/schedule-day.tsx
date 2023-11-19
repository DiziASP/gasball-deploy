'use client'

import React from 'react';
import { Schedule } from '@/components/ui/schedule';

interface Props {
  totalHours: number;
  statusArray: boolean[]; // Menambahkan prop statusArray
  price: number;
}

function checkTotalHours(totalHours: number, price: number) {
  var button = document.getElementById('bookButton');
  if (totalHours == 0) {
    button?.classList.add('cursor-not-allowed');
    button?.classList.add('opacity-50');
  }
  else {
    button?.classList.remove('cursor-not-allowed');
    button?.classList.remove('opacity-50');
  }
  let hoursValueElement = document.getElementById('hoursValue');

  if (hoursValueElement) {
    // Ubah teks dari elemen <span> sesuai dengan nilai totalHours
    hoursValueElement.textContent = totalHours.toString();
  }

  let priceValueElement = document.getElementById('priceValue');
  if (priceValueElement) {
    // Ubah teks dari elemen <span> sesuai dengan nilai totalHours
    priceValueElement.textContent = (totalHours * price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') ;
  }
  
  }
  



export const ScheduleDay = ({statusArray, price }: Props): JSX.Element => {
  const scheduleTimes = [
    '07.00', '08.00', '09.00', '10.00', '11.00', '12.00', '13.00',
    '14.00', '15.00', '16.00', '17.00', '18.00', '19.00', '20.00', '21.00'
  ];
  const [totalHours, setTotalHours] = React.useState(0);

  function addHours() {
    setTotalHours(totalHours + 1);
    checkTotalHours(totalHours + 1, price);
  }

  function minOneHour() {
    setTotalHours(totalHours - 1);
    checkTotalHours(totalHours - 1, price);
  }
  return (
    <div className="flex flex-col w-[300px] items-end px-[10px] pt-[15px] p-[4px] relative bg-[#ffffff] rounded-[23px] shadow-shadow text-[12px]">
      {scheduleTimes.map((time, index) => (
        <React.Fragment key={index}>
          <Schedule
            className={`!relative mt-[-4px] ${statusArray[index] ? 'booked' : ''}`}
            status={statusArray[index] ? 'booked' : 'default'}
            onClickFunction={() => {
              addHours();
            }}
            removeFunction={() => {
              minOneHour();
            }}
          />
          
          <div className="flex items-center justify-end gap-[8px] relative self-stretch w-full flex-[0_0_auto] mt-[-4px]">
            <div className="relative w-fit mt-[-1.00px] font-detail font-[number:var(--detail-font-weight)] text-slate-500 text-center tracking-[var(--detail-letter-spacing)] leading-[var(--detail-line-height)] whitespace-nowrap [font-style:var(--detail-font-style)]">
              {time}
            </div>
            <img
              className="relative flex-1 grow h-px object-cover"
              alt="Line"
              src={`line-23-${index + 1}.svg`}
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
