import { NextRequest } from 'next/server';

export const parseFormData = async (req: NextRequest) => {
  const formData = await req.formData();
  const body: any = {};
  formData.forEach((value, key) => {
    body[key] = value;
  });
  return body;
};
('');
