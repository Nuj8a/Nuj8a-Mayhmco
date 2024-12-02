import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Fragment } from 'react';
import { LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

type BreadcrumbItemProps = {
  title: string;
  link: string;
};

export function Breadcrumbs({
  items,
  showDashboardIcon = true
}: {
  items: BreadcrumbItemProps[];
  showDashboardIcon: Boolean;
}) {
  const MAX_ITEMS = 4;

  const shouldCollapse = items.length > MAX_ITEMS;

  const visibleItems = shouldCollapse
    ? [items[0], items[items.length - 2], items[items.length - 1]]
    : items;

  const hiddenItems = shouldCollapse ? items.slice(1, items.length - 2) : [];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {visibleItems.map((item, index) => (
          <Fragment key={item.title}>
            {index === 0 && (
              <>
                {showDashboardIcon && <LayoutDashboard size={17} />}
                <BreadcrumbItem>
                  <Link href={item.link}>{item.title}</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}

            {index === 1 && shouldCollapse && (
              <>
                <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <span>...</span>
                      <span className="sr-only">Toggle menu</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {hiddenItems.map((hiddenItem) => (
                        <DropdownMenuItem key={hiddenItem.title}>
                          <Link href={hiddenItem.link}>{hiddenItem.title}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}

            {index > 0 && index < visibleItems.length - 1 && (
              <>
                <BreadcrumbItem>
                  <Link href={item.link}>{item.title}</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}

            {index === visibleItems.length - 1 && (
              <BreadcrumbPage>{item.title}</BreadcrumbPage>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
