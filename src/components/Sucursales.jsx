import React, { useState, useEffect } from 'react';
import { getSucursales, createSucursal, updateSucursal, deleteSucursal, toggleSucursalActiva } from '../api/sucursales';
import Alert from './Alert';
import ConfirmDialog from './ConfirmDialog';

const Sucursales = () => {
  const [sucursales, setSucursales] = useState([]);
  const [formData, setFormData] = useState({ 
    nombre: '', 
    direccion: '',
    telefono: '',
    encargado: '',
    activa: true
  });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedSucursal, setSelectedSucursal] = useState(null);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, sucursalId: null });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchSucursales();
    // Verificar si el usuario es admin
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setIsAdmin(user.rol === 'ADMIN');
  }, []);

  const clearApiCache = async () => {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(name => name.includes('api-cache') || name.includes('workbox'))
          .map(name => caches.delete(name))
      );
      console.log('✅ Caché limpiado');
    }
  };

  const fetchSucursales = async () => {
    try {
      // Agregar timestamp para forzar nueva petición
      const timestamp = new Date().getTime();
      const { data } = await getSucursales();
      setSucursales(data);
      console.log('📦 Sucursales cargadas:', data);
    } catch (err) {
      setError('Error al cargar sucursales');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (editing) {
        await updateSucursal(editing.idSucursal, {
          nombre: formData.nombre.trim(),
          direccion: formData.direccion.trim(),
          telefono: formData.telefono.trim(),
          encargado: formData.encargado.trim(),
          activa: formData.activa
        });
        
        // Invalidar caché del Service Worker
        if ('caches' in window) {
          caches.keys().then(names => {
            names.forEach(name => {
              if (name.includes('api-cache')) {
                caches.delete(name);
              }
            });
          });
        }
        
        // Recargar con delay para asegurar que el caché se limpió
        setTimeout(async () => {
          await fetchSucursales();
        }, 100);
        
        setShowDetails(false);
        setSelectedSucursal(null);
        setAlert({ type: 'success', message: 'Sucursal actualizada correctamente' });
      } else {
        const { data } = await createSucursal({
          nombre: formData.nombre.trim(),
          direccion: formData.direccion.trim(),
          telefono: formData.telefono.trim(),
          encargado: formData.encargado.trim(),
          activa: formData.activa
        });
        setSucursales([...sucursales, data]);
        setAlert({ type: 'success', message: 'Sucursal creada correctamente' });
      }
      resetForm();
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      
      if (err.response?.status === 403 || err.isForbidden) {
        setAlert({ 
          type: 'error', 
          message: 'Solo los administradores pueden modificar sucursales.' 
        });
      } else {
        setAlert({ type: 'error', message: 'Error al guardar sucursal' });
      }
      
      setError(err.message || 'Error al guardar sucursal');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActiva = async (id, currentState) => {
    try {
      const sucursal = sucursales.find(s => s.idSucursal === id);
      if (!sucursal) {
        setAlert({ type: 'error', message: 'Sucursal no encontrada' });
        return;
      }
      
      await toggleSucursalActiva(sucursal, !currentState);
      
      // Limpiar caché ANTES de recargar
      await clearApiCache();
      
      // Pequeño delay para asegurar limpieza
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Recargar lista
      await fetchSucursales();
      
      setAlert({ 
        type: 'success', 
        message: `Sucursal ${!currentState ? 'activada' : 'desactivada'} correctamente` 
      });
    } catch (err) {
      console.error('Error al cambiar estado:', err);
      setAlert({ type: 'error', message: 'Error al cambiar estado de la sucursal' });
    }
  };

  const handleDelete = async (id) => {
    try {
      const sucursal = sucursales.find(s => s.idSucursal === id);
      if (!sucursal) {
        setAlert({ type: 'error', message: 'Sucursal no encontrada' });
        return;
      }
      
      await deleteSucursal(sucursal);
      
      // Limpiar caché ANTES de recargar
      await clearApiCache();
      
      await new Promise(resolve => setTimeout(resolve, 200));
      
      await fetchSucursales();
      
      if (showDetails && selectedSucursal?.idSucursal === id) {
        setShowDetails(false);
        setSelectedSucursal(null);
      }
      
      setAlert({ type: 'success', message: 'Sucursal desactivada correctamente' });
    } catch (err) {
      console.error('Error al desactivar:', err);
      setAlert({ type: 'error', message: 'Error al desactivar sucursal' });
    }
  };

  const resetForm = () => {
    setFormData({ nombre: '', direccion: '', telefono: '', encargado: '', activa: true });
    setEditing(null);
    setShowForm(false);
  };

  const openEdit = (s) => {
    setFormData({ 
      nombre: s.nombre, 
      direccion: s.direccion,
      telefono: s.telefono || '',
      encargado: s.encargado || '',
      activa: s.activa !== undefined ? s.activa : true
    });
    setEditing(s);
    setShowDetails(false);
    setShowForm(true);
  };

  const openDetails = (s) => {
    setSelectedSucursal(s);
    setShowDetails(true);
  };

  return (
    <div className="p-6 lg:p-8">
      <Alert 
        type={alert.type} 
        message={alert.message} 
        onClose={() => setAlert({ type: '', message: '' })}
      />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, sucursalId: null })}
        onConfirm={() => handleDelete(confirmDialog.sucursalId)}
        title="¿Desactivar esta sucursal?"
        message="La sucursal será marcada como inactiva pero no se eliminará del sistema."
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">Sucursales</h1>
          <p className="text-gray-500 mt-1">
            Administra las <span className="font-semibold text-black">{sucursales.length}</span> sucursales de tu negocio.
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="px-5 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all text-sm"
        >
          + Nueva Sucursal
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-800 border border-red-200 rounded-lg">
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Tabla */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-black"></div>
            <p className="text-gray-500 mt-4 text-sm">Cargando sucursales...</p>
          </div>
        ) : sucursales.length === 0 ? (
          <div className="p-12 text-center">
            <span className="text-5xl mb-4 block text-gray-400">🏢</span>
            <p className="text-gray-600 font-semibold text-lg mb-2">No se encontraron sucursales</p>
            <p className="text-gray-500 text-sm mb-4">Añade tu primera sucursal para verla en la lista.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sucursal</th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Teléfono</th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">Encargado</th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                  <th className="p-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {sucursales.map((s) => (
                  <tr key={s.idSucursal} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold text-lg">
                          🏢
                        </div>
                        <div>
                          <p className="font-semibold text-black text-sm">{s.nombre}</p>
                          <p className="text-xs text-gray-500 md:hidden">{s.direccion}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600 hidden md:table-cell">{s.telefono || '-'}</td>
                    <td className="p-4 text-sm text-gray-600 hidden lg:table-cell">{s.encargado || '-'}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${s.activa ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.activa ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        {s.activa ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => openDetails(s)} 
                        className="px-3 py-1 text-sm font-semibold text-blue-600 bg-white border border-blue-300 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        Detalles
                      </button>
                      
                      {isAdmin && (
                        <>
                          <button 
                            onClick={() => openEdit(s)} 
                            className="px-3 py-1 text-sm font-semibold text-amber-600 bg-white border border-amber-300 rounded-md hover:bg-amber-50 transition-colors"
                          >
                            Editar
                          </button>
                          <button 
                            onClick={() => handleToggleActiva(s.idSucursal, s.activa)} 
                            className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${
                              s.activa 
                                ? 'text-red-600 bg-white border border-red-300 hover:bg-red-50' 
                                : 'text-green-600 bg-white border border-green-300 hover:bg-green-50'
                            }`}
                          >
                            {s.activa ? 'Desactivar' : 'Activar'}
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal - Formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl w-full max-w-2xl shadow-xl animate-slideUp max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-black">{editing ? 'Editar Sucursal' : 'Nueva Sucursal'}</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                  <input 
                    type="text"
                    value={formData.nombre} 
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none text-black bg-white placeholder-gray-400" 
                    placeholder="Nombre de la sucursal"
                    required 
                    disabled={submitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección *</label>
                  <textarea 
                    value={formData.direccion} 
                    onChange={(e) => setFormData({...formData, direccion: e.target.value})} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none text-black bg-white placeholder-gray-400 resize-none"
                    placeholder="Dirección completa"
                    rows="3"
                    required 
                    disabled={submitting}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input 
                      type="tel"
                      value={formData.telefono} 
                      onChange={(e) => setFormData({...formData, telefono: e.target.value})} 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none text-black bg-white placeholder-gray-400" 
                      placeholder="+1 (555) 000-0000"
                      disabled={submitting}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Encargado</label>
                    <input 
                      type="text"
                      value={formData.encargado} 
                      onChange={(e) => setFormData({...formData, encargado: e.target.value})} 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none text-black bg-white placeholder-gray-400" 
                      placeholder="Nombre del encargado"
                      disabled={submitting}
                    />
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={formData.activa}
                      onChange={(e) => setFormData({...formData, activa: e.target.checked})}
                      disabled={submitting}
                      className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                    />
                    <span className="text-sm font-medium text-gray-700">Sucursal Activa</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 justify-end p-4 bg-gray-50 border-t border-gray-200 rounded-b-xl sticky bottom-0">
                <button type="button" onClick={resetForm} disabled={submitting} className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-100 font-semibold text-sm transition-colors disabled:opacity-50">Cancelar</button>
                <button type="submit" disabled={submitting} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-semibold text-sm transition-all disabled:opacity-50">
                  {submitting ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal - Detalles */}
      {showDetails && selectedSucursal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl animate-slideUp">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-black">Detalles de Sucursal</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                <p className="text-black font-semibold">{selectedSucursal.nombre}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <p className="text-black whitespace-pre-wrap">{selectedSucursal.direccion}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <p className="text-black font-semibold">{selectedSucursal.telefono || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Encargado</label>
                  <p className="text-black font-semibold">{selectedSucursal.encargado || '-'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border ${selectedSucursal.activa ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${selectedSucursal.activa ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    {selectedSucursal.activa ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end p-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
              <button 
                type="button" 
                onClick={() => setShowDetails(false)} 
                className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-100 font-semibold text-sm transition-colors"
              >
                Cerrar
              </button>
              
              {isAdmin && (
                <>
                  <button 
                    type="button" 
                    onClick={() => {
                      openEdit(selectedSucursal);
                      setShowDetails(false);
                    }} 
                    className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-semibold text-sm transition-all"
                  >
                    Editar
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setConfirmDialog({ isOpen: true, sucursalId: selectedSucursal.idSucursal });
                      setShowDetails(false);
                    }} 
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold text-sm transition-all"
                  >
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sucursales;


