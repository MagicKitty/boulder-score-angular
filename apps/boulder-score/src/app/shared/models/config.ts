import { ThemeSchema } from '@boulder-score/models';
import { z } from 'zod';

// Define the schema for the config
const partialConfig = z.object({
  companyName: z.string(),
  apiUrl: z.string(),
  locale: z.string(),
  features: z.object({
    enableChat: z.boolean(),
    enablePayments: z.boolean(),
    enableNotifications: z.boolean(),
  }),
  supportEmail: z.string(),
});

const theme = z.object({
  theme: ThemeSchema
})

const fullConfig = partialConfig.merge(theme);

// Infer the type from the schema
export type ConfigDTO = z.infer<typeof fullConfig>;

// Parse the config if matches the schema
export function parseDTO(source: unknown) {
  return fullConfig.safeParse(source);
}
