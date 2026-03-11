import apiClient from "./axiosConfig";

export const sucursalesService = {
  /**
   * Obtiene todas las sucursales con su información de encargado.
   */
  listar: async () => {
    const response = await apiClient.get("/Sucursal");
    return response.data;
  },

  /**
   * Obtiene el detalle de una sucursal específica por ID.
   */
  obtenerPorId: async (id) => {
    const response = await apiClient.get(`/Sucursal/${id}`);
    return response.data;
  },

  /**
   * Crea una nueva sucursal (Solo Admin).
   */
  crear: async (datos) => {
    const response = await apiClient.post("/Sucursal", datos);
    return response.data;
  },

  /**
   * Actualiza los datos de una sucursal.
   */
  actualizar: async (id, datos) => {
    const response = await apiClient.put(`/Sucursal/${id}`, datos);
    return response.data;
  },

  /**
   * Activa o desactiva una sucursal (Baja lógica).
   */
  cambiarEstatus: async (id, nuevoEstatus) => {
    const response = await apiClient.patch(
      `/Sucursal/${id}/estatus`,
      nuevoEstatus,
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    return response.data;
  },
};
