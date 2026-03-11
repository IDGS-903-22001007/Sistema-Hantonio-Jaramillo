import apiClient from "./axiosConfig";

export const estatusOrdenService = {
  /**
   * Obtiene el catálogo de estatus disponibles.
   * Endpoint: GET /api/EstatusOrden
   */
  listar: async () => {
    const response = await apiClient.get("/EstatusOrden");
    return response.data;
  },
};
