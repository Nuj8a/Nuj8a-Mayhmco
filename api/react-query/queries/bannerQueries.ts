import client from '../../client';

export const fetchbanner = async (userId: string) => {
  const { data } = await client.get(`/banner/${userId}?isdeleted=false`);
  return data;
};

export const fetchCategories = async () => {
  const { data } = await client.get('/banner');
  return data;
};

export const fetchAllCategories = async () => {
  const { data } = await client.get('/banner?row=0');
  return data;
};
