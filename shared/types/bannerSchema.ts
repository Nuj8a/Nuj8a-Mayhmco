import { z } from 'zod';

// Type definition based on Prisma model
export type bannerSchema = {
  id: number;
  name: string;
  position: number; // Changed to `number` to match Prisma model
  isActive: boolean;
  description: string;
  banner?: string; // Aligned with the Prisma field `banner`
  displayMode?: string; // Optional field in Prisma
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

// Zod schema for form validation
export const bannerFormSchema = z.object({
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
  description: z
    .string()
    .min(1, 'Description must be greater than 10 characters'),
  banner: z
    .any()
    .refine((val) => typeof val === 'string' || val instanceof File, {
      message: 'Banner must be a file or a string.'
    })
    .optional(),
  displayMode: z.string().optional(),
  deletedAt: z.string().nullable().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
});

export type bannerFormValues = z.infer<typeof bannerFormSchema>;
