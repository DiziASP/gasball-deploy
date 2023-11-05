import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';

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
          'bg-background text-foreground font-sans',
          fontSans.variable
        )}
      >
        <main className="min-h-screen antialiased">{children}</main>
      </body>
    </html>
  );
}
