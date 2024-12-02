'use client';

import { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { DataTableViewOptions } from '@/app/components/data-table-components/data-table-view-options';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'highlight', link: '/dashboard/highlight' }
  ];

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>(
    (table.getColumn('name')?.getFilterValue() as string) ?? ''
  );
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState<string>(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    table.getColumn('name')?.setFilterValue(debouncedSearchTerm);
    router.push(
      `?page=1&row=${
        table.getState().pagination.pageSize
      }&search=${encodeURIComponent(debouncedSearchTerm)}`
    );
  }, [debouncedSearchTerm, table, router]);

  const handleValueChange = (value: number) => {
    table.setPageSize(Number(value));
    router.push(
      `?page=1&row=${value}&search=${encodeURIComponent(debouncedSearchTerm)}`
    );
  };

  return (
    <div className="flex w-full flex-col flex-wrap gap-4">
      <div className="flex items-center justify-between">
        <div className="w-1/2">
          <div className="h-9 w-[150px] lg:w-[280px]">
            <Input
              placeholder="Search highlight..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="h-9 w-full"
              endContent={<Search size={16} />}
            />
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex gap-4">
            <DataTableViewOptions table={table} />
            <Link
              className="flex items-center"
              href={'/dashboard/settings/highlight-spotlight/add'}
            >
              <Button variant="default">
                Add Highlight <Plus className="ml-1 mt-[3px] h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-5">
          <Breadcrumbs showDashboardIcon={false} items={breadcrumbItems} />
          <Separator orientation="vertical" className="h-[24px]" />
          <p className="text-nowrap text-sm font-medium">Total 128 data</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-nowrap text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => handleValueChange(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[1, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
