import type { Jornada, Partido } from "../tipos";
import { equiposSplit3, type EquipoSplit3 } from "./equipos";

/**
 * Liguilla del Split 3: ida y vuelta entre los 6 equipos, 10 jornadas de
 * 3 partidos (con 6 equipos nadie descansa). Los cruces salen del método del
 * círculo y la vuelta repite la ida cambiando quién juega en casa.
 * Los ids ("s3-j1-borja-lui") usan el id del equipo, que no cambia al renombrarlo.
 */

// Fecha, hora y campo de cada partido cuando se programe, por id de partido
const PROGRAMACION: Record<string, Pick<Partido, "dia" | "hora" | "campo" | "iso">> = {};

// Cruces de la ronda `r` de la ida: un equipo fijo y el resto girando
function cruces(equipos: EquipoSplit3[], r: number): [EquipoSplit3, EquipoSplit3][] {
  const [fijo, ...resto] = equipos;
  const giro = resto.map((_, i) => resto[(i + r) % resto.length]);
  const pares: [EquipoSplit3, EquipoSplit3][] = [[fijo, giro[0]]];
  for (let i = 1; i < giro.length - i; i++) {
    pares.push([giro[i], giro[giro.length - i]]);
  }
  // Alternar quién juega en casa de una ronda a otra
  return pares.map(([a, b]) => (r % 2 === 0 ? [a, b] : [b, a]));
}

function partido(jornada: number, local: EquipoSplit3, visitante: EquipoSplit3): Partido {
  const id = `s3-j${jornada}-${local.id}-${visitante.id}`;
  const programacion = PROGRAMACION[id];
  return {
    id,
    local: local.nombre,
    visitante: visitante.nombre,
    ...programacion,
    estado: programacion?.dia ? "Programado" : "Pendiente de programar",
  };
}

const JORNADAS_IDA = equiposSplit3.length - 1;

export const jornadasSplit3: Jornada[] = Array.from({ length: JORNADAS_IDA * 2 }, (_, i) => {
  const numero = i + 1;
  const vuelta = i >= JORNADAS_IDA;
  return {
    numero,
    partidos: cruces(equiposSplit3, i % JORNADAS_IDA).map(([a, b]) =>
      vuelta ? partido(numero, b, a) : partido(numero, a, b)
    ),
  };
});
