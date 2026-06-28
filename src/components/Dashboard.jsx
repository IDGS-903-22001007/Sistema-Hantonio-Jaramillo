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
  AlertTriangle,
  Cake,
  FileText,
  UserPlus,
  Building,
  CalendarDays,
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
// NUEVO: Importamos el servicio de sucursales
import { sucursalesService } from "../api/sucursales";
import { useAuth } from "../context/AuthContext";

const CATALOGO_TRAJES = {
  1: "Dos piezas",
  2: "Tres piezas",
  3: "Saco",
  4: "Pantalón",
  5: "Chaleco",
  6: "Camisa",
  7: "Frac",
  8: "Chaque",
  9: "Smoking",
  10: "Zapatos",
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
  const [rawData, setRawData] = useState({
    clientes: [],
    ordenes: [],
    usuarios: [],
  });

  // NUEVO: Estado para guardar la lista de sucursales
  const [sucursales, setSucursales] = useState([]);

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

  // Estados para los filtros
  const [filtroMes, setFiltroMes] = useState(new Date().getMonth().toString());
  const [filtroAnio, setFiltroAnio] = useState(
    new Date().getFullYear().toString(),
  );
  // NUEVO: Filtro de sucursal (por defecto "todos")
  const [filtroSucursal, setFiltroSucursal] = useState("todos");

  const anioActual = new Date().getFullYear();
  const aniosDisponibles = [anioActual, anioActual - 1, anioActual - 2];

  // 1. CARGA INICIAL DE DATOS DESDE LA API
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // MODIFICADO: Si es admin, trae todas las órdenes y sucursales. Si no, solo las de su sucursal.
        const [clientesData, ordenesData, usuariosData, sucursalesData] =
          await Promise.all([
            clientesService.listar(),
            user?.rol === "Administrador"
              ? ordenesService.listar() // Asumiendo que listar() trae todas las órdenes
              : ordenesService.listarPorSucursal(user?.idSucursal || 0),
            user?.rol === "Administrador"
              ? usuariosService.listar()
              : Promise.resolve([]),
            user?.rol === "Administrador"
              ? sucursalesService.listar()
              : Promise.resolve([]),
          ]);

        setSucursales(sucursalesData);
        setRawData({
          clientes: clientesData,
          ordenes: ordenesData,
          usuarios: usuariosData,
        });
      } catch (err) {
        console.error("Error cargando estadísticas:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchAllData();
  }, [user]);

  // 2. PROCESAMIENTO Y FILTRADO DE DATOS LOCAL
  useEffect(() => {
    const { clientes, ordenes, usuarios } = rawData;
    if (!clientes || !ordenes) return;

    const ahora = new Date();
    const hoyMidnight = new Date(
      ahora.getFullYear(),
      ahora.getMonth(),
      ahora.getDate(),
    );

    // --- FILTRAR ÓRDENES POR MES, AÑO Y SUCURSAL ---
    const ordenesFiltradas = ordenes.filter((o) => {
      // Validar Sucursal
      const matchSucursal =
        filtroSucursal === "todos" || o.idSucursal === parseInt(filtroSucursal);

      // Si se selecciona "todos" en fecha y coincide la sucursal
      if (filtroAnio === "todos" && filtroMes === "todos") return matchSucursal;

      const dateStr =
        o.fechaCreacion || o.fechaCitaMedidas || o.fechaEventoEntrega;
      if (!dateStr) return false;

      const d = new Date(dateStr);
      const matchAnio =
        filtroAnio === "todos" || d.getFullYear().toString() === filtroAnio;
      const matchMes =
        filtroMes === "todos" || d.getMonth().toString() === filtroMes;

      return matchAnio && matchMes && matchSucursal;
    });

    const pendientes = ordenesFiltradas.filter((o) => o.idEstatus === 1).length;

    const totalVentas = ordenesFiltradas.reduce(
      (acc, o) => acc + (o.costoTotal || 0),
      0,
    );
    const totalAbonado = ordenesFiltradas.reduce(
      (acc, o) => acc + (o.montoAbonado || 0),
      0,
    );
    const saldoPendiente = totalVentas - totalAbonado;

    // Próximas citas (Aplicando también el filtro de sucursal para mayor congruencia)
    const proximasCitas = ordenes
      .filter((o) => {
        const matchSucursal =
          filtroSucursal === "todos" ||
          o.idSucursal === parseInt(filtroSucursal);
        return (
          matchSucursal &&
          o.fechaCitaMedidas &&
          new Date(o.fechaCitaMedidas) >= ahora
        );
      })
      .sort(
        (a, b) => new Date(a.fechaCitaMedidas) - new Date(b.fechaCitaMedidas),
      )
      .slice(0, 5);

    // --- LÓGICA CORREGIDA PARA CONTEO DE PRENDAS INDIVIDUALES ---
    const conteoPrendas = {
      Saco: 0,
      Pantalón: 0,
      Chaleco: 0,
      Camisa: 0,
      Zapatos: 0,
    };

    ordenesFiltradas.forEach((orden) => {
      const tipo = orden.idTipoTraje;

      // Saco: Viene en Dos piezas(1), Tres piezas(2), Saco(3), Frac(7), Chaque(8), Smoking(9) o si se agregó manualmente
      if (
        [1, 2, 3, 7, 8, 9].includes(tipo) ||
        orden.tieneSaco ||
        orden.detallesSaco ||
        orden.precio_saco > 0
      ) {
        conteoPrendas["Saco"]++;
      }

      // Pantalón: Viene en Dos piezas(1), Tres piezas(2), Pantalón(4), Frac(7), Chaque(8), Smoking(9) o si se agregó
      if (
        [1, 2, 4, 7, 8, 9].includes(tipo) ||
        orden.tienePantalon ||
        orden.detallesPantalon ||
        orden.precio_pantalon > 0
      ) {
        conteoPrendas["Pantalón"]++;
      }

      // Chaleco: Viene en Tres piezas(2), Chaleco(5), Chaque(8) o si se agregó
      if (
        [2, 5, 8].includes(tipo) ||
        orden.tieneChaleco ||
        orden.detallesChaleco ||
        orden.precio_chaleco > 0
      ) {
        conteoPrendas["Chaleco"]++;
      }

      // Camisa: Viene sola (6) o si se agregó como extra
      if (
        tipo === 6 ||
        orden.tieneCamisa ||
        orden.detallesCamisa ||
        orden.precio_camisa > 0
      ) {
        conteoPrendas["Camisa"]++;
      }

      // Zapatos: Vienen solos (10) o si se agregaron como extra
      if (
        tipo === 10 ||
        orden.tieneZapato ||
        orden.detallesZapato ||
        orden.precio_zapato > 0
      ) {
        conteoPrendas["Zapatos"]++;
      }
    });

    // Formatear para la gráfica (solo mostramos las prendas que tengan al menos 1 solicitud)
    const trajesData = Object.keys(conteoPrendas)
      .filter((key) => conteoPrendas[key] > 0)
      .map((key) => ({
        name: key,
        value: conteoPrendas[key],
      }))
      .sort((a, b) => b.value - a.value);

    let proximosCumples = [];
    if (clientes.length > 0) {
      proximosCumples = clientes
        .filter((c) => c.fechaNacimiento)
        .map((c) => {
          const [year, month, day] = c.fechaNacimiento.split("T")[0].split("-");
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
        .filter((c) => c.diasRestantes <= 30)
        .sort((a, b) => a.diasRestantes - b.diasRestantes);
    }

    setStats({
      clientes: clientes.length,
      usuarios: usuarios.length,
      ordenes: ordenesFiltradas.length,
      pendientes,
      totalVentas,
      totalAbonado,
      saldoPendiente,
      proximasCitas,
      trajesData,
      proximosCumples,
    });
  }, [rawData, filtroMes, filtroAnio, filtroSucursal]); // NUEVO: Añadido filtroSucursal a las dependencias

  const mainCards = [
    {
      to: "/clientes",
      title: "Clientes (Total)",
      count: stats.clientes,
      icon: Users,
      color: "text-blue-500",
    },
    {
      to: "/ordenes",
      title: "Órdenes (Periodo)",
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
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto min-h-screen text-white">
      {/* HEADER Y FILTROS */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Panel de Control
          </h1>
          <p className="text-gray-400 mt-1">
            Hola, {user?.nombreCompleto || user?.login || "Usuario"}
          </p>
        </div>

        {/* Controles de Filtro Compactos (Misma fila) */}
        <div className="flex items-center gap-3 bg-[#18181b] border border-gray-800 p-1.5 rounded-xl shadow-2xl flex-wrap">
          <div className="flex items-center gap-2 px-3 py-2 text-gray-400 border-r border-gray-800">
            <CalendarDays size={18} className="text-blue-500" />
            <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">
              Filtros
            </span>
          </div>

          <div className="flex gap-1 items-center flex-wrap">
            {/* Select de Mes */}
            <div className="relative group">
              <select
                value={filtroMes}
                onChange={(e) => setFiltroMes(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 bg-transparent text-gray-300 hover:text-white transition-colors text-sm font-medium outline-none cursor-pointer min-w-[140px]"
              >
                <option value="todos" className="bg-[#18181b]">
                  Todos los meses
                </option>
                {[
                  "Enero",
                  "Febrero",
                  "Marzo",
                  "Abril",
                  "Mayo",
                  "Junio",
                  "Julio",
                  "Agosto",
                  "Septiembre",
                  "Octubre",
                  "Noviembre",
                  "Diciembre",
                ].map((mes, i) => (
                  <option key={i} value={i} className="bg-[#18181b]">
                    {mes}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-hover:text-white transition-colors">
                <Clock size={14} />
              </div>
            </div>

            <div className="w-[1px] h-4 bg-gray-800 mx-1"></div>

            {/* Select de Año */}
            <div className="relative group">
              <select
                value={filtroAnio}
                onChange={(e) => setFiltroAnio(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2 bg-transparent text-gray-300 hover:text-white transition-colors text-sm font-medium outline-none cursor-pointer min-w-[110px]"
              >
                <option value="todos" className="bg-[#18181b]">
                  Todo
                </option>
                {aniosDisponibles.map((a) => (
                  <option key={a} value={a} className="bg-[#18181b]">
                    {a}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-hover:text-white transition-colors">
                <TrendingUp size={14} />
              </div>
            </div>

            {/* NUEVO: Select de Sucursal (Solo visible para el Administrador) */}
            {user?.rol === "Administrador" && (
              <>
                <div className="w-[1px] h-4 bg-gray-800 mx-1"></div>
                <div className="relative group">
                  <select
                    value={filtroSucursal}
                    onChange={(e) => setFiltroSucursal(e.target.value)}
                    className="appearance-none pl-4 pr-10 py-2 bg-transparent text-gray-300 hover:text-white transition-colors text-sm font-medium outline-none cursor-pointer min-w-[170px]"
                  >
                    <option value="todos" className="bg-[#18181b]">
                      Todas las sucursales
                    </option>
                    {sucursales.map((s) => (
                      <option
                        key={s.idSucursal}
                        value={s.idSucursal}
                        className="bg-[#18181b]"
                      >
                        {s.nombre}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-hover:text-white transition-colors">
                    <Building size={14} />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#18181b] border border-gray-800 p-6 rounded-xl relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-gray-500 text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <TrendingUp size={14} /> Ingresos Proyectados (Periodo)
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
            <Clock size={14} /> Saldo por Cobrar (Periodo)
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
                <AlertTriangle size={16} /> Atención Requerida
              </h3>
              <p className="text-sm mt-2 text-amber-200/80">
                Hay{" "}
                <span className="font-bold text-white">{stats.pendientes}</span>{" "}
                órdenes en estatus pendiente en el periodo seleccionado.
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
                más solicitadas (Periodo)
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
                    No hay datos suficientes para la gráfica en este periodo.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Alertas y Accesos Rápidos */}
        <div className="lg:col-span-2 space-y-8">
          {/* LISTA DE CUMPLEAÑOS PRÓXIMOS */}
          {stats.proximosCumples && stats.proximosCumples.length > 0 && (
            <div className="bg-[#18181b] border border-gray-800 p-6 rounded-xl">
              <h2 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="bg-purple-500/20 p-1.5 rounded text-purple-400">
                  <Cake size={18} />
                </span>{" "}
                Próximos Cumpleaños
              </h2>

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

          {/* Accesos Rápidos (Cambio a iconos de Lucide) */}
          <div className="bg-[#18181b] border border-gray-800 p-6 rounded-xl">
            <h2 className="text-sm font-black uppercase tracking-widest pb-4 mb-4 border-b border-gray-800 ">
              Acciones Rápidas
            </h2>
            <div className="grid grid-cols-1 gap-3">
              <Link
                to="/ordenes"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-gray-800 transition-all text-sm group"
              >
                <div className="bg-blue-500/20 text-blue-400 p-2 rounded group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <FileText size={18} />
                </div>
                Nueva Orden
              </Link>
              <Link
                to="/clientes"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-gray-800 transition-all text-sm group"
              >
                <div className="bg-green-500/20 text-green-400 p-2 rounded group-hover:bg-green-500 group-hover:text-white transition-colors">
                  <UserPlus size={18} />
                </div>
                Agregar Cliente
              </Link>
              {user?.rol === "Administrador" && (
                <>
                  <Link
                    to="/usuarios"
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-gray-800 transition-all text-sm group"
                  >
                    <div className="bg-yellow-500/20 text-yellow-500 p-2 rounded group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                      <UserCheck size={18} />
                    </div>
                    Agregar Usuario
                  </Link>
                  <Link
                    to="/sucursales"
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-gray-800 transition-all text-sm group"
                  >
                    <div className="bg-purple-500/20 text-purple-400 p-2 rounded group-hover:bg-purple-500 group-hover:text-white transition-colors">
                      <Building size={18} />
                    </div>
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
