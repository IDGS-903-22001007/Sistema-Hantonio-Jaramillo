import apiClient from './axiosConfig';

export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/Auth/login', {
      login: credentials.login,
      password: credentials.password
    });
    
    console.log('✅ Respuesta completa del login:', response.data);
    
    // El backend retorna un objeto con token, expiration y usuario
    const { token, usuario } = response.data;
    
    // Log del token para debugging (solo los primeros caracteres)
    console.log('🔐 Token recibido:', token.substring(0, 50) + '...');
    console.log('👤 Usuario:', usuario);
    
    return {
      token: token,
      nombreCompleto: usuario.nombreCompleto,
      login: usuario.login,
      nombreRol: usuario.rol, // El backend ya envía "rol" no "nombreRol"
      idUsuario: usuario.idUsuario,
      idRol: usuario.idRol
    };
  } catch (error) {
    console.error('❌ Error en login API:', error.response?.data || error.message);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  delete apiClient.defaults.headers.common['Authorization'];
};
