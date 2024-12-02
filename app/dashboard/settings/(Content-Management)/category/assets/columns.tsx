'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './DataTableRowActions';
import { DataTableColumnHeader } from '@/app/components/data-table-components/data-table-column-header';
import { CategorySchema } from '@/shared/types/categorySchema';
import Image from 'next/image';
import ServerUrl from '@/service/ServerUrl';

export const columns: ColumnDef<CategorySchema>[] = [
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
      <div className="line-clamp-1 w-[35px] pl-4 text-sm">
        {row.getValue('id')}
      </div>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Category Name"
        className="text-sm font-medium"
      />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2 text-sm">
        <span className="line-clamp-1 min-w-[150px] max-w-[250px] truncate font-medium">
          {row.getValue('name')}
        </span>
      </div>
    )
  },
  {
    accessorKey: 'position',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Position"
        className="text-sm font-medium"
      />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 flex items-center text-sm">
        <span className="line-clamp-1 min-w-[50px] max-w-[150px]">
          {row.getValue('position')}
        </span>
      </div>
    )
  },
  {
    accessorKey: 'Banner',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Banner Image"
        className="text-sm font-medium"
      />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 flex items-center text-sm">
        {row.getValue('Banner') ? (
          <Image
            height={100}
            width={100}
            src={`${ServerUrl}/${row.getValue('Banner')}`}
            alt="banner "
            className="h-[50px] w-[50px] rounded-lg object-cover"
          />
        ) : (
          <div> -</div>
        )}
      </div>
    )
  },
  {
    accessorKey: 'isActive',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Active Status"
        className="text-sm font-medium"
      />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 flex items-center text-sm">
        <span
          className={`rounded-full border p-1 px-3 text-xs ${
            row.getValue('isActive')
              ? ' border-green-600/30 text-green-600'
              : 'border-red-600/30 text-red-600'
          }
          `}
        >
          {row.getValue('isActive') ? 'Active' : 'Inactive'}
        </span>
      </div>
    )
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Created At"
        className="text-sm font-medium"
      />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 flex min-w-[100px] items-center text-sm">
        <span>{new Date(row.getValue('createdAt')).toLocaleDateString()}</span>
      </div>
    )
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Last Updated"
        className="text-sm font-medium"
      />
    ),
    cell: ({ row }) => (
      <div className="line-clamp-1 flex min-w-[100px] items-center text-sm">
        <span>{new Date(row.getValue('updatedAt')).toLocaleDateString()}</span>
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
