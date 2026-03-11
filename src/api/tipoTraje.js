import apiClient from "./axiosConfig";

export const tipoTrajeService = {
  /**
   * Obtiene el catálogo de tipos de traje.
   * Endpoint: GET /api/TipoTraje
   */
  listar: async () => {
    const response = await apiClient.get("/TipoTraje");
    return response.data;
  },
};
