'use client';

import React, { useState } from 'react';
import {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField
} from '@/components/ui/form';

async function getDetailField(id: string) {
  try {
    const origin = 'http://localhost:3000';
    const res = await fetch(`${origin}/api/field/${id}`);
    const data = await res.json();

    return data['data']['field'];
  } catch (err) {
    console.log(err);
  }
}

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import RadioGroup from '@/components/ui/radiogroup';
import CheckBox from '@/components/ui/checkbox';

export default async function AddField({
  params
}: {
  params: { id: string };
}) {

  const [selectedOption, setSelectedOption] = useState(''); // State untuk nilai terpilih

  const handleOptionChange = (selected: string) => {
    return selected;
  };
  const field = await getDetailField(params.id);
  return (
    <div className="flex flex-row justify-center w-full p-10 bg-gradient-to-r from-[#FDFEFF] to-[#ECF4FF]">
      <div className="flex w-10/12 items-start gap-[25px] p-[25px] relative bg-[#ffffff] rounded-[10px] shadow-2xl">
        <div className="flex-col items-start gap-[25px] flex-1 grow flex relative">
          
          <div className="items-center gap-[15px] self-stretch w-full flex-[0_0_auto] flex relative">
            <div className="grid w-full items-center gap-1.5">
              <Label>Nama Lapangan</Label>
              <Input type="name" placeholder={field.name} />
            </div>
          </div>
          <div className="items-center gap-[15px] self-stretch w-full flex-[0_0_auto] flex relative">
            <div className="grid w-full items-center gap-1.5">
              <Label>Lokasi Lapangan</Label>
              <Input type="text" placeholder={field.location} />
            </div>
          </div>
          <div className="items-center gap-[15px] self-stretch w-full flex-[0_0_auto] flex relative">
            <div className="grid w-full items-center gap-1.5">
              <Label>Harga/Jam</Label>
              <Input type="number" placeholder={field.pricePerHour} />
            </div>
          </div>
          <div className="items-center gap-[15px] self-stretch w-full flex-[0_0_auto] flex relative">
            <div className="grid w-full items-center gap-1.5">
              <Label>Jenis Lapangan</Label>
              <RadioGroup options={['Indoor', 'Outdoor']}></RadioGroup>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>Jenis Rumput</Label>
              <RadioGroup
                options={['Rumput sintetis', 'Rumput Alami']}
              ></RadioGroup>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>Fasilitas Lapangan</Label>
              <CheckBox label="Bench Pemain"></CheckBox>
              <CheckBox label="Bench Penonton"></CheckBox>
            </div>
          </div>
          <div className="items-center gap-[15px] self-stretch w-full flex-[0_0_auto] flex relative">
            <div className="grid w-full items-center gap-1.5">
              <Label>Penjaga Lapangan</Label>
              <Input
                type="desc"
                placeholder="Masukkan username penjaga lapangan"
              />
            </div>
          </div>

          <div className="flex-col items-start gap-[10px] self-stretch w-full flex-[0_0_auto] flex relative">
            <Button
              className="!self-stretch !flex-[0_0_auto] !flex !w-full"
              type="submit"
            >
              Simpan
            </Button>
            <Button className="!self-stretch !flex-[0_0_auto] !flex !w-full">
              Batal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
