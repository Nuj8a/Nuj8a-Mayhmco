'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { useSidebar } from '@/hooks/useSidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover'; // Import Popover component

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export function DashboardNav({
  items,
  setOpen,
  isMobileNav = false
}: DashboardNavProps) {
  const path = usePathname(); // Current path
  const { isMinimized } = useSidebar();

  const [expandedIndex, setExpandedIndex] = useState<string | null>(null);

  useEffect(() => {
    const storedIndex = localStorage.getItem('expandedAccordionIndex');
    if (storedIndex) {
      setExpandedIndex(storedIndex);
    }
  }, []);

  useEffect(() => {
    if (expandedIndex !== null) {
      localStorage.setItem('expandedAccordionIndex', expandedIndex);
    }
  }, [expandedIndex]);

  if (!items?.length) {
    return null;
  }

  const handleAccordionChange = (key: string) => {
    setExpandedIndex(expandedIndex === key ? null : key);
  };

  const isActive = (href: string) => {
    if (path === href) return true;
    return path.startsWith(href);
  };

  return (
    <nav className="flex flex-col items-start gap-2">
      <TooltipProvider>
        <Accordion
          type="single"
          collapsible
          value={expandedIndex || ''}
          onValueChange={handleAccordionChange}
          className={`flex w-full flex-col ${
            isMinimized && !isMobileNav ? 'items-center' : ''
          }  gap-2`}
        >
          {items.map((item, index) => {
            const Icon = Icons[item.icon || 'arrowRight'];

            // For items without subnav
            if (!item.subnav) {
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href || '/'}
                      className={cn(
                        'flex items-center gap-2 overflow-hidden rounded-md p-2 px-3 text-sm font-medium hover:bg-muted hover:text-accent-foreground',
                        path === String(item.href) ? 'bg-muted' : 'transparent',
                        item.disabled && 'cursor-not-allowed opacity-80'
                      )}
                      onClick={() => {
                        if (setOpen) setOpen(false);
                      }}
                    >
                      {isMobileNav || (!isMinimized && !isMobileNav) ? (
                        <Icon className={`size-[1.1rem] flex-none`} />
                      ) : (
                        <Icon
                          className={`flex size-[1.1rem] w-full items-center justify-center`}
                        />
                      )}
                      {isMobileNav || (!isMinimized && !isMobileNav) ? (
                        <span className="mr-2 scale-95 truncate">
                          {item.title}
                        </span>
                      ) : (
                        ''
                      )}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    align="center"
                    side="right"
                    sideOffset={8}
                    className={`${!isMinimized ? 'hidden' : 'inline-block'}`}
                  >
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              );
            }

            // For items with subnav when minimized
            if (isMinimized && !isMobileNav) {
              return (
                <Popover key={index}>
                  <PopoverTrigger>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2 overflow-hidden rounded-md p-2 px-3 text-sm font-medium hover:bg-muted hover:text-accent-foreground">
                          <Icon className={` size-[1.1rem] flex-none`} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        align="center"
                        side="right"
                        sideOffset={8}
                        className="inline-block"
                      >
                        {item.title}
                      </TooltipContent>
                    </Tooltip>
                  </PopoverTrigger>
                  <PopoverContent className="absolute right-[-220px] top-[-30px] flex w-[200px]  flex-col gap-2 !p-2">
                    <span className=" flex justify-between px-2 pt-1 text-sm font-semibold">
                      <div>{item.title}</div>
                      <Icon className={`size-[1rem] flex-none`} />
                    </span>
                    <div className="h-1 w-full border-b"></div>
                    <div>
                      {item.subnav.map((subItem, subIndex) => {
                        const IconSub = Icons[subItem.icon || 'arrowRight'];
                        return (
                          <Link
                            key={`${index}-${subIndex}`}
                            href={subItem.href || '/'}
                            className={cn(
                              ' flex gap-1 rounded-md px-2 py-2 text-xs font-medium hover:bg-muted',
                              isActive(String(subItem.href))
                                ? 'bg-muted'
                                : 'transparent',
                              subItem.disabled &&
                                'cursor-not-allowed opacity-80'
                            )}
                          >
                            <IconSub className="size-[1rem] flex-none" />
                            {subItem.title}
                          </Link>
                        );
                      })}
                    </div>
                  </PopoverContent>
                </Popover>
              );
            }

            return (
              <AccordionItem
                className="!border-none px-1"
                key={index}
                value={index.toString()}
              >
                <AccordionTrigger className="flex w-full items-center justify-between rounded-md !border-none p-2 text-left text-sm font-medium !no-underline hover:bg-muted hover:text-accent-foreground">
                  <span className="flex items-center gap-2.5">
                    <Icon className={`size-[1.1rem] flex-none`} />
                    <span className="!no-underline">{item.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent
                  className={`!border-none pb-0 ${
                    isMobileNav || (!isMinimized && !isMobileNav)
                      ? 'pl-4'
                      : 'pl-1'
                  }`}
                >
                  {item.subnav.map((subItem, subIndex) => {
                    const IconSub = Icons[subItem.icon || 'arrowRight'];
                    return (
                      <Tooltip key={`${index}-${subIndex}`}>
                        <TooltipTrigger asChild>
                          <Link
                            href={subItem.href || '/'}
                            className={cn(
                              'flex items-center gap-2 overflow-hidden rounded-md p-2 px-3 text-sm font-medium hover:bg-muted hover:text-accent-foreground',
                              isActive(String(subItem.href))
                                ? 'bg-muted'
                                : 'transparent',
                              subItem.disabled &&
                                'cursor-not-allowed opacity-80'
                            )}
                            onClick={() => {
                              if (setOpen) setOpen(false);
                            }}
                          >
                            {isMobileNav || (!isMinimized && !isMobileNav) ? (
                              <IconSub className={`size-[1.1rem] flex-none`} />
                            ) : (
                              <IconSub
                                className={`flex size-[1.1rem] w-full items-center justify-center`}
                              />
                            )}
                            {isMobileNav || (!isMinimized && !isMobileNav) ? (
                              <span className="mr-2 scale-95 truncate">
                                {subItem.title}
                              </span>
                            ) : (
                              ''
                            )}
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent
                          align="center"
                          side="right"
                          sideOffset={8}
                          className={`${
                            !isMinimized ? 'hidden' : 'inline-block'
                          }`}
                        >
                          {subItem.title}
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </TooltipProvider>
    </nav>
  );
}
