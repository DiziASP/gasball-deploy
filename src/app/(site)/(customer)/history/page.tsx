'use client';

import { useEffect, useState } from 'react';
import CustomerHistory from './(histories)/CustomerHistory';
import KeeperHistory from './(histories)/KeeperHistory';
import { UserPayload } from '../../../../../types/payload.types';

/**
 * Halaman Riwayat Pemesanan Pelanggan
 * @returns The purchase history page component.
 */
export default function History() {
  const [user, setUser] = useState<UserPayload>();

  useEffect(() => {
    const dummyUser: UserPayload = {
      id: '0de8ba4c-ce84-4374-a2a5-ecbf9776efb8',
      email: 'dizi@gmail.com',
      username: 'dizicintarpl',
      full_name: 'Raden Dizi',
      phone_number: '081283217473',
      role: 'penjaga',
      created_at: '2023-11-20T08:31:16.534169+00:00',
      updated_at: '2023-11-20T08:31:16.534169+00:00'
    };

    const fetchCurrentUser = async () => {
      // const origin = 'http://localhost:3000';
      // const res = await fetch(`${origin}/api/auth/self}`);
      // const json = await res.json();
      // if (!res.ok) {
      //   throw new Error(json['message']);
      // }
      // const data: UserPayload = json['data']['user'];
      // console.log(data);
      // setUser(data);

      setUser(dummyUser);
    };

    fetchCurrentUser().catch((e) => {
      console.log(e);
    });
  }, []);

  return (
    <div className="flex flex-col flex-1 px-14 py-12 bg-background-dashboard">
      {user?.role === 'penjaga' ? (
        <KeeperHistory keeperId={user?.id as string} />
      ) : // <UserHistory /> ini history ojan nanti
      null}
    </div>
  );
}
