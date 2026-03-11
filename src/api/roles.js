import apiClient from "./axiosConfig";

export const rolesService = {
  /**
   * Obtiene la lista completa de roles disponibles.
   * Útil para llenar Selects en el formulario de registro de usuarios.
   */
  listar: async () => {
    const response = await apiClient.get("/Rol");
    return response.data;
  },

  /**
   * Obtiene el detalle de un rol específico por ID.
   */
  obtenerPorId: async (id) => {
    const response = await apiClient.get(`/Rol/${id}`);
    return response.data;
  },
};
