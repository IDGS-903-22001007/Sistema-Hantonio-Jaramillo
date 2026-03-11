import axios from "axios";

const apiClient = axios.create({
  // Ajustado al puerto 7172 según tu terminal
  baseURL: "https://localhost:7172/api",
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // Usamos el método set o la asignación directa asegurando que existe el objeto
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const originalRequestUrl = error.config?.url || "";

    if (status === 401) {
      // Si el error no es en el intento de login, limpiamos y redirigimos
      if (!originalRequestUrl.includes("/Auth/login")) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    } else if (status === 403) {
      alert("Acceso denegado: no tienes permisos para esta acción.");
    } else if (!error.response) {
      // Caso adicional: El servidor está apagado o el puerto es incorrecto
      console.error(
        "No se pudo conectar con el servidor. Revisa el puerto y el CORS.",
      );
    }

    return Promise.reject(error);
  },
);

export default apiClient;
