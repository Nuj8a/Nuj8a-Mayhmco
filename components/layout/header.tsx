'use client';
import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';
import { Fullscreen, Minimize2, PanelLeft, PanelRight } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import Notification from './notification';
import { useState } from 'react';
import { Button } from '../ui/button';
import SettingPopover from './settings';

export default function Header() {
  const { isMinimized, toggle } = useSidebar();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleToggle = () => {
    toggle();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <header className="sticky inset-x-0 top-0 z-50 h-[50px] w-full items-center justify-between border-b bg-card">
      <nav className="flex h-full items-center justify-between px-4">
        <div className={cn('block md:!hidden')}>
          <MobileSidebar />
        </div>
        <div className={cn('ml-3 hidden md:!block')}>
          <div
            onClick={handleToggle}
            className="cursor-pointer text-foreground"
          >
            {!isMinimized ? <PanelLeft size={20} /> : <PanelRight size={20} />}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="mr-2 flex gap-1.5">
            <SettingPopover />
            <Button
              onClick={toggleFullscreen}
              variant="ghost"
              className="rounded-full"
              size="icon"
            >
              {isFullscreen ? (
                <Minimize2 size={20} />
              ) : (
                <Fullscreen size={20} />
              )}
              <span className="sr-only">Notification</span>
            </Button>
            <Notification />
            <ThemeToggle />
          </div>
          <UserNav />
        </div>
      </nav>
    </header>
  );
}
