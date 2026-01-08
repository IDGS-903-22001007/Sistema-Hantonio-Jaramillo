import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin } from '../api/auth';
import apiClient from '../api/axiosConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (savedToken) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
        setToken(savedToken);
        
        if (savedUser) {
          try {
            const userData = JSON.parse(savedUser);
            setUser(userData);
            console.log('✅ Usuario restaurado:', userData);
          } catch (e) {
            console.error('Error al parsear usuario guardado');
          }
        }
      } else {
        console.log('ℹ️ No hay sesión anterior');
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (loginCredential, password) => {
    try {
      const data = await apiLogin({ login: loginCredential, password });
      
      if (!data.token) {
        throw new Error('No token received from server');
      }
      
      localStorage.setItem('token', data.token);
      setToken(data.token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      // Crear objeto de usuario con la información correcta del backend
      const userData = {
        nombreCompleto: data.nombreCompleto,
        login: data.login,
        rol: data.nombreRol, // nombreRol viene del api/auth.js
        idUsuario: data.idUsuario,
        idRol: data.idRol
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      console.log('✅ Login exitoso - Usuario guardado:', userData);
      return data;
    } catch (error) {
      console.error('❌ Error en login:', error.message);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    delete apiClient.defaults.headers.common['Authorization'];
    console.log('✅ Sesión cerrada');
  };

  const authContextValue = {
    user,
    token,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
