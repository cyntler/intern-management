import { API_URL } from '@/models';

export const fetchApi = async (endpoint: string, method: string = 'GET') => {
  const result = await fetch(`${API_URL}${endpoint}`, {
    method,
  });

  if (!result.ok) {
    throw new Error(result.statusText);
  }

  return result.json();
};
