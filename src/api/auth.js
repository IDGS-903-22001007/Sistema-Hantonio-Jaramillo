import apiClient from './axiosConfig';

export const login = async ({ login, password }) => {
  const response = await apiClient.post('/auth/login', { login, password });
  return response.data;
};

export const logout = () => {
  // Logout is a client-side action in this case (removing the token)
  // but we could also call a server endpoint if it existed.
  return Promise.resolve();
};
