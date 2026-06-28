import React from "react";
// ¡Agregamos Navigate aquí para la ruta comodín!
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Clientes from "./components/Clientes";
import Ordenes from "./components/Ordenes";
import Sucursales from "./components/Sucursales";
import Usuarios from "./components/Usuarios";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Finanzas from "./components/Finanzas";
import Layout from "./components/Layout";
// 1. IMPORTAMOS LA PANTALLA DE ERROR
import NoAutorizado from "./components/NoAutorizado";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* 2. AGREGAMOS LA RUTA PARA LA PANTALLA DE ERROR */}
          <Route path="/no-autorizado" element={<NoAutorizado />} />

          {/* RUTAS PARA TODOS (Admin y Empleado) */}
          <Route
            element={
              <ProtectedRoute allowedRoles={["Administrador", "Empleado"]} />
            }
          >
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/ordenes" element={<Ordenes />} />
          </Route>

          {/* RUTAS EXCLUSIVAS (Solo Administrador) */}
          <Route element={<ProtectedRoute allowedRoles={["Administrador"]} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/sucursales" element={<Sucursales />} />
            <Route path="/finanzas" element={<Finanzas />} />
          </Route>

          {/* 3. AGREGAMOS LA RUTA COMODÍN PARA URLs INVENTADAS */}
          <Route path="*" element={<Navigate to="/no-autorizado" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
