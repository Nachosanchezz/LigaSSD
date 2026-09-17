// ⚠️ Solo para uso en el servidor — nunca en el cliente
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "fantasy-sesion";
const DIAS = 60;

/**
 * El PIN nunca se guarda ni viaja en claro: se guarda su HMAC. Si algún día
 * conviene rotar la clave, basta con poner FANTASY_SECRET en el entorno (y
 * todos tendrán que volver a elegir PIN).
 */
function secreto(): string {
  const valor = process.env.FANTASY_SECRET ?? process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!valor) throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY (o FANTASY_SECRET) en el entorno");
  return valor;
}

function firmar(texto: string): string {
  return createHmac("sha256", secreto()).update(texto).digest("hex");
}

export function hashDePin(personaId: string, pin: string): string {
  return firmar(`pin:${personaId}:${pin}`);
}

export function pinCorrecto(personaId: string, pin: string, hash: string): boolean {
  const esperado = Buffer.from(hashDePin(personaId, pin));
  const guardado = Buffer.from(hash);
  return esperado.length === guardado.length && timingSafeEqual(esperado, guardado);
}

// La firma de la sesión incluye el hash del PIN: si alguien cambia de PIN,
// las sesiones abiertas con el anterior dejan de valer.
export async function abrirSesion(personaId: string, hashPin: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE, `${personaId}.${firmar(`sesion:${personaId}:${hashPin}`)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * DIAS,
  });
}

export async function cerrarSesion(): Promise<void> {
  (await cookies()).delete(COOKIE);
}

/** Lo que trae la cookie, sin comprobar todavía contra la base de datos */
export async function cookieDeSesion(): Promise<{ personaId: string; firma: string } | null> {
  const valor = (await cookies()).get(COOKIE)?.value;
  const [personaId, firma] = valor?.split(".") ?? [];
  return personaId && firma ? { personaId, firma } : null;
}

export function firmaValida(personaId: string, hashPin: string, firma: string): boolean {
  const esperada = Buffer.from(firmar(`sesion:${personaId}:${hashPin}`));
  const recibida = Buffer.from(firma);
  return esperada.length === recibida.length && timingSafeEqual(esperada, recibida);
}
