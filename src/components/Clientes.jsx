import React, { useState, useEffect } from 'react';
import { getClientes, createCliente, updateCliente, deleteCliente } from '../api/clientes';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({ nombreCompleto: '', telefono: '', email: '', ciudad: '', estado: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
        const { data } = await updateCliente(editingCliente.idCliente, formData);
        setClientes(clientes.map(c => c.idCliente === editingCliente.idCliente ? data : c));
      } else {
        const { data } = await createCliente(formData);
        setClientes([data, ...clientes]);
      }
      resetForm();
    } catch (err) {
      setError('Error al guardar');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar cliente?')) return;
    try {
      await deleteCliente(id);
      setClientes(clientes.filter(c => c.idCliente !== id));
    } catch (err) {
      setError('Error al eliminar');
    }
  };

  const resetForm = () => {
    setFormData({ nombreCompleto: '', telefono: '', email: '', ciudad: '', estado: '' });
    setEditingCliente(null);
    setShowForm(false);
  };

  const openEdit = (cliente) => {
    setFormData({
      nombreCompleto: cliente.nombreCompleto || '',
      telefono: cliente.telefono || '',
      email: cliente.email || '',
      ciudad: cliente.ciudad || '',
      estado: cliente.estado || ''
    });
    setEditingCliente(cliente);
    setShowForm(true);
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
          <p className="text-gray-500 text-sm">{clientes.length} registrados</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          + Nuevo
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>
      )}

      {/* Lista */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Cargando...</div>
        ) : clientes.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No hay clientes</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">Nombre</th>
                <th className="text-left p-4 font-medium text-gray-600 hidden md:table-cell">Email</th>
                <th className="text-left p-4 font-medium text-gray-600 hidden lg:table-cell">Teléfono</th>
                <th className="text-right p-4 font-medium text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {clientes.map((c) => (
                <tr key={c.idCliente} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-medium">
                        {c.nombreCompleto?.charAt(0)?.toUpperCase()}
                      </div>
                      <p className="font-medium text-gray-800">
                        {c.nombreCompleto}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 hidden md:table-cell">{c.email || '-'}</td>
                  <td className="p-4 text-gray-600 hidden lg:table-cell">{c.telefono || '-'}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => openEdit(c)} className="text-indigo-600 hover:text-indigo-800 mr-3">Editar</button>
                    <button onClick={() => handleDelete(c.idCliente)} className="text-red-600 hover:text-red-800">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">{editingCliente ? 'Editar' : 'Nuevo'} Cliente</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                value={formData.nombreCompleto} 
                onChange={(e) => setFormData({...formData, nombreCompleto: e.target.value})} 
                placeholder="Nombre Completo" 
                className="w-full p-3 border rounded-lg" 
                required 
              />
              <input 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                placeholder="Email" 
                className="w-full p-3 border rounded-lg" 
              />
              <input 
                value={formData.telefono} 
                onChange={(e) => setFormData({...formData, telefono: e.target.value})} 
                placeholder="Teléfono" 
                className="w-full p-3 border rounded-lg" 
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  value={formData.ciudad} 
                  onChange={(e) => setFormData({...formData, ciudad: e.target.value})} 
                  placeholder="Ciudad" 
                  className="p-3 border rounded-lg" 
                />
                <input 
                  value={formData.estado} 
                  onChange={(e) => setFormData({...formData, estado: e.target.value})} 
                  placeholder="Estado" 
                  className="p-3 border rounded-lg" 
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={resetForm} className="flex-1 py-3 border rounded-lg hover:bg-gray-50">Cancelar</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50">
                  {isSubmitting ? 'Guardando...' : 'Guardar'}
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
