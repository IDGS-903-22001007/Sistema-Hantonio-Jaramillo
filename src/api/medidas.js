import apiClient from "./axiosConfig";

export const medidasService = {
  /**
   * Obtiene las medidas asociadas a una orden específica.
   * Ideal para cuando el sastre abre el expediente de un cliente.
   */
  obtenerPorOrden: async (idOrden) => {
    const response = await apiClient.get(`/Medidas/orden/${idOrden}`);
    return response.data;
  },

  /**
   * Actualiza las medidas de una orden existente.
   * @param {number} id - El IdMedida (la llave primaria).
   * @param {Object} datos - El objeto con todas las medidas actualizadas.
   */
  actualizar: async (id, datos) => {
    const response = await apiClient.put(`/Medidas/${id}`, datos);
    return response.data;
  },

  /**
   * Obtiene un registro de medida específico por su ID único.
   */
  obtenerPorId: async (id) => {
    const response = await apiClient.get(`/Medidas/${id}`);
    return response.data;
  },
};
