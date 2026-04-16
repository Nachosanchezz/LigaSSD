import { unstable_cache } from "next/cache";
import { createClient } from "./supabase";
import { jornadas as jornadasStaticas } from "@/data/partidos";
import type { Jornada, Partido, EstadoPartido } from "@/data/partidos";

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

const getCachedOverrides = unstable_cache(
  fetchOverrides,
  ["resultados"],
  { tags: ["resultados"] }
);

export async function getJornadasConResultados(): Promise<Jornada[]> {
  const overrides = await getCachedOverrides();

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
