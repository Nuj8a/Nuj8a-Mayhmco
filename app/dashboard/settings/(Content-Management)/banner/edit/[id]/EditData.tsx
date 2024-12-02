'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AddPage from '../../add/AddPage';
import { bannerSchema } from '@/shared/types/bannerSchema';
import { fetchbanner } from '@/api/react-query/queries/bannerQueries';

const EditData = () => {
  const [updateData, setUpdateData] = useState<bannerSchema>();
  const router = useRouter();
  const { id } = useParams();
  useEffect(() => {
    const fetSingle = async (id: any) => {
      const resdata = await fetchbanner(String(id));
      setUpdateData(resdata.data);
    };
    if (Number(id) > 0) {
      fetSingle(id);
    } else {
      router.push('/dashboard/settings/banner');
    }
  }, [id, router]);

  return (
    <div>
      <AddPage updateData={updateData} />
    </div>
  );
};

export default EditData;
