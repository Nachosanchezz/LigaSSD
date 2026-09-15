import type { Jugador } from "@/data/split2/equipos";
import type { ResumenPartido } from "@/data/tipos";
import {
  clavesDeJugador,
  crearMapaJugadores,
  esValorIgnorable,
  normalizarTexto,
  type InfoJugador,
} from "@/lib/jugadores";

export type FilaEstadistica = {
  id: string;
  jugador: string;
  equipo: string;
  logo?: string;
  color?: string;
  valor: number;
};

type PartidoConActa = {
  id: string;
  estado: string;
  resumen?: ResumenPartido;
  mvp?: string;
};

function nombresDelActa(partido: PartidoConActa, campo: "jugador" | "asistente"): (string | undefined)[] {
  return [...(partido.resumen?.local ?? []), ...(partido.resumen?.visitante ?? [])].map((gol) => gol[campo]);
}

/**
 * Ranking de goles, asistencias o MVPs de los partidos finalizados. Los nombres
 * del acta se casan con las fichas del split (por defecto, las del Split 2).
 */
export function contarEstadistica(
  partidos: PartidoConActa[],
  campo: "jugador" | "asistente" | "mvp",
  mapaJugadores: Record<string, InfoJugador> = crearMapaJugadores()
): FilaEstadistica[] {
  const tabla: Record<string, FilaEstadistica> = {};

  const sumar = (texto?: string) => {
    if (esValorIgnorable(texto)) return;
    const info = mapaJugadores[normalizarTexto(texto!)];
    if (!info) return;
    tabla[info.id] ??= {
      id: info.id,
      jugador: info.jugadorMostrado,
      equipo: info.equipo,
      logo: info.logo,
      color: info.color,
      valor: 0,
    };
    tabla[info.id].valor += 1;
  };

  for (const partido of partidos) {
    if (partido.estado !== "Finalizado") continue;
    if (campo === "mvp") sumar(partido.mvp);
    else nombresDelActa(partido, campo).forEach(sumar);
  }

  return Object.values(tabla).sort((a, b) => b.valor - a.valor || a.jugador.localeCompare(b.jugador));
}

export type StatsJugador = { goles: number; asistencias: number; mvps: number; partidos: number };

/**
 * Goles, asistencias y MVPs de un jugador en unos partidos. Las actas no dicen
 * quién jugó, así que "partidos" cuenta aquellos en los que marcó o asistió.
 */
export function statsDeJugador(jugador: Jugador, partidos: PartidoConActa[]): StatsJugador {
  const claves = new Set(clavesDeJugador(jugador));
  const esSuyo = (texto?: string) => !esValorIgnorable(texto) && claves.has(normalizarTexto(texto!));

  const stats: StatsJugador = { goles: 0, asistencias: 0, mvps: 0, partidos: 0 };
  for (const partido of partidos) {
    if (partido.estado !== "Finalizado") continue;
    const goles = nombresDelActa(partido, "jugador").filter(esSuyo).length;
    const asistencias = nombresDelActa(partido, "asistente").filter(esSuyo).length;
    stats.goles += goles;
    stats.asistencias += asistencias;
    if (esSuyo(partido.mvp)) stats.mvps += 1;
    if (goles + asistencias > 0) stats.partidos += 1;
  }
  return stats;
}
