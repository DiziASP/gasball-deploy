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

const data = [
  {
    name: 'Jan',
    amt: 10,
    tot: 1000000
  },
  {
    name: 'Feb',
    amt: 20,
    tot: 2000000
  },
  {
    name: 'Mar',
    amt: 30,
    tot: 3000000
  },
  {
    name: 'Apr',
    amt: 40,
    tot: 4000000
  },
  {
    name: 'May',
    amt: 50,
    tot: 5000000
  },
  {
    name: 'Jun',
    amt: 70,
    tot: 7000000
  },
  {
    name: 'Jul',
    amt: 30,
    tot: 3000000
  },
  {
    name: 'Aug',
    amt: 25,
    tot: 2500000
  },
  {
    name: 'Sep',
    amt: 30,
    tot: 5000000
  },
  {
    name: 'Oct',
    amt: 70,
    tot: 5000000
  },
  {
    name: 'Nov',
    amt: 20,
    tot: 8000000
  },
  {
    name: 'Dec',
    amt: 50,
    tot: 8000000
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

export default function SalesDashboard() {
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
            <XAxis dataKey="name" />
            <YAxis
              tickFormatter={(value) =>
                new Intl.NumberFormat('id', {
                  style: 'currency',
                  currency: 'IDR'
                }).format(value)
              }
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="tot" stackId="a" fill="#8884d8" />
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
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.field}</TableCell>
                <TableCell>{invoice.customer}</TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat('id', {
                    style: 'currency',
                    currency: 'IDR'
                  }).format(invoice.price)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
