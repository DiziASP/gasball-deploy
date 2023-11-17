"use client"

import React, { useState } from "react";
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

import {Button} from '@/components/ui/button'
import {Label} from '@/components/ui/label'
import {Input} from '@/components/ui/input'
import RadioGroup from '@/components/ui/radiogroup'
import CheckBox from '@/components/ui/checkbox'

export default async function AddField() {
    const [selectedOption, setSelectedOption] = useState(''); // State untuk nilai terpilih

    const handleOptionChange = (selected: string) => {
      return selected;
    };
    return (
      <div className="flex flex-row justify-center w-full p-10 bg-gradient-to-r from-[#FDFEFF] to-[#ECF4FF]">
        <div className="flex w-10/12 items-start gap-[25px] p-[25px] relative bg-[#ffffff] rounded-[10px] shadow-2xl">
      <div className="flex-col items-start gap-[25px] flex-1 grow flex relative">
        <div className="flex-col h-[103px] items-center justify-center gap-[25px] p-[50px] self-stretch w-full bg-[#ffffff] rounded-[27px] overflow-hidden border border-dashed border flex relative">
          <Button className="!self-stretch !mt-[-18.50px] !mb-[-18.50px] !flex-[0_0_auto] !flex !w-full" variant="secondary">Upload picture</Button>
        </div>
        <div className="items-center gap-[15px] self-stretch w-full flex-[0_0_auto] flex relative">
          <div className="grid w-full items-center gap-1.5">
              <Label>Nama Lapangan</Label>
              <Input type="name" placeholder="Masukkan nama lapangan" />
          </div>
        </div>
        <div className="items-center gap-[15px] self-stretch w-full flex-[0_0_auto] flex relative">
          <div className="grid w-full items-center gap-1.5">
              <Label>Deskripsi Lapangan</Label>
              <Input type="text" placeholder="Masukkan deskripsi lapangan" />
          </div>
        </div>
        <div className="items-center gap-[15px] self-stretch w-full flex-[0_0_auto] flex relative">
          <div className="grid w-full items-center gap-1.5">
              <Label>Alamat Lapangan</Label>
              <Input type="desc" placeholder="Masukkan alamat lapangan" />
          </div>
        </div>
        <div className="items-center gap-[15px] self-stretch w-full flex-[0_0_auto] flex relative">
          <div className="grid w-full items-center gap-1.5">
              <Label>Jenis Lapangan</Label>
              <RadioGroup 
              options={["Indoor", "Outdoor"]}
            
              ></RadioGroup>
          </div>
          <div className="grid w-full items-center gap-1.5">
              <Label>Jenis Rumput</Label>
              <RadioGroup 
              options={["Rumput sintetis", "Rumput Alami"]}
              // selectedOption={selectedOption}
              // onChange={handleOptionChange}
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
              <Input type="desc" placeholder="Masukkan username penjaga lapangan" />
          </div>
        </div>

        <div className="flex-col items-start gap-[10px] self-stretch w-full flex-[0_0_auto] flex relative">
          <Button
            className="!self-stretch !flex-[0_0_auto] !flex !w-full"
            type="submit">Simpan</Button>
          <Button
            className="!self-stretch !flex-[0_0_auto] !flex !w-full">Batal</Button>
        </div>
      </div>
    </div>
    </div>
    );
}
  