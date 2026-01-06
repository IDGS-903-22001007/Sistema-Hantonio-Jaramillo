import React, { useState, useEffect } from 'react';
import { getEstatus, createEstatus, getTiposTraje, createTipoTraje, getRecursosDiseno, createRecursoDiseno } from '../api/catalogos';

const Catalogos = () => {
  const [tab, setTab] = useState('estatus');
  const [estatus, setEstatus] = useState([]);
  const [tiposTraje, setTiposTraje] = useState([]);
  const [recursos, setRecursos] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [newRecurso, setNewRecurso] = useState({ prenda: '', tipo: '', diseno: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getEstatus(), getTiposTraje(), getRecursosDiseno()]).then(([e, t, r]) => {
      setEstatus(e.data);
      setTiposTraje(t.data);
      setRecursos(r.data);
      setLoading(false);
    });
  }, []);

  const addEstatus = async (e) => {
    e.preventDefault();
    const { data } = await createEstatus({ nombre: newItem });
    setEstatus([...estatus, data]);
    setNewItem('');
  };

  const addTipoTraje = async (e) => {
    e.preventDefault();
    const { data } = await createTipoTraje({ nombre: newItem });
    setTiposTraje([...tiposTraje, data]);
    setNewItem('');
  };

  const addRecurso = async (e) => {
    e.preventDefault();
    const { data } = await createRecursoDiseno(newRecurso);
    setRecursos([...recursos, data]);
    setNewRecurso({ prenda: '', tipo: '', diseno: '' });
  };

  const tabs = [
    { id: 'estatus', label: 'Estatus' },
    { id: 'tipos', label: 'Tipos de Traje' },
    { id: 'recursos', label: 'Recursos' },
  ];

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Catálogos</h1>

      <div className="flex gap-2 mb-6">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 rounded-lg font-medium transition-colors ${tab === t.id ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {loading ? <div className="p-8 text-center text-gray-500">Cargando...</div> : (
        <div className="grid md:grid-cols-3 gap-6">
          {tab === 'estatus' && (
            <>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-bold mb-4">Nuevo Estatus</h2>
                <form onSubmit={addEstatus} className="space-y-4">
                  <input value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Nombre" className="w-full p-3 border rounded-lg" required />
                  <button className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Agregar</button>
                </form>
              </div>
              <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-bold mb-4">Lista de Estatus ({estatus.length})</h2>
                <div className="space-y-2">{estatus.map((e, i) => <div key={i} className="p-3 bg-gray-50 rounded-lg">{e.nombre}</div>)}</div>
              </div>
            </>
          )}
          {tab === 'tipos' && (
            <>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-bold mb-4">Nuevo Tipo de Traje</h2>
                <form onSubmit={addTipoTraje} className="space-y-4">
                  <input value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Nombre" className="w-full p-3 border rounded-lg" required />
                  <button className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Agregar</button>
                </form>
              </div>
              <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-bold mb-4">Tipos de Traje ({tiposTraje.length})</h2>
                <div className="space-y-2">{tiposTraje.map((t, i) => <div key={i} className="p-3 bg-gray-50 rounded-lg">{t.nombre}</div>)}</div>
              </div>
            </>
          )}
          {tab === 'recursos' && (
            <>
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-bold mb-4">Nuevo Recurso</h2>
                <form onSubmit={addRecurso} className="space-y-4">
                  <input value={newRecurso.prenda} onChange={(e) => setNewRecurso({...newRecurso, prenda: e.target.value})} placeholder="Prenda" className="w-full p-3 border rounded-lg" required />
                  <input value={newRecurso.tipo} onChange={(e) => setNewRecurso({...newRecurso, tipo: e.target.value})} placeholder="Tipo" className="w-full p-3 border rounded-lg" required />
                  <input value={newRecurso.diseno} onChange={(e) => setNewRecurso({...newRecurso, diseno: e.target.value})} placeholder="Diseño" className="w-full p-3 border rounded-lg" required />
                  <button className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Agregar</button>
                </form>
              </div>
              <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6">
                <h2 className="font-bold mb-4">Recursos ({recursos.length})</h2>
                <div className="space-y-2">{recursos.map((r, i) => <div key={i} className="p-3 bg-gray-50 rounded-lg">{r.prenda} - {r.tipo}: {r.diseno}</div>)}</div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Catalogos;