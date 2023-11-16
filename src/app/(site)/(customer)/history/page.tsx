import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data = [
  {
    "date": "2023-11-15",
    "namaLapangan": "Lapangan Indoor ABC",
    "waktu": "18.00-19.00",
    "harga": "Rp 120.000",
    "statusPembayaran": "Pending"
  },
  {
    "date": "2023-11-12",
    "namaLapangan": "Lapangan Outdoor XYZ",
    "waktu": "19.00-20.00",
    "harga": "Rp 150.000",
    "statusPembayaran": "Verified"
  },
  {
    "date": "2023-11-10",
    "namaLapangan": "Lapangan Indoor QWE",
    "waktu": "16.00-17.00",
    "harga": "Rp 100.000",
    "statusPembayaran": "Rejected"
  },
  {
    "date": "2023-11-08",
    "namaLapangan": "Lapangan Outdoor ZXC",
    "waktu": "17.00-18.00",
    "harga": "Rp 130.000",
    "statusPembayaran": "Pending"
  },
  {
    "date": "2023-11-05",
    "namaLapangan": "Lapangan Indoor QAZ",
    "waktu": "20.00-21.00",
    "harga": "Rp 110.000",
    "statusPembayaran": "Verified"
  },
  {
    "date": "2023-11-02",
    "namaLapangan": "Lapangan Outdoor WSX",
    "waktu": "15.00-16.00",
    "harga": "Rp 140.000",
    "statusPembayaran": "Pending"
  },
  {
    "date": "2023-10-30",
    "namaLapangan": "Lapangan Indoor EDC",
    "waktu": "18.00-19.00",
    "harga": "Rp 120.000",
    "statusPembayaran": "Verified"
  },
  {
    "date": "2023-10-28",
    "namaLapangan": "Lapangan Outdoor RFV",
    "waktu": "19.00-20.00",
    "harga": "Rp 150.000",
    "statusPembayaran": "Rejected"
  },
  {
    "date": "2023-10-25",
    "namaLapangan": "Lapangan Indoor TGB",
    "waktu": "16.00-17.00",
    "harga": "Rp 100.000",
    "statusPembayaran": "Verified"
  },
  {
    "date": "2023-10-22",
    "namaLapangan": "Lapangan Outdoor YHN",
    "waktu": "17.00-18.00",
    "harga": "Rp 130.000",
    "statusPembayaran": "Pending"
  },
  {
    "date": "2023-10-20",
    "namaLapangan": "Lapangan Indoor UJM",
    "waktu": "20.00-21.00",
    "harga": "Rp 110.000",
    "statusPembayaran": "Verified"
  },
  {
    "date": "2023-10-18",
    "namaLapangan": "Lapangan Outdoor IKL",
    "waktu": "15.00-16.00",
    "harga": "Rp 140.000",
    "statusPembayaran": "Pending"
  },
  {
    "date": "2023-10-15",
    "namaLapangan": "Lapangan Indoor OPN",
    "waktu": "18.00-19.00",
    "harga": "Rp 120.000",
    "statusPembayaran": "Verified"
  },
  {
    "date": "2023-10-12",
    "namaLapangan": "Lapangan Outdoor JKL",
    "waktu": "19.00-20.00",
    "harga": "Rp 150.000",
    "statusPembayaran": "Rejected"
  },
  {
    "date": "2023-10-10",
    "namaLapangan": "Lapangan Indoor MNB",
    "waktu": "16.00-17.00",
    "harga": "Rp 100.000",
    "statusPembayaran": "Verified"
  }
]


/**
 * Halaman Riwayat Pemesanan Pelanggan
 * @returns The purchase history page component.
 */
export default async function PurchaseHistory() {
  return (
    <div className="grid bg-gradient-to-r from-[#FDFEFF] to-[#ECF4FF]">
      <div className="grid m-20 gap-10">
        <h1>Purchase History</h1>
        <div className="grid rounded-xl shadow-2xl bg-white">
          <div className="m-10">  
            <div>
              <Table>
                <TableCaption>Daftar Riwayat Pemesanan</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableCell>Tanggal</TableCell>
                    <TableCell>Nama Lapangan</TableCell>
                    <TableCell>Waktu</TableCell>
                    <TableCell>Harga</TableCell>
                    <TableCell>Status Pembayaran</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row.date}>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.namaLapangan}</TableCell>
                      <TableCell>{row.waktu}</TableCell>
                      <TableCell>{row.harga}</TableCell>
                      <TableCell>{row.statusPembayaran}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
