import React, { useState, useEffect } from "react";
import { getRoles, createRol, deleteRol } from "../api/roles";
import Alert from "./Alert";
import ConfirmDialog from "./ConfirmDialog";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    rolId: null,
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const { data } = await getRoles();
      setRoles(data);
    } catch (err) {
      setAlert({ type: "error", message: "Error al cargar los roles" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    try {
      // Normalizamos a ADMIN para evitar errores de 403
      const { data } = await createRol({ nombre: nombre.toUpperCase() });
      setRoles([...roles, data]);
      setNombre("");
      setAlert({ type: "success", message: "Rol creado correctamente" });
    } catch (err) {
      const msg =
        err.response?.status === 403
          ? "No tienes permisos de ADMIN"
          : "Error al crear el rol";
      setAlert({ type: "error", message: msg });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRol(id);
      setRoles(roles.filter((r) => r.idRol !== id));
      setAlert({ type: "success", message: "Rol eliminado correctamente" });
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data || "Error al eliminar",
      });
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <Alert
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: "", message: "" })}
      />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, rolId: null })}
        onConfirm={() => handleDelete(confirmDialog.rolId)}
        title="¿Eliminar rol?"
        message="Esta acción no se puede deshacer. Los usuarios asociados podrían perder acceso."
      />

      {/* Header Estilo Clientes */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Gestión de Roles</h1>
        <p className="text-gray-500 mt-1">
          Administra los{" "}
          <span className="font-semibold text-white">{roles.length}</span>{" "}
          niveles de acceso del sistema.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        {/* Formulario Estilo Card */}
        <div className="md:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-bold text-black">Nuevo Rol</h2>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-wider">
                Nombre del Rol
              </label>
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: ADMIN"
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all text-black font-semibold"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 font-bold text-sm transition-all shadow-md active:scale-95"
            >
              + Registrar Rol
            </button>
          </form>
        </div>

        {/* Tabla Estilo Clientes */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-16 text-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-black"></div>
              <p className="text-gray-500 mt-4 text-sm font-medium">
                Cargando roles...
              </p>
            </div>
          ) : roles.length === 0 ? (
            <div className="p-16 text-center">
              <span className="text-5xl mb-4 block text-gray-300">🔐</span>
              <p className="text-gray-600 font-bold text-lg">
                No hay roles registrados
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50 text-gray-600">
                    <th className="text-left p-4 text-xs font-bold uppercase tracking-wider">
                      Nombre del Rol
                    </th>
                    <th className="text-right p-4 text-xs font-bold uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {roles.map((r) => (
                    <tr
                      key={r.idRol}
                      className="hover:bg-gray-50/80 transition-colors group"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {/* Avatar estilo clientes */}
                          <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-xs shadow-sm border border-gray-700 transition-transform group-hover:scale-105">
                            {r.nombre?.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-sm tracking-tight">
                              {r.nombre}
                            </p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">
                              Permiso de Sistema
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              setConfirmDialog({ isOpen: true, rolId: r.idRol })
                            }
                            className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                            title="Eliminar rol"
                          >
                            🗑️
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
      </div>
    </div>
  );
};

export default Roles;
