'use client';
import { useEffect, useState } from 'react';
import CustomerHistory from './(histories)/CustomerHistory';
import KeeperHistory from './(histories)/KeeperHistory';

/**
 * Halaman Riwayat Pemesanan Pelanggan
 * @returns The purchase history page component.
 */

async function getSelf(){
  try {
    const apiUrl = `http://localhost:3000/api/auth/self`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const res = await response.json();
    console.log('Fetched user data:', res);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export default function History() {
  const [role, setRole] = useState<string>();

  useEffect(() => {
    async function getRole(){
      const self = await getSelf();
      setRole(self.data.user.role);
      console.log(role);
    }
    getRole();
  }, []);

  return (
    <div className="flex flex-col flex-1 px-14 py-12 bg-gradient-to-r from-[#FDFEFF] to-[#ECF4FF]">
      {role == 'pelanggan' ? <CustomerHistory /> : <KeeperHistory />}
    </div>
  );
}
