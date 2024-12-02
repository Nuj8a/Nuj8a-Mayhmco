import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { DataTable } from '@/app/components/data-table-components/data-table';
import { columns } from '@/app/dashboard/domain/portfolio/assets/columns';
import { DataTableToolbar } from './assets/data-table-toolbar';

export const metadata: Metadata = {
  title: 'Expenses',
  description: 'An expense tracker built using Tanstack Table.'
};

async function getData() {
  const filePath = path.join(
    process.cwd(),
    '/app/dashboard/domain/portfolio/assets',
    'data.json'
  );

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // console.error('Error reading or parsing data.json:', error);
    return [];
  }
}

export default async function MyTable() {
  const data = await getData();

  return (
    <div className="mb-12 flex-1 flex-col md:flex">
      <DataTable
        data={data}
        columns={columns}
        DataTableToolbar={DataTableToolbar}
      />
    </div>
  );
}
