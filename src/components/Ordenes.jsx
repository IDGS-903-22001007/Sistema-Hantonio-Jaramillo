import React, { useState, useEffect } from "react";
import {
  Scissors,
  Plus,
  Save,
  ChevronDown,
  Eye,
  X,
  Ruler,
  Layers,
  DollarSign,
  Info,
} from "lucide-react";

// --- IMPORTACIÓN DE SERVICIOS ---
import { ordenesService } from "../api/ordenes";
import { clientesService } from "../api/clientes";
import { sucursalesService } from "../api/sucursales";
import { estatusOrdenService } from "../api/estatusOrden";
import { tipoTrajeService } from "../api/tipoTraje";
import { detallesService } from "../api/detalles";
import Alert from "../components/Alert";

import btn1Rana from "../assets/ImagSaco/EstiloBotones/1 boton de rana.png";
import btn1Normal from "../assets/ImagSaco/EstiloBotones/1 boton.png";
import btn1Rolado from "../assets/ImagSaco/EstiloBotones/1 rolado.png";
import btn2Botones from "../assets/ImagSaco/EstiloBotones/2 botones.png";
import btnDoble2en1 from "../assets/ImagSaco/EstiloBotones/doble pecho 2 en 1.png";
import btnDoble6en1 from "../assets/ImagSaco/EstiloBotones/doble pecho 6 en 1.png";
import btnDoble6en2 from "../assets/ImagSaco/EstiloBotones/doble pecho 6 en 2.png";
import btnDoble6en3 from "../assets/ImagSaco/EstiloBotones/doble pecho 6 en 3.png";
import btnDoble2en4 from "../assets/ImagSaco/EstiloBotones/doblepecho 2 en 4.png";

import btRibeteDiamante from "../assets/ImagSaco/EstiloBolsilloTicket/Bolsillo ticket con ribete diamante.png";
import btParche from "../assets/ImagSaco/EstiloBolsilloTicket/Bolsillo ticket de parche.png";
import btInclinadoRibeteDiamante from "../assets/ImagSaco/EstiloBolsilloTicket/Bolsillo ticket inclinado con ribete diamante.png";
import btInclinadoSolapa from "../assets/ImagSaco/EstiloBolsilloTicket/Bolsillo ticket inclinado con solapa.png";
import btInclinadoSinSolapa from "../assets/ImagSaco/EstiloBolsilloTicket/Bolsillo ticket inclinado sin solapa.png";
import btRectoSolapa from "../assets/ImagSaco/EstiloBolsilloTicket/Bolsillo ticket recto con solapa.png";
import btSinSolapaDiamante from "../assets/ImagSaco/EstiloBolsilloTicket/Bolsillo ticket sin solapa diamante.png";

import bpCurvo from "../assets/ImagSaco/EstiloBolsilloPecho/curvo.png";
import bpDobleRibete from "../assets/ImagSaco/EstiloBolsilloPecho/doble ribete.png";
import bpDosDiamante from "../assets/ImagSaco/EstiloBolsilloPecho/Dos bolsillos de parche con flap diamante.png";
import bpParche from "../assets/ImagSaco/EstiloBolsilloPecho/parche.png";
import bpRecto from "../assets/ImagSaco/EstiloBolsilloPecho/recto.png";
import bpUnoDiamante from "../assets/ImagSaco/EstiloBolsilloPecho/un bolsillo de parche con flap diamante.png";
import bpUnRibete from "../assets/ImagSaco/EstiloBolsilloPecho/un ribete 1.2 cm.png";

import bolsilloConSolapaDiamante from "../assets/ImagSaco/EstiloBolsilloInferior/bolsillo con solapa diamante.png";
import bolsillosDeParcheConSolapaCuadrada from "../assets/ImagSaco/EstiloBolsilloInferior/bolsillos de parche con solapa cuadrada.png";
import bolsillosDeParcheConUnPliegue from "../assets/ImagSaco/EstiloBolsilloInferior/bolsillos de parche con un pliegue.png";
import dosBolsillosDeParcheConSolapaDiamante from "../assets/ImagSaco/EstiloBolsilloInferior/dos bolsillos de parche con solapa diamante.png";
import dosBolsillosDeParche from "../assets/ImagSaco/EstiloBolsilloInferior/dos bolsillos de parche.png";
import dosInclinadosConSolapa from "../assets/ImagSaco/EstiloBolsilloInferior/dos inclinados con solapa.png";
import dosInclinadosRibeteados from "../assets/ImagSaco/EstiloBolsilloInferior/dos inclinados ribeteados.png";
import dosInclinadosSinSolapa from "../assets/ImagSaco/EstiloBolsilloInferior/dos inclinados sin solapa.png";
import dosRectosConSolapa from "../assets/ImagSaco/EstiloBolsilloInferior/dos rectos con solapa.png";
import dosRectosRibeteados from "../assets/ImagSaco/EstiloBolsilloInferior/dos rectos ribeteados.png";
import dosRectosSinSolapa from "../assets/ImagSaco/EstiloBolsilloInferior/dos rectos sin solapa.png";

const opcionesBolsilloInferior = [
  { value: "Ninguno", label: "Ninguno", img: null },
  {
    value: "dos rectos sin solapa",
    label: "Dos Rectos sin Solapa",
    img: dosRectosSinSolapa,
  },
  {
    value: "dos rectos ribeteados",
    label: "Dos Rectos Ribeteados",
    img: dosRectosRibeteados,
  },
  {
    value: "dos rectos con solapa",
    label: "Dos Rectos con Solapa",
    img: dosRectosConSolapa,
  },
  {
    value: "dos inclinados sin solapa",
    label: "Dos Inclinados sin Solapa",
    img: dosInclinadosSinSolapa,
  },
  {
    value: "dos inclinados ribeteados",
    label: "Dos Inclinados Ribeteados",
    img: dosInclinadosRibeteados,
  },
  {
    value: "dos inclinados con solapa",
    label: "Dos Inclinados con Solapa",
    img: dosInclinadosConSolapa,
  },
  {
    value: "dos bolsillos de parche",
    label: "Dos Bolsillos de Parche",
    img: dosBolsillosDeParche,
  },
  {
    value: "dos bolsillos de parche con solapa diamante",
    label: "Dos Bolsillos de Parche con Solapa Diamante",
    img: dosBolsillosDeParcheConSolapaDiamante,
  },
  {
    value: "bolsillos de parche con solapa cuadrada",
    label: "Bolsillos de Parche con Solapa Cuadrada",
    img: bolsillosDeParcheConSolapaCuadrada,
  },
  {
    value: "bolsillos de parche con un pliegue",
    label: "Bolsillos de Parche con un Pliegue",
    img: bolsillosDeParcheConUnPliegue,
  },
  {
    value: "bolsillo con solapa diamante",
    label: "Bolsillo con Solapa Diamante",
    img: bolsilloConSolapaDiamante,
  },
];

const opcionesBotones = [
  {
    value: "Ninguno",
    label: "Ninguno",
    img: null,
  },
  {
    value: "1 boton",
    label: "1 Botón",
    img: btn1Normal,
  },
  {
    value: "1 rolado",
    label: "1 Rolado",
    img: btn1Rolado,
  },
  {
    value: "2 botones",
    label: "2 Botones",
    img: btn2Botones,
  },
  {
    value: "doble pecho 2 en 1",
    label: "Doble Pecho 2 en 1",
    img: btnDoble2en1,
  },
  {
    value: "doblepecho 2 en 4",
    label: "Doble Pecho 2 en 4",
    img: btnDoble2en4,
  },
  {
    value: "doble pecho 6 en 1",
    label: "Doble Pecho 6 en 1",
    img: btnDoble6en1,
  },
  {
    value: "doble pecho 6 en 2",
    label: "Doble Pecho 6 en 2",
    img: btnDoble6en2,
  },
  {
    value: "doble pecho 6 en 3",
    label: "Doble Pecho 6 en 3",
    img: btnDoble6en3,
  },
  {
    value: "1 boton de rana",
    label: "1 Botón de Rana",
    img: btn1Rana,
  },
];

const opcionesBolsilloTicket = [
  {
    value: "Ninguno",
    label: "Ninguno",
    img: null,
  },
  {
    value: "Bolsillo ticket recto con solapa",
    label: "Recto c/ Solapa",
    img: btRectoSolapa,
  },
  {
    value: "Bolsillo ticket sin solapa diamante",
    label: "Sin Solapa Diamante",
    img: btSinSolapaDiamante,
  },
  {
    value: "Bolsillo ticket con ribete diamante",
    label: "Ribete Diamante",
    img: btRibeteDiamante,
  },
  {
    value: "Bolsillo ticket inclinado sin solapa",
    label: "Inclinado s/ Solapa",
    img: btInclinadoSinSolapa,
  },
  {
    value: "Bolsillo ticket inclinado con solapa",
    label: "Inclinado c/ Solapa",
    img: btInclinadoSolapa,
  },
  {
    value: "Bolsillo ticket inclinado con ribete diamante",
    label: "Inclinado Ribete Diamante",
    img: btInclinadoRibeteDiamante,
  },
  {
    value: "Bolsillo ticket de parche",
    label: "De Parche",
    img: btParche,
  },
];

const opcionesBolsilloPecho = [
  {
    value: "Ninguno",
    label: "Ninguno",
    img: null,
  },
  {
    value: "Recto Clásico",
    label: "Recto Clásico",
    img: bpRecto,
  },
  {
    value: "Un ribete 1.2 cm",
    label: "Un Ribete 1.2 cm",
    img: bpUnRibete,
  },
  {
    value: "Doble Ribete",
    label: "Doble Ribete",
    img: bpDobleRibete,
  },
  {
    value: "Curvo",
    label: "Curvo",
    img: bpCurvo,
  },
  {
    value: "De Parche",
    label: "De Parche",
    img: bpParche,
  },
  {
    value: "Un bolsillo de parche con flap diamante",
    label: "Un Bolsillo Parche Diamante",
    img: bpUnoDiamante,
  },
  {
    value: "Dos bolsillos de parche con flap diamante",
    label: "Dos Bolsillos Parche Diamante",
    img: bpDosDiamante,
  },
];

// --- CATÁLOGOS ---
const catalogs = {
  orden: {
    metodoPago: ["Efectivo", "Tarjeta", "Transferencia"],
  },
  pantalon: {
    pretina: [
      "Estándar con trabillas",
      "Limpia (Sin trabillas)",
      "Gurkha",
      "Pretina Extendida",
    ],
    ajuste: ["Hebillas Laterales", "Elástico Interno", "Sin Ajuste"],
    altura: ["Cintura Alta", "Cintura Media", "Cintura Baja"],
    pliegues: ["Sin Pliegues (Flat Front)", "1 Pliegue", "2 Pliegues"],
    bolsilloReloj: ["Ninguno", "En Pretina", "Debajo de Pretina"],
    bajos: [
      "Liso (Sin bastilla)",
      "Valvulla (Cuff) 3cm",
      "Valvulla (Cuff) 4cm",
      "Valvulla (Cuff) 5cm",
    ],
  },
  saco: {
    estiloBotones: [
      "1 Botón",
      "2 Botones",
      "3 Botones",
      "Cruzado 4x2",
      "Cruzado 6x2",
    ],
    solapa: ["Muesca (Notch)", "Punta (Peak)", "Chal (Shawl)"],
    tamanoSolapa: ["Estrecha (7cm)", "Regular (8.5cm)", "Ancha (10cm)"],
    bolsilloPecho: [
      "Curvo (Barchetta)",
      "Recto Clásico",
      "De Parche",
      "Ninguno",
    ],
    bolsilloInf: [
      "Rectos con Tapa",
      "Inclinados con Tapa",
      "De Parche",
      "Ribeteado (Jetted)",
    ],
    bolsilloTicket: ["No", "Sí (Lado Derecho)"],
    ojalIzquierdo: [
      "Sin Ojal",
      "Ojal recto real",
      "Ojal redondo real",
      "Ojal recto fantasía",
      "Ojal redondo fantasía",
      "Style A",
      "Style B",
      "Style C",
      "Style D",
      "Style E",
      "Style F",
      "Style G",
      "Style H",
      "Style I",
      "Style J",
      "Style K",
      "Style L",
    ],
    ojalDerecho: [
      "Sin Ojal",
      "Ojal recto real",
      "Ojal redondo real",
      "Ojal recto fantasía",
      "Ojal redondo fantasía",
      "Style A",
      "Style B",
      "Style C",
      "Style D",
      "Style E",
      "Style F",
      "Style G",
      "Style H",
      "Style I",
      "Style J",
      "Style K",
      "Style L",
    ],
  },
  chaleco: {
    cuello: [
      "Sin Cuello (Clásico)",
      "Con Solapa Muesca",
      "Con Solapa Punta",
      "Cuello Mao",
    ],
    botones: [
      "4 Botones",
      "5 Botones",
      "6 Botones",
      "Cruzado 4x2",
      "Cruzado 6x3",
    ],
    bolsilloPecho: ["Ninguno", "Lado Izquierdo (Ribete)", "Ambos Lados"],
    bolsilloInf: [
      "2 Bolsillos de Ribete",
      "2 Bolsillos con Tapa",
      "4 Bolsillos (Double Welt)",
    ],
    terminacion: ["En Punta (V-Shape)", "Recto", "Redondeado"],
  },
  camisa: {
    opcionCamisa: ["Manga Larga", "Manga Corta"],
    cuello: [
      "Inglés",
      "Italiano",
      "Botón (Button-down)",
      "Mao",
      "Ópera (Wing tip)",
    ],
    tapeta: ["Estándar", "Oculta (Francesa)", "Lisa (Sin tapeta)"],
    puno: [
      "Sencillo Botón",
      "Doble Botón",
      "Francés (Para mancuernillas)",
      "Redondeado",
    ],
    bolsillo: [
      "Sin Bolsillo",
      "Clásico Izquierdo",
      "Con Solapa",
      "Doble Bolsillo",
    ],
    pliegues: [
      "Sin Pliegues",
      "Pliegue Central",
      "Pliegues Laterales",
      "Pliegue Frontal",
    ],
  },
  medidas: {
    fits: [
      "Extra Slim Fit",
      "Slim Fit",
      "Modern Fit",
      "Regular Fit",
      "Classic Fit",
      "Loose Fit",
    ],
  },
};

// --- COMPONENTES UI REUTILIZABLES ---
const ImageSelect = ({ label, value, onChange, options }) => {
  const selectedOption = options.find((opt) => opt.value === value);

  // Estado para controlar cuándo se muestra la imagen en pantalla completa
  const [showPreview, setShowPreview] = useState(false);

  const handleSelect = (opt) => {
    // Actualiza el valor en tu formulario
    onChange({ target: { value: opt.value } });
    // Dispara el modal de pantalla completa
    setShowPreview(true);
  };

  return (
    <div className="flex flex-col gap-5 w-full py-4">
      <label className="text-[12px] font-black text-white/70 uppercase tracking-[0.3em] border-l-2 border-white pl-3">
        {label}
      </label>

      {/* 1. CATÁLOGO CON IMÁGENES MÁS GRANDES */}
      <div className="flex flex-wrap gap-6">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => handleSelect(opt)}
            /* Clases actualizadas para mayor tamaño: w-64 h-64 en móvil, hasta w-80 h-80 en monitores grandes */
            className={`relative group rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] flex-shrink-0 w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 ${
              value === opt.value
                ? "ring-4 ring-white shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                : "border border-gray-800 hover:border-gray-400 bg-[#050505]"
            }`}
          >
            <div className="w-full h-full p-6 flex items-center justify-center bg-gradient-to-b from-transparent to-white/[0.02]">
              {opt.img ? (
                <img
                  src={opt.img}
                  alt={opt.label}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <span className="text-xs text-gray-500 font-black uppercase text-center">
                  {opt.label}
                </span>
              )}
            </div>

            <div
              className={`absolute bottom-0 left-0 right-0 py-4 text-[12px] text-center tracking-widest transition-all duration-300 ${
                value === opt.value
                  ? "bg-white text-black font-black"
                  : "bg-black/80 text-gray-400 backdrop-blur-md group-hover:text-white"
              }`}
            >
              {opt.label.toUpperCase()}
            </div>

            {value === opt.value && (
              <div className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-2xl animate-in zoom-in spin-in-12 duration-500">
                <svg
                  className="w-5 h-5 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* ETIQUETA DE SELECCIÓN ACTUAL */}
      {selectedOption && (
        <div className="bg-white/5 self-start px-4 py-2 rounded-full border border-white/10 flex items-center gap-3 animate-in fade-in slide-in-from-left-2 mt-2">
          <span className="text-[10px] font-black text-white/40 uppercase tracking-tighter">
            Seleccionado
          </span>
          <span className="text-[12px] text-white font-bold">
            {selectedOption.label}
          </span>
          {/* Botón para volver a ver la imagen en grande sin cambiar la selección */}
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="ml-2 text-[9px] font-black bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full text-white transition-colors uppercase tracking-widest"
          >
            Ver en grande
          </button>
        </div>
      )}

      {/* 2. MODAL GIGANTE EN FRENTE DE TODO (z-index altísimo) */}
      {showPreview && selectedOption && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-10 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
          {/* Fondo clickeable para cerrar */}
          <button
            onClick={() => setShowPreview(false)}
            className="absolute inset-0 w-full h-full cursor-pointer outline-none"
            title="Cerrar"
          />

          <div className="relative z-10 flex flex-col items-center max-w-5xl w-full animate-in zoom-in-95 duration-500">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors flex items-center gap-2 font-bold tracking-widest text-xs uppercase outline-none"
            >
              Cerrar [X]
            </button>

            {/* Contenedor principal de la imagen en grande */}
            <div className="w-full h-[60vh] md:h-[75vh] bg-gradient-to-b from-white/5 to-transparent rounded-3xl border border-white/10 flex items-center justify-center p-8 md:p-16 shadow-[0_0_100px_rgba(255,255,255,0.05)] relative overflow-hidden pointer-events-none">
              {selectedOption.img ? (
                <img
                  src={selectedOption.img}
                  alt={selectedOption.label}
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                />
              ) : (
                <span className="text-2xl text-gray-500 font-black uppercase tracking-widest">
                  {selectedOption.label}
                </span>
              )}

              {/* Etiqueta flotante dentro del modal */}
              <div className="absolute bottom-8 bg-black/80 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full shadow-2xl">
                <span className="text-white font-black text-lg md:text-2xl tracking-[0.2em] uppercase">
                  {selectedOption.label}
                </span>
              </div>
            </div>

            {/* Botón de Confirmación para cerrar el modal */}
            <button
              onClick={() => setShowPreview(false)}
              className="mt-8 bg-white text-black px-12 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all duration-300 outline-none"
            >
              Confirmar Selección
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Input = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  ...props
}) => (
  <div className="flex flex-col gap-1 w-full">
    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full bg-black border border-gray-800 p-2 text-xs text-white outline-none focus:border-white transition-colors placeholder-gray-700 ${props.readOnly ? "bg-gray-900/50 cursor-not-allowed opacity-70 text-green-400 font-bold" : ""}`}
      {...props}
    />
  </div>
);

const InputReadOnly = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
      {label}
    </label>
    <div className="w-full bg-gray-900/50 border border-gray-700 p-2 text-xs text-gray-300 rounded">
      {value || "—"}
    </div>
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
      {label}
    </label>
    <select
      value={value}
      onChange={onChange}
      className="w-full bg-black border border-gray-800 p-2 text-xs text-white outline-none focus:border-white transition-colors appearance-none"
    >
      <option value="">SELECCIONAR...</option>
      {options.map((opt, i) => (
        <option key={i} value={typeof opt === "object" ? opt.value : opt}>
          {typeof opt === "object" ? opt.label : opt}
        </option>
      ))}
    </select>
  </div>
);

const Section = ({ title, isOpen, onToggle, children, icon: Icon }) => (
  <div className="border border-gray-800 bg-[#18181b] mb-4 rounded-sm overflow-hidden">
    <div
      onClick={onToggle}
      className="flex justify-between items-center p-3 bg-black border-b border-gray-800 cursor-pointer hover:bg-gray-900 select-none transition-colors"
    >
      <span className="text-[11px] font-bold text-white uppercase tracking-widest flex items-center gap-2">
        {Icon && <Icon size={14} className="text-gray-500" />} {title}
      </span>
      <ChevronDown
        size={14}
        className={`text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      />
    </div>
    {isOpen && (
      <div className="p-5 animate-in slide-in-from-top-2 duration-200">
        {children}
      </div>
    )}
  </div>
);

const Ordenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [estatusList, setEstatusList] = useState([]);
  const [tiposTrajeList, setTiposTrajeList] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingOrder, setViewingOrder] = useState(null);
  const [detallesSaco, setDetallesSaco] = useState(null);
  const [detallesCamisa, setDetallesCamisa] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const initialState = {
    id_cliente: "",
    id_sucursal: "",
    fecha_evento: "",
    fecha_cita: "",
    id_estatus: "1",
    id_tipo_traje: "",
    incluye_camisa: false,
    es_smoking_3_piezas: false, // <-- NUEVO ESTADO PARA SMOKING
    costo_total: "",
    monto_abonado: "",
    metodo_pago: "",

    precio_saco: "",
    precio_pantalon: "",
    precio_chaleco: "",
    precio_camisa: "",

    tela_pantalon: "",
    pant_boton: "",
    pant_pretina: "Estándar con trabillas",
    pant_ajuste: "Sin Ajuste",
    pant_altura: "Cintura Media",
    pant_pliegues: "Sin Pliegues (Flat Front)",
    pant_bolsillo_reloj: "Ninguno",
    pant_bajos: "Liso (Sin bastilla)",
    obs_pantalon: "",

    tela_saco: "",
    saco_forro_cod: "",
    saco_boton_cod: "",
    saco_botones: "",
    saco_solapa: "",
    saco_tamano_solapa: "",
    saco_b_pecho: "",
    saco_b_inf: "",
    saco_b_ticket: "",
    saco_ojalIzquierdo: "",
    saco_ojalDerecho: "",
    saco_monograma: "",
    obs_saco: "",

    chal_tela: "",
    chal_boton: "",
    chal_cuello: "Sin Cuello (Clásico)",
    chal_botones: "5 Botones",
    chal_b_pecho: "Ninguno",
    chal_b_inf: "2 Bolsillos de Ribete",
    chal_terminacion: "En Punta (V-Shape)",
    obs_chaleco: "",

    camisa_opcion: "Manga Larga",
    camisa_tela: "",
    camisa_cuello: "Inglés",
    camisa_contraste: "",
    camisa_tapeta: "Estándar",
    camisa_puno: "Sencillo Botón",
    camisa_bolsillo: "Sin Bolsillo",
    camisa_pliegues: "Sin Pliegues",
    camisa_iniciales: "",
    camisa_obs: "",

    altura: "",
    peso: "",
    talla_zapato: "",
    fit: "Regular Fit",
    saco_l_frente: "",
    saco_l_espalda: "",
    saco_hombros: "",
    saco_pecho: "",
    saco_estomago: "",
    saco_m_izq: "",
    saco_m_der: "",
    saco_biceps: "",
    saco_cadera: "",
    pant_l_izq: "",
    pant_l_der: "",
    pant_cintura: "",
    pant_cadera: "",
    pant_muslo: "",
    pant_tiro: "",
    camisa_cuello_med: "",
    camisa_manga_med: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [sections, setSections] = useState({
    cliente: false,
    prenda: false,
    pantalon: false,
    saco: false,
    chaleco: false,
    camisa: false,
    medidas: false,
    finanzas: false,
  });

  const toggleSection = (key) =>
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    fetchData();
    fetchOrdenes();
  }, []);

  const fetchData = async () => {
    try {
      const [c, s, e, t] = await Promise.all([
        clientesService.listar(),
        sucursalesService.listar(),
        estatusOrdenService.listar(),
        tipoTrajeService.listar(),
      ]);
      setClientes(c || []);
      setSucursales(s || []);
      setEstatusList(e || []);
      setTiposTrajeList(t || []);
    } catch (err) {
      console.error(err);
      setAlert({
        type: "error",
        message: "Error al cargar catálogos del servidor.",
      });
    }
  };

  const fetchOrdenes = async () => {
    try {
      setLoading(true);
      const data = await ordenesService.listar();
      setOrdenes(data || []);
    } catch (err) {
      console.error("Error al cargar órdenes:", err);
      setAlert({
        type: "error",
        message: "No se pudieron obtener las órdenes.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showViewModal && viewingOrder) {
      // Frac (7), Chaque (8), Smoking (9) también llevan Saco
      if ([1, 2, 3, 7, 8, 9].includes(viewingOrder.idTipoTraje)) {
        detallesService
          .obtenerSacoPorOrden(viewingOrder.idOrden)
          .then((response) => setDetallesSaco(response.data))
          .catch((err) =>
            console.error("Error al cargar detalles del saco:", err),
          );
      }
      if (viewingOrder.idTipoTraje === 6 || viewingOrder.incluyeCamisa) {
        detallesService
          .obtenerCamisaPorOrden(viewingOrder.idOrden)
          .then((response) => setDetallesCamisa(response.data))
          .catch((err) =>
            console.error("Error al cargar detalles de la camisa:", err),
          );
      }
    }
  }, [showViewModal, viewingOrder]);

  // --- LÓGICA DE VISIBILIDAD DE PIEZAS (ACTUALIZADA) ---
  const trajeId = parseInt(formData.id_tipo_traje);
  const tieneSaco = [1, 2, 3, 7, 8, 9].includes(trajeId);
  const tienePantalon = [1, 2, 4, 7, 8, 9].includes(trajeId);

  // Chaleco es para Tres Piezas (2), Chaleco Solo (5), Frac (7), Chaqué (8), o Smoking 3 Piezas (9 + Check)
  const tieneChaleco =
    [2, 5, 7, 8].includes(trajeId) ||
    (trajeId === 9 && formData.es_smoking_3_piezas);
  const tieneCamisa = formData.incluye_camisa || trajeId === 6;

  // --- EFECTO PARA AUTO-CALCULAR EL COSTO TOTAL ---
  useEffect(() => {
    const pSaco = tieneSaco ? parseFloat(formData.precio_saco) || 0 : 0;
    const pPantalon = tienePantalon
      ? parseFloat(formData.precio_pantalon) || 0
      : 0;
    const pChaleco = tieneChaleco
      ? parseFloat(formData.precio_chaleco) || 0
      : 0;
    const pCamisa = tieneCamisa ? parseFloat(formData.precio_camisa) || 0 : 0;

    const totalCalculado = pSaco + pPantalon + pChaleco + pCamisa;

    setFormData((prev) => {
      if (parseFloat(prev.costo_total || 0) !== totalCalculado) {
        return {
          ...prev,
          costo_total: totalCalculado > 0 ? totalCalculado.toString() : "",
        };
      }
      return prev;
    });
  }, [
    formData.precio_saco,
    formData.precio_pantalon,
    formData.precio_chaleco,
    formData.precio_camisa,
    tieneSaco,
    tienePantalon,
    tieneChaleco,
    tieneCamisa,
  ]);

  const handleViewOrder = async (orden) => {
    setViewingOrder(orden);
    setShowViewModal(true);

    try {
      if ([1, 2, 3, 7, 8, 9].includes(orden.idTipoTraje)) {
        const respSaco = await detallesService.obtenerSacoPorOrden(
          orden.idOrden,
        );
        setDetallesSaco(respSaco.data);
      }
      if (orden.idTipoTraje === 6 || orden.incluyeCamisa) {
        const respCamisa = await detallesService.obtenerCamisaPorOrden(
          orden.idOrden,
        );
        setDetallesCamisa(respCamisa.data);
      }
    } catch (error) {
      console.error("Error al cargar detalles completos:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      IdCliente: parseInt(formData.id_cliente),
      IdSucursal: parseInt(formData.id_sucursal),
      IdTipoTraje: parseInt(formData.id_tipo_traje),
      IdEstatus: parseInt(formData.id_estatus),
      IncluyeCamisa: tieneCamisa,
      CostoTotal: parseFloat(formData.costo_total) || 0,
      MontoAbonado: parseFloat(formData.monto_abonado) || 0,
      MetodoPago: formData.metodo_pago,
      FechaCitaMedidas: formData.fecha_cita
        ? new Date(formData.fecha_cita).toISOString()
        : null,
      FechaEventoEntrega: formData.fecha_evento
        ? new Date(formData.fecha_evento).toISOString()
        : null,
      MedidasOrden: {
        Altura: parseFloat(formData.altura) || null,
        Peso: parseFloat(formData.peso) || null,
        TallaZapato: formData.talla_zapato || null,
        TipoFit: formData.fit || null,
        SacoLargoFrente: parseFloat(formData.saco_l_frente) || null,
        SacoLargoEspalda: parseFloat(formData.saco_l_espalda) || null,
        SacoHombros: parseFloat(formData.saco_hombros) || null,
        SacoPecho: parseFloat(formData.saco_pecho) || null,
        SacoEstomago: parseFloat(formData.saco_estomago) || null,
        SacoMangaIzq: parseFloat(formData.saco_m_izq) || null,
        SacoMangaDer: parseFloat(formData.saco_m_der) || null,
        SacoBiceps: parseFloat(formData.saco_biceps) || null,
        SacoCadera: parseFloat(formData.saco_cadera) || null,
        PantLargoIzq: parseFloat(formData.pant_l_izq) || null,
        PantLargoDer: parseFloat(formData.pant_l_der) || null,
        PantCintura: parseFloat(formData.pant_cintura) || null,
        PantCadera: parseFloat(formData.pant_cadera) || null,
        PantMuslo: parseFloat(formData.pant_muslo) || null,
        PantTiro: parseFloat(formData.pant_tiro) || null,
        CamisaCuello: parseFloat(formData.camisa_cuello_med) || null,
        CamisaManga: parseFloat(formData.camisa_manga_med) || null,
      },
      DetalleSaco: tieneSaco
        ? {
            PrecioSaco: parseFloat(formData.precio_saco) || 0,
            CodigoTela: formData.tela_saco,
            CodigoForro: formData.saco_forro_cod,
            CodigoBoton: formData.saco_boton_cod,
            EstiloBotones: formData.saco_botones,
            EstiloSolapa: formData.saco_solapa,
            TamanoSolapa: formData.saco_tamano_solapa,
            EstiloBolsilloPecho: formData.saco_b_pecho,
            EstiloBolsilloInf: formData.saco_b_inf,
            EstiloBolsilloTicket: formData.saco_b_ticket,
            EstiloOjalIzquierdo: formData.saco_ojalIzquierdo,
            EstiloOjalDerecho: formData.saco_ojalDerecho,
            Monograma: formData.saco_monograma,
            Observaciones: formData.obs_saco,
          }
        : null,
      DetallePantalon: tienePantalon
        ? {
            PrecioPantalon: parseFloat(formData.precio_pantalon) || 0,
            CodigoTela: formData.tela_pantalon,
            CodigoBoton: formData.pant_boton,
            EstiloPretina: formData.pant_pretina,
            AjusteCintura: formData.pant_ajuste,
            AlturaPretina: formData.pant_altura,
            EstiloPliegues: formData.pant_pliegues,
            EstiloBolsilloReloj: formData.pant_bolsillo_reloj,
            EstiloBajos: formData.pant_bajos,
            Observaciones: formData.obs_pantalon,
          }
        : null,
      DetalleCamisa: tieneCamisa
        ? {
            OpcionCamisa: formData.opcion_camisa,
            PrecioCamisa: parseFloat(formData.precio_camisa) || 0,
            CodigoTela: formData.camisa_tela,
            EstiloCuello: formData.camisa_cuello,
            ContrasteTela: formData.camisa_contraste,
            EstiloTapeta: formData.camisa_tapeta,
            EstiloPuno: formData.camisa_puno,
            EstiloBolsillo: formData.camisa_bolsillo,
            PlieguesFrontales: formData.camisa_pliegues,
            Iniciales: formData.camisa_iniciales,
            Observaciones: formData.camisa_obs,
          }
        : null,
      DetalleChaleco: tieneChaleco
        ? {
            PrecioChaleco: parseFloat(formData.precio_chaleco) || 0,
            CodigoTela: formData.chal_tela,
            CodigoBoton: formData.chal_boton,
            EstiloCuello: formData.chal_cuello,
            EstiloBotones: formData.chal_botones,
            EstiloBolsilloPecho: formData.chal_b_pecho,
            EstiloBolsilloInf: formData.chal_b_inf,
            TerminacionInf: formData.chal_terminacion,
            Observaciones: formData.obs_chaleco,
          }
        : null,
    };

    try {
      await ordenesService.crearCompleta(payload);
      setAlert({ type: "success", message: "Orden integral creada con éxito" });
      setShowForm(false);
      fetchOrdenes();
    } catch (error) {
      console.error("Error:", error);
      setAlert({ type: "error", message: "Error al guardar los detalles." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredOrdenes = ordenes.filter((o) => {
    const clienteNombre =
      clientes.find((c) => c.idCliente === o.idCliente)?.nombreCompleto || "";
    return (
      o.idOrden.toString().includes(searchTerm) ||
      clienteNombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-4 lg:p-8 max-w-[1600px] mx-auto min-h-screen bg-[#121212] text-gray-200 font-sans">
      <Alert
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: "", message: "" })}
      />

      {/* HEADER Y TABLA */}
      <div className="flex justify-between items-end mb-8 pb-4 border-b border-gray-800">
        <div>
          <h1 className="text-3xl font-bold text-white uppercase tracking-tight flex items-center gap-3">
            <Ruler size={28} /> Libro de Órdenes
          </h1>
          <p className="text-gray-500 mt-1">
            Administra las{" "}
            <span className="font-semibold text-white">
              {filteredOrdenes.length}
            </span>{" "}
            órdenes activas.
          </p>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Buscar orden..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-black text-white rounded-lg border border-gray-800 text-sm outline-none w-64 focus:border-white transition-all"
          />
          <button
            onClick={() => {
              setFormData(initialState);
              setEditingId(null);
              setShowForm(true);
            }}
            className="bg-white text-black px-5 py-2 rounded-lg text-xs font-bold uppercase flex items-center gap-2 hover:bg-gray-200 transition-colors"
          >
            <Plus size={16} /> Nueva Orden
          </button>
        </div>
      </div>

      <div className="bg-[#0d0d0d] rounded-xl border border-gray-800 overflow-hidden shadow-2xl">
        {loading ? (
          <div className="p-16 text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-gray-800 border-t-white"></div>
            <p className="text-gray-500 mt-4 text-sm font-medium">
              Sincronizando Órdenes...
            </p>
          </div>
        ) : filteredOrdenes.length === 0 ? (
          <div className="p-16 text-center text-gray-500">
            <p className="text-lg font-bold">No se encontraron órdenes</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800 bg-black/50 text-gray-500 text-xs uppercase font-bold tracking-widest">
                  <th className="p-4">Orden</th>
                  <th className="p-4 md:table-cell">Cliente</th>
                  <th className="p-4 lg:table-cell">Estatus</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredOrdenes.map((o) => {
                  const cliente = clientes.find(
                    (c) => c.idCliente === o.idCliente,
                  );
                  const estatus = estatusList.find(
                    (e) => e.idEstatus === o.idEstatus,
                  );

                  return (
                    <tr
                      key={o.idOrden}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-white text-black rounded-full flex items-center justify-center font-bold text-xs">
                            #{o.idOrden}
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm leading-none mb-1">
                              Folio de Confección
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 md:table-cell">
                        <div className="flex flex-col">
                          <p className="text-sm text-gray-300 font-medium">
                            {cliente?.nombreCompleto || "Cliente no asignado"}
                          </p>
                          <p className="text-[10px] text-gray-600 uppercase font-bold">
                            {cliente?.telefono || "Sin teléfono"}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 lg:table-cell">
                        <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-900/20 text-blue-400 rounded-md text-[10px] font-black tracking-widest border border-blue-900/30 uppercase">
                          {estatus?.descripcion || "Pendiente"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => {
                              handleViewOrder(o);
                              setShowViewModal(true);
                            }}
                            className="text-gray-400 hover:text-white transition-colors text-lg"
                            title="Ver Detalles"
                          >
                            👁️
                          </button>
                          <button
                            className="text-gray-400 hover:text-white transition-colors text-lg"
                            title="Editar"
                          >
                            ✏️
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL FORMULARIO NUEVA ORDEN */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fadeIn"
            onClick={() => setShowForm(false)}
          ></div>
          <div className="bg-[#09090b] w-full h-full flex flex-col shadow-2xl overflow-hidden z-10 animate-slideUp">
            <div className="p-5 bg-black border-b border-gray-800 flex justify-between items-center shrink-0">
              <h2 className="text-sm font-black uppercase text-white flex items-center gap-2 tracking-widest">
                <Scissors size={16} />{" "}
                {editingId ? "Editar Orden" : "Nueva Orden"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-black/20">
              <Section
                title="Información General"
                isOpen={sections.cliente}
                onToggle={() => toggleSection("cliente")}
                icon={Info}
              >
                <div className="flex flex-wrap gap-4 w-full">
                  <div className="flex-1 min-w-[200px]">
                    <Select
                      label="Estatus"
                      value={formData.id_estatus}
                      onChange={(e) =>
                        setFormData({ ...formData, id_estatus: e.target.value })
                      }
                      options={estatusList.map((e) => ({
                        value: e.idEstatus,
                        label: e.descripcion,
                      }))}
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <Select
                      label="Cliente"
                      value={formData.id_cliente}
                      onChange={(e) =>
                        setFormData({ ...formData, id_cliente: e.target.value })
                      }
                      options={clientes.map((c) => ({
                        value: c.idCliente,
                        label: c.nombreCompleto,
                      }))}
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <Select
                      label="Sucursal"
                      value={formData.id_sucursal}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          id_sucursal: e.target.value,
                        })
                      }
                      options={sucursales.map((s) => ({
                        value: s.idSucursal,
                        label: s.nombre,
                      }))}
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <Input
                      label="Toma de Medidas"
                      type="date"
                      value={formData.fecha_cita}
                      onChange={(e) =>
                        setFormData({ ...formData, fecha_cita: e.target.value })
                      }
                      style={{ colorScheme: "dark" }}
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <Input
                      label="Fecha Entrega"
                      type="date"
                      value={formData.fecha_evento}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fecha_evento: e.target.value,
                        })
                      }
                      style={{ colorScheme: "dark" }}
                    />
                  </div>
                </div>
              </Section>

              <Section
                title="Selección de Prenda"
                isOpen={sections.prenda}
                onToggle={() => toggleSection("prenda")}
                icon={Layers}
              >
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-3">
                    {tiposTrajeList.map((tipo) => (
                      <button
                        key={tipo.idTipoTraje}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            id_tipo_traje: tipo.idTipoTraje,
                          })
                        }
                        className={`px-6 py-4 border rounded-md text-[11px] font-bold uppercase transition-all ${formData.id_tipo_traje === tipo.idTipoTraje ? "bg-white text-black border-white scale-105" : "text-gray-500 border-gray-800"}`}
                      >
                        {tipo.descripcion}
                      </button>
                    ))}
                  </div>

                  {/* CHECKBOXES DE CAMISA Y SMOKING 3 PIEZAS */}
                  {[1, 2, 7, 8, 9].includes(
                    parseInt(formData.id_tipo_traje),
                  ) && (
                    <div className="pt-4 border-t border-gray-800 flex flex-col sm:flex-row gap-6 bg-gray-900/40 p-4 rounded-lg">
                      {parseInt(formData.id_tipo_traje) === 9 && (
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            checked={formData.es_smoking_3_piezas}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                es_smoking_3_piezas: e.target.checked,
                              })
                            }
                            className="w-5 h-5 accent-white"
                          />
                          <label className="text-[11px] font-bold text-white uppercase">
                            ¿Smoking de 3 Piezas (Incluir Chaleco)?
                          </label>
                        </div>
                      )}
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={formData.incluye_camisa}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              incluye_camisa: e.target.checked,
                            })
                          }
                          className="w-5 h-5 accent-white"
                        />
                        <label className="text-[11px] font-bold text-white uppercase">
                          ¿Incluir Camisa a Medida?
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </Section>

              {/* ESPECIFICACIONES DEL SACO */}
              {tieneSaco && (
                <Section
                  title="Especificaciones del Saco"
                  isOpen={sections.saco}
                  onToggle={() => toggleSection("saco")}
                  icon={Scissors}
                >
                  <div className="animate-in fade-in duration-500">
                    <div
                      className="grid gap-4 sm:gap-6 mb-8 
                      grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
                    >
                      <Input
                        label="Código Tela Saco"
                        placeholder="Ej. ZG-881"
                        value={formData.tela_saco}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            tela_saco: e.target.value,
                          })
                        }
                      />

                      <Input
                        label="Código Forro"
                        placeholder="Ej. Silk-02"
                        value={formData.saco_forro_cod}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            saco_forro_cod: e.target.value,
                          })
                        }
                      />

                      <Input
                        label="Código Botón"
                        placeholder="Ej. Horn-04"
                        value={formData.saco_boton_cod}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            saco_boton_cod: e.target.value,
                          })
                        }
                      />

                      <Input
                        label="Monograma (Iniciales)"
                        placeholder="Ej. A.J.R."
                        value={formData.saco_monograma}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            saco_monograma: e.target.value,
                          })
                        }
                      />

                      <Select
                        label="Estilo Solapa"
                        value={formData.saco_solapa}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            saco_solapa: e.target.value,
                          })
                        }
                        options={catalogs.saco.solapa.map((opt) => ({
                          value: opt,
                          label: opt,
                        }))}
                      />

                      <Input
                        label="Tamaño Solapa"
                        placeholder="Ej. 8.5 cm"
                        value={formData.saco_tamano_solapa}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            saco_tamano_solapa: e.target.value,
                          })
                        }
                      />

                      <Select
                        label="Estilo Ojal Izquierdo"
                        value={formData.saco_ojalIzquierdo}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            saco_ojalIzquierdo: e.target.value,
                          })
                        }
                        options={catalogs.saco.ojalIzquierdo.map((opt) => ({
                          value: opt,
                          label: opt,
                        }))}
                      />

                      <Select
                        label="Estilo Ojal Derecho"
                        value={formData.saco_ojalDerecho}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            saco_ojalDerecho: e.target.value,
                          })
                        }
                        options={catalogs.saco.ojalDerecho.map((opt) => ({
                          value: opt,
                          label: opt,
                        }))}
                      />

                      <Input
                        label="Precio de Saco ($)"
                        type="number"
                        placeholder="0.00"
                        value={formData.precio_saco}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            precio_saco: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div
                      className="grid gap-8 border-t border-gray-800 pt-8 mb-8
                      grid-cols-1 lg:grid-cols-2"
                    >
                      <ImageSelect
                        label="Estilo Botonadura"
                        value={formData.saco_botones}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            saco_botones: e.target.value,
                          })
                        }
                        options={opcionesBotones}
                      />

                      <ImageSelect
                        label="Bolsillo Pecho"
                        value={formData.saco_b_pecho}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            saco_b_pecho: e.target.value,
                          })
                        }
                        options={opcionesBolsilloPecho}
                      />
                      <ImageSelect
                        label="Bolsillo Ticket"
                        value={formData.saco_b_ticket}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            saco_b_ticket: e.target.value,
                          })
                        }
                        options={opcionesBolsilloTicket}
                      />
                      <ImageSelect
                        label="Bolsillo Inferior"
                        value={formData.saco_b_inf}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            saco_b_inf: e.target.value,
                          })
                        }
                        options={opcionesBolsilloInferior}
                      />
                    </div>

                    <div className="grid gap-6 border-t border-gray-800 pt-8">
                      <div className="col-span-full">
                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">
                          Observaciones Saco
                        </label>
                        <textarea
                          value={formData.obs_saco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              obs_saco: e.target.value,
                            })
                          }
                          className="w-full bg-black border border-gray-800 px-4 py-3 text-sm text-white outline-none focus:border-white transition-colors rounded-md resize-none min-h-[100px]"
                          placeholder="Notas adicionales..."
                        />
                      </div>
                    </div>
                  </div>
                </Section>
              )}

              {/* ESPECIFICACIONES DEL CHALECO */}
              {tieneChaleco && (
                <Section
                  title="Especificaciones del Chaleco"
                  isOpen={sections.chaleco}
                  onToggle={() => toggleSection("chaleco")}
                  icon={Scissors}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
                    <Input
                      label="Código Tela Chaleco"
                      value={formData.chal_tela}
                      onChange={(e) =>
                        setFormData({ ...formData, chal_tela: e.target.value })
                      }
                      placeholder="Ej. ZG-881"
                    />
                    <Input
                      label="Código Botón"
                      value={formData.chal_boton}
                      onChange={(e) =>
                        setFormData({ ...formData, chal_boton: e.target.value })
                      }
                    />
                    <Select
                      label="Estilo de Cuello"
                      value={formData.chal_cuello}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          chal_cuello: e.target.value,
                        })
                      }
                      options={catalogs.chaleco.cuello}
                    />
                    <Select
                      label="Estilo Botones"
                      value={formData.chal_botones}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          chal_botones: e.target.value,
                        })
                      }
                      options={catalogs.chaleco.botones}
                    />
                    <Select
                      label="Bolsillo Pecho"
                      value={formData.chal_b_pecho}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          chal_b_pecho: e.target.value,
                        })
                      }
                      options={catalogs.chaleco.bolsilloPecho}
                    />
                    <Select
                      label="Bolsillos Inferiores"
                      value={formData.chal_b_inf}
                      onChange={(e) =>
                        setFormData({ ...formData, chal_b_inf: e.target.value })
                      }
                      options={catalogs.chaleco.bolsilloInf}
                    />
                    <Select
                      label="Terminación Inferior"
                      value={formData.chal_terminacion}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          chal_terminacion: e.target.value,
                        })
                      }
                      options={catalogs.chaleco.terminacion}
                    />
                    <div className="lg:col-span-2">
                      <Input
                        label="Observaciones Chaleco"
                        value={formData.obs_chaleco}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            obs_chaleco: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="lg:col-span-3 p-4 bg-blue-900/10 border border-blue-900/30 rounded-lg">
                      <Input
                        label="Precio de Chaleco ($)"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.precio_chaleco}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            precio_chaleco: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </Section>
              )}

              {/* ESPECIFICACIONES DE LA CAMISA */}
              {tieneCamisa && (
                <Section
                  title="Detalles de la Camisa"
                  isOpen={sections.camisa}
                  onToggle={() => toggleSection("camisa")}
                  icon={Scissors}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <Select
                      label="Opción de Camisa"
                      value={formData.opcion_camisa}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          opcion_camisa: e.target.value,
                        })
                      }
                      options={catalogs.camisa.opcionCamisa}
                    />
                    <Input
                      label="Código Tela Camisa"
                      value={formData.camisa_tela}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          camisa_tela: e.target.value,
                        })
                      }
                      placeholder="Ej. OX-200"
                    />
                    <Input
                      label="Tela Contraste"
                      value={formData.camisa_contraste}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          camisa_contraste: e.target.value,
                        })
                      }
                      placeholder="Ej. Blanco en cuello y puños"
                    />
                    <Input
                      label="Iniciales (Monograma)"
                      value={formData.camisa_iniciales}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          camisa_iniciales: e.target.value,
                        })
                      }
                      maxLength={10}
                      placeholder="Ej. H.A.J."
                    />
                    <Select
                      label="Estilo de Cuello"
                      value={formData.camisa_cuello}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          camisa_cuello: e.target.value,
                        })
                      }
                      options={catalogs.camisa.cuello}
                    />
                    <Select
                      label="Estilo de Tapeta"
                      value={formData.camisa_tapeta}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          camisa_tapeta: e.target.value,
                        })
                      }
                      options={catalogs.camisa.tapeta}
                    />
                    <Select
                      label="Estilo de Puño"
                      value={formData.camisa_puno}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          camisa_puno: e.target.value,
                        })
                      }
                      options={catalogs.camisa.puno}
                    />
                    <Select
                      label="Estilo de Bolsillo"
                      value={formData.camisa_bolsillo}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          camisa_bolsillo: e.target.value,
                        })
                      }
                      options={catalogs.camisa.bolsillo}
                    />
                    <Select
                      label="Pliegues Frontales"
                      value={formData.camisa_pliegues}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          camisa_pliegues: e.target.value,
                        })
                      }
                      options={catalogs.camisa.pliegues}
                    />
                    <div className="lg:col-span-1">
                      <Input
                        label="Observaciones de la Camisa"
                        value={formData.camisa_obs}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            camisa_obs: e.target.value,
                          })
                        }
                        placeholder="Notas..."
                      />
                    </div>
                    <div className="lg:col-span-3 p-4 bg-blue-900/10 border border-blue-900/30 rounded-lg">
                      <Input
                        label="Precio de Camisa ($)"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.precio_camisa}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            precio_camisa: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </Section>
              )}

              {/* ESPECIFICACIONES DEL PANTALÓN */}
              {tienePantalon && (
                <Section
                  title="Especificaciones del Pantalón"
                  isOpen={sections.pantalon}
                  onToggle={() => toggleSection("pantalon")}
                  icon={Scissors}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Input
                      label="Código Tela"
                      value={formData.tela_pantalon}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tela_pantalon: e.target.value,
                        })
                      }
                      placeholder="Ej. LP-99"
                    />
                    <Input
                      label="Código Botón"
                      value={formData.pant_boton}
                      onChange={(e) =>
                        setFormData({ ...formData, pant_boton: e.target.value })
                      }
                    />
                    <Select
                      label="Estilo Pretina"
                      value={formData.pant_pretina}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pant_pretina: e.target.value,
                        })
                      }
                      options={catalogs.pantalon.pretina}
                    />
                    <Select
                      label="Ajuste Cintura"
                      value={formData.pant_ajuste}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pant_ajuste: e.target.value,
                        })
                      }
                      options={catalogs.pantalon.ajuste}
                    />
                    <Select
                      label="Altura Pretina"
                      value={formData.pant_altura}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pant_altura: e.target.value,
                        })
                      }
                      options={catalogs.pantalon.altura}
                    />
                    <Select
                      label="Pliegues"
                      value={formData.pant_pliegues}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pant_pliegues: e.target.value,
                        })
                      }
                      options={catalogs.pantalon.pliegues}
                    />
                    <Select
                      label="Bolsillo Reloj"
                      value={formData.pant_bolsillo_reloj}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pant_bolsillo_reloj: e.target.value,
                        })
                      }
                      options={catalogs.pantalon.bolsilloReloj}
                    />
                    <Select
                      label="Estilo Bajos"
                      value={formData.pant_bajos}
                      onChange={(e) =>
                        setFormData({ ...formData, pant_bajos: e.target.value })
                      }
                      options={catalogs.pantalon.bajos}
                    />
                    <div className="lg:col-span-3">
                      <Input
                        label="Observaciones"
                        value={formData.obs_pantalon}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            obs_pantalon: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="lg:col-span-3 p-4 bg-blue-900/10 border border-blue-900/30 rounded-lg">
                      <Input
                        label="Precio de Pantalón ($)"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.precio_pantalon}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            precio_pantalon: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </Section>
              )}

              {/* SECCIÓN: LIBRO DE MEDIDAS */}
              <Section
                title="Libro de Medidas Técnicas"
                isOpen={sections.medidas}
                onToggle={() => toggleSection("medidas")}
                icon={Ruler}
              >
                <div className="space-y-10 animate-in fade-in duration-700">
                  <div>
                    <h3 className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <span className="w-8 h-[1px] bg-white/20"></span>
                      Cuerpo y Calzado
                    </h3>

                    <div
                      className="grid gap-4 sm:gap-6
                      grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
                    >
                      <Input
                        label="Altura (cm)"
                        type="number"
                        step="0.1"
                        value={formData.altura}
                        onChange={(e) =>
                          setFormData({ ...formData, altura: e.target.value })
                        }
                      />
                      <Input
                        label="Peso (kg)"
                        type="number"
                        step="0.1"
                        value={formData.peso}
                        onChange={(e) =>
                          setFormData({ ...formData, peso: e.target.value })
                        }
                      />
                      <Input
                        label="Talla Zapato"
                        value={formData.talla_zapato}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            talla_zapato: e.target.value,
                          })
                        }
                      />
                      <Select
                        label="Tipo de Fit"
                        value={formData.fit}
                        onChange={(e) =>
                          setFormData({ ...formData, fit: e.target.value })
                        }
                        options={catalogs.medidas.fits}
                      />
                    </div>
                  </div>

                  {tieneSaco && (
                    <div>
                      <h3 className="text-[9px] font-black text-blue-400/60 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-blue-400/30"></span>
                        Especificaciones Saco
                      </h3>

                      <div
                        className="grid gap-4 sm:gap-6
                        grid-cols-[repeat(auto-fit,minmax(180px,1fr))]"
                      >
                        <Input
                          label="Largo Frente"
                          type="number"
                          step="0.01"
                          value={formData.saco_l_frente}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              saco_l_frente: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Largo Espalda"
                          type="number"
                          step="0.01"
                          value={formData.saco_l_espalda}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              saco_l_espalda: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Hombros"
                          type="number"
                          step="0.01"
                          value={formData.saco_hombros}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              saco_hombros: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Pecho"
                          type="number"
                          step="0.01"
                          value={formData.saco_pecho}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              saco_pecho: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Estómago"
                          type="number"
                          step="0.01"
                          value={formData.saco_estomago}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              saco_estomago: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Manga Izq"
                          type="number"
                          step="0.01"
                          value={formData.saco_m_izq}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              saco_m_izq: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Manga Der"
                          type="number"
                          step="0.01"
                          value={formData.saco_m_der}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              saco_m_der: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Bíceps"
                          type="number"
                          step="0.01"
                          value={formData.saco_biceps}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              saco_biceps: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Cadera Saco"
                          type="number"
                          step="0.01"
                          value={formData.saco_cadera}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              saco_cadera: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}

                  {tienePantalon && (
                    <div>
                      <h3 className="text-[9px] font-black text-amber-400/60 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-amber-400/30"></span>
                        Especificaciones Pantalón
                      </h3>

                      <div
                        className="grid gap-4 sm:gap-6
                        grid-cols-[repeat(auto-fit,minmax(180px,1fr))]"
                      >
                        <Input
                          label="Largo Izq"
                          type="number"
                          step="0.01"
                          value={formData.pant_l_izq}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              pant_l_izq: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Largo Der"
                          type="number"
                          step="0.01"
                          value={formData.pant_l_der}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              pant_l_der: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Cintura"
                          type="number"
                          step="0.01"
                          value={formData.pant_cintura}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              pant_cintura: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Cadera"
                          type="number"
                          step="0.01"
                          value={formData.pant_cadera}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              pant_cadera: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Muslo"
                          type="number"
                          step="0.01"
                          value={formData.pant_muslo}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              pant_muslo: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Tiro"
                          type="number"
                          step="0.01"
                          value={formData.pant_tiro}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              pant_tiro: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}

                  {tieneCamisa && (
                    <div>
                      <h3 className="text-[9px] font-black text-green-400/60 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-green-400/30"></span>
                        Especificaciones Camisa
                      </h3>

                      <div
                        className="grid gap-4 sm:gap-6
                        grid-cols-[repeat(auto-fit,minmax(220px,1fr))]"
                      >
                        <Input
                          label="Contorno Cuello"
                          type="number"
                          step="0.01"
                          value={formData.camisa_cuello_med}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              camisa_cuello_med: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Largo Manga"
                          type="number"
                          step="0.01"
                          value={formData.camisa_manga_med}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              camisa_manga_med: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Section>

              {/* SECCIÓN FINAL: FINANZAS */}
              <Section
                title="Resumen Financiero"
                isOpen={sections.finanzas}
                onToggle={() => toggleSection("finanzas")}
                icon={DollarSign}
              >
                <div className="bg-white/[0.02] p-5 rounded-xl border border-gray-800">
                  <div
                    className="grid gap-4 sm:gap-6
                    grid-cols-[repeat(auto-fit,minmax(240px,1fr))]"
                  >
                    <Input
                      label="Costo Total de la Orden"
                      type="number"
                      placeholder="0.00"
                      value={formData.costo_total}
                      readOnly={true}
                    />

                    <Input
                      label="Monto del Anticipo / Abono"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.monto_abonado}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          monto_abonado: e.target.value,
                        })
                      }
                    />

                    <Select
                      label="Método de Pago"
                      value={formData.metodo_pago}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          metodo_pago: e.target.value,
                        })
                      }
                      options={catalogs.orden.metodoPago}
                    />

                    <div className="col-span-full mt-2 p-5 bg-green-900/10 border border-green-500/20 rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <div>
                        <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">
                          Saldo Restante
                        </p>

                        <p className="text-3xl font-mono text-white mt-1">
                          $
                          {(
                            parseFloat(formData.costo_total || 0) -
                            parseFloat(formData.monto_abonado || 0)
                          ).toFixed(2)}
                        </p>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                          Estado de Pago
                        </p>

                        <span
                          className={`inline-block mt-1 text-[11px] px-3 py-1.5 rounded-full font-bold tracking-wide ${
                            parseFloat(formData.monto_abonado) >=
                              parseFloat(formData.costo_total) &&
                            parseFloat(formData.costo_total) > 0
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {parseFloat(formData.monto_abonado) >=
                            parseFloat(formData.costo_total) &&
                          parseFloat(formData.costo_total) > 0
                            ? "LIQUIDADO"
                            : "PENDIENTE"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Section>
            </div>

            <div className="p-5 bg-black border-t border-gray-800 flex justify-end gap-3 shrink-0">
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-3 border border-gray-800 rounded-lg text-gray-500 font-bold text-xs uppercase hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 bg-white text-black rounded-lg font-black text-xs uppercase shadow-lg"
              >
                <Save size={16} className="inline mr-2" />{" "}
                {isSubmitting ? "Guardando..." : "Guardar Orden"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE VISUALIZACIÓN DE ORDEN (SOLO LECTURA) */}
      {showViewModal && viewingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fadeIn"
            onClick={() => setShowViewModal(false)}
          ></div>
          <div className="bg-[#09090b] border border-gray-800 w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl rounded-xl overflow-hidden z-10 animate-slideUp">
            <div className="p-5 bg-black border-b border-gray-800 flex justify-between items-center shrink-0">
              <h2 className="text-sm font-black uppercase text-white flex items-center gap-2 tracking-widest">
                <Eye size={16} /> Detalles de Orden #{viewingOrder.idOrden}
              </h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-black/20">
              <Section
                title="Información General"
                isOpen={true}
                onToggle={() => {}}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputReadOnly
                    label="Estatus"
                    value={
                      estatusList.find(
                        (e) => e.idEstatus === viewingOrder.idEstatus,
                      )?.descripcion
                    }
                  />
                  <InputReadOnly
                    label="Cliente"
                    value={
                      clientes.find(
                        (c) => c.idCliente === viewingOrder.idCliente,
                      )?.nombreCompleto
                    }
                  />
                  <InputReadOnly
                    label="Sucursal"
                    value={
                      sucursales.find(
                        (s) => s.idSucursal === viewingOrder.idSucursal,
                      )?.nombre
                    }
                  />
                  <InputReadOnly
                    label="Tipo de Traje"
                    value={
                      tiposTrajeList.find(
                        (t) => t.idTipoTraje === viewingOrder.idTipoTraje,
                      )?.descripcion
                    }
                  />
                </div>
              </Section>

              <Section
                title="Información Financiera"
                isOpen={true}
                onToggle={() => {}}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputReadOnly
                    label="Costo Total"
                    value={`$${parseFloat(viewingOrder.costoTotal || 0).toFixed(2)}`}
                  />
                  <InputReadOnly
                    label="Monto Abonado"
                    value={`$${parseFloat(viewingOrder.montoAbonado || 0).toFixed(2)}`}
                  />
                </div>
                <div className="mt-4 p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg">
                  <p className="text-[10px] font-bold text-blue-500 uppercase">
                    Saldo Pendiente
                  </p>
                  <p className="text-2xl font-mono text-white">
                    $
                    {(
                      parseFloat(viewingOrder.costoTotal || 0) -
                      parseFloat(viewingOrder.montoAbonado || 0)
                    ).toFixed(2)}
                  </p>
                </div>
              </Section>
            </div>

            <div className="p-5 bg-black border-t border-gray-800 flex justify-end gap-3 shrink-0">
              <button
                onClick={() => setShowViewModal(false)}
                className="px-6 py-3 bg-white text-black rounded-lg font-bold text-xs uppercase hover:bg-gray-200"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VISTA TÉCNICA DETALLADA */}
      {showViewModal && viewingOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="bg-[#121212] border border-gray-800 w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-xl shadow-2xl">
            <div className="sticky top-0 bg-[#121212]/90 backdrop-blur-md border-b border-gray-800 p-6 flex justify-between items-center z-10">
              <div>
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                    Orden #{viewingOrder.idOrden}
                  </h2>
                  <span className="px-3 py-1 bg-blue-900/30 text-blue-400 text-[10px] font-bold rounded-full border border-blue-800/50 uppercase">
                    {
                      tiposTrajeList.find(
                        (t) => t.idTipoTraje === viewingOrder.idTipoTraje,
                      )?.descripcion
                    }
                  </span>
                </div>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">
                  Ficha Técnica de Confección |{" "}
                  {
                    clientes.find((c) => c.idCliente === viewingOrder.idCliente)
                      ?.nombreCompleto
                  }
                </p>
              </div>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setViewingOrder(null);
                  setDetallesSaco(null);
                  setDetallesCamisa(null);
                }}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-12">
              {/* SECCIÓN 1: ESPECIFICACIONES DEL SACO */}
              {detallesSaco && (
                <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-3 mb-6 border-l-4 border-white pl-4">
                    <Scissors size={20} className="text-white" />
                    <h3 className="text-white text-lg font-black uppercase tracking-widest">
                      Detalle del Saco
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputReadOnly
                      label="Código Tela"
                      value={detallesSaco.codigoTela}
                    />
                    <InputReadOnly
                      label="Forro"
                      value={detallesSaco.codigoForro}
                    />
                    <InputReadOnly
                      label="Botonería (Código)"
                      value={detallesSaco.codigoBoton}
                    />
                    <InputReadOnly
                      label="Estilo Botones"
                      value={detallesSaco.estiloBotones}
                    />
                    <InputReadOnly
                      label="Estilo Solapa"
                      value={detallesSaco.estiloSolapa}
                    />
                    <InputReadOnly
                      label="Tamaño Solapa"
                      value={detallesSaco.tamanoSolapa}
                    />
                    <InputReadOnly
                      label="Bolsillo Pecho"
                      value={detallesSaco.estiloBolsilloPecho}
                    />
                    <InputReadOnly
                      label="Bolsillo Inferior"
                      value={detallesSaco.estiloBolsilloInf}
                    />
                    <InputReadOnly
                      label="Bolsillo Ticket"
                      value={detallesSaco.estiloBolsilloTicket}
                    />
                    <InputReadOnly
                      label="Ojal"
                      value={detallesSaco.estiloOjalIzquierdo}
                    />
                    <InputReadOnly
                      label="Monograma"
                      value={detallesSaco.monograma}
                    />
                    <div className="md:col-span-3">
                      <InputReadOnly
                        label="Observaciones de Saco"
                        value={detallesSaco.observaciones}
                      />
                    </div>
                  </div>
                </section>
              )}

              {/* SECCIÓN 2: ESPECIFICACIONES DEL PANTALÓN */}
              {viewingOrder.detallePantalon && (
                <section className="border-t border-gray-800 pt-8">
                  <div className="flex items-center gap-3 mb-6 border-l-4 border-gray-500 pl-4">
                    <Ruler size={20} className="text-white" />
                    <h3 className="text-white text-lg font-black uppercase tracking-widest">
                      Detalle del Pantalón
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputReadOnly
                      label="Tela Pantalón"
                      value={viewingOrder.detallePantalon.codigoTela}
                    />
                    <InputReadOnly
                      label="Estilo Pretina"
                      value={viewingOrder.detallePantalon.estiloPretina}
                    />
                    <InputReadOnly
                      label="Ajuste Cintura"
                      value={viewingOrder.detallePantalon.ajusteCintura}
                    />
                    <InputReadOnly
                      label="Altura"
                      value={viewingOrder.detallePantalon.alturaPretina}
                    />
                    <InputReadOnly
                      label="Pliegues"
                      value={viewingOrder.detallePantalon.estiloPliegues}
                    />
                    <InputReadOnly
                      label="Bolsillo Reloj"
                      value={viewingOrder.detallePantalon.estiloBolsilloReloj}
                    />
                    <InputReadOnly
                      label="Bajos"
                      value={viewingOrder.detallePantalon.estiloBajos}
                    />
                    <div className="md:col-span-2">
                      <InputReadOnly
                        label="Observaciones Pantalón"
                        value={viewingOrder.detallePantalon.observaciones}
                      />
                    </div>
                  </div>
                </section>
              )}

              {/* SECCIÓN 3: CAMISA (Si aplica) */}
              {detallesCamisa && (
                <section className="border-t border-gray-800 pt-8">
                  <div className="flex items-center gap-3 mb-6 border-l-4 border-yellow-600 pl-4">
                    <Layers size={20} className="text-white" />
                    <h3 className="text-white text-lg font-black uppercase tracking-widest">
                      Detalle de Camisa
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputReadOnly
                      label="Opc. Camisa"
                      value={detallesCamisa.opcionCamisa}
                    />
                    <InputReadOnly
                      label="Tela"
                      value={detallesCamisa.codigoTela}
                    />
                    <InputReadOnly
                      label="Cuello"
                      value={detallesCamisa.estiloCuello}
                    />
                    <InputReadOnly
                      label="Puño"
                      value={detallesCamisa.estiloPuno}
                    />
                    <InputReadOnly
                      label="Tapeta"
                      value={detallesCamisa.estiloTapeta}
                    />
                    <InputReadOnly
                      label="Iniciales"
                      value={detallesCamisa.iniciales}
                    />
                    <div className="md:col-span-3">
                      <InputReadOnly
                        label="Observaciones Camisa"
                        value={detallesCamisa.observaciones}
                      />
                    </div>
                  </div>
                </section>
              )}

              <section className="border-t border-gray-800 pt-8">
                <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                  Cuadro de Medidas Finales
                </h3>
                <div className="bg-black border border-gray-800 rounded-lg p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase">
                      Hombros
                    </span>
                    <span className="text-white font-bold">
                      {viewingOrder.medidas?.sacoHombros || "--"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase">
                      Pecho
                    </span>
                    <span className="text-white font-bold">
                      {viewingOrder.medidas?.sacoPecho || "--"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase">
                      Estómago
                    </span>
                    <span className="text-white font-bold">
                      {viewingOrder.medidas?.sacoEstomago || "--"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase">
                      Largo Frente
                    </span>
                    <span className="text-white font-bold">
                      {viewingOrder.medidas?.sacoLargoFrente || "--"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase">
                      Manga Izq.
                    </span>
                    <span className="text-white font-bold">
                      {viewingOrder.medidas?.sacoMangaIzq || "--"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase">
                      Manga Der.
                    </span>
                    <span className="text-white font-bold">
                      {viewingOrder.medidas?.sacoMangaDer || "--"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase">
                      Pant. Cintura
                    </span>
                    <span className="text-white font-bold">
                      {viewingOrder.medidas?.pantCintura || "--"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase">
                      Pant. Cadera
                    </span>
                    <span className="text-white font-bold">
                      {viewingOrder.medidas?.pantCadera || "--"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase">
                      Largo Pant.
                    </span>
                    <span className="text-white font-bold">
                      {viewingOrder.medidas?.pantLargoIzq || "--"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase">
                      Camisa Cuello
                    </span>
                    <span className="text-white font-bold">
                      {viewingOrder.medidas?.camisaCuello || "--"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase">
                      Camisa Manga
                    </span>
                    <span className="text-white font-bold">
                      {viewingOrder.medidas?.camisaManga || "--"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gray-500 uppercase">
                      Fit
                    </span>
                    <span className="text-white font-bold">
                      {viewingOrder.medidas?.tipoFit || "--"}
                    </span>
                  </div>
                </div>
              </section>
              <section className="bg-white/5 rounded-xl p-8 flex flex-wrap justify-between items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                    Costo Total
                  </span>
                  <span className="text-3xl font-black text-white">
                    ${viewingOrder.costoTotal}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                    Monto Abonado
                  </span>
                  <span className="text-3xl font-black text-green-500">
                    ${viewingOrder.montoAbonado}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                    Saldo Pendiente
                  </span>
                  <span className="text-3xl font-black text-red-500">
                    $
                    {(
                      viewingOrder.costoTotal - viewingOrder.montoAbonado
                    ).toFixed(2)}
                  </span>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ordenes;
