"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase-server";

const ADMIN_TOKEN = "liga-ssd-admin-v1";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("admin-token")?.value === ADMIN_TOKEN;
}

export async function login(formData: FormData) {
  const password = formData.get("password") as string;
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin-token", ADMIN_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    redirect("/admin");
  }
  redirect("/admin?error=1");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-token");
  redirect("/admin");
}

type GolData = {
  jugador: string;
  asistente?: string;
  minuto?: number;
};

type TarjetaData = {
  jugador: string;
  tipo: "amarilla" | "roja";
  minuto?: number;
};

type GuardarResultadoInput = {
  partidoId: string;
  resultado: string;
  mvp?: string;
  golesLocal: GolData[];
  golesVisitante: GolData[];
  /** Apodos de quienes jugaron, para las estadísticas y el fantasy */
  jugaronLocal?: string[];
  jugaronVisitante?: string[];
  tarjetasLocal?: TarjetaData[];
  tarjetasVisitante?: TarjetaData[];
};

export async function guardarResultado(
  data: GuardarResultadoInput
): Promise<{ error?: string }> {
  if (!(await isAuthenticated())) {
    return { error: "No autorizado" };
  }

  const {
    partidoId,
    resultado,
    mvp,
    golesLocal,
    golesVisitante,
    jugaronLocal,
    jugaronVisitante,
    tarjetasLocal,
    tarjetasVisitante,
  } = data;

  // Una eliminatoria empatada tras la prórroga lleva los penaltis: "4-4 (5-3 pen.)"
  if (!resultado.match(/^\d+-\d+( \(\d+-\d+ pen\.\))?$/)) {
    return { error: "Formato de resultado inválido. Usa 3-2, o 4-4 (5-3 pen.) si hubo penaltis" };
  }

  const supabase = createAdminClient();

  // Upsert resultado
  const { error: e1 } = await supabase
    .from("resultados")
    .upsert(
      { partido_id: partidoId, resultado, mvp: mvp || null },
      { onConflict: "partido_id" }
    );

  if (e1) return { error: `Error guardando resultado: ${e1.message}` };

  // Delete existing goles then re-insert
  const { error: e2 } = await supabase
    .from("goles")
    .delete()
    .eq("partido_id", partidoId);

  if (e2) return { error: `Error borrando goles: ${e2.message}` };

  const golesRows = [
    ...golesLocal.map((g, i) => ({
      partido_id: partidoId,
      equipo_tipo: "local" as const,
      jugador: g.jugador,
      asistente: g.asistente || null,
      minuto: g.minuto ?? null,
      orden: i,
    })),
    ...golesVisitante.map((g, i) => ({
      partido_id: partidoId,
      equipo_tipo: "visitante" as const,
      jugador: g.jugador,
      asistente: g.asistente || null,
      minuto: g.minuto ?? null,
      orden: i,
    })),
  ];

  if (golesRows.length > 0) {
    const { error: e3 } = await supabase.from("goles").insert(golesRows);
    if (e3) return { error: `Error guardando goles: ${e3.message}` };
  }

  // Tarjetas: se reescriben enteras, igual que los goles
  const { error: eT } = await supabase.from("tarjetas").delete().eq("partido_id", partidoId);
  if (eT) return { error: `Error borrando tarjetas: ${eT.message}` };

  const tarjetaRows = [
    ...(tarjetasLocal ?? []).map((tarjeta, i) => ({
      partido_id: partidoId,
      equipo_tipo: "local" as const,
      jugador: tarjeta.jugador,
      tipo: tarjeta.tipo,
      minuto: tarjeta.minuto ?? null,
      orden: i,
    })),
    ...(tarjetasVisitante ?? []).map((tarjeta, i) => ({
      partido_id: partidoId,
      equipo_tipo: "visitante" as const,
      jugador: tarjeta.jugador,
      tipo: tarjeta.tipo,
      minuto: tarjeta.minuto ?? null,
      orden: i,
    })),
  ].filter((fila) => fila.jugador.trim());

  if (tarjetaRows.length > 0) {
    const { error: eT2 } = await supabase.from("tarjetas").insert(tarjetaRows);
    if (eT2) return { error: `Error guardando tarjetas: ${eT2.message}` };
  }

  // Quién jugó: se reescribe entera, igual que los goles
  const { error: e4 } = await supabase.from("alineaciones").delete().eq("partido_id", partidoId);
  if (e4) return { error: `Error borrando la alineación: ${e4.message}` };

  const alineacionRows = [
    ...(jugaronLocal ?? []).map((jugador) => ({ partido_id: partidoId, equipo_tipo: "local" as const, jugador })),
    ...(jugaronVisitante ?? []).map((jugador) => ({ partido_id: partidoId, equipo_tipo: "visitante" as const, jugador })),
  ].filter((fila) => fila.jugador.trim());

  if (alineacionRows.length > 0) {
    const { error: e5 } = await supabase.from("alineaciones").insert(alineacionRows);
    if (e5) return { error: `Error guardando la alineación: ${e5.message}` };
  }

  revalidatePath("/", "layout");
  return {};
}

export async function guardarArbitra(
  partidoId: string,
  arbitra: string
): Promise<{ error?: string }> {
  if (!(await isAuthenticated())) {
    return { error: "No autorizado" };
  }

  const trimmed = arbitra.trim();
  if (!trimmed) {
    return { error: "El árbitro no puede estar vacío" };
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("arbitros")
    .upsert(
      { partido_id: partidoId, arbitra: trimmed },
      { onConflict: "partido_id" }
    );

  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  return {};
}

export async function guardarAplazado(
  partidoId: string,
  motivo: string
): Promise<{ error?: string }> {
  if (!(await isAuthenticated())) {
    return { error: "No autorizado" };
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("estados_partido")
    .upsert(
      { partido_id: partidoId, estado: "Aplazado", motivo: motivo.trim() || null },
      { onConflict: "partido_id" }
    );

  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  return {};
}

export async function quitarAplazado(
  partidoId: string
): Promise<{ error?: string }> {
  if (!(await isAuthenticated())) {
    return { error: "No autorizado" };
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("estados_partido")
    .delete()
    .eq("partido_id", partidoId);

  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  return {};
}

export async function borrarResultado(
  partidoId: string
): Promise<{ error?: string }> {
  if (!(await isAuthenticated())) {
    return { error: "No autorizado" };
  }

  const supabase = createAdminClient();
  const { error } = await supabase
    .from("resultados")
    .delete()
    .eq("partido_id", partidoId);

  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  return {};
}
