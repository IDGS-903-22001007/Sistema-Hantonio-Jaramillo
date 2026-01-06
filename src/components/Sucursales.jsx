import React, { useState, useEffect } from 'react';
import { getSucursales, createSucursal, updateSucursal, deleteSucursal } from '../api/sucursales';

const Sucursales = () => {
  const [sucursales, setSucursales] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', direccion: '' });
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    getSucursales().then(({ data }) => { setSucursales(data); setLoading(false); });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      const { data } = await updateSucursal(editing.idSucursal, formData);
      setSucursales(sucursales.map(s => s.idSucursal === editing.idSucursal ? data : s));
    } else {
      const { data } = await createSucursal(formData);
      setSucursales([...sucursales, data]);
    }
    resetForm();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar sucursal?')) return;
    await deleteSucursal(id);
    setSucursales(sucursales.filter(s => s.idSucursal !== id));
  };

  const resetForm = () => {
    setFormData({ nombre: '', direccion: '' });
    setEditing(null);
    setShowForm(false);
  };

  const openEdit = (s) => {
    setFormData(s);
    setEditing(s);
    setShowForm(true);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sucursales</h1>
        <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">+ Nueva</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? <div className="p-8 text-center text-gray-500">Cargando...</div> : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">Nombre</th>
                <th className="text-left p-4 font-medium text-gray-600 hidden md:table-cell">Dirección</th>
                <th className="text-right p-4 font-medium text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sucursales.map((s) => (
                <tr key={s.idSucursal} className="hover:bg-gray-50">
                  <td className="p-4 font-medium">{s.nombre}</td>
                  <td className="p-4 text-gray-600 hidden md:table-cell">{s.direccion}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => openEdit(s)} className="text-indigo-600 hover:text-indigo-800 mr-3">Editar</button>
                    <button onClick={() => handleDelete(s.idSucursal)} className="text-red-600 hover:text-red-800">Eliminar</button>
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
            <h2 className="text-xl font-bold mb-4">{editing ? 'Editar' : 'Nueva'} Sucursal</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} placeholder="Nombre" className="w-full p-3 border rounded-lg" required />
              <input value={formData.direccion} onChange={(e) => setFormData({...formData, direccion: e.target.value})} placeholder="Dirección" className="w-full p-3 border rounded-lg" required />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={resetForm} className="flex-1 py-3 border rounded-lg hover:bg-gray-50">Cancelar</button>
                <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sucursales;
