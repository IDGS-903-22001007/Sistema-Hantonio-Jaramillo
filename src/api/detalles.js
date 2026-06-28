import apiClient from "./axiosConfig";

export const detallesService = {
  // --- SACO ---
  obtenerSacoPorOrden: (idOrden) =>
    apiClient.get(`/DetalleSaco/orden/${idOrden}`),
  actualizarSaco: (id, datos) => apiClient.put(`/DetalleSaco/${id}`, datos),

  // --- PANTALÓN ---
  obtenerPantalonPorOrden: (idOrden) =>
    apiClient.get(`/DetallePantalon/orden/${idOrden}`),
  actualizarPantalon: (id, datos) =>
    apiClient.put(`/DetallePantalon/${id}`, datos),

  // --- CHALECO ---
  obtenerChalecoPorOrden: (idOrden) =>
    apiClient.get(`/DetalleChaleco/orden/${idOrden}`),
  actualizarChaleco: (id, datos) =>
    apiClient.put(`/DetalleChaleco/${id}`, datos),

  // --- CAMISA ---
  obtenerCamisaPorOrden: (idOrden) =>
    apiClient.get(`/DetalleCamisa/orden/${idOrden}`),
  actualizarCamisa: (id, datos) => apiClient.put(`/DetalleCamisa/${id}`, datos),

  obtenerZapatoPorOrden: (idOrden) =>
    apiClient.get(`/DetalleZapato/orden/${idOrden}`),
  actualizarZapato: (id, datos) => apiClient.put(`/DetalleZapato/${id}`, datos),
};
