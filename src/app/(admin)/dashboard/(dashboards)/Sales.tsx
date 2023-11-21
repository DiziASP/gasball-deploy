'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

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

const data = [
  {
    name: 'January',
    amt: 10,
    total: 1000000
  },
  {
    name: 'February',
    amt: 20,
    total: 2000000
  },
  {
    name: 'March',
    amt: 30,
    total: 3000000
  },
  {
    name: 'April',
    amt: 40,
    total: 4000000
  },
  {
    name: 'May',
    amt: 50,
    total: 5000000
  },
  {
    name: 'June',
    amt: 70,
    total: 7000000
  },
  {
    name: 'July',
    amt: 30,
    total: 3000000
  },
  {
    name: 'August',
    amt: 25,
    total: 2500000
  },
  {
    name: 'September',
    amt: 30,
    total: 5000000
  },
  {
    name: 'October',
    amt: 70,
    total: 5000000
  },
  {
    name: 'November',
    amt: 20,
    total: 8000000
  },
  {
    name: 'December',
    amt: 50,
    total: 8000000
  }
];

const data2 = [
  {
    category: 'Outdoor Field',
    value: 100
  },
  {
    category: 'Indoor Field',
    value: 300
  }
];

const invoices: {
  id: string;
  date: string;
  field: string;
  customer: string;
  price: number;
}[] = [
  {
    id: '1',
    date: '2021-01-01',
    field: 'Outdoor Field',
    customer: 'John Doe',
    price: 1000000
  },
  {
    id: '2',
    date: '2021-01-01',
    field: 'Outdoor Field',
    customer: 'John Doe',
    price: 1000000
  },
  {
    id: '3',
    date: '2021-01-01',
    field: 'Outdoor Field',
    customer: 'John Doe',
    price: 1000000
  },
  {
    id: '4',
    date: '2021-01-01',
    field: 'Outdoor Field',
    customer: 'John Doe',
    price: 1000000
  },
  {
    id: '5',
    date: '2021-01-01',
    field: 'Outdoor Field',
    customer: 'John Doe',
    price: 1000000
  }
];

async function getAllReservation() {
  try {
    const origin = 'http://localhost:3000';
    const res = await fetch(`${origin}/api/reservation`);
    const data = await res.json();

    return data;
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
    }[]
  >([]);

  useEffect(() => {
    getAllReservation().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div className="flex flex-col py-6 gap-6">
      <h1>Sales Dashboard</h1>

      <div className="flex flex-row gap-3">
        <ResponsiveContainer width="60%" height={480}>
          <BarChart
            width={500}
            height={300}
            data={data}
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
            <Tooltip
              formatter={(value: number) =>
                new Intl.NumberFormat('id', {
                  style: 'currency',
                  currency: 'IDR'
                }).format(value)
              }
            />
            <Legend />
            <Bar dataKey="total" stackId="a" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="50%" height={480}>
          <PieChart width={400} height={400}>
            <Pie
              data={data2}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#82ca9d"
              dataKey="value"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2>Field Purchase History</h2>
        <Table>
          <TableCaption>Recent purchases in your fields</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Field</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((invoice) => (
              <TableRow key={invoice.customerId}>
                <TableCell className="font-medium">
                  {invoice.customerId}
                </TableCell>
                <TableCell>{invoice.orderDate}</TableCell>
                <TableCell>{invoice.fieldId}</TableCell>
                <TableCell>{invoice.customerId}</TableCell>
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
