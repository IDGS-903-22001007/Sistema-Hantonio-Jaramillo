import React, { useState, useEffect } from 'react';
import { getEstatus, createEstatus, getTiposTraje, createTipoTraje, getRecursosDiseno, createRecursoDiseno } from '../api/catalogos';
import Alert from './Alert';

const Catalogos = () => {
  const [tab, setTab] = useState('estatus');
  const [estatus, setEstatus] = useState([]);
  const [tiposTraje, setTiposTraje] = useState([]);
  const [recursos, setRecursos] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [newRecurso, setNewRecurso] = useState({ prenda: '', tipo: '', diseno: '' });
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [e, t, r] = await Promise.all([getEstatus(), getTiposTraje(), getRecursosDiseno()]);
      setEstatus(e.data || []);
      setTiposTraje(t.data || []);
      setRecursos(r.data || []);
    } catch (err) {
      console.error('Error cargando catálogos');
    } finally {
      setLoading(false);
    }
  };

  const addEstatus = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    try {
      const { data } = await createEstatus({ nombre: newItem });
      setEstatus([...estatus, data]);
      setNewItem('');
      setAlert({ type: 'success', message: 'Estatus creado correctamente' });
    } catch (err) {
      setAlert({ type: 'error', message: 'Error al crear estatus' });
    }
  };

  const addTipoTraje = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    try {
      const { data } = await createTipoTraje({ nombre: newItem });
      setTiposTraje([...tiposTraje, data]);
      setNewItem('');
      setAlert({ type: 'success', message: 'Tipo de traje creado correctamente' });
    } catch (err) {
      setAlert({ type: 'error', message: 'Error al crear tipo de traje' });
    }
  };

  const addRecurso = async (e) => {
    e.preventDefault();
    if (!newRecurso.prenda.trim() || !newRecurso.tipo.trim() || !newRecurso.diseno.trim()) return;
    try {
      const { data } = await createRecursoDiseno(newRecurso);
      setRecursos([...recursos, data]);
      setNewRecurso({ prenda: '', tipo: '', diseno: '' });
      setAlert({ type: 'success', message: 'Recurso de diseño creado correctamente' });
    } catch (err) {
      setAlert({ type: 'error', message: 'Error al crear recurso' });
    }
  };

  const tabs = [
    { id: 'estatus', label: 'Estatus', icon: '📌' },
    { id: 'tipos', label: 'Tipos de Traje', icon: '👔' },
    { id: 'recursos', label: 'Recursos de Diseño', icon: '✂️' },
  ];

  const renderContent = () => {
    if (loading) {
      return (
        <div className="p-12 text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-black"></div>
          <p className="text-gray-500 mt-4 text-sm">Cargando catálogos...</p>
        </div>
      );
    }

    switch (tab) {
      case 'estatus':
        return (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-xl font-bold text-black mb-4">Nuevo Estatus</h2>
              <form onSubmit={addEstatus} className="space-y-4 p-6 bg-white border border-gray-200 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Ej: En proceso" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black" required />
                </div>
                <button className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 font-semibold text-sm">Agregar Estatus</button>
              </form>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold text-black mb-4">Lista de Estatus ({estatus.length})</h2>
              <div className="space-y-3">
                {estatus.map((e, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                    <span className="font-semibold text-black">{e.nombre}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'tipos':
        return (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-xl font-bold text-black mb-4">Nuevo Tipo de Traje</h2>
              <form onSubmit={addTipoTraje} className="space-y-4 p-6 bg-white border border-gray-200 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Ej: Traje de Gala" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black" required />
                </div>
                <button className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 font-semibold text-sm">Agregar Tipo</button>
              </form>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold text-black mb-4">Tipos de Traje ({tiposTraje.length})</h2>
              <div className="space-y-3">
                {tiposTraje.map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                    <span className="font-semibold text-black">{t.nombre}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'recursos':
        return (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <h2 className="text-xl font-bold text-black mb-4">Nuevo Recurso</h2>
              <form onSubmit={addRecurso} className="space-y-4 p-6 bg-white border border-gray-200 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prenda</label>
                  <input value={newRecurso.prenda} onChange={(e) => setNewRecurso({...newRecurso, prenda: e.target.value})} placeholder="Ej: Camisa" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                  <input value={newRecurso.tipo} onChange={(e) => setNewRecurso({...newRecurso, tipo: e.target.value})} placeholder="Ej: Tela" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Diseño</label>
                  <input value={newRecurso.diseno} onChange={(e) => setNewRecurso({...newRecurso, diseno: e.target.value})} placeholder="Ej: Lino Blanco" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black" required />
                </div>
                <button className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 font-semibold text-sm">Agregar Recurso</button>
              </form>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold text-black mb-4">Recursos de Diseño ({recursos.length})</h2>
              <div className="space-y-3">
                {recursos.map((r, i) => (
                  <div key={i} className="p-4 bg-white border border-gray-200 rounded-lg">
                    <p className="font-semibold text-black">{r.prenda}</p>
                    <p className="text-sm text-gray-600">Tipo: <span className="font-medium text-black">{r.tipo}</span></p>
                    <p className="text-sm text-gray-600">Diseño: <span className="font-medium text-black">{r.diseno}</span></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <Alert 
        type={alert.type} 
        message={alert.message} 
        onClose={() => setAlert({ type: '', message: '' })}
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">Catálogos del Sistema</h1>
        <p className="text-gray-500 mt-1">Administra las opciones y recursos disponibles en el sistema.</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex gap-6 -mb-px">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 py-3 px-1 font-semibold text-sm transition-all ${tab === t.id ? 'text-black border-b-2 border-black' : 'text-gray-500 hover:text-black'}`}>
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default Catalogos;