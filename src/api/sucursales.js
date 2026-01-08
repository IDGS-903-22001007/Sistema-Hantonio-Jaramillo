import apiClient from './axiosConfig';

// Agregar headers para evitar caché
const noCacheHeaders = {
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
};

export const getSucursales = () => apiClient.get('/Sucursales', { headers: noCacheHeaders });

export const createSucursal = (data) => apiClient.post('/Sucursales', {
  nombre: data.nombre,
  direccion: data.direccion,
  telefono: data.telefono,
  encargado: data.encargado,
  activa: data.activa
});

export const updateSucursal = (id, data) => {
  console.log('📤 Enviando PUT a /Sucursales/' + id + ' con:', data);
  return apiClient.put(`/Sucursales/${id}`, {
    idSucursal: parseInt(id),
    nombre: data.nombre,
    direccion: data.direccion,
    telefono: data.telefono,
    encargado: data.encargado,
    activa: data.activa
  });
};

export const toggleSucursalActiva = (sucursalCompleta, activa) => {
  const payload = {
    idSucursal: parseInt(sucursalCompleta.idSucursal),
    nombre: sucursalCompleta.nombre,
    direccion: sucursalCompleta.direccion,
    telefono: sucursalCompleta.telefono || '',
    encargado: sucursalCompleta.encargado || '',
    activa: activa
  };
  
  console.log('🔄 toggleSucursalActiva - Enviando:', payload);
  
  return apiClient.put(`/Sucursales/${sucursalCompleta.idSucursal}`, payload)
    .then(response => {
      console.log('✅ Respuesta del servidor:', response.data);
      return response;
    });
};

export const deleteSucursal = (sucursalCompleta) => toggleSucursalActiva(sucursalCompleta, false);
