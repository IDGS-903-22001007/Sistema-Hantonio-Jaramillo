import React, { useState, useEffect } from 'react';
import { getOrdenes, createOrden, updateOrden, deleteOrden } from '../api/ordenes';
import { getClientes } from '../api/clientes';
import { getSucursales } from '../api/sucursales';

const statusColors = {
  Pendiente: 'bg-yellow-100 text-yellow-700',
  Completada: 'bg-green-100 text-green-700',
  Cancelada: 'bg-red-100 text-red-700',
};

const Ordenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [formData, setFormData] = useState({ idCliente: '', idSucursal: '', fecha: new Date().toISOString().slice(0, 10), estado: 'Pendiente' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingOrden, setEditingOrden] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [o, c, s] = await Promise.all([getOrdenes(), getClientes(), getSucursales()]);
        setOrdenes(o.data);
        setClientes(c.data);
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
    setIsSubmitting(true);
    try {
      if (editingOrden) {
        const { data } = await updateOrden(editingOrden.idOrden, formData);
        setOrdenes(ordenes.map(o => o.idOrden === editingOrden.idOrden ? { ...data, cliente: clientes.find(c => c.idCliente == data.idCliente), sucursal: sucursales.find(s => s.idSucursal == data.idSucursal) } : o));
      } else {
        const { data } = await createOrden(formData);
        setOrdenes([{ ...data, cliente: clientes.find(c => c.idCliente == data.idCliente), sucursal: sucursales.find(s => s.idSucursal == data.idSucursal) }, ...ordenes]);
      }
      resetForm();
    } catch (err) {
      setError('Error al guardar');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar orden?')) return;
    await deleteOrden(id);
    setOrdenes(ordenes.filter(o => o.idOrden !== id));
  };

  const resetForm = () => {
    setFormData({ idCliente: '', idSucursal: '', fecha: new Date().toISOString().slice(0, 10), estado: 'Pendiente' });
    setEditingOrden(null);
    setShowForm(false);
  };

  const openEdit = (orden) => {
    setFormData({ ...orden, fecha: new Date(orden.fecha).toISOString().slice(0, 10) });
    setEditingOrden(orden);
    setShowForm(true);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Órdenes</h1>
          <p className="text-gray-500 text-sm">{ordenes.length} registradas</p>
        </div>
        <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">+ Nueva</button>
      </div>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Cargando...</div>
        ) : ordenes.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No hay órdenes</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4 font-medium text-gray-600">#</th>
                <th className="text-left p-4 font-medium text-gray-600">Cliente</th>
                <th className="text-left p-4 font-medium text-gray-600 hidden md:table-cell">Sucursal</th>
                <th className="text-left p-4 font-medium text-gray-600 hidden lg:table-cell">Fecha</th>
                <th className="text-left p-4 font-medium text-gray-600">Estado</th>
                <th className="text-right p-4 font-medium text-gray-600">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {ordenes.map((o) => (
                <tr key={o.idOrden} className="hover:bg-gray-50">
                  <td className="p-4 font-medium">{o.idOrden}</td>
                  <td className="p-4">{o.cliente?.nombreCompleto}</td>
                  <td className="p-4 hidden md:table-cell">{o.sucursal?.nombre}</td>
                  <td className="p-4 hidden lg:table-cell">{new Date(o.fecha).toLocaleDateString()}</td>
                  <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[o.estado]}`}>{o.estado}</span></td>
                  <td className="p-4 text-right">
                    <button onClick={() => openEdit(o)} className="text-indigo-600 hover:text-indigo-800 mr-3">Editar</button>
                    <button onClick={() => handleDelete(o.idOrden)} className="text-red-600 hover:text-red-800">Eliminar</button>
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
            <h2 className="text-xl font-bold mb-4">{editingOrden ? 'Editar' : 'Nueva'} Orden</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <select value={formData.idCliente} onChange={(e) => setFormData({...formData, idCliente: e.target.value})} className="w-full p-3 border rounded-lg" required>
                <option value="">Seleccionar Cliente</option>
                {clientes.map(c => <option key={c.idCliente} value={c.idCliente}>{c.nombreCompleto}</option>)}
              </select>
              <select value={formData.idSucursal} onChange={(e) => setFormData({...formData, idSucursal: e.target.value})} className="w-full p-3 border rounded-lg" required>
                <option value="">Seleccionar Sucursal</option>
                {sucursales.map(s => <option key={s.idSucursal} value={s.idSucursal}>{s.nombre}</option>)}
              </select>
              <input type="date" value={formData.fecha} onChange={(e) => setFormData({...formData, fecha: e.target.value})} className="w-full p-3 border rounded-lg" required />
              <select value={formData.estado} onChange={(e) => setFormData({...formData, estado: e.target.value})} className="w-full p-3 border rounded-lg">
                <option>Pendiente</option>
                <option>Completada</option>
                <option>Cancelada</option>
              </select>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={resetForm} className="flex-1 py-3 border rounded-lg hover:bg-gray-50">Cancelar</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50">{isSubmitting ? 'Guardando...' : 'Guardar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ordenes;
