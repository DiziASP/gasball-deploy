'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useEffect, useState } from 'react';

async function getKeeperFieldReservations() {
  const keeperId = '0de8ba4c-ce84-4374-a2a5-ecbf9776efb8'; // ini nanti ganti ke auth user

  try {
    const origin = 'http://localhost:3000';
    const res = await fetch(`${origin}/api/reservation?keeperId=${keeperId}`);
    const data = await res.json();
    console.log(data);
    return data['data']['reservation'];
  } catch (err) {
    console.log(err);
  }
}

function extractDate(date: string) {
  return new Date(date).toLocaleDateString();
}

function extractTime(date: string, range: number) {
  const startTime = new Date(date).getHours(); 
  const endTime = new Date(date).getHours()+range;
  return `${startTime}.00 - ${endTime}.00`;
}

export default function KeeperHistory() {
  const [data, setData] = useState<
    {
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
    }[]
  >([]);

  useEffect(() => {
    getKeeperFieldReservations().then((data) => {
      setData(data);
    });
  }, []);
  return (
    <div>
      <div className="grid m-20 gap-10">
        <h1>Riwayat Penggunaan Lapangan</h1>
        <div className="grid rounded-xl shadow-2xl bg-white">
          <div className="m-10">
            <div>
              <Table>
                <TableCaption>Riwayat Penggunaan Lapangan</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nama Lapangan</TableCell>
                    <TableCell>Tanggal Pemesanan</TableCell>
                    <TableCell>Waktu Pemesanan</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.fields.name}</TableCell>
                      <TableCell>{extractDate(row.orderDate)}</TableCell>
                      <TableCell>
                        {extractTime(row.orderDate, row.hourRange)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
