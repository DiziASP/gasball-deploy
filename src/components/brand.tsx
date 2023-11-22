import Link from 'next/link';

export const Brand = () => {
  return (
    <Link href="/" legacyBehavior passHref>
      <p className="font-bold text-3xl cursor-pointer">GasBall</p>
    </Link>
  );
};
