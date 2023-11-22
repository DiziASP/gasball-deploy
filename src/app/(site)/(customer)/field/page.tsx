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
import { useEffect, useState } from 'react';
import Link from 'next/link';

const lapanganPayload: {
  id: string;
  name: string;
  syntheticGrass: boolean;
  Indoor: boolean;
  playerBench: boolean;
  watcherBench: boolean;
  available: boolean;
}[] = [
  {
    id: 'LP01',
    name: 'Lapangan 01',
    syntheticGrass: true,
    Indoor: true,
    playerBench: true,
    watcherBench: true,
    available: true
  },
  {
    id: 'LP02',
    name: 'Lapangan 02',
    syntheticGrass: true,
    Indoor: false,
    playerBench: true,
    watcherBench: true,
    available: false
  },
  {
    id: 'LP03',
    name: 'Lapangan 03',
    syntheticGrass: false,
    Indoor: true,
    playerBench: false,
    watcherBench: false,
    available: true
  },
  {
    id: 'LP04',
    name: 'Lapangan 04',
    syntheticGrass: true,
    Indoor: true,
    playerBench: true,
    watcherBench: true,
    available: true
  },
  {
    id: 'LP05',
    name: 'Lapangan 05',
    syntheticGrass: true,
    Indoor: false,
    playerBench: true,
    watcherBench: true,
    available: false
  },
  {
    id: 'LP06',
    name: 'Lapangan 06',
    syntheticGrass: false,
    Indoor: true,
    playerBench: false,
    watcherBench: false,
    available: true
  }
];

async function getAllFieldData() {
  try {
    const origin = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${origin}/api/field`);
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}
/**
 * Halaman Pencarian Lapangan
 * @returns The search field page component.
 */
export default function FieldPage() {
  const [searchVal, setSearchVal] = useState('');
  const [data, setData] = useState<
    {
      id: string;
      name: string;
      syntheticGrass: boolean;
      Indoor: boolean;
      playerBench: boolean;
      watcherBench: boolean;
      available: boolean;
    }[]
  >([]);

  const handleSearch = (val: string) => {
    setSearchVal(val);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllFieldData();
      setData(res['data']['field']);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white flex-1 my-12 rounded-3xl px-64 py-[72px]">
      <SearchBar parentCallback={(val: string) => setSearchVal(val)} />

      {/* Cards */}
      <div className="grid grid-cols-3 justify-center my-8 gap-8">
        {data
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
            <Link key={lapangan.id} href={`/field/${lapangan.id}`}>
              <Card
                key={lapangan.name}
                className="duration-150 scale-90 hover:scale-100 cursor-pointer"
              >
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
            </Link>
          ))}
      </div>
    </div>
  );
}
