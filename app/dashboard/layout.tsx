import type { Metadata } from 'next';
import Sidebar from '@/components/layout/sidebar';
import Header from '@/components/layout/header';
import PageContainer from '@/components/layout/page-container';

export const metadata: Metadata = {
  title: 'Mayhm ecommerce',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default function DashboardServerLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full">
      {<Sidebar />}
      <main className="h-full w-full">
        {<Header />}
        <PageContainer scrollable={true}>{children}</PageContainer>
      </main>
    </div>
  );
}
