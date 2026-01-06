import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin } from '../api/auth';
import apiClient from '../api/axiosConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ token });
    }
  }, [token]);

  const login = async (login, password) => {
    const data = await apiLogin({ login, password });
    localStorage.setItem('token', data.token);
    setToken(data.token);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    setUser({ token: data.token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete apiClient.defaults.headers.common['Authorization'];
  };

  const authContextValue = {
    user,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
