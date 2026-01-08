import React, { useState, useEffect } from 'react';
import { getRoles, createRol, deleteRol } from '../api/roles';
import Alert from './Alert';
import ConfirmDialog from './ConfirmDialog';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, rolId: null });

  useEffect(() => {
    getRoles().then(({ data }) => { setRoles(data); setLoading(false); });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createRol({ nombre });
      setRoles([...roles, data]);
      setNombre('');
      setAlert({ type: 'success', message: 'Rol creado correctamente' });
    } catch (err) {
      setAlert({ type: 'error', message: 'Error al crear rol' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRol(id);
      setRoles(roles.filter(r => r.idRol !== id));
      setAlert({ type: 'success', message: 'Rol eliminado correctamente' });
    } catch (err) {
      setAlert({ type: 'error', message: 'Error al eliminar rol' });
    }
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
        onClose={() => setConfirmDialog({ isOpen: false, rolId: null })}
        onConfirm={() => handleDelete(confirmDialog.rolId)}
        title="¿Eliminar rol?"
        message="Esta acción no se puede deshacer. El rol será eliminado permanentemente."
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Gestión de Roles</h1>
        <p className="text-gray-500 mt-1">Crea y administra los roles de usuario en el sistema.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Form */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold text-black mb-4">Nuevo Rol</h2>
          <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white border border-gray-200 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Rol *</label>
              <input 
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                placeholder="Ej: Editor" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black" 
                required 
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 font-semibold text-sm"
            >
              Crear Rol
            </button>
          </form>
        </div>

        {/* List */}
        <div className="md:col-span-2">
            <h2 className="text-xl font-bold text-black mb-4">Roles Registrados ({roles.length})</h2>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {loading ? (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-black"></div>
                <p className="text-gray-500 mt-4 text-sm">Cargando roles...</p>
              </div>
            ) : roles.length === 0 ? (
              <div className="p-12 text-center">
                <span className="text-5xl mb-4 block text-gray-400">🔐</span>
                <p className="text-gray-600 font-semibold text-lg mb-2">No se encontraron roles</p>
                <p className="text-gray-500 text-sm mb-4">Crea tu primer rol para verlo en la lista.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                      <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
                      <th className="p-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((r) => (
                      <tr key={r.idRol} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4">
                           <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-semibold">
                            #{r.idRol}
                          </span>
                        </td>
                        <td className="p-4 font-semibold text-sm text-black">{r.nombre}</td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => setConfirmDialog({ isOpen: true, rolId: r.idRol })} 
                            className="px-3 py-1 text-sm font-semibold text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50 transition-colors"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;
