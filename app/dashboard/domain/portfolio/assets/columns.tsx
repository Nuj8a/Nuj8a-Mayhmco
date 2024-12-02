'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Domain } from './schema';
import { DataTableRowActions } from './data-table-row-actions';
import { DataTableColumnHeader } from '@/app/components/data-table-components/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { CircleCheck, CircleX } from 'lucide-react';

export const columns: ColumnDef<Domain>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="ID"
        className="pl-4 text-sm font-medium"
      />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 w-[30px] pl-4 text-sm ">
        {row.getValue('id')}
      </div>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'domainName',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Domain Name"
        className="text-sm font-medium"
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2 text-sm">
        <span className="line-clamp-1 min-w-[150px] max-w-[250px] truncate font-medium">
          {row.getValue('domainName')}
        </span>
      </div>
    )
  },
  {
    accessorKey: 'ipAddress',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="IP Address"
        className="text-sm font-medium"
      />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 flex items-center text-sm">
        <span className="line-clamp-1 min-w-[150px] max-w-[350px]">
          {row.getValue('ipAddress')}
        </span>
      </div>
    )
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        className="text-sm font-medium"
      />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 flex min-w-[100px] items-center text-sm">
        <span>
          {row.getValue('status') ? (
            <Badge variant={'default'} className="bg-green-500">
              Active
            </Badge>
          ) : (
            <Badge variant={'destructive'}>Inactive</Badge>
          )}
        </span>
      </div>
    )
  },
  {
    accessorKey: 'expiresAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Expires At"
        className="text-sm font-medium"
      />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 flex min-w-[100px] items-center text-sm">
        <span>{row.getValue('expiresAt')}</span>
      </div>
    )
  },
  {
    accessorKey: 'autoRenewal',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Auto Renewal"
        className="text-sm font-medium"
      />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 flex min-w-[100px] items-center text-sm">
        <span>
          {row.getValue('autoRenewal') ? (
            <div className="flex items-center justify-center gap-1 text-green-600">
              <CircleCheck className="h-4 w-4 scale-95" />
              Yes
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1 text-destructive">
              <CircleX className="h-4 w-4 scale-95" />
              No
            </div>
          )}
        </span>
      </div>
    )
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Actions"
        className="w-[50px] text-sm font-medium"
      />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
];
