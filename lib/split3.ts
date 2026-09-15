import { cache } from "react";
import { getPersona, type Persona } from "@/data/personas";
import type { Jornada, Partido } from "@/data/tipos";
import { equiposSplit3, type EquipoSplit3 } from "@/data/split3/equipos";
import {
  final,
  nombrePlaza,
  semifinales,
  TRIANGULARES,
  triangularA,
  triangularB,
  type PartidoFase,
  type Plaza,
} from "@/data/split3/fases";
import { jornadasSplit3 } from "@/data/split3/partidos";
import { calcularClasificacion, type FilaClasificacion } from "@/lib/clasificacion";
import { nombreCompletoJugador } from "@/lib/helpers";
import { clavesDeJugador, type InfoJugador } from "@/lib/jugadores";
import { aplicarOverrides, fetchOverrides } from "@/lib/queries";
import { ladoGanador, leerMarcador } from "@/lib/resultado";

// ------------------------------------------------------------------ equipos

export function escudoSplit3(nombre: string) {
  const equipo = equiposSplit3.find((candidato) => candidato.nombre === nombre);
  return { logo: equipo?.logo, color: equipo?.color };
}

export type MiembroSplit3 = { persona: Persona; precio?: number; presidente: boolean };

export function plantillaSplit3(equipo: EquipoSplit3): MiembroSplit3[] {
  return equipo.plantilla.flatMap(({ persona, precio, presidente }) => {
    const datos = getPersona(persona);
    return datos ? [{ persona: datos, precio, presidente: Boolean(presidente) }] : [];
  });
}

/** Equipo del Split 3 en el que juega una persona, si juega */
export function equipoDePersona(personaId: string): EquipoSplit3 | undefined {
  return equiposSplit3.find((equipo) => equipo.plantilla.some((fichaje) => fichaje.persona === personaId));
}

/**
 * Índice nombre del acta → jugador del Split 3 (nombre completo, apodo y alias).
 * Si dos jugadores comparten una forma de escribirse, esa forma no cuenta:
 * mejor un gol sin atribuir que atribuido a quien no es.
 */
export function crearMapaSplit3(): Record<string, InfoJugador> {
  const mapa = new Map<string, InfoJugador | null>();
  for (const equipo of equiposSplit3) {
    for (const { persona } of plantillaSplit3(equipo)) {
      const info: InfoJugador = {
        id: persona.id,
        jugadorMostrado: nombreCompletoJugador(persona),
        equipo: equipo.nombre,
        logo: equipo.logo,
        color: equipo.color,
      };
      for (const clave of clavesDeJugador(persona)) {
        const previo = mapa.get(clave);
        mapa.set(clave, previo === undefined || previo?.id === persona.id ? info : null);
      }
    }
  }
  return Object.fromEntries(
    [...mapa].filter((entrada): entrada is [string, InfoJugador] => entrada[1] !== null)
  );
}

// ---------------------------------------------------------- competición

export type PartidoFaseSplit3 = Partido & {
  ronda: string;
  /** "3º liguilla", "Ganador semi 1"…: de dónde sale cada equipo */
  plazaLocal: string;
  plazaVisitante: string;
  /** Ya se sabe qué dos equipos lo juegan */
  definido: boolean;
};

export type TriangularSplit3 = {
  grupo: "A" | "B";
  partidos: PartidoFaseSplit3[];
  /** Vacía hasta que acaba la liguilla y se sabe quién lo juega */
  tabla: FilaClasificacion[];
  terminado: boolean;
};

export type Split3 = {
  jornadas: Jornada[];
  clasificacion: FilaClasificacion[];
  liguillaTerminada: boolean;
  triangulares: TriangularSplit3[];
  semifinales: PartidoFaseSplit3[];
  final: PartidoFaseSplit3;
  campeon?: string;
};

const nombresSplit3 = equiposSplit3.map((equipo) => equipo.nombre);

// Todo el Split 3 con los resultados de Supabase: liguilla, play-in y playoff.
// Cada fase se rellena con los equipos que salen de la anterior.
export const getSplit3 = cache(async (): Promise<Split3> => {
  const overrides = await fetchOverrides();

  const jornadas = jornadasSplit3.map((jornada) => ({
    ...jornada,
    partidos: jornada.partidos.map((partido) => aplicarOverrides(partido, overrides[partido.id])),
  }));
  const partidosLiguilla = jornadas.flatMap((jornada) => jornada.partidos);
  const clasificacion = calcularClasificacion(nombresSplit3, partidosLiguilla, { enfrentamientoDirecto: true });
  const liguillaTerminada = partidosLiguilla.every((partido) => partido.estado === "Finalizado");
  const puestoEnLiguilla = (equipo: string) => clasificacion.findIndex((fila) => fila.equipo === equipo);

  const clasificadosTriangular = new Map<string, string>();
  const ganadores = new Map<string, string>();

  const equipoEn = (plaza: Plaza): string | undefined => {
    if (plaza.de === "liguilla") return liguillaTerminada ? clasificacion[plaza.puesto - 1]?.equipo : undefined;
    if (plaza.de === "triangular") return clasificadosTriangular.get(`${plaza.grupo}${plaza.puesto}`);
    return ganadores.get(plaza.partido);
  };

  const prepararPartido = (fase: PartidoFase): PartidoFaseSplit3 => {
    const local = equipoEn(fase.local);
    const visitante = equipoEn(fase.visitante);
    const definido = Boolean(local && visitante);
    const base: Partido = {
      id: fase.id,
      local: local ?? nombrePlaza(fase.local),
      visitante: visitante ?? nombrePlaza(fase.visitante),
      dia: fase.dia,
      hora: fase.hora,
      campo: fase.campo,
      estado: fase.dia ? "Programado" : "Pendiente de programar",
    };
    const partido = definido ? aplicarOverrides(base, overrides[fase.id]) : base;

    const marcador = partido.estado === "Finalizado" ? leerMarcador(partido.resultado) : null;
    const lado = marcador && ladoGanador(marcador);
    if (lado) ganadores.set(fase.id, partido[lado]);

    return {
      ...partido,
      ronda: fase.ronda,
      plazaLocal: nombrePlaza(fase.local),
      plazaVisitante: nombrePlaza(fase.visitante),
      definido,
    };
  };

  const triangulares = (["A", "B"] as const).map((grupo): TriangularSplit3 => {
    const partidos = (grupo === "A" ? triangularA : triangularB).map(prepararPartido);
    if (!liguillaTerminada) return { grupo, partidos, tabla: [], terminado: false };

    const equipos = TRIANGULARES[grupo].map((puesto) => clasificacion[puesto - 1].equipo);
    // Si siguen empatados tras el enfrentamiento directo, la DG y los goles, pasa el mejor de la liguilla
    const tabla = calcularClasificacion(equipos, partidos, {
      enfrentamientoDirecto: true,
      desempateFinal: (a, b) => puestoEnLiguilla(a) - puestoEnLiguilla(b),
    });
    const terminado = partidos.every((partido) => partido.estado === "Finalizado");
    if (terminado) {
      clasificadosTriangular.set(`${grupo}1`, tabla[0].equipo);
      clasificadosTriangular.set(`${grupo}2`, tabla[1].equipo);
    }
    return { grupo, partidos, tabla, terminado };
  });

  const semis = semifinales.map(prepararPartido);
  const partidoFinal = prepararPartido(final);

  return {
    jornadas,
    clasificacion,
    liguillaTerminada,
    triangulares,
    semifinales: semis,
    final: partidoFinal,
    campeon: ganadores.get(final.id),
  };
});

/** Partidos del play-in y el playoff, en orden de juego */
export function partidosFaseFinal(split: Split3): PartidoFaseSplit3[] {
  return [...split.triangulares.flatMap((triangular) => triangular.partidos), ...split.semifinales, split.final];
}
