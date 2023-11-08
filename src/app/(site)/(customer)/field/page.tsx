'use client';

import SearchBar from '@/components/ui/search-bar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const lapanganPayload: {
  name: string;
  syntheticGrass: boolean;
  Indoor: boolean;
  playerBench: boolean;
  watcherBench: boolean;
  available: boolean;
}[] = [
  {
    name: 'Lapangan 01',
    syntheticGrass: true,
    Indoor: true,
    playerBench: true,
    watcherBench: true,
    available: true
  },
  {
    name: 'Lapangan 02',
    syntheticGrass: true,
    Indoor: false,
    playerBench: true,
    watcherBench: true,
    available: false
  },
  {
    name: 'Lapangan 03',
    syntheticGrass: false,
    Indoor: true,
    playerBench: false,
    watcherBench: false,
    available: true
  },
  {
    name: 'Lapangan 04',
    syntheticGrass: true,
    Indoor: true,
    playerBench: true,
    watcherBench: true,
    available: true
  },
  {
    name: 'Lapangan 05',
    syntheticGrass: true,
    Indoor: false,
    playerBench: true,
    watcherBench: true,
    available: false
  },
  {
    name: 'Lapangan 06',
    syntheticGrass: false,
    Indoor: true,
    playerBench: false,
    watcherBench: false,
    available: true
  }
];

/**
 * Halaman Pencarian Lapangan
 * @returns The search field page component.
 */
export default function FieldPage() {
  const [searchVal, setSearchVal] = useState('');

  const handleSearch = (val: string) => {
    setSearchVal(val);
  };

  return (
    <div className="bg-white flex-1 my-12 rounded-3xl px-64 py-[72px]">
      <SearchBar parentCallback={(val: string) => setSearchVal(val)} />

      {/* Cards */}
      <div className="grid grid-cols-3 justify-center my-8 gap-8">
        {lapanganPayload
          .filter((val) => {
            if (searchVal === '') {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchVal.toLowerCase())
            ) {
              return val;
            } else if ('sintetis'.includes(searchVal.toLowerCase())) {
              return val.syntheticGrass;
            } else if ('alami'.includes(searchVal.toLowerCase())) {
              return !val.syntheticGrass;
            } else if ('indoor'.includes(searchVal.toLowerCase())) {
              return val.Indoor;
            } else if ('outdoor'.includes(searchVal.toLowerCase())) {
              return !val.Indoor;
            } else if ('pemain'.includes(searchVal.toLowerCase())) {
              return val.playerBench;
            } else if ('penonton'.includes(searchVal.toLowerCase())) {
              return val.watcherBench;
            }
          })
          .map((lapangan) => (
            <Card key={lapangan.name}>
              <CardContent className="my-2 flex justify-center">
                <Image
                  src="/assets/images/field.jpg"
                  alt=""
                  width={480}
                  height={480}
                />
              </CardContent>
              <CardHeader>
                <CardTitle>{lapangan.name}</CardTitle>
                <CardDescription className="h-[4rem]">
                  {lapangan.syntheticGrass
                    ? 'Rumput Sintentis'
                    : 'Rumput Alami'}{' '}
                  {lapangan.Indoor ? '• Indoor' : '• Outdoor'}{' '}
                  {lapangan.playerBench && '• Bench Pemain'}{' '}
                  {lapangan.watcherBench && '• Bench Penonton'}
                </CardDescription>
              </CardHeader>

              <CardFooter>
                {lapangan.available ? (
                  <Badge>Available</Badge>
                ) : (
                  <Badge variant="destructive">Unavailable</Badge>
                )}
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
