"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Label } from "@radix-ui/react-label";

import { useEffect, useState } from "react";

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
  }
};


async function getReservationHistory(customerId: string){
  try {
    const apiUrl = "http://localhost:3000/api/reservation";
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

    const reservationData : Reservation[] = res.data.reservation;
    return reservationData;
  } catch (error) {
    console.log(error);
  }
}

async function getSelf(){
  try {
    const apiUrl = `http://localhost:3000/api/auth/self`;
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

function dateFormat(date: string){
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  return `${day}/${month}/${year} ${hour}:${minute}`;
}

/**
 * Halaman Riwayat Pemesanan Pelanggan
 * @returns The purchase history page component.
 */
export default function PurchaseHistory() {

  const [tableData, setTableData] = useState<Reservation[]>([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      const self = await getSelf();
      const reservationHistory = await getReservationHistory(self.data.user.id);
      setTableData(reservationHistory || []); // Provide an empty array as fallback
      setUser(self);
    }
    fetchData();
  }, []);

  



  return (
    <div className="grid bg-gradient-to-r from-[#FDFEFF] to-[#ECF4FF]">
      <div className="grid m-20 gap-10">
        <h1>Purchase History</h1>
        <div className="grid rounded-xl shadow-2xl bg-white">
          <div className="m-10">  
            <div>
              <Table>
                { tableData && tableData.length === 0 ? <TableCaption>Belum ada pemesanan</TableCaption> : <></> } 
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
                    <TableRow key={row.orderDate}>
                      <TableCell>{dateFormat(row.orderDate)}</TableCell>
                      <TableCell>{row.fields.name}</TableCell>
                      <TableCell>{row.hourRange}</TableCell>
                      <TableCell>{row.totalPrice}</TableCell>
                      <TableCell>
                        {
                          row.paidStatus ? 
                          <div className="flex w-fit p-1 rounded-[5px] bg-green-100">
                            <Label className="text-green-800">Berhasil</Label>
                          </div>
                          :
                          <div className="flex w-fit p-1 rounded-[5px] bg-red-100">
                            <Label className="text-red-800">Belum terverifkasi</Label>
                          </div>
                        }
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
