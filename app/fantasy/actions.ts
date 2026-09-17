"use server";

import { revalidatePath } from "next/cache";
import { mercado, motivoInvalido } from "@/lib/fantasy";
import {
  getHashDePin,
  getJornadasFantasy,
  getMercadoDeJornada,
  getSesion,
  hayBaseDeDatos,
} from "@/lib/fantasy-datos";
import { abrirSesion, cerrarSesion, hashDePin, pinCorrecto } from "@/lib/fantasy-sesion";
import { createAdminClient } from "@/lib/supabase-server";

const PIN_VALIDO = /^\d{4}$/;

/**
 * Entrar al fantasy. La primera vez que alguien entra con su nombre, el PIN
 * que escribe se queda como el suyo; a partir de ahí tiene que coincidir.
 */
export async function entrar(personaId: string, pin: string): Promise<{ error?: string }> {
  if (!hayBaseDeDatos()) return { error: "El fantasy no está conectado todavía" };
  if (!mercado().some((jugador) => jugador.id === personaId)) {
    return { error: "El fantasy es solo para los jugadores de la liga" };
  }
  if (!PIN_VALIDO.test(pin)) return { error: "El PIN son 4 números" };

  const guardado = await getHashDePin(personaId);

  if (!guardado) {
    const hash = hashDePin(personaId, pin);
    const { error } = await createAdminClient()
      .from("fantasy_usuarios")
      .insert({ persona_id: personaId, pin_hash: hash });
    if (error) return { error: `No se ha podido crear tu cuenta: ${error.message}` };
    await abrirSesion(personaId, hash);
  } else {
    if (!pinCorrecto(personaId, pin, guardado)) return { error: "Ese PIN no es el tuyo" };
    await abrirSesion(personaId, guardado);
  }

  revalidatePath("/fantasy", "layout");
  return {};
}

export async function salir(): Promise<void> {
  await cerrarSesion();
  revalidatePath("/fantasy", "layout");
}

/** Guardar el cinco de una jornada, siempre que siga abierta */
export async function guardarCinco(
  jornada: number,
  jugadores: string[],
  capitan: string
): Promise<{ error?: string }> {
  const sesion = await getSesion();
  if (!sesion) return { error: "Tienes que entrar con tu nombre y tu PIN" };

  const jornadas = await getJornadasFantasy();
  const elegida = jornadas.find((candidata) => candidata.numero === jornada);
  if (!elegida) return { error: "Esa jornada no existe" };
  if (!elegida.abierta) return { error: "Esa jornada ya ha empezado: el mercado está cerrado" };

  const precios = new Map((await getMercadoDeJornada(jornada)).map((jugador) => [jugador.id, jugador]));
  const problema = motivoInvalido(jugadores, capitan, precios);
  if (problema) return { error: problema };

  const { error } = await createAdminClient().from("fantasy_equipos").upsert(
    {
      persona_id: sesion.personaId,
      jornada,
      jugadores,
      capitan,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "persona_id,jornada" }
  );
  if (error) return { error: `No se ha podido guardar: ${error.message}` };

  revalidatePath("/fantasy", "layout");
  return {};
}
