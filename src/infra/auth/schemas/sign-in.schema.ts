import { z } from 'zod';

export const signInSchema = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .strict();

export type SignInSchemaDTO = z.infer<typeof signInSchema>;
