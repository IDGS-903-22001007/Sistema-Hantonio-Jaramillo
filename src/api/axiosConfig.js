// axiosConfig.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:7172/api',
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    if (status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    } else if (status === 403) {
      // Manejo local: mostrar un mensaje claro
      alert('Acceso denegado: no tienes permisos para esta acción.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;