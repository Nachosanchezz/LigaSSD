import { PUNTOS, REGLAS, TASACIONES } from "@/data/fantasy";
import { getPersona } from "@/data/personas";
import { equiposSplit3 } from "@/data/split3/equipos";
import type { Partido } from "@/data/tipos";
import { instanteDeLaLiga } from "./fecha";
import { nombreCompletoJugador } from "./helpers";
import { esValorIgnorable, normalizarTexto, type InfoJugador } from "./jugadores";
import { leerMarcador } from "./resultado";

// ------------------------------------------------------------------ mercado

export type JugadorMercado = {
  id: string;
  nombre: string;
  apodo: string;
  posicion?: string;
  equipo: string;
  equipoId: string;
  slug: string;
  logo?: string;
  color: string;
  valor: number;
  /** No pasó por la subasta: su valor es una tasación, no lo que se pagó */
  tasado: boolean;
};

/** Los 48 de la liga con su precio: el de la subasta o, si no jugó, el tasado */
export function mercado(): JugadorMercado[] {
  const jugadores = equiposSplit3.flatMap((equipo) =>
    equipo.plantilla.flatMap((fichaje): JugadorMercado[] => {
      const persona = getPersona(fichaje.persona);
      if (!persona) return [];
      const tasado = fichaje.precio === undefined;
      return [
        {
          id: persona.id,
          nombre: nombreCompletoJugador(persona),
          apodo: persona.apodo ?? persona.nombre,
          posicion: persona.posicion,
          equipo: equipo.nombre,
          equipoId: equipo.id,
          slug: equipo.slug,
          logo: equipo.logo,
          color: equipo.color,
          valor: fichaje.precio ?? TASACIONES[persona.id] ?? 20,
          tasado,
        },
      ];
    })
  );
  return jugadores.sort((a, b) => b.valor - a.valor || a.apodo.localeCompare(b.apodo));
}

/** Por qué un cinco no vale; null si es legal */
export function motivoInvalido(ids: string[], capitan: string, precios: Map<string, JugadorMercado>): string | null {
  if (ids.length !== REGLAS.tamanoEquipo) {
    return `Tienes que alinear a ${REGLAS.tamanoEquipo} jugadores`;
  }
  if (new Set(ids).size !== ids.length) {
    return "Has repetido jugador";
  }
  const fichas = ids.map((id) => precios.get(id));
  if (fichas.some((ficha) => !ficha)) {
    return "Alguno de los jugadores no está en la liga";
  }
  if (!ids.includes(capitan)) {
    return "El capitán tiene que ser uno de los cinco";
  }
  const coste = fichas.reduce((suma, ficha) => suma + ficha!.valor, 0);
  if (coste > REGLAS.presupuesto) {
    return `Te pasas del presupuesto: ${coste} M€ de ${REGLAS.presupuesto} M€`;
  }
  for (const equipo of new Set(fichas.map((ficha) => ficha!.equipoId))) {
    const cuantos = fichas.filter((ficha) => ficha!.equipoId === equipo).length;
    if (cuantos > REGLAS.maxPorEquipo) {
      const nombre = fichas.find((ficha) => ficha!.equipoId === equipo)!.equipo;
      return `Solo puedes alinear a ${REGLAS.maxPorEquipo} de ${nombre}, y llevas ${cuantos}`;
    }
  }
  return null;
}

// ------------------------------------------------------------------- puntos

export type PuntosJugador = {
  goles: number;
  asistencias: number;
  enPropia: number;
  mvp: boolean;
  resultado: "victoria" | "empate" | "derrota" | null;
  puntos: number;
};

/** Apodos de quienes jugaron cada partido, tal y como se apuntan en el acta */
export type Asistencias = Record<string, { local: string[]; visitante: string[] }>;

const LADOS = ["local", "visitante"] as const;
type Lado = (typeof LADOS)[number];

const vacio = (): PuntosJugador => ({
  goles: 0,
  asistencias: 0,
  enPropia: 0,
  mvp: false,
  resultado: null,
  puntos: 0,
});

/** "Sotto (PP)" → "Sotto"; null si no es un gol en propia puerta */
function autorDelGolEnPropia(texto?: string): string | null {
  const partes = texto?.match(/^(.*?)\s*\(\s*pp\s*\)\s*$/i);
  const nombre = partes?.[1]?.trim();
  return nombre ? nombre : null;
}

/** Plantilla de cada equipo del Split 3, por nombre de equipo */
function plantillasPorEquipo(): Record<string, string[]> {
  return Object.fromEntries(
    equiposSplit3.map((equipo) => [equipo.nombre, equipo.plantilla.map((fichaje) => fichaje.persona)])
  );
}

function sumarPuntos(jugador: PuntosJugador): number {
  const porResultado =
    jugador.resultado === "victoria" ? PUNTOS.victoria : jugador.resultado === "empate" ? PUNTOS.empate : 0;
  return (
    jugador.goles * PUNTOS.gol +
    jugador.asistencias * PUNTOS.asistencia +
    (jugador.mvp ? PUNTOS.mvp : 0) +
    jugador.enPropia * PUNTOS.golEnPropia +
    porResultado
  );
}

export type PuntosDeUnosPartidos = {
  /** Solo los jugadores que jugaron: quien no aparece, no puntuó */
  jugadores: Record<string, PuntosJugador>;
  /** Partidos finalizados en los que nadie apuntó quién jugó */
  sinAsistencia: string[];
};

/**
 * Puntos de cada jugador en unos partidos. Los puntos por victoria o empate
 * los cobra quien jugó, según el acta de asistencia; si esa acta falta, solo
 * puntúan los que aparecen en el resumen (marcaron, asistieron o fueron MVP),
 * para no repartir puntos a quien a lo mejor ni fue.
 */
export function puntosDePartidos(
  partidos: Partido[],
  asistencias: Asistencias,
  mapa: Record<string, InfoJugador>
): PuntosDeUnosPartidos {
  const jugadores: Record<string, PuntosJugador> = {};
  const sinAsistencia: string[] = [];
  const plantillas = plantillasPorEquipo();

  const ficha = (id: string) => (jugadores[id] ??= vacio());
  const idDe = (texto?: string) => {
    if (esValorIgnorable(texto)) return undefined;
    return mapa[normalizarTexto(texto!)]?.id;
  };

  for (const partido of partidos) {
    if (partido.estado !== "Finalizado") continue;
    const marcador = leerMarcador(partido.resultado);
    if (!marcador) continue;

    // Quién jugó: lo apuntado en el admin y, en todo caso, quien salga en el acta
    const apuntados = asistencias[partido.id];
    const jugaron: Record<Lado, Set<string>> = { local: new Set(), visitante: new Set() };
    for (const lado of LADOS) {
      const deEsteEquipo = new Set(plantillas[partido[lado]] ?? []);
      for (const nombre of apuntados?.[lado] ?? []) {
        const id = idDe(nombre);
        if (id && deEsteEquipo.has(id)) jugaron[lado].add(id);
      }
    }
    if (!apuntados || apuntados.local.length + apuntados.visitante.length === 0) {
      sinAsistencia.push(partido.id);
    }

    // El acta: goles, asistencias y goles en propia (que son del equipo contrario)
    for (const lado of LADOS) {
      const contrario: Lado = lado === "local" ? "visitante" : "local";
      for (const gol of partido.resumen?.[lado] ?? []) {
        const enPropia = autorDelGolEnPropia(gol.jugador);
        if (enPropia) {
          const id = idDe(enPropia);
          if (id) {
            ficha(id).enPropia += 1;
            jugaron[contrario].add(id);
          }
        } else {
          const id = idDe(gol.jugador);
          if (id) {
            ficha(id).goles += 1;
            jugaron[lado].add(id);
          }
        }
        const asistente = idDe(gol.asistente);
        if (asistente) {
          ficha(asistente).asistencias += 1;
          jugaron[lado].add(asistente);
        }
      }
    }

    const mvp = idDe(partido.mvp);
    if (mvp) {
      ficha(mvp).mvp = true;
      const suLado = LADOS.find((lado) => (plantillas[partido[lado]] ?? []).includes(mvp));
      if (suLado) jugaron[suLado].add(mvp);
    }

    // Resultado, solo para quien jugó
    for (const lado of LADOS) {
      const suyos = marcador[lado];
      const otros = marcador[lado === "local" ? "visitante" : "local"];
      const resultado = suyos > otros ? "victoria" : suyos === otros ? "empate" : "derrota";
      for (const id of jugaron[lado]) ficha(id).resultado = resultado;
    }
  }

  for (const jugador of Object.values(jugadores)) {
    jugador.puntos = sumarPuntos(jugador);
  }

  return { jugadores, sinAsistencia };
}

/** Puntos de un cinco, doblando los del capitán */
export function puntosDelCinco(
  jugadores: string[],
  capitan: string,
  puntos: Record<string, PuntosJugador>
): number {
  return jugadores.reduce((suma, id) => {
    const suyos = puntos[id]?.puntos ?? 0;
    return suma + (id === capitan ? suyos * REGLAS.multiplicadorCapitan : suyos);
  }, 0);
}

// ------------------------------------------------------------------ jornadas

/** Cuándo se cierra una jornada: al empezar su primer partido */
export function cierreDeJornada(partidos: Partido[]): Date | null {
  const instantes = partidos
    .map((partido) => partido.iso)
    .filter((iso): iso is string => Boolean(iso))
    .map(instanteDeLaLiga);
  return instantes.length > 0 ? new Date(Math.min(...instantes.map((fecha) => fecha.getTime()))) : null;
}
