import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import HeaderWrapper from '@/components/header-wrapper';
import FooterWrapper from '@/components/footer-wrapper';
import ReactQueryProvider from '@/components/react-query-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Auctioners',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <html lang="en" className="scroll-smooth">
        <body className={inter.className}>
          <HeaderWrapper />
          {children}
          <FooterWrapper />
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster position="top-right" />
        </body>
      </html>
    </ReactQueryProvider>
  );
}
