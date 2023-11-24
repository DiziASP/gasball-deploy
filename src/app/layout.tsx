import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import { Navigation } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AuthProvider } from '@/components/AuthProvider';
import { createClient } from '@/lib/supabase/client';

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
  const supabase = createClient()

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'flex flex-col min-h-screen bg-[#BFDBFE] text-foreground font-sans',
          fontSans.variable
        )}
      >
        <AuthProvider>
          <Navigation />
          <main className="mantialiased flex flex-col min-w-full flex-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
