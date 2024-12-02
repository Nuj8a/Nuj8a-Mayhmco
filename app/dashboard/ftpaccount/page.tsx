import React from 'react';
import AccountCreateCard from './AccountCreateCard';
import MyTable from './MyTable';
import { Separator } from '@/components/ui/separator';

const page = () => {
  return (
    <div className=" h-full w-full overflow-auto p-4 px-6">
      <div className="flex h-full flex-col gap-12">
        <div>
          <AccountCreateCard />
        </div>
        <Separator orientation="horizontal" />
        <div>
          <MyTable />
        </div>
      </div>
    </div>
  );
};

export default page;
