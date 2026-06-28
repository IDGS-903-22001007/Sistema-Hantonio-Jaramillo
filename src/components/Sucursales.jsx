import React, { useState, useEffect } from "react";
import { sucursalesService } from "../api/sucursales";
import { usuariosService } from "../api/usuarios";
import { rolesService } from "../api/roles";
import {
  Eye,
  Edit,
  XCircle,
  CheckCircle,
  Shield,
  Building,
} from "lucide-react";
import Alert from "../components/Alert";

const Sucursales = () => {
  const [sucursales, setSucursales] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);

  // Estado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    idUsuario: "",
    estatus: true,
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false); // Modo observación
  const [editingSucursal, setEditingSucursal] = useState(null);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const [searchTerm, setSearchTerm] = useState("");
  const [filtroEstatus, setFiltroEstatus] = useState("");
  // Helper para obtener nombre
  const getNombreEncargado = (id) => {
    if (!id) return null;
    const usuario = usuarios.find((u) => u.idUsuario === id);
    return usuario ? usuario.nombreCompleto : "Usuario no encontrado";
  };

  const sucursalesFiltradas = sucursales.filter((s) => {
    // 1. Condición de búsqueda por texto
    const nombreEncargado = getNombreEncargado(s.idUsuario) || "";
    const coincideTexto =
      s.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nombreEncargado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false;

    // 2. Condición de filtro por estatus booleano
    let coincideEstatus = true;
    if (filtroEstatus === "activo") {
      coincideEstatus = s.estatus === true;
    } else if (filtroEstatus === "inactivo") {
      coincideEstatus = s.estatus === false;
    }

    // 3. Ambas condiciones deben cumplirse
    return coincideTexto && coincideEstatus;
  });

  const encargadosDisponibles = usuarios.filter((u) => {
    if (!u.estatus) return false;
    const rolUsuario = roles.find((r) => r.idRol === u.idRol);
    return rolUsuario?.nombre?.toLowerCase().includes("admin");
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [sucursalesData, usuariosData, rolesData] = await Promise.all([
        sucursalesService.listar(),
        usuariosService.listar(),
        rolesService.listar(),
      ]);

      setSucursales(sucursalesData);
      setUsuarios(usuariosData);
      setRoles(rolesData);
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "Error al cargar datos" });
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
        nombre: formData.nombre.trim(),
        direccion: formData.direccion.trim(),
        telefono: formData.telefono.trim(),
        idUsuario: formData.idUsuario ? parseInt(formData.idUsuario) : null,
      };

      if (editingSucursal) {
        await sucursalesService.actualizar(editingSucursal.idSucursal, {
          ...payload,
          idSucursal: editingSucursal.idSucursal,
          estatus: editingSucursal.estatus,
        });
        setAlert({
          type: "success",
          message: "Sucursal actualizada correctamente",
        });
      } else {
        await sucursalesService.crear(payload);
        setAlert({ type: "success", message: "Sucursal creada correctamente" });
      }

      await fetchData();
      resetForm();
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Error al guardar la sucursal";
      setAlert({ type: "error", message: errorMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleEstatus = async (id, estatusActual) => {
    try {
      await sucursalesService.cambiarEstatus(id, !estatusActual);
      await fetchData();
      setAlert({
        type: "success",
        message: `Sucursal ${!estatusActual ? "activada" : "desactivada"} correctamente`,
      });
    } catch (err) {
      setAlert({ type: "error", message: "No se pudo cambiar el estatus" });
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: "",
      direccion: "",
      telefono: "",
      idUsuario: "",
      estatus: true,
    });
    setShowForm(false);
    setIsReadOnly(false);
    setEditingSucursal(null);
  };

  const openEditForm = (sucursal) => {
    setFormData({
      nombre: sucursal.nombre || "",
      direccion: sucursal.direccion || "",
      telefono: sucursal.telefono || "",
      idUsuario: sucursal.idUsuario || "",
      estatus: sucursal.estatus ?? true,
    });
    setEditingSucursal(sucursal);
    setIsReadOnly(false);
    setShowForm(true);
  };

  const openViewForm = (sucursal) => {
    openEditForm(sucursal);
    setIsReadOnly(true);
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
          <h1 className="text-3xl font-bold text-white">Sucursales</h1>
          <p className="text-gray-500 mt-1">
            Administra las{" "}
            <span className="font-semibold text-white">
              {sucursales.length}
            </span>{" "}
            sucursales.
          </p>
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar sucursal..."
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
            <option value="activo">Activas</option>
            <option value="inactivo">Inactivas</option>
          </select>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="px-5 py-2 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-all text-sm"
          >
            + Nueva Sucursal
          </button>
        </div>
      </div>

      <div className="bg-[#0d0d0d] rounded-xl border border-gray-800 overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-16 text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-gray-800 border-t-white"></div>
            <p className="text-gray-500 mt-4 text-sm font-medium">
              Cargando datos...
            </p>
          </div>
        ) : sucursalesFiltradas.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <p className="text-lg font-bold">Sin resultados</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800 bg-black/50 text-gray-500 text-xs uppercase font-bold tracking-widest">
                  <th className="p-4">Sucursal</th>
                  <th className="p-4 hidden md:table-cell">Contacto</th>
                  <th className="p-4 lg:table-cell">Encargado</th>
                  <th className="p-4">Estatus</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sucursalesFiltradas.map((s) => (
                  <tr
                    key={s.idSucursal}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg">
                          <Building size={18} strokeWidth={2.5} />
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm leading-none mb-1">
                            {s.nombre}
                          </p>
                          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tight line-clamp-1 max-w-[150px]">
                            {s.direccion || "Sin dirección"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell text-sm text-gray-300 font-medium">
                      {s.telefono || "-"}
                    </td>
                    <td className="p-4 lg:table-cell">
                      {getNombreEncargado(s.idUsuario) ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-900/20 text-blue-400 rounded-md text-sm font-bold border border-blue-900/30">
                          <Shield size={18} strokeWidth={2.5} />
                          {getNombreEncargado(s.idUsuario)}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-600 italic">
                          No asignado
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-md text-[10px] font-black tracking-tighter ${s.estatus ? "bg-green-900/20 text-green-400" : "bg-red-900/20 text-red-400"}`}
                      >
                        {s.estatus ? "ACTIVA" : "INACTIVA"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => openViewForm(s)}
                          className="text-gray-400 hover:text-white transition-colors"
                          title="Ver"
                        >
                          <Eye size={18} strokeWidth={2.5} />
                        </button>
                        <button
                          onClick={() => openEditForm(s)}
                          className="text-gray-400 hover:text-white transition-colors"
                          title="Editar"
                        >
                          <Edit size={18} strokeWidth={2.5} />
                        </button>
                        <button
                          onClick={() =>
                            handleToggleEstatus(s.idSucursal, s.estatus)
                          }
                          title={
                            s.estatus
                              ? "Desactivar Sucursal"
                              : "Activar Sucursal"
                          }
                          className={`transition-all p-2 rounded-md ${
                            s.estatus
                              ? "text-gray-400 hover:text-red-400 hover:bg-red-400/10"
                              : "text-gray-400 hover:text-emerald-400 hover:bg-emerald-400/10"
                          }`}
                        >
                          {s.estatus ? (
                            <XCircle size={18} strokeWidth={2.5} />
                          ) : (
                            <CheckCircle size={18} strokeWidth={2.5} />
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
                  ? "Detalles de Sucursal"
                  : editingSucursal
                    ? "Editar Sucursal"
                    : "Nueva Sucursal"}
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
                  Nombre *
                </label>
                <input
                  value={formData.nombre}
                  readOnly={isReadOnly}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                  className={`w-full bg-black border border-gray-800 p-3 rounded-lg text-white outline-none focus:border-white transition-all ${isReadOnly ? "opacity-50 cursor-default" : "placeholder-gray-600"}`}
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-500 uppercase mb-2 block tracking-widest">
                  Dirección *
                </label>
                <textarea
                  value={formData.direccion}
                  readOnly={isReadOnly}
                  onChange={(e) =>
                    setFormData({ ...formData, direccion: e.target.value })
                  }
                  className={`w-full bg-black border border-gray-800 p-3 rounded-lg text-white outline-none focus:border-white transition-all ${isReadOnly ? "opacity-50 cursor-default" : "placeholder-gray-600"} resize-none`}
                  rows="2"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase mb-2 block tracking-widest">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.telefono}
                    readOnly={isReadOnly}
                    onChange={(e) =>
                      setFormData({ ...formData, telefono: e.target.value })
                    }
                    className={`w-full bg-black border border-gray-800 p-3 rounded-lg text-white outline-none focus:border-white transition-all ${isReadOnly ? "opacity-50 cursor-default" : "placeholder-gray-600"}`}
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase mb-2 block tracking-widest">
                    Encargado (Admin)
                  </label>
                  <select
                    value={formData.idUsuario}
                    disabled={isReadOnly}
                    onChange={(e) =>
                      setFormData({ ...formData, idUsuario: e.target.value })
                    }
                    className={`w-full bg-black border border-gray-800 p-3 rounded-lg text-white outline-none focus:border-white transition-all ${isReadOnly ? "opacity-50 cursor-default appearance-none" : ""}`}
                  >
                    <option value="">-- Seleccionar --</option>
                    {encargadosDisponibles.map((u) => (
                      <option key={u.idUsuario} value={u.idUsuario}>
                        {u.nombreCompleto}
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
                      : editingSucursal
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

export default Sucursales;
