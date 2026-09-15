import EstadisticasTabs from "@/components/EstadisticasTabs";
import PageHeader from "@/components/PageHeader";
import { contarEstadistica } from "@/lib/estadisticas";
import { crearMapaSplit3, getSplit3, partidosFaseFinal } from "@/lib/split3";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function EstadisticasPage() {
  const split = await getSplit3();
  const mapa = crearMapaSplit3();
  const liguilla = split.jornadas.flatMap((jornada) => jornada.partidos);
  const faseFinal = partidosFaseFinal(split);

  const goleadoresFase = contarEstadistica(faseFinal, "jugador", mapa);
  const asistentesFase = contarEstadistica(faseFinal, "asistente", mapa);
  const mvpsFase = contarEstadistica(faseFinal, "mvp", mapa);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      <PageHeader kicker="Split 3" title="Estadísticas" subtitle="Goleadores, asistencias y MVPs" />

      <section className="mx-auto max-w-6xl px-3 sm:px-6 -mt-10 sm:-mt-12">
        <EstadisticasTabs
          goleadores={contarEstadistica(liguilla, "jugador", mapa)}
          asistentes={contarEstadistica(liguilla, "asistente", mapa)}
          mvps={contarEstadistica(liguilla, "mvp", mapa)}
          goleadoresPlayoff={goleadoresFase}
          asistentesPlayoff={asistentesFase}
          mvpsPlayoff={mvpsFase}
          hayDatosPlayoff={goleadoresFase.length > 0 || asistentesFase.length > 0 || mvpsFase.length > 0}
          etiquetas={{ liga: "Liguilla", playoff: "Fase final" }}
          rutaJugadores="/jugadores"
        />
      </section>
    </div>
  );
}
