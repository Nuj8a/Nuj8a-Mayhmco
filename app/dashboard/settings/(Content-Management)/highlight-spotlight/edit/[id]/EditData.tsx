'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AddPage from '../../add/AddPage';
import { highlightSchema } from '@/shared/types/highlightSchema';
import { fetchhighlight } from '@/api/react-query/queries/highlightQueries';

const EditData = () => {
  const [updateData, setUpdateData] = useState<highlightSchema>();
  const router = useRouter();
  const { id } = useParams();
  useEffect(() => {
    const fetSingle = async (id: any) => {
      const resdata = await fetchhighlight(String(id));
      setUpdateData(resdata.data);
    };
    if (Number(id) > 0) {
      fetSingle(id);
    } else {
      router.push('/dashboard/settings/highlight');
    }
  }, [id, router]);

  return (
    <div>
      <AddPage updateData={updateData} />
    </div>
  );
};

export default EditData;
