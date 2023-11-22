import { ReservationFilter, getReservations } from '@/services/reservations';
import { NextRequest, NextResponse } from 'next/server';

const getYearlyReport = async (year: number) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  let yearlyTransactions: {}[] = [];

  for (let month = 0; month < 12; month++) {
    const monthlyTransactions = await getReservations({
      yearStart: year,
      monthStart: month,
      yearEnd: year,
      monthEnd: month + 1,
      paidStatus: null
    } as ReservationFilter);

    let total = 0;
    monthlyTransactions.data?.forEach((monthData) => {
      total += Number(monthData.totalPrice);
    });

    yearlyTransactions.push({
      name: months[month],
      amt: monthlyTransactions.data?.length,
      total
    });
  }

  return yearlyTransactions;
};

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const year = Number(requestUrl.pathname.split('/').pop());

  const data = await getYearlyReport(year);
  return NextResponse.json(
    {
      status: 'success',
      message: 'Yearly report succesfully created',
      data: { report: data }
    },
    { status: 200 }
  );
}
