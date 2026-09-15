import { equipos, type Jugador } from "@/data/split2/equipos";
import { nombreCompletoJugador } from "./helpers";

export function normalizarTexto(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .toLowerCase();
}

/**
 * Marcadores que aparecen en las actas pero no son jugadores: asistencias
 * vacías, goles cedidos y goles en propia puerta ("PP", "Sotto (PP)").
 */
export function esValorIgnorable(texto?: string) {
  if (!texto) return true;
  const valor = normalizarTexto(texto);
  if (valor === "sin asistencia" || valor === "gol cedido" || valor === "cedido") {
    return true;
  }
  return valor === "pp" || valor.endsWith("(pp)");
}

/** Todas las formas en que un jugador puede aparecer escrito en un acta. */
export function clavesDeJugador(jugador: Jugador): string[] {
  return [nombreCompletoJugador(jugador), jugador.apodo, ...(jugador.alias ?? [])]
    .filter((valor): valor is string => Boolean(valor && valor.trim()))
    .map(normalizarTexto);
}

export type InfoJugador = {
  id: string;
  jugadorMostrado: string;
  equipo: string;
  /** Escudo del equipo; si no tiene, su color para el provisional */
  logo?: string;
  color?: string;
};

/** Índice de acta → jugador, construido sobre nombre completo, apodo y alias. */
export function crearMapaJugadores(): Record<string, InfoJugador> {
  const mapa: Record<string, InfoJugador> = {};

  for (const equipo of equipos) {
    for (const jugador of equipo.integrantes) {
      const info: InfoJugador = {
        id: jugador.id,
        jugadorMostrado: nombreCompletoJugador(jugador),
        equipo: equipo.nombre,
        logo: equipo.logo,
      };
      for (const clave of clavesDeJugador(jugador)) {
        mapa[clave] = info;
      }
    }
  }

  return mapa;
}
