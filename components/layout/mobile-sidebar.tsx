'use client';
import React from 'react';
import { DashboardNav } from '@/components/dashboard-nav';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  managementNavItems,
  operationNavItems,
  supportNavItems
} from '@/constants/data';
import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';

// import { Playlist } from "../data/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // playlists: Playlist[];
}

export function MobileSidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className=" !px-0">
          <ScrollArea className="h-full">
            <div className="space-y-4 py-4">
              <div className="px-3 py-2">
                <div className="mt-3 space-y-1">
                  <div className="border-b border-border pb-2">
                    <h3 className="mb-2 px-3 pt-3 text-xs font-semibold uppercase">
                      Operations
                    </h3>
                    <DashboardNav items={operationNavItems} />
                  </div>
                  <div className="border-b border-border pb-2">
                    <h3 className="mb-2 px-3 pt-3 text-xs font-semibold uppercase">
                      Management
                    </h3>
                    <DashboardNav items={managementNavItems} />
                  </div>
                  <div className="border-b border-border pb-2">
                    <h3 className="mb-2 px-3 pt-3 text-xs font-semibold uppercase">
                      Support & Admin
                    </h3>
                    <DashboardNav items={supportNavItems} />
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}
