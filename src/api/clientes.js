import apiClient from './axiosConfig';

export const getClientes = () => apiClient.get('/Clientes');
export const getCliente = (id) => apiClient.get(`/Clientes/${id}`);
export const createCliente = (data) => apiClient.post('/Clientes', {
  nombreCompleto: data.nombreCompleto || `${data.nombre || ''} ${data.apellido || ''}`.trim(),
  telefono: data.telefono || null,
  email: data.email || null,
  ciudad: data.ciudad || null,
  estado: data.estado || null
});
export const updateCliente = (id, data) => apiClient.put(`/Clientes/${id}`, {
  nombreCompleto: data.nombreCompleto || `${data.nombre || ''} ${data.apellido || ''}`.trim(),
  telefono: data.telefono || null,
  email: data.email || null,
  ciudad: data.ciudad || null,
  estado: data.estado || null
});
export const deleteCliente = (id) => apiClient.delete(`/Clientes/${id}`);
