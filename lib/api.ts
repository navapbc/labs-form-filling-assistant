import type { User, UsersResponse } from './models/api-models';

export type { User, UsersResponse } from './models/api-models';

// ===== Configuration =====
const baseUrl = process.env.API_BASE_URL;
const apiKey = process.env.API_KEY;

/**
 * Make an authenticated GET request to the external API.
 * Customize headers/auth to match your API.
 */
async function apiGet<T>(path: string): Promise<T> {
  if (!baseUrl) {
    throw new Error('Missing required environment variable: API_BASE_URL');
  }

  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  const response = await fetch(`${baseUrl}${path}`, { headers });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed (${response.status}): ${errorText}`);
  }

  return response.json();
}

/** Fetch a single user by ID. */
export const getUserById = async (userId: number | string): Promise<User> => {
  return apiGet<User>(`/users/${userId}`);
};

/** Fetch a list of users. */
export const getUsers = async (): Promise<UsersResponse> => {
  return apiGet<UsersResponse>('/users');
};
