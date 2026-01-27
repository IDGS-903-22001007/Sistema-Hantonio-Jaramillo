import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Clientes from "./components/Clientes";
import Ordenes from "./components/Ordenes";
import Roles from "./components/Roles";
import Sucursales from "./components/Sucursales";
import Usuarios from "./components/Usuarios";
import Catalogos from "./components/Catalogos";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/ordenes" element={<Ordenes />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/sucursales" element={<Sucursales />} />
            <Route path="/catalogos" element={<Catalogos />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
