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

interface Props {
  lapangan: Field;
  user: user_self;
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

export const Reservation = ({ lapangan, user }: Props): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedStatusArray, setSelectedStatusArray] = useState<boolean[]>([]);

  useEffect(() => {
    // Saat komponen pertama kali dimuat, atur selectedStatusArray sesuai dengan selectedDate (hari ini)
    const todayDate = new Date().setHours(0, 0, 0, 0);
    const todaySlot = lapangan.datePlots.find(
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
      const selectedSlot = lapangan.datePlots.find(
        (slot) => slot.date.getTime() === day.getTime()
      );
      setSelectedStatusArray(selectedSlot?.statusArray || []);
      console.log(selectedDate.toISOString().split('T')[0]);
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
          key={selectedDate.toISOString().split('T')[0]}
          selectedDate={selectedDate.toISOString().split('T')[0]}
          price={lapangan.pricePerHour}
          statusArray={selectedStatusArray}
          totalHours={0}
          fieldID={lapangan.id}
          customerID={user.id}
          customerName={user.full_name}
        ></ScheduleDay>
      </div>
    </div>
  );
};

export default Reservation;
