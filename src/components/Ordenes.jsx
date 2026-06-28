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
  Edit,
  Download,
  Copy,
  ClipboardPaste,
  Trash2,
} from "lucide-react";
import { ordenesService } from "../api/ordenes";
import { clientesService } from "../api/clientes";
import { sucursalesService } from "../api/sucursales";
import { estatusOrdenService } from "../api/estatusOrden";
import { tipoTrajeService } from "../api/tipoTraje";
import { detallesService } from "../api/detalles";
import Alert from "../components/Alert";
import SacoBoton1 from "../assets/ImagSaco/EstiloBotones/1 boton.png";
import SacoBoton2 from "../assets/ImagSaco/EstiloBotones/2 boton.png";
import SacoBoton3rolado1 from "../assets/ImagSaco/EstiloBotones/3 boton 1 rolado.png";
import SacoBotonDoblePecho2en1 from "../assets/ImagSaco/EstiloBotones/doble pecho 2 en 1.png";
import SacoBotonDoblePecho2en4 from "../assets/ImagSaco/EstiloBotones/doble pecho 2 en 4.png";
import SacoBotonDoblePecho3en1 from "../assets/ImagSaco/EstiloBotones/doble pecho 3 en 1.png";
import SacoBotonDoblePecho4en1 from "../assets/ImagSaco/EstiloBotones/doble pecho 4 en 1.png";
import SacoBotonDoblePecho6en1 from "../assets/ImagSaco/EstiloBotones/doble pecho 6 en 1.png";
import SacoBotonDoblePecho6en3 from "../assets/ImagSaco/EstiloBotones/doble pecho 6 en 3.png";
import SacoBotonRana from "../assets/ImagSaco/EstiloBotones/1 boton rana.png";
import SacoBotonRana2 from "../assets/ImagSaco/EstiloBotones/1 boton rana 2.png";
import SacoBotonRana3 from "../assets/ImagSaco/EstiloBotones/1 boton rana 3.png";
import SacoBotonRana4 from "../assets/ImagSaco/EstiloBotones/1 boton rana 4.png";
import SacoBotonDoblePecho2Rana from "../assets/ImagSaco/EstiloBotones/doble pecho dos botenes de rana.png";
import bpCurvo from "../assets/ImagSaco/EstiloBolsilloPecho/CURVO_1.jpg";
import bpDobleRibete from "../assets/ImagSaco/EstiloBolsilloPecho/DOBLE RELIEBE_1.jpg";
import bpDosDiamante from "../assets/ImagSaco/EstiloBolsilloPecho/BOLSILLOS DE PARCHE CON FLAP DIAMANTE_1.jpg";
import bpParche from "../assets/ImagSaco/EstiloBolsilloPecho/PARCHE_1.jpg";
import bpRecto from "../assets/ImagSaco/EstiloBolsilloPecho/RECTO_1.jpg";
import bpUnRibete from "../assets/ImagSaco/EstiloBolsilloPecho/UN RIBETE 1.2CM_1.jpg";
import BolsInferSinSolapa from "../assets/ImagSaco/EstiloBolsilloInferior/sin solapa.png";
import BolsInferSinSolapa2Rectos from "../assets/ImagSaco/EstiloBolsilloInferior/sin solapa 2 rectos.png";
import BolsInferSinBolsillos from "../assets/ImagSaco/EstiloBolsilloInferior/sin bolsillo.png";
import BolsInferInclinConSolapa from "../assets/ImagSaco/EstiloBolsilloInferior/inclinados con solapa.png";
import BolsInferParchePliegue from "../assets/ImagSaco/EstiloBolsilloInferior/bolsillos de parche con un pliegue.png";
import BolsInferParcheSolapaCuadrada from "../assets/ImagSaco/EstiloBolsilloInferior/bolsillos de parche con solapa cuadrada.png";
import BolsInfer2RectosRibeteados from "../assets/ImagSaco/EstiloBolsilloInferior/2 rectos ribeteados.png";
import BolsInfer2InclinRibeteados from "../assets/ImagSaco/EstiloBolsilloInferior/2 inclinados ribeteados.png";
import BolsInfer2ParcheSolapaDiamante from "../assets/ImagSaco/EstiloBolsilloInferior/2 de parche con solopa diamante.png";
import BolsInfer2SolapaDiamante from "../assets/ImagSaco/EstiloBolsilloInferior/2 con solopa diamante.png";
import BolsInfer2SolapaCuadrada from "../assets/ImagSaco/EstiloBolsilloInferior/2 con solopa cuadrada.png";
import BolsInfer2BolsillosParche from "../assets/ImagSaco/EstiloBolsilloInferior/2 bolsillos de parche.png";
import solapaSinSolapa from "../assets/ImagSaco/EstiloSolapa/sin solapa.png";
import solapaMuesca from "../assets/ImagSaco/EstiloSolapa/muesca.png";
import solapaMuescaRedonda from "../assets/ImagSaco/EstiloSolapa/muesca redonda.png";
import solapaPuntaLanza from "../assets/ImagSaco/EstiloSolapa/punta de lanza.png";
import solapaPuntaLanzaCurva from "../assets/ImagSaco/EstiloSolapa/punta de lanza curva.png";
import solapaChal from "../assets/ImagSaco/EstiloSolapa/chal.png";
import solapaChal68cm from "../assets/ImagSaco/EstiloSolapa/chal 6-8 cm.png";
import solapaDoblePechoRecto from "../assets/ImagSaco/EstiloSolapa/doble pecho recto.png";
import solapaChalDoblePechoOp from "../assets/ImagSaco/EstiloSolapa/chal doble pecho op.png";
import sinPretina from "../assets/ImagPantalon/EstiloPretina/sin pretina.png";
import estiloItaliano1 from "../assets/ImagPantalon/EstiloPretina/estilo italiano 1.png";
import estiloItaliano2Redondas from "../assets/ImagPantalon/EstiloPretina/estilo italiano 2 redondas.png";
import estiloItaliano3 from "../assets/ImagPantalon/EstiloPretina/estilo italiano 3.png";
import estiloItaliano4 from "../assets/ImagPantalon/EstiloPretina/estilo italiano 4.png";
import estiloItaliano5 from "../assets/ImagPantalon/EstiloPretina/estilo italiano 5.png";
import estiloItaliano5Puntas from "../assets/ImagPantalon/EstiloPretina/estilo italiano 5 puntas.png";
import estiloItalianoA from "../assets/ImagPantalon/EstiloPretina/estilo italiano A.png";
import extendidaPunta from "../assets/ImagPantalon/EstiloPretina/pretina extentida de punta.png";
import extendidaRecta from "../assets/ImagPantalon/EstiloPretina/pretina extentida recta.png";
import extendidaRedonda from "../assets/ImagPantalon/EstiloPretina/pretina extentida redonda.png";
import extendidaLargaPunta from "../assets/ImagPantalon/EstiloPretina/pretina extentida larga de punta.png";
import extendidaLargaRecta from "../assets/ImagPantalon/EstiloPretina/pretina extentida larga recta.png";
import extendidaLargaRedonda from "../assets/ImagPantalon/EstiloPretina/pretina extentida larga redonda.png";
import chalecoPechoSin from "../assets/ImagChaleco/EstiloBolsilloPecho/sin.png";
import chalecoPechoRecto from "../assets/ImagChaleco/EstiloBolsilloPecho/recto.png";
import chalecoPechoRegular from "../assets/ImagChaleco/EstiloBolsilloPecho/regular.png";
import chalecoPechoDobleRibete from "../assets/ImagChaleco/EstiloBolsilloPecho/doble ribete.png";
import chalecoPechoIzqDerDobleRibete from "../assets/ImagChaleco/EstiloBolsilloPecho/izq. dere. doble ribete.png";
import chalecoPechoIzqDer from "../assets/ImagChaleco/EstiloBolsilloPecho/izq. dere.png";
import bolsillosSin from "../assets/ImagChaleco/EstiloBolsillos/sinbolsillo.png";
import bolsillosRectos2Ribetes from "../assets/ImagChaleco/EstiloBolsillos/dos ribetes rectos.png";
import bolsillosRectosCRibete from "../assets/ImagChaleco/EstiloBolsillos/1 ribete recto.png";
import bolsillosInc2Ribetes from "../assets/ImagChaleco/EstiloBolsillos/dos ribetes inclinados.png";
import bolsillosInc1Ribete from "../assets/ImagChaleco/EstiloBolsillos/1 ribete inclinado.png";
import bolsillosParche from "../assets/ImagChaleco/EstiloBolsillos/parche.png";
import bolsillosDiamante from "../assets/ImagChaleco/EstiloBolsillos/diamante.png";
import bolsillosSolapaInclinada from "../assets/ImagChaleco/EstiloBolsillos/solapa inclinado.png";
import bolsillosSolapaRecta from "../assets/ImagChaleco/EstiloBolsillos/solapa recto.png";
import boton3 from "../assets/ImagChaleco/EstiloBotones/3.png";
import boton4 from "../assets/ImagChaleco/EstiloBotones/4.png";
import boton5 from "../assets/ImagChaleco/EstiloBotones/5.png";
import boton6 from "../assets/ImagChaleco/EstiloBotones/6.png";
import boton6Especial from "../assets/ImagChaleco/EstiloBotones/ESPECIAL DOBLE 6.png";
import boton8 from "../assets/ImagChaleco/EstiloBotones/DOBLE 8.png";
import doblePecho4 from "../assets/ImagChaleco/EstiloBotones/DOBLE 4.png";
import doblePecho6 from "../assets/ImagChaleco/EstiloBotones/DOBLE 6.png";
import doblePecho8 from "../assets/ImagChaleco/EstiloBotones/DOBLE 8.png";
import doblePecho8Especial from "../assets/ImagChaleco/EstiloBotones/ESPECIAL DOBLE 8.png";
import doblePecho10 from "../assets/ImagChaleco/EstiloBotones/DOBLE 10.png";
import doblePechoV5 from "../assets/ImagChaleco/EstiloBotones/ESPECIAL DOBLE V5.png";
import cuelloFormaU from "../assets/ImagChaleco/EstiloCuello/forma u.png";
import cuelloFormaV from "../assets/ImagChaleco/EstiloCuello/forma v.png";
import cuelloSolapaChal from "../assets/ImagChaleco/EstiloCuello/chal.png";
import cuelloSolapaChalU from "../assets/ImagChaleco/EstiloCuello/chal u.png";
import cuelloSolapaMuesca from "../assets/ImagChaleco/EstiloCuello/muesca.png";
import cuelloSolapaLanza from "../assets/ImagChaleco/EstiloCuello/punta de lanza.png";
import cuelloSolapaLanzaCurva from "../assets/ImagChaleco/EstiloCuello/punta de lanza curva.png";
import inferiorPuntas from "../assets/ImagChaleco/EstiloInferior/puntas.png";
import inferiorRecto from "../assets/ImagChaleco/EstiloInferior/recto.png";
import inferiorRedondo from "../assets/ImagChaleco/EstiloInferior/redondo.png";
import buttonAngle1 from "../assets/ImagCamisa/BotonManga/1 button angle.png";
import buttonAround1 from "../assets/ImagCamisa/BotonManga/1 button around.png";
import buttonSquare1 from "../assets/ImagCamisa/BotonManga/1 button square.png";
import buttonAngle2 from "../assets/ImagCamisa/BotonManga/2 button angle.png";
import buttonAround2 from "../assets/ImagCamisa/BotonManga/2 button around.png";
import buttonSquare2 from "../assets/ImagCamisa/BotonManga/2 button square.png";
import angleConvertible from "../assets/ImagCamisa/BotonManga/angle convertible.png";
import cocktail from "../assets/ImagCamisa/BotonManga/cocktail.png";
import frenchAngle from "../assets/ImagCamisa/BotonManga/french angle.png";
import frenchRound from "../assets/ImagCamisa/BotonManga/french round.png";
import frenchSquare from "../assets/ImagCamisa/BotonManga/french square.png";
import neapolianCuff from "../assets/ImagCamisa/BotonManga/neapolian cuff.png";
import quarterRound from "../assets/ImagCamisa/BotonManga/quarter round.png";
import roundConvertible from "../assets/ImagCamisa/BotonManga/round convertible.png";
import squareConvertible from "../assets/ImagCamisa/BotonManga/square convertible.png";
import bandCollar from "../assets/ImagCamisa/Collars/band collar.png";
import boatNeck from "../assets/ImagCamisa/Collars/boat neck.png";
import classicCollar from "../assets/ImagCamisa/Collars/clasic collar.png";
import clubCollar from "../assets/ImagCamisa/Collars/club collar.png";
import cutaway from "../assets/ImagCamisa/Collars/cutaway.png";
import italianSpread from "../assets/ImagCamisa/Collars/italian spread.png";
import semiSpread from "../assets/ImagCamisa/Collars/semi spread.png";
import spreadCollar from "../assets/ImagCamisa/Collars/spread collar.png";
import windsorCollar from "../assets/ImagCamisa/Collars/windsor collar.png";
import wingTip from "../assets/ImagCamisa/Collars/wing tip.png";
import collarAndCollarBand from "../assets/ImagCamisa/ContrastPosition/collar & collar band.png";
import collarAndCuffs from "../assets/ImagCamisa/ContrastPosition/collar & cuffs.png";
import cuffs from "../assets/ImagCamisa/ContrastPosition/cuffs.png";
import insideCollarAndCuffs from "../assets/ImagCamisa/ContrastPosition/inside collar nd cuffs.png";
import insideCollarCuffsAndPlaket from "../assets/ImagCamisa/ContrastPosition/inside collar, cuffs and plaket.png";
import insideCollar from "../assets/ImagCamisa/ContrastPosition/inside collar.png";
import noContrast from "../assets/ImagCamisa/ContrastPosition/no.png";
import yorkInside from "../assets/ImagCamisa/ContrastPosition/york inside.png";
import yorkOutside from "../assets/ImagCamisa/ContrastPosition/york outside.png";
import largePleats from "../assets/ImagCamisa/Estilo/large pleates.png";
import largePleatsBottom from "../assets/ImagCamisa/Estilo/large pleats to the bottom.png";
import mediumPleatsBottom from "../assets/ImagCamisa/Estilo/medium pleats to the bottom.png";
import mediumPleats from "../assets/ImagCamisa/Estilo/medium pleats.png";
import pleat from "../assets/ImagCamisa/Estilo/pleat.png";
import smallPleatsBottom from "../assets/ImagCamisa/Estilo/small pleats to the bottom.png";
import smallPleats from "../assets/ImagCamisa/Estilo/small pleats.png";
import standard from "../assets/ImagCamisa/Estilo/standard.png";
import uShapeLargePleats from "../assets/ImagCamisa/Estilo/U shape large pleats.png";
import uShapeMediumPleats from "../assets/ImagCamisa/Estilo/U shape mediums pleats.png";
import uShapeSmallPleats from "../assets/ImagCamisa/Estilo/U shape small pleats.png";
import uShape from "../assets/ImagCamisa/Estilo/U shape.png";
import concealedPlacket from "../assets/ImagCamisa/EstiloBotones/concealed placket.png";
import convertiblePlacket2 from "../assets/ImagCamisa/EstiloBotones/convertible placket 2.png";
import convertiblePlacket from "../assets/ImagCamisa/EstiloBotones/convertible placket.png";
import noPlacket from "../assets/ImagCamisa/EstiloBotones/no placket.png";
import poloPlacket from "../assets/ImagCamisa/EstiloBotones/polo placket.png";
import standardPlacket from "../assets/ImagCamisa/EstiloBotones/standard placket.png";
import tuxedoPlacket1 from "../assets/ImagCamisa/EstiloBotones/tuxedo placket 1.png";
import tuxedoPlacket2 from "../assets/ImagCamisa/EstiloBotones/tuxedo placket 2.png";
import hexagonPocket from "../assets/ImagCamisa/Pocket/hexagon pocket.png";
import noPocket from "../assets/ImagCamisa/Pocket/no.png";
import pointedPocket from "../assets/ImagCamisa/Pocket/pointed pocket.png";
import roundPocket from "../assets/ImagCamisa/Pocket/round pocket.png";
import squarePocket from "../assets/ImagCamisa/Pocket/square pocket.png";
import solapaHexagon from "../assets/ImagCamisa/SolapaBolsillos/hexagon pocket flap.png";
import solapaNo from "../assets/ImagCamisa/SolapaBolsillos/no.png";
import solapaRound from "../assets/ImagCamisa/SolapaBolsillos/round pocket flap.png";
import solapaSquare from "../assets/ImagCamisa/SolapaBolsillos/square pocket flap.png";
import solapaTriangular from "../assets/ImagCamisa/SolapaBolsillos/triangular pocket flap.png";
import BolsilloTicketParche from "../assets/ImagSaco/EstiloBolsilloTicket/bolsillo de parche.png";
import BolsilloTicketInclinadoDobleSolapa from "../assets/ImagSaco/EstiloBolsilloTicket/bolsillo inclinado doble solapa.png";
import BolsilloTicketInclinadoDobleRibete from "../assets/ImagSaco/EstiloBolsilloTicket/bolsillo inclinado doble ribete.png";
import BolsilloTicketInclinadoSinSolapa from "../assets/ImagSaco/EstiloBolsilloTicket/bolsillo inclinado sin solapa.png";
import BolsilloTicketRectoSolapa from "../assets/ImagSaco/EstiloBolsilloTicket/bolsillo recto con solapa.png";
import BolsilloTicketRectoDobleRibete from "../assets/ImagSaco/EstiloBolsilloTicket/bolsillo recto doble ribete.png";
import BolsilloTicketRectoSinSolapa from "../assets/ImagSaco/EstiloBolsilloTicket/bolsillo recto sin solapa.png";

const opcionesSolapaBolsillos = [
  {
    value: "Sin Solapa",
    label: "Sin Solapa",
    img: solapaNo,
  },
  {
    value: "Hexagonal",
    label: "Hexagonal",
    img: solapaHexagon,
  },
  {
    value: "Redonda",
    label: "Redonda",
    img: solapaRound,
  },
  {
    value: "Cuadrada",
    label: "Cuadrada",
    img: solapaSquare,
  },
  {
    value: "Triangular",
    label: "Triangular",
    img: solapaTriangular,
  },
];

const opcionesPocket = [
  {
    value: "Ninguno",
    label: "Ninguno",
    img: noPocket,
  },
  {
    value: "Hexagon Pocket",
    label: "Hexagon Pocket",
    img: hexagonPocket,
  },
  {
    value: "Pointed Pocket",
    label: "Pointed Pocket",
    img: pointedPocket,
  },
  {
    value: "Round Pocket",
    label: "Round Pocket",
    img: roundPocket,
  },
  {
    value: "Square Pocket",
    label: "Square Pocket",
    img: squarePocket,
  },
];

const opcionesEstiloBotones = [
  {
    value: "No Placket",
    label: "No Placket",
    img: noPlacket,
  },
  {
    value: "Standard Placket",
    label: "Standard Placket",
    img: standardPlacket,
  },
  {
    value: "Concealed Placket",
    label: "Concealed Placket",
    img: concealedPlacket,
  },
  {
    value: "Convertible Placket",
    label: "Convertible Placket",
    img: convertiblePlacket,
  },
  {
    value: "Convertible Placket 2",
    label: "Convertible Placket 2",
    img: convertiblePlacket2,
  },
  {
    value: "Polo Placket",
    label: "Polo Placket",
    img: poloPlacket,
  },
  {
    value: "Tuxedo Placket 1",
    label: "Tuxedo Placket 1",
    img: tuxedoPlacket1,
  },
  {
    value: "Tuxedo Placket 2",
    label: "Tuxedo Placket 2",
    img: tuxedoPlacket2,
  },
];

const opcionesEstilo = [
  {
    value: "Estandar",
    label: "Estandar",
    img: standard,
  },
  {
    value: "Pleat",
    label: "Pleat",
    img: pleat,
  },
  {
    value: "Large Pleats",
    label: "Large Pleats",
    img: largePleats,
  },
  {
    value: "Medium Pleats",
    label: "Medium Pleats",
    img: mediumPleats,
  },
  {
    value: "Small Pleats",
    label: "Small Pleats",
    img: smallPleats,
  },
  {
    value: "Large Pleats to the Bottom",
    label: "Large Pleats to the Bottom",
    img: largePleatsBottom,
  },
  {
    value: "Medium Pleats to the Bottom",
    label: "Medium Pleats to the Bottom",
    img: mediumPleatsBottom,
  },
  {
    value: "Small Pleats to the Bottom",
    label: "Small Pleats to the Bottom",
    img: smallPleatsBottom,
  },
  {
    value: "U Shape",
    label: "U Shape",
    img: uShape,
  },
  {
    value: "U Shape Large Pleats",
    label: "U Shape Large Pleats",
    img: uShapeLargePleats,
  },
  {
    value: "U Shape Medium Pleats",
    label: "U Shape Medium Pleats",
    img: uShapeMediumPleats,
  },
  {
    value: "U Shape Small Pleats",
    label: "U Shape Small Pleats",
    img: uShapeSmallPleats,
  },
];

const opcionesContrastPosition = [
  {
    value: "Ninguno",
    label: "Ninguno",
    img: noContrast,
  },
  {
    value: "Collar & Collar Band",
    label: "Collar & Collar Band",
    img: collarAndCollarBand,
  },
  {
    value: "Collar & Cuffs",
    label: "Collar & Cuffs",
    img: collarAndCuffs,
  },
  {
    value: "Cuffs",
    label: "Cuffs",
    img: cuffs,
  },
  {
    value: "Inside Collar & Cuffs",
    label: "Inside Collar & Cuffs",
    img: insideCollarAndCuffs,
  },
  {
    value: "Inside Collar, Cuffs and Placket",
    label: "Inside Collar, Cuffs and Placket",
    img: insideCollarCuffsAndPlaket,
  },
  {
    value: "Inside Collar",
    label: "Inside Collar",
    img: insideCollar,
  },
  {
    value: "York Inside",
    label: "York Inside",
    img: yorkInside,
  },
  {
    value: "York Outside",
    label: "York Outside",
    img: yorkOutside,
  },
];

const opcionesCollar = [
  {
    value: "Band Collar",
    label: "Band Collar",
    img: bandCollar,
  },
  {
    value: "Boat Neck",
    label: "Boat Neck",
    img: boatNeck,
  },
  {
    value: "Classic Collar",
    label: "Classic Collar",
    img: classicCollar,
  },
  {
    value: "Club Collar",
    label: "Club Collar",
    img: clubCollar,
  },
  {
    value: "Cutaway",
    label: "Cutaway",
    img: cutaway,
  },
  {
    value: "Italian Spread",
    label: "Italian Spread",
    img: italianSpread,
  },
  {
    value: "Semi Spread",
    label: "Semi Spread",
    img: semiSpread,
  },
  {
    value: "Spread Collar",
    label: "Spread Collar",
    img: spreadCollar,
  },
  {
    value: "Windsor Collar",
    label: "Windsor Collar",
    img: windsorCollar,
  },
  {
    value: "Wing Tip",
    label: "Wing Tip",
    img: wingTip,
  },
];

const opcionesBotonManga = [
  {
    value: "1_button_angle",
    label: "1 Button Angle",
    img: buttonAngle1,
  },
  {
    value: "1_button_around",
    label: "1 Button Around",
    img: buttonAround1,
  },
  {
    value: "1_button_square",
    label: "1 Button Square",
    img: buttonSquare1,
  },

  {
    value: "2_button_angle",
    label: "2 Button Angle",
    img: buttonAngle2,
  },
  {
    value: "2_button_around",
    label: "2 Button Around",
    img: buttonAround2,
  },
  {
    value: "2_button_square",
    label: "2 Button Square",
    img: buttonSquare2,
  },

  {
    value: "angle_convertible",
    label: "Angle Convertible",
    img: angleConvertible,
  },
  {
    value: "cocktail",
    label: "Cocktail",
    img: cocktail,
  },

  {
    value: "french_angle",
    label: "French Angle",
    img: frenchAngle,
  },
  {
    value: "french_round",
    label: "French Round",
    img: frenchRound,
  },
  {
    value: "french_square",
    label: "French Square",
    img: frenchSquare,
  },

  {
    value: "neapolian_cuff",
    label: "Neapolian Cuff",
    img: neapolianCuff,
  },

  {
    value: "quarter_round",
    label: "Quarter Round",
    img: quarterRound,
  },

  {
    value: "round_convertible",
    label: "Round Convertible",
    img: roundConvertible,
  },
  {
    value: "square_convertible",
    label: "Square Convertible",
    img: squareConvertible,
  },
];

const opcionesEstiloInferior = [
  {
    value: "puntas",
    label: "Puntas",
    img: inferiorPuntas,
  },
  {
    value: "recto",
    label: "Recto",
    img: inferiorRecto,
  },
  {
    value: "redondo",
    label: "Redondo",
    img: inferiorRedondo,
  },
];
const opcionesCuello = [
  {
    value: "forma V",
    label: "Forma en V",
    img: cuelloFormaV,
  },
  {
    value: "forma U",
    label: "Forma en U",
    img: cuelloFormaU,
  },
  {
    value: "solapa de muesca",
    label: "Solapa de Muesca",
    img: cuelloSolapaMuesca,
  },
  {
    value: "solapa punta de lanza",
    label: "Solapa Punta de Lanza",
    img: cuelloSolapaLanza,
  },
  {
    value: "solapa punta de lanza curva",
    label: "Punta de Lanza Curva",
    img: cuelloSolapaLanzaCurva,
  },
  {
    value: "solapa de chal",
    label: "Solapa de Chal",
    img: cuelloSolapaChal,
  },
  {
    value: "solapa de chal U",
    label: "Solapa de Chal en U",
    img: cuelloSolapaChalU,
  },
];

const opcionesBotonesChaleco = [
  {
    value: "3 botones",
    label: "3 Botones",
    img: boton3,
  },
  {
    value: "4 botones",
    label: "4 Botones",
    img: boton4,
  },
  {
    value: "5 botones",
    label: "5 Botones",
    img: boton5,
  },
  {
    value: "6 botones",
    label: "6 Botones",
    img: boton6,
  },
  {
    value: "6 especial",
    label: "6 Botones (Especial)",
    img: boton6Especial,
  },
  {
    value: "8 botones",
    label: "8 Botones",
    img: boton8,
  },
  {
    value: "doble pecho 4",
    label: "Doble Pecho (4 Botones)",
    img: doblePecho4,
  },
  {
    value: "doble pecho 6",
    label: "Doble Pecho (6 Botones)",
    img: doblePecho6,
  },
  {
    value: "doble pecho 8",
    label: "Doble Pecho (8 Botones)",
    img: doblePecho8,
  },
  {
    value: "doble pecho 8 especial",
    label: "Doble Pecho 8 (Especial)",
    img: doblePecho8Especial,
  },
  {
    value: "doble pecho 10",
    label: "Doble Pecho (10 Botones)",
    img: doblePecho10,
  },
  {
    value: "doble pecho v 5",
    label: "Doble Pecho V (5 Botones)",
    img: doblePechoV5,
  },
];

const opcionesBolsillos = [
  {
    value: "Sin bolsillos",
    label: "Sin bolsillos visuales",
    img: bolsillosSin,
  },
  {
    value: "Dos rectos c ribete",
    label: "Rectos con 1 Ribete (A)",
    img: bolsillosRectosCRibete,
  },
  {
    value: "Rectos con doble ribete",
    label: "Rectos con Doble Ribete",
    img: bolsillosRectos2Ribetes,
  },
  {
    value: "Inclinados con 1 ribete",
    label: "Inclinados con 1 Ribete",
    img: bolsillosInc1Ribete,
  },
  {
    value: "Dos inclinados con 2 ribetes",
    label: "Inclinados con 2 Ribetes",
    img: bolsillosInc2Ribetes,
  },
  {
    value: "Diamante",
    label: "Diamante",
    img: bolsillosDiamante,
  },
  {
    value: "Solapa inclinada",
    label: "Solapa Inclinada",
    img: bolsillosSolapaInclinada,
  },
  {
    value: "Solapa recta",
    label: "Solapa Recta",
    img: bolsillosSolapaRecta,
  },
  {
    value: "Dos de parche",
    label: "De Parche",
    img: bolsillosParche,
  },
];

const opcionesBolsilloPechoChaleco = [
  {
    value: "Sin bolsillo",
    label: "Sin bolsillo",
    img: chalecoPechoSin,
  },
  {
    value: "Bolsillo regular",
    label: "Regular",
    img: chalecoPechoRegular,
  },
  {
    value: "Recto",
    label: "Recto",
    img: chalecoPechoRecto,
  },
  {
    value: "Izq y dere un ribete",
    label: "Izquierdo y Derecho un Ribete",
    img: chalecoPechoIzqDer,
  },
  {
    value: "Bolsillo doble ribete",
    label: "Doble Ribete",
    img: chalecoPechoDobleRibete,
  },
  {
    value: "Izq y dere doble ribete",
    label: "Izquierdo y Derecho Doble Ribete",
    img: chalecoPechoIzqDerDobleRibete,
  },
];

const opcionesPretinas = [
  // 1. SIN PRETINA
  {
    value: "Sin pretina",
    label: "Sin Pretina",
    img: sinPretina,
  },

  // 2. ESTILOS ITALIANOS
  {
    value: "Estilo italiano A",
    label: "Italiano A",
    img: estiloItalianoA,
  },
  {
    value: "Estilo italiano 1",
    label: "Italiano 1",
    img: estiloItaliano1,
  },
  {
    value: "Estilo italiano 2 redondas",
    label: "Italiano 2 (Redondas)",
    img: estiloItaliano2Redondas,
  },
  {
    value: "Estilo italiano 3",
    label: "Italiano 3",
    img: estiloItaliano3,
  },
  {
    value: "Estilo italiano 4",
    label: "Italiano 4",
    img: estiloItaliano4,
  },
  {
    value: "Estilo italiano 5",
    label: "Italiano 5",
    img: estiloItaliano5,
  },
  {
    value: "Estilo italiano 5 puntas",
    label: "Italiano 5 (Puntas)",
    img: estiloItaliano5Puntas,
  },

  // 3. PRETINAS EXTENDIDAS
  {
    value: "Pretina extendida recta",
    label: "Extendida (Recta)",
    img: extendidaRecta,
  },
  {
    value: "Pretina extendida redonda",
    label: "Extendida (Redonda)",
    img: extendidaRedonda,
  },
  {
    value: "Pretina extendida de punta",
    label: "Extendida (Punta)",
    img: extendidaPunta,
  },

  // 4. PRETINAS EXTENDIDAS LARGAS
  {
    value: "Pretina extendida larga recta",
    label: "Extendida Larga (Recta)",
    img: extendidaLargaRecta,
  },
  {
    value: "Pretina extendida larga redonda",
    label: "Extendida Larga (Redonda)",
    img: extendidaLargaRedonda,
  },
  {
    value: "Pretina extendida larga punta",
    label: "Extendida Larga (Punta)",
    img: extendidaLargaPunta,
  },
];

const opcionesSolapa = [
  {
    value: "Sin solapa",
    label: "Sin solapa",
    img: solapaSinSolapa,
  },
  {
    value: "Muesca",
    label: "Muesca Estándar",
    img: solapaMuesca,
  },
  {
    value: "Muesca redonda",
    label: "Muesca Redonda",
    img: solapaMuescaRedonda,
  },
  {
    value: "Punta de lanza",
    label: "Punta de Lanza",
    img: solapaPuntaLanza,
  },
  {
    value: "Punta de lanza curva",
    label: "Punta de Lanza Curva",
    img: solapaPuntaLanzaCurva,
  },
  {
    value: "Chal",
    label: "Cuello Chal",
    img: solapaChal,
  },
  {
    value: "Chal (6cm - 8cm)",
    label: "Chal (6cm - 8cm)",
    img: solapaChal68cm,
  },
  {
    value: "Doble pecho recto",
    label: "Doble Pecho Recto",
    img: solapaDoblePechoRecto,
  },
  {
    value: "Chal doble pecho op",
    label: "Chal Doble Pecho Op",
    img: solapaChalDoblePechoOp,
  },
];
const opcionesBolsilloInferior = [
  // 1. SIN BOLSILLOS (Lo más limpio/minimalista)
  {
    value: "sin bolsillos",
    label: "Sin Bolsillos",
    img: BolsInferSinBolsillos,
  },

  // 2. RIBETEADOS / SIN SOLAPA (Formal y liso)
  {
    value: "Inclinados sin solapa",
    label: "Inclinados Sin Solapa",
    img: BolsInferSinSolapa,
  },
  {
    value: "sin solapa rectos",
    label: "Sin Solapa (Rectos)",
    img: BolsInferSinSolapa2Rectos,
  },
  {
    value: "2 rectos ribeteados",
    label: "2 Rectos Ribeteados",
    img: BolsInfer2RectosRibeteados,
  },
  {
    value: "2 inclinados ribeteados",
    label: "2 Inclinados Ribeteados",
    img: BolsInfer2InclinRibeteados,
  },

  // 3. CON SOLAPA CLÁSICA (El estándar de los trajes)
  {
    value: "inclinados con solapa",
    label: "Inclinados con Solapa",
    img: BolsInferInclinConSolapa,
  },
  {
    value: "2 con solapa cuadrada",
    label: "2 con Solapa Cuadrada",
    img: BolsInfer2SolapaCuadrada,
  },
  {
    value: "2 con solapa diamante",
    label: "2 con Solapa Diamante",
    img: BolsInfer2SolapaDiamante,
  },

  // 4. DE PARCHE (Más casual/sport)
  {
    value: "2 bolsillos de parche",
    label: "2 Bolsillos de Parche",
    img: BolsInfer2BolsillosParche,
  },
  {
    value: "bolsillos de parche con solapa cuadrada",
    label: "Bolsillos de Parche con Solapa Cuadrada",
    img: BolsInferParcheSolapaCuadrada,
  },
  {
    value: "2 de parche con solapa diamante",
    label: "2 de Parche con Solapa Diamante",
    img: BolsInfer2ParcheSolapaDiamante,
  },
  {
    value: "bolsillos de parche con un pliegue",
    label: "Bolsillos de Parche con un Pliegue",
    img: BolsInferParchePliegue,
  },
];

const opcionesBotones = [
  {
    value: "1 boton",
    label: "1 Botón",
    img: SacoBoton1,
  },
  {
    value: "2 botones",
    label: "2 Botones",
    img: SacoBoton2,
  },
  {
    value: "3 botones 1 rolado",
    label: "3 Botones (1 Rolado)",
    img: SacoBoton3rolado1,
  },
  {
    value: "doble pecho 2 en 1",
    label: "Doble Pecho 2 en 1",
    img: SacoBotonDoblePecho2en1,
  },
  {
    value: "doble pecho 4 en 1",
    label: "Doble Pecho 4 en 1",
    img: SacoBotonDoblePecho4en1,
  },
  {
    value: "doble pecho 2 en 4", // Nota: Mantiene el nombre del archivo 'doblepecho'
    label: "Doble Pecho 2 en 4",
    img: SacoBotonDoblePecho2en4,
  },
  {
    value: "doble pecho 6 en 1",
    label: "Doble Pecho 6 en 1",
    img: SacoBotonDoblePecho6en1,
  },
  {
    value: "doble pecho 6 en 3",
    label: "Doble Pecho 6 en 3",
    img: SacoBotonDoblePecho6en3,
  },
  {
    value: "1 boton de rana",
    label: "1 Botón de Rana",
    img: SacoBotonRana,
  },
  {
    value: "1 boton de rana 2",
    label: "1 Botón de Rana 2",
    img: SacoBotonRana2,
  },
  {
    value: "1 boton de rana 3",
    label: "1 Botón de Rana 3",
    img: SacoBotonRana3,
  },
  {
    value: "1 boton de rana 4",
    label: "1 Botón de Rana 4",
    img: SacoBotonRana4,
  },
  {
    value: "doble pecho dos botones de rana",
    label: "Doble Pecho con 2 Botones de Rana",
    img: SacoBotonDoblePecho2Rana,
  },
];

const opcionesBolsilloTicket = [
  {
    value: "Bolsillo ticket recto sin solapa",
    label: "Bolsillo ticket recto sin solapa",
    img: BolsilloTicketRectoSinSolapa,
  },
  {
    value: "Bolsillo ticket recto con solapa",
    label: "Bolsillo ticket recto con solapa",
    img: BolsilloTicketRectoSolapa,
  },
  {
    value: "Bolsillo ticket recto con doble ribete",
    label: "Bolsillo ticket recto con doble ribete",
    img: BolsilloTicketRectoDobleRibete,
  },
  {
    value: "Bolsillo ticket inclinado sin solapa",
    label: "Bolsillo ticket inclinado sin solapa",
    img: BolsilloTicketInclinadoSinSolapa,
  },
  {
    value: "Bolsillo inclinado con doble Solapa",
    label: "Bolsillo inclinado con doble Solapa",
    img: BolsilloTicketInclinadoDobleSolapa,
  },
  {
    value: "Bolsillo inclinado con doble ribete",
    label: "Bolsillo inclinado con doble ribete",
    img: BolsilloTicketInclinadoDobleRibete,
  },
  // --- Estilo Parche ---
  {
    value: "Bolsillo ticket de parche",
    label: "De Parche",
    img: BolsilloTicketParche,
  },
];

const opcionesBolsilloPecho = [
  // 1. CLÁSICOS / SASTRE TRADICIONAL (Lo más formal)
  {
    value: "Recto Clásico",
    label: "Recto Clásico",
    img: bpRecto,
  },
  {
    value: "Curvo",
    label: "Curvo", // También conocido como estilo "Barchetta"
    img: bpCurvo,
  },

  // 2. RIBETEADOS (Estructurados y limpios)
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

  // 3. DE PARCHE (Más casual / Sport)
  {
    value: "De Parche",
    label: "De Parche",
    img: bpParche,
  },
  {
    value: "Un bolsillo de parche con flap diamante",
    label: "Un Bolsillo Parche Diamante",
    img: bpDosDiamante,
  },
];

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
    ajuste: ["Contrabillas ", "Ajustadores"],
    altura: ["3.8", "4.5", "5.5", "6.5"],
    pliegues: ["Sin Pliegues (Flat Front)", "1 Pliegue", "2 Pliegues"],
    bolsilloReloj: ["Invisible", "Un ribete", "Con flap diamante"],
    bajos: ["Sin bastilla", "Con bastilla"],
  },
  saco: {
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
  camisa: {
    opcionCamisa: ["Manga Larga", "Manga Corta"],
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
          <button
            onClick={() => setShowPreview(false)}
            className="absolute inset-0 w-full h-full cursor-pointer outline-none"
            title="Cerrar"
          />

          {/* El contenedor principal crece para permitir una imagen enorme */}
          <div className="relative z-10 flex flex-col items-center max-w-7xl w-fit animate-in zoom-in-95 duration-500">
            <button
              onClick={() => setShowPreview(false)}
              className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors flex items-center gap-2 font-bold tracking-widest text-xs uppercase outline-none"
            >
              Cerrar
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[10px]">
                X
              </span>
            </button>

            <div className="w-fit h-fit bg-gradient-to-b from-white/5 to-transparent rounded-3xl border border-white/10 flex items-center justify-center p-6 md:p-10 shadow-[0_0_100px_rgba(255,255,255,0.05)] relative overflow-hidden pointer-events-none">
              {selectedOption.img ? (
                /* IMAGEN DEL MODAL: Ahora permite hasta un 90% de la altura de la pantalla en pantallas grandes */
                <img
                  src={selectedOption.img}
                  alt={selectedOption.label}
                  className="w-auto h-auto max-w-full max-h-[75vh] md:max-h-[85vh] lg:max-h-[90vh] object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                />
              ) : (
                <span className="text-2xl text-gray-500 font-black uppercase tracking-widest px-10 py-20">
                  {selectedOption.label}
                </span>
              )}

              <div className="absolute bottom-6 md:bottom-8 bg-black/80 backdrop-blur-md border border-white/20 px-8 py-4 rounded-full shadow-2xl">
                <span className="font-black text-[11px] sm:text-xs tracking-[0.2em] uppercase text-center w-full px-4 leading-tight">
                  {selectedOption.label}
                </span>
              </div>
            </div>

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

const CAMPOS_POR_SECCION = {
  saco: [
    "saco_numero_produccion",
    "tela_saco",
    "saco_forro_cod",
    "saco_boton_cod",
    "saco_monograma",
    "saco_tamano_solapa",
    "saco_solapa",
    "saco_botones",
    "saco_b_pecho",
    "saco_b_inf",
    "saco_b_ticket",
    "saco_ojalIzquierdo",
    "saco_ojalDerecho",
    "precio_saco",
    "obs_saco",
    "collarSaco",
    "longitudFrontalSaco",
    "longitudEspaldaSaco",
    "hombrosSaco",
    "pechoSaco",
    "pechoDelanteroSaco",
    "estomagoSaco",
    "vientreSaco",
    "caderasSaco",
    "longitudMangaISaco",
    "longitudMangaDSaco",
    "bicepsSaco",
    "anteBrazoSaco",
    "muñecaSaco",
    "hombroDelanteroSaco",
    "anchoTraseroSaco",
    "nucaCinturaSaco",
    "longitudCinturaDelanteraSaco",
  ],
  chaleco: [
    "chal_numero_produccion",
    "chal_tela",
    "chal_boton",
    "chal_cuello",
    "chal_botones",
    "chal_b_pecho",
    "chal_b_inf",
    "chal_terminacion",
    "precio_chaleco",
    "obs_chaleco",
    "collarChaleco",
    "longitudFrontalChaleco",
    "longitudEspaldaChaleco",
    "pechoChaleco",
    "pechoDelanteroChaleco",
    "estomagoChaleco",
    "vientreChaleco",
    "caderasChaleco",
    "tamañoInferiorChaleco",
    "longitudCinturaDChaleco",
    "nucaCinturaChaleco",
  ],
  camisa: [
    "camisa_numero_produccion",
    "opcion_camisa",
    "camisa_tela",
    "camisa_contraste",
    "camisa_pos_contraste",
    "camisa_iniciales",
    "camisa_cuello",
    "camisa_puno",
    "camisa_tapeta",
    "camisa_bolsillo",
    "camisa_solapa_bolsillo",
    "camisa_pliegues",
    "precio_camisa",
    "camisa_obs",
    "collarCamisa",
    "longitudFrontalCamisa",
    "longitudEspaldaCamisa",
    "hombrosCamisa",
    "pechoCamisa",
    "pechoDelanteroCamisa",
    "estomagoCamisa",
    "vientreCamisa",
    "caderasCamisa",
    "longitudMangaICamisa",
    "longitudMangaDCamisa",
    "bicepsCamisa",
    "anteBrazoCamisa",
    "muñecaCamisa",
    "hombroDelanteroCamisa",
    "anchoTraseroCamisa",
    "nucaCinturaCamisa",
    "longitudCinturaDelanteraCamisa",
  ],
  pantalon: [
    "pant_numero_produccion",
    "tela_pantalon",
    "pant_boton",
    "pant_ajuste",
    "pant_altura",
    "pant_pretina",
    "pant_pliegues",
    "pant_bolsillo_reloj",
    "pant_bajos",
    "precio_pantalon",
    "obs_pantalon",
    "longitudIPantalon",
    "longitudDPantalon",
    "cinturaPantalon",
    "caderaPantalon",
    "musloPantalon",
    "rodillaPantalon",
    "alTerrillaPantalon",
    "brazaletePantalon",
    "entrepiernaPantalon",
    "alturaCinturaTPantalon",
    "alturaCinturaDPantalon",
  ],
  zapato: [
    "zapato_numero_produccion",
    "zapato_estilo",
    "precio_zapato",
    "obs_zapato",
    "tallaZapato",
    "anchoEmpeineZapato",
    "largoPieZapato",
  ],
};

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
  const [detallesPantalon, setDetallesPantalon] = useState(null);
  const [detallesChaleco, setDetallesChaleco] = useState(null);
  const [detallesZapato, setDetallesZapato] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroEstatus, setFiltroEstatus] = useState("");

  const getNombreCliente = (id) => {
    if (!id) return "No asignado";
    const cliente = clientes.find((c) => c.idCliente === id);
    return cliente ? `${cliente.nombreCompleto}` : `ID: ${id}`;
  };

  const descargarResumenOrden = (orden) => {
    const nombreTraje =
      orden.tipoTraje?.descripcion ||
      CATALOGO_TRAJES[orden.idTipoTraje] ||
      `Desconocido (${orden.idTipoTraje})`;

    const nombreCompleto = getNombreCliente(orden.idCliente);

    const siNo = (val) => (val ? "SÍ" : "NO");

    // Buscamos las medidas donde sea que vengan armadas
    const m = orden.medidasOrden || orden.medidas || orden || {};

    let contenido = `
=========================================
RESUMEN DE ORDEN #${orden.idOrden} - HANTONIO JARAMILLO
=========================================
TALLA: PRENDA HECHA A MEDIDA
=========================================

DATOS DEL CLIENTE
-----------------------------------------
Nombre: ${nombreCompleto}

CONFIGURACIÓN GENERAL
-----------------------------------------
Tipo de Prenda Principal: ${nombreTraje}
Incluye Camisa Extra: ${siNo(orden.incluyeCamisa)}
Incluye Zapatos Extra: ${siNo(orden.incluyeZapato)}
Es Smoking 3 Piezas: ${siNo(orden.esSmoking3Piezas)}
`;

    // --- DETALLES DE DISEÑO Y MEDIDAS POR PRENDA ---

    // DETALLES DEL SACO
    if (orden.detalleSaco) {
      const d = orden.detalleSaco;
      contenido += `
=========================================
ESPECIFICACIONES DEL SACO
=========================================
Número de producción: ${d.numeroProduccion || "N/A"}
Código de Tela: ${d.codigoTela || "N/A"}
Código de Forro: ${d.codigoForro || "N/A"}
Estilo de Solapa: ${d.estiloSolapa || "N/A"} (Tamaño: ${d.tamanoSolapa || "N/A"})
Estilo de Botones: ${d.estiloBotones || "N/A"} (Cód: ${d.codigoBoton || "N/A"})
Bolsillo de Pecho: ${d.estiloBolsilloPecho || "N/A"}
Bolsillos Inferiores: ${d.estiloBolsilloInf || "N/A"}
Bolsillo Ticket: ${d.estiloBolsilloTicket || "N/A"}
Ojal Izquierdo: ${d.estiloOjalIzquierdo || "N/A"}
Ojal Derecho: ${d.estiloOjalDerecho || "N/A"}
Monograma: ${d.monograma || "Sin monograma"}
Observaciones: ${d.observaciones || "Ninguna"}
-----------------------------------------
MEDIDAS DEL SACO
-----------------------------------------
Collar: ${m.collarSaco ?? "N/A"}
Longitud Frontal: ${m.longitudFrontalSaco ?? "N/A"}
Longitud Espalda: ${m.longitudEspaldaSaco ?? "N/A"}
Hombros: ${m.hombrosSaco ?? "N/A"}
Pecho total: ${m.pechoSaco ?? "N/A"}
Estómago: ${m.estomagoSaco ?? "N/A"}
Barriga: ${m.vientreSaco ?? "N/A"}
Caderas: ${m.caderasSaco ?? "N/A"}
Longitud Manga Izq.: ${m.longitudMangaISaco ?? "N/A"}
Longitud Manga Der.: ${m.longitudMangaDSaco ?? "N/A"}
Bíceps: ${m.bicepsSaco ?? "N/A"}
Antebrazo: ${m.antebrazoSaco ?? "N/A"}
Muñeca: ${m.muñecaSaco ?? "N/A"}
Frente Hombro: ${m.hombroDelanteroSaco ?? "N/A"}
Espalda Ancha: ${m.anchoTraseroSaco ?? "N/A"}
Hombro - Estómago Posterior: ${m.nucaCinturaSaco ?? "N/A"}
Hombro - Estómago Delantera: ${m.longitudCinturaDelanteraSaco ?? "N/A"}
`;
    }

    // DETALLES DEL PANTALÓN
    if (orden.detallePantalon) {
      const d = orden.detallePantalon;
      contenido += `
=========================================
ESPECIFICACIONES DEL PANTALÓN
=========================================
Número de producción: ${d.numeroProduccion || "N/A"}
Código de Tela: ${d.codigoTela || "N/A"}
Código de Botón: ${d.codigoBoton || "N/A"}
Estilo de Pretina: ${d.estiloPretina || "N/A"} (Altura: ${d.alturaPretina || "N/A"})
Ajuste de Cintura: ${d.ajusteCintura || "N/A"}
Estilo de Pliegues: ${d.estiloPliegues || "Sin pliegues"}
Estilo de Bajos: ${d.estiloBajos || "N/A"}
Bolsillo de Reloj: ${d.estiloBolsilloReloj || "N/A"}
Observaciones: ${d.observaciones || "Ninguna"}
Precio (Individual): $${d.precioPantalon || "N/A"}
-----------------------------------------
MEDIDAS DEL PANTALÓN
-----------------------------------------
Longitud Izquierda: ${m.longitudIPantalon ?? "N/A"}
Longitud Derecha: ${m.longitudDPantalon ?? "N/A"}
Cintura: ${m.cinturaPantalon ?? "N/A"}
Cadera: ${m.caderaPantalon ?? "N/A"}
Muslo: ${m.musloPantalon ?? "N/A"}
Rodilla: ${m.rodillaPantalon ?? "N/A"}
Pantorrilla: ${m.alTerrillaPantalon ?? "N/A"}
Brazalete (Bajo): ${m.brazaletePantalon ?? "N/A"}
Entrepierna: ${m.entrepiernaPantalon ?? "N/A"}
Altura Cintura Trasera: ${m.alturaCinturaTPantalon ?? "N/A"}
Altura Cintura Delantera: ${m.alturaCinturaDPantalon ?? "N/A"}
`;
    }

    // DETALLES DEL CHALECO
    if (orden.detalleChaleco) {
      const d = orden.detalleChaleco;
      contenido += `
=========================================
ESPECIFICACIONES DEL CHALECO
=========================================
Número de producción: ${d.numeroProduccion || "N/A"}
Código de Tela: ${d.codigoTela || "N/A"}
Estilo de Cuello: ${d.estiloCuello || "N/A"}
Estilo de Botones: ${d.estiloBotones || "N/A"} (Cód: ${d.codigoBoton || "N/A"})
Bolsillo de Pecho: ${d.estiloBolsilloPecho || "N/A"}
Bolsillos Inferiores: ${d.estiloBolsilloInf || "N/A"}
Terminación Inferior: ${d.terminacionInf || "N/A"}
Observaciones: ${d.observaciones || "Ninguna"}
Precio (Individual): $${d.precioChaleco || "N/A"}
-----------------------------------------
MEDIDAS DEL CHALECO
-----------------------------------------
Collar: ${m.collarChaleco ?? "N/A"}
Longitud Frontal: ${m.longitudFrontalChaleco ?? "N/A"}
Longitud Espalda: ${m.longitudEspaldaChaleco ?? "N/A"}
Pecho total: ${m.pechoChaleco ?? "N/A"}
Estómago: ${m.estomagoChaleco ?? "N/A"}
Caderas: ${m.caderasChaleco ?? "N/A"}
Hombro - Estómago Delantero: ${m.longitudCinturaDChaleco ?? "N/A"}
Hombro - Estómago Posterior: ${m.nucaCinturaChaleco ?? "N/A"}
`;
    }

    // DETALLES DE LA CAMISA
    if (orden.detalleCamisa) {
      const d = orden.detalleCamisa;
      contenido += `
=========================================
ESPECIFICACIONES DE LA CAMISA
=========================================
Número de producción: ${d.numeroProduccion || "N/A"}
Opción de Camisa: ${d.opcionCamisa || "N/A"}
Código de Tela: ${d.codigoTela || "N/A"}
Contraste de Tela: ${d.contrasteTela || "N/A"} (Posición: ${d.posicionContraste || "N/A"})
Estilo de Cuello: ${d.estiloCuello || "N/A"}
Estilo de Puño: ${d.estiloPuno || "N/A"}
Estilo de Tapeta: ${d.estiloTapeta || "N/A"}
Estilo de Bolsillo: ${d.estiloBolsillo || "N/A"} (Solapa: ${d.solapaBolsillo || "N/A"})
Pliegues Frontales: ${d.plieguesFrontales || "N/A"}
Iniciales: ${d.iniciales || "N/A"}
Observaciones: ${d.observaciones || "Ninguna"}
Precio (Individual): $${d.precioCamisa || "N/A"}
-----------------------------------------
MEDIDAS DE LA CAMISA
-----------------------------------------
Collar: ${m.collarCamisa ?? "N/A"}
Longitud Frontal: ${m.longitudFrontalCamisa ?? "N/A"}
Longitud Espalda: ${m.longitudEspaldaCamisa ?? "N/A"}
Hombros: ${m.hombrosCamisa ?? "N/A"}
Pecho total: ${m.pechoCamisa ?? "N/A"}
Estómago: ${m.estomagoCamisa ?? "N/A"}
Barriga: ${m.vientreCamisa ?? "N/A"}
Caderas: ${m.caderasCamisa ?? "N/A"}
Longitud Manga Izq.: ${m.longitudMangaICamisa ?? "N/A"}
Longitud Manga Der.: ${m.longitudMangaDCamisa ?? "N/A"}
Bíceps: ${m.bicepsCamisa ?? "N/A"}
Antebrazo: ${m.antebrazoCamisa ?? "N/A"}
Muñeca: ${m.muñecaCamisa ?? "N/A"}
Frente Hombro: ${m.hombroDelanteroCamisa ?? "N/A"}
Espalda Ancha: ${m.anchoTraseroCamisa ?? "N/A"}
Hombro - Estómago Posterior: ${m.nucaCinturaCamisa ?? "N/A"}
Hombro - Estómago Delantero: ${m.longitudCinturaDelanteraCamisa ?? "N/A"}
`;
    }

    // DETALLES DEL ZAPATO
    if (orden.detalleZapato) {
      const d = orden.detalleZapato;
      contenido += `
=========================================
ESPECIFICACIONES DEL CALZADO
=========================================
Número de producción: ${d.numeroProduccion || "N/A"}
Estilo de Zapato: ${d.estiloZapato || "N/A"}
Observaciones: ${d.observaciones || "Ninguna"}
Precio (Individual): $${d.precioZapato || "N/A"}
-----------------------------------------
MEDIDAS DEL CALZADO
-----------------------------------------
Talla de Zapato: ${m.tallaZapato ?? "N/A"}
Ancho de Empeine: ${m.anchoEmpeineZapato ?? "N/A"}
Largo de Pie: ${m.largoPieZapato ?? "N/A"}
`;
    }

    contenido += `
=========================================
      DOCUMENTO DE CONTROL INTERNO
=========================================
`;

    // Generación y descarga del archivo
    const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `Orden_${orden.idOrden}_${nombreCompleto || "Cliente"}.txt`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const initialState = {
    id_cliente: "",
    id_sucursal: "",
    fecha_evento: "",
    fecha_entrega: "",
    fecha_cita: "",
    id_estatus: "",
    id_tipo_traje: "",
    incluye_camisa: false,
    incluye_zapato: false,
    es_smoking_3_piezas: false,
    costo_total: "",
    monto_abonado: "",
    metodo_pago: "",
    precio_saco: "",
    precio_pantalon: "",
    precio_chaleco: "",
    precio_camisa: "",
    precio_zapato: "",
    pant_numero_produccion: "",
    tela_pantalon: "",
    pant_boton: "",
    pant_pretina: "",
    pant_ajuste: "",
    pant_altura: "",
    pant_pliegues: "",
    pant_bolsillo_reloj: "",
    pant_bajos: "",
    obs_pantalon: "",
    saco_numero_produccion: "",
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
    chal_numero_produccion: "",
    chal_tela: "",
    chal_boton: "",
    chal_cuello: "",
    chal_botones: "",
    chal_b_pecho: "",
    chal_b_inf: "",
    chal_terminacion: "",
    obs_chaleco: "",
    camisa_numero_produccion: "",
    camisa_opcion: "",
    camisa_tela: "",
    camisa_cuello: "",
    camisa_contraste: "",
    camisa_tapeta: "",
    camisa_puno: "",
    camisa_bolsillo: "",
    camisa_solapa_bolsillo: "",
    camisa_pos_contraste: "",
    camisa_pliegues: "",
    camisa_iniciales: "",
    camisa_obs: "",
    zapato_numero_produccion: "",
    zapato_estilo: "",
    zapato_obs: "",

    //Medidas
    altura: "",
    peso: "",
    fit: "",
    collarSaco: "",
    longitudFrontalSaco: "",
    longitudEspaldaSaco: "",
    hombrosSaco: "",
    pechoSaco: "",
    pechoDelanteroSaco: "",
    estomagoSaco: "",
    vientreSaco: "",
    caderasSaco: "",
    longitudMangaISaco: "",
    longitudMangaDSaco: "",
    bicepsSaco: "",
    antebrazoSaco: "",
    muñecaSaco: "",
    hombroDelanteroSaco: "",
    anchoTraseroSaco: "",
    nucaCinturaSaco: "",
    longitudCinturaDelanteraSaco: "",
    collarCamisa: "",
    longitudFrontalCamisa: "",
    longitudEspaldaCamisa: "",
    hombrosCamisa: "",
    pechoCamisa: "",
    pechoDelanteroCamisa: "",
    estomagoCamisa: "",
    vientreCamisa: "",
    caderasCamisa: "",
    longitudMangaICamisa: "",
    longitudMangaDCamisa: "",
    bicepsCamisa: "",
    antebrazoCamisa: "",
    muñecaCamisa: "",
    hombroDelanteroCamisa: "",
    anchoTraseroCamisa: "",
    nucaCinturaCamisa: "",
    longitudCinturaDelanteraCamisa: "",
    longitudIPantalon: "",
    longitudDPantalon: "",
    cinturaPantalon: "",
    caderaPantalon: "",
    musloPantalon: "",
    rodillaPantalon: "",
    alTerrillaPantalon: "",
    brazaletePantalon: "",
    entrepiernaPantalon: "",
    alturaCinturaTPantalon: "",
    alturaCinturaDPantalon: "",
    collarChaleco: "",
    longitudFrontalChaleco: "",
    longitudEspaldaChaleco: "",
    pechoChaleco: "",
    pechoDelanteroChaleco: "",
    estomagoChaleco: "",
    vientreChaleco: "",
    caderasChaleco: "",
    tamañoInferiorChaleco: "",
    longitudCinturaDChaleco: "",
    nucaCinturaChaleco: "",
    tallaZapato: "",
    anchoEmpeineZapato: "",
    largoPieZapato: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [sections, setSections] = useState({
    cliente: false,
    prenda: false,
    pantalon: false,
    saco: false,
    chaleco: false,
    camisa: false,
    zapato: false,
    medidas: false,
    finanzas: false,
  });
  const [sectionsView, setSectionsView] = useState({
    cliente: true,
    prenda: true,
    pantalon: true,
    saco: true,
    chaleco: true,
    camisa: true,
    zapato: true,
    medidas: true,
    finanzas: true,
  });

  const toggleSection = (key) =>
    setSections((prev) => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    fetchData();
    fetchOrdenes();
  }, []);

  const toggleSectionView = (key) =>
    setSectionsView((prev) => ({ ...prev, [key]: !prev[key] }));

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

  // --- LÓGICA DE VISIBILIDAD DE PIEZAS (ACTUALIZADA) ---
  const trajeId = parseInt(formData.id_tipo_traje);
  const tieneSaco = [1, 2, 3, 7, 8, 9].includes(trajeId);
  const tienePantalon = [1, 2, 4, 7, 8, 9].includes(trajeId);

  // Chaleco es para Tres Piezas (2), Chaleco Solo (5), Frac (7), Chaqué (8), o Smoking 3 Piezas (9 + Check)
  const tieneChaleco =
    [2, 5, 7, 8].includes(trajeId) ||
    (trajeId === 9 && formData.es_smoking_3_piezas);
  const tieneCamisa = formData.incluye_camisa || trajeId === 6;
  const tieneZapato = formData.incluye_zapato || trajeId === 10;

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
    const pZapato = tieneZapato ? parseFloat(formData.precio_zapato) || 0 : 0;

    const totalCalculado = pSaco + pPantalon + pChaleco + pCamisa + pZapato;

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
    formData.precio_zapato,
    tieneSaco,
    tienePantalon,
    tieneChaleco,
    tieneCamisa,
    tieneZapato,
  ]);

  useEffect(() => {
    // Solo auto-completamos si la orden incluye AMBAS prendas
    if (tieneSaco && tieneCamisa) {
      setFormData((prev) => {
        // 1. Capturamos las medidas del saco (si están vacías, son 0)
        const sacoCollar = parseFloat(prev.collarSaco) || 0;
        const sacoMangaI = parseFloat(prev.longitudMangaISaco) || 0;
        const sacoMangaD = parseFloat(prev.longitudMangaDSaco) || 0;
        const sacoMuñeca = parseFloat(prev.muñecaSaco) || 0;
        const sacoBiceps = parseFloat(prev.bicepsSaco) || 0; // Corregido: leemos del saco

        // 2. Definimos tus aumentos fijos
        const aumentoManga = 4.0;
        const aumentoMuñeca = 6.7;
        const aumentoCuello = 1.5;
        const aumentoBiceps = 6; // Nuevo aumento para bíceps

        return {
          ...prev,
          // --- MEDIDAS CON FÓRMULAS MATEMÁTICAS ---
          collarCamisa:
            sacoCollar > 0
              ? (sacoCollar + aumentoCuello).toFixed(2).replace(/\.00$/, "")
              : prev.collarCamisa,
          longitudMangaICamisa:
            sacoMangaI > 0
              ? (sacoMangaI + aumentoManga).toFixed(2).replace(/\.00$/, "")
              : prev.longitudMangaICamisa,
          longitudMangaDCamisa:
            sacoMangaD > 0
              ? (sacoMangaD + aumentoManga).toFixed(2).replace(/\.00$/, "")
              : prev.longitudMangaDCamisa,
          muñecaCamisa:
            sacoMuñeca > 0
              ? (sacoMuñeca + aumentoMuñeca).toFixed(2).replace(/\.00$/, "")
              : prev.muñecaCamisa,
          bicepsCamisa:
            sacoBiceps > 0
              ? (sacoBiceps + aumentoBiceps).toFixed(2).replace(/\.00$/, "")
              : prev.bicepsCamisa,

          // --- MEDIDAS QUE SE COPIAN EXACTAMENTE IGUAL AL SACO ---
          longitudFrontalCamisa: prev.longitudFrontalSaco,
          longitudEspaldaCamisa: prev.longitudEspaldaSaco,
          hombrosCamisa: prev.hombrosSaco,
          pechoCamisa: prev.pechoSaco,
          pechoDelanteroCamisa: prev.pechoDelanteroSaco,
          estomagoCamisa: prev.estomagoSaco,
          vientreCamisa: prev.vientreSaco,
          caderasCamisa: prev.caderasSaco,
          anteBrazoCamisa: prev.anteBrazoSaco,
          hombroDelanteroCamisa: prev.hombroDelanteroSaco,
          anchoTraseroCamisa: prev.anchoTraseroSaco,
          nucaCinturaCamisa: prev.nucaCinturaSaco,
          longitudCinturaDelanteraCamisa: prev.longitudCinturaDelanteraSaco,
        };
      });
    }
  }, [
    tieneSaco,
    tieneCamisa,
    formData.collarSaco,
    formData.longitudMangaISaco,
    formData.longitudMangaDSaco,
    formData.muñecaSaco, // React reaccionará cuando cambie la muñeca del saco
    formData.longitudFrontalSaco,
    formData.longitudEspaldaSaco,
    formData.hombrosSaco,
    formData.pechoSaco,
    formData.pechoDelanteroSaco,
    formData.estomagoSaco,
    formData.vientreSaco,
    formData.caderasSaco,
    formData.bicepsSaco,
    formData.anteBrazoSaco,
    formData.hombroDelanteroSaco,
    formData.anchoTraseroSaco,
    formData.nucaCinturaSaco,
    formData.longitudCinturaDelanteraSaco,
  ]);

  // --- NUEVA FUNCIÓN AYUDANTE ---
  const mapearDatosOrden = (orden) => {
    return {
      ...initialState, // Empezamos con el molde limpio

      // --- GENERALES ---
      id_cliente: orden.idCliente || "",
      id_sucursal: orden.idSucursal || "",
      id_tipo_traje: orden.idTipoTraje || "",
      id_estatus: orden.idEstatus || "",
      fecha_cita: orden.fechaCitaMedidas
        ? orden.fechaCitaMedidas.split("T")[0]
        : "",
      fecha_entrega: orden.fechaEntrega ? orden.fechaEntrega.split("T")[0] : "",
      fecha_evento: orden.fechaEventoEntrega
        ? orden.fechaEventoEntrega.split("T")[0]
        : "",
      costo_total: orden.costoTotal || 0,
      monto_abonado: orden.montoAbonado || 0,
      metodo_pago: orden.metodoPago || "",
      incluye_camisa: orden.incluyeCamisa || false,
      incluye_zapato: orden.incluyeZapato || false,
      es_smoking_3_piezas: orden.esSmoking3Piezas || false,

      // --- MEDIDAS (Cuerpo y prendas) ---
      altura: orden.medidas?.altura || "",
      peso: orden.medidas?.peso || "",
      fit: orden.medidas?.tipoFit || "",

      collarSaco: orden.medidas?.collarSaco || "",
      longitudFrontalSaco: orden.medidas?.longitudFrontalSaco || "",
      longitudEspaldaSaco: orden.medidas?.longitudEspaldaSaco || "",
      hombrosSaco: orden.medidas?.hombrosSaco || "",
      pechoSaco: orden.medidas?.pechoSaco || "",
      pechoDelanteroSaco: orden.medidas?.pechoDelanteroSaco || "",
      estomagoSaco: orden.medidas?.estomagoSaco || "",
      vientreSaco: orden.medidas?.vientreSaco || "",
      caderasSaco: orden.medidas?.caderasSaco || "",
      longitudMangaISaco: orden.medidas?.longitudMangaISaco || "",
      longitudMangaDSaco: orden.medidas?.longitudMangaDSaco || "",
      bicepsSaco: orden.medidas?.bicepsSaco || "",
      anteBrazoSaco: orden.medidas?.antebrazoSaco || "",
      muñecaSaco: orden.medidas?.muñecaSaco || "",
      hombroDelanteroSaco: orden.medidas?.hombroDelanteroSaco || "",
      anchoTraseroSaco: orden.medidas?.anchoTraseroSaco || "",
      nucaCinturaSaco: orden.medidas?.nucaCinturaSaco || "",
      longitudCinturaDelanteraSaco:
        orden.medidas?.longitudCinturaDelantera || "",

      collarChaleco: orden.medidas?.collarChaleco || "",
      longitudFrontalChaleco: orden.medidas?.longitudFrontalChaleco || "",
      longitudEspaldaChaleco: orden.medidas?.longitudEspaldaChaleco || "",
      pechoChaleco: orden.medidas?.pechoChaleco || "",
      pechoDelanteroChaleco: orden.medidas?.pechoDelanteroChaleco || "",
      estomagoChaleco: orden.medidas?.estomagoChaleco || "",
      vientreChaleco: orden.medidas?.vientreChaleco || "",
      caderasChaleco: orden.medidas?.caderasChaleco || "",
      tamañoInferiorChaleco: orden.medidas?.tamañoInferiorChaleco || "",
      longitudCinturaDChaleco: orden.medidas?.longitudCinturaDChaleco || "",
      nucaCinturaChaleco: orden.medidas?.nucaCinturaChaleco || "",

      collarCamisa: orden.medidas?.collarCamisa || "",
      longitudFrontalCamisa: orden.medidas?.longitudFrontalCamisa || "",
      longitudEspaldaCamisa: orden.medidas?.longitudEspaldaCamisa || "",
      hombrosCamisa: orden.medidas?.hombrosCamisa || "",
      pechoCamisa: orden.medidas?.pechoCamisa || "",
      pechoDelanteroCamisa: orden.medidas?.pechoDelanteroCamisa || "",
      estomagoCamisa: orden.medidas?.estomagoCamisa || "",
      vientreCamisa: orden.medidas?.vientreCamisa || "",
      caderasCamisa: orden.medidas?.caderasCamisa || "",
      longitudMangaICamisa: orden.medidas?.longitudMangaICamisa || "",
      longitudMangaDCamisa: orden.medidas?.longitudMangaDCamisa || "",
      bicepsCamisa: orden.medidas?.bicepsCamisa || "",
      anteBrazoCamisa: orden.medidas?.antebrazoCamisa || "",
      muñecaCamisa: orden.medidas?.muñecaCamisa || "",
      hombroDelanteroCamisa: orden.medidas?.hombroDelanteroCamisa || "",
      anchoTraseroCamisa: orden.medidas?.anchoTraseroCamisa || "",
      nucaCinturaCamisa: orden.medidas?.nucaCinturaCamisa || "",
      longitudCinturaDelanteraCamisa:
        orden.medidas?.longitudCinturaDelanteraCamisa || "",

      longitudIPantalon: orden.medidas?.longitudIPantalon || "",
      longitudDPantalon: orden.medidas?.longitudDPantalon || "",
      cinturaPantalon: orden.medidas?.cinturaPantalon || "",
      caderaPantalon: orden.medidas?.caderaPantalon || "",
      musloPantalon: orden.medidas?.musloPantalon || "",
      rodillaPantalon: orden.medidas?.rodillaPantalon || "",
      alTerrillaPantalon: orden.medidas?.alTerrillaPantalon || "",
      brazaletePantalon: orden.medidas?.brazaletePantalon || "",
      entrepiernaPantalon: orden.medidas?.entrepiernaPantalon || "",
      alturaCinturaTPantalon: orden.medidas?.alturaCinturaTPantalon || "",
      alturaCinturaDPantalon: orden.medidas?.alturaCinturaDPantalon || "",

      tallaZapato: orden.medidas?.tallaZapato || "",
      anchoEmpeineZapato: orden.medidas?.anchoEmpeineZapato || "",
      largoPieZapato: orden.medidas?.largoPieZapato || "",

      // --- DETALLES DE PRENDAS ---
      precio_saco: orden.detalleSaco?.precioSaco || "",
      saco_numero_produccion: orden.detalleSaco?.numeroProduccion || "",
      tela_saco: orden.detalleSaco?.codigoTela || "",
      saco_forro_cod: orden.detalleSaco?.codigoForro || "",
      saco_boton_cod: orden.detalleSaco?.codigoBoton || "",
      saco_botones: orden.detalleSaco?.estiloBotones || "",
      saco_solapa: orden.detalleSaco?.estiloSolapa || "",
      saco_tamano_solapa: orden.detalleSaco?.tamanoSolapa || "",
      saco_b_pecho: orden.detalleSaco?.estiloBolsilloPecho || "",
      saco_b_inf: orden.detalleSaco?.estiloBolsilloInf || "",
      saco_b_ticket: orden.detalleSaco?.estiloBolsilloTicket || "",
      saco_ojalIzquierdo: orden.detalleSaco?.estiloOjalIzquierdo || "",
      saco_ojalDerecho: orden.detalleSaco?.estiloOjalDerecho || "",
      saco_monograma: orden.detalleSaco?.monograma || "",
      obs_saco: orden.detalleSaco?.observaciones || "",

      chal_numero_produccion: orden.detalleChaleco?.numeroProduccion || "",
      precio_chaleco: orden.detalleChaleco?.precioChaleco || "",
      chal_tela: orden.detalleChaleco?.codigoTela || "",
      chal_boton: orden.detalleChaleco?.codigoBoton || "",
      chal_cuello: orden.detalleChaleco?.estiloCuello || "",
      chal_botones: orden.detalleChaleco?.estiloBotones || "",
      chal_b_pecho: orden.detalleChaleco?.estiloBolsilloPecho || "",
      chal_b_inf: orden.detalleChaleco?.estiloBolsilloInf || "",
      chal_terminacion: orden.detalleChaleco?.terminacionInf || "",
      obs_chaleco: orden.detalleChaleco?.observaciones || "",

      camisa_numero_produccion: orden.detalleCamisa?.numeroProduccion || "",
      opcion_camisa: orden.detalleCamisa?.opcionCamisa || "",
      precio_camisa: orden.detalleCamisa?.precioCamisa || "",
      camisa_tela: orden.detalleCamisa?.codigoTela || "",
      camisa_cuello: orden.detalleCamisa?.estiloCuello || "",
      camisa_contraste: orden.detalleCamisa?.contrasteTela || "",
      camisa_tapeta: orden.detalleCamisa?.estiloTapeta || "",
      camisa_puno: orden.detalleCamisa?.estiloPuno || "",
      camisa_bolsillo: orden.detalleCamisa?.estiloBolsillo || "",
      camisa_solapa_bolsillo: orden.detalleCamisa?.solapaBolsillo || "",
      camisa_pos_contraste: orden.detalleCamisa?.posicionContraste || "",
      camisa_pliegues: orden.detalleCamisa?.plieguesFrontales || "",
      camisa_iniciales: orden.detalleCamisa?.iniciales || "",
      camisa_obs: orden.detalleCamisa?.observaciones || "",

      zapato_numero_produccion: orden.detalleZapato?.numeroProduccion || "",
      precio_zapato: orden.detalleZapato?.precioZapato || "",
      zapato_estilo: orden.detalleZapato?.estiloZapato || "",
      zapato_obs: orden.detalleZapato?.observaciones || "",

      pant_numero_produccion: orden.detallePantalon?.numeroProduccion || "",
      precio_pantalon: orden.detallePantalon?.precioPantalon || "",
      tela_pantalon: orden.detallePantalon?.codigoTela || "",
      pant_boton: orden.detallePantalon?.codigoBoton || "",
      pant_pretina: orden.detallePantalon?.estiloPretina || "",
      pant_ajuste: orden.detallePantalon?.ajusteCintura || "",
      pant_altura: orden.detallePantalon?.alturaPretina || "",
      pant_pliegues: orden.detallePantalon?.estiloPliegues || "",
      pant_bolsillo_reloj: orden.detallePantalon?.estiloBolsilloReloj || "",
      pant_bajos: orden.detallePantalon?.estiloBajos || "",
      obs_pantalon: orden.detallePantalon?.observaciones || "",
    };
  };

  const handleViewOrder = async (orden) => {
    setFormData(mapearDatosOrden(orden));
    setViewingOrder(orden);
    setShowViewModal(true);

    // 0. Limpieza total de estados secundarios
    setDetallesSaco(null);
    setDetallesCamisa(null);
    setDetallesChaleco(null);
    setDetallesPantalon(null);
    setDetallesZapato(null);

    // 1. Saco
    if (orden.detalleSaco || [1, 2, 3, 7, 8, 9].includes(orden.idTipoTraje)) {
      try {
        const resp = await detallesService.obtenerSacoPorOrden(orden.idOrden);
        if (resp.data) setDetallesSaco(resp.data);
      } catch (e) {
        console.log("Sin detalle de saco");
      }
    }

    // 2. CAMISA (Basado en tu modelo DetalleCamisa)
    // Cambiamos 'orden.incluyeCamisa' por 'orden.detalleCamisa' que es lo que manda C#
    if (orden.detalleCamisa || orden.idTipoTraje === 6) {
      try {
        const respCamisa = await detallesService.obtenerCamisaPorOrden(
          orden.idOrden,
        );
        if (respCamisa && respCamisa.data) {
          setDetallesCamisa(respCamisa.data);
        }
      } catch (error) {
        console.error("No se encontró el objeto DetalleCamisa en la BD");
      }
    }

    // 3. Chaleco
    if (orden.detalleChaleco || [2, 5, 7, 8].includes(orden.idTipoTraje)) {
      try {
        const respChaleco = await detallesService.obtenerChalecoPorOrden(
          orden.idOrden,
        );
        if (respChaleco.data) setDetallesChaleco(respChaleco.data);
      } catch (e) {
        console.log("Sin detalle de chaleco");
      }
    }

    // 4. Pantalón
    if (
      orden.detallePantalon ||
      [1, 2, 4, 7, 8, 9].includes(orden.idTipoTraje)
    ) {
      try {
        const respPantalon = await detallesService.obtenerPantalonPorOrden(
          orden.idOrden,
        );
        if (respPantalon.data) setDetallesPantalon(respPantalon.data);
      } catch (e) {
        console.log("Sin detalle de pantalón");
      }
    }

    if (orden.detalleZapato || orden.idTipoTraje === 6) {
      try {
        const respZapato = await detallesService.obtenerZapatoPorOrden(
          orden.idOrden,
        );
        if (respZapato && respZapato.data) {
          setDetallesZapato(respZapato.data);
        }
      } catch (error) {
        console.error("No se encontró el objeto DetalleZapato en la BD");
      }
    }
  };

  // FUNCIÓN PARA CARGAR LOS DATOS AL FORMULARIO
  const handleEditClick = (orden) => {
    setEditingId(orden.idOrden);

    setFormData({
      // --- GENERALES ---
      id_cliente: orden.idCliente || "",
      id_sucursal: orden.idSucursal || "",
      id_tipo_traje: orden.idTipoTraje || "",
      id_estatus: orden.idEstatus || "",
      fecha_cita: orden.fechaCitaMedidas
        ? orden.fechaCitaMedidas.split("T")[0]
        : "",
      fecha_entrega: orden.fechaEntrega ? orden.fechaEntrega.split("T")[0] : "",
      fecha_evento: orden.fechaEventoEntrega
        ? orden.fechaEventoEntrega.split("T")[0]
        : "",
      costo_total: orden.costoTotal || 0,
      monto_abonado: orden.montoAbonado || 0,
      metodo_pago: orden.metodoPago || "",
      incluye_camisa: orden.incluyeCamisa || false,
      incluye_zapato: orden.incluyeZapato || false,
      es_smoking_3_piezas: orden.esSmoking3Piezas || false, // Ajusta si tienes esta bandera en el backend

      // --- MEDIDAS (Cuerpo y prendas) ---
      altura: orden.medidas?.altura || "",
      peso: orden.medidas?.peso || "",
      fit: orden.medidas?.tipoFit || "",

      // Saco Medidas
      collarSaco: orden.medidas?.collarSaco || "",
      longitudFrontalSaco: orden.medidas?.longitudFrontalSaco || "",
      longitudEspaldaSaco: orden.medidas?.longitudEspaldaSaco || "",
      hombrosSaco: orden.medidas?.hombrosSaco || "",
      pechoSaco: orden.medidas?.pechoSaco || "",
      pechoDelanteroSaco: orden.medidas?.pechoDelanteroSaco || "",
      estomagoSaco: orden.medidas?.estomagoSaco || "",
      vientreSaco: orden.medidas?.vientreSaco || "",
      caderasSaco: orden.medidas?.caderasSaco || "",
      longitudMangaISaco: orden.medidas?.longitudMangaISaco || "",
      longitudMangaDSaco: orden.medidas?.longitudMangaDSaco || "",
      bicepsSaco: orden.medidas?.bicepsSaco || "",
      anteBrazoSaco: orden.medidas?.antebrazoSaco || "",
      muñecaSaco: orden.medidas?.muñecaSaco || "",
      hombroDelanteroSaco: orden.medidas?.hombroDelanteroSaco || "",
      anchoTraseroSaco: orden.medidas?.anchoTraseroSaco || "",
      nucaCinturaSaco: orden.medidas?.nucaCinturaSaco || "",
      longitudCinturaDelanteraSaco:
        orden.medidas?.longitudCinturaDelantera || "",

      // Chaleco Medidas
      collarChaleco: orden.medidas?.collarChaleco || "",
      longitudFrontalChaleco: orden.medidas?.longitudFrontalChaleco || "",
      longitudEspaldaChaleco: orden.medidas?.longitudEspaldaChaleco || "",
      pechoChaleco: orden.medidas?.pechoChaleco || "",
      pechoDelanteroChaleco: orden.medidas?.pechoDelanteroChaleco || "",
      estomagoChaleco: orden.medidas?.estomagoChaleco || "",
      vientreChaleco: orden.medidas?.vientreChaleco || "",
      caderasChaleco: orden.medidas?.caderasChaleco || "",
      tamañoInferiorChaleco: orden.medidas?.tamañoInferiorChaleco || "",
      longitudCinturaDChaleco: orden.medidas?.longitudCinturaDChaleco || "",
      nucaCinturaChaleco: orden.medidas?.nucaCinturaChaleco || "",

      // Camisa Medidas
      collarCamisa: orden.medidas?.collarCamisa || "",
      longitudFrontalCamisa: orden.medidas?.longitudFrontalCamisa || "",
      longitudEspaldaCamisa: orden.medidas?.longitudEspaldaCamisa || "",
      hombrosCamisa: orden.medidas?.hombrosCamisa || "",
      pechoCamisa: orden.medidas?.pechoCamisa || "",
      pechoDelanteroCamisa: orden.medidas?.pechoDelanteroCamisa || "",
      estomagoCamisa: orden.medidas?.estomagoCamisa || "",
      vientreCamisa: orden.medidas?.vientreCamisa || "",
      caderasCamisa: orden.medidas?.caderasCamisa || "",
      longitudMangaICamisa: orden.medidas?.longitudMangaICamisa || "",
      longitudMangaDCamisa: orden.medidas?.longitudMangaDCamisa || "",
      bicepsCamisa: orden.medidas?.bicepsCamisa || "",
      anteBrazoCamisa: orden.medidas?.antebrazoCamisa || "",
      muñecaCamisa: orden.medidas?.muñecaCamisa || "",
      hombroDelanteroCamisa: orden.medidas?.hombroDelanteroCamisa || "",
      anchoTraseroCamisa: orden.medidas?.anchoTraseroCamisa || "",
      nucaCinturaCamisa: orden.medidas?.nucaCinturaCamisa || "",
      longitudCinturaDelanteraCamisa:
        orden.medidas?.longitudCinturaDelanteraCamisa || "",

      // Pantalón Medidas
      longitudIPantalon: orden.medidas?.longitudIPantalon || "",
      longitudDPantalon: orden.medidas?.longitudDPantalon || "",
      cinturaPantalon: orden.medidas?.cinturaPantalon || "",
      caderaPantalon: orden.medidas?.caderaPantalon || "",
      musloPantalon: orden.medidas?.musloPantalon || "",
      rodillaPantalon: orden.medidas?.rodillaPantalon || "",
      alTerrillaPantalon: orden.medidas?.alTerrillaPantalon || "",
      brazaletePantalon: orden.medidas?.brazaletePantalon || "",
      entrepiernaPantalon: orden.medidas?.entrepiernaPantalon || "",
      alturaCinturaTPantalon: orden.medidas?.alturaCinturaTPantalon || "",
      alturaCinturaDPantalon: orden.medidas?.alturaCinturaDPantalon || "",

      // Zapato Medidas
      tallaZapato: orden.medidas?.tallaZapato || "",
      anchoEmpeineZapato: orden.medidas?.anchoEmpeineZapato || "",
      largoPieZapato: orden.medidas?.largoPieZapato || "",

      // --- DETALLES DE PRENDAS ---
      // Saco
      precio_saco: orden.detalleSaco?.precioSaco || "",
      saco_numero_produccion: orden.detalleSaco?.numeroProduccion || "",
      tela_saco: orden.detalleSaco?.codigoTela || "",
      saco_forro_cod: orden.detalleSaco?.codigoForro || "",
      saco_boton_cod: orden.detalleSaco?.codigoBoton || "",
      saco_botones: orden.detalleSaco?.estiloBotones || "",
      saco_solapa: orden.detalleSaco?.estiloSolapa || "",
      saco_tamano_solapa: orden.detalleSaco?.tamanoSolapa || "",
      saco_b_pecho: orden.detalleSaco?.estiloBolsilloPecho || "",
      saco_b_inf: orden.detalleSaco?.estiloBolsilloInf || "",
      saco_b_ticket: orden.detalleSaco?.estiloBolsilloTicket || "",
      saco_ojalIzquierdo: orden.detalleSaco?.estiloOjalIzquierdo || "",
      saco_ojalDerecho: orden.detalleSaco?.estiloOjalDerecho || "",
      saco_monograma: orden.detalleSaco?.monograma || "",
      obs_saco: orden.detalleSaco?.observaciones || "",

      // Chaleco
      precio_chaleco: orden.detalleChaleco?.precioChaleco || "",
      chal_numero_produccion: orden.detalleChaleco?.numeroProduccion || "",
      chal_tela: orden.detalleChaleco?.codigoTela || "",
      chal_boton: orden.detalleChaleco?.codigoBoton || "",
      chal_cuello: orden.detalleChaleco?.estiloCuello || "",
      chal_botones: orden.detalleChaleco?.estiloBotones || "",
      chal_b_pecho: orden.detalleChaleco?.estiloBolsilloPecho || "",
      chal_b_inf: orden.detalleChaleco?.estiloBolsilloInf || "",
      chal_terminacion: orden.detalleChaleco?.terminacionInf || "",
      obs_chaleco: orden.detalleChaleco?.observaciones || "",

      // Camisa
      opcion_camisa: orden.detalleCamisa?.opcionCamisa || "",
      camisa_numero_produccion: orden.detalleCamisa?.numeroProduccion || "",
      precio_camisa: orden.detalleCamisa?.precioCamisa || "",
      camisa_tela: orden.detalleCamisa?.codigoTela || "",
      camisa_cuello: orden.detalleCamisa?.estiloCuello || "",
      camisa_contraste: orden.detalleCamisa?.contrasteTela || "",
      camisa_tapeta: orden.detalleCamisa?.estiloTapeta || "",
      camisa_puno: orden.detalleCamisa?.estiloPuno || "",
      camisa_bolsillo: orden.detalleCamisa?.estiloBolsillo || "",
      camisa_solapa_bolsillo: orden.detalleCamisa?.solapaBolsillo || "",
      camisa_pos_contraste: orden.detalleCamisa?.posicionContraste || "",
      camisa_pliegues: orden.detalleCamisa?.plieguesFrontales || "",
      camisa_iniciales: orden.detalleCamisa?.iniciales || "",
      camisa_obs: orden.detalleCamisa?.observaciones || "",

      // Pantalón
      precio_pantalon: orden.detallePantalon?.precioPantalon || "",
      pant_numero_produccion: orden.detallePantalon?.numeroProduccion || "",
      tela_pantalon: orden.detallePantalon?.codigoTela || "",
      pant_boton: orden.detallePantalon?.codigoBoton || "",
      pant_pretina: orden.detallePantalon?.estiloPretina || "",
      pant_ajuste: orden.detallePantalon?.ajusteCintura || "",
      pant_altura: orden.detallePantalon?.alturaPretina || "",
      pant_pliegues: orden.detallePantalon?.estiloPliegues || "",
      pant_bolsillo_reloj: orden.detallePantalon?.estiloBolsilloReloj || "",
      pant_bajos: orden.detallePantalon?.estiloBajos || "",
      obs_pantalon: orden.detallePantalon?.observaciones || "",

      // Zapato
      precio_zapato: orden.detalleZapato?.precioZapato || "",
      zapato_numero_produccion: orden.detalleZapato?.numeroProduccion || "",
      zapato_estilo: orden.detalleZapato?.estiloZapato || "",
      zapato_obs: orden.detalleZapato?.observaciones || "",
    });

    // Abrimos el formulario
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      IdCliente: parseInt(formData.id_cliente),
      IdSucursal: parseInt(formData.id_sucursal),
      IdTipoTraje: formData.id_tipo_traje
        ? parseInt(formData.id_tipo_traje)
        : null,
      IdEstatus: parseInt(formData.id_estatus),
      IncluyeCamisa: formData.incluye_camisa || false,
      IncluyeZapato: formData.incluye_zapato || false,
      EsSmoking3Piezas: formData.es_smoking_3_piezas || false,
      CostoTotal: parseFloat(formData.costo_total) || 0,
      MontoAbonado: parseFloat(formData.monto_abonado) || 0,
      MetodoPago: formData.metodo_pago,
      FechaCitaMedidas: formData.fecha_cita
        ? new Date(formData.fecha_cita).toISOString()
        : null,
      FechaEntrega: formData.fecha_entrega
        ? new Date(formData.fecha_entrega).toISOString()
        : null,
      FechaEventoEntrega: formData.fecha_evento
        ? new Date(formData.fecha_evento).toISOString()
        : null,
      MedidasOrden: {
        // Datos Generales
        Altura: parseFloat(formData.altura) || null,
        Peso: parseFloat(formData.peso) || null,
        TipoFit: formData.fit || null,

        // Medidas de Saco
        CollarSaco: parseFloat(formData.collarSaco) || null,
        LongitudFrontalSaco: parseFloat(formData.longitudFrontalSaco) || null,
        LongitudEspaldaSaco: parseFloat(formData.longitudEspaldaSaco) || null,
        HombrosSaco: parseFloat(formData.hombrosSaco) || null,
        PechoSaco: parseFloat(formData.pechoSaco) || null,
        PechoDelanteroSaco: parseFloat(formData.pechoDelanteroSaco) || null,
        EstomagoSaco: parseFloat(formData.estomagoSaco) || null,
        VientreSaco: parseFloat(formData.vientreSaco) || null,
        CaderasSaco: parseFloat(formData.caderasSaco) || null,
        LongitudMangaISaco: parseFloat(formData.longitudMangaISaco) || null,
        LongitudMangaDSaco: parseFloat(formData.longitudMangaDSaco) || null,
        BicepsSaco: parseFloat(formData.bicepsSaco) || null,
        AntebrazoSaco: parseFloat(formData.anteBrazoSaco) || null,
        MuñecaSaco: parseFloat(formData.muñecaSaco) || null,
        HombroDelanteroSaco: parseFloat(formData.hombroDelanteroSaco) || null,
        AnchoTraseroSaco: parseFloat(formData.anchoTraseroSaco) || null,
        NucaCinturaSaco: parseFloat(formData.nucaCinturaSaco) || null,
        LongitudCinturaDelantera:
          parseFloat(formData.longitudCinturaDelanteraSaco) || null,

        // Medidas de Camisa
        CollarCamisa: parseFloat(formData.collarCamisa) || null,
        LongitudFrontalCamisa:
          parseFloat(formData.longitudFrontalCamisa) || null,
        LongitudEspaldaCamisa:
          parseFloat(formData.longitudEspaldaCamisa) || null,
        HombrosCamisa: parseFloat(formData.hombrosCamisa) || null,
        PechoCamisa: parseFloat(formData.pechoCamisa) || null,
        PechoDelanteroCamisa: parseFloat(formData.pechoDelanteroCamisa) || null,
        EstomagoCamisa: parseFloat(formData.estomagoCamisa) || null,
        VientreCamisa: parseFloat(formData.vientreCamisa) || null,
        CaderasCamisa: parseFloat(formData.caderasCamisa) || null,
        LongitudMangaICamisa: parseFloat(formData.longitudMangaICamisa) || null,
        LongitudMangaDCamisa: parseFloat(formData.longitudMangaDCamisa) || null,
        BicepsCamisa: parseFloat(formData.bicepsCamisa) || null,
        AntebrazoCamisa: parseFloat(formData.anteBrazoCamisa) || null,
        MuñecaCamisa: parseFloat(formData.muñecaCamisa) || null,
        HombroDelanteroCamisa:
          parseFloat(formData.hombroDelanteroCamisa) || null,
        AnchoTraseroCamisa: parseFloat(formData.anchoTraseroCamisa) || null,
        NucaCinturaCamisa: parseFloat(formData.nucaCinturaCamisa) || null,
        LongitudCinturaDelanteraCamisa:
          parseFloat(formData.longitudCinturaDelanteraCamisa) || null,
        // Medidas de Pantalón
        LongitudIPantalon: parseFloat(formData.longitudIPantalon) || null,
        LongitudDPantalon: parseFloat(formData.longitudDPantalon) || null,
        CinturaPantalon: parseFloat(formData.cinturaPantalon) || null,
        CaderaPantalon: parseFloat(formData.caderaPantalon) || null,
        MusloPantalon: parseFloat(formData.musloPantalon) || null,
        RodillaPantalon: parseFloat(formData.rodillaPantalon) || null,
        AlTerrillaPantalon: parseFloat(formData.alTerrillaPantalon) || null,
        BrazaletePantalon: parseFloat(formData.brazaletePantalon) || null,
        EntrepiernaPantalon: parseFloat(formData.entrepiernaPantalon) || null,
        AlturaCinturaTPantalon:
          parseFloat(formData.alturaCinturaTPantalon) || null,
        AlturaCinturaDPantalon:
          parseFloat(formData.alturaCinturaDPantalon) || null,

        // Medidas de Chaleco
        CollarChaleco: parseFloat(formData.collarChaleco) || null,
        LongitudFrontalChaleco:
          parseFloat(formData.longitudFrontalChaleco) || null,
        LongitudEspaldaChaleco:
          parseFloat(formData.longitudEspaldaChaleco) || null,
        PechoChaleco: parseFloat(formData.pechoChaleco) || null,
        PechoDelanteroChaleco:
          parseFloat(formData.pechoDelanteroChaleco) || null,
        EstomagoChaleco: parseFloat(formData.estomagoChaleco) || null,
        VientreChaleco: parseFloat(formData.vientreChaleco) || null,
        CaderasChaleco: parseFloat(formData.caderasChaleco) || null,
        TamañoInferiorChaleco:
          parseFloat(formData.tamañoInferiorChaleco) || null,
        LongitudCinturaDChaleco:
          parseFloat(formData.longitudCinturaDChaleco) || null,
        NucaCinturaChaleco: parseFloat(formData.nucaCinturaChaleco) || null,
        TallaZapato: parseFloat(formData.tallaZapato) || null,
        AnchoEmpeineZapato: parseFloat(formData.anchoEmpeineZapato) || null,
        LargoPieZapato: parseFloat(formData.largoPieZapato) || null,
      },
      DetalleSaco: tieneSaco
        ? {
            PrecioSaco: parseFloat(formData.precio_saco) || 0,
            NumeroProduccion: formData.saco_numero_produccion,
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
            NumeroProduccion: formData.pant_numero_produccion,
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
            NumeroProduccion: formData.camisa_numero_produccion,
            PrecioCamisa: parseFloat(formData.precio_camisa) || 0,
            CodigoTela: formData.camisa_tela,
            EstiloCuello: formData.camisa_cuello,
            ContrasteTela: formData.camisa_contraste,
            EstiloTapeta: formData.camisa_tapeta,
            EstiloPuno: formData.camisa_puno,
            EstiloBolsillo: formData.camisa_bolsillo,
            // LOS NUEVOS CAMPOS AQUÍ:
            SolapaBolsillo: formData.camisa_solapa_bolsillo,
            PosicionContraste: formData.camisa_pos_contraste,
            // ---------------------
            PlieguesFrontales: formData.camisa_pliegues,
            Iniciales: formData.camisa_iniciales,
            Observaciones: formData.camisa_obs,
          }
        : null,
      DetalleChaleco: tieneChaleco
        ? {
            PrecioChaleco: parseFloat(formData.precio_chaleco) || 0,
            NumeroProduccion: formData.chal_numero_produccion,
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
      DetalleZapato: tieneZapato
        ? {
            PrecioZapato: parseFloat(formData.precio_zapato) || 0,
            NumeroProduccion: formData.zapato_numero_produccion,
            EstiloZapato: formData.zapato_estilo,
            Observaciones: formData.zapato_obs,
          }
        : null,
    };

    try {
      if (editingId) {
        // MODO EDICIÓN
        await ordenesService.actualizarCompleta(editingId, payload);
        setAlert({ type: "success", message: "Orden actualizada con éxito" });
      } else {
        // MODO CREACIÓN
        await ordenesService.crearCompleta(payload);
        setAlert({
          type: "success",
          message: "Orden integral creada con éxito",
        });
      }

      setShowForm(false);
      setEditingId(null);
      setFormData(initialState); // <-- Agrega esta línea// MUY IMPORTANTE: Limpiar el ID
      fetchOrdenes(); // Recargamos la tabla
    } catch (error) {
      console.error("Error:", error);
      setAlert({ type: "error", message: "Error al guardar los detalles." });
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const formatDateVisual = (dateString) => {
    if (!dateString) return "-";
    return dateString.split("T")[0];
  };

  const filteredOrdenes = ordenes.filter((o) => {
    // 1. Condición de búsqueda por texto (Folio o Cliente)
    const clienteNombre =
      clientes.find((c) => c.idCliente === o.idCliente)?.nombreCompleto || "";

    const coincideTexto =
      o.idOrden.toString().includes(searchTerm) ||
      clienteNombre.toLowerCase().includes(searchTerm.toLowerCase());

    // 2. Condición de filtro por estatus
    // Si filtroEstatus está vacío (""), mostramos todos.
    // Si tiene un valor, validamos que el idEstatus de la orden coincida.
    const coincideEstatus =
      filtroEstatus === "" || o.idEstatus.toString() === filtroEstatus;

    // 3. La orden DEBE cumplir ambas condiciones para mostrarse
    return coincideTexto && coincideEstatus;
  });

  // --- FUNCIÓN PARA DAR COLOR A CADA ESTATUS ---
  const getEstatusColor = (idEstatus) => {
    const colores = {
      1: "bg-blue-900/30 text-blue-400 border-blue-900/50", // Nueva orden (Azul)
      2: "bg-indigo-900/30 text-indigo-400 border-indigo-900/50", // En revisión (Índigo)
      3: "bg-orange-900/30 text-orange-400 border-orange-900/50", // Pendiente de medidas (Naranja)
      4: "bg-yellow-900/30 text-yellow-400 border-yellow-900/50", // Medidas registradas (Amarillo)
      5: "bg-teal-900/30 text-teal-400 border-teal-900/50", // Autorizado para producción (Turquesa)
      6: "bg-fuchsia-900/30 text-fuchsia-400 border-fuchsia-900/50", // En confección (Fucsia/Magenta)
      7: "bg-emerald-900/30 text-emerald-400 border-emerald-900/50", // Listo para entrega (Esmeralda)
      8: "bg-green-900/30 text-green-400 border-green-900/50", // Entregado (Verde vibrante)
      9: "bg-red-900/30 text-red-400 border-red-900/50", // Cancelado (Rojo)
    };

    // Si por alguna razón llega un ID desconocido, le pone gris por defecto
    return (
      colores[idEstatus] || "bg-gray-900/30 text-gray-400 border-gray-900/50"
    );
  };

  const handleCopiarOrden = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe por error

    const dataToCopy = { ...formData };
    // Eliminamos el ID para no sobreescribir una orden existente por accidente
    delete dataToCopy.idOrden;

    localStorage.setItem("ordenCopiadaJaramillo", JSON.stringify(dataToCopy));
    alert("¡Orden copiada! Ahora puedes crear una orden nueva y pegarla.");
  };

  const handlePegarOrden = (e) => {
    e.preventDefault();
    const savedData = localStorage.getItem("ordenCopiadaJaramillo");

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      // Extraemos datos que NO queremos sobreescribir (para mantener el cliente y fechas actuales)
      const {
        idCliente,
        fecha_cita,
        fecha_entrega,
        fecha_evento,
        ...restoDeDatos
      } = parsedData;

      setFormData((prev) => ({
        ...prev,
        ...restoDeDatos,
      }));

      alert("¡Medidas y especificaciones pegadas con éxito!");
    } else {
      alert("No hay ninguna orden guardada en el portapapeles.");
    }
  };

  // --- FUNCIONES POR SECCIÓN INDIVIDUAL ---
  const handleCopiarSeccion = (e, seccion) => {
    e.preventDefault();
    const datosSeccion = {};
    CAMPOS_POR_SECCION[seccion].forEach((campo) => {
      datosSeccion[campo] = formData[campo];
    });
    localStorage.setItem(`jaramillo_${seccion}`, JSON.stringify(datosSeccion));
    alert(`¡Especificaciones y medidas de ${seccion.toUpperCase()} copiadas!`);
  };

  const handlePegarSeccion = (e, seccion) => {
    e.preventDefault();
    const guardado = localStorage.getItem(`jaramillo_${seccion}`);
    if (guardado) {
      setFormData((prev) => ({
        ...prev,
        ...JSON.parse(guardado),
      }));
    } else {
      alert(`No hay datos copiados previamente para ${seccion.toUpperCase()}.`);
    }
  };

  const handleLimpiarSeccion = (e, seccion) => {
    e.preventDefault();
    if (
      window.confirm(
        `¿Seguro que deseas limpiar todos los datos del ${seccion.toUpperCase()}?`,
      )
    ) {
      const resetData = {};
      CAMPOS_POR_SECCION[seccion].forEach((campo) => {
        resetData[campo] = ""; // Los vacía
      });
      setFormData((prev) => ({
        ...prev,
        ...resetData,
      }));
    }
  };

  // --- FUNCIÓN PARA LIMPIAR TODO EL FORMULARIO ---
  const handleLimpiarTodo = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "¿Seguro que deseas limpiar TODA la orden? Perderás lo no guardado.",
      )
    ) {
      setFormData(initialState);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto min-h-screen text-gray-200">
      <Alert
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ type: "", message: "" })}
      />

      {/* HEADER Y TABLA */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Órdenes</h1>
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
            className="px-5 py-2 bg-black text-white rounded-lg border border-gray-800 focus:border-white transition-all text-sm outline-none w-64"
          />
          <select
            value={filtroEstatus}
            onChange={(e) => setFiltroEstatus(e.target.value)}
            className="px-5 py-2 bg-black text-white rounded-lg border border-gray-800 focus:border-white transition-all text-sm outline-none w-64"
          >
            <option value="">Filtrar por estatus...</option>
            {estatusList.map((estatus) => (
              <option key={estatus.idEstatus} value={estatus.idEstatus}>
                {estatus.descripcion}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setFormData(initialState);
              setEditingId(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-5 py-2 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-all text-sm"
          >
            + Nueva Orden
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
            <p className="text-lg font-bold">Sin resultados</p>
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
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-black tracking-widest border uppercase transition-colors ${getEstatusColor(o.idEstatus)}`}
                        >
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
                            <Eye size={18} strokeWidth={2.5} />
                          </button>
                          <button
                            onClick={() => handleEditClick(o)}
                            className="text-gray-400 hover:text-white transition-colors text-lg"
                            title="Editar"
                          >
                            <Edit size={18} strokeWidth={2.5} />{" "}
                          </button>
                          <button
                            onClick={() => descargarResumenOrden(o)}
                            title="Descargar Resumen"
                            className="text-gray-400 hover:text-blue-400 transition-colors"
                          >
                            <Download size={18} strokeWidth={2.5} />
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
                      label="Fecha de Entrega"
                      type="date"
                      value={formData.fecha_entrega}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fecha_entrega: e.target.value,
                        })
                      }
                      style={{ colorScheme: "dark" }}
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <Input
                      label="Fecha de Evento"
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
                  {/* BOTONES DE TIPOS DE TRAJE */}
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
                        className={`px-6 py-4 border rounded-md text-[11px] font-bold uppercase transition-all ${
                          formData.id_tipo_traje === tipo.idTipoTraje
                            ? "bg-white text-black border-white scale-105"
                            : "text-gray-500 border-gray-800 hover:border-gray-600"
                        }`}
                      >
                        {tipo.descripcion}
                      </button>
                    ))}
                  </div>

                  {/* CAJA DE OPCIONES ADICIONALES (Aparece siempre que haya un traje seleccionado) */}
                  {formData.id_tipo_traje && (
                    <div className="pt-4 border-t border-gray-800 flex flex-col sm:flex-row flex-wrap gap-6 bg-gray-900/40 p-4 rounded-lg">
                      {/* CHECKBOX: Smoking 3 piezas (Exclusivo del ID 9) */}
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

                      {/* CHECKBOX: Camisa (AHORA APARECE EN TODOS LOS TIPOS) */}
                      {parseInt(formData.id_tipo_traje) !== 6 && (
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
                      )}

                      {/* CHECKBOX: Zapatos (Aparece en todos MENOS en el ID 10) */}
                      {parseInt(formData.id_tipo_traje) !== 10 && (
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            checked={formData.incluye_zapato || false}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                incluye_zapato: e.target.checked,
                              })
                            }
                            className="w-5 h-5 accent-white"
                          />
                          <label className="text-[11px] font-bold text-white uppercase">
                            ¿Incluir Zapatos?
                          </label>
                        </div>
                      )}
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
                  {/* Ejemplo para la sección del SACO */}
                  <div className="flex justify-end gap-2 mb-6 border-b border-gray-800 pb-4">
                    <button
                      type="button"
                      onClick={(e) => handleCopiarSeccion(e, "saco")}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded text-[10px] font-bold uppercase transition-colors"
                    >
                      <Copy size={12} /> Copiar Saco
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handlePegarSeccion(e, "saco")}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded text-[10px] font-bold uppercase transition-colors"
                    >
                      <ClipboardPaste size={12} /> Pegar
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleLimpiarSeccion(e, "saco")}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-900/20 hover:bg-red-900/40 text-red-400 hover:text-red-300 border border-red-900/50 rounded text-[10px] font-bold uppercase transition-colors ml-2"
                    >
                      <Trash2 size={12} /> Limpiar
                    </button>
                  </div>
                  <div className="animate-in fade-in duration-500">
                    <div
                      className="grid gap-4 sm:gap-6 mb-8 
                      grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
                    >
                      <Input
                        label="Número de Producción"
                        placeholder="Ej. ZG-881"
                        value={formData.saco_numero_produccion}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            saco_numero_produccion: e.target.value,
                          })
                        }
                      />
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
                        label="Estilo Solapa"
                        value={formData.saco_solapa}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            saco_solapa: e.target.value,
                          })
                        }
                        options={opcionesSolapa}
                      />
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
                  <div className="flex justify-end gap-2 mb-6 border-b border-gray-800 pb-4">
                    <button
                      type="button"
                      onClick={(e) => handleCopiarSeccion(e, "chaleco")}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded text-[10px] font-bold uppercase transition-colors"
                    >
                      <Copy size={12} /> Copiar Chaleco
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handlePegarSeccion(e, "chaleco")}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded text-[10px] font-bold uppercase transition-colors"
                    >
                      <ClipboardPaste size={12} /> Pegar
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleLimpiarSeccion(e, "chaleco")}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-900/20 hover:bg-red-900/40 text-red-400 hover:text-red-300 border border-red-900/50 rounded text-[10px] font-bold uppercase transition-colors ml-2"
                    >
                      <Trash2 size={12} /> Limpiar
                    </button>
                  </div>
                  <div className="animate-in fade-in duration-500">
                    {/* 1. SECCIÓN SUPERIOR: Inputs y Selects Estándar */}
                    <div
                      className="grid gap-4 sm:gap-6 mb-8 
        grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
                    >
                      <Input
                        label="Número de Producción"
                        placeholder="Ej. ZG-881"
                        value={formData.chal_numero_produccion}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            chal_numero_produccion: e.target.value,
                          })
                        }
                      />
                      <Input
                        label="Código Tela Chaleco"
                        value={formData.chal_tela}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            chal_tela: e.target.value,
                          })
                        }
                        placeholder="Ej. ZG-881"
                      />

                      <Input
                        label="Código Botón"
                        value={formData.chal_boton}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            chal_boton: e.target.value,
                          })
                        }
                      />

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

                    {/* 2. SECCIÓN MEDIA: Selectores de Imágenes */}
                    <div
                      className="grid gap-8 border-t border-gray-800 pt-8 mb-8
        grid-cols-1 lg:grid-cols-2"
                    >
                      <ImageSelect
                        label="Estilo de Cuello"
                        value={formData.chal_cuello}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            chal_cuello: e.target.value,
                          })
                        }
                        options={opcionesCuello}
                      />

                      <ImageSelect
                        label="Estilo Botones"
                        value={formData.chal_botones}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            chal_botones: e.target.value,
                          })
                        }
                        options={opcionesBotonesChaleco}
                      />

                      <ImageSelect
                        label="Bolsillo Pecho"
                        value={formData.chal_b_pecho}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            chal_b_pecho: e.target.value,
                          })
                        }
                        options={opcionesBolsilloPechoChaleco}
                      />

                      <ImageSelect
                        label="Bolsillos Inferiores"
                        value={formData.chal_b_inf}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            chal_b_inf: e.target.value,
                          })
                        }
                        options={opcionesBolsillos}
                      />

                      <ImageSelect
                        label="Terminación Inferior"
                        value={formData.chal_terminacion}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            chal_terminacion: e.target.value,
                          })
                        }
                        options={opcionesEstiloInferior}
                      />
                    </div>

                    {/* 3. SECCIÓN INFERIOR: Observaciones */}
                    <div className="grid gap-6 border-t border-gray-800 pt-8">
                      <div className="col-span-full">
                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">
                          Observaciones Chaleco
                        </label>
                        <textarea
                          value={formData.obs_chaleco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              obs_chaleco: e.target.value,
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

              {/* ESPECIFICACIONES DE LA CAMISA */}
              {tieneCamisa && (
                <Section
                  title="Detalles de la Camisa"
                  isOpen={sections.camisa}
                  onToggle={() => toggleSection("camisa")}
                  icon={Scissors}
                >
                  <div className="flex justify-end gap-2 mb-6 border-b border-gray-800 pb-4">
                    <button
                      type="button"
                      onClick={(e) => handleCopiarSeccion(e, "camisa")}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded text-[10px] font-bold uppercase transition-colors"
                    >
                      <Copy size={12} /> Copiar Camisa
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handlePegarSeccion(e, "camisa")}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded text-[10px] font-bold uppercase transition-colors"
                    >
                      <ClipboardPaste size={12} /> Pegar
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleLimpiarSeccion(e, "camisa")}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-900/20 hover:bg-red-900/40 text-red-400 hover:text-red-300 border border-red-900/50 rounded text-[10px] font-bold uppercase transition-colors ml-2"
                    >
                      <Trash2 size={12} /> Limpiar
                    </button>
                  </div>
                  <div className="animate-in fade-in duration-500">
                    {/* 1. SECCIÓN SUPERIOR: Inputs y Selects Estándar */}
                    <div
                      className="grid gap-4 sm:gap-6 mb-8 
        grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
                    >
                      <Input
                        label="Número de Producción"
                        placeholder="Ej. ZG-881"
                        value={formData.camisa_numero_produccion}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            camisa_numero_produccion: e.target.value,
                          })
                        }
                      />
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

                    {/* 2. SECCIÓN MEDIA: Selectores Visuales */}
                    <div
                      className="grid gap-8 border-t border-gray-800 pt-8 mb-8
        grid-cols-1 lg:grid-cols-2"
                    >
                      <ImageSelect
                        label="Estilo de Cuello"
                        value={formData.camisa_cuello}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            camisa_cuello: e.target.value,
                          })
                        }
                        options={opcionesCollar}
                      />

                      <ImageSelect
                        label="Estilo de Tapeta / Pechera"
                        value={formData.camisa_tapeta}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            camisa_tapeta: e.target.value,
                          })
                        }
                        options={opcionesEstiloBotones}
                      />

                      <ImageSelect
                        label="Estilo de Puño"
                        value={formData.camisa_puno}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            camisa_puno: e.target.value,
                          })
                        }
                        options={opcionesBotonManga}
                      />

                      <ImageSelect
                        label="Estilo de Bolsillo"
                        value={formData.camisa_bolsillo}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            camisa_bolsillo: e.target.value,
                          })
                        }
                        options={opcionesPocket}
                      />

                      <ImageSelect
                        label="Solapa de Bolsillos"
                        value={formData.camisa_solapa_bolsillo}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            camisa_solapa_bolsillo: e.target.value,
                          })
                        }
                        options={opcionesSolapaBolsillos}
                      />

                      <ImageSelect
                        label="Pliegues Frontales / Estilo"
                        value={formData.camisa_pliegues}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            camisa_pliegues: e.target.value,
                          })
                        }
                        options={opcionesEstilo}
                      />

                      <ImageSelect
                        label="Posición de Contraste"
                        value={formData.camisa_pos_contraste}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            camisa_pos_contraste: e.target.value,
                          })
                        }
                        options={opcionesContrastPosition}
                      />
                    </div>

                    {/* 3. SECCIÓN INFERIOR: Observaciones */}
                    <div className="grid gap-6 border-t border-gray-800 pt-8">
                      <div className="col-span-full">
                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">
                          Observaciones de la Camisa
                        </label>
                        <textarea
                          value={formData.camisa_obs}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              camisa_obs: e.target.value,
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

              {/* ESPECIFICACIONES DEL PANTALÓN */}
              {tienePantalon && (
                <Section
                  title="Especificaciones del Pantalón"
                  isOpen={sections.pantalon}
                  onToggle={() => toggleSection("pantalon")}
                  icon={Scissors}
                >
                  <div className="flex justify-end gap-2 mb-6 border-b border-gray-800 pb-4">
                    <button
                      type="button"
                      onClick={(e) => handleCopiarSeccion(e, "pantalon")}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded text-[10px] font-bold uppercase transition-colors"
                    >
                      <Copy size={12} /> Copiar Pantalón
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handlePegarSeccion(e, "pantalon")}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded text-[10px] font-bold uppercase transition-colors"
                    >
                      <ClipboardPaste size={12} /> Pegar
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleLimpiarSeccion(e, "pantalon")}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-900/20 hover:bg-red-900/40 text-red-400 hover:text-red-300 border border-red-900/50 rounded text-[10px] font-bold uppercase transition-colors ml-2"
                    >
                      <Trash2 size={12} /> Limpiar
                    </button>
                  </div>
                  <div className="animate-in fade-in duration-500">
                    {/* 1. SECCIÓN SUPERIOR: Inputs y Selects Estándar */}
                    <div
                      className="grid gap-4 sm:gap-6 mb-8 
        grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
                    >
                      <Input
                        label="Número de Producción"
                        placeholder="Ej. ZG-881"
                        value={formData.pant_numero_produccion}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pant_numero_produccion: e.target.value,
                          })
                        }
                      />
                      <Input
                        label="Código Tela"
                        placeholder="Ej. LP-99"
                        value={formData.tela_pantalon}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            tela_pantalon: e.target.value,
                          })
                        }
                      />

                      <Input
                        label="Código Botón"
                        placeholder="Ej. Horn-04"
                        value={formData.pant_boton}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pant_boton: e.target.value,
                          })
                        }
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

                      {/* Regresamos Pliegues como Select normal */}
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

                      {/* Regresamos Bolsillo Reloj como Select normal */}
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
                          setFormData({
                            ...formData,
                            pant_bajos: e.target.value,
                          })
                        }
                        options={catalogs.pantalon.bajos}
                      />

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

                    {/* 2. SECCIÓN MEDIA: Solo Estilo Pretina en imágenes */}
                    <div
                      className="grid gap-8 border-t border-gray-800 pt-8 mb-8
        grid-cols-1 lg:grid-cols-2"
                    >
                      <ImageSelect
                        label="Estilo Pretina"
                        value={formData.pant_pretina}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pant_pretina: e.target.value,
                          })
                        }
                        options={opcionesPretinas} // Asegúrate de usar el nombre correcto del array
                      />
                    </div>

                    {/* 3. SECCIÓN INFERIOR: Observaciones unificadas */}
                    <div className="grid gap-6 border-t border-gray-800 pt-8">
                      <div className="col-span-full">
                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">
                          Observaciones Pantalón
                        </label>
                        <textarea
                          value={formData.obs_pantalon}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              obs_pantalon: e.target.value,
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

              {tieneZapato && (
                <Section
                  title="Especificaciones del Zapato"
                  isOpen={sections.zapato}
                  onToggle={() => toggleSection("zapato")}
                  icon={Scissors}
                >
                  <div className="flex justify-end gap-2 mb-6 border-b border-gray-800 pb-4">
                    <button
                      type="button"
                      onClick={(e) => handleCopiarSeccion(e, "zapato")}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded text-[10px] font-bold uppercase transition-colors"
                    >
                      <Copy size={12} /> Copiar Zapato
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handlePegarSeccion(e, "zapato")}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/50 hover:bg-gray-700 text-gray-300 hover:text-white rounded text-[10px] font-bold uppercase transition-colors"
                    >
                      <ClipboardPaste size={12} /> Pegar
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleLimpiarSeccion(e, "zapato")}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-900/20 hover:bg-red-900/40 text-red-400 hover:text-red-300 border border-red-900/50 rounded text-[10px] font-bold uppercase transition-colors ml-2"
                    >
                      <Trash2 size={12} /> Limpiar
                    </button>
                  </div>
                  <div className="animate-in fade-in duration-500">
                    {/* 1. SECCIÓN SUPERIOR: Inputs y Selects Estándar */}
                    <div
                      className="grid gap-4 sm:gap-6 mb-8 
        grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
                    >
                      <Input
                        label="Número de Producción"
                        placeholder="Ej. ZG-881"
                        value={formData.zapato_numero_produccion}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            zapato_numero_produccion: e.target.value,
                          })
                        }
                      />
                      <Input
                        label="Estilo de Zapato"
                        placeholder="Ej. Oxford, Derby, Monkstrap"
                        value={formData.zapato_estilo} // CORREGIDO
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            zapato_estilo: e.target.value, // CORREGIDO
                          })
                        }
                      />
                      <Input
                        label="Precio de Zapatos ($)"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={formData.precio_zapato}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            precio_zapato: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-6 border-t border-gray-800 pt-8">
                      <div className="col-span-full">
                        <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">
                          Observaciones Zapato
                        </label>
                        <textarea
                          value={formData.zapato_obs}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              zapato_obs: e.target.value,
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

              {/* SECCIÓN: LIBRO DE MEDIDAS */}
              <Section
                title="Libro de Medidas Técnicas"
                isOpen={sections.medidas}
                onToggle={() => toggleSection("medidas")}
                icon={Ruler}
              >
                <div className="space-y-10 animate-in fade-in duration-700">
                  {/* --- 0. CUERPO Y CALZADO --- */}
                  <div>
                    <h3 className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <span className="w-8 h-[1px] bg-white/20"></span>
                      Cuerpo
                    </h3>
                    <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
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

                  {/* --- 1. ESPECIFICACIONES SACO --- */}
                  {tieneSaco && (
                    <div className="animate-in slide-in-from-left duration-500">
                      <h3 className="text-[9px] font-black text-blue-400/60 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-blue-400/30"></span>
                        Especificaciones Saco
                      </h3>
                      <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
                        <Input
                          label="Collar"
                          type="number"
                          step="0.01"
                          value={formData.collarSaco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              collarSaco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Largo Frente"
                          type="number"
                          step="0.01"
                          value={formData.longitudFrontalSaco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              longitudFrontalSaco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Largo Espalda"
                          type="number"
                          step="0.01"
                          value={formData.longitudEspaldaSaco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              longitudEspaldaSaco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Hombros"
                          type="number"
                          step="0.01"
                          value={formData.hombrosSaco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hombrosSaco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Pecho total"
                          type="number"
                          step="0.01"
                          value={formData.pechoSaco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              pechoSaco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Estómago"
                          type="number"
                          step="0.01"
                          value={formData.estomagoSaco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              estomagoSaco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Barriga"
                          type="number"
                          step="0.01"
                          value={formData.vientreSaco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              vientreSaco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Caderas"
                          type="number"
                          step="0.01"
                          value={formData.caderasSaco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              caderasSaco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Manga Izq"
                          type="number"
                          step="0.01"
                          value={formData.longitudMangaISaco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              longitudMangaISaco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Manga Der"
                          type="number"
                          step="0.01"
                          value={formData.longitudMangaDSaco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              longitudMangaDSaco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Bíceps"
                          type="number"
                          step="0.01"
                          value={formData.bicepsSaco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              bicepsSaco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Antebrazo"
                          type="number"
                          step="0.01"
                          value={formData.anteBrazoSaco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              anteBrazoSaco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Muñeca"
                          type="number"
                          step="0.01"
                          value={formData.muñecaSaco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              muñecaSaco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Frente Hombro"
                          type="number"
                          step="0.01"
                          value={formData.hombroDelanteroSaco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hombroDelanteroSaco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Espalda Ancha"
                          type="number"
                          step="0.01"
                          value={formData.anchoTraseroSaco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              anchoTraseroSaco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Hombro - Estómago Posterior"
                          type="number"
                          step="0.01"
                          value={formData.nucaCinturaSaco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              nucaCinturaSaco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Hombro - Estómago Frente"
                          type="number"
                          step="0.01"
                          value={formData.longitudCinturaDelanteraSaco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              longitudCinturaDelanteraSaco: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}

                  {/* --- 2. ESPECIFICACIONES CHALECO --- */}
                  {tieneChaleco && (
                    <div className="animate-in slide-in-from-left duration-500">
                      <h3 className="text-[9px] font-black text-purple-400/60 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-purple-400/30"></span>
                        Especificaciones Chaleco
                      </h3>
                      <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
                        <Input
                          label="Collar"
                          type="number"
                          step="0.01"
                          value={formData.collarChaleco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              collarChaleco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Largo Frente"
                          type="number"
                          step="0.01"
                          value={formData.longitudFrontalChaleco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              longitudFrontalChaleco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Largo Espalda"
                          type="number"
                          step="0.01"
                          value={formData.longitudEspaldaChaleco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              longitudEspaldaChaleco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Pecho Total"
                          type="number"
                          step="0.01"
                          value={formData.pechoChaleco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              pechoChaleco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Estómago"
                          type="number"
                          step="0.01"
                          value={formData.estomagoChaleco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              estomagoChaleco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Caderas"
                          type="number"
                          step="0.01"
                          value={formData.caderasChaleco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              caderasChaleco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Hombro - Estómago Frente"
                          type="number"
                          step="0.01"
                          value={formData.longitudCinturaDChaleco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              longitudCinturaDChaleco: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Hombro - Estómago Posterior"
                          type="number"
                          step="0.01"
                          value={formData.nucaCinturaChaleco}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              nucaCinturaChaleco: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}

                  {/* --- 3. ESPECIFICACIONES CAMISA --- */}
                  {tieneCamisa && (
                    <div className="animate-in slide-in-from-left duration-500">
                      <h3 className="text-[9px] font-black text-green-400/60 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-green-400/30"></span>
                        Especificaciones Camisa
                      </h3>
                      <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
                        <Input
                          label="Collar"
                          type="number"
                          step="0.01"
                          value={formData.collarCamisa}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              collarCamisa: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Largo Frente"
                          type="number"
                          step="0.01"
                          value={formData.longitudFrontalCamisa}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              longitudFrontalCamisa: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Largo Espalda"
                          type="number"
                          step="0.01"
                          value={formData.longitudEspaldaCamisa}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              longitudEspaldaCamisa: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Hombros"
                          type="number"
                          step="0.01"
                          value={formData.hombrosCamisa}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hombrosCamisa: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Pecho total"
                          type="number"
                          step="0.01"
                          value={formData.pechoCamisa}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              pechoCamisa: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Estómago"
                          type="number"
                          step="0.01"
                          value={formData.estomagoCamisa}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              estomagoCamisa: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Barriga"
                          type="number"
                          step="0.01"
                          value={formData.vientreCamisa}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              vientreCamisa: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Caderas"
                          type="number"
                          step="0.01"
                          value={formData.caderasCamisa}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              caderasCamisa: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Manga Izq"
                          type="number"
                          step="0.01"
                          value={formData.longitudMangaICamisa}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              longitudMangaICamisa: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Manga Der"
                          type="number"
                          step="0.01"
                          value={formData.longitudMangaDCamisa}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              longitudMangaDCamisa: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Bíceps"
                          type="number"
                          step="0.01"
                          value={formData.bicepsCamisa}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              bicepsCamisa: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Antebrazo"
                          type="number"
                          step="0.01"
                          value={formData.anteBrazoCamisa}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              anteBrazoCamisa: e.target.value,
                            })
                          }
                        />
                        <div>
                          <Input
                            label="Muñeca"
                            type="number"
                            step="0.01"
                            value={formData.muñecaCamisa}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                muñecaCamisa: e.target.value,
                              })
                            }
                          />
                          <span className="col-span-full text-center text-sm text-gray-500 italic">
                            (Agregar 6.7 cm si es de manga larga)
                          </span>
                        </div>

                        <Input
                          label="Frente Hombro"
                          type="number"
                          step="0.01"
                          value={formData.hombroDelanteroCamisa}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hombroDelanteroCamisa: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Espalda Ancha"
                          type="number"
                          step="0.01"
                          value={formData.anchoTraseroCamisa}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              anchoTraseroCamisa: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Hombro - Estómago Posterior"
                          type="number"
                          step="0.01"
                          value={formData.nucaCinturaCamisa}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              nucaCinturaCamisa: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Hombro - Estómago Frente"
                          type="number"
                          step="0.01"
                          value={formData.longitudCinturaDelanteraCamisa}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              longitudCinturaDelanteraCamisa: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}

                  {/* --- 4. ESPECIFICACIONES PANTALÓN --- */}
                  {tienePantalon && (
                    <div className="animate-in slide-in-from-left duration-500">
                      <h3 className="text-[9px] font-black text-amber-400/60 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-amber-400/30"></span>
                        Especificaciones Pantalón
                      </h3>
                      <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
                        <Input
                          label="Largo Izq"
                          type="number"
                          step="0.01"
                          value={formData.longitudIPantalon}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              longitudIPantalon: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Largo Der"
                          type="number"
                          step="0.01"
                          value={formData.longitudDPantalon}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              longitudDPantalon: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Cintura"
                          type="number"
                          step="0.01"
                          value={formData.cinturaPantalon}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              cinturaPantalon: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Cadera"
                          type="number"
                          step="0.01"
                          value={formData.caderaPantalon}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              caderaPantalon: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Muslo"
                          type="number"
                          step="0.01"
                          value={formData.musloPantalon}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              musloPantalon: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Rodilla"
                          type="number"
                          step="0.01"
                          value={formData.rodillaPantalon}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              rodillaPantalon: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Pantorrilla"
                          type="number"
                          step="0.01"
                          value={formData.alTerrillaPantalon}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              alTerrillaPantalon: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Brazalete (Bajos)"
                          type="number"
                          step="0.01"
                          value={formData.brazaletePantalon}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              brazaletePantalon: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Entrepierna (Tiro)"
                          type="number"
                          step="0.01"
                          value={formData.entrepiernaPantalon}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              entrepiernaPantalon: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Altura Cint. Tras."
                          type="number"
                          step="0.01"
                          value={formData.alturaCinturaTPantalon}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              alturaCinturaTPantalon: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Altura Cint. Del."
                          type="number"
                          step="0.01"
                          value={formData.alturaCinturaDPantalon}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              alturaCinturaDPantalon: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  )}

                  {/* --- 5. ESPECIFICACIONES ZAPATO --- */}
                  {tieneZapato && (
                    <div className="animate-in slide-in-from-left duration-500">
                      <h3 className="text-[9px] font-black text-blue-400/60 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-blue-400/30"></span>
                        Especificaciones Zapato
                      </h3>
                      <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
                        <Input
                          label="Talla"
                          type="number"
                          step="0.01"
                          value={formData.tallaZapato}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              tallaZapato: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Ancho Empeine"
                          type="number"
                          step="0.01"
                          value={formData.anchoEmpeineZapato}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              anchoEmpeineZapato: e.target.value,
                            })
                          }
                        />
                        <Input
                          label="Largo Pie"
                          type="number"
                          step="0.01"
                          value={formData.largoPieZapato}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              largoPieZapato: e.target.value,
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
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopiarOrden}
                  className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-gray-800 rounded-lg text-xs font-black uppercase tracking-wider transition-all"
                  title="Copiar medidas y estilos de esta orden"
                >
                  <Copy size={16} />
                  <span className="hidden sm:inline">Copiar</span>
                </button>
                <button
                  type="button"
                  onClick={handlePegarOrden}
                  className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-gray-800 rounded-lg text-xs font-black uppercase tracking-wider transition-all"
                  title="Pegar los datos copiados previamente"
                >
                  <ClipboardPaste size={16} />
                  <span className="hidden sm:inline">Pegar</span>
                </button>
                <div className="w-[1px] h-full bg-gray-800 mx-1 hidden sm:block"></div>
                <button
                  type="button"
                  onClick={handleLimpiarTodo}
                  className="flex items-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg text-xs font-black uppercase transition-all"
                >
                  <Trash2 size={16} />{" "}
                  <span className="hidden sm:inline">Limpiar Todo</span>
                </button>
              </div>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null); // Evita que se quede en "modo edición"
                  setFormData(initialState); // Limpia todos los inputs
                }}
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

      {showViewModal && viewingOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Fondo oscuro (Backdrop) */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fadeIn"
            onClick={() => {
              setShowViewModal(false);
              setViewingOrder(null);
              setDetallesSaco(null);
              setDetallesCamisa(null);
              if (typeof setDetallesChaleco !== "undefined")
                setDetallesChaleco(null);
            }}
          ></div>

          {/* Contenedor Principal (Esqueleto idéntico al Formulario) */}
          <div className="bg-[#09090b] w-full h-full flex flex-col shadow-2xl overflow-hidden z-10 animate-slideUp">
            {/* HEADER FIJO */}
            <div className="p-5 bg-black border-b border-gray-800 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-4">
                <h2 className="text-sm font-black uppercase text-white flex items-center gap-2 tracking-widest">
                  <Eye size={16} /> Detalles de Orden #{viewingOrder.idOrden}
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 bg-blue-900/30 text-blue-400 text-[9px] font-bold rounded-full border border-blue-800/50 uppercase">
                  {
                    tiposTrajeList.find(
                      (t) => t.idTipoTraje === viewingOrder.idTipoTraje,
                    )?.descripcion
                  }
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 bg-gray-800/50 text-gray-300 text-[9px] font-bold rounded-full border border-gray-700 uppercase">
                  {
                    estatusList.find(
                      (e) => e.idEstatus === viewingOrder.idEstatus,
                    )?.descripcion
                  }
                </span>
              </div>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setViewingOrder(null);
                  setDetallesSaco(null);
                  setDetallesCamisa(null);
                  if (typeof setDetallesChaleco !== "undefined")
                    setDetallesChaleco(null);
                }}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* CUERPO DEL MODAL (Con Scroll) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-black/20">
              {/* --- INFORMACIÓN GENERAL --- */}
              <Section
                title="Información General"
                isOpen={sectionsView.cliente}
                onToggle={() => toggleSectionView("cliente")}
                icon={Info}
              >
                <div className="flex flex-wrap gap-4 w-full">
                  <div className="flex-1 min-w-[200px]">
                    <InputReadOnly
                      label="Estatus"
                      value={
                        estatusList.find(
                          (e) => e.idEstatus === viewingOrder.idEstatus,
                        )?.descripcion || "-"
                      }
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <InputReadOnly
                      label="Cliente"
                      value={
                        clientes.find(
                          (c) => c.idCliente === viewingOrder.idCliente,
                        )?.nombreCompleto || "-"
                      }
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <InputReadOnly
                      label="Sucursal"
                      value={
                        sucursales.find(
                          (s) => s.idSucursal === viewingOrder.idSucursal,
                        )?.nombre || "-"
                      }
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <InputReadOnly
                      label="Tipo de Traje"
                      value={
                        tiposTrajeList.find(
                          (t) => t.idTipoTraje === viewingOrder.idTipoTraje,
                        )?.descripcion || "-"
                      }
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <InputReadOnly
                      label="Toma de Medidas"
                      value={formatDateVisual(
                        viewingOrder.fecha_cita ||
                          viewingOrder.fechaCita ||
                          formData.fecha_cita,
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <InputReadOnly
                      label="Fecha de Entrega"
                      value={formatDateVisual(
                        viewingOrder.fecha_entrega ||
                          viewingOrder.fechaEntrega ||
                          formData.fecha_entrega,
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <InputReadOnly
                      label="Fecha de Evento"
                      value={formatDateVisual(
                        viewingOrder.fecha_evento ||
                          viewingOrder.fechaEvento ||
                          formData.fecha_evento,
                      )}
                    />
                  </div>
                </div>
              </Section>

              {/* --- ESPECIFICACIONES DEL SACO --- */}
              {(detallesSaco || tieneSaco) && (
                <Section
                  title="Especificaciones del Saco"
                  isOpen={sectionsView.saco}
                  onToggle={() => toggleSectionView("saco")}
                  icon={Scissors}
                >
                  <div className="animate-in fade-in duration-500">
                    <div className="grid gap-4 sm:gap-6 mb-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                      <InputReadOnly
                        label="Numero de Producción"
                        value={
                          detallesSaco?.numeroProduccion ||
                          formData.saco_numero_produccion ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Código Tela"
                        value={
                          detallesSaco?.codigoTela || formData.tela_saco || "-"
                        }
                      />
                      <InputReadOnly
                        label="Código Forro"
                        value={
                          detallesSaco?.codigoForro ||
                          formData.saco_forro_cod ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Código Botón"
                        value={
                          detallesSaco?.codigoBoton ||
                          formData.saco_boton_cod ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Monograma (Iniciales)"
                        value={
                          detallesSaco?.monograma ||
                          formData.saco_monograma ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Tamaño Solapa"
                        value={
                          detallesSaco?.tamanoSolapa ||
                          formData.saco_tamano_solapa ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Estilo Solapa"
                        value={
                          detallesSaco?.estiloSolapa ||
                          formData.saco_solapa ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Estilo Botones"
                        value={
                          detallesSaco?.estiloBotones ||
                          formData.saco_botones ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Bolsillo Pecho"
                        value={
                          detallesSaco?.estiloBolsilloPecho ||
                          formData.saco_b_pecho ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Bolsillo Inferior"
                        value={
                          detallesSaco?.estiloBolsilloInf ||
                          formData.saco_b_inf ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Bolsillo Ticket"
                        value={
                          detallesSaco?.estiloBolsilloTicket ||
                          formData.saco_b_ticket ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Ojal Izquierdo"
                        value={
                          detallesSaco?.estiloOjalIzquierdo ||
                          formData.saco_ojalIzquierdo ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Ojal Derecho"
                        value={
                          detallesSaco?.estiloOjalDerecho ||
                          formData.saco_ojalDerecho ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Precio Saco ($)"
                        value={
                          detallesSaco?.precio
                            ? `$${detallesSaco.precio}`
                            : formData.precio_saco
                              ? `$${formData.precio_saco}`
                              : "-"
                        }
                      />
                    </div>
                    {(detallesSaco?.observaciones || formData.obs_saco) && (
                      <div className="grid gap-6 border-t border-gray-800 pt-8">
                        <div className="col-span-full">
                          <InputReadOnly
                            label="Observaciones Saco"
                            value={
                              detallesSaco?.observaciones ||
                              formData.obs_saco ||
                              "-"
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Section>
              )}

              {/* --- ESPECIFICACIONES DEL CHALECO --- */}
              {(detallesChaleco || tieneChaleco) && (
                <Section
                  title="Especificaciones del Chaleco"
                  isOpen={sectionsView.chaleco}
                  onToggle={() => toggleSectionView("chaleco")}
                  icon={Layers}
                >
                  <div className="animate-in fade-in duration-500">
                    <div className="grid gap-4 sm:gap-6 mb-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                      <InputReadOnly
                        label="Numero de Producción"
                        value={
                          detallesChaleco?.numeroProduccion ||
                          formData.chal_numero_produccion ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Código Tela"
                        value={
                          detallesChaleco?.codigoTela ||
                          formData.chal_tela ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Código Botón"
                        value={
                          detallesChaleco?.codigoBoton ||
                          formData.chal_boton ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Estilo Cuello"
                        value={
                          detallesChaleco?.estiloCuello ||
                          formData.chal_cuello ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Estilo Botones"
                        value={
                          detallesChaleco?.estiloBotones ||
                          formData.chal_botones ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Bolsillo Pecho"
                        value={
                          detallesChaleco?.estiloBolsilloPecho ||
                          formData.chal_b_pecho ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Bolsillos Inferiores"
                        value={
                          detallesChaleco?.estiloBolsilloInf ||
                          formData.chal_b_inf ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Terminación Inferior"
                        value={
                          detallesChaleco?.terminacionInf ||
                          formData.chal_terminacion ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Precio Chaleco ($)"
                        value={
                          detallesChaleco?.precio
                            ? `$${detallesChaleco.precio}`
                            : formData.precio_chaleco
                              ? `$${formData.precio_chaleco}`
                              : "-"
                        }
                      />
                    </div>
                    {(detallesChaleco?.observaciones ||
                      formData.obs_chaleco) && (
                      <div className="grid gap-6 border-t border-gray-800 pt-8">
                        <div className="col-span-full">
                          <InputReadOnly
                            label="Observaciones Chaleco"
                            value={
                              detallesChaleco?.observaciones ||
                              formData.obs_chaleco ||
                              "-"
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Section>
              )}

              {/* --- ESPECIFICACIONES DE LA CAMISA --- */}
              {(detallesCamisa || tieneCamisa) && (
                <Section
                  title="Detalles de la Camisa"
                  isOpen={sectionsView.camisa}
                  onToggle={() => toggleSectionView("camisa")}
                  icon={Scissors}
                >
                  <div className="animate-in fade-in duration-500">
                    <div className="grid gap-4 sm:gap-6 mb-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                      <InputReadOnly
                        label="Numero de Producción"
                        value={
                          detallesCamisa?.numeroProduccion ||
                          formData.camisa_numero_produccion ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Opción Camisa"
                        value={
                          detallesCamisa?.opcionCamisa ||
                          formData.opcion_camisa ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Código Tela"
                        value={
                          detallesCamisa?.codigoTela ||
                          formData.camisa_tela ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Tela Contraste"
                        value={
                          detallesCamisa?.contrasteTela ||
                          formData.camisa_contraste ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Posición Contraste"
                        value={
                          detallesCamisa?.posicionContraste ||
                          formData.camisa_pos_contraste ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Iniciales"
                        value={
                          detallesCamisa?.iniciales ||
                          formData.camisa_iniciales ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Estilo Cuello"
                        value={
                          detallesCamisa?.estiloCuello ||
                          formData.camisa_cuello ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Estilo Puño"
                        value={
                          detallesCamisa?.estiloPuno ||
                          formData.camisa_puno ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Estilo Tapeta"
                        value={
                          detallesCamisa?.estiloTapeta ||
                          formData.camisa_tapeta ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Estilo Bolsillo"
                        value={
                          detallesCamisa?.estiloBolsillo ||
                          formData.camisa_bolsillo ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Solapa Bolsillo"
                        value={
                          detallesCamisa?.solapaBolsillo ||
                          formData.camisa_solapa_bolsillo ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Pliegues Frontales"
                        value={
                          detallesCamisa?.plieguesFrontales ||
                          formData.camisa_pliegues ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Precio Camisa ($)"
                        value={
                          detallesCamisa?.precio
                            ? `$${detallesCamisa.precio}`
                            : formData.precio_camisa
                              ? `$${formData.precio_camisa}`
                              : "-"
                        }
                      />
                    </div>
                    {(detallesCamisa?.observaciones || formData.camisa_obs) && (
                      <div className="grid gap-6 border-t border-gray-800 pt-8">
                        <div className="col-span-full">
                          <InputReadOnly
                            label="Observaciones Camisa"
                            value={
                              detallesCamisa?.observaciones ||
                              formData.camisa_obs ||
                              "-"
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Section>
              )}

              {/* --- ESPECIFICACIONES DEL PANTALÓN --- */}
              {(detallesPantalon || tienePantalon) && (
                <Section
                  title="Especificaciones del Pantalón"
                  isOpen={sectionsView.pantalon}
                  onToggle={() => toggleSectionView("pantalon")}
                  icon={Scissors}
                >
                  <div className="animate-in fade-in duration-500">
                    <div className="grid gap-4 sm:gap-6 mb-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                      <InputReadOnly
                        label="Numero de Producción"
                        value={
                          detallesPantalon?.numeroProduccion ||
                          formData.pant_numero_produccion ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Código Tela"
                        value={
                          detallesPantalon?.codigoTela ||
                          formData.tela_pantalon ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Código Botón"
                        value={
                          detallesPantalon?.codigoBoton ||
                          formData.pant_boton ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Ajuste Cintura"
                        value={
                          detallesPantalon?.ajusteCintura ||
                          formData.pant_ajuste ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Altura Pretina"
                        value={
                          detallesPantalon?.alturaPretina ||
                          formData.pant_altura ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Estilo Pretina"
                        value={
                          detallesPantalon?.estiloPretina ||
                          formData.pant_pretina ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Pliegues"
                        value={
                          detallesPantalon?.estiloPliegues ||
                          formData.pant_pliegues ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Bolsillo Reloj"
                        value={
                          detallesPantalon?.estiloBolsilloReloj ||
                          formData.pant_bolsillo_reloj ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Estilo Bajos"
                        value={
                          detallesPantalon?.estiloBajos ||
                          formData.pant_bajos ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Precio Pantalón ($)"
                        value={
                          detallesPantalon?.precio
                            ? `$${detallesPantalon.precio}`
                            : formData.precio_pantalon
                              ? `$${formData.precio_pantalon}`
                              : "-"
                        }
                      />
                    </div>
                    {(detallesPantalon?.observaciones ||
                      formData.obs_pantalon) && (
                      <div className="grid gap-6 border-t border-gray-800 pt-8">
                        <div className="col-span-full">
                          <InputReadOnly
                            label="Observaciones Pantalón"
                            value={
                              detallesPantalon?.observaciones ||
                              formData.obs_pantalon ||
                              "-"
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Section>
              )}

              {(detallesZapato || tieneZapato) && (
                <Section
                  title="Especificaciones del Zapato"
                  isOpen={sectionsView.zapato}
                  onToggle={() => toggleSectionView("zapato")}
                  icon={Scissors}
                >
                  <div className="animate-in fade-in duration-500">
                    <div className="grid gap-4 sm:gap-6 mb-8 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                      <InputReadOnly
                        label="Numero de Producción"
                        value={
                          detallesZapato?.numeroProduccion ||
                          formData.zapato_numero_produccion ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Estilo de Zapato"
                        value={
                          detallesZapato?.zapato_estilo ||
                          formData.zapato_estilo ||
                          "-"
                        }
                      />
                      <InputReadOnly
                        label="Precio Zapato ($)"
                        value={
                          detallesZapato?.precio_zapato
                            ? `$${detallesZapato.precio_zapato}`
                            : formData.precio_zapato
                              ? `$${formData.precio_zapato}`
                              : "-"
                        }
                      />
                    </div>
                    {(detallesZapato?.observaciones || formData.obs_zapato) && (
                      <div className="grid gap-6 border-t border-gray-800 pt-8">
                        <div className="col-span-full">
                          <InputReadOnly
                            label="Observaciones Zapato"
                            value={
                              detallesZapato?.observaciones ||
                              formData.obs_zapato ||
                              "-"
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Section>
              )}

              {/* --- LIBRO DE MEDIDAS TÉCNICAS --- */}
              <Section
                title="Libro de Medidas Técnicas"
                isOpen={sectionsView.medidas}
                onToggle={() => toggleSectionView("medidas")}
                icon={Ruler}
              >
                <div className="space-y-10 animate-in fade-in duration-700">
                  {/* CUERPO Y CALZADO */}
                  <div>
                    <h3 className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <span className="w-8 h-[1px] bg-white/20"></span>
                      Cuerpo
                    </h3>
                    <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
                      <InputReadOnly
                        label="Altura (cm)"
                        value={formData.altura}
                      />
                      <InputReadOnly label="Peso (kg)" value={formData.peso} />
                      <InputReadOnly label="Tipo de Fit" value={formData.fit} />
                    </div>
                  </div>

                  {(detallesSaco || tieneSaco) && (
                    <div className="animate-in slide-in-from-left duration-500">
                      <h3 className="text-[9px] font-black text-blue-400/60 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-blue-400/30"></span>
                        Especificaciones Saco
                      </h3>
                      <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
                        <InputReadOnly
                          label="Collar"
                          value={formData.collarSaco}
                        />
                        <InputReadOnly
                          label="Largo Frente"
                          value={formData.longitudFrontalSaco}
                        />
                        <InputReadOnly
                          label="Largo Espalda"
                          value={formData.longitudEspaldaSaco}
                        />
                        <InputReadOnly
                          label="Hombros"
                          value={formData.hombrosSaco}
                        />
                        <InputReadOnly
                          label="Pecho total"
                          value={formData.pechoSaco}
                        />
                        <InputReadOnly
                          label="Estómago"
                          value={formData.estomagoSaco}
                        />
                        <InputReadOnly
                          label="Barriga"
                          value={formData.vientreSaco}
                        />
                        <InputReadOnly
                          label="Caderas"
                          value={formData.caderasSaco}
                        />
                        <InputReadOnly
                          label="Manga Izq"
                          value={formData.longitudMangaISaco}
                        />
                        <InputReadOnly
                          label="Manga Der"
                          value={formData.longitudMangaDSaco}
                        />
                        <InputReadOnly
                          label="Bíceps"
                          value={formData.bicepsSaco}
                        />
                        <InputReadOnly
                          label="Antebrazo"
                          value={formData.anteBrazoSaco}
                        />
                        <InputReadOnly
                          label="Muñeca"
                          value={formData.muñecaSaco}
                        />
                        <InputReadOnly
                          label="Frente Hombro"
                          value={formData.hombroDelanteroSaco}
                        />
                        <InputReadOnly
                          label="Espalda Ancha"
                          value={formData.anchoTraseroSaco}
                        />
                        <InputReadOnly
                          label="Hombro - Estómago Posterior"
                          value={formData.nucaCinturaSaco}
                        />
                        <InputReadOnly
                          label="Hombro - Estómago Frente"
                          value={formData.longitudCinturaDelanteraSaco}
                        />
                      </div>
                    </div>
                  )}

                  {(detallesChaleco || tieneChaleco) && (
                    <div className="animate-in slide-in-from-left duration-500">
                      <h3 className="text-[9px] font-black text-purple-400/60 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-purple-400/30"></span>
                        Especificaciones Chaleco
                      </h3>
                      <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
                        <InputReadOnly
                          label="Collar"
                          value={formData.collarChaleco}
                        />
                        <InputReadOnly
                          label="Largo Frente"
                          value={formData.longitudFrontalChaleco}
                        />
                        <InputReadOnly
                          label="Largo Espalda"
                          value={formData.longitudEspaldaChaleco}
                        />
                        <InputReadOnly
                          label="Pecho total"
                          value={formData.pechoChaleco}
                        />
                        <InputReadOnly
                          label="Estómago"
                          value={formData.estomagoChaleco}
                        />
                        <InputReadOnly
                          label="Caderas"
                          value={formData.caderasChaleco}
                        />
                        <InputReadOnly
                          label="Hombro - Estómago Frente"
                          value={formData.longitudCinturaDChaleco}
                        />
                        <InputReadOnly
                          label="Hombro - Estómago Posterior"
                          value={formData.nucaCinturaChaleco}
                        />
                      </div>
                    </div>
                  )}

                  {(detallesCamisa || tieneCamisa) && (
                    <div className="animate-in slide-in-from-left duration-500">
                      <h3 className="text-[9px] font-black text-green-400/60 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-green-400/30"></span>
                        Especificaciones Camisa
                      </h3>
                      <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
                        <InputReadOnly
                          label="Collar"
                          value={formData.collarCamisa}
                        />
                        <InputReadOnly
                          label="Largo Frente"
                          value={formData.longitudFrontalCamisa}
                        />
                        <InputReadOnly
                          label="Largo Espalda"
                          value={formData.longitudEspaldaCamisa}
                        />
                        <InputReadOnly
                          label="Hombros"
                          value={formData.hombrosCamisa}
                        />
                        <InputReadOnly
                          label="Pecho total"
                          value={formData.pechoCamisa}
                        />
                        <InputReadOnly
                          label="Estómago"
                          value={formData.estomagoCamisa}
                        />
                        <InputReadOnly
                          label="Barriga"
                          value={formData.vientreCamisa}
                        />
                        <InputReadOnly
                          label="Caderas"
                          value={formData.caderasCamisa}
                        />
                        <InputReadOnly
                          label="Manga Izq"
                          value={formData.longitudMangaICamisa}
                        />
                        <InputReadOnly
                          label="Manga Der"
                          value={formData.longitudMangaDCamisa}
                        />
                        <InputReadOnly
                          label="Bíceps"
                          value={formData.bicepsCamisa}
                        />
                        <InputReadOnly
                          label="Antebrazo"
                          value={formData.anteBrazoCamisa}
                        />
                        <InputReadOnly
                          label="Muñeca"
                          value={formData.muñecaCamisa}
                        />
                        <InputReadOnly
                          label="Frente Hombro"
                          value={formData.hombroDelanteroCamisa}
                        />
                        <InputReadOnly
                          label="Espalda Ancha"
                          value={formData.anchoTraseroCamisa}
                        />
                        <InputReadOnly
                          label="Hombro - Estómago Posterior"
                          value={formData.nucaCinturaCamisa}
                        />
                        <InputReadOnly
                          label="Hombro - Estómago Delantero"
                          value={formData.longitudCinturaDelanteraCamisa}
                        />
                      </div>
                    </div>
                  )}

                  {(detallesPantalon || tienePantalon) && (
                    <div className="animate-in slide-in-from-left duration-500">
                      <h3 className="text-[9px] font-black text-amber-400/60 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-amber-400/30"></span>
                        Especificaciones Pantalón
                      </h3>
                      <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
                        <InputReadOnly
                          label="Largo Izq"
                          value={formData.longitudIPantalon}
                        />
                        <InputReadOnly
                          label="Largo Der"
                          value={formData.longitudDPantalon}
                        />
                        <InputReadOnly
                          label="Cintura"
                          value={formData.cinturaPantalon}
                        />
                        <InputReadOnly
                          label="Cadera"
                          value={formData.caderaPantalon}
                        />
                        <InputReadOnly
                          label="Muslo"
                          value={formData.musloPantalon}
                        />
                        <InputReadOnly
                          label="Rodilla"
                          value={formData.rodillaPantalon}
                        />
                        <InputReadOnly
                          label="Pantorrilla"
                          value={formData.alTerrillaPantalon}
                        />
                        <InputReadOnly
                          label="Brazalete (Bajos)"
                          value={formData.brazaletePantalon}
                        />
                        <InputReadOnly
                          label="Entrepierna (Tiro)"
                          value={formData.entrepiernaPantalon}
                        />
                        <InputReadOnly
                          label="Altura Cint. Tras."
                          value={formData.alturaCinturaTPantalon}
                        />
                        <InputReadOnly
                          label="Altura Cint. Del."
                          value={formData.alturaCinturaDPantalon}
                        />
                      </div>
                    </div>
                  )}

                  {(detallesZapato || tieneZapato) && (
                    <div className="animate-in slide-in-from-left duration-500">
                      <h3 className="text-[9px] font-black text-amber-400/60 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                        <span className="w-8 h-[1px] bg-amber-400/30"></span>
                        Especificaciones Zapato
                      </h3>
                      <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
                        <InputReadOnly
                          label="Talla Zapato"
                          value={formData.tallaZapato}
                        />
                        <InputReadOnly
                          label="Ancho Empeine"
                          value={formData.anchoEmpeineZapato}
                        />
                        <InputReadOnly
                          label="Largo Pie"
                          value={formData.largoPieZapato}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Section>

              {/* --- RESUMEN FINANCIERO --- */}
              <Section
                title="Resumen Financiero"
                isOpen={sectionsView.finanzas}
                onToggle={() => toggleSectionView("finanzas")}
                icon={DollarSign}
              >
                <div className="bg-white/[0.02] p-5 rounded-xl border border-gray-800">
                  <div className="grid gap-4 sm:gap-6 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
                    <InputReadOnly
                      label="Costo Total de la Orden"
                      value={`$${parseFloat(viewingOrder.costoTotal || 0).toFixed(2)}`}
                    />
                    <InputReadOnly
                      label="Monto Abonado"
                      value={`$${parseFloat(viewingOrder.montoAbonado || 0).toFixed(2)}`}
                    />
                    <InputReadOnly
                      label="Método de Pago"
                      value={
                        viewingOrder.metodo_pago ||
                        viewingOrder.metodoPago ||
                        formData.metodo_pago ||
                        "-"
                      }
                    />

                    <div className="col-span-full mt-2 p-5 bg-blue-900/10 border border-blue-500/20 rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <div>
                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
                          Saldo Restante
                        </p>
                        <p className="text-3xl font-mono text-white mt-1">
                          $
                          {(
                            parseFloat(viewingOrder.costoTotal || 0) -
                            parseFloat(viewingOrder.montoAbonado || 0)
                          ).toFixed(2)}
                        </p>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                          Estado de Pago
                        </p>
                        <span
                          className={`inline-block mt-1 text-[11px] px-3 py-1.5 rounded-full font-bold tracking-wide ${
                            parseFloat(viewingOrder.montoAbonado || 0) >=
                              parseFloat(viewingOrder.costoTotal || 0) &&
                            parseFloat(viewingOrder.costoTotal || 0) > 0
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {parseFloat(viewingOrder.montoAbonado || 0) >=
                            parseFloat(viewingOrder.costoTotal || 0) &&
                          parseFloat(viewingOrder.costoTotal || 0) > 0
                            ? "LIQUIDADO"
                            : "PENDIENTE"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Section>
            </div>

            {/* FOOTER FIJO */}
            <div className="p-5 bg-black border-t border-gray-800 flex justify-end gap-3 shrink-0">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setViewingOrder(null);
                  // Limpiar estados secundarios
                  setDetallesSaco(null);
                  setDetallesCamisa(null);
                  if (typeof setDetallesChaleco !== "undefined")
                    setDetallesChaleco(null);
                  if (typeof setDetallesPantalon !== "undefined")
                    setDetallesPantalon(null);
                  // NUEVO: Purgar los datos principales
                  setFormData(initialState);
                }}
                className="px-8 py-3 bg-white text-black rounded-lg font-black text-xs uppercase shadow-lg hover:bg-gray-200 transition-colors"
              >
                Cerrar Visor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ordenes;
