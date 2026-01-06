import React, { useState, useEffect } from 'react';
import { getUsuarios, createUsuario, toggleUsuarioActivo } from '../api/usuarios';
import { getRoles } from '../api/roles';
import { getSucursales } from '../api/sucursales';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [formData, setFormData] = useState({ idRol: '', idSucursal: '', nombre: '', login: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [u, r, s] = await Promise.all([getUsuarios(), getRoles(), getSucursales()]);
        setUsuarios(u.data);
        setRoles(r.data);
        setSucursales(s.data);
      } catch (err) {
        setError('Error al cargar datos');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createUsuario(formData);
      setUsuarios([data, ...usuarios]);
      setFormData({ idRol: '', idSucursal: '', nombre: '', login: '', password: '' });
      setShowForm(false);
    } catch (err) {
      setError('Error al crear usuario');
    }
  };

  const toggleActivo = async (id, activo) => {
    await toggleUsuarioActivo(id, !activo);
    setUsuarios(usuarios.map(u => u.idUsuario === id ? { ...u, activo: !u.activo } : u));
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Usuarios</h1>
          <p className="text-gray-500 text-sm">{usuarios.length} registrados</p>
        </div>
        <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">+ Nuevo</button>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Cargando...</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">Usuario</th>
                <th className="text-left p-4 font-medium text-gray-600 hidden md:table-cell">Rol</th>
                <th className="text-left p-4 font-medium text-gray-600">Estado</th>
                <th className="text-right p-4 font-medium text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {usuarios.map((u) => (
                <tr key={u.idUsuario} className="hover:bg-gray-50">
                  <td className="p-4">
                    <p className="font-medium">{u.nombre}</p>
                    <p className="text-sm text-gray-500">{u.login}</p>
                  </td>
                  <td className="p-4 hidden md:table-cell">{roles.find(r => r.idRol === u.idRol)?.nombre}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.activo ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {u.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => toggleActivo(u.idUsuario, u.activo)} className="text-indigo-600 hover:text-indigo-800">
                      {u.activo ? 'Desactivar' : 'Activar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Nuevo Usuario</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} placeholder="Nombre" className="w-full p-3 border rounded-lg" required />
              <input value={formData.login} onChange={(e) => setFormData({...formData, login: e.target.value})} placeholder="Login" className="w-full p-3 border rounded-lg" required />
              <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="Contraseña" className="w-full p-3 border rounded-lg" required />
              <select value={formData.idRol} onChange={(e) => setFormData({...formData, idRol: e.target.value})} className="w-full p-3 border rounded-lg" required>
                <option value="">Seleccionar Rol</option>
                {roles.map(r => <option key={r.idRol} value={r.idRol}>{r.nombre}</option>)}
              </select>
              <select value={formData.idSucursal} onChange={(e) => setFormData({...formData, idSucursal: e.target.value})} className="w-full p-3 border rounded-lg" required>
                <option value="">Seleccionar Sucursal</option>
                {sucursales.map(s => <option key={s.idSucursal} value={s.idSucursal}>{s.nombre}</option>)}
              </select>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 border rounded-lg hover:bg-gray-50">Cancelar</button>
                <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
