'use client';

import { Inter as FontSans } from 'next/font/google';
import '@/styles/globals.css';
import { Navigation } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AuthContext, AuthProvider } from '@/components/AuthProvider';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export default function AppWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const user = useContext(AuthContext)?.user;
  const { push } = useRouter();
  useEffect(() => {
    if (!user && window.location.pathname !== '/auth/register') {
      push('/auth/login');
    }
  }, [push, user]);

  return (
    <AuthProvider>
      <Navigation />
      <main className="mantialiased flex flex-col min-w-full flex-1">
        {children}
      </main>
      <Footer />
    </AuthProvider>
  );
}
