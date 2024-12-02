'use client';

import React, { useState, useEffect } from 'react';
import { DataTableToolbar } from './assets/DataTableToolbar';
import { DataTable } from '@/app/components/data-table-components/data-table';

// Client-side component
export function DataTableClient({ initialPage = 1, initialRow = 10 }) {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    currentPage: initialPage,
    row: initialRow
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `/api/banner?page=${pagination.currentPage}&row=${pagination.row}`
      );
      const result = await response.json();
      setData(result.data);
      setPagination({
        total: result.total,
        totalPages: Math.ceil(result.total / pagination.row),
        currentPage: pagination.currentPage,
        row: pagination.row
      });
    };

    fetchData();
  }, [pagination.currentPage, pagination.row]);

  return (
    <div className="mb-12 flex-1 flex-col md:flex">
      <div className="h-full w-full overflow-auto p-4 px-6">
        <div className="flex h-full flex-col gap-12">
          <DataTable
            data={data}
            columns={[]}
            DataTableToolbar={DataTableToolbar}
          />
        </div>
      </div>
    </div>
  );
}
