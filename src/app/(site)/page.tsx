'use client';

import { AuthContext, useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect } from 'react';

/**
 * Halaman Utama (Pencarian Lapangan)
 * @returns The landing page component.
 */
export default function Home() {
  // useEffect(() => {
  //   const kontol = async () => {
  //     const supabase = createClient();
  //     console.log(await supabase.auth.getUser());
  //   };

  //   kontol();
  // }, []);

  const auth = useContext(AuthContext);

  console.log('kontole');
  console.log(auth);

  return (
    <div className="flex flex-grow flex-col justify-center items-center gap-9">
      <Image
        src="/assets/images/field.jpg"
        alt=""
        width={500}
        height={500}
        style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: -1
        }}
      />
      <h1 className="font-semibold text-6xl text-amber-300">
        <span className="font-bold text-accent">Renting a Field</span> has never
        been easier!
      </h1>
      <Link href="/field">
        <Button className="bg-blue-800 py-8 px-12 text-lg">Check Fields</Button>
      </Link>
    </div>
  );
}
