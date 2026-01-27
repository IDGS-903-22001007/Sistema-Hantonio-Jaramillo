// axiosConfig.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7172/api",
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    // Obtenemos la URL que causó el error para saber si fue el login
    const originalRequestUrl = error.config?.url || "";

    if (status === 401) {
      // CONDICIÓN IMPORTANTE:
      // Solo cerramos sesión y recargamos SI LA URL NO ES EL LOGIN.
      // Si la URL incluye '/Auth/login', dejamos que el componente Login maneje el error.
      if (!originalRequestUrl.includes("/Auth/login")) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    } else if (status === 403) {
      alert("Acceso denegado: no tienes permisos para esta acción.");
    }

    // Rechazamos la promesa para que el catch() de tu Login.jsx pueda mostrar el mensaje rojo
    return Promise.reject(error);
  }
);

export default apiClient;
