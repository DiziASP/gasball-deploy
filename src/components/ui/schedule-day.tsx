'use client';

import React, { useEffect, useState } from 'react';
import { Schedule } from '@/components/ui/schedule';


interface Props {
  selectedDate: string;
  statusArray: boolean[]; // Menambahkan prop statusArray
  price: number;
  scheduleData: {
    orderDate: string;
    hourRange: number;
  };
  onScheduleDataChange: (data: { orderDate: string; hourRange: number}) => void;

}

export const ScheduleDay = ({
  selectedDate, 
  statusArray,
  price, scheduleData, onScheduleDataChange
}: Props): JSX.Element => {
  const scheduleTimes = [
    '01.00',
    '02.00',
    '03.00',
    '04.00',
    '05.00',
    '06.00',
    '07.00',
    '08.00',
    '09.00',
    '10.00',
    '11.00',
    '12.00',
    '13.00',
    '14.00',
    '15.00',
    '16.00',
    '17.00',
    '18.00',
    '19.00',
    '20.00',
    '21.00',
    '22.00',
    '23.00'
  ];
  // const [firstoccurence, setFirstOccurence] = React.useState(-1);
  // const [lastoccurence, setLastOccurence] = React.useState(-1);
  const [totalHours, setTotalHours] = React.useState(0);
  const [activeStatus, setActiveStatus] = React.useState<number[]>([]);
  const [scheduleStatus, setScheduleStatus] = React.useState<
    ('booked' | 'default' | 'active' | 'hover')[]
  >([]);
  const handleDataChange  = () => {
    onScheduleDataChange({
      orderDate: formatToISO(selectedDate, Math.min(...activeStatus)),
      hourRange: totalHours,
    });
  }

  useEffect(() => {
    checkTotalHours(totalHours,price);
    handleDataChange();
  }, [totalHours, activeStatus]);




  function formatToTime(number: number): string {
    const hours = String(number).padStart(2, '0');
    const minutes = '00';
    const seconds = '00';

    return `${hours}:${minutes}:${seconds}`;
  }

  function formatToISO(str: string, number: number): string {
    return `${str}T${formatToTime(number)}+00:00`;
  }
  
  function checkTotalHours(totalHours: number, price: number) {

    console.log("total hours", totalHours);
    var selisih = Math.max(...activeStatus) - Math.min(...activeStatus) + 1;
    if (selisih == -Infinity) {
      selisih = 1;
    }
    var button = document.getElementById('bookButton');
    if (totalHours == 0) {
      button?.classList.add('cursor-not-allowed');
      button?.classList.add('opacity-50');
    } 
    else if (!(totalHours===(selisih))){
      console.log("masuk sini");
      console.log("total sm selisih",totalHours, selisih);
      button?.classList.add('cursor-not-allowed');
      button?.classList.add('opacity-50');
    } 
    else {
      button?.classList.remove('cursor-not-allowed');
      button?.classList.remove('opacity-50');
    }
    let hoursValueElement = document.getElementById('hoursValue');
    
    if (hoursValueElement) {
      console.log("mek", totalHours)
      // Ubah teks dari elemen <span> sesuai dengan nilai totalHours
      hoursValueElement.textContent = totalHours.toString();
    }
    
    let priceValueElement = document.getElementById('priceValue');
    if (priceValueElement) {
      // Ubah teks dari elemen <span> sesuai dengan nilai totalHours
      priceValueElement.textContent = (totalHours * price)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      }
    handleDataChange();
  }
  
  useEffect(() => {
    // Inisialisasi scheduleStatus dengan nilai dari statusArray saat komponen dimuat
    const initialScheduleStatus = statusArray.map((status) =>
    status ? 'booked' : 'default'
    );
    if (statusArray.length === 0) {
      for (let i = 0; i < 24; i++) initialScheduleStatus.push('default');
    }
    setScheduleStatus(initialScheduleStatus);
    checkTotalHours(totalHours,price);
  }, []);

  
  
  
  return (
    <div className="flex flex-col w-[300px] items-end px-4 pt-[15px] py-4 relative bg-[#ffffff] rounded-[23px] shadow-shadow text-[12px]">
      <div>
        <p>{Math.min(...activeStatus)}</p>
        <p>{Math.max(...activeStatus)}</p>
        <p>{totalHours}</p>
      </div>
      {scheduleStatus.map((status, index) => (
        <React.Fragment key={index}>
          <Schedule
            className={`!relative mt-[-4px] ${
              statusArray[index] ? 'booked' : ''
            }`}
            status={scheduleStatus[index] || 'default'}
            onClickFunction={() => {
              setActiveStatus([...activeStatus, index]);
              setTotalHours(totalHours + 1);

              
            }}
            removeFunction={() => {
              setActiveStatus(activeStatus.filter((i) => i !== index));
              setTotalHours(totalHours - 1);

            }}
          />

          <div className="flex items-center justify-end gap-[8px] relative self-stretch w-full flex-[0_0_auto] mt-[-4px]">
            <div className="relative w-fit mt-[-1.00px] font-detail font-[number:var(--detail-font-weight)] text-slate-500 text-center tracking-[var(--detail-letter-spacing)] leading-[var(--detail-line-height)] whitespace-nowrap [font-style:var(--detail-font-style)]">
              {scheduleTimes[index]}
            </div>
            <hr className="relative flex-1 grow h-px object-cover" />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};
