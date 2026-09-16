import { equipos, type Jugador } from "@/data/split2/equipos";
import { equiposSplit3 } from "@/data/split3/equipos";
import { getPersona } from "@/data/personas";
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

/**
 * Apodos de la plantilla de un equipo, sea del split que sea. Los usa el admin
 * para sugerirlos al escribir el acta y avisar de los nombres que no cuadran.
 */
export function apodosDeEquipo(nombre: string): string[] {
  const split3 = equiposSplit3.find((equipo) => equipo.nombre === nombre);
  if (split3) {
    return split3.plantilla.flatMap((fichaje) => {
      const persona = getPersona(fichaje.persona);
      return persona ? [persona.apodo ?? nombreCompletoJugador(persona)] : [];
    });
  }
  const split2 = equipos.find((equipo) => equipo.nombre === nombre);
  return split2?.integrantes.map((jugador) => jugador.apodo ?? nombreCompletoJugador(jugador)) ?? [];
}
