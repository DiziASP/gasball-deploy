export default async function FieldDetail({
  params
}: {
  params: { id: string };
}) {
  return <h1> Field - {params.id}</h1>;
}
