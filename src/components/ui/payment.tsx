import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Image from 'next/image';
import { FaRegCheckCircle } from 'react-icons/fa';
import { HiOutlineMinus } from 'react-icons/hi';
import { Button } from './button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { MouseEventHandler } from 'react';

interface Props {
  isLoading: boolean;
  isPaying: boolean;
  handlePayOnClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

const Paying = ({}) => {
  return <h1>kontol</h1>;
};

export const PaymentCard = ({
  isPaying,
  isLoading,
  handlePayOnClick
}: Props): JSX.Element => {
  return (
    <Card className="w-full px-4 py-8 drop-shadow-xl rounded-3xl flex flex-col align-middle justify-between gap-8">
      <CardHeader>
        <CardTitle className="flex justify-center items-center gap-2">
          <div
            className={isPaying ? 'flex gap-2' : 'flex gap-2 text-neutral-400'}
          >
            <span>
              <p className="text-sm">Payment</p>
            </span>
            <HiOutlineMinus />
            <FaRegCheckCircle />
          </div>
          <HiOutlineMinus />
          <span>
            <p className="text-sm">Verification</p>
          </span>
        </CardTitle>
        <CardDescription className="text-center">
          {isPaying
            ? 'Scan this QR code to continue the transaction'
            : 'Thanks for paying! You will be redirected shortly'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        {isLoading || !isPaying ? null : (
          <Image
            src={'/assets/images/qrcode.png'}
            alt="A picture of QR Code"
            width={250}
            height={250}
          />
        )}
      </CardContent>
      <CardFooter className="flex align-middle justify-center">
        {isPaying ? (
          isLoading ? (
            <div className="flex flex-col gap-4 justify-center">
              <p className="text-xs break-all text-neutral-500">
                Mohon tunggu sampai pesananmu diverifikasi
              </p>
              <Button
                className="px-8 border-neutral-600 h-7"
                variant={'outline'}
                disabled
              >
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Loading...
              </Button>
            </div>
          ) : (
            <Button
              className="px-8 border-neutral-600 h-7"
              variant={'outline'}
              onClick={handlePayOnClick}
            >
              Already paid?
            </Button>
          )
        ) : (
          <Button className="px-8 border-neutral-600 h-7" variant={'outline'}>
            Go back
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
