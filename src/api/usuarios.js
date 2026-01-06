import apiClient from './axiosConfig';

export const getUsuarios = () => apiClient.get('/Usuarios');
export const getUsuario = (id) => apiClient.get(`/Usuarios/${id}`);
export const createUsuario = (data) => apiClient.post('/Usuarios', {
  idRol: data.idRol ? parseInt(data.idRol) : null,
  idSucursal: data.idSucursal ? parseInt(data.idSucursal) : null,
  nombreCompleto: data.nombreCompleto,
  login: data.login,
  passwordHash: data.password || data.passwordHash
});
export const updateUsuario = (id, data) => apiClient.put(`/Usuarios/${id}`, {
  idUsuario: parseInt(id),
  idRol: data.idRol ? parseInt(data.idRol) : null,
  idSucursal: data.idSucursal ? parseInt(data.idSucursal) : null,
  nombreCompleto: data.nombreCompleto,
  activo: data.activo !== undefined ? data.activo : true
});
export const toggleUsuarioActivo = (id, activo) => updateUsuario(id, { activo });
export const cambiarPassword = (id, newPassword) => apiClient.patch(`/Usuarios/${id}/password`, {
  newPassword
});
export const deleteUsuario = (id) => apiClient.delete(`/Usuarios/${id}`);
