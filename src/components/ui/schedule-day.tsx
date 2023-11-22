'use client';

import React, {useEffect} from 'react';
import { Schedule } from '@/components/ui/schedule';
import { useRouter } from "next/navigation";
import { on } from 'events';
import { add, set } from 'date-fns';
import { stat } from 'fs';
import { format } from 'path';

interface Props {
  selectedDate : string;
  totalHours: number;
  statusArray: boolean[]; // Menambahkan prop statusArray
  price: number;
  fieldID: string;
  customerID: string;
  customerName: string;

}


export const ScheduleDay = ({ selectedDate, statusArray, price, fieldID, customerID, customerName }: Props): JSX.Element => {
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
  const [totalHours, setTotalHours] = React.useState(0);
  const [firstoccurence, setFirstOccurence] = React.useState(0);
  const [lastoccurence, setLastOccurence] = React.useState(0);
  const [scheduleStatus, setScheduleStatus] = React.useState<('booked' | 'default' | 'active' | 'hover')[]>([]);
  const [shouldRender, setShouldRender] = React.useState(false);

  const router = useRouter();
  async function checkRangeHours() {
    if (totalHours>1) {
      const firstoccurence = scheduleStatus.indexOf('active');
      setFirstOccurence(firstoccurence);
      const lastoccurence = scheduleStatus.lastIndexOf('active');
      setLastOccurence(lastoccurence);
      
      if (firstoccurence !== lastoccurence) {
        for (let i = firstoccurence; i <= lastoccurence; i++) {
         scheduleStatus[i] = 'active';
        }
        console.log("cek range")
        console.log(scheduleStatus);console.log(firstoccurence,lastoccurence);
      }
    }
  }

  useEffect(() => {
    // Inisialisasi scheduleStatus dengan nilai dari statusArray saat komponen dimuat
    const initialScheduleStatus = statusArray.map(status => (status ? 'booked' : 'default'));
    if (statusArray.length === 0) {
      for (let i = 0; i < 24; i++) initialScheduleStatus.push('default');
    }
    setScheduleStatus(initialScheduleStatus);
  }, []);

  useEffect(() => {
    checkRangeHours();

  }, [scheduleStatus]);

  useEffect(() => {
    checkRangeHours();
    setShouldRender(true);
  }, [totalHours<(lastoccurence-firstoccurence)]);

  function addHours(fieldID: string, customerID: string, customerName: string) {
    setTotalHours(totalHours + 1);
    checkTotalHours(totalHours + 1, price, fieldID, customerID, customerName, formatToISO(selectedDate, firstoccurence));
    console.log("TES", fieldID, customerID, customerName, formatToISO(selectedDate, firstoccurence));
  }

  function minOneHour(fieldID: string, customerID: string, customerName: string) {
    setTotalHours(totalHours - 1);
    checkTotalHours(totalHours - 1, price, fieldID, customerID, customerName, formatToISO(selectedDate, firstoccurence));
  }
  function formatToTime(number: number): string {
    const hours = String(number).padStart(2, '0');
    const minutes = '00';
    const seconds = '00';
  
    return `${hours}:${minutes}:${seconds}`;
  }

  function formatToISO(str: string, number: number): string {
    return `${str}T${formatToTime(number)}+00:00`;
  }

  function checkTotalHours(totalHours: number, price: number, fieldID: string, customerID: string, customerName: string, orderDate: string) {
    var button = document.getElementById('bookButton');
    if (totalHours == 0) {
      button?.classList.add('cursor-not-allowed');
      button?.classList.add('opacity-50');
    } else {
      button?.classList.remove('cursor-not-allowed');
      button?.classList.remove('opacity-50');
      console.log("masuk")
      button?.addEventListener('click', () => {
        handleBookButtonClicked({
          FieldID: fieldID,
          CustomerID: customerID,
          CustomerName: customerName,
          HourRange: totalHours, // or any appropriate hour value
          TotalPrice: totalHours * price, // calculate total price here based on totalHours and price
          orderDate: orderDate
        });
      });
    }
    let hoursValueElement = document.getElementById('hoursValue');

    if (hoursValueElement) {
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
  }

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
    const apiUrl = `http://localhost:3000/api/reservation`;
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
        totalPrice: TotalPrice,
      })
    });
    if (!response.ok) {
      alert('ga bisa dipost');
      throw new Error('Network response was not ok');

    }
    router.push(`field/${FieldID}/payment`);
    // const responseData = await response.json();
    // console.log('Fetched reservation data:', responseData);
  };
  


return (
  <div className="flex flex-col w-[300px] items-end px-4 pt-[15px] py-4 relative bg-[#ffffff] rounded-[23px] shadow-shadow text-[12px]">
    { scheduleStatus.map((status, index) => (
      <React.Fragment key={index}>
        <Schedule
          className={`!relative mt-[-4px] ${
            statusArray[index] ? 'booked' : ''
          }`}
          status={statusArray[index] ? 'booked' : 'default'}
          onClickFunction={() => {
            addHours(fieldID, customerID, customerName);
            setScheduleStatus((prev) => {scheduleStatus[index] = 'active'; return [...prev]});
          }}
          removeFunction={() => {
            minOneHour(fieldID, customerID, customerName);
            setScheduleStatus((prev) => {scheduleStatus[index] = 'default';  return [...prev]});
          }}
        />

        <div className="flex items-center justify-end gap-[8px] relative self-stretch w-full flex-[0_0_auto] mt-[-4px]">
          <div className="relative w-fit mt-[-1.00px] font-detail font-[number:var(--detail-font-weight)] text-slate-500 text-center tracking-[var(--detail-letter-spacing)] leading-[var(--detail-line-height)] whitespace-nowrap [font-style:var(--detail-font-style)]">
            {scheduleTimes[index]}
          </div>
          <hr
            className="relative flex-1 grow h-px object-cover"
          />
        </div>
      </React.Fragment>
    ))}
  </div>
);
};
