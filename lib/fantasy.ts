import { PORTERIA, PRECIO_DE_SALIDA, PUNTOS, REGLAS, TASACIONES, VALORES } from "@/data/fantasy";
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
  /** Lo que costó en la subasta. No es su precio en el fantasy: es solo el dato */
  subasta: number;
  portero: boolean;
};

/** Solo cinco de los 48 lo son, y Titans no tiene ninguno */
export function esPortero(posicion?: string): boolean {
  return Boolean(posicion?.toLowerCase().includes("portero"));
}

/** Los 48 de la liga con su precio: el de la subasta o, si no jugó, el tasado */
export function mercado(): JugadorMercado[] {
  const jugadores = equiposSplit3.flatMap((equipo) =>
    equipo.plantilla.flatMap((fichaje): JugadorMercado[] => {
      const persona = getPersona(fichaje.persona);
      if (!persona) return [];
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
          valor: PRECIO_DE_SALIDA,
          subasta: fichaje.precio ?? TASACIONES[persona.id] ?? 20,
          portero: esPortero(persona.posicion),
        },
      ];
    })
  );
  return jugadores.sort((a, b) => b.subasta - a.subasta || a.apodo.localeCompare(b.apodo));
}

// -------------------------------------------------------------------- bolsa

export type CincoCerrado = { jornada: number; jugadores: string[] };

export type ValorEnJornada = {
  valor: number;
  /** Lo que se movió al cerrar la jornada anterior */
  cambio: number;
};

/**
 * Lo que cuesta cada jugador en una jornada.
 *
 * Todos parten del mismo precio y a partir de ahí manda la demanda: el precio
 * sale de **qué parte del grupo lo alineó en la última jornada cerrada**,
 * comparada con la que le tocaría si todos ficharan al azar. No se acumula
 * jornada tras jornada a propósito: si se sumara, un jugador muy fichado
 * podría encarecerse hasta no caber en ningún cinco y, como ya nadie podría
 * ficharlo, se quedaría encallado ahí arriba el resto del split.
 *
 * Así el mercado se mueve entre unos 20 y unos 70 M€: al más caro se le puede
 * seguir acompañando de otros cuatro sin pasarse del presupuesto.
 *
 * No se guarda nada: se recalcula con los cinco que la gente alineó.
 */
export function valoresEnJornada(
  jornada: number,
  cincosCerrados: CincoCerrado[],
  jugadores: JugadorMercado[]
): Map<string, ValorEnJornada> {
  const cuantosPorteros = jugadores.filter((jugador) => jugador.portero).length;
  const cuantosDePista = jugadores.length - cuantosPorteros;

  /** Precios que dejó una jornada ya jugada; si no hubo nadie, los de salida */
  const preciosTras = (numero: number): Map<string, number> => {
    const deEsa = cincosCerrados.filter((cinco) => cinco.jornada === numero);
    if (deEsa.length === 0) return new Map(jugadores.map((j) => [j.id, PRECIO_DE_SALIDA]));

    const fichajes = new Map<string, number>();
    for (const cinco of deEsa) {
      for (const id of cinco.jugadores) fichajes.set(id, (fichajes.get(id) ?? 0) + 1);
    }

    // Cada grupo con su media: los porteros no compiten contra los de pista,
    // porque solo hay cinco y todo el mundo está obligado a llevar uno
    let totalPorteros = 0;
    let totalDePista = 0;
    for (const jugador of jugadores) {
      const suyos = fichajes.get(jugador.id) ?? 0;
      if (jugador.portero) totalPorteros += suyos;
      else totalDePista += suyos;
    }
    const mediaPortero = cuantosPorteros > 0 ? totalPorteros / (deEsa.length * cuantosPorteros) : 0;
    const mediaDePista = cuantosDePista > 0 ? totalDePista / (deEsa.length * cuantosDePista) : 0;

    return new Map(
      jugadores.map((jugador) => {
        const media = jugador.portero ? mediaPortero : mediaDePista;
        const parte = (fichajes.get(jugador.id) ?? 0) / deEsa.length;
        const precio = Math.round(PRECIO_DE_SALIDA + (parte - media) * VALORES.recorrido);
        return [jugador.id, Math.min(VALORES.maximo, Math.max(VALORES.minimo, precio))];
      })
    );
  };

  const cerradas = [...new Set(cincosCerrados.map((cinco) => cinco.jornada))]
    .filter((numero) => numero < jornada)
    .sort((a, b) => a - b);

  const ultima = cerradas[cerradas.length - 1];
  const penultima = cerradas[cerradas.length - 2];

  const ahora = ultima === undefined ? null : preciosTras(ultima);
  const antes = penultima === undefined ? null : preciosTras(penultima);

  return new Map(
    jugadores.map((jugador) => {
      const valor = ahora?.get(jugador.id) ?? PRECIO_DE_SALIDA;
      const previo = antes?.get(jugador.id) ?? PRECIO_DE_SALIDA;
      return [jugador.id, { valor, cambio: ahora ? valor - previo : 0 }];
    })
  );
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
  const porteros = fichas.filter((ficha) => ficha!.portero).length;
  if (porteros !== REGLAS.porteros) {
    return porteros === 0
      ? "Te falta el portero: hay que alinear a uno"
      : `Solo puede jugar ${REGLAS.porteros} portero, y llevas ${porteros}`;
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
  amarillas: number;
  rojas: number;
  /** Portero que encajó pocos goles */
  porteriaSegura: boolean;
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
  amarillas: 0,
  rojas: 0,
  porteriaSegura: false,
  resultado: null,
  puntos: 0,
});

/** Ids de los porteros del Split 3, para el premio por encajar poco */
function idsDePorteros(): Set<string> {
  const porteros = new Set<string>();
  for (const equipo of equiposSplit3) {
    for (const fichaje of equipo.plantilla) {
      if (esPortero(getPersona(fichaje.persona)?.posicion)) porteros.add(fichaje.persona);
    }
  }
  return porteros;
}

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
    jugador.amarillas * PUNTOS.tarjetaAmarilla +
    jugador.rojas * PUNTOS.tarjetaRoja +
    (jugador.porteriaSegura ? PORTERIA.puntos : 0) +
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
  const porteros = idsDePorteros();

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

    // Las tarjetas restan, y de paso confirman que ese jugador estuvo
    for (const lado of LADOS) {
      for (const tarjeta of partido.tarjetas?.[lado] ?? []) {
        const id = idDe(tarjeta.jugador);
        if (!id) continue;
        if (tarjeta.tipo === "roja") ficha(id).rojas += 1;
        else ficha(id).amarillas += 1;
        jugaron[lado].add(id);
      }
    }

    const mvp = idDe(partido.mvp);
    if (mvp) {
      ficha(mvp).mvp = true;
      const suLado = LADOS.find((lado) => (plantillas[partido[lado]] ?? []).includes(mvp));
      if (suLado) jugaron[suLado].add(mvp);
    }

    // Resultado y premio al portero, solo para quien jugó
    for (const lado of LADOS) {
      const suyos = marcador[lado];
      const encajados = marcador[lado === "local" ? "visitante" : "local"];
      const resultado = suyos > encajados ? "victoria" : suyos === encajados ? "empate" : "derrota";
      const porteriaSegura = encajados <= PORTERIA.maxGolesEncajados;
      for (const id of jugaron[lado]) {
        ficha(id).resultado = resultado;
        if (porteriaSegura && porteros.has(id)) ficha(id).porteriaSegura = true;
      }
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
