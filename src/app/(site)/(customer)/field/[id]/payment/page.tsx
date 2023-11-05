export default async function PaymentPage({
    params
  }: {
    params: { id: string };
  }) {
    return <h1> Bayar Field - {params.id}</h1>;
  }
  