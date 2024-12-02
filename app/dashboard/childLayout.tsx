// layout.tsx (client-side component)
'use client';
import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { usePathname } from 'next/navigation';

export default function ChildLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <div className="flex h-full">
      {!path.includes('filemanager') && <Sidebar />}
      <main
        className={` ${
          !path.includes('filemanager') ? 'h-[calc(100vh_-_50px)]' : 'h-screen'
        }    w-full flex-1`}
      >
        {!path.includes('filemanager') && <Header />}
        {children}
      </main>
    </div>
  );
}
