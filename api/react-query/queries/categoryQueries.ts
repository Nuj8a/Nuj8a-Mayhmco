import client from '../../client';

export const fetchCategory = async (userId: string) => {
  const { data } = await client.get(`/category/${userId}?isdeleted=false`);
  return data;
};

export const fetchCategories = async () => {
  const { data } = await client.get('/category');
  return data;
};

export const fetchAllCategories = async () => {
  const { data } = await client.get('/category?row=0');
  return data;
};
