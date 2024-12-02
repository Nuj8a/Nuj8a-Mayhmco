import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const usersSchema = z.object({
  id: z.string(),
  hostname: z.string(),
  directory: z.string(),
  username: z.string()
});

export type Users = z.infer<typeof usersSchema>;
