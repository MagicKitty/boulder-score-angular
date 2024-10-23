import { z } from 'zod';
// Define the schema for the config
const schema = z.object({
  companyName: z.string(),
  apiUrl: z.string(),
  theme: z.string(),
  locale: z.string(),
  features: z.object({
    enableChat: z.boolean(),
    enablePayments: z.boolean(),
    enableNotifications: z.boolean(),
  }),
  supportEmail: z.string(),
});

// Infer the type from the schema
export type ConfigDTO = z.infer<typeof schema>;

// Parse the config if matches the schema
export function parseDTO(source: unknown) {
  return schema.safeParse(source);
}
