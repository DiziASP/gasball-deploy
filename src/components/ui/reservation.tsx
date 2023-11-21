'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, CalendarProps } from '@/components/ui/calendar'; // Ganti dengan lokasi sebenarnya dari komponen Calendar
import { DayPicker, DayClickEventHandler } from 'react-day-picker';
import { ScheduleDay } from './schedule-day';

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

interface Props {
  lapangan: Field;
}

function searchDate(date: any, datePlots: oneDaySlot[]) {
  if (date === undefined) return -1;
  for (let i = 0; i < datePlots.length; i++) {
    if (datePlots[i].date.getTime() === date.getTime()) {
      return i;
    }
  }
  return -1;
}

export const Reservation = (lapangan: Props): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedStatusArray, setSelectedStatusArray] = useState<boolean[]>([]);

  useEffect(() => {
    // Saat komponen pertama kali dimuat, atur selectedStatusArray sesuai dengan selectedDate (hari ini)
    const todayDate = new Date().setHours(0, 0, 0, 0);
    const todaySlot = lapangan.lapangan.datePlots.find(
      (slot) => slot.date.setHours(0, 0, 0, 0) === todayDate
    );
    setSelectedStatusArray(todaySlot?.statusArray || []);
  }, []);

  const handleDayClick: DayClickEventHandler = (day, modifiers, e) => {
    if (modifiers.selected) {
      setSelectedDate(new Date()); // Deselect date if it's already selected
    } else {
      setSelectedDate(day); // Select the clicked date
      // Update selectedStatusArray based on the selected date
      const selectedSlot = lapangan.lapangan.datePlots.find(
        (slot) => slot.date.getTime() === day.getTime()
      );
      setSelectedStatusArray(selectedSlot?.statusArray || []);
    }
    // Lakukan operasi lain yang diperlukan saat tanggal dipilih atau tidak dipilih
  };

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
          price={lapangan.lapangan.hourlyPrice}
          statusArray={selectedStatusArray}
          totalHours={0}
        ></ScheduleDay>
      </div>
    </div>
  );
};

export default Reservation;
