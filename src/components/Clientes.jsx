import React, { useState, useEffect } from 'react';
import { getClientes, createCliente, updateCliente, deleteCliente, toggleClienteActivo } from '../api/clientes';
import Alert from './Alert';
import ConfirmDialog from './ConfirmDialog';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({ nombreCompleto: '', telefono: '', email: '', ciudad: '', estado: '', activo: true });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, clienteId: null });

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const { data } = await getClientes();
      setClientes(data);
    } catch (err) {
      setError('Error al cargar clientes');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingCliente) {
        await updateCliente(editingCliente.idCliente, formData);
        await fetchClientes(); // Recargar la lista completa
        setAlert({ type: 'success', message: 'Cliente actualizado correctamente' });
      } else {
        const { data } = await createCliente(formData);
        setClientes([data, ...clientes]);
        setAlert({ type: 'success', message: 'Cliente creado correctamente' });
      }
      resetForm();
    } catch (err) {
      setAlert({ type: 'error', message: 'Error al guardar cliente' });
      setError('Error al guardar');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCliente(id);
      setClientes(clientes.filter(c => c.idCliente !== id));
      setAlert({ type: 'success', message: 'Cliente eliminado correctamente' });
    } catch (err) {
      setAlert({ type: 'error', message: 'Error al eliminar cliente' });
      setError('Error al eliminar');
    }
  };

  const handleToggleActivo = async (id, activo) => {
    try {
      await toggleClienteActivo(id, !activo);
      // Recargar la lista después de cambiar estado
      await fetchClientes();
      setAlert({ type: 'success', message: `Cliente ${!activo ? 'activado' : 'desactivado'} correctamente` });
    } catch (err) {
      console.error('Error al cambiar estado:', err);
      setAlert({ type: 'error', message: 'Error al cambiar estado del cliente' });
    }
  };

  const resetForm = () => {
    setFormData({ nombreCompleto: '', telefono: '', email: '', ciudad: '', estado: '', activo: true });
    setEditingCliente(null);
    setShowForm(false);
  };

  const openEdit = (cliente) => {
    setFormData({
      nombreCompleto: cliente.nombreCompleto || '',
      telefono: cliente.telefono || '',
      email: cliente.email || '',
      ciudad: cliente.ciudad || '',
      estado: cliente.estado || '',
      activo: cliente.activo !== undefined ? cliente.activo : true
    });
    setEditingCliente(cliente);
    setShowForm(true);
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
        onClose={() => setConfirmDialog({ isOpen: false, clienteId: null })}
        onConfirm={() => handleDelete(confirmDialog.clienteId)}
        title="¿Eliminar cliente?"
        message="Esta acción no se puede deshacer. El cliente será eliminado permanentemente del sistema."
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">Clientes</h1>
          <p className="text-gray-500 mt-1">
            Gestiona tu lista de <span className="font-semibold text-black">{clientes.length}</span> clientes.
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="px-5 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all text-sm"
        >
          + Nuevo Cliente
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-800 border border-red-200 rounded-lg">
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-black"></div>
            <p className="text-gray-500 mt-4 text-sm">Cargando clientes...</p>
          </div>
        ) : clientes.length === 0 ? (
          <div className="p-12 text-center">
            <span className="text-5xl mb-4 block text-gray-400">👥</span>
            <p className="text-gray-600 font-semibold text-lg mb-2">No se encontraron clientes</p>
            <p className="text-gray-500 text-sm mb-4">Empieza por añadir tu primer cliente para verlo en la lista.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Cliente</th>
                  <th className="text-left p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Contacto</th>
                  <th className="text-left p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">Ubicación</th>
                  <th className="text-left p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                  <th className="text-right p-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clientes.map((c) => (
                  <tr key={c.idCliente} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                          {c.nombreCompleto?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-black text-sm">{c.nombreCompleto}</p>
                          <p className="text-xs text-gray-500 md:hidden">{c.telefono || '-'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <p className="text-sm text-black">{c.email || '-'}</p>
                      <p className="text-xs text-gray-500">{c.telefono || '-'}</p>
                    </td>
                    <td className="p-4 text-sm text-gray-600 hidden lg:table-cell">
                      {c.ciudad && c.estado ? `${c.ciudad}, ${c.estado}` : '-'}
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${c.activo ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${c.activo ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        {c.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => openEdit(c)} 
                        className="px-3 py-1 text-sm font-semibold text-amber-600 bg-white border border-amber-300 rounded-md hover:bg-amber-50 transition-colors"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleToggleActivo(c.idCliente, c.activo)} 
                        className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${
                          c.activo 
                            ? 'text-red-600 bg-white border border-red-300 hover:bg-red-50' 
                            : 'text-green-600 bg-white border border-green-300 hover:bg-green-50'
                        }`}
                      >
                        {c.activo ? 'Desactivar' : 'Activar'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl animate-slideUp">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-black">
                {editingCliente ? 'Editar Cliente' : 'Nuevo Cliente'}
              </h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo *</label>
                  <input 
                    value={formData.nombreCompleto} 
                    onChange={(e) => setFormData({...formData, nombreCompleto: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all text-black bg-white placeholder-gray-400" 
                    placeholder="Ej. Juan Pérez"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email"
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all text-black bg-white placeholder-gray-400" 
                    placeholder="ejemplo@correo.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input 
                    value={formData.telefono} 
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all text-black bg-white placeholder-gray-400" 
                    placeholder="555-1234"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                    <input 
                      value={formData.ciudad} 
                      onChange={(e) => setFormData({...formData, ciudad: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all text-black bg-white placeholder-gray-400" 
                      placeholder="Ciudad"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                    <input 
                      value={formData.estado} 
                      onChange={(e) => setFormData({...formData, estado: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all text-black bg-white placeholder-gray-400" 
                      placeholder="Estado"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-end p-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
                <button type="button" onClick={resetForm} className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-100 font-semibold text-sm transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 font-semibold text-sm transition-all">
                  {isSubmitting ? 'Guardando...' : 'Guardar Cliente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;
