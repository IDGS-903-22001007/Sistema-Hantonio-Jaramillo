import apiClient from "./axiosConfig";

export const authService = {
  /**
   * Envía las credenciales al backend.
   * Si es exitoso, devuelve el token y la info del usuario.
   */
  login: async (nombreUsuario, password) => {
    // El objeto coincide con tu LoginRequest en C#
    const response = await apiClient.post("/Auth/login", {
      nombreUsuario,
      password,
    });
    return response.data;
  },

  /**
   * Notifica al servidor el cierre de sesión para registrar el UltimoLogout.
   */
  logout: async () => {
    try {
      await apiClient.post("/Auth/logout");
    } catch (error) {
      console.error("Error al registrar logout en el servidor", error);
    } finally {
      // Siempre limpiamos el storage local al final
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  },
};
