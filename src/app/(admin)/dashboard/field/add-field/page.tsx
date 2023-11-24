'use client';

import React, { useEffect, useState } from 'react';
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

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import RadioGroup from '@/components/ui/radiogroup';
import CheckBox from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';

async function getDetailField(id: string) {
  try {
    
    const res = await fetch(`/api/field/${id}`);
    const data = await res.json();

    return data['data']['field'];
  } catch (err) {
    console.log(err);
  }
}

export default function AddField() {
  const router = useRouter();
  const [field, setField] = useState<{
    id: string;
    name: string;
    location: string;
    pricePerHour: number;
    syntheticGrass: boolean;
    indoor: boolean;
    playerBench: boolean;
    watcherBench: boolean;
    available: boolean;
    user: {
      id: string;
      full_name: string;
      phone_number: string;
    };
  }>();

  const [selectedOption, setSelectedOption] = useState(''); // State untuk nilai terpilih

  const handleOptionChange = (selected: string) => {
    return selected;
  };

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [pricePerHour, setPricePerHour] = useState(0);
  const [syntheticGrass, setSyntheticGrass] = useState<boolean>(false);
  const [indoor, setIndoor] = useState<boolean>(false);
  const [playerBench, setPlayerBench] = useState<boolean>(false);
  const [watcherBench, setWatcherBench] = useState<boolean>(false);
  const [available, setAvailable] = useState<boolean>(false);
  const [keeperId, setkeeperId] = useState('');

  const handleSubmit = async () => {
    const res = await fetch(`/api/field/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        keeperId,
        name,
        location,
        pricePerHour,
        syntheticGrass,
        indoor,
        playerBench,
        watcherBench,
        available
      })
    });
    const data = await res.json();
    console.log(data);
    router.back();
    console.log(
      name,
      location,
      pricePerHour,
      syntheticGrass,
      indoor,
      playerBench,
      watcherBench,
      available,
      keeperId
    );
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };
  const handlePricePerHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPricePerHour(e.target.value);
  };
  const handleKeeperIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setkeeperId(e.target.value);
  };

  const handleIndoorChange = (option: string) => {
    setIndoor(option === 'Indoor');
  };

  const handleSyntheticGrassChange = (option: string) => {
    setSyntheticGrass(option === 'Rumput sintetis');
  };

  const handlePlayerBenchChange = (isChecked: boolean) => {
    setPlayerBench(isChecked);
  };

  const handleWatcherBenchChange = (isChecked: boolean) => {
    setWatcherBench(isChecked);
  };

  const handleAvailableChange = (option: string) => {
    setAvailable(option === 'Available');
  };

  return (
    <div className="flex flex-row justify-center w-full p-10 bg-gradient-to-r from-[#FDFEFF] to-[#ECF4FF]">
      <div className="flex w-10/12 items-start gap-[25px] p-[25px] relative bg-[#ffffff] rounded-[10px] shadow-2xl">
        <div className="flex-col items-start gap-[25px] flex-1 grow flex relative">
          <div className="items-center gap-[15px] self-stretch w-full flex-[0_0_auto] flex relative">
            <div className="grid w-full items-center gap-1.5">
              <Label>Nama Lapangan</Label>
              <Input
                type="name"
                placeholder={'Masukkan nama lapangan'}
                onChange={handleNameChange}
              />
            </div>
          </div>
          <div className="items-center gap-[15px] self-stretch w-full flex-[0_0_auto] flex relative">
            <div className="grid w-full items-center gap-1.5">
              <Label>Lokasi Lapangan</Label>
              <Input
                type="text"
                placeholder={'Masukkan lokasi lapangan'}
                onChange={handleLocationChange}
              />
            </div>
          </div>
          <div className="items-center gap-[15px] self-stretch w-full flex-[0_0_auto] flex relative">
            <div className="grid w-full items-center gap-1.5">
              <Label>Harga/Jam</Label>
              <Input
                type="number"
                placeholder={'Masukkan harga lapangan per jam'}
                onChange={handlePricePerHourChange}
              />
            </div>
          </div>
          <div className="items-center gap-[15px] self-stretch w-full flex-[0_0_auto] flex relative">
            <div className="grid w-full items-center gap-1.5">
              <Label>Jenis Lapangan</Label>
              <RadioGroup
                options={['Indoor', 'Outdoor']}
                onChange={handleIndoorChange}
              ></RadioGroup>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>Jenis Rumput</Label>
              <RadioGroup
                options={['Rumput sintetis', 'Rumput Alami']}
                onChange={handleSyntheticGrassChange}
              ></RadioGroup>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>Fasilitas Lapangan</Label>
              <CheckBox
                label="Bench Pemain"
                onChange={handlePlayerBenchChange}
              ></CheckBox>
              <CheckBox
                label="Bench Penonton"
                onChange={handleWatcherBenchChange}
              ></CheckBox>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label>Status Lapangan</Label>
              <RadioGroup
                options={['Available', 'Unavailable']}
                onChange={handleAvailableChange}
              ></RadioGroup>
            </div>
          </div>
          <div className="items-center gap-[15px] self-stretch w-full flex-[0_0_auto] flex relative">
            <div className="grid w-full items-center gap-1.5">
              <Label>Penjaga Lapangan</Label>
              <Input
                type="desc"
                placeholder="Masukkan id penjaga lapangan (uu-id)"
                onChange={handleKeeperIdChange}
              />
            </div>
          </div>

          <div className="flex-col items-start gap-[10px] self-stretch w-full flex-[0_0_auto] flex relative">
            <Button
              className="!self-stretch !flex-[0_0_auto] !flex !w-full"
              type="submit"
              onClick={handleSubmit}
            >
              Simpan
            </Button>
            <Button
              className="!self-stretch !flex-[0_0_auto] !flex !w-full"
              onClick={() => router.back()}
            >
              Batal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
