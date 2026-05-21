"use client";

import Image from "next/image";
import { useState } from "react";
import { getRankTrophy } from "@/lib/helpers";

export type FilaEstadistica = {
  id: string;
  jugador: string;
  equipo: string;
  logo: string;
  valor: number;
};

function TablaEstadistica({
  titulo,
  filas,
  etiquetaValor,
}: {
  titulo: string;
  filas: FilaEstadistica[];
  etiquetaValor: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-xl shadow-[#0b4a6f]/5 border border-slate-100">
      <div className="bg-gradient-to-r from-[#091f36] to-[#0b4a6f] px-4 sm:px-8 py-4 sm:py-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-10">
          <svg className="w-16 sm:w-24 h-16 sm:h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9l4 4 4-4-1.41-1.41L13 11.17V8h-2v3.17l-1.59-1.58L7 11z"/></svg>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white relative z-10 flex items-center gap-2 sm:gap-3">
          <span className="w-1.5 sm:w-2 h-6 sm:h-8 bg-yellow-400 rounded-full inline-block"></span>
          {titulo}
        </h2>
      </div>

      {filas.length === 0 ? (
        <div className="p-8 sm:p-12 text-center text-slate-500 font-medium text-sm sm:text-base">
          Aún no hay datos disponibles en esta categoría.
        </div>
      ) : (
        <div className="overflow-x-auto p-2 sm:p-6 w-full max-w-[100vw]">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-100">
                <th className="px-2 sm:px-4 py-3 sm:py-4 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 w-10 sm:w-16">Rank</th>
                <th className="px-2 sm:px-4 py-3 sm:py-4 text-left text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Jugador</th>
                <th className="px-2 sm:px-4 py-3 sm:py-4 text-left text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Equipo</th>
                <th className="px-2 sm:px-4 py-3 sm:py-4 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 w-20 sm:w-32">{etiquetaValor}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filas.map((fila, index) => (
                <tr key={`${titulo}-${fila.id}`} className="group transition-colors hover:bg-slate-50/80">
                  <td className="px-2 sm:px-4 py-3 sm:py-5 text-center text-xl sm:text-2xl drop-shadow-sm font-semibold">
                    {getRankTrophy(index)}
                  </td>
                  <td className="px-2 sm:px-4 py-3 sm:py-5">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="hidden sm:flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 overflow-hidden rounded-full bg-slate-100 ring-2 ring-white shadow-sm items-center justify-center text-[#091f36] font-bold text-xs sm:text-base">
                        {fila.jugador.charAt(0)}
                      </div>
                      <div className="font-bold text-slate-800 text-sm sm:text-base group-hover:text-[#0b4a6f] transition-colors line-clamp-2">
                        {fila.jugador}
                      </div>
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-3 sm:py-5">
                    <div className="inline-flex items-center gap-1.5 sm:gap-3 rounded-full bg-slate-100/80 px-2 sm:px-4 py-1 sm:py-1.5 border border-slate-200/60 shadow-sm transition-transform group-hover:scale-105">
                      <Image src={fila.logo} alt={fila.equipo} width={20} height={20} className="h-4 w-4 sm:h-5 sm:w-5 object-contain" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-600 hidden xs:inline-block max-w-[80px] sm:max-w-none truncate">{fila.equipo}</span>
                    </div>
                  </td>
                  <td className="px-2 sm:px-4 py-3 sm:py-5 text-center">
                    <div className="mx-auto inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#091f36] to-[#0b4a6f] text-sm sm:text-lg font-black text-white shadow-md shadow-[#0b4a6f]/20 group-hover:scale-110 transition-transform">
                      {fila.valor}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

type Props = {
  goleadores: FilaEstadistica[];
  asistentes: FilaEstadistica[];
  mvps: FilaEstadistica[];
  goleadoresPlayoff: FilaEstadistica[];
  asistentesPlayoff: FilaEstadistica[];
  mvpsPlayoff: FilaEstadistica[];
  hayDatosPlayoff: boolean;
};

export default function EstadisticasTabs({
  goleadores,
  asistentes,
  mvps,
  goleadoresPlayoff,
  asistentesPlayoff,
  mvpsPlayoff,
  hayDatosPlayoff,
}: Props) {
  const [tab, setTab] = useState<"liga" | "playoff">("liga");

  return (
    <>
      {/* Selector de pestañas */}
      <div className="flex gap-2 mb-8">
        <button
          onClick={() => setTab("liga")}
          className={`px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-wide transition-all ${
            tab === "liga"
              ? "bg-[#091f36] text-white shadow-lg"
              : "bg-white text-slate-500 border border-slate-200 hover:border-[#0b4a6f] hover:text-[#0b4a6f]"
          }`}
        >
          Liga Regular
        </button>
        {hayDatosPlayoff && (
          <button
            onClick={() => setTab("playoff")}
            className={`px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-wide transition-all ${
              tab === "playoff"
                ? "bg-yellow-400 text-[#091f36] shadow-lg"
                : "bg-white text-slate-500 border border-slate-200 hover:border-yellow-400 hover:text-yellow-600"
            }`}
          >
            Playoff
          </button>
        )}
      </div>

      {tab === "liga" && (
        <>
          <div className="grid gap-6 sm:gap-12 lg:grid-cols-2">
            <TablaEstadistica titulo="Pichichi" filas={goleadores} etiquetaValor="Goles" />
            <TablaEstadistica titulo="Asistencias" filas={asistentes} etiquetaValor="Asists." />
          </div>
          <div className="mt-6 sm:mt-12">
            <TablaEstadistica titulo="MVPs" filas={mvps} etiquetaValor="MVPs" />
          </div>
        </>
      )}

      {tab === "playoff" && (
        <>
          <div className="grid gap-6 sm:gap-12 lg:grid-cols-2">
            <TablaEstadistica titulo="Pichichi Playoff" filas={goleadoresPlayoff} etiquetaValor="Goles" />
            <TablaEstadistica titulo="Asistencias Playoff" filas={asistentesPlayoff} etiquetaValor="Asists." />
          </div>
          <div className="mt-6 sm:mt-12">
            <TablaEstadistica titulo="MVPs Playoff" filas={mvpsPlayoff} etiquetaValor="MVPs" />
          </div>
        </>
      )}
    </>
  );
}
