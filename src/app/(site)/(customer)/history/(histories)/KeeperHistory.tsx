'use client';

import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { SyntheticEvent, useEffect, useState } from 'react';

const keeperId = '0de8ba4c-ce84-4374-a2a5-ecbf9776efb8'; // ini nanti ganti ke auth user

async function getKeeperFieldReservations() {
  try {
    const res = await fetch(`${origin}/api/reservation?keeperId=${keeperId}`);
    const data = await res.json();
    // console.log(data);
    return data['data']['reservation'];
  } catch (err) {
    console.log(err);
  }
}

async function getKeeperFields() {
  try {
    const res = await fetch(`/api/field?keeperId=${keeperId}`);
    const data = await res.json();
    // console.log(data);
    return data['data']['field'];
  } catch (err) {
    console.log(err);
  }
}

function extractDate(date: string) {
  return new Date(date).toLocaleDateString();
}

function extractTime(date: string, range: number) {
  const startTime = new Date(date).getHours();
  const endTime = new Date(date).getHours() + range;
  return `${startTime}.00 - ${endTime}.00`;
}

function orderByOrderDate(a: any, b: any) {
  return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
}

function orderByPaidStatus(a: any, b: any) {
  return a.paidStatus - b.paidStatus;
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

  const [fields, setField] = useState<
    {
      id: string;
      name: string;
      location: string;
      pricePerHour: number;
      syntheticGrass: boolean;
      indoor: boolean;
      playerBench: boolean;
      watcherBench: boolean;
      available: boolean;
      users: {
        id: string;
        full_name: string;
        phone_number: string;
      };
    }[]
  >([]);

  const [selectedField, setSelectedField] = useState<string>('all');

  useEffect(() => {
    getKeeperFields().then((data) => {
      setField(data);
      // setSelectedField(data[0].id);
    });

    getKeeperFieldReservations().then((data) => {
      data.sort(orderByOrderDate);
      setData(data.reverse());
    });
  }, []);

  function handleFieldChange(event: any) {
    // console.log(event);
    setSelectedField(event);
  }

  return (
    <div>
      <div className="grid m-20 gap-10">
        <div className="flex flex-row justify-between">
          <h1>Riwayat Penggunaan Lapangan</h1>
          <div>
            <Label className="font-bold">Pilih lapangan</Label>
            <Select onValueChange={handleFieldChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue
                  placeholder="Semua Lapangan "
                  defaultValue={selectedField}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Lapangan</SelectItem>

                {fields.map((field) => {
                  return (
                    <SelectItem key={field.id} value={field.id}>
                      {field.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        </div>
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
                    <TableCell>Status Pembayaran</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row) => {
                    if (
                      row.fieldId === selectedField ||
                      selectedField === 'all'
                    ) {
                      return (
                        <TableRow key={row.id}>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>{row.fields.name}</TableCell>
                          <TableCell>{extractDate(row.orderDate)}</TableCell>
                          <TableCell>
                            {extractTime(row.orderDate, row.hourRange)}
                          </TableCell>
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
                      );
                    }
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
