'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Expense } from './schema';
import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: 'label',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Label"
        className="pl-4 text-sm font-medium"
      />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] pl-4 text-sm capitalize">
        {row.getValue('label')}
      </div>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'note',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Note"
        className="text-sm font-medium"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-sm">
          <span className="max-w-[500px] truncate font-medium capitalize">
            {row.getValue('note')}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Category"
        className="text-sm font-medium"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center text-sm">
          <span className="capitalize"> {row.getValue('category')}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Type"
        className="text-sm font-medium"
      />
    ),
    cell: ({ row }) => {
      const type = row.getValue('type');
      return (
        <div className="flex w-[100px] items-center text-sm">
          {type === 'income' ? (
            <TrendingUp size={20} className="mr-2 text-green-500" />
          ) : (
            <TrendingDown size={20} className="mr-2 text-red-500" />
          )}
          <span className="capitalize"> {row.getValue('type')}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Amount"
        className="text-sm font-medium"
      />
    ),
    cell: ({ row }) => {
      const type = row.getValue('type');
      return (
        <div className="flex w-[100px] items-center text-sm">
          <span
            className={cn(
              'capitalize',
              type === 'income' ? 'text-green-500' : 'text-red-500'
            )}
          >
            {' '}
            {row.getValue('amount')}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    }
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Date"
        className="text-sm font-medium"
      />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      const formattedDate = date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      return (
        <div className="flex w-[100px] items-center text-sm">
          <span className="capitalize">{formattedDate}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowDate = new Date(row.getValue(id));
      const [startDate, endDate] = value;
      return rowDate >= startDate && rowDate <= endDate;
    }
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Action"
        className="text-sm font-medium"
      />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
];
