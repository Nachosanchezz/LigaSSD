import PageHeader from "@/components/PageHeader";
import { contarEstadistica } from "@/lib/estadisticas";
import { getJornadasConResultados, getPlayoffConResultados } from "@/lib/queries";
import EstadisticasTabs from "@/components/EstadisticasTabs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function EstadisticasPage() {
  const [jornadas, { cuartos, semifinales, final }] = await Promise.all([
    getJornadasConResultados(),
    getPlayoffConResultados(),
  ]);
  const partidosLiga = jornadas.flatMap((jornada) => jornada.partidos);
  const partidosPlayoff = [...cuartos, ...semifinales, final];

  const goleadoresPlayoff = contarEstadistica(partidosPlayoff, "jugador");
  const asistentesPlayoff = contarEstadistica(partidosPlayoff, "asistente");
  const mvpsPlayoff = contarEstadistica(partidosPlayoff, "mvp");

  const hayDatosPlayoff = goleadoresPlayoff.length > 0 || asistentesPlayoff.length > 0 || mvpsPlayoff.length > 0;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      <PageHeader kicker="Split 2" title="Estadísticas" subtitle="Goleadores, asistencias y MVPs" />

      <section className="mx-auto max-w-6xl px-3 sm:px-6 -mt-10 sm:-mt-12">
        <EstadisticasTabs
          goleadores={contarEstadistica(partidosLiga, "jugador")}
          asistentes={contarEstadistica(partidosLiga, "asistente")}
          mvps={contarEstadistica(partidosLiga, "mvp")}
          goleadoresPlayoff={goleadoresPlayoff}
          asistentesPlayoff={asistentesPlayoff}
          mvpsPlayoff={mvpsPlayoff}
          hayDatosPlayoff={hayDatosPlayoff}
        />
      </section>
    </div>
  );
}
