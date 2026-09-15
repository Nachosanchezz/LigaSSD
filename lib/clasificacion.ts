import { leerMarcador } from "@/lib/resultado";

// Tabla de una liga a partir de sus partidos. Vale para cualquier split:
// cada uno pasa sus equipos, sus partidos y sus reglas de desempate.

export type FilaClasificacion = {
  equipo: string;
  pj: number;
  pg: number;
  pe: number;
  pp: number;
  gf: number;
  gc: number;
  pts: number;
  dg: number;
};

type PartidoTabla = {
  local: string;
  visitante: string;
  estado: string;
  resultado?: string;
};

type Opciones = {
  /**
   * Entre empatados a puntos, manda lo que hicieron entre ellos (puntos y
   * luego diferencia de goles). Solo cuando ya han jugado todos esos partidos;
   * mientras tanto se desempata por diferencia de goles.
   */
  enfrentamientoDirecto?: boolean;
  /** Último criterio antes del orden alfabético (p. ej. el puesto en la liguilla) */
  desempateFinal?: (a: string, b: string) => number;
};

function filaVacia(equipo: string): FilaClasificacion {
  return { equipo, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0, dg: 0 };
}

export function calcularClasificacion(
  equipos: string[],
  partidos: PartidoTabla[],
  opciones: Opciones = {}
): FilaClasificacion[] {
  const tabla: Record<string, FilaClasificacion> = Object.fromEntries(
    equipos.map((equipo) => [equipo, filaVacia(equipo)])
  );

  for (const partido of partidos) {
    if (partido.estado !== "Finalizado") continue;
    const marcador = leerMarcador(partido.resultado);
    if (!marcador) continue;

    const local = tabla[partido.local];
    const visitante = tabla[partido.visitante];
    if (!local || !visitante) continue;

    const { local: golesLocal, visitante: golesVisitante } = marcador;
    local.pj += 1;
    visitante.pj += 1;
    local.gf += golesLocal;
    local.gc += golesVisitante;
    visitante.gf += golesVisitante;
    visitante.gc += golesLocal;

    if (golesLocal > golesVisitante) {
      local.pg += 1;
      local.pts += 3;
      visitante.pp += 1;
    } else if (golesLocal < golesVisitante) {
      visitante.pg += 1;
      visitante.pts += 3;
      local.pp += 1;
    } else {
      local.pe += 1;
      visitante.pe += 1;
      local.pts += 1;
      visitante.pts += 1;
    }
  }

  const criterioGeneral = (a: FilaClasificacion, b: FilaClasificacion) =>
    b.dg - a.dg ||
    b.gf - a.gf ||
    (opciones.desempateFinal?.(a.equipo, b.equipo) ?? 0) ||
    a.equipo.localeCompare(b.equipo);

  const filas = Object.values(tabla)
    .map((fila) => ({ ...fila, dg: fila.gf - fila.gc }))
    .sort((a, b) => b.pts - a.pts || criterioGeneral(a, b));

  if (!opciones.enfrentamientoDirecto) return filas;

  // Reordenar cada grupo de empatados a puntos
  const ordenadas: FilaClasificacion[] = [];
  for (let inicio = 0; inicio < filas.length; ) {
    let fin = inicio;
    while (fin < filas.length && filas[fin].pts === filas[inicio].pts) fin++;
    const grupo = filas.slice(inicio, fin);
    ordenadas.push(...(grupo.length > 1 ? ordenarEmpatados(grupo, partidos, criterioGeneral) : grupo));
    inicio = fin;
  }
  return ordenadas;
}

function ordenarEmpatados(
  grupo: FilaClasificacion[],
  partidos: PartidoTabla[],
  criterioGeneral: (a: FilaClasificacion, b: FilaClasificacion) => number
): FilaClasificacion[] {
  const nombres = grupo.map((fila) => fila.equipo);
  const entreEllos = partidos.filter(
    (partido) => nombres.includes(partido.local) && nombres.includes(partido.visitante)
  );
  const todosJugados =
    entreEllos.length > 0 &&
    entreEllos.every((partido) => partido.estado === "Finalizado" && leerMarcador(partido.resultado));
  if (!todosJugados) return [...grupo].sort(criterioGeneral);

  const directo = new Map(calcularClasificacion(nombres, entreEllos).map((fila) => [fila.equipo, fila]));
  return [...grupo].sort((a, b) => {
    const directoA = directo.get(a.equipo)!;
    const directoB = directo.get(b.equipo)!;
    return directoB.pts - directoA.pts || directoB.dg - directoA.dg || criterioGeneral(a, b);
  });
}
