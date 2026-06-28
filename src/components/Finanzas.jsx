import React, { useEffect, useState } from "react";
import { finanzasService } from "../api/finanzas";
import { ordenesService } from "../api/ordenes";
import { clientesService } from "../api/clientes";

const Finanzas = () => {
  const [form, setForm] = useState({
    descripcion: "",
    costoInversion: "0",
    ingresosTotales: "",
  });

  const [historial, setHistorial] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [tipoCambio, setTipoCambio] = useState(null);
  const [reporte, setReporte] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roiObjetivo, setRoiObjetivo] = useState("0");
  const [pvRequerido, setPvRequerido] = useState(0);
  const [cvMaximo, setCvMaximo] = useState(0);

  const getNumero = (valor) => Number.parseFloat(valor || 0) || 0;
  const getSaldoPendiente = (orden) =>
    Math.max(0, getNumero(orden.costoTotal) - getNumero(orden.montoAbonado));

  const ordenesPendientes = ordenes
    .filter((orden) => getSaldoPendiente(orden) > 0)
    .sort((a, b) => getSaldoPendiente(b) - getSaldoPendiente(a));

  const totalSaldoPendiente = ordenesPendientes.reduce(
    (acc, orden) => acc + getSaldoPendiente(orden),
    0,
  );

  useEffect(() => {
    inicializar();
  }, []);

  const inicializar = async () => {
    try {
      setLoading(true);

      const [finanzas, ordenesData, clientesData, tasa, reporteData] =
        await Promise.all([
          finanzasService.listar(),
          ordenesService.listar(),
          clientesService.listar(),
          finanzasService.obtenerTipoCambio(),
          finanzasService.reporte(),
        ]);

      setHistorial(finanzas || []);
      setOrdenes(ordenesData || []);
      setClientes(clientesData || []);
      setTipoCambio(tasa);
      setReporte(reporteData);
    } catch {
      setError("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOrden = (value) => {
    setForm((prev) => ({ ...prev, descripcion: value }));

    if (!value) {
      setForm((prev) => ({ ...prev, ingresosTotales: "" }));
      return;
    }

    const match = value.match(/Orden #(\d+)/);
    if (!match) {
      setForm((prev) => ({ ...prev, ingresosTotales: "" }));
      return;
    }

    const id = parseInt(match[1], 10);
    const orden = ordenes.find((o) => o.idOrden === id);

    setForm((prev) => ({
      ...prev,
      ingresosTotales: orden?.costoTotal || "",
    }));
  };

  const validar = () => {
    const costo = parseFloat(form.costoInversion);
    const ingresos = parseFloat(form.ingresosTotales);

    if (!form.descripcion) return "Selecciona una orden";
    if (Number.isNaN(costo) || Number.isNaN(ingresos))
      return "Valores inválidos";
    if (costo <= 0) return "El costo de venta debe ser positivo";
    if (ingresos <= 0)
      return "El ingreso (precio de venta) debe ser mayor que cero";

    return null;
  };

  const handleCalcularObjetivo = () => {
    const costoVacio = form.costoInversion === "";
    const ingresosVacio = form.ingresosTotales === "";
    const roiVacio = roiObjetivo === "";

    if (roiVacio || costoVacio || ingresosVacio) {
      setPvRequerido(0);
      setCvMaximo(0);
      setError("");
      return;
    }

    setPvRequerido(0);
    setCvMaximo(0);

    const costo = parseFloat(form.costoInversion);
    const ingresos = parseFloat(form.ingresosTotales);
    const roi = parseFloat(roiObjetivo);

    if (Number.isNaN(roi) || roi < 0 || roi > 100) {
      setError("ROI objetivo inválido (0-100)");
      return;
    }

    if (roi === 100) {
      setPvRequerido("No aplica");
      setCvMaximo(0);
      setError("");
      return;
    }

    if (!Number.isNaN(costo) && costo > 0) {
      const pvReq = costo / (1 - roi / 100);
      setPvRequerido(+pvReq.toFixed(2));
    }

    if (!Number.isNaN(ingresos) && ingresos > 0) {
      const cvMax = ingresos * (1 - roi / 100);
      setCvMaximo(+cvMax.toFixed(2));
    }

    setError("");
  };

  useEffect(() => {
    if (roiObjetivo === "") {
      setPvRequerido(null);
      setCvMaximo(null);
      setError("");
      return;
    }

    handleCalcularObjetivo();
  }, [roiObjetivo, form.costoInversion, form.ingresosTotales]);

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const errorValidacion = validar();
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }

    setIsSubmitting(true);

    const costo = parseFloat(form.costoInversion);
    const ingresos = parseFloat(form.ingresosTotales);

    const gananciaNeta = ingresos - costo;
    const roi = ingresos !== 0 ? ((ingresos - costo) / ingresos) * 100 : 0;

    const payload = {
      descripcion: form.descripcion,
      gananciaNeta: +gananciaNeta.toFixed(2),
      costoInversion: costo,
      roi: +roi.toFixed(2),
    };

    try {
      await finanzasService.crear(payload);
      setForm({ descripcion: "", costoInversion: "0", ingresosTotales: "" });
      await inicializar();
    } catch {
      setError("Error al guardar");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p className="mt-10 text-center text-gray-400">Cargando datos...</p>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Finanzas
          </h1>
          <p className="max-w-2xl text-sm text-gray-400 sm:text-base">
            Revisa el resumen financiero, registra nuevas inversiones y da
            seguimiento a las órdenes que aún tienen saldo pendiente.
          </p>
        </div>

        {reporte && (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-white/5 bg-[#111] p-4 shadow-sm">
              <p className="text-[11px] uppercase tracking-wide text-gray-400">
                Ventas Totales
              </p>
              <h2 className="mt-2 text-lg font-bold leading-tight text-green-400">
                ${reporte.totalVentas.toLocaleString()}
              </h2>
            </div>

            <div className="rounded-xl border border-white/5 bg-[#111] p-4 shadow-sm">
              <p className="text-[11px] uppercase tracking-wide text-gray-400">
                Inversión
              </p>
              <h2 className="mt-2 text-lg font-bold leading-tight text-red-400">
                ${reporte.totalInversion.toLocaleString()}
              </h2>
            </div>

            <div className="rounded-xl border border-white/5 bg-[#111] p-4 shadow-sm">
              <p className="text-[11px] uppercase tracking-wide text-gray-400">
                ROI Promedio
              </p>
              <h2 className="mt-2 text-lg font-bold leading-tight text-indigo-400">
                {reporte.promedioROI.toFixed(2)}%
              </h2>
            </div>
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-xl bg-[#111] p-6 shadow-md">
            <h2 className="mb-4 text-lg font-semibold">Nueva inversión</h2>

            <form onSubmit={handleGuardar} className="space-y-4">
              <select
                value={form.descripcion}
                onChange={(e) => handleSelectOrden(e.target.value)}
                className="w-full rounded-lg border border-gray-800 bg-black p-3 text-white outline-none transition-all focus:border-white"
              >
                <option value="">Selecciona orden</option>
                {ordenes.map((o) => {
                  const clienteNombre =
                    clientes.find((c) => c.idCliente === o.idCliente)
                      ?.nombreCompleto || "Sin cliente";
                  const label = `Orden #${o.idOrden} - ${clienteNombre}`;
                  const value = `Orden #${o.idOrden} - ${clienteNombre}`;

                  return (
                    <option key={o.idOrden} value={value}>
                      {label}
                    </option>
                  );
                })}
              </select>

              <input
                type="number"
                value={form.ingresosTotales}
                readOnly
                className="w-full rounded bg-[#222] p-3 text-gray-400"
              />

              <input
                type="number"
                value={form.costoInversion}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    costoInversion: e.target.value,
                  }))
                }
                placeholder="Costo de venta"
                className="w-full rounded border border-[#333] bg-[#0a0a0a] p-3"
              />

              <button className="w-full rounded bg-indigo-600 p-3 font-semibold hover:bg-indigo-700">
                {isSubmitting ? "Guardando..." : "Guardar"}
              </button>
            </form>

            {error && <p className="mt-3 text-red-500">{error}</p>}

            <div className="mt-6 border-t border-[#222] pt-4">
              <h3 className="mb-2 text-md font-medium">Meta de rentabilidad</h3>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={roiObjetivo}
                  onChange={(e) => setRoiObjetivo(e.target.value)}
                  placeholder="ROI objetivo (%)"
                  className="w-full rounded border border-[#333] bg-[#0a0a0a] p-2"
                />
              </div>

              <p className="mt-2 text-xs text-gray-400">
                Aquí pones la meta de ganancia que quieres alcanzar en
                porcentaje.
              </p>

              <div className="mt-3 text-sm text-gray-300">
                {pvRequerido !== null && (
                  <div>
                    <strong>PV requerido:</strong> ${pvRequerido}
                    {typeof pvRequerido === "number" && tipoCambio && (
                      <span className="text-xs text-gray-400">
                        {" "}
                        — USD {(pvRequerido * tipoCambio).toFixed(2)}
                      </span>
                    )}
                  </div>
                )}

                {cvMaximo !== null && (
                  <div>
                    <strong>Costo de inversión:</strong> ${cvMaximo}
                    {tipoCambio && (
                      <span className="text-xs text-gray-400">
                        {" "}
                        — USD {(cvMaximo * tipoCambio).toFixed(2)}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-[#111] p-6 shadow-md">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  Órdenes con saldo pendiente
                </h2>
                <p className="text-sm text-gray-400">
                  Aquí ves las órdenes que todavía tienen dinero por cobrar.
                </p>
              </div>

              <div className="text-sm text-gray-300 sm:text-right">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Total por cobrar
                </p>
                <p className="text-xl font-bold text-amber-400">
                  ${totalSaldoPendiente.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">
                  {ordenesPendientes.length} orden(es)
                </p>
              </div>
            </div>

            {ordenesPendientes.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-[#333] text-gray-400">
                    <tr>
                      <th className="py-2 text-left">Orden</th>
                      <th className="py-2 text-left">Cliente</th>
                      <th className="py-2 text-left">Total</th>
                      <th className="py-2 text-left">Abonado</th>
                      <th className="py-2 text-left">Saldo pendiente</th>
                    </tr>
                  </thead>

                  <tbody>
                    {ordenesPendientes.map((orden) => {
                      const clienteNombre =
                        clientes.find(
                          (cliente) => cliente.idCliente === orden.idCliente,
                        )?.nombreCompleto || "Sin cliente";
                      const saldoPendiente = getSaldoPendiente(orden);

                      return (
                        <tr
                          key={orden.idOrden}
                          className="border-b border-[#222] hover:bg-[#1a1a1a]"
                        >
                          <td className="py-2 font-medium">#{orden.idOrden}</td>
                          <td className="py-2">{clienteNombre}</td>
                          <td className="py-2 text-gray-200">
                            ${getNumero(orden.costoTotal).toLocaleString()}
                          </td>
                          <td className="py-2 text-green-400">
                            ${getNumero(orden.montoAbonado).toLocaleString()}
                          </td>
                          <td className="py-2 font-bold text-amber-400">
                            ${saldoPendiente.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                No hay órdenes con saldo pendiente.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-xl bg-[#111] p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold">Historial</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-[#333] text-gray-400">
                <tr>
                  <th className="py-2 text-left">Orden</th>
                  <th className="py-2 text-left">Cliente</th>
                  <th className="py-2 text-left">Costo</th>
                  <th className="py-2 text-left">Beneficio</th>
                  <th className="py-2 text-left">ROI</th>
                </tr>
              </thead>

              <tbody>
                {historial.map((item) => {
                  const match = (item.descripcion || "").match(
                    /Orden #(\d+)(?: - (.*))?/,
                  );
                  const ordenId = match ? match[1] : item.descripcion;
                  const clienteNombre =
                    match && match[2] ? match[2] : "Sin cliente";

                  return (
                    <tr
                      key={item.id}
                      className="border-b border-[#222] hover:bg-[#1a1a1a]"
                    >
                      <td className="py-2">{ordenId}</td>
                      <td className="py-2">{clienteNombre}</td>

                      <td className="py-2 text-red-400">
                        ${item.costoInversion}
                        {tipoCambio && (
                          <div className="text-xs text-gray-400">
                            USD {(item.costoInversion * tipoCambio).toFixed(2)}
                          </div>
                        )}
                      </td>

                      <td className="py-2 text-green-400">
                        ${item.gananciaNeta}
                        {tipoCambio && (
                          <div className="text-xs text-gray-400">
                            USD {(item.gananciaNeta * tipoCambio).toFixed(2)}
                          </div>
                        )}
                      </td>

                      <td
                        className={`py-2 font-bold ${item.roi >= 0 ? "text-green-400" : "text-red-400"}`}
                      >
                        {item.roi}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finanzas;
