'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

import { useEffect, useState } from 'react';

function extractDate(date: string) {
  return new Date(date).toLocaleDateString();
}

function extractTime(date: string, range: number) {
  const startTime = new Date(date).getHours();
  const endTime = new Date(date).getHours() + range;
  return `${startTime}.00 - ${endTime}.00`;
}

type Reservation = {
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
  fields: {
    id: string;
    name: string;
    keeperId: string;
  };
  users: {
    id: string;
    username: string;
    full_name: string;
  };
};

async function getReservationHistory(customerId: string) {
  try {
    const apiUrl = '/api/reservation';
    const query = `?customerId=${customerId}`;
    const response = await fetch(apiUrl + query, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const res = await response.json();
    console.log('Fetched reservation data:', res);

    const reservationData: Reservation[] = res.data.reservation;
    return reservationData;
  } catch (error) {
    console.log(error);
  }
}

async function getSelf() {
  try {
    const apiUrl = `/api/auth/self`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const res = await response.json();
    console.log('Fetched user data:', res);
    return res;
  } catch (error) {
    console.log(error);
  }
}

function dateFormat(date: string) {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  return `${day}/${month}/${year} ${hour}:${
    minute < 10 ? '0' + minute : minute
  }`;
}

export default function CustomerHistory() {
  const [tableData, setTableData] = useState<Reservation[]>([]);

  useEffect(() => {
    async function fetchData() {
      const self = await getSelf();
      const reservationHistory = await getReservationHistory(self.data.user.id);
      setTableData(reservationHistory || []); // Provide an empty array as fallback
    }
    fetchData();
  }, []);

  return (
    <div className="grid m-20 gap-10">
      <h1>Reservation History</h1>
      <div className="grid rounded-xl shadow-2xl bg-white">
        <div className="m-10">
          <div>
            <Table>
              {tableData && tableData.length === 0 ? (
                <TableCaption>Belum ada pemesanan</TableCaption>
              ) : (
                <></>
              )}
              <TableHeader>
                <TableRow>
                  <TableCell>Tanggal</TableCell>
                  <TableCell>Nama Lapangan</TableCell>
                  <TableCell>Waktu</TableCell>
                  <TableCell>Harga</TableCell>
                  <TableCell>Status Pembayaran</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{extractDate(row.orderDate)}</TableCell>
                    <TableCell>{row.fields.name}</TableCell>
                    <TableCell>
                      {extractTime(row.orderDate, row.hourRange)}
                    </TableCell>
                    <TableCell>Rp{row.totalPrice.toLocaleString()}</TableCell>
                    <TableCell>
                      {row.paidStatus ? (
                        <Badge className="border-transparent bg-green-500 hover:bg-green-500/80">
                          Paid
                        </Badge>
                      ) : (
                        <Badge className="border-transparent bg-orange-500 hover:bg-orange-500/80">
                          Unpaid
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
