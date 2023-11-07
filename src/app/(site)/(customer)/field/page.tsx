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
import { map } from 'zod';
import { Badge } from '@/components/ui/badge';

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
export default async function Home() {
  return (
    <div className="bg-white flex-1 my-12 rounded-3xl px-64 py-[72px]">
      <SearchBar />

      {/* Cards */}
      <div className="grid grid-cols-3 justify-center my-8 gap-8">
        {lapanganPayload.map((lapangan) => (
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
                {lapangan.syntheticGrass ? 'Rumput Sintentis' : 'Rumput Alami'}{' '}
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
