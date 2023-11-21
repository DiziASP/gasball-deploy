import CustomerHistory from './(histories)/CustomerHistory';
import KeeperHistory from './(histories)/KeeperHistory';

/**
 * Halaman Riwayat Pemesanan Pelanggan
 * @returns The purchase history page component.
 */
export default async function History() {
  return (
    <div className="flex flex-col flex-1 px-14 py-12 bg-background-dashboard">
      <KeeperHistory />
    </div>
  );
}
