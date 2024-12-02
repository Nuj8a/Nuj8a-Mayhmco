'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CategorySchema } from '@/shared/types/categorySchema';
import { fetchCategory } from '@/api/react-query/queries/categoryQueries';
import AddPage from '../../add/AddPage';

const EditData = () => {
  const [updateData, setUpdateData] = useState<CategorySchema>();
  const router = useRouter();
  const { id } = useParams();
  useEffect(() => {
    const fetSingle = async (id: any) => {
      const resdata = await fetchCategory(String(id));
      setUpdateData(resdata.data);
    };
    if (Number(id) > 0) {
      fetSingle(id);
    } else {
      router.push('/dashboard/settings/category');
    }
  }, [id, router]);

  return (
    <div>
      <AddPage updateData={updateData} />
    </div>
  );
};

export default EditData;
