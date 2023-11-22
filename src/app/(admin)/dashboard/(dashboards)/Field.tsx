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
import React from 'react';
import Dropdown from '@/components/ui/dropdown';
import Link from 'next/link';

const fields = [
  {
    id: 1,
    nama_lapangan: 'Futsal Arena A',
    alamat: 'Jalan Merdeka No. 10',
    keterangan: 'Lapangan berukuran standar untuk turnamen lokal.',
    penjaga_lapangan: 'budi123',
    hourly_price: 100000
  },
  {
    id: 2,
    nama_lapangan: 'Soccer Field X',
    alamat: 'Jalan Pahlawan No. 25',
    keterangan: 'Lapangan sintetis dengan pemandangan kota.',
    penjaga_lapangan: 'anto456',
    hourly_price: 120000
  },
  {
    id: 3,
    nama_lapangan: 'Futsal Zone B',
    alamat: 'Jalan Jenderal Sudirman No. 8',
    keterangan: 'Lapangan dengan pencahayaan bagus.',
    penjaga_lapangan: 'agus789',
    hourly_price: 90000
  },
  {
    id: 4,
    nama_lapangan: 'Futsal Square',
    alamat: 'Jalan Gatot Subroto No. 14',
    keterangan: 'Lapangan indoor dengan AC.',
    penjaga_lapangan: 'suhardi123',
    hourly_price: 150000
  },
  {
    id: 5,
    nama_lapangan: 'Goal Futsal Center',
    alamat: 'Jalan Diponegoro No. 30',
    keterangan: 'Lapangan dengan fasilitas kamar mandi bersih.',
    penjaga_lapangan: 'hendro321',
    hourly_price: 110000
  },
  {
    id: 6,
    nama_lapangan: 'Green Field Futsal',
    alamat: 'Jalan Asia Afrika No. 5',
    keterangan: 'Lapangan di tengah taman dengan alam yang hijau.',
    penjaga_lapangan: 'joko567',
    hourly_price: 95000
  },
  {
    id: 7,
    nama_lapangan: 'Futsal Paradise',
    alamat: 'Jalan Thamrin No. 20',
    keterangan: 'Lapangan dengan area penonton yang luas.',
    penjaga_lapangan: 'hadi890',
    hourly_price: 130000
  },
  {
    id: 8,
    nama_lapangan: 'Soccer Center',
    alamat: 'Jalan Imam Bonjol No. 12',
    keterangan: 'Lapangan yang terletak di pusat kota.',
    penjaga_lapangan: 'eko234',
    hourly_price: 85000
  },
  {
    id: 9,
    nama_lapangan: 'Futsal Galaxy',
    alamat: 'Jalan Cendrawasih No. 17',
    keterangan: 'Lapangan dengan mural seni di dinding.',
    penjaga_lapangan: 'rudi567',
    hourly_price: 100000
  },
  {
    id: 10,
    nama_lapangan: 'Victory Futsal Park',
    alamat: 'Jalan Veteran No. 7',
    keterangan: 'Lapangan dengan fasilitas cuci sepatu gratis.',
    penjaga_lapangan: 'agus123',
    hourly_price: 120000
  },
  {
    id: 11,
    nama_lapangan: 'Futsal Dreamland',
    alamat: 'Jalan Arjuna No. 22',
    keterangan: 'Lapangan dengan desain modern.',
    penjaga_lapangan: 'bambang890',
    hourly_price: 110000
  },
  {
    id: 12,
    nama_lapangan: 'Goalkeeper Arena',
    alamat: 'Jalan Kusuma Bangsa No. 13',
    keterangan: 'Lapangan dengan gawang-gawang yang berkualitas.',
    penjaga_lapangan: 'david456',
    hourly_price: 125000
  },
  {
    id: 13,
    nama_lapangan: 'Futsal United',
    alamat: 'Jalan Pelita No. 28',
    keterangan: 'Lapangan dengan suhu ruangan yang nyaman.',
    penjaga_lapangan: 'heru678',
    hourly_price: 95000
  },
  {
    id: 14,
    nama_lapangan: 'Futsal World',
    alamat: 'Jalan Kartini No. 9',
    keterangan: 'Lapangan dengan tema permainan bola dunia.',
    penjaga_lapangan: 'surya789',
    hourly_price: 105000
  },
  {
    id: 15,
    nama_lapangan: 'Soccer Star',
    alamat: 'Jalan Tanjung Duren No. 4',
    keterangan: 'Lapangan favorit untuk latihan tim lokal.',
    penjaga_lapangan: 'rudi987',
    hourly_price: 90000
  }
];

export default async function FieldManagement() {
  const options = [
    {
      label: 'Edit detail lapangan',
      link: 'dashboard/field/01/edit'
    },
    {
      label: 'Lihat riwayat penggunaan lapangan',
      link: 'dashboard/field/01/history'
    }
  ];
  return (
    <div>
      <div className="grid m-20 gap-10">
        <div className="flex inline-flex justify-between">
          <h1>Data Lapangan</h1>
          <Link href={`dashboard/field/add-field`}>
            <button
              className={
                'h-[30px] self-end inline-flex items-center gap-[10px] px-[10px] py-[5px] relative bg-[#ffffff] hover:bg-slate-100 rounded-[6px] shadow-[0px_2px_4px_#1e293b40]'
              }
            >
              <div className="relative w-fit mt-[-1.00px] font-medium text-[#000000] text-[14px] tracking-[0] leading-[20px] whitespace-nowrap">
                Tambah Lapangan
              </div>
            </button>
          </Link>
        </div>
        <div className="grid rounded-xl shadow-2xl bg-white">
          <div className="m-10">
            <div>
              <Table>
                <TableCaption>Data Lapangan</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nama Lapangan</TableCell>
                    <TableCell>Alamat</TableCell>
                    <TableCell>Keterangan</TableCell>
                    <TableCell>Penjaga Lapangan</TableCell>
                    <TableCell>Harga/Jam</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.nama_lapangan}</TableCell>
                      <TableCell>{row.alamat}</TableCell>
                      <TableCell>{row.keterangan}</TableCell>
                      <TableCell>{row.penjaga_lapangan}</TableCell>
                      <TableCell>{row.hourly_price}</TableCell>
                      <TableCell>
                        <Dropdown options={options} />
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
