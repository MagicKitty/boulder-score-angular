import { z } from 'zod';

export const GenderSchema = z.union([z.literal('male'), z.literal('female'), z.undefined()]);

export type Gender = z.infer<typeof GenderSchema>;