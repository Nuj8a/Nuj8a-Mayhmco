'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { incomeType, categories } from './data';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { CalendarDatePicker } from '@/components/calendar-date-picker';
import { useState } from 'react';
import { DataTableViewOptions } from './data-table-view-options';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Search } from 'lucide-react';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date()
  });

  const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
    setDateRange({ from, to });
    table.getColumn('date')?.setFilterValue([from, to]);
  };

  return (
    <div className="flex w-full flex-col flex-wrap gap-3 ">
      <div className="flex items-center justify-between ">
        <div className="w-1/2">
          <div className="h-9 w-[150px] lg:w-[280px]">
            <Input
              placeholder="Search by host name..."
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
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {table.getColumn('category') && (
            <DataTableFacetedFilter
              column={table.getColumn('category')}
              title="Category"
              options={categories}
            />
          )}
          {table.getColumn('type') && (
            <DataTableFacetedFilter
              column={table.getColumn('type')}
              title="Type"
              options={incomeType}
            />
          )}
          {isFiltered && (
            <Button
              variant="outline"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
          <CalendarDatePicker
            date={dateRange}
            onDateSelect={handleDateSelect}
            className="h-8 w-[250px]"
            variant="outline"
          />
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
