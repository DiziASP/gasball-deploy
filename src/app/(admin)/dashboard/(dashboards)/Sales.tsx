'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { useEffect, useState } from 'react';

async function getAllReservation() {
  try {
    const origin = 'http://localhost:3000';
    const res = await fetch(`${origin}/api/reservation`);
    const data = await res.json();

    return data['data']['reservation'];
  } catch (err) {
    console.log(err);
  }
}

async function getReports(year: number) {
  try {
    const origin = 'http://localhost:3000';
    const res = await fetch(`${origin}/api/report/${year}`);
    const data = await res.json();

    return data['data']['report'];
  } catch (err) {
    console.log(err);
  }
}
export default function SalesDashboard() {
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
      };
      users: {
        id: string;
        username: string;
        full_name: string;
      };
    }[]
  >([]);

  const [reports, setReports] = useState<
    { name: string; amt: number; total: number }[]
  >([]);

  const [year, setYear] = useState<number>(2023);

  useEffect(() => {
    getAllReservation().then((data) => {
      setData(data);
    });

    getReports(year).then((data) => {
      setReports(data);
    });
  }, [year]);

  return (
    <div className="flex flex-col py-6 gap-6">
      <h1>Sales Dashboard</h1>

      {/* Select Year */}
      <Select
        onValueChange={(value) => {
          setYear(Number(value));
        }}
        defaultValue={String(year)}
      >
        <SelectTrigger className="w-1/4">
          <SelectValue placeholder="Tahun" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {[2023, 2022, 2021].map((year) => (
              <SelectItem key={year} value={String(year)}>
                {year}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex flex-row gap-3">
        <ResponsiveContainer width="100%" height={480}>
          <BarChart
            width={500}
            height={300}
            data={reports}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" width={300} />
            <YAxis
              tickFormatter={(value) =>
                new Intl.NumberFormat('id', {
                  style: 'currency',
                  currency: 'IDR'
                }).format(value)
              }
              width={120}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" stackId="a" fill="#8884d8" />

            <Bar dataKey="amt" stackId="a" fill="#000000" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2>Field Purchase History</h2>
        <Table>
          <TableCaption>Recent purchases in your fields</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Field</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((invoice, index) => (
              <TableRow key={index + 1}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  {new Date(invoice.orderDate).toLocaleDateString('ID')}
                </TableCell>
                <TableCell>{invoice.fields.name}</TableCell>
                <TableCell>{invoice.users.full_name}</TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat('id', {
                    style: 'currency',
                    currency: 'IDR'
                  }).format(invoice.totalPrice)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
