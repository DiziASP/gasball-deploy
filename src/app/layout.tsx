import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';

import AppWrapper from './Wrapper';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Gasball',
  description: 'Futsal Field Booking App'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'flex flex-col min-h-screen bg-[#BFDBFE] text-foreground font-sans',
          fontSans.variable
        )}
      >
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
