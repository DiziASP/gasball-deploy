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
import React, { useState, useEffect } from 'react';
import Dropdown from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { TrashIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

async function getAllField() {
  try {
    const res = await fetch(`$/api/field`);
    const data = await res.json();

    return data['data']['field'];
  } catch (err) {
    console.log(err);
  }
}

interface DeleteConfirmationPopupProps {
  onDelete: () => void;
  onCancel: () => void;
  id : string;
  name : string;
  location : string;
  syntheticGrass : boolean;
  indoor : boolean;
  playerBench : boolean;
  watcherBench : boolean;
}

async function deleteField(id: string) {
  try {
    const res = await fetch(`/api/field/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

const DeleteConfirmationPopup: React.FC<DeleteConfirmationPopupProps> = ({
  onDelete,
  onCancel,
  id,
  name,
  location,
  syntheticGrass,
  indoor,
  playerBench,
  watcherBench
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="gap-5 bg-white w-3/4 h-2/3 p-20 m-20 rounded-3xl block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
        <h2 className='p-5 text-center' >Konfirmasi hapus lapangan</h2>
        <div className="flex pt-10 px-10 gap-4">
          <Image
                    src="/assets/images/field.jpg"
                    alt=""
                    width={180}
                    height={280}
                  />
          <div className='flex-col justify-center'>
            <h3 className="h-24"> {name}</h3>
            <h4 className="pt-2"> {location}</h4>
            <p className='font-medium text-base'> {syntheticGrass ? 'Rumput Sintentis' : 'Rumput Alami'}
            {indoor ? ' | Indoor' : ' | Outdoor'
            } {playerBench && '| Bench Pemain'} {watcherBench && '| Bench Penonton'
            } </p>
          </div>
        </div>
        <div className='flex w-full px-10 pt-10 gap-5 items-center  justify-center'>
        <Button
              className="w-3/4 h-14 rounded-xl"
              type="submit"
              variant={'destructive'}
              onClick={onDelete}
            >
              Hapus
            </Button>
            <Button
              className=" w-3/4 h-14 rounded-xl"
              variant={'outline'}
              onClick={onCancel}
            >
              Batal
            </Button>
        </div>
      </div>
    </div>
  );
};

export default function FieldManagement() {
  const [fields, setFields] = useState([]);

  // Fungsi untuk mengambil data lapangan dari API
  const fetchData = async () => {
    const data = await getAllField();
    setFields(data);
  };

  // Fungsi polling untuk mengambil data setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 500); // Interval polling setiap 5 detik (5000 milidetik)

    // Bersihkan interval saat komponen tidak lagi ter-render
    return () => clearInterval(interval);
  }, []); // Jalankan sekali saat komponen ter-render

  const [showPopup, setShowPopup] = useState(false);

  const handleDelete = () => {
    deleteField(String(selectedField));
    setShowPopup(false);
  };

  const handleCancel = () => {
    // Batalkan tindakan hapus dan sembunyikan pop-up
    setShowPopup(false);
  };
  const [selectedField, setSelectedField] = useState('');
  const handleShowPopup = (fieldId: string) => {
    setSelectedField(fieldId);
    setShowPopup(true);
  };

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
                  <TableRow className="font-medium">
                    <TableCell>Nama</TableCell>
                    <TableCell>Lokasi</TableCell>
                    <TableCell>Fasilitas</TableCell>
                    <TableCell>Penjaga Lapangan</TableCell>
                    <TableCell>Harga/Jam</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map(
                    (row: {
                      id: React.Key | null | undefined;
                      name:
                        | string
                        | undefined;
                      location:
                        | string
                        
                        | undefined;
                      syntheticGrass: any;
                      Indoor: any;
                      playerBench: any;
                      watcherBench: any;
                      users: {
                        full_name:
                          | string
                         
                          | undefined;
                      };
                      pricePerHour: { toString: () => string };
                    }) => (
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
                        <TableCell>
                          Rp{' '}
                          {row.pricePerHour
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                          ,00
                        </TableCell>
                        <TableCell>
                          <Link href={`dashboard/field/${row.id}/edit`}>
                            <button >
                              <Pencil2Icon />
                            </button>
                          </Link>
                        </TableCell>
                        <TableCell>
                            <button onClick={() => handleShowPopup(String(row.id))}>
                              <TrashIcon />
                            </button>
                          {showPopup && selectedField===row.id && (
        <DeleteConfirmationPopup onDelete={handleDelete} onCancel={handleCancel} name={row.name} id={row.id} location={row.location}  syntheticGrass={row.syntheticGrass} indoor={row.indoor} playerBench={row.playerBench} watcherBench={row.watcherBench}/>
      )}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
