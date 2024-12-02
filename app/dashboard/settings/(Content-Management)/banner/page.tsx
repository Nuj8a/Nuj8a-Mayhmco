import { Metadata } from 'next';
import { DataTableToolbar } from './assets/DataTableToolbar';
import { DataTable } from '@/app/components/data-table-components/data-table';
import { columns } from './assets/columns';
import { DataTablePagination } from './assets/DataTablePagination';

export const metadata: Metadata = {
  title: 'Banner Dashboard - mayhm.co',
  description:
    'Explore the categories of mayhm.co in this comprehensive dashboard. View details about each banner including assets and performance.',
  keywords: [
    'mayhm.co',
    'banner dashboard',
    'assets',
    'portfolio',
    'performance'
  ]
};

// Fetching the data on the server side
async function getData(page = 1, row = 10, search = '') {
  const url = `${process.env.NEXTAUTH_URL}/api/banner?page=${page}&row=${row}${
    search ? `&search=${encodeURIComponent(search)}` : ''
  }`;
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return await res.json();
  } catch (error) {
    return { data: [], total: 0 };
  }
}

// Main async component
export default async function MyTable({
  searchParams
}: {
  searchParams?: { page?: string; row?: string; search?: string };
}) {
  const page = searchParams?.page ? parseInt(searchParams.page, 10) : 1;
  const row = searchParams?.row ? parseInt(searchParams.row, 10) : 10;
  const search = searchParams?.search || '';

  const { data, pagination } = await getData(page, row, search);

  return (
    <div className="flex-1 flex-col md:flex">
      <div className="h-full w-full overflow-auto">
        <div className="flex h-full flex-col gap-12">
          <DataTable
            data={data || []}
            columns={columns}
            DataTableToolbar={DataTableToolbar}
          />
          <DataTablePagination
            pagination={
              pagination || { total: 0, totalPages: 1, currentPage: 1, row: 10 }
            }
          />
        </div>
      </div>
    </div>
  );
}
