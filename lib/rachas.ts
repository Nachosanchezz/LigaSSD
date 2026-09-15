import type { Partido } from "@/data/tipos";
import { leerMarcador } from "@/lib/resultado";

/**
 * Curiosidades que se sacan solas de los partidos jugados: rachas, goleadas
 * y el partido más loco. Vale para cualquier split.
 */

export type Curiosidad = { etiqueta: string; valor: string; detalle?: string };

type Marcador = { partido: Partido; local: number; visitante: number };

function jugados(partidos: Partido[]): Marcador[] {
  return partidos.flatMap((partido) => {
    if (partido.estado !== "Finalizado") return [];
    const marcador = leerMarcador(partido.resultado);
    return marcador ? [{ partido, local: marcador.local, visitante: marcador.visitante }] : [];
  });
}

/** Victorias seguidas del equipo, contando desde su último partido hacia atrás */
function rachaActual(equipo: string, marcadores: Marcador[]): number {
  let racha = 0;
  for (const { partido, local, visitante } of [...marcadores].reverse()) {
    const suyo = partido.local === equipo || partido.visitante === equipo;
    if (!suyo) continue;
    const gana = partido.local === equipo ? local > visitante : visitante > local;
    if (!gana) break;
    racha += 1;
  }
  return racha;
}

export function curiosidades(equipos: string[], partidos: Partido[]): Curiosidad[] {
  const marcadores = jugados(partidos);
  if (marcadores.length === 0) return [];

  const lista: Curiosidad[] = [];

  // Partido con más goles
  const masGoles = [...marcadores].sort((a, b) => b.local + b.visitante - (a.local + a.visitante))[0];
  lista.push({
    etiqueta: "Partido con más goles",
    valor: `${masGoles.local + masGoles.visitante} goles`,
    detalle: `${masGoles.partido.local} ${masGoles.partido.resultado} ${masGoles.partido.visitante}`,
  });

  // Mayor goleada
  const goleada = [...marcadores].sort(
    (a, b) => Math.abs(b.local - b.visitante) - Math.abs(a.local - a.visitante)
  )[0];
  if (Math.abs(goleada.local - goleada.visitante) > 0) {
    lista.push({
      etiqueta: "Mayor goleada",
      valor: `+${Math.abs(goleada.local - goleada.visitante)}`,
      detalle: `${goleada.partido.local} ${goleada.partido.resultado} ${goleada.partido.visitante}`,
    });
  }

  // Racha de victorias en marcha
  const rachas = equipos
    .map((equipo) => ({ equipo, racha: rachaActual(equipo, marcadores) }))
    .sort((a, b) => b.racha - a.racha);
  if (rachas[0]?.racha > 1) {
    lista.push({
      etiqueta: "Racha viva",
      valor: `${rachas[0].racha} victorias`,
      detalle: rachas[0].equipo,
    });
  }

  // Ataque y defensa
  const totales = new Map(equipos.map((equipo) => [equipo, { gf: 0, gc: 0 }]));
  for (const { partido, local, visitante } of marcadores) {
    const casa = totales.get(partido.local);
    const fuera = totales.get(partido.visitante);
    if (casa) { casa.gf += local; casa.gc += visitante; }
    if (fuera) { fuera.gf += visitante; fuera.gc += local; }
  }
  const porGf = [...totales.entries()].sort((a, b) => b[1].gf - a[1].gf)[0];
  const porGc = [...totales.entries()].sort((a, b) => a[1].gc - b[1].gc)[0];
  if (porGf) lista.push({ etiqueta: "Más goleador", valor: `${porGf[1].gf} goles`, detalle: porGf[0] });
  if (porGc) lista.push({ etiqueta: "Menos encajados", valor: `${porGc[1].gc} goles`, detalle: porGc[0] });

  // Empates y goles por partido
  const empates = marcadores.filter(({ local, visitante }) => local === visitante).length;
  const goles = marcadores.reduce((suma, { local, visitante }) => suma + local + visitante, 0);
  lista.push({
    etiqueta: "Goles por partido",
    valor: (goles / marcadores.length).toFixed(1).replace(".", ","),
    detalle: `${marcadores.length} partidos · ${empates} empates`,
  });

  return lista;
}
