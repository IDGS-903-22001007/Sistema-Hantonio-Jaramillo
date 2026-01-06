import apiClient from './axiosConfig';

export const getRoles = () => apiClient.get('/Roles');
export const getRol = (id) => apiClient.get(`/Roles/${id}`);
export const createRole = (data) => apiClient.post('/Roles', { nombre: data.nombre });
export const updateRole = (id, data) => apiClient.put(`/Roles/${id}`, { nombre: data.nombre });
export const deleteRole = (id) => apiClient.delete(`/Roles/${id}`);

// Aliases para compatibilidad
export const createRol = createRole;
export const updateRol = updateRole;
export const deleteRol = deleteRole;
