import { tool } from 'ai';
import { z } from 'zod';
import { getUserById, getUsers } from '@/lib/api';

export const getUser = tool({
  description:
    'Get a user record from the external database by user ID. Use this to fetch participant data for form filling.',
  inputSchema: z.object({
    userId: z.union([z.number(), z.string()]).describe('The unique user ID'),
  }),
  execute: async ({ userId }: { userId: number | string }) => {
    try {
      const user = await getUserById(userId);
      return { user, found: true };
    } catch (error) {
      return {
        user: null,
        found: false,
        error: error instanceof Error ? error.message : 'Failed to fetch user',
      };
    }
  },
});

export const listUsers = tool({
  description: 'Fetch all users from the external database.',
  inputSchema: z.object({}),
  execute: async () => {
    try {
      const response = await getUsers();
      return { users: response.data, total: response.total, success: true };
    } catch (error) {
      return {
        users: [],
        total: 0,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch users',
      };
    }
  },
});

export const apiTools = {
  getUser,
  listUsers,
};
