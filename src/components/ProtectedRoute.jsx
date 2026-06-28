import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "./Layout";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading, token } = useAuth();

  // 1. Mostrar spinner mientras valida el token
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500/30 border-t-amber-500 mb-4"></div>
          <p className="text-slate-400">Cargando...</p>
        </div>
      </div>
    );
  }

  // 2. Si no hay usuario o token, mandarlo al Login
  if (!user || !token) {
    console.warn("⚠️ Acceso denegado - Sin autenticación");
    return <Navigate to="/login" replace />;
  }

  // 3. NUEVA LÓGICA: Verificar el rol del usuario contra los permitidos
  const rol = user?.rol || user?.nombreRol || "";

  if (allowedRoles && !allowedRoles.includes(rol)) {
    console.warn(
      `⚠️ Acceso restringido - El rol '${rol}' no tiene permisos para esta ruta`,
    );
    // Lo mandamos a la nueva pantalla de Acceso Denegado
    return <Navigate to="/no-autorizado" replace />;
  }

  // 4. Si pasó todos los filtros de seguridad, mostramos la interfaz (Layout + Outlet)
  return <Layout />;
};

export default ProtectedRoute;
