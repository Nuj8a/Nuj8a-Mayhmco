import {
  ChevronLeftIcon,
  ChevronRightIcon,
  // DoubleArrowLeftIcon,
  // DoubleArrowRightIcon,
  DotsHorizontalIcon
} from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table
}: DataTablePaginationProps<TData>) {
  const totalPages = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  const [hoveredEllipsis, setHoveredEllipsis] = useState<
    'left' | 'right' | null
  >(null);

  const renderPageButtons = () => {
    const pageButtons = [];

    // Always show the first page
    pageButtons.push(
      <Button
        key={0}
        variant={currentPage === 0 ? 'default' : 'outline'}
        onClick={() => table.setPageIndex(0)}
        className="h-8 w-8 p-0"
      >
        1
      </Button>
    );

    if (totalPages > 6) {
      // Left ellipsis if the current page is greater than 3
      if (currentPage > 3) {
        pageButtons.push(
          <Button
            key="start-ellipsis"
            onMouseEnter={() => setHoveredEllipsis('left')}
            onMouseLeave={() => setHoveredEllipsis(null)}
            onClick={() => table.setPageIndex(Math.max(0, currentPage - 2))}
            className="h-8 w-8 p-0"
            variant={'outline'}
          >
            {hoveredEllipsis === 'left' ? (
              <ChevronLeftIcon className="h-4 w-4" />
            ) : (
              <DotsHorizontalIcon className="h-4 w-4" />
            )}
          </Button>
        );
      }

      // Show adjacent pages near the current page
      const startPage = Math.max(1, currentPage - 1);
      const endPage = Math.min(totalPages - 2, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
          <Button
            key={i}
            variant={currentPage === i ? 'default' : 'outline'}
            onClick={() => table.setPageIndex(i)}
            className="h-8 w-8 p-0"
          >
            {i + 1}
          </Button>
        );
      }

      // Right ellipsis and the last page button
      if (currentPage < totalPages - 3) {
        pageButtons.push(
          <Button
            key="end-ellipsis"
            onMouseEnter={() => setHoveredEllipsis('right')}
            onMouseLeave={() => setHoveredEllipsis(null)}
            onClick={() =>
              table.setPageIndex(Math.min(totalPages - 1, currentPage + 2))
            }
            className="h-8 w-8 p-0"
            variant={'outline'}
          >
            {hoveredEllipsis === 'right' ? (
              <ChevronRightIcon className="h-4 w-4" />
            ) : (
              <DotsHorizontalIcon className="h-4 w-4" />
            )}
          </Button>
        );
      }

      // Always show the last page
      pageButtons.push(
        <Button
          key={totalPages - 1}
          variant={currentPage === totalPages - 1 ? 'default' : 'outline'}
          onClick={() => table.setPageIndex(totalPages - 1)}
          className="h-8 w-8 p-0"
        >
          {totalPages}
        </Button>
      );
    } else {
      // For pages <= 6, show all page buttons
      for (let i = 1; i < totalPages; i++) {
        pageButtons.push(
          <Button
            key={i}
            variant={currentPage === i ? 'default' : 'outline'}
            onClick={() => table.setPageIndex(i)}
            className="h-8 w-8 p-0"
          >
            {i + 1}
          </Button>
        );
      }
    }

    return pageButtons;
  };

  return (
    <div className="flex h-full items-center justify-end gap-5 space-y-4">
      <div className="text-sm font-medium">
        Page {currentPage + 1} of {totalPages}
      </div>
      <div>
        <div className="mb-3.5 flex h-full items-center justify-center space-x-2">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8 w-8 p-0"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          {renderPageButtons()}

          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-8 w-8 p-0"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
