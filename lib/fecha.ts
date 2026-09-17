/**
 * Las fechas del calendario ("2026-09-22T20:00") están escritas en hora de
 * Torrelodones, sin zona. El navegador de quien mira la web ya está en esa
 * hora, pero el servidor corre en UTC: si lo interpretara tal cual, el cierre
 * del fantasy se adelantaría dos horas. Y a mitad de temporada, el 25 de
 * octubre, España cambia la hora, así que tampoco vale sumar un desfase fijo.
 */

const FORMATO_MADRID = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/Madrid",
  hour12: false,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

/** Cuánto va Madrid por delante de UTC en ese instante concreto */
function desfaseMadrid(instante: Date): number {
  const partes = Object.fromEntries(
    FORMATO_MADRID.formatToParts(instante).map((parte) => [parte.type, parte.value])
  );
  const comoUtc = Date.UTC(
    Number(partes.year),
    Number(partes.month) - 1,
    Number(partes.day),
    Number(partes.hour) % 24,
    Number(partes.minute),
    Number(partes.second)
  );
  return comoUtc - instante.getTime();
}

/** "2026-09-22T20:00" (hora de la liga) → el instante real en el que se juega */
export function instanteDeLaLiga(iso: string): Date {
  const conSegundos = iso.length === 16 ? `${iso}:00` : iso;
  const comoSiFueraUtc = new Date(`${conSegundos}Z`);
  // Dos pasadas: la primera da un desfase aproximado y la segunda lo confirma
  // ya sobre la fecha correcta, que es lo que importa la semana del cambio de hora
  const aproximado = new Date(comoSiFueraUtc.getTime() - desfaseMadrid(comoSiFueraUtc));
  return new Date(comoSiFueraUtc.getTime() - desfaseMadrid(aproximado));
}

const FECHA_LARGA = new Intl.DateTimeFormat("es-ES", {
  timeZone: "Europe/Madrid",
  weekday: "long",
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
});

/** "martes, 22 de septiembre, 20:00", siempre en hora de la liga */
export function textoDeInstante(fecha: Date): string {
  return FECHA_LARGA.format(fecha).replace(",", "").replace(" a las", " ·");
}
