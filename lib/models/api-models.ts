// ===== API Models =====
// Customize these types to match your API's response shape.

export interface User {
  id: number | string;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  email?: string;
  phone?: string;
  address?: string;
  [key: string]: unknown;
}

export interface UsersResponse {
  data: User[];
  total?: number;
}
