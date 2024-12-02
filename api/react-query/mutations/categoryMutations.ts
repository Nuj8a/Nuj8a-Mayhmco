import client from '../../client';

export const createCategory = async (Category: any) => {
  try {
    const formData = new FormData();

    Object.entries(Category).forEach(([key, value]) => {
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

    const { data } = await client.post('/category', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return data;
  } catch (error: any) {
    console.error(
      'Error creating category:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateCategory = async (
  CategoryId: string,
  updates: Partial<any>
) => {
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

    const { data } = await client.put(`/category/?id=${CategoryId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return data;
  } catch (error: any) {
    console.error(
      'Error creating category:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteCategory = async (CategoryId: string) => {
  const { data } = await client.delete(`/category/?id=${CategoryId}`);
  return data;
};
