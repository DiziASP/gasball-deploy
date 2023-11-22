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
import Dropdown from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Pencil2Icon } from '@radix-ui/react-icons';



async function getAllField(){
  try {
    const origin = 'http://localhost:3000';
    const res = await fetch(`${origin}/api/field`);
    const data = await res.json();

    return data['data']['field'];
  } catch (err) {
    console.log(err);
  }
}


export default async function FieldManagement() {

  const fields = await getAllField();

  return (
    <div>
      <div className="grid m-10 gap-10">
        <div className="flex inline-flex justify-between">
          <h1>Data Lapangan</h1>
          <Link href={`dashboard/field/add-field`}>
            <button
              className={
                'h-full self-end inline-flex items-center gap-[10px] px-[10px] py-[5px] relative bg-[#ffffff] hover:bg-slate-100 rounded-[6px] shadow-[0px_2px_4px_#1e293b40]'
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
                  <TableRow className='font-medium'>
                    <TableCell>Nama</TableCell>
                    <TableCell>Lokasi</TableCell>
                    <TableCell>Fasilitas</TableCell>
                    <TableCell>Penjaga Lapangan</TableCell>
                    <TableCell>Harga/Jam</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((row: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; location: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; syntheticGrass: any; Indoor: any; playerBench: any; watcherBench: any; users: { full_name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; pricePerHour: { toString: () => string; }; }) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.location}</TableCell>
                      <TableCell>
                      {row.syntheticGrass
                      ? 'Rumput Sintentis'
                      : 'Rumput Alami'}{' '}
                    {row.Indoor ? '| Indoor' : '| Outdoor'}{' '}
                    {row.playerBench && '| Bench Pemain'}{' '}
                    {row.watcherBench && '| Bench Penonton'}
                        </TableCell>
                      <TableCell>{row.users.full_name}</TableCell>
                      <TableCell>Rp {row.pricePerHour.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} ,00</TableCell>
                      <TableCell>
                        <Link href={`dashboard/field/${row.id}/edit`}>
                          <button>
                            <Pencil2Icon />
                          </button>
                        </Link>
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
