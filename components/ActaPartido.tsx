import Link from "next/link";
import { MapPin, Trophy, User } from "lucide-react";
import Escudo, { type DatosEscudo } from "@/components/Escudo";
import type { EventoGol, Partido } from "@/data/tipos";
import { ladoGanador, leerMarcador } from "@/lib/resultado";

type Props = {
  partido: Partido;
  volver: { href: string; texto: string };
  escudo: (equipo: string) => DatosEscudo;
  /** Fase del partido, p. ej. "Semifinal 1" */
  etiqueta?: string;
};

// Acta de un partido jugado, común a todos los splits: marcador (con los
// penaltis si los hubo), datos del partido y goles de cada equipo.
export default function ActaPartido({ partido, volver, escudo, etiqueta }: Props) {
  const marcador = leerMarcador(partido.resultado);
  const ganador = marcador ? ladoGanador(marcador) : null;
  const localGana = ganador === "local";
  const visitanteGana = ganador === "visitante";

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      {/* Header Banner */}
      <div className="bg-[#091f36] pt-8 sm:pt-12 pb-24 sm:pb-32 px-4 sm:px-6 text-center border-b border-indigo-900/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply pointer-events-none"></div>
        <Link
          href={volver.href}
          className="relative z-10 inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wide text-blue-200 hover:text-yellow-400 transition-colors mb-6 sm:mb-8 bg-white/5 px-4 py-2 rounded-full border border-white/10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          {volver.texto}
        </Link>

        {etiqueta && (
          <p className="relative z-10 mb-4 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-yellow-400">
            {etiqueta}
          </p>
        )}

        {/* Teams & Score */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <EquipoCabecera nombre={partido.local} gana={localGana} pierde={visitanteGana} escudo={escudo} />

          {/* Score */}
          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-2 sm:gap-3 rounded-2xl bg-white/10 border border-white/20 px-4 sm:px-8 py-2 sm:py-4 backdrop-blur-sm shadow-2xl">
              <span className="text-4xl sm:text-6xl font-black text-white tabular-nums">{marcador?.local}</span>
              <span className="text-2xl sm:text-4xl font-black text-white/40">-</span>
              <span className="text-4xl sm:text-6xl font-black text-white tabular-nums">{marcador?.visitante}</span>
            </div>
            {marcador?.penaltis && (
              <span className="text-xs sm:text-sm font-bold text-yellow-400 tabular-nums">
                Penaltis: {marcador.penaltis.local}-{marcador.penaltis.visitante}
              </span>
            )}
            {partido.dia && (
              <span className="text-[10px] sm:text-xs font-medium text-blue-200 uppercase tracking-widest mt-1">
                {partido.dia}{partido.hora ? ` · ${partido.hora}` : ""}
              </span>
            )}
          </div>

          <EquipoCabecera nombre={partido.visitante} gana={visitanteGana} pierde={localGana} escudo={escudo} />
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
            <GolesEquipo equipo={partido.local} goles={partido.resumen?.local ?? []} />
            <GolesEquipo equipo={partido.visitante} goles={partido.resumen?.visitante ?? []} />
          </div>
        </div>
      </section>
    </div>
  );
}

function EquipoCabecera({
  nombre,
  gana,
  pierde,
  escudo,
}: {
  nombre: string;
  gana: boolean;
  pierde: boolean;
  escudo: (equipo: string) => DatosEscudo;
}) {
  return (
    <div className={`flex flex-col items-center gap-2 sm:gap-3 transition-opacity ${pierde ? "opacity-50" : ""}`}>
      <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center p-2 sm:p-3 shadow-xl">
        <Escudo nombre={nombre} {...escudo(nombre)} size={80} />
      </div>
      <span className={`text-sm sm:text-xl font-black uppercase tracking-tight text-center leading-tight max-w-[120px] sm:max-w-[160px] ${gana ? "text-yellow-400" : "text-white"}`}>
        {nombre}
      </span>
    </div>
  );
}

function GolesEquipo({ equipo, goles }: { equipo: string; goles: EventoGol[] }) {
  return (
    <div>
      <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-[#0b4a6f] mb-4 flex items-center gap-3">
        <span className="w-1.5 h-6 bg-yellow-400 rounded-full inline-block"></span>
        {equipo}
      </h2>
      <div className="space-y-2 sm:space-y-3">
        {goles.map((gol, index) => (
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
  );
}
