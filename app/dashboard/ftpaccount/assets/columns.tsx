'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Users } from './schema';
import { DataTableRowActions } from './data-table-row-actions';
import { DataTableColumnHeader } from '@/app/components/data-table-components/data-table-column-header';

export const columns: ColumnDef<Users>[] = [
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
    accessorKey: 'hostname',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Host Name"
        className="text-sm font-medium"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-sm">
          <span className="line-clamp-1 min-w-[150px] max-w-[250px] truncate font-medium ">
            {row.getValue('hostname')}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: 'directory',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Directory"
        className="text-sm font-medium"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="line-clamp-1 flex items-center text-sm">
          <span className="line-clamp-1 min-w-[150px] max-w-[350px]">
            {row.getValue('directory')}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="User Name"
        className="text-sm font-medium"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="line-clamp-1 flex min-w-[100px] items-center text-sm">
          <span className="">{row.getValue('username')}</span>
        </div>
      );
    }
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
