import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { name: 'Dashboard', to: '/', icon: '🏠' },
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

  const getUserInitial = () => {
    if (user?.nombreCompleto) {
      return user.nombreCompleto.charAt(0).toUpperCase();
    }
    if (user?.login) {
      return user.login.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${collapsed ? 'w-20' : 'w-72'} bg-black flex flex-col transition-all duration-300 shadow-xl flex-shrink-0`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Hantonio J.
                </h1>
                <p className="text-xs text-gray-400 mt-1">Sistema de Gestión</p>
              </div>
            )}
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-300 transition-colors"
            >
              {collapsed ? '→' : '←'}
            </button>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && <span className="ml-4 font-medium">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User info & Logout */}
        <div className="p-4 border-t border-gray-800">
          {!collapsed && user && (
            <div className="mb-4 px-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                  {getUserInitial()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {user.nombreCompleto || user.nombre || 'Usuario'}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    @{user.login || 'usuario'}
                  </p>
                  <p className="text-xs text-amber-500 truncate mt-0.5 font-medium">
                    {user.rol || 'Sin rol'}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {collapsed && user && (
            <div className="mb-4 flex justify-center">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                {getUserInitial()}
              </div>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            className={`flex items-center w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-red-800 hover:text-white transition-all duration-200 font-medium ${collapsed ? 'justify-center' : ''}`}
          >
            <span className="text-xl">🚪</span>
            {!collapsed && <span className="ml-4">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <div className="w-full h-full max-w-6xl bg-white rounded-2xl shadow-lg border border-slate-200 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
