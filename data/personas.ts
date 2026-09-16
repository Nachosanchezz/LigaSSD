import { equipos as equiposSplit2, type Jugador } from "./split2/equipos";

/**
 * Una ficha por persona, para todos los splits. Quien jugó el Split 2 toma
 * sus datos de la plantilla de entonces; los que llegan nuevos van en `nuevos`.
 */
export type Persona = Jugador & {
  /** Id de su ficha en el Split 2, si jugó */
  split2?: string;
};

// "old-school-cifu" → "cifu": el id del Split 2 sin el prefijo del equipo
const veteranos: Persona[] = equiposSplit2.flatMap((equipo) =>
  equipo.integrantes.map((jugador) => ({
    ...jugador,
    id: jugador.id.slice(equipo.slug.length + 1),
    split2: jugador.id,
  }))
);

// Jugadores nuevos en el Split 3 (ids en minúsculas y con guiones)
const nuevos: Persona[] = [
  {
    id: "carlos-hernando",
    nombre: "Carlos",
    primerApellido: "Hernando",
    apodo: "Carlos",
    posicion: "Cierre",
    piernaBuena: "Izquierda",
  },
  { id: "adrian-sainz", nombre: "Adrián", primerApellido: "Sainz", apodo: "Sainz" },
  { id: "goyo", nombre: "Gregorio", primerApellido: "Amador", apodo: "Goyo" },
  { id: "dante", nombre: "Dante", apodo: "Dante" },
  { id: "manu", nombre: "Manuel", apodo: "Manu" },
  { id: "samu", nombre: "Samuel", primerApellido: "Garrido", apodo: "Samu" },
  { id: "juli", nombre: "Julián", apodo: "Juli" },
  { id: "dani-lozano", nombre: "Daniel", primerApellido: "Lozano", apodo: "Dani", alias: ["Dani Lozano"] },
  // Otro Guillermo, distinto del "Guille" que jugó el Split 1 y el Split 2
  { id: "guillermo-portero", nombre: "Guillermo", apodo: "Guille", posicion: "Portero" },
];

// Jugaron splits anteriores y ya no están en la liga: tienen ficha para que su
// historial no se pierda ni en el palmarés ni en su página.
const historicos: Persona[] = [
  { id: "beltran-amich", nombre: "Beltrán", primerApellido: "Amich", apodo: "Bel" },
  { id: "hector-de-felipe", nombre: "Héctor", primerApellido: "de Felipe", apodo: "Héctor" },
  { id: "dani-west", nombre: "Dani", primerApellido: "West", apodo: "Dani West" },
  { id: "matias-pazos", nombre: "Matías", primerApellido: "Pazos", apodo: "Matu" },
  { id: "lucas-tripero", nombre: "Lucas", primerApellido: "Tripero", apodo: "Tripero" },
  { id: "miguel-de-maria", nombre: "Miguel", primerApellido: "de María", apodo: "Dema" },
  { id: "daniel-campbell", nombre: "Daniel", primerApellido: "Campbell", apodo: "Dan" },
  { id: "cesar-pardo", nombre: "César", primerApellido: "Pardo", apodo: "César" },
  { id: "alejandro-de-las-heras", nombre: "Alejandro", primerApellido: "de las Heras", apodo: "Delas" },
  { id: "alejandro-diaz", nombre: "Alejandro", primerApellido: "Díaz", apodo: "Alex Díaz" },
  { id: "pablo-gonzalez", nombre: "Pablo", primerApellido: "González", apodo: "González" },
  { id: "lucas-linaje", nombre: "Lucas", primerApellido: "Linaje", apodo: "Lucas" },
  { id: "david-moreno", nombre: "David", primerApellido: "Moreno", apodo: "Puku" },
  { id: "alvaro-ramirez", nombre: "Álvaro", primerApellido: "Ramírez", apodo: "Alo" },
  { id: "luis-minguillon", nombre: "Luis", primerApellido: "Minguillón", apodo: "Mingui" },
  { id: "jaime-valenciano", nombre: "Jaime", primerApellido: "Valenciano" },
  { id: "rui-moscat", nombre: "Rui", primerApellido: "Moscat", apodo: "Rui", posicion: "Portero" },
  // Jugó en el Real Cartagena del Split 1; falta su apellido
  { id: "alvaro-cartagena", nombre: "Álvaro", apodo: "Álvaro" },
];

export const personas: Persona[] = [...veteranos, ...nuevos, ...historicos];

const porId = new Map(personas.map((persona) => [persona.id, persona]));

export function getPersona(id: string): Persona | undefined {
  return porId.get(id);
}

export function personaDelSplit2(idSplit2: string): Persona | undefined {
  return personas.find((persona) => persona.split2 === idSplit2);
}
