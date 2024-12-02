'use client';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DotsHorizontalIcon
} from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DataTablePaginationProps {
  pagination: {
    total: number;
    totalPages: number;
    currentPage: number;
    row: number;
  };
}

export function DataTablePagination({ pagination }: DataTablePaginationProps) {
  const router = useRouter();
  const { totalPages, currentPage, row } = pagination;
  const [hoveredEllipsis, setHoveredEllipsis] = useState<
    'left' | 'right' | null
  >(null);

  const setPageIndex = (pageIndex: number) => {
    router.push(`?page=${pageIndex + 1}&row=${row}`);
  };

  const previousPage = () => {
    if (currentPage > 1) setPageIndex(currentPage - 2);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setPageIndex(currentPage);
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    pageButtons.push(
      <Button
        key={0}
        variant={currentPage === 1 ? 'default' : 'outline'}
        onClick={() => setPageIndex(0)}
        className="h-8 w-8 p-0"
      >
        1
      </Button>
    );

    if (totalPages > 5) {
      if (currentPage > 3) {
        pageButtons.push(
          <Button
            key="start-ellipsis"
            onMouseEnter={() => setHoveredEllipsis('left')}
            onMouseLeave={() => setHoveredEllipsis(null)}
            onClick={() => setPageIndex(Math.max(0, currentPage - 3))}
            className="h-8 w-8 p-0"
            variant="outline"
          >
            {hoveredEllipsis === 'left' ? (
              <ChevronLeftIcon className="h-4 w-4" />
            ) : (
              <DotsHorizontalIcon className="h-4 w-4" />
            )}
          </Button>
        );
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
          <Button
            key={i}
            variant={currentPage === i ? 'default' : 'outline'}
            onClick={() => setPageIndex(i - 1)}
            className="h-8 w-8 p-0"
          >
            {i}
          </Button>
        );
      }

      if (currentPage < totalPages - 2) {
        pageButtons.push(
          <Button
            key="end-ellipsis"
            onMouseEnter={() => setHoveredEllipsis('right')}
            onMouseLeave={() => setHoveredEllipsis(null)}
            onClick={() =>
              setPageIndex(Math.min(totalPages - 1, currentPage + 1))
            }
            className="h-8 w-8 p-0"
            variant="outline"
          >
            {hoveredEllipsis === 'right' ? (
              <ChevronRightIcon className="h-4 w-4" />
            ) : (
              <DotsHorizontalIcon className="h-4 w-4" />
            )}
          </Button>
        );
      }

      pageButtons.push(
        <Button
          key={totalPages - 1}
          variant={currentPage === totalPages ? 'default' : 'outline'}
          onClick={() => setPageIndex(totalPages - 1)}
          className="h-8 w-8 p-0"
        >
          {totalPages}
        </Button>
      );
    } else {
      for (let i = 1; i < totalPages; i++) {
        pageButtons.push(
          <Button
            key={i}
            variant={currentPage === i + 1 ? 'default' : 'outline'}
            onClick={() => setPageIndex(i)}
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
        Page {currentPage} of {totalPages}
      </div>
      <div>
        <div className="mb-3.5 flex h-full items-center justify-center space-x-2">
          <Button
            variant="outline"
            onClick={previousPage}
            disabled={currentPage <= 1}
            className="h-8 w-8 p-0"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          {renderPageButtons()}

          <Button
            variant="outline"
            onClick={nextPage}
            disabled={currentPage >= totalPages}
            className="h-8 w-8 p-0"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
