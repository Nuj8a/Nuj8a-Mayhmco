import React from 'react';
import MyTable from './MyTable';

const page = () => {
  return (
    <div className=" h-full w-full overflow-auto p-4 px-6">
      <div className="flex h-full flex-col gap-12">
        <div>
          <MyTable />
        </div>
      </div>
    </div>
  );
};

export default page;
