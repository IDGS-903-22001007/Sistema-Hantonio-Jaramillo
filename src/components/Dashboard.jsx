import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  ClipboardList,
  UserCheck,
  TrendingUp,
  Clock,
  ArrowRight,
  DollarSign,
  BarChart3 as BarChartIcon,
  MessageCircle,
} from "lucide-react";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";

import { clientesService } from "../api/clientes";
import { ordenesService } from "../api/ordenes";
import { usuariosService } from "../api/usuarios";
import { useAuth } from "../context/AuthContext";

const CATALOGO_TRAJES = {
  1: "Dos piezas",
  2: "Tres piezas",
  3: "Saco",
  4: "Pantalón",
  5: "Chaleco",
  6: "Camisa",
};

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#ec4899",
];

const Dashboard = () => {
  const [stats, setStats] = useState({
    clientes: 0,
    ordenes: 0,
    usuarios: 0,
    pendientes: 0,
    totalVentas: 0,
    totalAbonado: 0,
    saldoPendiente: 0,
    proximasCitas: [],
    trajesData: [],
    proximosCumples: [],
  });

  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const [clientes, ordenes, usuarios] = await Promise.all([
          clientesService.listar(),
          ordenesService.listarPorSucursal(user?.idSucursal || 0),
          user?.rol === "Administrador"
            ? usuariosService.listar()
            : Promise.resolve([]),
        ]);

        const ahora = new Date();
        const hoyMidnight = new Date(
          ahora.getFullYear(),
          ahora.getMonth(),
          ahora.getDate(),
        );

        const pendientes = ordenes.filter((o) => o.idEstatus === 1).length;

        const totalVentas = ordenes.reduce(
          (acc, o) => acc + (o.costoTotal || 0),
          0,
        );
        const totalAbonado = ordenes.reduce(
          (acc, o) => acc + (o.montoAbonado || 0),
          0,
        );
        const saldoPendiente = totalVentas - totalAbonado;

        const proximasCitas = ordenes
          .filter(
            (o) => o.fechaCitaMedidas && new Date(o.fechaCitaMedidas) >= ahora,
          )
          .sort(
            (a, b) =>
              new Date(a.fechaCitaMedidas) - new Date(b.fechaCitaMedidas),
          )
          .slice(0, 5);

        const conteoTrajes = ordenes.reduce((acc, orden) => {
          const nombreTraje =
            orden.tipoTraje?.descripcion ||
            CATALOGO_TRAJES[orden.idTipoTraje] ||
            `Desconocido (${orden.idTipoTraje})`;

          acc[nombreTraje] = (acc[nombreTraje] || 0) + 1;
          return acc;
        }, {});

        const trajesData = Object.keys(conteoTrajes)
          .map((key) => ({
            name: key,
            value: conteoTrajes[key],
          }))
          .sort((a, b) => b.value - a.value);

        // --- LÓGICA DE LISTA DE CUMPLEAÑOS ---
        let proximosCumples = [];
        if (clientes.length > 0) {
          proximosCumples = clientes
            .filter((c) => c.fechaNacimiento)
            .map((c) => {
              const [year, month, day] = c.fechaNacimiento
                .split("T")[0]
                .split("-");
              let cumpleEsteAno = new Date(
                ahora.getFullYear(),
                parseInt(month) - 1,
                parseInt(day),
              );

              if (cumpleEsteAno < hoyMidnight) {
                cumpleEsteAno.setFullYear(ahora.getFullYear() + 1);
              }

              const diffTime = cumpleEsteAno - hoyMidnight;
              const diasRestantes = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

              return {
                ...c,
                diasRestantes,
                fechaLabel: cumpleEsteAno.toLocaleDateString("es-MX", {
                  day: "numeric",
                  month: "long",
                }),
              };
            })
            .filter((c) => c.diasRestantes <= 30) // Traemos todos los de los próximos 30 días
            .sort((a, b) => a.diasRestantes - b.diasRestantes); // Ordenados por cercanía
        }

        setStats({
          clientes: clientes.length,
          ordenes: ordenes.length,
          usuarios: usuarios.length,
          pendientes,
          totalVentas,
          totalAbonado,
          saldoPendiente,
          proximasCitas,
          trajesData,
          proximosCumples, // Guardamos toda la lista
        });
      } catch (err) {
        console.error("Error cargando estadísticas:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchStats();
  }, [user]);

  const mainCards = [
    {
      to: "/clientes",
      title: "Clientes",
      count: stats.clientes,
      icon: Users,
      color: "text-blue-500",
    },
    {
      to: "/ordenes",
      title: "Órdenes",
      count: stats.ordenes,
      icon: ClipboardList,
      color: "text-green-500",
    },
    {
      to: "/usuarios",
      title: "Usuarios",
      count: stats.usuarios,
      icon: UserCheck,
      color: "text-orange-500",
    },
  ];

  if (loading) {
    return (
      <div className="p-6 lg:p-8 min-h-screen bg-[#09090b] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-gray-800 border-t-white rounded-full animate-spin"></div>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
            Cargando Panel...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto bg-[#09090b] min-h-screen text-white">
      <div className="mb-8 pb-6 border-b border-gray-800 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Panel de Control
          </h1>
          <p className="text-gray-400 mt-1">
            Sucursal: {user?.nombreSucursal || "Matriz"}
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-sm text-gray-400">Fecha Actual</p>
          <p className="font-mono font-bold">
            {new Date().toLocaleDateString("es-MX", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#18181b] border border-gray-800 p-6 rounded-xl relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-gray-500 text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <TrendingUp size={14} /> Ingresos Proyectados
            </p>
            <p className="text-4xl font-bold mt-2">
              ${stats.totalVentas.toLocaleString()}
            </p>
            <div className="mt-4 h-2 w-full bg-gray-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-1000"
                style={{
                  width: `${(stats.totalAbonado / (stats.totalVentas || 1)) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-gray-500 text-xs mt-3">
              Cobrado:{" "}
              <span className="text-white font-bold">
                ${stats.totalAbonado.toLocaleString()}
              </span>
            </p>
          </div>
          <DollarSign
            className="absolute -right-4 -bottom-4 text-white/5"
            size={120}
          />
        </div>
        <div className="bg-[#18181b] border border-gray-800 p-6 rounded-xl border-l-amber-500 border-l-4">
          <p className="text-amber-500 text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <Clock size={14} /> Saldo por Cobrar
          </p>
          <p className="text-4xl font-bold mt-2">
            ${stats.saldoPendiente.toLocaleString()}
          </p>
          <p className="text-gray-500 text-xs mt-4 italic">
            Pendiente de liquidación por clientes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {mainCards.map((card) => (
              <Link
                key={card.to}
                to={card.to}
                className="bg-[#18181b] border border-gray-800 p-5 rounded-xl hover:border-white transition-colors group"
              >
                <div className="flex justify-between items-start">
                  <card.icon className={`${card.color}`} size={24} />
                  <ArrowRight
                    size={16}
                    className="text-gray-600 group-hover:text-white transition-all"
                  />
                </div>
                <p className="text-2xl font-bold mt-3">{card.count}</p>
                <p className="text-gray-500 text-xs uppercase font-bold">
                  {card.title}
                </p>
              </Link>
            ))}
          </div>

          {stats.pendientes > 0 && (
            <div className="bg-amber-500/10 border border-amber-500/20 p-5 rounded-xl">
              <h3 className="text-amber-500 font-bold flex items-center gap-2 uppercase text-xs tracking-tighter">
                ⚠️ Atención Requerida
              </h3>
              <p className="text-sm mt-2 text-amber-200/80">
                Hay{" "}
                <span className="font-bold text-white">{stats.pendientes}</span>{" "}
                órdenes en estatus pendiente.
              </p>
              <Link
                to="/ordenes"
                className="mt-4 block text-center bg-amber-500 text-black font-bold py-2 rounded-lg text-xs uppercase hover:bg-amber-400 transition-colors"
              >
                Revisar Ahora
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#18181b] border border-gray-800 rounded-xl overflow-hidden flex flex-col p-5 md:col-span-2 lg:col-span-1 xl:col-span-2">
              <h2 className="font-bold flex items-center gap-2 uppercase text-sm tracking-widest border-b border-gray-800 pb-4 mb-4">
                <BarChartIcon size={18} className="text-purple-500" /> Prendas
                más solicitadas
              </h2>
              <div className="flex-1 min-h-[250px] flex items-center justify-center">
                {stats.trajesData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart
                      data={stats.trajesData}
                      margin={{ top: 25, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#27272a"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        stroke="#9ca3af"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#9ca3af"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        <LabelList
                          dataKey="value"
                          position="top"
                          fill="#ffffff"
                          fontSize={14}
                          offset={10}
                          fontWeight="bold"
                        />
                        {stats.trajesData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-gray-500 italic text-sm">
                    No hay datos suficientes para la gráfica.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Alertas y Accesos Rápidos */}
        <div className="space-y-6">
          {/* LISTA DE CUMPLEAÑOS PRÓXIMOS */}
          {/* LISTA DE CUMPLEAÑOS PRÓXIMOS */}
          {stats.proximosCumples && stats.proximosCumples.length > 0 && (
            <div className="bg-[#18181b] border border-gray-800 p-6 rounded-xl">
              <h2 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="bg-purple-500/20 p-1.5 rounded text-lg">
                  🎂
                </span>{" "}
                Próximos Cumpleaños
              </h2>

              {/* Contenedor con scroll para evitar que crezca demasiado */}
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {stats.proximosCumples.map((cumple, index) => (
                  <div
                    key={index}
                    className="bg-white/5 border border-gray-800 p-3 rounded-lg flex items-center justify-between hover:bg-white/10 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-bold text-white leading-tight">
                        {cumple.nombreCompleto}
                      </p>
                      <p className="text-gray-400 text-[10px] mt-1">
                        {cumple.fechaLabel} —{" "}
                        <span
                          className={`font-bold ${cumple.diasRestantes === 0 ? "text-purple-400" : "text-gray-300"}`}
                        >
                          {cumple.diasRestantes === 0
                            ? "¡Es hoy!"
                            : `Faltan ${cumple.diasRestantes} días`}
                        </span>
                      </p>
                    </div>

                    {cumple.telefono && (
                      <a
                        href={`https://wa.me/52${cumple.telefono.replace(/\s+/g, "")}?text=¡Hola ${cumple.nombreCompleto.split(" ")[0]}! Queremos desearte un muy feliz cumpleaños de parte de todo el equipo de Hantonio Jaramillo. Esperamos que tengas un día maravilloso lleno de alegría y momentos especiales. ¡Gracias por ser parte de nuestra familia de clientes!`}
                        target="_blank"
                        rel="noreferrer"
                        title="Enviar felicitación por WhatsApp"
                        className="w-9 h-9 flex items-center justify-center bg-green-500/20 hover:bg-green-500 text-green-500 hover:text-white rounded-md transition-all flex-shrink-0"
                      >
                        <MessageCircle size={18} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Accesos Rápidos */}
          <div className="bg-[#18181b] border border-gray-800 p-6 rounded-xl">
            <h2 className="text-sm font-black uppercase tracking-widest mb-4">
              Acciones Rápidas
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <Link
                to="/ordenes"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-gray-800 transition-all text-sm"
              >
                <span className="bg-blue-500/20 p-2 rounded">📋</span> Nueva
                Orden
              </Link>
              <Link
                to="/clientes"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-gray-800 transition-all text-sm"
              >
                <span className="bg-green-500/20 p-2 rounded">👥</span> Agregar
                Cliente
              </Link>
              {user?.rol === "Administrador" && (
                <>
                  <Link
                    to="/usuarios"
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-gray-800 transition-all text-sm"
                  >
                    <span className="bg-yellow-500/20 p-2 rounded">👤</span>{" "}
                    Agregar Usuario
                  </Link>
                  <Link
                    to="/sucursales"
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-gray-800 transition-all text-sm"
                  >
                    <span className="bg-purple-500/20 p-2 rounded">🏢</span>{" "}
                    Agregar Sucursal
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
