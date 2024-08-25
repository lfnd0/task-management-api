import { z } from 'zod';

export const createUserSchema = z
  .object({
    name: z.string().min(4).max(255),
    username: z.string().min(4).max(255),
    email: z.string().email(),
    password: z.string().min(8).max(255),
  })
  .strict();

export type CreateUserSchemaDTO = z.infer<typeof createUserSchema>;
