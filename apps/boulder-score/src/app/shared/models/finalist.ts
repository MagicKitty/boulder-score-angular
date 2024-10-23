import { z } from 'zod';

export const FinalistSchema = z.object({
  firstName: z.string(),
  lastName: z.string()
})

export type Finalist = z.infer<typeof FinalistSchema>;