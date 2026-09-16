import type { Jornada, Partido } from "../tipos";
import { equiposSplit3 } from "./equipos";

/**
 * Calendario del Split 3, tal y como se cerró: 10 jornadas de 3 partidos, ida
 * y vuelta entre los seis equipos, de septiembre a noviembre de 2026.
 *
 * Cada fila es [jornada, fecha y hora, campo, local, visitante, árbitro], con
 * los ids de equipo, que no cambian aunque el equipo se renombre. El día de la
 * semana se calcula solo a partir de la fecha, para no escribirlo dos veces.
 */
type FilaCalendario = [number, string, string, string, string, string];

const CALENDARIO: FilaCalendario[] = [
  [1, "2026-09-22T20:00", "1", "borja", "carlos", "juan"],
  [1, "2026-09-22T21:00", "1", "juan", "melendi", "borja"],
  [1, "2026-09-23T20:00", "1", "lui", "nacho", "carlos"],

  [2, "2026-09-29T20:00", "1", "carlos", "lui", "borja"],
  [2, "2026-09-29T21:00", "1", "juan", "borja", "lui"],
  [2, "2026-09-30T20:00", "1", "melendi", "nacho", "carlos"],

  [3, "2026-10-06T20:00", "1", "borja", "lui", "nacho"],
  [3, "2026-10-06T21:00", "1", "nacho", "juan", "lui"],
  [3, "2026-10-07T20:00", "1", "melendi", "carlos", "juan"],

  [4, "2026-10-15T20:00", "1", "nacho", "borja", "melendi"],
  [4, "2026-10-15T21:00", "1", "lui", "melendi", "nacho"],
  [4, "2026-10-15T21:00", "2", "juan", "carlos", "borja"],

  [5, "2026-10-19T20:00", "1", "borja", "melendi", "carlos"],
  [5, "2026-10-19T21:00", "1", "carlos", "nacho", "melendi"],
  [5, "2026-10-22T21:00", "1", "juan", "lui", "nacho"],

  [6, "2026-10-27T20:00", "1", "carlos", "borja", "juan"],
  [6, "2026-10-27T21:00", "1", "melendi", "juan", "borja"],
  [6, "2026-10-28T20:00", "1", "nacho", "lui", "melendi"],

  [7, "2026-11-02T20:00", "1", "lui", "carlos", "juan"],
  [7, "2026-11-02T21:00", "1", "borja", "juan", "lui"],
  [7, "2026-11-05T20:00", "1", "nacho", "melendi", "carlos"],

  [8, "2026-11-10T20:00", "1", "lui", "borja", "nacho"],
  [8, "2026-11-10T21:00", "1", "juan", "nacho", "lui"],
  [8, "2026-11-11T20:00", "1", "carlos", "melendi", "borja"],

  [9, "2026-11-17T20:00", "1", "borja", "nacho", "melendi"],
  [9, "2026-11-17T21:00", "1", "melendi", "lui", "nacho"],
  [9, "2026-11-18T21:00", "1", "carlos", "juan", "lui"],

  [10, "2026-11-23T20:00", "1", "melendi", "borja", "carlos"],
  [10, "2026-11-23T21:00", "1", "nacho", "carlos", "melendi"],
  [10, "2026-11-26T21:00", "1", "lui", "juan", "borja"],
];

const formatoDia = new Intl.DateTimeFormat("es-ES", { weekday: "long", day: "numeric", month: "long" });

function nombreEquipo(id: string): string {
  const equipo = equiposSplit3.find((candidato) => candidato.id === id);
  if (!equipo) throw new Error(`El calendario del Split 3 nombra un equipo que no existe: ${id}`);
  return equipo.nombre;
}

// "2026-09-22T20:00" → "Martes 22 de septiembre"
function diaDeLaSemana(iso: string): string {
  const texto = formatoDia.format(new Date(iso)).replace(",", "");
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function partido([jornada, iso, campo, local, visitante, arbitra]: FilaCalendario): Partido {
  return {
    id: `s3-j${jornada}-${local}-${visitante}`,
    local: nombreEquipo(local),
    visitante: nombreEquipo(visitante),
    dia: diaDeLaSemana(iso),
    hora: iso.slice(11),
    iso,
    campo,
    arbitra: nombreEquipo(arbitra),
    estado: "Programado",
  };
}

export const jornadasSplit3: Jornada[] = [...new Set(CALENDARIO.map(([jornada]) => jornada))].map((numero) => ({
  numero,
  partidos: CALENDARIO.filter(([jornada]) => jornada === numero).map(partido),
}));
