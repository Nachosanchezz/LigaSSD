import { createClient } from "./supabase";
import { jornadas as jornadasStaticas } from "@/data/partidos";
import type { Jornada, Partido, EstadoPartido } from "@/data/partidos";
import { cuartosPlayoff, semifinalesPlayoff, finalPlayoff } from "@/data/playoffs";
import type { PartidoPlayoff } from "@/data/playoffs";

type PartidoOverrides = {
  resultado?: string;
  mvp?: string;
  resumen?: {
    local: { jugador: string; asistente?: string; minuto?: number }[];
    visitante: { jugador: string; asistente?: string; minuto?: number }[];
  };
  arbitra?: string;
  estadoOverride?: EstadoPartido;
  motivoOverride?: string;
};

type OverridesRecord = Record<string, PartidoOverrides>;

async function fetchOverrides(): Promise<OverridesRecord> {
  if (!process.env.SUPABASE_URL) {
    return {};
  }

  const supabase = createClient();

  const [
    { data: resultados, error: e1 },
    { data: goles, error: e2 },
    { data: arbitros, error: e3 },
    { data: estados, error: e4 },
  ] = await Promise.all([
    supabase.from("resultados").select("*"),
    supabase.from("goles").select("*").order("orden"),
    supabase.from("arbitros").select("*"),
    supabase.from("estados_partido").select("*"),
  ]);

  if (e1 || e2 || e3 || e4) {
    console.error("Supabase error:", e1 ?? e2 ?? e3 ?? e4);
    return {};
  }

  const record: OverridesRecord = {};

  for (const r of resultados ?? []) {
    const golesLocal = (goles ?? [])
      .filter((g) => g.partido_id === r.partido_id && g.equipo_tipo === "local")
      .map((g) => ({
        jugador: g.jugador,
        asistente: g.asistente ?? undefined,
        minuto: g.minuto ?? undefined,
      }));

    const golesVisitante = (goles ?? [])
      .filter(
        (g) => g.partido_id === r.partido_id && g.equipo_tipo === "visitante"
      )
      .map((g) => ({
        jugador: g.jugador,
        asistente: g.asistente ?? undefined,
        minuto: g.minuto ?? undefined,
      }));

    record[r.partido_id] = {
      resultado: r.resultado,
      mvp: r.mvp ?? undefined,
      resumen: { local: golesLocal, visitante: golesVisitante },
    };
  }

  // Merge árbitros (pueden existir aunque el partido no tenga resultado aún)
  for (const a of arbitros ?? []) {
    if (record[a.partido_id]) {
      record[a.partido_id].arbitra = a.arbitra;
    } else {
      record[a.partido_id] = { arbitra: a.arbitra };
    }
  }

  // Merge estados (aplazado, etc.)
  for (const e of estados ?? []) {
    if (record[e.partido_id]) {
      record[e.partido_id].estadoOverride = e.estado as EstadoPartido;
      record[e.partido_id].motivoOverride = e.motivo ?? undefined;
    } else {
      record[e.partido_id] = {
        estadoOverride: e.estado as EstadoPartido,
        motivoOverride: e.motivo ?? undefined,
      };
    }
  }

  return record;
}

export async function getJornadasConResultados(): Promise<Jornada[]> {
  const overrides = await fetchOverrides();

  return jornadasStaticas.map((j) => ({
    ...j,
    partidos: j.partidos.map((p) => {
      const o = overrides[p.id];
      if (!o) return p;

      const merged: Partido = { ...p };
      // Árbitro desde Supabase tiene prioridad sobre el dato estático
      if (o.arbitra) merged.arbitra = o.arbitra;
      // Estado override (ej: Aplazado desde admin), solo si NO hay resultado
      if (o.estadoOverride && !o.resultado) {
        merged.estado = o.estadoOverride;
        merged.motivo = o.motivoOverride;
      }
      // Resultado (Finalizado) tiene máxima prioridad
      if (o.resultado) {
        merged.estado = "Finalizado";
        merged.resultado = o.resultado;
        merged.mvp = o.mvp;
        merged.resumen = o.resumen;
      }
      return merged;
    }),
  }));
}

function calcularGanadorPlayoff(resultado: string, local: string, visitante: string): string | undefined {
  const [l, v] = resultado.split("-").map(Number);
  if (isNaN(l) || isNaN(v) || l === v) return undefined;
  return l > v ? local : visitante;
}

export async function getPlayoffConResultados(): Promise<{
  cuartos: PartidoPlayoff[];
  semifinales: PartidoPlayoff[];
  final: PartidoPlayoff;
}> {
  if (!process.env.SUPABASE_URL) {
    return { cuartos: cuartosPlayoff, semifinales: semifinalesPlayoff, final: finalPlayoff };
  }

  const supabase = createClient();
  const ids = ["qf1", "qf2", "qf3", "sf1", "sf2", "final"];

  const [{ data: resultados }, { data: goles }] = await Promise.all([
    supabase.from("resultados").select("partido_id, resultado, mvp").in("partido_id", ids),
    supabase.from("goles").select("*").in("partido_id", ids).order("orden"),
  ]);

  const rMap: Record<string, { resultado: string; mvp?: string }> = {};
  for (const r of resultados ?? []) {
    rMap[r.partido_id] = { resultado: r.resultado, mvp: r.mvp ?? undefined };
  }

  const golesMap: Record<string, PartidoPlayoff["resumen"]> = {};
  for (const g of goles ?? []) {
    if (!golesMap[g.partido_id]) golesMap[g.partido_id] = { local: [], visitante: [] };
    const evento = { jugador: g.jugador, asistente: g.asistente ?? undefined, minuto: g.minuto ?? undefined };
    if (g.equipo_tipo === "local") golesMap[g.partido_id]!.local.push(evento);
    else golesMap[g.partido_id]!.visitante.push(evento);
  }

  function applyResult(match: PartidoPlayoff): PartidoPlayoff {
    const r = rMap[match.id];
    if (!r) return match;
    return {
      ...match,
      resultado: r.resultado,
      mvp: r.mvp,
      resumen: golesMap[match.id],
      ganador: calcularGanadorPlayoff(r.resultado, match.local, match.visitante),
      estado: "Finalizado",
    };
  }

  // Cuartos
  const cuartos = cuartosPlayoff.map(applyResult);
  const [qf1, qf2, qf3] = cuartos;

  // Semifinales (equipos se resuelven de los cuartos)
  const sf2: PartidoPlayoff = applyResult({
    ...semifinalesPlayoff[0],
    local: qf1.ganador ?? "Gan. QF1",
    visitante: qf2.ganador ?? "Gan. QF2",
  });
  const sf1: PartidoPlayoff = applyResult({
    ...semifinalesPlayoff[1],
    visitante: qf3.ganador ?? "Gan. QF3",
  });

  // Final
  const fin: PartidoPlayoff = applyResult({
    ...finalPlayoff,
    local: sf2.ganador ?? "Gan. SF2",
    visitante: sf1.ganador ?? "Gan. SF1",
  });

  return { cuartos, semifinales: [sf2, sf1], final: fin };
}
