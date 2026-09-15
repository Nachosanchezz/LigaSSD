import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { logosEquipos } from "@/data/split2/equipos";
import { getPlayoffConResultados } from "@/lib/queries";
import { Trophy } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const RONDA_LABELS: Record<string, string> = {
  qf1: "Cuartos de Final",
  qf2: "Cuartos de Final",
  qf3: "Cuartos de Final",
  sf1: "Semifinal",
  sf2: "Semifinal",
  final: "Gran Final",
};

type Props = {
  params: Promise<{ matchId: string }>;
};

export default async function PlayoffMatchPage({ params }: Props) {
  const { matchId } = await params;

  const { cuartos, semifinales, final } = await getPlayoffConResultados();
  const all = [...cuartos, ...semifinales, final];
  const match = all.find((m) => m.id === matchId);

  if (!match || match.estado !== "Finalizado" || !match.resultado) {
    notFound();
  }

  const [golesLocalStr, golesVisitanteStr] = match.resultado.split("-");
  const golesLocal = Number(golesLocalStr);
  const golesVisitante = Number(golesVisitanteStr);
  const localGana = golesLocal > golesVisitante;
  const visitanteGana = golesVisitante > golesLocal;

  const logoLocal = logosEquipos[match.local];
  const logoVisitante = logosEquipos[match.visitante];
  const ronda = RONDA_LABELS[matchId] ?? "Playoff";

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      {/* Header */}
      <div className="bg-[#091f36] pt-8 sm:pt-12 pb-24 sm:pb-32 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply pointer-events-none" />

        <Link
          href="/split2/playoffs"
          className="relative z-10 inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wide text-blue-200 hover:text-yellow-400 transition-colors mb-6 sm:mb-8 bg-white/5 px-4 py-2 rounded-full border border-white/10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a playoffs
        </Link>

        <div className="relative z-10 mb-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
            {ronda}
          </span>
        </div>

        {/* Teams & Score */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          {/* Local */}
          <div className={`flex flex-col items-center gap-2 sm:gap-3 transition-opacity ${visitanteGana ? "opacity-50" : ""}`}>
            <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center p-2 sm:p-3 shadow-xl">
              {logoLocal ? (
                <Image src={logoLocal} alt={match.local} width={80} height={80} className="h-full w-full object-contain" />
              ) : (
                <span className="text-white font-black text-xl">{match.local.charAt(0)}</span>
              )}
            </div>
            <span className={`text-sm sm:text-xl font-black uppercase tracking-tight text-center leading-tight max-w-[120px] sm:max-w-[160px] ${localGana ? "text-yellow-400" : "text-white"}`}>
              {match.local}
            </span>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-2 sm:gap-3 rounded-2xl bg-white/10 border border-white/20 px-4 sm:px-8 py-2 sm:py-4 backdrop-blur-sm shadow-2xl">
              <span className="text-4xl sm:text-6xl font-black text-white tabular-nums">{golesLocalStr}</span>
              <span className="text-2xl sm:text-4xl font-black text-white/40">-</span>
              <span className="text-4xl sm:text-6xl font-black text-white tabular-nums">{golesVisitanteStr}</span>
            </div>
            {match.dia && (
              <span className="text-[10px] sm:text-xs font-medium text-blue-200 uppercase tracking-widest mt-1">
                {match.dia}{match.hora ? ` · ${match.hora}` : ""}
              </span>
            )}
          </div>

          {/* Visitante */}
          <div className={`flex flex-col items-center gap-2 sm:gap-3 transition-opacity ${localGana ? "opacity-50" : ""}`}>
            <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center p-2 sm:p-3 shadow-xl">
              {logoVisitante ? (
                <Image src={logoVisitante} alt={match.visitante} width={80} height={80} className="h-full w-full object-contain" />
              ) : (
                <span className="text-white font-black text-xl">{match.visitante.charAt(0)}</span>
              )}
            </div>
            <span className={`text-sm sm:text-xl font-black uppercase tracking-tight text-center leading-tight max-w-[120px] sm:max-w-[160px] ${visitanteGana ? "text-yellow-400" : "text-white"}`}>
              {match.visitante}
            </span>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-4xl px-3 sm:px-6 -mt-10 sm:-mt-14 relative z-10">
        <div className="rounded-2xl sm:rounded-[2rem] border border-slate-100 bg-white p-4 sm:p-8 shadow-xl shadow-[#0b4a6f]/5">

          {/* MVP */}
          {match.mvp && (
            <div className="flex justify-center mb-6 sm:mb-10 pb-6 sm:pb-8 border-b border-slate-100">
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-yellow-50 border border-yellow-200 px-3 py-1.5 text-xs sm:text-sm font-bold text-yellow-800">
                <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                MVP: {match.mvp}
              </div>
            </div>
          )}

          {/* Goals */}
          {match.resumen ? (
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-[#0b4a6f] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-yellow-400 rounded-full inline-block" />
                  {match.local}
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  {match.resumen.local.length === 0 ? (
                    <p className="text-sm text-slate-400 italic px-2">Sin goles</p>
                  ) : match.resumen.local.map((gol, index) => (
                    <div key={index} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0b4a6f]/10 text-[10px] font-black text-[#0b4a6f]">
                        {gol.minuto ? `${gol.minuto}'` : "⚽"}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm sm:text-base">{gol.jugador}</p>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                          Asistencia: {gol.asistente ?? "Sin asistencia"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-[#0b4a6f] mb-4 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-yellow-400 rounded-full inline-block" />
                  {match.visitante}
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  {match.resumen.visitante.length === 0 ? (
                    <p className="text-sm text-slate-400 italic px-2">Sin goles</p>
                  ) : match.resumen.visitante.map((gol, index) => (
                    <div key={index} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0b4a6f]/10 text-[10px] font-black text-[#0b4a6f]">
                        {gol.minuto ? `${gol.minuto}'` : "⚽"}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm sm:text-base">{gol.jugador}</p>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                          Asistencia: {gol.asistente ?? "Sin asistencia"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-slate-400 text-sm py-8">No hay detalles de goles disponibles.</p>
          )}
        </div>
      </section>
    </div>
  );
}
