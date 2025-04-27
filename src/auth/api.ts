import { useAuth } from './AuthContext';

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('No access token');
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Unauthorized — maybe token expired
    throw new Error('Unauthorized');
  }

  return response;
}
