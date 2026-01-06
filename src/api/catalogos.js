import apiClient from './axiosConfig';

// Estatus
export const getEstatus = () => apiClient.get('/Catalogos/estatus');
export const createEstatus = (data) => apiClient.post('/Catalogos/estatus', {
  descripcion: data.nombre || data.descripcion
});

// Tipos de Traje
export const getTiposTraje = () => apiClient.get('/Catalogos/tipos-traje');
export const createTipoTraje = (data) => apiClient.post('/Catalogos/tipos-traje', {
  descripcion: data.nombre || data.descripcion
});

// Recursos de Diseño
export const getRecursosDiseno = () => apiClient.get('/Catalogos/recursos-diseno');
export const getRecursosDisenoByPrenda = (prenda) => apiClient.get(`/Catalogos/recursos-diseno/${prenda}`);
export const createRecursoDiseno = (data) => apiClient.post('/Catalogos/recursos-diseno', {
  prenda: data.prenda,
  atributo: data.tipo || data.atributo,
  codigoValor: data.diseno || data.codigoValor,
  nombreMostrar: data.nombreMostrar || data.diseno || null,
  urlImagen: data.urlImagen || null
});
