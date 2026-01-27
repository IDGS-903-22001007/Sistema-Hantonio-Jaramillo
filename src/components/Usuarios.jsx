import React, { useState, useEffect } from "react";
import {
  getUsuarios,
  createUsuario,
  toggleUsuarioActivo,
  updateUsuario,
} from "../api/usuarios";
import { getRoles } from "../api/roles";
import { getSucursales } from "../api/sucursales";
import Alert from "./Alert";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [sucursales, setSucursales] = useState([]);

  // Estado del formulario
  const [formData, setFormData] = useState({
    idRol: "",
    idSucursal: "",
    nombre: "",
    login: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [editingUsuario, setEditingUsuario] = useState(null);

  // Carga inicial de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [u, r, s] = await Promise.all([
          getUsuarios(),
          getRoles(),
          getSucursales(),
        ]);
        setUsuarios(u.data);
        setRoles(r.data);
        setSucursales(s.data);
      } catch (err) {
        setError("Error al cargar datos del servidor");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: "", message: "" });

    try {
      const usuarioPayload = {
        login: formData.login.trim(),
        password: formData.password,
        nombreCompleto: formData.nombre.trim(),
        idRol: formData.idRol ? parseInt(formData.idRol) : null,
        idSucursal: formData.idSucursal ? parseInt(formData.idSucursal) : null,
      };

      console.log("📤 Enviando payload:", usuarioPayload);

      if (editingUsuario) {
        // Actualizar usuario existente
        await updateUsuario(editingUsuario.idUsuario, {
          nombreCompleto: formData.nombre.trim(),
          idRol: formData.idRol ? parseInt(formData.idRol) : null,
          idSucursal: formData.idSucursal
            ? parseInt(formData.idSucursal)
            : null,
          activo: true,
        });

        // Recargar lista
        const data = await Promise.all([
          getUsuarios(),
          getRoles(),
          getSucursales(),
        ]);
        setUsuarios(data[0].data);
        setAlert({
          type: "success",
          message: "Usuario actualizado correctamente",
        });
      } else {
        // Crear nuevo usuario
        const { data } = await createUsuario(usuarioPayload);
        setUsuarios([data, ...usuarios]);
        setAlert({ type: "success", message: "Usuario creado correctamente" });
      }

      resetForm();
    } catch (err) {
      console.error("❌ Error al guardar usuario:", err.response?.data);

      let errorMsg = "Error al guardar usuario";

      if (err.response?.data) {
        const errorData = err.response.data;

        if (errorData.errors) {
          const mensajesError = [];
          Object.keys(errorData.errors).forEach((campo) => {
            const erroresCampo = errorData.errors[campo];
            if (Array.isArray(erroresCampo)) {
              erroresCampo.forEach((msg) => {
                mensajesError.push(`${campo}: ${msg}`);
              });
            }
          });
          errorMsg =
            mensajesError.length > 0
              ? mensajesError.join(". ")
              : "Error de validación";
        } else if (errorData.title) {
          errorMsg = errorData.title;
        } else if (typeof errorData === "string") {
          errorMsg = errorData;
        }
      }

      setAlert({ type: "error", message: errorMsg });
    }
  };

  const resetForm = () => {
    setFormData({
      idRol: "",
      idSucursal: "",
      nombre: "",
      login: "",
      password: "",
    });
    setShowForm(false);
    setEditingUsuario(null);
  };

  const openEditForm = (usuario) => {
    setFormData({
      idRol: usuario.idRol || "",
      idSucursal: usuario.idSucursal || "",
      nombre: usuario.nombreCompleto || "",
      login: usuario.login || "",
      password: "", // No mostrar password existente
    });
    setEditingUsuario(usuario);
    setShowForm(true);
  };

  const handleToggleActivo = async (id, activo) => {
    try {
      await toggleUsuarioActivo(id, !activo);
      // Recargar la lista completa para asegurar sincronización
      await fetchData();
      setAlert({
        type: "success",
        message: `Usuario ${
          !activo ? "activado" : "desactivado"
        } correctamente`,
      });
    } catch (err) {
      console.error(
        "Error al cambiar estado:",
        err.response?.data || err.message
      );
      setAlert({
        type: "error",
        message: "Error al cambiar estado del usuario",
      });
    }
  };

  const fetchData = async () => {
    try {
      const [u, r, s] = await Promise.all([
        getUsuarios(),
        getRoles(),
        getSucursales(),
      ]);
      setUsuarios(u.data);
      setRoles(r.data);
      setSucursales(s.data);
    } catch (err) {
      setError("Error al cargar datos");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Componente de Alerta */}
      <Alert
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: "", message: "" })}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Usuarios</h1>
          <p className="text-gray-500 mt-1">
            Gestiona los{" "}
            <span className="font-semibold text-black">{usuarios.length}</span>{" "}
            usuarios del sistema.
          </p>
        </div>
        <button
          onClick={() => {
            setFormData({
              idRol: "",
              idSucursal: "",
              nombre: "",
              login: "",
              password: "",
            });
            setShowForm(true);
            setAlert({ type: "", message: "" });
          }}
          className="px-5 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all text-sm shadow-md hover:shadow-lg transform active:scale-95"
        >
          + Nuevo Usuario
        </button>
      </div>

      {/* Mensaje de Error General de Carga */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-800 border border-red-200 rounded-lg flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Tabla */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black mb-4"></div>
            <p className="text-gray-500 text-sm font-medium">
              Cargando usuarios...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="p-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="p-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Rol
                  </th>
                  <th className="p-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Sucursal
                  </th>
                  <th className="p-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="p-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {usuarios.map((u) => (
                  <tr
                    key={u.idUsuario}
                    className="hover:bg-gray-50/80 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                          {u.nombreCompleto?.charAt(0)?.toUpperCase() ||
                            u.login?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">
                            {u.nombreCompleto || "Sin Nombre"}
                          </p>
                          <p className="text-xs text-gray-500 font-mono">
                            @{u.login}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-600 hidden md:table-cell">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                        {u.rol?.nombre ||
                          roles.find((r) => r.idRol === u.idRol)?.nombre ||
                          "-"}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-600 hidden lg:table-cell">
                      {u.sucursal?.nombre ||
                        sucursales.find((s) => s.idSucursal === u.idSucursal)
                          ?.nombre ||
                        "-"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
                          u.activo
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-gray-50 text-gray-600 border-gray-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            u.activo ? "bg-green-500" : "bg-gray-400"
                          }`}
                        ></span>
                        {u.activo ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditForm(u)}
                        className="px-3 py-1 text-sm font-semibold text-amber-600 bg-white border border-amber-300 rounded-md hover:bg-amber-50 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() =>
                          handleToggleActivo(u.idUsuario, u.activo)
                        }
                        className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${
                          u.activo
                            ? "text-red-600 bg-white border border-red-300 hover:bg-red-50"
                            : "text-green-600 bg-white border border-green-300 hover:bg-green-50"
                        }`}
                      >
                        {u.activo ? "Desactivar" : "Activar"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {usuarios.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No hay usuarios registrados aún.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal Formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-slideUp overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {editingUsuario ? "Editar Usuario" : "Nuevo Usuario"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-5">
                {/* Nombre y Login */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Nombre Completo *
                    </label>
                    <input
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-white text-black border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none text-sm placeholder-gray-400"
                      placeholder="Ej. Juan Pérez"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Usuario (Login) *
                    </label>
                    <input
                      value={formData.login}
                      onChange={(e) =>
                        setFormData({ ...formData, login: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-white text-black border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none text-sm placeholder-gray-400"
                      placeholder="Ej. jperez"
                      required={!editingUsuario}
                      disabled={editingUsuario}
                    />
                  </div>
                </div>

                {/* Password - Solo requerido al crear */}
                {!editingUsuario && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Contraseña *
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      placeholder="Mínimo 6 caracteres"
                      minLength={6}
                      className="w-full px-4 py-2.5 bg-white text-black border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none text-sm placeholder-gray-400"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      💡 La contraseña debe tener al menos 6 caracteres
                    </p>
                  </div>
                )}

                {/* Roles y Sucursales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Rol
                    </label>
                    <select
                      value={formData.idRol}
                      onChange={(e) =>
                        setFormData({ ...formData, idRol: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-white text-black border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none text-sm appearance-none"
                    >
                      <option value="">-- Sin Rol --</option>
                      {roles.map((r) => (
                        <option key={r.idRol} value={r.idRol}>
                          {r.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Sucursal
                    </label>
                    <select
                      value={formData.idSucursal}
                      onChange={(e) =>
                        setFormData({ ...formData, idSucursal: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-white text-black border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-black transition-all outline-none text-sm appearance-none"
                    >
                      <option value="">-- Sin Sucursal --</option>
                      {sucursales.map((s) => (
                        <option key={s.idSucursal} value={s.idSucursal}>
                          {s.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-end p-6 bg-gray-50/80 border-t border-gray-100">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-white hover:border-gray-400 font-semibold text-sm transition-all shadow-sm"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 font-semibold text-sm transition-all shadow-lg hover:shadow-xl active:scale-95"
                >
                  {editingUsuario ? "Actualizar Usuario" : "Guardar Usuario"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
