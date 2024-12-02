import client from '../../client';

export const fetchhighlight = async (userId: string) => {
  const { data } = await client.get(`/highlight/${userId}?isdeleted=false`);
  return data;
};

export const fetchCategories = async () => {
  const { data } = await client.get('/highlight');
  return data;
};

export const fetchAllCategories = async () => {
  const { data } = await client.get('/highlight?row=0');
  return data;
};
