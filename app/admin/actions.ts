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

type GuardarResultadoInput = {
  partidoId: string;
  resultado: string;
  mvp?: string;
  golesLocal: GolData[];
  golesVisitante: GolData[];
};

export async function guardarResultado(
  data: GuardarResultadoInput
): Promise<{ error?: string }> {
  if (!(await isAuthenticated())) {
    return { error: "No autorizado" };
  }

  const { partidoId, resultado, mvp, golesLocal, golesVisitante } = data;

  if (!resultado.match(/^\d+-\d+$/)) {
    return { error: "Formato de resultado inválido. Usa el formato: 3-2" };
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
