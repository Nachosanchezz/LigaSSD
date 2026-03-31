import { unstable_cache } from "next/cache";
import { createClient } from "./supabase";
import { jornadas as jornadasStaticas } from "@/data/partidos";
import type { Jornada, Partido } from "@/data/partidos";

type ResultadoEntry = Pick<Partido, "resultado" | "mvp" | "resumen">;
type ResultadosRecord = Record<string, ResultadoEntry>;

async function fetchResultados(): Promise<ResultadosRecord> {
  if (!process.env.SUPABASE_URL) {
    return {};
  }

  const supabase = createClient();

  const [{ data: resultados, error: e1 }, { data: goles, error: e2 }] =
    await Promise.all([
      supabase.from("resultados").select("*"),
      supabase.from("goles").select("*").order("orden"),
    ]);

  if (e1 || e2) {
    console.error("Supabase error:", e1 ?? e2);
    return {};
  }

  const record: ResultadosRecord = {};

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

  return record;
}

const getCachedResultados = unstable_cache(
  fetchResultados,
  ["resultados"],
  { tags: ["resultados"] }
);

export async function getJornadasConResultados(): Promise<Jornada[]> {
  const resultados = await getCachedResultados();

  return jornadasStaticas.map((j) => ({
    ...j,
    partidos: j.partidos.map((p) => {
      const r = resultados[p.id];
      if (r) return { ...p, estado: "Finalizado" as const, ...r };
      return p;
    }),
  }));
}
