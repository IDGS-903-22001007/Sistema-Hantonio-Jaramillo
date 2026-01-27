import apiClient from "./axiosConfig";

export const getClientes = () => apiClient.get("/Clientes");

export const getCliente = (id) => apiClient.get(`/Clientes/${id}`);

export const createCliente = (data) =>
  apiClient.post("/Clientes", {
    // Prioriza nombreCompleto si viene del formulario, si no, intenta armarlo (por seguridad)
    nombreCompleto:
      data.nombreCompleto ||
      `${data.nombre || ""} ${data.apellido || ""}`.trim(),
    telefono: data.telefono || null,
    email: data.email || null,
    ciudad: data.ciudad || null, // ✅ Aquí se guardará lo del buscador
    estado: data.estado || null, // ✅ Aquí se guardará lo del buscador
    activo: data.activo !== undefined ? data.activo : true,
  });

export const updateCliente = (id, data) =>
  apiClient.put(`/Clientes/${id}`, {
    idCliente: parseInt(id),
    nombreCompleto:
      data.nombreCompleto ||
      `${data.nombre || ""} ${data.apellido || ""}`.trim(),
    telefono: data.telefono || null,
    email: data.email || null,
    ciudad: data.ciudad || null,
    estado: data.estado || null,
    activo: data.activo !== undefined ? data.activo : true,
  });

export const deleteCliente = (id) => apiClient.delete(`/Clientes/${id}`);

export const toggleClienteActivo = async (id, nuevoEstado) => {
  try {
    // 1. Obtenemos el cliente actual para no perder sus datos (ciudad, estado, etc.)
    const { data: cliente } = await getCliente(id);

    // 2. Enviamos la actualización manteniendo los datos originales y solo cambiando el activo
    return apiClient.put(`/Clientes/${id}`, {
      idCliente: cliente.idCliente,
      nombreCompleto: cliente.nombreCompleto,
      telefono: cliente.telefono,
      email: cliente.email,
      ciudad: cliente.ciudad, // Mantiene la ciudad que ya tenía
      estado: cliente.estado, // Mantiene el estado que ya tenía
      activo: nuevoEstado,
    });
  } catch (error) {
    console.error("Error al cambiar el estado del cliente", error);
    throw error;
  }
};
