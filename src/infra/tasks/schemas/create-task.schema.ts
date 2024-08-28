import { z } from 'zod';

export const createTaskSchema = z
  .object({
    title: z.string().min(4).max(255),
    description: z.string().min(4).max(255),
    priority: z.enum(['low', 'medium', 'high']),
    status: z.enum(['todo', 'in_progress', 'done']),
    start_at: z.string().transform((date) => new Date(date)),
    end_at: z.string().transform((date) => new Date(date)),
  })
  .strict();

export type CreateTaskSchemaDTO = z.infer<typeof createTaskSchema>;
