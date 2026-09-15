/**
 * Economía del Split 3. Todo en euros reales: los M€ de la subasta son
 * millones ficticios y no tienen nada que ver con esto.
 */

export const CUOTA_POR_JUGADOR = 20;
export const JUGADORES_POR_EQUIPO = 8;
export const EQUIPOS = 6;

export const jugadoresQuePagan = EQUIPOS * JUGADORES_POR_EQUIPO;
export const cuotaPorEquipo = CUOTA_POR_JUGADOR * JUGADORES_POR_EQUIPO;
export const bote = CUOTA_POR_JUGADOR * jugadoresQuePagan;

export type Premio = { nombre: string; porcentaje: number };

/** El bote se reparte entero: los porcentajes suman 100 */
export const premios: Premio[] = [
  { nombre: "Campeón del Split", porcentaje: 60 },
  { nombre: "Primer puesto de la liga regular", porcentaje: 15 },
  { nombre: "Subcampeón del Split", porcentaje: 15 },
  { nombre: "MVP del Split", porcentaje: 5 },
  { nombre: "Bota de Oro del Split", porcentaje: 5 },
];

export function importePremio(premio: Premio): number {
  return (bote * premio.porcentaje) / 100;
}

/** Las multas van aparte del bote */
export const multas = [
  { motivo: "No presentarse a jugar", importe: 24 },
  { motivo: "No presentarse a arbitrar", importe: 24 },
];
