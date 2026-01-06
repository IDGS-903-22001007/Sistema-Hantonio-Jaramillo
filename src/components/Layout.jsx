import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { name: 'Inicio', to: '/', icon: '🏠' },
  { name: 'Clientes', to: '/clientes', icon: '👥' },
  { name: 'Órdenes', to: '/ordenes', icon: '📋' },
  { name: 'Catálogos', to: '/catalogos', icon: '📚' },
  { name: 'Usuarios', to: '/usuarios', icon: '👤' },
  { name: 'Roles', to: '/roles', icon: '🔐' },
  { name: 'Sucursales', to: '/sucursales', icon: '🏢' },
];

const Layout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-white shadow-lg flex flex-col transition-all duration-300`}>
        <div className="p-4 border-b flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold text-indigo-600">Hantonio J.</h1>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className={`flex items-center w-full px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors ${collapsed ? 'justify-center' : ''}`}
          >
            <span className="text-lg">🚪</span>
            {!collapsed && <span className="ml-3">Salir</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
