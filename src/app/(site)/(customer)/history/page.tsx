'use client';
import { useContext, useEffect, useState } from 'react';
import CustomerHistory from './(histories)/CustomerHistory';
import KeeperHistory from './(histories)/KeeperHistory';
import { AuthContext } from '@/components/AuthProvider';

/**
 * Halaman Riwayat Pemesanan Pelanggan
 * @returns The purchase history page component.
 */
export default function History() {
  const user = useContext(AuthContext)?.user;

  return (
    <div className="flex flex-col flex-1 px-14 py-12 bg-gradient-to-r from-[#FDFEFF] to-[#ECF4FF]">
      {user?.role == 'pelanggan' ? (
        <CustomerHistory />
      ) : (
        <KeeperHistory keeperId={user?.id as string} />
      )}
    </div>
  );
}
