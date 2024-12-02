'use client';
import React from 'react';
import { DashboardNav } from '@/components/dashboard-nav';
import {
  managementNavItems,
  operationNavItems,
  supportNavItems
} from '@/constants/data';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/hooks/useSidebar';
import Link from 'next/link';
import { ScrollArea } from '../ui/scroll-area';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized } = useSidebar();

  return (
    <aside
      className={cn(
        `relative hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block`,
        !isMinimized ? 'w-64' : 'w-[72px]',
        className
      )}
    >
      <div className="hidden h-[50px] px-3 lg:block">
        <div className="flex h-full items-center ">
          <Link href={'/'} target="_blank">
            <strong>Dashboard</strong>
          </Link>
        </div>
      </div>
      <div className="h-full space-y-4 pb-4">
        <ScrollArea className="h-[calc(100%_-_35px)]">
          <div className="h-full px-3">
            <div className="mb-2 mt-3 space-y-1">
              <div className="border-b border-border pb-2">
                {!isMinimized && (
                  <h3 className="mb-2 px-3 pt-3 text-xs font-semibold uppercase">
                    Operations
                  </h3>
                )}
                <DashboardNav items={operationNavItems} />
              </div>
              <div className="border-b border-border pb-2">
                {!isMinimized && (
                  <h3 className="mb-2 px-3 pt-3 text-xs font-semibold uppercase">
                    Management
                  </h3>
                )}
                <DashboardNav items={managementNavItems} />
              </div>
              <div className="border-b border-border pb-2">
                {!isMinimized && (
                  <h3 className="mb-2 px-3 pt-3 text-xs font-semibold uppercase">
                    Support & Admin
                  </h3>
                )}
                <DashboardNav items={supportNavItems} />
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}
