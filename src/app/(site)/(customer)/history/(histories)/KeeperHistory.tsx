import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow
} from '@/components/ui/table';

async function getKeeperFields() {}

async function getKeeperFieldReservations() {}

export default async function KeeperHistory() {
  return (
    <div>
      <div className="grid m-20 gap-10">
        <h1>Riwayat Penggunaan Lapangan</h1>
        <div className="grid rounded-xl shadow-2xl bg-white">
          <div className="m-10">
            <div>
              <Table>
                <TableCaption>Riwayat Penggunaan Lapangan</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nama Lapangan</TableCell>
                    <TableCell>Tanggal Pemesanan</TableCell>
                    <TableCell>Waktu Pemesanan</TableCell>
                  </TableRow>
                </TableHeader>
                {/* <TableBody>
                  {fields.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.nama_lapangan}</TableCell>
                      <TableCell>{row.alamat}</TableCell>
                      <TableCell>{row.keterangan}</TableCell>
                      <TableCell>{row.penjaga_lapangan}</TableCell>
                      <TableCell>{row.hourly_price}</TableCell>
                      <TableCell>
                        <Dropdown options={options} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
