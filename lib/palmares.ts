import { getPersona, personaDelSplit2, personas, type Persona } from "@/data/personas";
import { clasificacionSplit1, goleadoresSplit1, statsSplit1 } from "@/data/split1";
import { equipos as equiposSplit2 } from "@/data/split2/equipos";
import { equiposSplit3 } from "@/data/split3/equipos";
import { calcularClasificacion } from "@/lib/clasificacion";
import { contarEstadistica } from "@/lib/estadisticas";
import { clavesDeJugador, normalizarTexto } from "@/lib/jugadores";
import { getJornadasConResultados, getPlayoffConResultados } from "@/lib/queries";
import { crearMapaSplit3, getSplit3, partidosFaseFinal } from "@/lib/split3";

/**
 * El palmarés de la liga: campeones de cada split y los números que suman los
 * jugadores a lo largo de todas las temporadas. Del Split 1 solo se guardaron
 * goles y asistencias, y por nombre, así que se casan con las fichas por apodo.
 */

export type Campeon = {
  split: string;
  periodo: string;
  campeon?: string;
  subcampeon?: string;
  ligaRegular?: string;
  ruta: string;
  enJuego?: boolean;
};

export type FilaHistorica = {
  persona: Persona;
  split1: number;
  split2: number;
  split3: number;
  total: number;
};

function sumar(mapa: Map<string, FilaHistorica>, personaId: string, split: "split1" | "split2" | "split3", valor: number) {
  const persona = getPersona(personaId);
  if (!persona || valor === 0) return;
  const fila = mapa.get(personaId) ?? { persona, split1: 0, split2: 0, split3: 0, total: 0 };
  fila[split] += valor;
  fila.total += valor;
  mapa.set(personaId, fila);
}

function ordenar(mapa: Map<string, FilaHistorica>): FilaHistorica[] {
  return [...mapa.values()].sort(
    (a, b) => b.total - a.total || b.split3 - a.split3 || a.persona.nombre.localeCompare(b.persona.nombre)
  );
}

/**
 * Del Split 1 solo hay una lista por nombre: se busca a quién corresponde.
 * Si ese nombre encaja con más de un jugador de ahora (en la liga hay dos
 * "Guille"), se deja sin asignar antes que dárselo a quien no es.
 */
function personaDelSplit1(nombre: string): Persona | undefined {
  const clave = normalizarTexto(nombre);
  const candidatos = personas.filter((persona) => clavesDeJugador(persona).includes(clave));
  if (candidatos.length === 1) return candidatos[0];
  // Con varios candidatos, solo puede ser quien ya estaba: los que llegan
  // nuevos en el Split 3 no pudieron jugar el Split 1
  const veteranos = candidatos.filter((persona) => persona.split2);
  return veteranos.length === 1 ? veteranos[0] : undefined;
}

/** Lo que hizo una persona en el Split 1, si se le puede atribuir con seguridad */
export function filaSplit1DePersona(persona: Persona) {
  return goleadoresSplit1.find((fila) => personaDelSplit1(fila.nombre)?.id === persona.id);
}

export type Palmares = {
  campeones: Campeon[];
  goleadores: FilaHistorica[];
  asistentes: FilaHistorica[];
  mvps: FilaHistorica[];
};

export async function getPalmares(): Promise<Palmares> {
  const [jornadas2, playoff2, split3] = await Promise.all([
    getJornadasConResultados(),
    getPlayoffConResultados(),
    getSplit3(),
  ]);

  const partidos2 = [
    ...jornadas2.flatMap((jornada) => jornada.partidos),
    ...playoff2.cuartos,
    ...playoff2.semifinales,
    playoff2.final,
  ];
  const partidos3 = [...split3.jornadas.flatMap((jornada) => jornada.partidos), ...partidosFaseFinal(split3)];
  const mapa3 = crearMapaSplit3();

  const goles = new Map<string, FilaHistorica>();
  const asistencias = new Map<string, FilaHistorica>();
  const mvps = new Map<string, FilaHistorica>();

  for (const fila of goleadoresSplit1) {
    const persona = personaDelSplit1(fila.nombre);
    if (!persona) continue;
    sumar(goles, persona.id, "split1", fila.goles);
    sumar(asistencias, persona.id, "split1", fila.asistencias);
  }

  for (const [campo, destino] of [
    ["jugador", goles],
    ["asistente", asistencias],
    ["mvp", mvps],
  ] as const) {
    for (const fila of contarEstadistica(partidos2, campo)) {
      const persona = personaDelSplit2(fila.id);
      if (persona) sumar(destino, persona.id, "split2", fila.valor);
    }
    for (const fila of contarEstadistica(partidos3, campo, mapa3)) {
      sumar(destino, fila.id, "split3", fila.valor);
    }
  }

  const clasificacion2 = calcularClasificacion(
    equiposSplit2.map((equipo) => equipo.nombre),
    jornadas2.flatMap((jornada) => jornada.partidos)
  );
  const campeon2 = playoff2.final.ganador;

  const campeones: Campeon[] = [
    {
      split: "Split 1",
      periodo: statsSplit1.temporada,
      campeon: statsSplit1.campeón,
      ligaRegular: clasificacionSplit1[0]?.equipo,
      ruta: "/split1",
    },
    {
      split: "Split 2",
      periodo: "Mar – Jun 2026",
      campeon: campeon2,
      subcampeon: campeon2 && (campeon2 === playoff2.final.local ? playoff2.final.visitante : playoff2.final.local),
      ligaRegular: clasificacion2[0]?.equipo,
      ruta: "/split2",
    },
    {
      split: "Split 3",
      periodo: "Sep 2026 – 2027",
      campeon: split3.campeon,
      ligaRegular: split3.liguillaTerminada ? split3.clasificacion[0]?.equipo : undefined,
      ruta: "/clasificacion",
      enJuego: !split3.campeon,
    },
  ];

  return {
    campeones,
    goleadores: ordenar(goles),
    asistentes: ordenar(asistencias),
    mvps: ordenar(mvps),
  };
}

/** Escudo de un equipo, sea del split que sea */
export function escudoHistorico(nombre?: string) {
  if (!nombre) return undefined;
  const split3 = equiposSplit3.find((equipo) => equipo.nombre === nombre);
  if (split3) return { logo: split3.logo, color: split3.color };
  const split2 = equiposSplit2.find((equipo) => equipo.nombre === nombre);
  return split2 ? { logo: split2.logo } : undefined;
}
