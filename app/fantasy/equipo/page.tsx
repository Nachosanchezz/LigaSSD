import { redirect } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { REGLAS } from "@/data/fantasy";
import { textoDeInstante } from "@/lib/fecha";
import { getCinco, getJornadaActual, getMercadoConPuntos, getSesion } from "@/lib/fantasy-datos";
import SelectorCinco, { type JugadorSelector } from "../SelectorCinco";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ElegirCincoPage() {
  const sesion = await getSesion();
  if (!sesion) redirect("/fantasy");

  const jornada = await getJornadaActual();
  const [jugadores, cinco] = await Promise.all([
    getMercadoConPuntos(),
    getCinco(sesion.personaId, jornada.numero),
  ]);

  // Contra quién juega cada equipo esta jornada, para que se vea al fichar
  const rivales = new Map<string, string>();
  for (const partido of jornada.partidos) {
    rivales.set(partido.local, `vs ${partido.visitante}`);
    rivales.set(partido.visitante, `en casa de ${partido.local}`);
  }

  const conRival: JugadorSelector[] = jugadores.map((jugador) => ({
    ...jugador,
    rival: rivales.get(jugador.equipo),
  }));

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <PageHeader
        kicker={`Fantasy · Jornada ${jornada.numero}`}
        title="Tu cinco"
        subtitle={
          jornada.cierre
            ? `${REGLAS.presupuesto} M€ · cierra el ${textoDeInstante(jornada.cierre)}`
            : `${REGLAS.presupuesto} M€ de presupuesto`
        }
      />
      <div className="relative z-10 mx-auto -mt-10 max-w-2xl px-3 sm:-mt-12 sm:px-6">
        <SelectorCinco
          jornada={jornada.numero}
          abierta={jornada.abierta}
          jugadores={conRival}
          inicial={cinco ? { jugadores: cinco.jugadores, capitan: cinco.capitan } : undefined}
        />
      </div>
    </div>
  );
}
