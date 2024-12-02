import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/sonner';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';
import './QuilTextEditor.css';
import { auth } from '@/auth';
import Navigation from './components/common/Navigation';
import Footer from './components/common/Footer'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next Shadcn',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-auto bg-white `}
        suppressHydrationWarning={true}
      >
        <NextTopLoader showSpinner={false} />
        <Providers session={session}>
          <Toaster richColors position="top-right" closeButton />
          <Navigation />
          <main className=''>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
