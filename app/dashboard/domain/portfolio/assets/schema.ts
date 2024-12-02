import { z } from 'zod';

export const domainSchema = z.object({
  id: z.number(),
  domainName: z.string(),
  ipAddress: z.string(),
  status: z.boolean(),
  expireDate: z.string(),
  autoRenewal: z.boolean()
});

export type Domain = z.infer<typeof domainSchema>;
