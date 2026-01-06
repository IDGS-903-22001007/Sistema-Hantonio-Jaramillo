import React from 'react';
import { Link } from 'react-router-dom';

const cards = [
  { to: '/clientes', title: 'Clientes', icon: '👥', color: 'bg-blue-500' },
  { to: '/ordenes', title: 'Órdenes', icon: '📋', color: 'bg-green-500' },
  { to: '/catalogos', title: 'Catálogos', icon: '📚', color: 'bg-purple-500' },
  { to: '/usuarios', title: 'Usuarios', icon: '👤', color: 'bg-orange-500' },
  { to: '/roles', title: 'Roles', icon: '🔐', color: 'bg-red-500' },
  { to: '/sucursales', title: 'Sucursales', icon: '🏢', color: 'bg-teal-500' },
];

const Dashboard = () => {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Bienvenido al sistema de gestión</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center group"
          >
            <div
              className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
            >
              <span className="text-2xl">{card.icon}</span>
            </div>
            <h3 className="font-medium text-gray-800">{card.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
