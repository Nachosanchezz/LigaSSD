import JornadasLista from "@/components/JornadasLista";
import PageHeader from "@/components/PageHeader";
import { logosEquipos } from "@/data/split2/equipos";
import { getJornadasConResultados } from "@/lib/queries";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function JornadasPage() {
  const jornadas = await getJornadasConResultados();

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      <PageHeader kicker="Split 2" title="Jornadas" subtitle="Calendario y resultados" />

      <section className="mx-auto max-w-5xl px-3 sm:px-6 -mt-10 sm:-mt-12 relative z-10">
        <JornadasLista
          jornadas={jornadas}
          rutaActas="/split2/partidos"
          escudo={(equipo) => ({ logo: logosEquipos[equipo] })}
        />
      </section>
    </div>
  );
}
