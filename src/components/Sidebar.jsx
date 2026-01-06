import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navigation = [
  { name: 'Dashboard', to: '/', icon: '🏠' },
  { name: 'Clientes', to: '/clientes', icon: '👥' },
  { name: 'Órdenes', to: '/ordenes', icon: '📋' },
  { name: 'Catálogos', to: '/catalogos', icon: '📚' },
];

const adminNavigation = [
  { name: 'Usuarios', to: '/usuarios', icon: '🧑‍💼' },
  { name: 'Roles', to: '/roles', icon: '🛡️' },
  { name: 'Sucursales', to: '/sucursales', icon: '🏢' },
];

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-gray-800 to-gray-900 text-white shadow-2xl">
      <div className="p-6 text-center border-b border-gray-700">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Hantonio J.
        </h1>
        <p className="text-xs text-gray-400">Sastrería</p>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Menú</p>
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-purple-600/20 text-white shadow-inner'
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }`
            }
          >
            <span className="mr-3 text-xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
        <p className="px-4 pt-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Administración</p>
        {adminNavigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-purple-600/20 text-white shadow-inner'
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }`
            }
          >
            <span className="mr-3 text-xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-gray-300 hover:bg-red-800/50 hover:text-white transition-all duration-200"
        >
          <span className="mr-3 text-xl">🚪</span>
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
