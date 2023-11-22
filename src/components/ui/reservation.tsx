'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, CalendarProps } from '@/components/ui/calendar'; // Ganti dengan lokasi sebenarnya dari komponen Calendar
import { DayPicker, DayClickEventHandler } from 'react-day-picker';
import { ScheduleDay } from './schedule-day';
import { string } from 'zod';

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


interface Props {
  lapangan: Field;
  scheduleData: {
    orderDate: string;
    hourRange: number;
  };
  onScheduleDataChange: (data: { orderDate: string; hourRange: number }) => void;

}


export const Reservation = ({ lapangan, scheduleData, onScheduleDataChange }: Props): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedStatusArray, setSelectedStatusArray] = useState<boolean[]>([]);

  useEffect(() => {
    // Saat komponen pertama kali dimuat, atur selectedStatusArray sesuai dengan selectedDate (hari ini)
    const todayDate = new Date().setHours(0, 0, 0, 0);
    const todaySlot = lapangan?.datePlots.find(
      (slot) => slot.date.setHours(0, 0, 0, 0) === todayDate
    );
    setSelectedStatusArray(todaySlot?.statusArray || []);
  }, []);

  // const handleDayClick: DayClickEventHandler = (day, modifiers, e) => {
  //   if (modifiers.selected) {
  //     setSelectedDate(new Date()); // Deselect date if it's already selected
  //   } else {
  //     const selected = new Date(day)
  //     selected.setDate(selected.getDate() + 1)
  //     setSelectedDate(selected); // Select the clicked date
  //     // Update selectedStatusArray based on the selected date
  //     const selectedSlot = lapangan.datePlots.find(
  //       (slot) => slot.date.getTime() === selected.getTime()
  //     );
  //     setSelectedStatusArray(selectedSlot?.statusArray || []);
  //     console.log(selectedDate.toISOString().split('T')[0]);
  //   }
  // };
  const handleDayClick: DayClickEventHandler = (day, modifiers, e) => {
    const clickedDate = new Date(day);
  
    if (modifiers.selected) {
      setSelectedDate(new Date()); // Deselect date if it's already selected
    } else {
      if (selectedDate && clickedDate.getTime() === selectedDate.getTime()) {
        // If the clicked date is the same as the selected date, deselect it
        setSelectedDate(new Date());
      } else {
        setSelectedDate(clickedDate); // Select the clicked date
        // Update selectedStatusArray based on the selected date
        const selectedSlot = lapangan.datePlots.find(
          (slot) => slot.date.getTime() === clickedDate.getTime()
        );
        setSelectedStatusArray(selectedSlot?.statusArray || []);
        console.log(LocaleDatetoUTCformat(selectedDate.toLocaleDateString('en-US')));
      }
    }
  };

  function LocaleDatetoUTCformat(date : string) : string {
    const arr = date.split('/');
    const newDate = arr[2] + '-' + arr[0] + '-' + arr[1];
    return newDate;
  }
  
  const [detailReservation, setDetailReservation] = useState<{
    orderDate: string;
    hourRange: number;
  }>({ orderDate: '', hourRange: 0});
  const receiveDataFromChild = (dataFromReservation: {
    orderDate: string;
    hourRange: number;
  }) => {
    const { orderDate, hourRange } = dataFromReservation;
    setDetailReservation({ orderDate, hourRange });
  }


  return (
    <div className="grid gap-2 h-full mb-5 w-fit">
      <Calendar
        selected={selectedDate}
        onDayClick={handleDayClick}
        className="h-full w-full bg-white rounded-2xl shadow-xl"
      />
      <div></div>
      <div className="overflow-y-scroll h-11/12 bg-white rounded-2xl shadow-xl no-scrollbar">
        <ScheduleDay
          key={selectedStatusArray.toString()}
          selectedDate={selectedDate.toISOString().split('T')[0]}
          price={lapangan?.pricePerHour}
          statusArray={selectedStatusArray}
          totalHours={0}
          onScheduleDataChange={onScheduleDataChange}
          scheduleData={scheduleData}
          

        ></ScheduleDay>
      </div>
    </div>
  );
};

export default Reservation;
