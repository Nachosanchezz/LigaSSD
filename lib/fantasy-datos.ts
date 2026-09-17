// ⚠️ Solo para uso en el servidor — nunca en el cliente
import { cache } from "react";
import { REGLAS } from "@/data/fantasy";
import { getPersona } from "@/data/personas";
import type { Partido } from "@/data/tipos";
import {
  cierreDeJornada,
  mercado,
  puntosDePartidos,
  puntosDelCinco,
  type Asistencias,
  type PuntosJugador,
} from "./fantasy";
import { cookieDeSesion, firmaValida } from "./fantasy-sesion";
import { nombreCompletoJugador } from "./helpers";
import { crearMapaSplit3, equipoDePersona, getSplit3 } from "./split3";
import { createClient } from "./supabase";
import { createAdminClient } from "./supabase-server";

export function hayBaseDeDatos(): boolean {
  return Boolean(process.env.SUPABASE_URL);
}

// -------------------------------------------------------------- asistencia

/** Quién jugó cada partido, según lo apuntado en el admin */
export const fetchAsistencias = cache(async (): Promise<Asistencias> => {
  if (!hayBaseDeDatos()) return {};

  const { data, error } = await createClient().from("alineaciones").select("*");
  if (error) {
    console.error("Supabase error (alineaciones):", error);
    return {};
  }

  const asistencias: Asistencias = {};
  for (const fila of data ?? []) {
    asistencias[fila.partido_id] ??= { local: [], visitante: [] };
    asistencias[fila.partido_id][fila.equipo_tipo as "local" | "visitante"].push(fila.jugador);
  }
  return asistencias;
});

// ---------------------------------------------------------------- jornadas

export type JornadaFantasy = {
  numero: number;
  partidos: Partido[];
  /** Cuándo cierra el mercado: al empezar el primer partido de la jornada */
  cierre: Date | null;
  abierta: boolean;
  jugada: boolean;
  /** Partidos ya jugados de los que nadie apuntó quién jugó */
  sinAsistencia: string[];
  puntos: Record<string, PuntosJugador>;
};

export const getJornadasFantasy = cache(async (): Promise<JornadaFantasy[]> => {
  const [split, asistencias] = await Promise.all([getSplit3(), fetchAsistencias()]);
  const mapa = crearMapaSplit3();
  const ahora = Date.now();

  return split.jornadas.slice(0, REGLAS.jornadas).map((jornada): JornadaFantasy => {
    const { jugadores, sinAsistencia } = puntosDePartidos(jornada.partidos, asistencias, mapa);
    const cierre = cierreDeJornada(jornada.partidos);
    return {
      numero: jornada.numero,
      partidos: jornada.partidos,
      cierre,
      abierta: !cierre || cierre.getTime() > ahora,
      jugada: jornada.partidos.some((partido) => partido.estado === "Finalizado"),
      sinAsistencia,
      puntos: jugadores,
    };
  });
});

/** La jornada que toca: la primera que sigue abierta o, si ya no queda, la última */
export async function getJornadaActual(): Promise<JornadaFantasy> {
  const jornadas = await getJornadasFantasy();
  return jornadas.find((jornada) => jornada.abierta) ?? jornadas[jornadas.length - 1];
}

// ------------------------------------------------------------ participantes

export type Participante = {
  personaId: string;
  nombre: string;
  apodo: string;
  /** Su equipo de verdad en el Split 3 */
  equipo?: string;
  logo?: string;
  color?: string;
};

function comoParticipante(personaId: string): Participante | null {
  const persona = getPersona(personaId);
  if (!persona) return null;
  const equipo = equipoDePersona(personaId);
  return {
    personaId,
    nombre: nombreCompletoJugador(persona),
    apodo: persona.apodo ?? persona.nombre,
    equipo: equipo?.nombre,
    logo: equipo?.logo,
    color: equipo?.color,
  };
}

export const getParticipantes = cache(async (): Promise<Participante[]> => {
  if (!hayBaseDeDatos()) return [];

  const { data, error } = await createAdminClient().from("fantasy_usuarios").select("persona_id");
  if (error) {
    console.error("Supabase error (fantasy_usuarios):", error);
    return [];
  }

  return (data ?? [])
    .map((fila) => comoParticipante(fila.persona_id))
    .filter((participante): participante is Participante => participante !== null)
    .sort((a, b) => a.apodo.localeCompare(b.apodo));
});

export async function getHashDePin(personaId: string): Promise<string | null> {
  if (!hayBaseDeDatos()) return null;
  const { data } = await createAdminClient()
    .from("fantasy_usuarios")
    .select("pin_hash")
    .eq("persona_id", personaId)
    .maybeSingle();
  return data?.pin_hash ?? null;
}

/** Quién ha entrado, comprobando que la firma de su cookie sigue valiendo */
export const getSesion = cache(async (): Promise<Participante | null> => {
  const cookie = await cookieDeSesion();
  if (!cookie) return null;
  const hash = await getHashDePin(cookie.personaId);
  if (!hash || !firmaValida(cookie.personaId, hash, cookie.firma)) return null;
  return comoParticipante(cookie.personaId);
});

// --------------------------------------------------------------- alineaciones

export type CincoGuardado = {
  personaId: string;
  jornada: number;
  jugadores: string[];
  capitan: string;
};

function comoCinco(fila: { persona_id: string; jornada: number; jugadores: string[]; capitan: string }): CincoGuardado {
  return {
    personaId: fila.persona_id,
    jornada: fila.jornada,
    jugadores: fila.jugadores,
    capitan: fila.capitan,
  };
}

export async function getCinco(personaId: string, jornada: number): Promise<CincoGuardado | null> {
  if (!hayBaseDeDatos()) return null;
  const { data } = await createAdminClient()
    .from("fantasy_equipos")
    .select("*")
    .eq("persona_id", personaId)
    .eq("jornada", jornada)
    .maybeSingle();
  return data ? comoCinco(data) : null;
}

export const getTodosLosCincos = cache(async (): Promise<CincoGuardado[]> => {
  if (!hayBaseDeDatos()) return [];
  const { data, error } = await createAdminClient().from("fantasy_equipos").select("*");
  if (error) {
    console.error("Supabase error (fantasy_equipos):", error);
    return [];
  }
  return (data ?? []).map(comoCinco);
});

// -------------------------------------------------------------- clasificación

export type FilaFantasy = {
  participante: Participante;
  total: number;
  porJornada: Record<number, number>;
  /** Jornadas en las que no alineó a nadie */
  sinAlinear: number;
};

export async function getClasificacionFantasy(): Promise<FilaFantasy[]> {
  const [participantes, cincos, jornadas] = await Promise.all([
    getParticipantes(),
    getTodosLosCincos(),
    getJornadasFantasy(),
  ]);

  const jugadas = jornadas.filter((jornada) => jornada.jugada);
  const puntosDe = new Map(jornadas.map((jornada) => [jornada.numero, jornada.puntos]));

  const filas = participantes.map((participante): FilaFantasy => {
    const suyos = cincos.filter((cinco) => cinco.personaId === participante.personaId);
    const porJornada: Record<number, number> = {};
    for (const jornada of jugadas) {
      const cinco = suyos.find((candidato) => candidato.jornada === jornada.numero);
      porJornada[jornada.numero] = cinco
        ? puntosDelCinco(cinco.jugadores, cinco.capitan, puntosDe.get(jornada.numero) ?? {})
        : 0;
    }
    return {
      participante,
      total: Object.values(porJornada).reduce((suma, puntos) => suma + puntos, 0),
      porJornada,
      sinAlinear: jugadas.filter((jornada) => !suyos.some((cinco) => cinco.jornada === jornada.numero)).length,
    };
  });

  return filas.sort(
    (a, b) => b.total - a.total || a.participante.apodo.localeCompare(b.participante.apodo)
  );
}

/** El mercado con los puntos que lleva cada jugador en todo el split */
export async function getMercadoConPuntos() {
  const jornadas = await getJornadasFantasy();
  const acumulado: Record<string, number> = {};
  for (const jornada of jornadas) {
    for (const [id, puntos] of Object.entries(jornada.puntos)) {
      acumulado[id] = (acumulado[id] ?? 0) + puntos.puntos;
    }
  }
  return mercado().map((jugador) => ({ ...jugador, puntos: acumulado[jugador.id] ?? 0 }));
}
