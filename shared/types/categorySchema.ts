import { z } from 'zod';

export type CategorySchema = {
  id: number;
  name: string;
  position: string;
  isActive: boolean;
  parentId?: string;
  displayMode: 'products_description' | 'products' | 'description';
  description: string;
  Banner: string;
  metaTitle: string;
  slug: string;
  metaKeyword: string;
  metaDescription: string;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export const categoryFormSchema = z.object({
  name: z
    .string()
    .nonempty('Name is required')
    .max(255, 'Name must be at most 255 characters long'),
  position: z
    .number()
    .transform((val) => parseInt(String(val), 10))
    .refine((val) => !isNaN(val) && Number.isInteger(val) && val >= 1, {
      message: 'Position must be an integer greater than or equal to 1'
    }),
  isActive: z.boolean(),
  parentId: z.string(),
  displayMode: z.enum(['products_description', 'products', 'description'], {
    errorMap: () => ({
      message:
        'Display Mode must be one of the following: products and description, products, or description'
    })
  }),
  description: z
    .string()
    .min(1, 'Description must be greater then 10 characters.'),
  banner: z
    .any()
    .refine((val) => val instanceof File || typeof val === 'string', {
      message: 'Banner must be a file or a string.'
    })
    .optional(),
  metaTitle: z.string().min(2, 'Please enter meta title'),
  slug: z.string().optional(),
  metaKeyword: z.string().optional(),
  metaDescription: z.string().optional()
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
