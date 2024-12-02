import { z } from 'zod';

// Type definition based on Prisma model
export type highlightSchema = {
  id: number;
  name: string;
  highlight?: string; // Aligned with the Prisma field `highlight`
  position: number; // Changed to `number` to match Prisma model
  isActive: boolean;

  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

// Zod schema for form validation
export const highlightFormSchema = z.object({
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
  highlight: z
    .any()
    .refine((val) => typeof val === 'string' || val instanceof File, {
      message: 'highlight must be a file or a string.'
    })
    .optional(),
  deletedAt: z.string().nullable().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
});

export type highlightFormValues = z.infer<typeof highlightFormSchema>;
