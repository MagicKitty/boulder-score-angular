import { z } from 'zod';

export const ThemeSchema = z.union([z.literal('light'), z.literal('dark'), z.literal('climbing')]);

export type Theme = z.infer<typeof ThemeSchema>;