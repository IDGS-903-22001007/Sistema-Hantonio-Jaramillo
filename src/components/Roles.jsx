import React, { useState, useEffect } from 'react';
import { getRoles, createRol, deleteRol } from '../api/roles';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRoles().then(({ data }) => { setRoles(data); setLoading(false); });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await createRol({ nombre });
    setRoles([...roles, data]);
    setNombre('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar rol?')) return;
    await deleteRol(id);
    setRoles(roles.filter(r => r.idRol !== id));
  };

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Roles</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-bold mb-4">Nuevo Rol</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre del rol" className="w-full p-3 border rounded-lg" required />
            <button className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Crear</button>
          </form>
        </div>

        <div className="md:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? <div className="p-8 text-center text-gray-500">Cargando...</div> : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-600">ID</th>
                  <th className="text-left p-4 font-medium text-gray-600">Nombre</th>
                  <th className="text-right p-4 font-medium text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {roles.map((r) => (
                  <tr key={r.idRol} className="hover:bg-gray-50">
                    <td className="p-4">{r.idRol}</td>
                    <td className="p-4 font-medium">{r.nombre}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDelete(r.idRol)} className="text-red-600 hover:text-red-800">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roles;
