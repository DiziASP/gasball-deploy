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
import {
  FieldPayload,
  ReservationPayload
} from '../../../../../../types/payload.types';

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

interface Props {
  keeperId: string;
}

export default function KeeperHistory({ keeperId }: Props) {
  const [reservations, setReservations] = useState<ReservationPayload[]>([]);
  const [fields, setField] = useState<FieldPayload[]>([]);
  const [selectedField, setSelectedField] = useState<string>('all');

  useEffect(() => {
    const fetchKeeperFieldReservations = async () => {
      const origin = 'http://localhost:3000';
      const res = await fetch(`${origin}/api/reservation?keeperId=${keeperId}`);
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json['message']);
      }
      const data: ReservationPayload[] = json['data']['reservation'];
      setReservations(data);
    };

    const fetchKeeperFields = async () => {
      const origin = 'http://localhost:3000';
      const res = await fetch(`${origin}/api/field?keeperId=${keeperId}`);
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json['message']);
      }
      const data: FieldPayload[] = json['data']['field'];
      setField(data);
    };

    fetchKeeperFields().catch((e) => {
      console.log(e);
    });

    fetchKeeperFieldReservations().catch((e) => {
      console.log(e);
    });
  }, [keeperId]);

  return (
    <div>
      <div className="grid m-20 gap-10">
        <div className="flex flex-row justify-between">
          <h1>Riwayat Penggunaan Lapangan</h1>
          <div>
            <Label className="font-bold">Pilih lapangan</Label>
            <Select onValueChange={(e) => setSelectedField(e)}>
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
                    <SelectItem key={field.id} value={field.id as string}>
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
                  {reservations.map((row) => {
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
