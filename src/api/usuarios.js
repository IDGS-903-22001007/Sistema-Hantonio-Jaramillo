import apiClient from './axiosConfig';

export const getUsuarios = () => apiClient.get('/Usuarios');
export const getUsuario = (id) => apiClient.get(`/Usuarios/${id}`);

export const createUsuario = (data) => {
  console.log('📨 API createUsuario recibió:', data);
  
  return apiClient.post('/Usuarios', {
    login: data.login,
    password: data.password,
    nombreCompleto: data.nombreCompleto || data.nombre,
    idRol: data.idRol ? parseInt(data.idRol) : null,
    idSucursal: data.idSucursal ? parseInt(data.idSucursal) : null
  });
};

export const updateUsuario = (id, data) => apiClient.put(`/Usuarios/${id}`, {
  idUsuario: parseInt(id),
  idRol: data.idRol ? parseInt(data.idRol) : null,
  idSucursal: data.idSucursal ? parseInt(data.idSucursal) : null,
  nombreCompleto: data.nombreCompleto,
  activo: data.activo !== undefined ? data.activo : true
});

// Intenta primero con PATCH /estado, si falla usa PUT con todo el usuario
export const toggleUsuarioActivo = async (id, nuevoEstado) => {
  try {
    return await apiClient.patch(`/Usuarios/${id}/estado`, {
      activo: nuevoEstado
    });
  } catch (error) {
    if (error.response?.status === 404) {
      console.warn('Endpoint /estado no encontrado, usando PUT completo');
      const usuario = await apiClient.get(`/Usuarios/${id}`);
      return await apiClient.put(`/Usuarios/${id}`, {
        ...usuario.data,
        activo: nuevoEstado
      });
    }
    throw error;
  }
};

export const cambiarPassword = (id, newPassword) => apiClient.patch(`/Usuarios/${id}/password`, {
  newPassword
});
export const deleteUsuario = (id) => apiClient.delete(`/Usuarios/${id}`);
