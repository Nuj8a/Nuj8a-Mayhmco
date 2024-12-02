'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Pencil, Trash } from 'lucide-react';
import { DeleteConfirmation } from '@/components/deleteConfirmation';
import { useState } from 'react';
import { deleteCategory } from '@/api/react-query/mutations/categoryMutations';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  // const editLink = useRef<any>(null);
  const handleDeleteClick = (row: any) => {
    setIsOpen((p) => !p);
    setDeleteId(row?.original?.id);
  };
  const handleClose = () => {
    setDeleteId(0);
    setIsOpen(false);
  };
  const handleConfirm = async () => {
    try {
      const res = await deleteCategory(String(deleteId));
      // console.log(res);
      if (res.message) {
        toast.warning('Category deleted successfully.');
        router.refresh();
      } else {
        toast.error('Some error accuired.');
      }
      setDeleteId(0);
      setIsOpen(false);
    } catch (e) {
      toast.error('Cannot delete category.');
    }
  };

  const handelEditClick = (row: any) => {
    const id = row?.original?.id;
    if (Number(id) > 0) {
      router.push(`/dashboard/settings/category/edit/${row?.original?.id}`);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem
            onClick={() => handelEditClick(row)}
            className="flex justify-between pt-2  text-sm"
          >
            Edit Category
            <Pencil size={15} className="" />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleDeleteClick(row)}
            className="flex justify-between bg-red-300/10 pt-2 text-sm text-destructive"
          >
            Delete
            <Trash size={15} className=" text-destructive" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteConfirmation
        isOpen={isOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </>
  );
}
