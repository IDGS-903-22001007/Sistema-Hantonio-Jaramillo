import apiClient from './axiosConfig';

export const getOrdenes = () => apiClient.get('/Ordenes');
export const getOrden = (id) => apiClient.get(`/Ordenes/${id}`);
export const createOrden = (data) => apiClient.post('/Ordenes', {
  idCliente: data.clienteId ? parseInt(data.clienteId) : null,
  idUsuarioCreador: data.idUsuarioCreador || null,
  idSucursal: data.sucursalId ? parseInt(data.sucursalId) : null,
  idTipoTraje: data.idTipoTraje || null,
  idEstatus: data.idEstatus || null,
  fechaCitaMedidas: data.fecha || null,
  fechaEventoEntrega: data.fechaEventoEntrega || null,
  costoTotal: data.costoTotal || 0,
  montoAbonado: data.montoAbonado || 0,
  incluyeCamisa: data.incluyeCamisa || false
});
export const updateOrden = (id, data) => apiClient.put(`/Ordenes/${id}`, {
  idCliente: data.clienteId ? parseInt(data.clienteId) : null,
  idUsuarioCreador: data.idUsuarioCreador || null,
  idSucursal: data.sucursalId ? parseInt(data.sucursalId) : null,
  idTipoTraje: data.idTipoTraje || null,
  idEstatus: data.idEstatus || null,
  fechaCitaMedidas: data.fecha || null,
  fechaEventoEntrega: data.fechaEventoEntrega || null,
  costoTotal: data.costoTotal || 0,
  montoAbonado: data.montoAbonado || 0,
  incluyeCamisa: data.incluyeCamisa || false
});
export const deleteOrden = (id) => apiClient.delete(`/Ordenes/${id}`);
