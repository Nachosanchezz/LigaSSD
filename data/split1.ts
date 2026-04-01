// Datos históricos del Split 1 (septiembre 2024 – febrero 2025)

export type EquipoSplit1 = {
  nombre: string;
  corto: string;
  color: string;
  slug: string;
  jugadores: string[];
};

export type PartidoSplit1 = {
  jornada: number;
  local: string;
  visitante: string;
  golesLocal: number;
  golesVisitante: number;
};

export type JugadorSplit1 = {
  nombre: string;
  equipo: string;
  goles: number;
  asistencias: number;
  rojas: number;
  amarillas: number;
};

export type ClasificacionSplit1 = {
  equipo: string;
  pj: number;
  pts: number;
  gf: number;
  gc: number;
  dg: number;
};

export const equiposSplit1: EquipoSplit1[] = [
  {
    nombre: "FILÓSOFOS DE LA REDONDA",
    corto: "FILÓSOFOS",
    color: "7C3AED",
    slug: "filosofos",
    jugadores: ["ROME", "NACHO", "MIGUEL MORÁN", "PEDRO (P)", "RODRI URRU", "NICOPLASMAN", "GONZÁLEZ", "GOLCEDIDOPROPIAFIL"],
  },
  {
    nombre: "ATALAYA DEL ARCIPRESTE",
    corto: "ATALAYA",
    color: "EA580C",
    slug: "atalaya",
    jugadores: ["NACHITO", "MATU", "PETIT", "JIMMY", "GON AYLLÓN", "NALDA", "HÉCTOR", "GOLCEDIDOPROPIAADA"],
  },
  {
    nombre: "TORRE BELDES",
    corto: "TORRE BELDES",
    color: "059669",
    slug: "torre-beldes",
    jugadores: ["LOUIS", "TRIPERO", "LUCAS", "COCO", "LUCHO", "SOTTO", "NICO MARÍN", "GOLCEDIDOPROPIATB"],
  },
  {
    nombre: "ESPESITOS FC",
    corto: "ESPESITOS",
    color: "0891B2",
    slug: "espesitos",
    jugadores: ["BEL", "BORJA", "KIKE", "JAIME VALENCIANO", "RAFA", "FER", "MARCO", "GOLCEDIDOPROPIAESP"],
  },
  {
    nombre: "ETHILICO DE BILBAO",
    corto: "ETHILICO",
    color: "DC2626",
    slug: "ethilico",
    jugadores: ["JORGE (P)", "NICO PUEYO", "CÉSAR", "JAVI HERRERA", "LILO", "PABLO HURTADO", "PUKU", "MINGUI", "GOLCEDIDOPROPIAEDB"],
  },
  {
    nombre: "REAL CARTAGENA APRIETA",
    corto: "CARTAGENA",
    color: "1D4ED8",
    slug: "cartagena",
    jugadores: ["ÁLVARO", "JUAN", "MARIO", "POW", "DEMA", "JULI", "DANI WEST", "GUILLE", "GOLCEDIDOPROPIARCA"],
  },
  {
    nombre: "CLUB BRUJO",
    corto: "CLUB BRUJO",
    color: "9333EA",
    slug: "brujos",
    jugadores: ["DELAS", "GON", "RUI (P)", "ALEX DÍAZ", "FITER", "BARCA", "JAIME", "NACHO RAM", "GOLCEDIDOPROPIABRU"],
  },
  {
    nombre: "TORREZNOS",
    corto: "TORREZNOS",
    color: "B45309",
    slug: "torreznos",
    jugadores: ["GOYO", "ALO", "DANI PUEYO (P)", "URRU", "JUAN SH", "JORDI", "DAN", "TITO", "GOLCEDIDOPROPIATOR"],
  },
];

export const clasificacionSplit1: ClasificacionSplit1[] = [
  { equipo: "FILÓSOFOS DE LA REDONDA", pj: 14, pts: 35, gf: 109, gc: 42, dg: 67 },
  { equipo: "REAL CARTAGENA APRIETA",  pj: 14, pts: 29, gf: 86,  gc: 66, dg: 20 },
  { equipo: "ESPESITOS FC",            pj: 14, pts: 25, gf: 94,  gc: 90, dg: 4  },
  { equipo: "TORRE BELDES",            pj: 14, pts: 24, gf: 67,  gc: 75, dg: -8 },
  { equipo: "ETHILICO DE BILBAO",      pj: 14, pts: 19, gf: 58,  gc: 61, dg: -3 },
  { equipo: "TORREZNOS",               pj: 14, pts: 12, gf: 45,  gc: 71, dg: -26 },
  { equipo: "ATALAYA DEL ARCIPRESTE",  pj: 14, pts: 11, gf: 68,  gc: 93, dg: -25 },
  { equipo: "CLUB BRUJO",              pj: 14, pts: 9,  gf: 67,  gc: 96, dg: -29 },
];

export const jornadasSplit1: { numero: number; partidos: PartidoSplit1[] }[] = [
  {
    numero: 1,
    partidos: [
      { jornada: 1, local: "FILÓSOFOS DE LA REDONDA", visitante: "ATALAYA DEL ARCIPRESTE", golesLocal: 8,  golesVisitante: 0 },
      { jornada: 1, local: "ETHILICO DE BILBAO",      visitante: "TORRE BELDES",           golesLocal: 5,  golesVisitante: 7 },
      { jornada: 1, local: "ESPESITOS FC",             visitante: "REAL CARTAGENA APRIETA", golesLocal: 6,  golesVisitante: 4 },
      { jornada: 1, local: "CLUB BRUJO",               visitante: "TORREZNOS",              golesLocal: 3,  golesVisitante: 5 },
    ],
  },
  {
    numero: 2,
    partidos: [
      { jornada: 2, local: "ETHILICO DE BILBAO",      visitante: "TORREZNOS",              golesLocal: 6,  golesVisitante: 1 },
      { jornada: 2, local: "ESPESITOS FC",             visitante: "CLUB BRUJO",             golesLocal: 8,  golesVisitante: 6 },
      { jornada: 2, local: "FILÓSOFOS DE LA REDONDA", visitante: "TORRE BELDES",           golesLocal: 8,  golesVisitante: 1 },
      { jornada: 2, local: "ATALAYA DEL ARCIPRESTE",  visitante: "REAL CARTAGENA APRIETA", golesLocal: 6,  golesVisitante: 9 },
    ],
  },
  {
    numero: 3,
    partidos: [
      { jornada: 3, local: "FILÓSOFOS DE LA REDONDA", visitante: "REAL CARTAGENA APRIETA", golesLocal: 5,  golesVisitante: 5 },
      { jornada: 3, local: "ETHILICO DE BILBAO",      visitante: "ESPESITOS FC",            golesLocal: 6,  golesVisitante: 3 },
      { jornada: 3, local: "TORREZNOS",               visitante: "TORRE BELDES",            golesLocal: 2,  golesVisitante: 4 },
      { jornada: 3, local: "ATALAYA DEL ARCIPRESTE",  visitante: "CLUB BRUJO",              golesLocal: 4,  golesVisitante: 7 },
    ],
  },
  {
    numero: 4,
    partidos: [
      { jornada: 4, local: "TORRE BELDES",            visitante: "ESPESITOS FC",            golesLocal: 1,  golesVisitante: 11 },
      { jornada: 4, local: "ETHILICO DE BILBAO",      visitante: "ATALAYA DEL ARCIPRESTE",  golesLocal: 3,  golesVisitante: 6  },
      { jornada: 4, local: "REAL CARTAGENA APRIETA",  visitante: "CLUB BRUJO",              golesLocal: 10, golesVisitante: 2  },
      { jornada: 4, local: "FILÓSOFOS DE LA REDONDA", visitante: "TORREZNOS",               golesLocal: 2,  golesVisitante: 4  },
    ],
  },
  {
    numero: 5,
    partidos: [
      { jornada: 5, local: "REAL CARTAGENA APRIETA",  visitante: "ETHILICO DE BILBAO",      golesLocal: 11, golesVisitante: 3 },
      { jornada: 5, local: "FILÓSOFOS DE LA REDONDA", visitante: "CLUB BRUJO",              golesLocal: 11, golesVisitante: 5 },
      { jornada: 5, local: "ESPESITOS FC",             visitante: "TORREZNOS",               golesLocal: 8,  golesVisitante: 6 },
      { jornada: 5, local: "ATALAYA DEL ARCIPRESTE",  visitante: "TORRE BELDES",            golesLocal: 5,  golesVisitante: 7 },
    ],
  },
  {
    numero: 6,
    partidos: [
      { jornada: 6, local: "FILÓSOFOS DE LA REDONDA", visitante: "ESPESITOS FC",            golesLocal: 13, golesVisitante: 4 },
      { jornada: 6, local: "CLUB BRUJO",               visitante: "ETHILICO DE BILBAO",      golesLocal: 1,  golesVisitante: 6 },
      { jornada: 6, local: "TORREZNOS",               visitante: "ATALAYA DEL ARCIPRESTE",  golesLocal: 7,  golesVisitante: 5 },
      { jornada: 6, local: "REAL CARTAGENA APRIETA",  visitante: "TORRE BELDES",            golesLocal: 5,  golesVisitante: 4 },
    ],
  },
  {
    numero: 7,
    partidos: [
      { jornada: 7, local: "FILÓSOFOS DE LA REDONDA", visitante: "ETHILICO DE BILBAO",      golesLocal: 7,  golesVisitante: 2  },
      { jornada: 7, local: "ESPESITOS FC",             visitante: "ATALAYA DEL ARCIPRESTE",  golesLocal: 7,  golesVisitante: 10 },
      { jornada: 7, local: "CLUB BRUJO",               visitante: "TORRE BELDES",            golesLocal: 4,  golesVisitante: 9  },
      { jornada: 7, local: "TORREZNOS",               visitante: "REAL CARTAGENA APRIETA",  golesLocal: 2,  golesVisitante: 3  },
    ],
  },
  {
    numero: 8,
    partidos: [
      { jornada: 8, local: "ATALAYA DEL ARCIPRESTE",  visitante: "FILÓSOFOS DE LA REDONDA", golesLocal: 1,  golesVisitante: 10 },
      { jornada: 8, local: "TORRE BELDES",            visitante: "ETHILICO DE BILBAO",      golesLocal: 3,  golesVisitante: 2  },
      { jornada: 8, local: "REAL CARTAGENA APRIETA",  visitante: "ESPESITOS FC",            golesLocal: 6,  golesVisitante: 8  },
      { jornada: 8, local: "TORREZNOS",               visitante: "CLUB BRUJO",              golesLocal: 3,  golesVisitante: 8  },
    ],
  },
  {
    numero: 9,
    partidos: [
      { jornada: 9, local: "TORREZNOS",               visitante: "ETHILICO DE BILBAO",      golesLocal: 5, golesVisitante: 4 },
      { jornada: 9, local: "CLUB BRUJO",               visitante: "ESPESITOS FC",            golesLocal: 4, golesVisitante: 7 },
      { jornada: 9, local: "TORRE BELDES",            visitante: "FILÓSOFOS DE LA REDONDA", golesLocal: 4, golesVisitante: 9 },
      { jornada: 9, local: "REAL CARTAGENA APRIETA",  visitante: "ATALAYA DEL ARCIPRESTE",  golesLocal: 2, golesVisitante: 2 },
    ],
  },
  {
    numero: 10,
    partidos: [
      { jornada: 10, local: "REAL CARTAGENA APRIETA",  visitante: "FILÓSOFOS DE LA REDONDA", golesLocal: 1,  golesVisitante: 9 },
      { jornada: 10, local: "ESPESITOS FC",             visitante: "ETHILICO DE BILBAO",      golesLocal: 4,  golesVisitante: 6 },
      { jornada: 10, local: "TORRE BELDES",            visitante: "TORREZNOS",               golesLocal: 5,  golesVisitante: 2 },
      { jornada: 10, local: "CLUB BRUJO",               visitante: "ATALAYA DEL ARCIPRESTE",  golesLocal: 9,  golesVisitante: 4 },
    ],
  },
  {
    numero: 11,
    partidos: [
      { jornada: 11, local: "ESPESITOS FC",             visitante: "TORRE BELDES",            golesLocal: 6,  golesVisitante: 5  },
      { jornada: 11, local: "ATALAYA DEL ARCIPRESTE",  visitante: "ETHILICO DE BILBAO",      golesLocal: 7,  golesVisitante: 8  },
      { jornada: 11, local: "CLUB BRUJO",               visitante: "REAL CARTAGENA APRIETA",  golesLocal: 10, golesVisitante: 13 },
      { jornada: 11, local: "TORREZNOS",               visitante: "FILÓSOFOS DE LA REDONDA", golesLocal: 3,  golesVisitante: 6  },
    ],
  },
  {
    numero: 12,
    partidos: [
      { jornada: 12, local: "ETHILICO DE BILBAO",      visitante: "REAL CARTAGENA APRIETA",  golesLocal: 4,  golesVisitante: 6  },
      { jornada: 12, local: "CLUB BRUJO",               visitante: "FILÓSOFOS DE LA REDONDA", golesLocal: 8,  golesVisitante: 10 },
      { jornada: 12, local: "TORREZNOS",               visitante: "ESPESITOS FC",            golesLocal: 5,  golesVisitante: 11 },
      { jornada: 12, local: "TORRE BELDES",            visitante: "ATALAYA DEL ARCIPRESTE",  golesLocal: 9,  golesVisitante: 8  },
    ],
  },
  {
    numero: 13,
    partidos: [
      { jornada: 13, local: "ESPESITOS FC",             visitante: "FILÓSOFOS DE LA REDONDA", golesLocal: 4, golesVisitante: 11 },
      { jornada: 13, local: "ETHILICO DE BILBAO",      visitante: "CLUB BRUJO",              golesLocal: 3, golesVisitante: 0  },
      { jornada: 13, local: "ATALAYA DEL ARCIPRESTE",  visitante: "TORREZNOS",               golesLocal: 3, golesVisitante: 0  },
      { jornada: 13, local: "TORRE BELDES",            visitante: "REAL CARTAGENA APRIETA",  golesLocal: 5, golesVisitante: 8  },
    ],
  },
  {
    numero: 14,
    partidos: [
      { jornada: 14, local: "ETHILICO DE BILBAO",      visitante: "FILÓSOFOS DE LA REDONDA", golesLocal: 0, golesVisitante: 0 },
      { jornada: 14, local: "ATALAYA DEL ARCIPRESTE",  visitante: "ESPESITOS FC",            golesLocal: 7, golesVisitante: 7 },
      { jornada: 14, local: "TORRE BELDES",            visitante: "CLUB BRUJO",              golesLocal: 3, golesVisitante: 0 },
      { jornada: 14, local: "REAL CARTAGENA APRIETA",  visitante: "TORREZNOS",               golesLocal: 3, golesVisitante: 0 },
    ],
  },
];

export const goleadoresSplit1: JugadorSplit1[] = [
  { nombre: "BEL",           equipo: "ESPESITOS FC",            goles: 35, asistencias: 16, rojas: 0, amarillas: 1 },
  { nombre: "RODRI URRU",    equipo: "FILÓSOFOS DE LA REDONDA", goles: 26, asistencias: 8,  rojas: 0, amarillas: 0 },
  { nombre: "NACHO",         equipo: "FILÓSOFOS DE LA REDONDA", goles: 25, asistencias: 21, rojas: 0, amarillas: 1 },
  { nombre: "BORJA",         equipo: "ESPESITOS FC",            goles: 23, asistencias: 9,  rojas: 0, amarillas: 1 },
  { nombre: "NICOPLASMAN",   equipo: "FILÓSOFOS DE LA REDONDA", goles: 22, asistencias: 9,  rojas: 0, amarillas: 1 },
  { nombre: "NICO PUEYO",    equipo: "ETHILICO DE BILBAO",      goles: 19, asistencias: 1,  rojas: 0, amarillas: 0 },
  { nombre: "MIGUEL MORÁN",  equipo: "FILÓSOFOS DE LA REDONDA", goles: 17, asistencias: 17, rojas: 0, amarillas: 0 },
  { nombre: "JUAN",          equipo: "REAL CARTAGENA APRIETA",  goles: 16, asistencias: 12, rojas: 1, amarillas: 2 },
  { nombre: "PETIT",         equipo: "ATALAYA DEL ARCIPRESTE",  goles: 14, asistencias: 2,  rojas: 0, amarillas: 0 },
  { nombre: "JULI",          equipo: "REAL CARTAGENA APRIETA",  goles: 14, asistencias: 2,  rojas: 0, amarillas: 0 },
  { nombre: "HÉCTOR",        equipo: "ATALAYA DEL ARCIPRESTE",  goles: 12, asistencias: 8,  rojas: 0, amarillas: 1 },
  { nombre: "URRU",          equipo: "TORREZNOS",               goles: 12, asistencias: 3,  rojas: 0, amarillas: 1 },
  { nombre: "ROME",          equipo: "FILÓSOFOS DE LA REDONDA", goles: 11, asistencias: 14, rojas: 0, amarillas: 0 },
  { nombre: "DANI WEST",     equipo: "REAL CARTAGENA APRIETA",  goles: 11, asistencias: 8,  rojas: 1, amarillas: 0 },
  { nombre: "MATU",          equipo: "ATALAYA DEL ARCIPRESTE",  goles: 11, asistencias: 4,  rojas: 0, amarillas: 0 },
  { nombre: "NICO MARÍN",    equipo: "TORRE BELDES",            goles: 10, asistencias: 10, rojas: 0, amarillas: 0 },
  { nombre: "COCO",          equipo: "TORRE BELDES",            goles: 10, asistencias: 9,  rojas: 0, amarillas: 1 },
  { nombre: "GON",           equipo: "CLUB BRUJO",              goles: 10, asistencias: 4,  rojas: 0, amarillas: 1 },
  { nombre: "KIKE",          equipo: "ESPESITOS FC",            goles: 9,  asistencias: 9,  rojas: 0, amarillas: 1 },
  { nombre: "NACHITO",       equipo: "ATALAYA DEL ARCIPRESTE",  goles: 9,  asistencias: 7,  rojas: 0, amarillas: 0 },
  { nombre: "TRIPERO",       equipo: "TORRE BELDES",            goles: 9,  asistencias: 6,  rojas: 0, amarillas: 0 },
  { nombre: "DEMA",          equipo: "REAL CARTAGENA APRIETA",  goles: 9,  asistencias: 6,  rojas: 0, amarillas: 0 },
  { nombre: "GON AYLLÓN",    equipo: "ATALAYA DEL ARCIPRESTE",  goles: 9,  asistencias: 5,  rojas: 0, amarillas: 0 },
  { nombre: "POW",           equipo: "REAL CARTAGENA APRIETA",  goles: 9,  asistencias: 4,  rojas: 0, amarillas: 0 },
  { nombre: "ÁLVARO",        equipo: "REAL CARTAGENA APRIETA",  goles: 9,  asistencias: 2,  rojas: 0, amarillas: 1 },
  { nombre: "LOUIS",         equipo: "TORRE BELDES",            goles: 8,  asistencias: 6,  rojas: 0, amarillas: 0 },
  { nombre: "DAN",           equipo: "TORREZNOS",               goles: 8,  asistencias: 5,  rojas: 0, amarillas: 0 },
  { nombre: "FER",           equipo: "ESPESITOS FC",            goles: 8,  asistencias: 5,  rojas: 0, amarillas: 0 },
  { nombre: "JUAN SH",       equipo: "TORREZNOS",               goles: 8,  asistencias: 3,  rojas: 0, amarillas: 1 },
  { nombre: "JAIME",         equipo: "CLUB BRUJO",              goles: 8,  asistencias: 1,  rojas: 0, amarillas: 0 },
  { nombre: "LUCHO",         equipo: "TORRE BELDES",            goles: 8,  asistencias: 1,  rojas: 0, amarillas: 0 },
  { nombre: "RAFA",          equipo: "ESPESITOS FC",            goles: 7,  asistencias: 12, rojas: 0, amarillas: 0 },
  { nombre: "LILO",          equipo: "ETHILICO DE BILBAO",      goles: 7,  asistencias: 6,  rojas: 1, amarillas: 2 },
  { nombre: "CÉSAR",         equipo: "ETHILICO DE BILBAO",      goles: 6,  asistencias: 9,  rojas: 0, amarillas: 3 },
  { nombre: "TITO",          equipo: "TORREZNOS",               goles: 6,  asistencias: 3,  rojas: 0, amarillas: 0 },
  { nombre: "DELAS",         equipo: "CLUB BRUJO",              goles: 6,  asistencias: 2,  rojas: 0, amarillas: 0 },
  { nombre: "ALEX DÍAZ",     equipo: "CLUB BRUJO",              goles: 6,  asistencias: 1,  rojas: 0, amarillas: 0 },
  { nombre: "GONZÁLEZ",      equipo: "FILÓSOFOS DE LA REDONDA", goles: 5,  asistencias: 3,  rojas: 0, amarillas: 0 },
  { nombre: "NACHO RAM",     equipo: "CLUB BRUJO",              goles: 5,  asistencias: 3,  rojas: 0, amarillas: 1 },
  { nombre: "MARIO",         equipo: "REAL CARTAGENA APRIETA",  goles: 4,  asistencias: 11, rojas: 0, amarillas: 0 },
  { nombre: "PABLO HURTADO", equipo: "ETHILICO DE BILBAO",      goles: 4,  asistencias: 8,  rojas: 0, amarillas: 0 },
  { nombre: "GUILLE",        equipo: "REAL CARTAGENA APRIETA",  goles: 4,  asistencias: 7,  rojas: 0, amarillas: 0 },
  { nombre: "FITER",         equipo: "CLUB BRUJO",              goles: 4,  asistencias: 6,  rojas: 0, amarillas: 0 },
  { nombre: "MARCO",         equipo: "ESPESITOS FC",            goles: 4,  asistencias: 4,  rojas: 0, amarillas: 0 },
  { nombre: "LUCAS",         equipo: "TORRE BELDES",            goles: 4,  asistencias: 1,  rojas: 0, amarillas: 1 },
  { nombre: "PUKU",          equipo: "ETHILICO DE BILBAO",      goles: 3,  asistencias: 1,  rojas: 0, amarillas: 0 },
  { nombre: "ALO",           equipo: "TORREZNOS",               goles: 2,  asistencias: 7,  rojas: 0, amarillas: 1 },
  { nombre: "JORDI",         equipo: "TORREZNOS",               goles: 2,  asistencias: 0,  rojas: 0, amarillas: 0 },
  { nombre: "SOTTO",         equipo: "TORRE BELDES",            goles: 2,  asistencias: 0,  rojas: 0, amarillas: 0 },
  { nombre: "NALDA",         equipo: "ATALAYA DEL ARCIPRESTE",  goles: 2,  asistencias: 0,  rojas: 0, amarillas: 0 },
  { nombre: "JAVI HERRERA",  equipo: "ETHILICO DE BILBAO",      goles: 1,  asistencias: 5,  rojas: 0, amarillas: 0 },
  { nombre: "JAIME VALENCIANO", equipo: "ESPESITOS FC",         goles: 1,  asistencias: 1,  rojas: 0, amarillas: 0 },
  { nombre: "MINGUI",        equipo: "ETHILICO DE BILBAO",      goles: 1,  asistencias: 0,  rojas: 0, amarillas: 0 },
];

// Totales de la temporada
export const statsSplit1 = {
  totalPartidos: 56,
  totalGoles: 594,
  mediaGolesPartido: 10.6,
  campeón: "FILÓSOFOS DE LA REDONDA",
  temporada: "Sep 2024 – Feb 2025",
};
