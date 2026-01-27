import React, { useState, useEffect } from "react";
import {
  getOrdenes,
  createOrden,
  updateOrden,
  deleteOrden,
} from "../api/ordenes";
import { getClientes } from "../api/clientes";
import { getSucursales } from "../api/sucursales";
import Alert from "./Alert";

const Ordenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [formData, setFormData] = useState({
    idCliente: "",
    idSucursal: "",
    fecha: "",
    estado: "Pendiente",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingOrden, setEditingOrden] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [o, c, s] = await Promise.all([
        getOrdenes(),
        getClientes(),
        getSucursales(),
      ]);
      setOrdenes(o.data || []);
      setClientes(c.data || []);
      setSucursales(s.data || []);
    } catch (err) {
      setError("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Construimos el objeto exacto que espera la BD
    const payload = {
      id_cliente: parseInt(formData.id_cliente),
      id_sucursal: parseInt(formData.id_sucursal),
      id_estatus: parseInt(formData.id_estatus),
      fecha_creacion: formData.fecha_creacion,
      incluye_camisa: formData.incluye_camisa ? 1 : 0, // Convertir bool a bit
      // Agrega id_usuario_creador si es necesario
    };

    try {
      if (editingOrden) {
        await updateOrden(editingOrden.id_orden, payload); // Nota: id_orden con guion bajo
        setAlert({ type: "success", message: "Orden actualizada" });
      } else {
        await createOrden(payload);
        setAlert({ type: "success", message: "Orden creada" });
      }
      fetchData(); // Recargar lista
      resetForm();
    } catch (err) {
      console.error("Error detallado:", err.response?.data);
      setAlert({ type: "error", message: "Error en los datos enviados" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar orden?")) return;
    try {
      await deleteOrden(id);
      setOrdenes(ordenes.filter((o) => o.idOrden !== id));
      setAlert({ type: "success", message: "Orden eliminada correctamente" });
    } catch (err) {
      setAlert({ type: "error", message: "Error al eliminar orden" });
      setError("Error al eliminar");
    }
  };

  const resetForm = () => {
    setFormData({
      idCliente: "",
      idSucursal: "",
      fecha: "",
      estado: "Pendiente",
    });
    setEditingOrden(null);
    setShowForm(false);
  };

  const openEdit = (orden) => {
    setFormData({
      idCliente: orden.idCliente || "",
      idSucursal: orden.idSucursal || "",
      fecha: orden.fecha || "",
      estado: orden.estado || "Pendiente",
    });
    setEditingOrden(orden);
    setShowForm(true);
  };

  const statusStyles = {
    Pendiente: "border-yellow-400 text-yellow-600 bg-yellow-50",
    Completada: "border-green-400 text-green-600 bg-green-50",
    Cancelada: "border-red-400 text-red-600 bg-red-50",
  };

  return (
    <div className="p-6 lg:p-8">
      <Alert
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: "", message: "" })}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Órdenes de Trabajo</h1>
          <p className="text-gray-500 mt-1">
            Administra tus{" "}
            <span className="font-semibold text-white">{ordenes.length}</span>{" "}
            órdenes.
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="px-5 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all text-sm"
        >
          + Nueva Orden
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-800 border border-red-200 rounded-lg">
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-black"></div>
            <p className="text-gray-500 mt-4 text-sm">Cargando órdenes...</p>
          </div>
        ) : ordenes.length === 0 ? (
          <div className="p-12 text-center">
            <span className="text-5xl mb-4 block text-gray-400">📋</span>
            <p className="text-gray-600 font-semibold text-lg mb-2">
              No se encontraron órdenes
            </p>
            <p className="text-gray-500 text-sm mb-4">
              Crea tu primera orden de trabajo para verla en la lista.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    # Orden
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                    Sucursal
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                    Fecha
                  </th>
                  <th className="p-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="p-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {ordenes.map((o) => (
                  <tr
                    key={o.idOrden}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-semibold">
                        #{o.idOrden}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-sm text-black">
                      {clientes.find((c) => c.idCliente === o.idCliente)
                        ?.nombreCompleto || "-"}
                    </td>
                    <td className="p-4 text-sm text-gray-600 hidden md:table-cell">
                      {sucursales.find((s) => s.idSucursal === o.idSucursal)
                        ?.nombre || "-"}
                    </td>
                    <td className="p-4 text-sm text-gray-600 hidden lg:table-cell">
                      {o.fecha
                        ? new Date(o.fecha).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "-"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold border ${
                          statusStyles[o.estado] || "border-gray-300"
                        }`}
                      >
                        {o.estado}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => openEdit(o)}
                        className="px-3 py-1 text-sm font-semibold text-black bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors mr-2"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(o.idOrden)}
                        className="px-3 py-1 text-sm font-semibold text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50 transition-colors"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl animate-slideUp">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-black">
                {editingOrden ? "Editar Orden" : "Nueva Orden"}
              </h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cliente *
                    </label>
                    <select
                      value={formData.idCliente}
                      onChange={(e) =>
                        setFormData({ ...formData, idCliente: e.target.value })
                      }
                      className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
                      required
                    >
                      <option value="">Seleccionar Cliente</option>
                      {clientes
                        .filter((c) => c.activo)
                        .map((c) => (
                          <option key={c.idCliente} value={c.idCliente}>
                            {c.nombreCompleto}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sucursal *
                    </label>
                    <select
                      value={formData.idSucursal}
                      onChange={(e) =>
                        setFormData({ ...formData, idSucursal: e.target.value })
                      }
                      className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
                      required
                    >
                      <option value="">Seleccionar Sucursal</option>
                      {sucursales
                        .filter((s) => s.activa)
                        .map((s) => (
                          <option key={s.idSucursal} value={s.idSucursal}>
                            {s.nombre}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha *
                    </label>
                    <input
                      type="date"
                      value={formData.fecha}
                      onChange={(e) =>
                        setFormData({ ...formData, fecha: e.target.value })
                      }
                      className="w-full p-3 text-black border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estado *
                    </label>
                    <select
                      value={formData.estado}
                      onChange={(e) =>
                        setFormData({ ...formData, estado: e.target.value })
                      }
                      className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:border-black transition-all"
                    >
                      <option>Pendiente</option>
                      <option>Completada</option>
                      <option>Cancelada</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-end p-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 text-black rounded-lg hover:bg-gray-100 font-semibold text-sm transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 font-semibold text-sm transition-all"
                >
                  {isSubmitting ? "Guardando..." : "Guardar Orden"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ordenes;
