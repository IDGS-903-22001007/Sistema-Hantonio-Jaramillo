import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from './Layout'; // Importa Layout

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>; // O un spinner de carga
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Layout />; // Renderiza el Layout que contiene el Outlet
};

export default ProtectedRoute;
