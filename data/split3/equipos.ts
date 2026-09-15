/**
 * Equipos del Split 3: cinco salen de la subasta del 15 de septiembre de 2026
 * y el sexto llega ya formado. Se llaman como su presidente hasta que elijan
 * nombre y escudo. El `id` no cambia al renombrarlos, así que los partidos y
 * resultados guardados siguen valiendo.
 */

export type FichajeSplit3 = {
  /** Id de la persona en data/personas.ts */
  persona: string;
  /** M€ pagados en la subasta. El presidente no pasa por ella */
  precio?: number;
  presidente?: boolean;
};

export type EquipoSplit3 = {
  id: string;
  nombre: string;
  slug: string;
  logo?: string;
  /** Color del escudo provisional mientras no tenga logo */
  color: string;
  /** M€ con los que empezó la subasta. Sin él, el equipo no pasó por la subasta */
  presupuesto?: number;
  plantilla: FichajeSplit3[];
};

export const equiposSplit3: EquipoSplit3[] = [
  {
    id: "borja",
    nombre: "LOS TERCIOS",
    slug: "los-tercios",
    logo: "/equipos/lostercios.jpeg",
    color: "#0b4a6f",
    presupuesto: 200,
    plantilla: [
      { persona: "borja-sanchez-harguindey", presidente: true },
      { persona: "rodrigo-urrutia", precio: 53 },
      { persona: "nicolas-sanchez", precio: 48 },
      { persona: "jaime-de-sala", precio: 33 },
      { persona: "adrian-antropow", precio: 22 },
      { persona: "goyo", precio: 20 },
      { persona: "unai-retes", precio: 19 },
      { persona: "jordi-sanchez", precio: 1 },
    ],
  },
  {
    id: "carlos",
    nombre: "CARLOS",
    slug: "carlos",
    color: "#b91c1c",
    presupuesto: 200,
    plantilla: [
      { persona: "carlos-hernando", presidente: true },
      { persona: "nacho-ramirez", precio: 48 },
      { persona: "rafael-llopis", precio: 42 },
      { persona: "dante", precio: 34 },
      { persona: "fernando-diez", precio: 30 },
      { persona: "pablo-hurtado", precio: 19 },
      { persona: "jaime-diez", precio: 15 },
      { persona: "miguel-fiter", precio: 12 },
    ],
  },
  {
    id: "juan",
    nombre: "BODØ DREAM",
    slug: "bodo-dream",
    logo: "/equipos/bodo-dream.png",
    color: "#15803d",
    presupuesto: 200,
    plantilla: [
      { persona: "juan-sanchez", presidente: true },
      { persona: "mario-fuentes", precio: 79 },
      { persona: "alberto-fernandez", precio: 29 },
      { persona: "alvaro-aguilar", precio: 29 },
      { persona: "jorge-sanchez-portero", precio: 19 },
      { persona: "amigo-cifu", precio: 17 },
      { persona: "petit", precio: 14 },
      { persona: "manu", precio: 9 },
    ],
  },
  {
    id: "lui",
    nombre: "TORRE BELDES",
    slug: "torre-beldes",
    logo: "/equipos/torre-beldes.png",
    color: "#7c3aed",
    presupuesto: 230,
    plantilla: [
      { persona: "louis-de-maria", presidente: true },
      { persona: "jorge-vazquez", precio: 74 },
      { persona: "cifu", precio: 49 },
      { persona: "nacho-lopez", precio: 36 },
      { persona: "gabriel-furnieles", precio: 36 },
      { persona: "dani-lozano", precio: 19 },
      { persona: "guillermo-portero", precio: 10 },
      { persona: "marco-hurtado", precio: 6 },
    ],
  },
  {
    id: "nacho",
    nombre: "FILÓSOFOS",
    slug: "filosofos",
    logo: "/equipos/filosofos.png",
    color: "#c2410c",
    presupuesto: 200,
    plantilla: [
      { persona: "nacho-sanchez", presidente: true },
      { persona: "samu", precio: 74 },
      { persona: "alejandro-romero", precio: 55 },
      { persona: "juli", precio: 29 },
      { persona: "pedro-baneres", precio: 21 },
      { persona: "borja-urrutia", precio: 13 },
      { persona: "guillermo-garcia", precio: 7 },
      { persona: "pablo-rodriguez", precio: 1 },
    ],
  },
  // Llega formado, sin pasar por la subasta
  {
    id: "melendi",
    nombre: "MELENDI",
    slug: "melendi",
    color: "#0f766e",
    plantilla: [
      { persona: "jaime-melendi", presidente: true },
      { persona: "salvador-heras" },
      { persona: "carlos-caco" },
      { persona: "jaime-campanillas" },
      { persona: "nicolas-pueyo" },
      { persona: "carlos-charly" },
      { persona: "roberto-rober" },
      { persona: "pablo-sarabia" },
    ],
  },
];
