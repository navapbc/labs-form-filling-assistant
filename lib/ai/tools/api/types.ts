import { z } from 'zod';

// ===== Input Schemas =====

export const getUserByIdSchema = z.object({
  userId: z.union([z.number(), z.string()]).describe('The unique user ID'),
});

// ===== Output Schemas =====

export const userSchema = z.object({
  id: z.union([z.number(), z.string()]),
  first_name: z.string(),
  last_name: z.string(),
  date_of_birth: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const getUserResponseSchema = z.object({
  user: userSchema.nullable(),
  found: z.boolean(),
  error: z.string().optional(),
});

export const listUsersResponseSchema = z.object({
  users: z.array(userSchema),
  total: z.number().optional(),
  success: z.boolean(),
  error: z.string().optional(),
});
