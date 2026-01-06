import apiClient from './axiosConfig';

export const getSucursales = () => apiClient.get('/Sucursales');
export const getSucursal = (id) => apiClient.get(`/Sucursales/${id}`);
export const createSucursal = (data) => apiClient.post('/Sucursales', {
  nombre: data.nombre,
  direccion: data.direccion || null,
  telefono: data.telefono || null,
  encargado: data.encargado || null,
  activa: data.activa !== undefined ? data.activa : true
});
export const updateSucursal = (id, data) => apiClient.put(`/Sucursales/${id}`, {
  nombre: data.nombre,
  direccion: data.direccion || null,
  telefono: data.telefono || null,
  encargado: data.encargado || null,
  activa: data.activa !== undefined ? data.activa : true
});
export const deleteSucursal = (id) => apiClient.delete(`/Sucursales/${id}`);
