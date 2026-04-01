import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { jornadas as jornadasStaticas } from "../../../data/partidos";
import { logosEquipos } from "../../../data/equipos";
import { Calendar, MapPin, User, Trophy } from "lucide-react";
import { getJornadasConResultados } from "@/lib/queries";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return jornadasStaticas
    .flatMap((jornada) => jornada.partidos)
    .map((partido) => ({ id: partido.id }));
}

export default async function PartidoDetallePage({ params }: Props) {
  const { id } = await params;

  const jornadas = await getJornadasConResultados();
  const partido = jornadas
    .flatMap((jornada) => jornada.partidos)
    .find((p) => p.id === id);

  if (!partido || partido.estado !== "Finalizado") {
    notFound();
  }

  const [golesLocalStr, golesVisitanteStr] = partido.resultado!.split("-");
  const golesLocal = Number(golesLocalStr);
  const golesVisitante = Number(golesVisitanteStr);
  const localGana = golesLocal > golesVisitante;
  const visitanteGana = golesVisitante > golesLocal;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      {/* Header Banner */}
      <div className="bg-[#091f36] pt-8 sm:pt-12 pb-24 sm:pb-32 px-4 sm:px-6 text-center border-b border-indigo-900/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply pointer-events-none"></div>
        <Link
          href="/jornadas"
          className="relative z-10 inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wide text-blue-200 hover:text-yellow-400 transition-colors mb-6 sm:mb-8 bg-white/5 px-4 py-2 rounded-full border border-white/10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Volver a jornadas
        </Link>

        {/* Teams & Score */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          {/* Local */}
          <div className={`flex flex-col items-center gap-2 sm:gap-3 transition-opacity ${visitanteGana ? "opacity-50" : ""}`}>
            <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center p-2 sm:p-3 shadow-xl">
              <Image src={logosEquipos[partido.local]} alt={partido.local} width={80} height={80} className="h-full w-full object-contain" />
            </div>
            <span className={`text-sm sm:text-xl font-black uppercase tracking-tight text-center leading-tight max-w-[120px] sm:max-w-[160px] ${localGana ? "text-yellow-400" : "text-white"}`}>
              {partido.local}
            </span>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-2 sm:gap-3 rounded-2xl bg-white/10 border border-white/20 px-4 sm:px-8 py-2 sm:py-4 backdrop-blur-sm shadow-2xl">
              <span className="text-4xl sm:text-6xl font-black text-white tabular-nums">{golesLocalStr}</span>
              <span className="text-2xl sm:text-4xl font-black text-white/40">-</span>
              <span className="text-4xl sm:text-6xl font-black text-white tabular-nums">{golesVisitanteStr}</span>
            </div>
            {partido.dia && (
              <span className="text-[10px] sm:text-xs font-medium text-blue-200 uppercase tracking-widest mt-1">
                {partido.dia}{partido.hora ? ` · ${partido.hora}` : ""}
              </span>
            )}
          </div>

          {/* Visitante */}
          <div className={`flex flex-col items-center gap-2 sm:gap-3 transition-opacity ${localGana ? "opacity-50" : ""}`}>
            <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center p-2 sm:p-3 shadow-xl">
              <Image src={logosEquipos[partido.visitante]} alt={partido.visitante} width={80} height={80} className="h-full w-full object-contain" />
            </div>
            <span className={`text-sm sm:text-xl font-black uppercase tracking-tight text-center leading-tight max-w-[120px] sm:max-w-[160px] ${visitanteGana ? "text-yellow-400" : "text-white"}`}>
              {partido.visitante}
            </span>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-4xl px-3 sm:px-6 -mt-10 sm:-mt-14 relative z-10">
        <div className="rounded-2xl sm:rounded-[2rem] border border-slate-100 bg-white p-4 sm:p-8 shadow-xl shadow-[#0b4a6f]/5">

          {/* Meta info */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-10 pb-6 sm:pb-8 border-b border-slate-100">
            {partido.campo && (
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 border border-slate-200 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Campo {partido.campo}
              </div>
            )}
            {partido.arbitra && (
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 border border-slate-200 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-600">
                <User className="w-3.5 h-3.5 text-slate-400" />
                Arbitra: {partido.arbitra}
              </div>
            )}
            {partido.mvp && (
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-yellow-50 border border-yellow-200 px-3 py-1.5 text-xs sm:text-sm font-bold text-yellow-800">
                <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                MVP: {partido.mvp}
              </div>
            )}
          </div>

          {/* Goals */}
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {/* Local goals */}
            <div>
              <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-[#0b4a6f] mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-yellow-400 rounded-full inline-block"></span>
                {partido.local}
              </h2>
              <div className="space-y-2 sm:space-y-3">
                {partido.resumen?.local.map((gol, index) => (
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

            {/* Visitante goals */}
            <div>
              <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-[#0b4a6f] mb-4 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-yellow-400 rounded-full inline-block"></span>
                {partido.visitante}
              </h2>
              <div className="space-y-2 sm:space-y-3">
                {partido.resumen?.visitante.map((gol, index) => (
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
        </div>
      </section>
    </div>
  );
}
