import React, { useState, useEffect } from "react";
import { usuariosService } from "../api/usuarios";
import { rolesService } from "../api/roles";
import { sucursalesService } from "../api/sucursales";
import Alert from "../components/Alert";
import { Eye, EyeOff, Edit, UserX, UserCheck } from "lucide-react";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [sucursales, setSucursales] = useState([]);

  // Estado del formulario
  const [formData, setFormData] = useState({
    idRol: "",
    idSucursal: "",
    nombreCompleto: "",
    login: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false); // Nuevo estado para observar
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [editingUsuario, setEditingUsuario] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroEstatus, setFiltroEstatus] = useState("");
  const usuariosFiltrados = usuarios.filter((u) => {
    // 1. Condición de búsqueda por texto
    const coincideTexto =
      u.nombreCompleto?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.nombreUsuario?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false;

    // 2. Condición de filtro por estatus booleano
    let coincideEstatus = true;
    if (filtroEstatus === "activo") {
      coincideEstatus = u.estatus === true;
    } else if (filtroEstatus === "inactivo") {
      coincideEstatus = u.estatus === false;
    }

    // 3. Ambas condiciones deben cumplirse
    return coincideTexto && coincideEstatus;
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [u, r, s] = await Promise.all([
        usuariosService.listar(),
        rolesService.listar(),
        sucursalesService.listar(),
      ]);
      setUsuarios(u);
      setRoles(r);
      setSucursales(s);
    } catch (err) {
      setError("Error al conectar con el servidor.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isReadOnly) return;

    setIsSubmitting(true);
    setAlert({ type: "", message: "" });

    try {
      const payload = {
        nombreUsuario: formData.login.trim(),
        nombreCompleto: formData.nombreCompleto.trim(),
        email: formData.email.trim(),
        password: formData.password ? formData.password : null,
        idRol: formData.idRol ? parseInt(formData.idRol) : null,
        idSucursal: formData.idSucursal ? parseInt(formData.idSucursal) : null,
      };

      if (editingUsuario) {
        await usuariosService.actualizar(editingUsuario.idUsuario, {
          ...payload,
          idUsuario: editingUsuario.idUsuario,
          estatus: editingUsuario.estatus,
        });
        setAlert({
          type: "success",
          message: "Usuario actualizado correctamente.",
        });
      } else {
        if (!payload.password) {
          throw new Error("La contraseña es obligatoria para nuevos usuarios.");
        }
        await usuariosService.crear(payload);
        setAlert({ type: "success", message: "Usuario creado correctamente" });
      }

      await fetchData();
      resetForm();
    } catch (err) {
      console.error(err);
      const errorMsg =
        err.message ||
        err.response?.data?.message ||
        "Error al procesar la solicitud";
      setAlert({ type: "error", message: errorMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActivo = async (id, estatusActual) => {
    try {
      await usuariosService.cambiarEstatus(id, !estatusActual);
      await fetchData();
      setAlert({
        type: "success",
        message: `Usuario ${!estatusActual ? "activado" : "desactivado"} correctamente`,
      });
    } catch (err) {
      setAlert({ type: "error", message: "No se pudo cambiar el estatus" });
    }
  };

  const resetForm = () => {
    setFormData({
      idRol: "",
      idSucursal: "",
      nombreCompleto: "",
      login: "",
      email: "",
      password: "",
    });
    setShowForm(false);
    setEditingUsuario(null);
    setIsReadOnly(false);
  };

  const openEditForm = (usuario) => {
    setFormData({
      idRol: usuario.idRol || "",
      idSucursal: usuario.idSucursal || "",
      nombreCompleto: usuario.nombreCompleto || "",
      login: usuario.nombreUsuario || "",
      email: usuario.email || "",
      password: "",
    });
    setEditingUsuario(usuario);
    setIsReadOnly(false);
    setShowForm(true);
  };

  const openViewForm = (usuario) => {
    setFormData({
      idRol: usuario.idRol || "",
      idSucursal: usuario.idSucursal || "",
      nombreCompleto: usuario.nombreCompleto || "",
      login: usuario.nombreUsuario || "",
      email: usuario.email || "",
      password: "••••••••", // Password ficticio para la vista
    });
    setEditingUsuario(usuario);
    setIsReadOnly(true);
    setShowForm(true);
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto min-h-screen text-gray-200">
      <Alert
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: "", message: "" })}
      />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Usuarios</h1>
          <p className="text-gray-500 mt-1">
            Gestiona los{" "}
            <span className="font-semibold text-white">{usuarios.length}</span>{" "}
            usuarios del sistema.
          </p>
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-5 py-2 bg-black text-white rounded-lg border border-gray-800 focus:border-white transition-all text-sm outline-none w-64"
          />
          <select
            value={filtroEstatus}
            onChange={(e) => setFiltroEstatus(e.target.value)}
            className="px-5 py-2 bg-black text-white rounded-lg border border-gray-800 focus:border-white transition-all text-sm outline-none w-64"
          >
            <option value="">Filtrar por estatus...</option>
            <option value="activo">Activos</option>
            <option value="inactivo">Inactivos</option>
          </select>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="px-5 py-2 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-all text-sm"
          >
            + Nuevo Usuario
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-900/20 text-red-400 border border-red-900/50 rounded-lg">
          <p className="font-medium">⚠️ {error}</p>
        </div>
      )}

      <div className="bg-[#0d0d0d] rounded-xl border border-gray-800 overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-16 text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-gray-800 border-t-white"></div>
            <p className="text-gray-500 mt-4 text-sm">Cargando usuarios...</p>
          </div>
        ) : usuariosFiltrados.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <p className="text-lg font-bold">Sin resultados</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800 bg-black/50 text-gray-500 text-xs uppercase font-bold tracking-widest">
                  <th className="p-4">Usuario</th>
                  <th className="p-4">Login</th>
                  <th className="p-4 md:table-cell">Rol</th>
                  <th className="p-4 hidden lg:table-cell">Sucursal</th>
                  <th className="p-4">Estatus</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {usuariosFiltrados.map((u) => (
                  <tr
                    key={u.idUsuario}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-white text-black rounded-full flex items-center justify-center font-black text-xs shrink-0">
                          {u.nombreCompleto?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-white text-sm">
                            {u.nombreCompleto}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-2 py-1 bg-gray-800 rounded text-[14px] font-mono font-semibold text-gray-300 border border-gray-700">
                        @{u.nombreUsuario}
                      </span>
                    </td>
                    {/* COLUMNA DE ROL CORREGIDA */}
                    <td className="p-4 md:table-cell">
                      <span className="text-sm text-gray-300 font-medium">
                        {u.rol?.nombre ||
                          roles.find((r) => r.idRol === u.idRol)?.nombre ||
                          "Sin Rol"}
                      </span>
                    </td>
                    {/* COLUMNA DE SUCURSAL CORREGIDA */}
                    <td className="p-4 hidden lg:table-cell">
                      <span className="text-sm text-gray-500 italic">
                        {u.sucursal?.nombre ||
                          sucursales.find((s) => s.idSucursal === u.idSucursal)
                            ?.nombre ||
                          "No definida"}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-md text-[10px] font-black tracking-tighter ${
                          u.estatus
                            ? "bg-green-900/20 text-green-400"
                            : "bg-red-900/20 text-red-400"
                        }`}
                      >
                        {u.estatus ? "ACTIVO" : "INACTIVO"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => openViewForm(u)}
                          className="text-gray-400 hover:text-white transition-colors"
                          title="Observar"
                        >
                          <Eye size={18} strokeWidth={2.5} />
                        </button>
                        <button
                          onClick={() => openEditForm(u)}
                          className="text-gray-400 hover:text-white transition-colors"
                          title="Editar"
                        >
                          <Edit size={18} strokeWidth={2.5} />
                        </button>
                        <button
                          onClick={() =>
                            handleToggleActivo(u.idUsuario, u.estatus)
                          }
                          title={
                            u.estatus ? "Desactivar Usuario" : "Activar Usuario"
                          }
                          className={`transition-all p-2 rounded-md ${
                            u.estatus
                              ? "text-gray-400 hover:text-red-400 hover:bg-red-400/10"
                              : "text-gray-400 hover:text-emerald-400 hover:bg-emerald-400/10"
                          }`}
                        >
                          {u.estatus ? (
                            <UserX size={18} strokeWidth={2.5} />
                          ) : (
                            <UserCheck size={18} strokeWidth={2.5} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-[#0d0d0d] border border-gray-800 rounded-2xl w-full max-w-lg shadow-2xl animate-slideUp">
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-black text-white uppercase tracking-tight">
                {isReadOnly
                  ? "Datos del Usuario"
                  : editingUsuario
                    ? "Editar Usuario"
                    : "Nuevo Usuario"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="text-[10px] font-black text-gray-500 uppercase mb-2 block tracking-widest">
                  Nombre Completo *
                </label>
                <input
                  value={formData.nombreCompleto}
                  readOnly={isReadOnly}
                  onChange={(e) =>
                    setFormData({ ...formData, nombreCompleto: e.target.value })
                  }
                  className={`w-full bg-black border border-gray-800 p-3 rounded-lg text-white outline-none focus:border-white transition-all ${isReadOnly ? "opacity-60 cursor-default" : "placeholder-gray-600"}`}
                  placeholder="Ej. Ana García"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-500 uppercase mb-2 block tracking-widest">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={formData.email}
                  readOnly={isReadOnly}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full bg-black border border-gray-800 p-3 rounded-lg text-white outline-none focus:border-white transition-all ${isReadOnly ? "opacity-60 cursor-default" : "placeholder-gray-600"}`}
                  placeholder="ejemplo@correo.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase mb-2 block tracking-widest">
                    Login (Usuario) *
                  </label>
                  <input
                    value={formData.login}
                    readOnly={isReadOnly}
                    onChange={(e) =>
                      setFormData({ ...formData, login: e.target.value })
                    }
                    className={`w-full bg-black border border-gray-800 p-3 rounded-lg text-white outline-none focus:border-white transition-all ${isReadOnly ? "opacity-60 cursor-default" : "placeholder-gray-600"}`}
                    placeholder="Usuario"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase mb-2 block tracking-widest">
                    {editingUsuario ? "Nueva Contraseña" : "Contraseña *"}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      readOnly={isReadOnly}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      // Se agregó pr-10 para que el texto no se encime con el icono
                      className={`w-full bg-black border border-gray-800 p-3 pr-10 rounded-lg text-white outline-none focus:border-white transition-all ${isReadOnly ? "opacity-60 cursor-default" : "placeholder-gray-600"}`}
                      placeholder={
                        isReadOnly
                          ? ""
                          : editingUsuario
                            ? "Opcional"
                            : "Mín. 6 caracteres"
                      }
                      required={!editingUsuario && !isReadOnly}
                    />

                    {/* Botón del ojito (solo se muestra si NO está en modo lectura) */}
                    {!isReadOnly && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 inset-y-0 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
                        tabIndex="-1"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase mb-2 block tracking-widest">
                    Rol
                  </label>
                  <select
                    value={formData.idRol}
                    disabled={isReadOnly}
                    onChange={(e) =>
                      setFormData({ ...formData, idRol: e.target.value })
                    }
                    className={`w-full bg-black border border-gray-800 p-3 rounded-lg text-white outline-none focus:border-white transition-all ${isReadOnly ? "opacity-60 cursor-default appearance-none" : ""}`}
                  >
                    <option value="">Seleccionar...</option>
                    {roles.map((r) => (
                      <option key={r.idRol} value={r.idRol}>
                        {r.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase mb-2 block tracking-widest">
                    Sucursal
                  </label>
                  <select
                    value={formData.idSucursal}
                    disabled={isReadOnly}
                    onChange={(e) =>
                      setFormData({ ...formData, idSucursal: e.target.value })
                    }
                    className={`w-full bg-black border border-gray-800 p-3 rounded-lg text-white outline-none focus:border-white transition-all ${isReadOnly ? "opacity-60 cursor-default appearance-none" : ""}`}
                  >
                    <option value="">Seleccionar...</option>
                    {sucursales.map((s) => (
                      <option key={s.idSucursal} value={s.idSucursal}>
                        {s.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 p-3 border border-gray-800 rounded-lg text-gray-500 font-bold hover:text-white transition-all"
                >
                  {isReadOnly ? "CERRAR" : "CANCELAR"}
                </button>
                {!isReadOnly && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 p-3 bg-white text-black rounded-lg font-black hover:bg-gray-200 transition-all"
                  >
                    {isSubmitting
                      ? "GUARDANDO..."
                      : editingUsuario
                        ? "ACTUALIZAR"
                        : "GUARDAR"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;
