import apiClient from './axiosConfig';

export const getClientes = () => apiClient.get('/Clientes');
export const getCliente = (id) => apiClient.get(`/Clientes/${id}`);
export const createCliente = (data) => apiClient.post('/Clientes', {
  nombreCompleto: data.nombreCompleto || `${data.nombre || ''} ${data.apellido || ''}`.trim(),
  telefono: data.telefono || null,
  email: data.email || null,
  ciudad: data.ciudad || null,
  estado: data.estado || null,
  activo: data.activo !== undefined ? data.activo : true
});
export const updateCliente = (id, data) => apiClient.put(`/Clientes/${id}`, {
  idCliente: parseInt(id),
  nombreCompleto: data.nombreCompleto || `${data.nombre || ''} ${data.apellido || ''}`.trim(),
  telefono: data.telefono || null,
  email: data.email || null,
  ciudad: data.ciudad || null,
  estado: data.estado || null,
  activo: data.activo !== undefined ? data.activo : true
});
export const deleteCliente = (id) => apiClient.delete(`/Clientes/${id}`);
export const toggleClienteActivo = async (id, nuevoEstado) => {
  console.log('Token:', localStorage.getItem('token')); // ← Ver si hay token
  console.log('Obteniendo cliente:', id);
  
  const response = await getCliente(id);
  console.log('Cliente obtenido:', response.data); // ← Ver qué devuelve
  
  const cliente = response.data;
  
  return apiClient.put(`/Clientes/${id}`, {
    idCliente: cliente.idCliente,
    nombreCompleto: cliente.nombreCompleto,
    telefono: cliente.telefono,
    email: cliente.email,
    ciudad: cliente.ciudad,
    estado: cliente.estado,
    activo: nuevoEstado
  });
};