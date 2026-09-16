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
  // Fichados en la subasta del Split 3. Falta su nombre completo: por ahora
  // llevan el apodo con el que salieron en el draft.
  { id: "goyo", nombre: "Goyo" },
  { id: "dante", nombre: "Dante" },
  { id: "petit", nombre: "Petit" },
  { id: "manu", nombre: "Manu" },
  { id: "samu", nombre: "Samu" },
  { id: "juli", nombre: "Juli" },
  { id: "dani-lozano", nombre: "Dani", primerApellido: "Lozano", apodo: "Dani Lozano", alias: ["Dani"] },
  { id: "guillermo-portero", nombre: "Guillermo", posicion: "Portero" },
];

export const personas: Persona[] = [...veteranos, ...nuevos];

const porId = new Map(personas.map((persona) => [persona.id, persona]));

export function getPersona(id: string): Persona | undefined {
  return porId.get(id);
}

export function personaDelSplit2(idSplit2: string): Persona | undefined {
  return personas.find((persona) => persona.split2 === idSplit2);
}
