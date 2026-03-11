import apiClient from "./axiosConfig";

export const clientesService = {
  /**
   * Obtiene la lista de clientes.
   * Permite filtrar por nombre/teléfono y estatus.
   */
  listar: async (buscar = "", soloActivos = true) => {
    const response = await apiClient.get("/Cliente", {
      params: { buscar, soloActivos },
    });
    return response.data;
  },

  /**
   * Obtiene un cliente específico por su ID.
   */
  obtenerPorId: async (id) => {
    const response = await apiClient.get(`/Cliente/${id}`);
    return response.data;
  },

  /**
   * Registra un nuevo cliente en la base de datos.
   */
  crear: async (datosCliente) => {
    const response = await apiClient.post("/Cliente", datosCliente);
    return response.data;
  },

  /**
   * Actualiza los datos de un cliente existente.
   */
  actualizar: async (id, datosCliente) => {
    const response = await apiClient.put(`/Cliente/${id}`, datosCliente);
    return response.data;
  },

  /**
   * Cambia el estatus (Activo/Inactivo) del cliente.
   * Solo accesible por Administradores según tu Backend.
   */
  cambiarEstatus: async (id, nuevoEstatus) => {
    const response = await apiClient.patch(
      `/Cliente/${id}/estatus`,
      nuevoEstatus,
      {
        headers: { "Content-Type": "application/json" },
      },
    );
    return response.data;
  },
};
