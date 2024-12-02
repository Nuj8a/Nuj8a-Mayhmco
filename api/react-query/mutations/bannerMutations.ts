import client from '../../client';

export const createbanner = async (banner: any) => {
  try {
    const formData = new FormData();

    Object.entries(banner).forEach(([key, value]) => {
      if (key === 'banner') {
        if (value instanceof File) {
          formData.append(key, value);
        }
      } else if (key === 'parentId') {
        if (value !== 'root' && value !== '') {
          formData.append(key, value as string);
        }
      } else if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });

    const { data } = await client.post('/banner', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return data;
  } catch (error: any) {
    console.error(
      'Error creating banner:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updatebanner = async (bannerId: string, updates: Partial<any>) => {
  try {
    const formData = new FormData();

    Object.entries(updates).forEach(([key, value]) => {
      if (key === 'banner') {
        if (value instanceof File) {
          formData.append(key, value);
        }
      } else if (key === 'parentId') {
        if (value !== 'root' && value !== '') {
          formData.append(key, value as string);
        }
      } else if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });

    const { data } = await client.put(`/banner/?id=${bannerId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return data;
  } catch (error: any) {
    console.error(
      'Error creating banner:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deletebanner = async (bannerId: string) => {
  const { data } = await client.delete(`/banner/?id=${bannerId}`);
  return data;
};
