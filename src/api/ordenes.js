import apiClient from "./axiosConfig";

export const ordenesService = {
  /**
   * Obtiene la lista de todas las órdenes.
   * Útil para administradores o vistas generales.
   */
  listar: async () => {
    const response = await apiClient.get("/Orden");
    return response.data;
  },

  /**
   * Obtiene las órdenes filtradas por sucursal.
   */
  listarPorSucursal: async (idSucursal) => {
    const response = await apiClient.get(`/Orden/sucursal/${idSucursal}`);
    return response.data;
  },

  /**
   * Obtiene el catálogo de estatus disponibles (Pendiente, Medidas, etc.).
   * Se usa para poblar el select de estatus.
   */
  obtenerCatEstatus: async () => {
    // Asumiendo que tienes un endpoint para esto, o si es un Enum en backend
    const response = await apiClient.get("/Orden/estatus");
    return response.data;
  },

  /**
   * CREAR COMPLETA: Registra Orden + Detalles + Medidas en una sola petición.
   */
  // Reemplaza tu método actualizar por este:
  actualizarCompleta: async (id, datosOrdenMaster) => {
    const response = await apiClient.put(
      `/Orden/actualizar-completa/${id}`,
      datosOrdenMaster,
    );
    return response.data;
  },

  crearCompleta: async (datosOrdenMaster) => {
    const response = await apiClient.post(
      "/Orden/crear-completa",
      datosOrdenMaster,
    );
    return response.data;
  },

  /**
   * Actualiza una orden existente.
   */

  /**
   * Elimina una orden (Solo Admin).
   */
  eliminar: async (id) => {
    const response = await apiClient.delete(`/Orden/${id}`);
    return response.data;
  },

  /**
   * Cambia solo el estatus de la orden (ej. de Pendiente a Entregado).
   * Sigue el patrón de tus otros servicios con header JSON explícito.
   */
  cambiarEstatus: async (id, nuevoEstatusId) => {
    const response = await apiClient.patch(
      `/Orden/${id}/estatus`,
      nuevoEstatusId,
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    return response.data;
  },
};
