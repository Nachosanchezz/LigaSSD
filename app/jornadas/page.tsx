import Link from "next/link";
import JornadasLista from "@/components/JornadasLista";
import PageHeader from "@/components/PageHeader";
import { escudoSplit3, getSplit3 } from "@/lib/split3";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function JornadasPage() {
  const { jornadas } = await getSplit3();

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      <PageHeader kicker="Split 3" title="Jornadas" subtitle="Calendario y resultados de la liguilla" />

      <section className="mx-auto max-w-5xl px-3 sm:px-6 -mt-10 sm:-mt-12 relative z-10 space-y-8">
        <JornadasLista jornadas={jornadas} rutaActas="/partidos" escudo={escudoSplit3} />

        <Link
          href="/playoffs"
          className="block rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm transition hover:border-[#0b4a6f]/30 hover:shadow-md"
        >
          <span className="text-sm font-black uppercase tracking-wide text-[#0b4a6f]">Después de la liguilla: play-in y playoff →</span>
        </Link>
      </section>
    </div>
  );
}
