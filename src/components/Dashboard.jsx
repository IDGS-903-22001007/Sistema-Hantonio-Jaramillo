import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getClientes } from '../api/clientes';
import { getOrdenes } from '../api/ordenes';
import { getUsuarios } from '../api/usuarios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [stats, setStats] = useState({ clientes: 0, ordenes: 0, usuarios: 0, pendientes: 0 });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [clientesRes, ordenesRes, usuariosRes] = await Promise.all([
          getClientes(),
          getOrdenes(),
          getUsuarios()
        ]);
        
        const pendientes = ordenesRes.data.filter(o => o.estado === 'Pendiente').length;
        
        setStats({
          clientes: clientesRes.data.length,
          ordenes: ordenesRes.data.length,
          usuarios: usuariosRes.data.length,
          pendientes
        });
      } catch (err) {
        console.error('Error cargando estadísticas');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { to: '/clientes', title: 'Clientes', icon: '👥', count: stats.clientes, color: 'from-blue-600 to-blue-800', iconBg: 'bg-blue-100', textColor: 'text-blue-600' },
    { to: '/ordenes', title: 'Órdenes', icon: '📋', count: stats.ordenes, color: 'from-green-600 to-green-800', iconBg: 'bg-green-100', textColor: 'text-green-600' },
    { to: '/catalogos', title: 'Catálogos', icon: '📚', count: '-', color: 'from-purple-600 to-purple-800', iconBg: 'bg-purple-100', textColor: 'text-purple-600' },
    { to: '/usuarios', title: 'Usuarios', icon: '👤', count: stats.usuarios, color: 'from-orange-600 to-orange-800', iconBg: 'bg-orange-100', textColor: 'text-orange-600' },
  ];

  const quickLinks = [
    { to: '/ordenes', icon: '📋', label: 'Nueva Orden', color: 'from-blue-50 to-indigo-50', hover: 'hover:from-blue-100 hover:to-indigo-100' },
    { to: '/clientes', icon: '👥', label: 'Agregar Cliente', color: 'from-green-50 to-emerald-50', hover: 'hover:from-green-100 hover:to-emerald-100' },
    { to: '/catalogos', icon: '📚', label: 'Ver Catálogos', color: 'from-purple-50 to-pink-50', hover: 'hover:from-purple-100 hover:to-pink-100' },
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Welcome Header */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-black">
          ¡Bienvenido de nuevo!
        </h1>
        <p className="text-gray-500 mt-1">
          Hola {user?.nombre || 'Usuario'}, aquí tienes un resumen de tu actividad.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-lg p-6 border border-gray-200 animate-pulse">
              <div className="h-10 bg-gray-200 rounded mb-4 w-1/2"></div>
              <div className="h-14 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))
        ) : (
          cards.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="group bg-white rounded-lg p-6 border border-gray-200 hover:shadow-md hover:border-black transition-all"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-black">{card.title}</h3>
                <span className="text-2xl text-gray-400">{card.icon}</span>
              </div>
              <p className="text-4xl font-bold text-black mt-4">{card.count}</p>
            </Link>
          ))
        )}
      </div>

      {/* Pending Orders Alert */}
      {stats.pendientes > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-yellow-900">Órdenes Pendientes</h3>
              <p className="text-yellow-800 mt-1">
                Tienes <span className="font-bold">{stats.pendientes}</span> órdenes que requieren atención.
              </p>
            </div>
            <Link 
              to="/ordenes" 
              className="px-5 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all text-sm"
            >
              Ver Órdenes
            </Link>
          </div>
        </div>
      )}

      {/* Quick Access & Tip of the day */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-black mb-4">Accesos Rápidos</h2>
          <div className="space-y-3">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all group"
              >
                <span className="font-semibold text-black flex items-center gap-3">
                  <span className="text-xl text-gray-500">{link.icon}</span>
                  {link.label}
                </span>
                <span className="text-gray-400 group-hover:text-black transition-all">→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-black text-white rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">💡 Consejo del día</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Mantén actualizados los datos de tus clientes para ofrecer un mejor servicio y seguimiento de órdenes.
          </p>
          <Link 
            to="/clientes" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-all text-sm"
          >
            Gestionar Clientes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;