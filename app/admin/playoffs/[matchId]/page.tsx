import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isAuthenticated } from "../../actions";
import { getPlayoffConResultados } from "@/lib/queries";
import ResultadoForm from "../../[partidoId]/ResultadoForm";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata = { robots: "noindex" };

const PLAYOFF_LABELS: Record<string, string> = {
  qf1: "Cuartos de Final 1 — Torre Beldes vs Açai Boys",
  qf2: "Cuartos de Final 2 — Filósofos vs Atalaya",
  qf3: "Cuartos de Final 3 — Old School vs Spiti2",
  sf1: "Semifinal 1 — Bodø Dream vs Gan. QF3",
  sf2: "Semifinal 2 — Gan. QF1 vs Gan. QF2",
  final: "Gran Final",
};

type Props = {
  params: Promise<{ matchId: string }>;
};

export default async function AdminPlayoffMatchPage({ params }: Props) {
  const { matchId } = await params;

  if (!(await isAuthenticated())) redirect("/admin");

  const { cuartos, semifinales, final } = await getPlayoffConResultados();
  const all = [...cuartos, ...semifinales, final];
  const match = all.find((m) => m.id === matchId);

  if (!match) notFound();

  const teamsKnown =
    !match.local.startsWith("Gan.") && !match.visitante.startsWith("Gan.");

  const resultadoActual =
    match.estado === "Finalizado" && match.resultado
      ? {
          resultado: match.resultado,
          mvp: match.mvp,
          resumen: match.resumen,
        }
      : undefined;

  return (
    <div className="min-h-screen bg-slate-100 pb-16">
      {/* Header */}
      <div className="bg-[#091f36] px-4 py-5 shadow-lg">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-blue-300 hover:text-yellow-400 text-xs font-bold uppercase tracking-wide transition mb-3"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver
        </Link>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded">
            Playoff
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300">
            {PLAYOFF_LABELS[matchId]?.split(" — ")[0] ?? matchId.toUpperCase()}
          </span>
        </div>
        <h1 className="text-lg font-black text-white uppercase tracking-tight leading-tight">
          {match.local} vs {match.visitante}
        </h1>
        {match.dia && (
          <p className="text-blue-300 text-xs mt-0.5">
            {match.dia}
            {match.hora ? ` · ${match.hora}` : ""}
          </p>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-6">
        {!teamsKnown ? (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-8 text-center">
            <div className="text-3xl mb-3">⏳</div>
            <p className="text-amber-800 font-black text-sm uppercase tracking-wide mb-1">
              Equipos no determinados
            </p>
            <p className="text-amber-600 text-sm">
              Este partido no se puede editar hasta que se conozcan los equipos participantes.
              Introduce primero los resultados de los partidos previos.
            </p>
            <Link
              href="/admin"
              className="mt-4 inline-block rounded-xl bg-[#0b4a6f] text-white font-black px-6 py-2.5 text-sm uppercase tracking-wide hover:bg-[#091f36] transition"
            >
              Volver al admin
            </Link>
          </div>
        ) : (
          <ResultadoForm
            partidoId={matchId}
            local={match.local}
            visitante={match.visitante}
            estadoActual={match.estado}
            resultadoActual={resultadoActual}
          />
        )}
      </div>
    </div>
  );
}
