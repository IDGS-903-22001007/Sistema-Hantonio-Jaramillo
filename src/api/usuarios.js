import apiClient from "./axiosConfig";

export const usuariosService = {
  // Obtener lista
  listar: async () => {
    const response = await apiClient.get("/Usuario");
    return response.data;
  },

  // Registrar
  registrar: async (datosUsuario) => {
    // CORRECCIÓN: Agregamos "/registrar" para coincidir con [HttpPost("registrar")] del backend
    const response = await apiClient.post("/Usuario/registrar", datosUsuario);
    return response.data;
  },

  // Crear (alias que usa el componente)
  crear: async (datosUsuario) => {
    // CORRECCIÓN: Aquí también agregamos "/registrar"
    const response = await apiClient.post("/Usuario/registrar", datosUsuario);
    return response.data;
  },

  // Actualizar
  actualizar: async (id, datosActualizados) => {
    const response = await apiClient.put(`/Usuario/${id}`, datosActualizados);
    return response.data;
  },

  // Cambio de Estatus
  cambiarEstatus: async (id, nuevoEstatus) => {
    const response = await apiClient.patch(`/Usuario/${id}/estatus`, {
      estatus: nuevoEstatus,
    });
    return response.data;
  },
};
