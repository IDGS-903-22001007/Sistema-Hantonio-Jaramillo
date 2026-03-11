import React, { createContext, useState, useContext, useEffect } from "react";
import { authService } from "../api/auth"; // Usando el servicio que definimos
import apiClient from "../api/axiosConfig";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (savedToken && savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setToken(savedToken);
          setUser(userData);
          // Nota: El interceptor en axiosConfig ya maneja el Bearer token,
          // pero esto refuerza la carga inicial.
        } catch (e) {
          console.error("Error al restaurar sesión:", e);
          logout();
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (nombreUsuario, password) => {
    try {
      // Llamamos al servicio de auth que ya creamos
      const data = await authService.login(nombreUsuario, password);

      // data contiene: { token, expiration, usuario: { idUsuario, nombreCompleto, rol, idSucursal, ... } }
      if (!data.token) throw new Error("No se recibió el token del servidor");

      const userToken = data.token;
      const userData = data.usuario; // Tu API ya devuelve el objeto UsuarioInfo completo

      // Guardamos en Storage
      localStorage.setItem("token", userToken);
      localStorage.setItem("user", JSON.stringify(userData));

      // Actualizamos estado global
      setToken(userToken);
      setUser(userData);

      console.log("✅ Login exitoso en sucursal:", userData.nombreSucursal);
      return data;
    } catch (error) {
      // El error ya viene formateado por el interceptor de Axios
      const message = error.response?.data?.message || "Error de conexión";
      console.error("❌ Error en login:", message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    console.log("✅ Sesión cerrada");
    // Redirigir es opcional aquí si usas rutas protegidas que reaccionan al estado 'user'
  };

  const authContextValue = {
    user, // { idUsuario, nombreCompleto, nombreUsuario, rol, idSucursal, nombreSucursal }
    token,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.rol === "Administrador",
    loading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};
