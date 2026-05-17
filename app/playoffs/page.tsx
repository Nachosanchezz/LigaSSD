import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { logosEquipos } from "@/data/equipos";
import { getPlayoffConResultados } from "@/lib/queries";
import type { PartidoPlayoff } from "@/data/playoffs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function getScore(resultado?: string) {
  if (!resultado) return { local: undefined, visitante: undefined };
  const [l, v] = resultado.split("-").map(Number);
  return { local: l, visitante: v };
}

function TeamSlot({
  name,
  seed,
  isWinner,
  isBye,
  score,
}: {
  name: string;
  seed?: number;
  isWinner?: boolean;
  isBye?: boolean;
  score?: number;
}) {
  const logo = logosEquipos[name];
  const isTBD = !logo;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2.5 transition-colors ${
        isWinner ? "bg-yellow-50/60" : ""
      }`}
    >
      {seed !== undefined && (
        <span
          className={`text-[10px] font-black w-4 text-center shrink-0 ${
            isWinner ? "text-yellow-600" : "text-slate-400"
          }`}
        >
          {seed}
        </span>
      )}
      <div
        className={`h-6 w-6 shrink-0 rounded-full border flex items-center justify-center overflow-hidden ${
          isTBD
            ? "bg-slate-100 border-slate-200"
            : "bg-white border-slate-200 p-0.5"
        }`}
      >
        {logo ? (
          <Image
            src={logo}
            alt={name}
            width={22}
            height={22}
            className="h-full w-full object-contain"
          />
        ) : (
          <span className="text-[8px] text-slate-400 font-black">?</span>
        )}
      </div>
      <span
        className={`flex-1 text-[11px] font-bold truncate leading-tight ${
          isTBD
            ? "text-slate-400 italic"
            : isWinner
            ? "text-slate-900"
            : "text-slate-700"
        }`}
      >
        {name}
      </span>
      {isBye && (
        <span className="text-[9px] font-black bg-yellow-400 text-[#091f36] px-1.5 py-0.5 rounded shrink-0">
          BYE
        </span>
      )}
      {score !== undefined && (
        <span
          className={`text-sm font-black font-mono w-5 text-center shrink-0 ${
            isWinner ? "text-slate-900" : "text-slate-400"
          }`}
        >
          {score}
        </span>
      )}
    </div>
  );
}

function MatchCard({
  match,
  label,
}: {
  match: PartidoPlayoff;
  label?: string;
}) {
  const { local: scoreLocal, visitante: scoreVisitante } = getScore(
    match.resultado
  );
  const localWins =
    scoreLocal !== undefined &&
    scoreVisitante !== undefined &&
    scoreLocal > scoreVisitante;
  const visitanteWins =
    scoreLocal !== undefined &&
    scoreVisitante !== undefined &&
    scoreVisitante > scoreLocal;

  return (
    <div className="w-full">
      {label && (
        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 text-center mb-1.5">
          {label}
        </p>
      )}
      <div
        className={`bg-white rounded-xl border-2 overflow-hidden shadow-sm ${
          match.estado === "Finalizado"
            ? "border-[#0b4a6f]/30 shadow-[#0b4a6f]/10"
            : "border-slate-100"
        }`}
      >
        {match.estado === "Finalizado" && match.resultado && (
          <div className="bg-gradient-to-r from-[#091f36] to-[#0b4a6f] text-center px-3 py-1">
            <span className="text-white font-black text-sm tracking-widest">
              {match.resultado}
            </span>
          </div>
        )}
        {match.estado === "Programado" && match.dia && (
          <div className="bg-slate-50 border-b border-slate-100 px-3 py-1 text-center">
            <span className="text-[10px] text-slate-500 font-medium">
              {match.dia}
              {match.hora ? ` · ${match.hora}` : ""}
            </span>
          </div>
        )}
        <TeamSlot
          name={match.local}
          seed={match.seedLocal}
          isWinner={localWins || match.ganador === match.local}
          isBye={match.localEsBye}
          score={scoreLocal}
        />
        <div className="border-t border-slate-100 mx-0" />
        <TeamSlot
          name={match.visitante}
          seed={match.seedVisitante}
          isWinner={visitanteWins || match.ganador === match.visitante}
          score={scoreVisitante}
        />
      </div>
    </div>
  );
}

function RoundConnector() {
  return (
    <div className="flex flex-col items-center justify-around self-stretch py-8 w-8 shrink-0">
      <svg
        viewBox="0 0 24 24"
        className="w-5 h-5 text-slate-300 mt-auto mb-auto"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default async function PlayoffsPage() {
  const { cuartos: qf, semifinales: sf, final: fin } = await getPlayoffConResultados();

  const champion =
    fin.estado === "Finalizado" ? fin.ganador ?? null : null;
  const championLogo = champion ? logosEquipos[champion] : null;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      <PageHeader title="Playoffs" subtitle="Fase Final · Liga SSD" />

      <section className="mx-auto max-w-6xl px-3 sm:px-6 -mt-10 sm:-mt-12 relative z-10">

        {/* DESKTOP BRACKET */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-3xl shadow-xl shadow-[#0b4a6f]/5 border border-slate-100 p-6 xl:p-8">

            {/* Column headers */}
            <div className="grid grid-cols-[1fr_32px_1fr_32px_1fr_32px_auto] mb-6">
              <div className="text-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                  Cuartos de Final
                </span>
              </div>
              <div />
              <div className="text-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                  Semifinales
                </span>
              </div>
              <div />
              <div className="text-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                  Final
                </span>
              </div>
              <div />
              <div className="text-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                  Campeón
                </span>
              </div>
            </div>

            {/* Bracket body */}
            <div className="flex items-stretch min-h-[520px]">

              {/* QF Column */}
              <div className="flex-1 flex flex-col">
                {/* Upper pair → SF2 */}
                <div className="flex-1 flex flex-col justify-around py-3 gap-3 border-r-2 border-slate-100 relative">
                  {/* Right connector lines: upper half */}
                  <div className="absolute right-0 top-1/4 bottom-1/2 translate-x-px border-r-2 border-slate-100" />
                  <div className="absolute right-0 top-1/2 h-px w-4 bg-slate-100" />
                  <MatchCard match={qf[0]} />
                  <MatchCard match={qf[1]} />
                </div>
                {/* Lower pair → SF1 */}
                <div className="flex-1 flex flex-col justify-around py-3 gap-3 border-r-2 border-t-2 border-slate-100 relative">
                  {/* Right connector lines: lower half */}
                  <div className="absolute right-0 bottom-1/4 top-1/2 translate-x-px border-r-2 border-slate-100" />
                  <div className="absolute right-0 bottom-1/2 h-px w-4 bg-slate-100" />
                  {/* BYE card for Bodø Dream */}
                  <div className="bg-white rounded-xl border-2 border-yellow-200/70 overflow-hidden shadow-sm">
                    <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-300/10 border-b border-yellow-200/50 px-3 py-1 text-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-yellow-700">
                        Pase Directo
                      </span>
                    </div>
                    <TeamSlot
                      name="BODØ DREAM"
                      seed={1}
                      isBye
                      isWinner
                    />
                  </div>
                  <MatchCard match={qf[2]} />
                </div>
              </div>

              {/* Connector 1 */}
              <div className="w-8 shrink-0 flex flex-col">
                <div className="flex-1 flex items-center justify-center border-b-2 border-slate-100">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* SF Column */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1 flex items-center px-2 border-r-2 border-slate-100 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-4 bg-slate-100" />
                  <MatchCard match={sf[0]} />
                </div>
                <div className="flex-1 flex items-center px-2 border-r-2 border-t-2 border-slate-100 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-4 bg-slate-100" />
                  <MatchCard match={sf[1]} />
                </div>
              </div>

              {/* Connector 2 */}
              <div className="w-8 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Final Column */}
              <div className="flex-1 flex items-center px-2">
                <MatchCard match={fin} />
              </div>

              {/* Connector 3 */}
              <div className="w-8 shrink-0 flex items-center justify-center">
                {fin.estado === "Finalizado" && champion && (
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>

              {/* Champion */}
              <div className="w-36 flex items-center justify-center">
                {champion && championLogo ? (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="text-4xl">🏆</div>
                    <div className="h-14 w-14 rounded-full bg-yellow-50 border-2 border-yellow-200 p-1 shadow-lg shadow-yellow-200/50">
                      <Image src={championLogo} alt={champion} width={48} height={48} className="h-full w-full object-contain" />
                    </div>
                    <span className="text-xs font-black uppercase text-slate-800 leading-tight text-center">{champion}</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-center opacity-30">
                    <div className="text-3xl">🏆</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Por</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Definir</span>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* MOBILE / TABLET VIEW */}
        <div className="lg:hidden space-y-6">

          {/* Cuartos */}
          <div className="bg-white rounded-2xl shadow-lg shadow-[#0b4a6f]/5 border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#091f36] to-[#0b4a6f] px-5 py-3.5 flex items-center gap-2">
              <span className="w-1 h-5 bg-yellow-400 rounded-full shrink-0" />
              <h2 className="text-sm font-black uppercase tracking-tight text-white">Cuartos de Final</h2>
            </div>
            <div className="p-4 space-y-3">
              {/* Bye */}
              <div className="bg-yellow-50/60 rounded-xl border-2 border-yellow-200/70 overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-300/10 border-b border-yellow-200/50 px-3 py-1 text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-yellow-700">Pase Directo a Semifinales</span>
                </div>
                <TeamSlot name="BODØ DREAM" seed={1} isBye isWinner />
              </div>
              {qf.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-slate-300 rotate-90" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Semifinales */}
          <div className="bg-white rounded-2xl shadow-lg shadow-[#0b4a6f]/5 border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#091f36] to-[#0b4a6f] px-5 py-3.5 flex items-center gap-2">
              <span className="w-1 h-5 bg-yellow-400 rounded-full shrink-0" />
              <h2 className="text-sm font-black uppercase tracking-tight text-white">Semifinales</h2>
            </div>
            <div className="p-4 space-y-3">
              <MatchCard match={sf[1]} label="SF1 — 1º vs Gan. QF3" />
              <MatchCard match={sf[0]} label="SF2 — Gan. QF1 vs Gan. QF2" />
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-slate-300 rotate-90" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Final */}
          <div className="bg-white rounded-2xl shadow-lg shadow-[#0b4a6f]/5 border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#091f36] to-[#0b4a6f] px-5 py-3.5 flex items-center gap-2">
              <span className="w-1 h-5 bg-yellow-400 rounded-full shrink-0" />
              <h2 className="text-sm font-black uppercase tracking-tight text-white">Final</h2>
            </div>
            <div className="p-4">
              <MatchCard match={fin} />
            </div>
          </div>

          {/* Champion */}
          {champion && championLogo && (
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-6 text-center shadow-xl shadow-yellow-400/30">
              <div className="text-4xl mb-3">🏆</div>
              <div className="mx-auto h-16 w-16 rounded-full bg-white/30 border-2 border-white/50 p-1.5 mb-3">
                <Image src={championLogo} alt={champion} width={52} height={52} className="h-full w-full object-contain" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-yellow-900/70 mb-1">Campeón</p>
              <p className="text-lg font-black uppercase text-[#091f36]">{champion}</p>
            </div>
          )}
        </div>

        {/* Info legend */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="w-3 h-3 rounded bg-yellow-400 shrink-0" />
            Pase directo a semifinales (1er clasificado)
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="w-3 h-3 rounded border-2 border-slate-200 shrink-0" />
            Partido pendiente
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="w-3 h-3 rounded bg-gradient-to-r from-[#091f36] to-[#0b4a6f] shrink-0" />
            Partido jugado
          </div>
        </div>

      </section>
    </div>
  );
}
