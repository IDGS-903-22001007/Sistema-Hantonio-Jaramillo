import apiClient from "./axiosConfig";

const handleError = (error, mensaje) => {
  console.error(mensaje, error);
  throw error;
};

export const finanzasService = {
  listar: async () => {
    try {
      const { data } = await apiClient.get("/Finanzas");
      return data;
    } catch (error) {
      handleError(error, "Error al obtener finanzas:");
    }
  },

  crear: async (datosCalculo) => {
    try {
      const { data } = await apiClient.post("/Finanzas", datosCalculo);
      return data;
    } catch (error) {
      handleError(error, "Error al crear finanza:");
    }
  },

  obtenerTipoCambio: async () => {
    try {
      const res = await fetch("https://api.exchangerate-api.com/v4/latest/MXN");
      const data = await res.json();
      return data?.rates?.USD ?? null;
    } catch (error) {
      console.error("Error tipo cambio:", error);
      return null;
    }
  },

  reporte: async () => {
    try {
      const { data } = await apiClient.get("/Finanzas/reporte");
      return data;
    } catch (error) {
      handleError(error, "Error reporte:");
    }
  },
};
