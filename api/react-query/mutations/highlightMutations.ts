import client from '../../client';

export const createhighlight = async (highlight: any) => {
  try {
    const formData = new FormData();

    Object.entries(highlight).forEach(([key, value]) => {
      if (key === 'highlight') {
        if (Array.isArray(value)) {
          value.forEach((file: File) => {
            if (file instanceof File) {
              formData.append(key, file);
            }
          });
        }
      } else if (key === 'parentId') {
        if (value !== 'root' && value !== '') {
          formData.append(key, value as string);
        }
      } else if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });

    const { data } = await client.post('/highlight', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return data;
  } catch (error: any) {
    console.error(
      'Error creating highlight:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updatehighlight = async (
  highlightId: string,
  updates: Partial<any>
) => {
  try {
    const formData = new FormData();

    Object.entries(updates).forEach(([key, value]) => {
      if (key === 'highlight') {
        if (Array.isArray(value)) {
          value.forEach((file: File) => {
            if (file instanceof File) {
              formData.append(key, file);
            }
          });
        }
      } else if (key === 'parentId') {
        if (value !== 'root' && value !== '') {
          formData.append(key, value as string);
        }
      } else if (value !== undefined && value !== null) {
        formData.append(key, value as string);
      }
    });
    const { data } = await client.put(
      `/highlight/?id=${highlightId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return data;
  } catch (error: any) {
    console.error(
      'Error creating highlight:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deletehighlight = async (highlightId: string) => {
  const { data } = await client.delete(`/highlight/?id=${highlightId}`);
  return data;
};
