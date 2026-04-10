import { z } from 'zod';

// POST /api/link - Create a new shared link
export const createLinkRequestSchema = z.object({
  content: z
    .string()
    .min(1, 'Content is required')
    .max(10000, 'Content must be less than 10000 characters'),
  expiresInHours: z
    .number()
    .min(1, 'Expiration must be at least 1 hour')
    .max(24, 'Expiration cannot exceed 24 hours')
    .optional()
    .default(24),
});

export type CreateLinkRequest = z.infer<typeof createLinkRequestSchema>;

export const createLinkResponseSchema = z.object({
  url: z.string().url(),
  token: z.string(),
  expiresAt: z.string().datetime(),
});

export type CreateLinkResponse = z.infer<typeof createLinkResponseSchema>;
