import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import { Navigation } from '@/components/navbar';
import { Footer } from '@/components/footer';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'GasBall',
  description: 'GasBall adalah aplikasi untuk manajemen lapangan futsal'
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
        <Navigation />
        <main className="mantialiased flex flex-col min-w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
