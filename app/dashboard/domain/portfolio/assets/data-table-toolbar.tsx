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
import { Search } from 'lucide-react';
import { DataTableViewOptions } from '@/app/components/data-table-components/data-table-view-options';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Separator } from '@/components/ui/separator';
import { AddDomain } from '../moddal/AddDomain';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  const breadcrumbItems = [
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Domain Portfolio', link: '/dashboard/domain/portfolio' }
  ];

  return (
    <div className="flex w-full flex-col flex-wrap gap-4 ">
      <div className="flex items-center justify-between ">
        <div className="w-1/2">
          <div className="h-9 w-[150px] lg:w-[280px]">
            <Input
              placeholder="Search by domain name..."
              value={
                (table.getColumn('hostname')?.getFilterValue() as string) ?? ''
              }
              onChange={(event) => {
                table.getColumn('hostname')?.setFilterValue(event.target.value);
              }}
              className="h-9 w-full"
              endContent={<Search size={16} />}
            />
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex gap-4">
            <DataTableViewOptions table={table} />
            <AddDomain />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-5">
          <Breadcrumbs items={breadcrumbItems} showDashboardIcon={true} />
          <Separator orientation="vertical" className="h-[24px]" />
          <p className="text-nowrap text-sm font-medium">Total 128 data</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-nowrap text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
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
