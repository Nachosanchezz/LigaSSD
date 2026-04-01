import Image from "next/image";
import Link from "next/link";
import { logosEquipos } from "../../data/equipos";
import PageHeader from "@/components/PageHeader";
import { Calendar, MapPin, User } from "lucide-react";
import { getJornadasConResultados } from "@/lib/queries";

export default async function JornadasPage() {
  const jornadas = await getJornadasConResultados();

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      <PageHeader title="Jornadas" subtitle="Calendario y Resultados de los Partidos" />

      <section className="mx-auto max-w-5xl px-3 sm:px-6 -mt-10 sm:-mt-12 relative z-10">
        <div className="space-y-8 sm:space-y-12">
          {jornadas.map((jornada) => (
            <div
              key={jornada.numero}
              className="rounded-2xl sm:rounded-[2rem] border border-slate-100 bg-white p-4 sm:p-8 shadow-xl shadow-[#0b4a6f]/5 overflow-hidden relative"
            >
              {/* Accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-3xl"></div>

              <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b-2 border-slate-50 pb-4 sm:pb-6 relative z-10">
                <h2 className="text-2xl sm:text-4xl font-black text-[#0b4a6f] uppercase tracking-tight flex items-center gap-3">
                  <span className="w-1.5 sm:w-2 h-6 sm:h-8 bg-yellow-400 rounded-full inline-block"></span>
                  Jornada {jornada.numero}
                </h2>

                <div className="flex w-fit items-center gap-2 sm:gap-3 rounded-full bg-slate-50 border border-slate-200 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-slate-600 shadow-sm">
                  <span className="uppercase text-slate-400">Descansa:</span>
                  {logosEquipos[jornada.descansa] && (
                    <Image
                      src={logosEquipos[jornada.descansa]}
                      alt={jornada.descansa}
                      width={24}
                      height={24}
                      className="h-5 w-5 sm:h-6 sm:w-6 object-contain"
                    />
                  )}
                  <span className="text-slate-800">{jornada.descansa}</span>
                </div>
              </div>

              <div className="grid gap-4 sm:gap-6 relative z-10">
                {jornada.partidos.map((partido) => {
                  const esFinalizado = partido.estado === "Finalizado";

                  const contenido = esFinalizado ? (
                    <div className="flex flex-col h-full justify-center">
                      <div className="flex flex-row items-center justify-between w-full">
                        {/* Local */}
                        <div className="flex flex-col sm:flex-row items-center sm:justify-end gap-1.5 sm:gap-4 flex-1">
                          <span className="text-[10px] sm:text-base md:text-xl font-bold text-slate-800 text-center sm:text-right line-clamp-2 sm:line-clamp-1 order-2 sm:order-1 leading-tight">
                            {partido.local}
                          </span>
                          <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 sm:p-2 shadow-sm shrink-0 order-1 sm:order-2 mx-auto sm:mx-0">
                            <Image
                              src={logosEquipos[partido.local]}
                              alt={partido.local}
                              width={48}
                              height={48}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        </div>

                        {/* Score */}
                        <div className="flex justify-center shrink-0 mx-2 sm:mx-6">
                          <div className="flex items-center justify-center min-w-[3.5rem] sm:min-w-[6rem] rounded-xl bg-gradient-to-b from-[#091f36] to-[#0b4a6f] px-2 sm:px-4 py-1 sm:py-2 text-lg sm:text-3xl font-black tracking-widest text-white shadow-md shadow-[#0b4a6f]/20">
                            {partido.resultado}
                          </div>
                        </div>

                        {/* Visitante */}
                        <div className="flex flex-col sm:flex-row items-center sm:justify-start gap-1.5 sm:gap-4 flex-1">
                          <div className="h-10 w-10 sm:h-14 sm:w-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 sm:p-2 shadow-sm shrink-0 mx-auto sm:mx-0">
                            <Image
                              src={logosEquipos[partido.visitante]}
                              alt={partido.visitante}
                              width={48}
                              height={48}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <span className="text-[10px] sm:text-base md:text-xl font-bold text-slate-800 text-center sm:text-left line-clamp-2 sm:line-clamp-1 leading-tight">
                            {partido.visitante}
                          </span>
                        </div>
                      </div>

                      {/* Info Footer */}
                      <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2 border-t border-slate-100 pt-3">
                        <div className="inline-flex items-center rounded-lg bg-green-50 border border-green-100 px-2 sm:px-3 py-1 text-[9px] sm:text-xs font-bold uppercase tracking-wide text-green-700 w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                          {partido.estado}
                        </div>
                        {partido.dia && partido.hora && (
                          <div className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 border border-slate-100 px-2 sm:px-3 py-1 text-[9px] sm:text-xs font-medium text-slate-600">
                            <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-400" />
                            {partido.dia} · {partido.hora}
                          </div>
                        )}
                        {partido.campo && (
                          <div className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 border border-slate-100 px-2 sm:px-3 py-1 text-[9px] sm:text-xs font-medium text-slate-600">
                            <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-400" />
                            {partido.campo}
                          </div>
                        )}
                        {partido.arbitra && (
                          <div className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 border border-slate-100 px-2 sm:px-3 py-1 text-[9px] sm:text-xs font-medium text-slate-600">
                            <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-400" />
                            {partido.arbitra}
                          </div>
                        )}
                        {partido.mvp && (
                          <div className="inline-flex items-center gap-1.5 rounded-lg bg-[#f5f1e8] border border-[#e8dfcf] px-2 sm:px-3 py-1 text-[9px] sm:text-xs font-semibold text-[#0b4a6f]">
                            <span className="font-black">MVP:</span> {partido.mvp}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col h-full justify-center">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                        {/* Resumen Header */}
                        <div className="flex flex-row items-center justify-center sm:justify-start gap-2 sm:gap-4 w-full sm:w-auto text-xs sm:text-xl font-bold text-slate-800">
                          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 flex-1 sm:flex-none">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 shadow-sm shrink-0 text-gray-500 mx-auto sm:mx-0">
                              <Image
                                src={logosEquipos[partido.local]}
                                alt={partido.local}
                                width={32}
                                height={32}
                                className="h-full w-full object-contain opacity-70"
                              />
                            </div>
                            <span className="line-clamp-2 sm:line-clamp-1 text-center sm:text-left leading-tight">{partido.local}</span>
                          </div>

                          <span className="text-slate-300 text-[10px] sm:text-sm font-black uppercase tracking-wider bg-slate-50 px-1.5 sm:px-2 py-0.5 rounded shrink-0">vs</span>

                          <div className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-3 flex-1 sm:flex-none">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center p-1.5 shadow-sm shrink-0 text-gray-500 order-1 sm:order-2 mx-auto sm:mx-0">
                              <Image
                                src={logosEquipos[partido.visitante]}
                                alt={partido.visitante}
                                width={32}
                                height={32}
                                className="h-full w-full object-contain opacity-70"
                              />
                            </div>
                            <span className="line-clamp-2 sm:line-clamp-1 text-center sm:text-left leading-tight order-2 sm:order-1">{partido.visitante}</span>
                          </div>
                        </div>

                        {/* Fecha */}
                        <div className="text-[10px] sm:text-sm font-bold text-[#0b4a6f] bg-blue-50 border border-blue-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg w-fit mx-auto sm:mx-0 mt-2 sm:mt-0">
                          {partido.dia && partido.hora
                            ? `${partido.dia} · ${partido.hora}`
                            : "Por Confirmar"}
                        </div>
                      </div>

                      {/* Info Footer */}
                      <div className="mt-3 sm:mt-5 flex flex-wrap items-center justify-center sm:justify-start gap-2 border-t border-slate-50 pt-3">
                        <div
                          className={`inline-flex items-center rounded-lg border px-2 sm:px-3 py-1 text-[9px] sm:text-xs font-bold uppercase tracking-wide w-fit ${partido.estado === "Aplazado"
                              ? "bg-red-50 text-red-700 border-red-100"
                              : partido.estado === "Programado"
                                ? "bg-blue-50 text-blue-700 border-blue-100"
                                : "bg-amber-50 text-amber-700 border-amber-100"
                            }`}
                        >
                          {partido.estado}
                        </div>

                        {partido.estado === "Aplazado" && partido.motivo && (
                          <div className="inline-flex items-center gap-1.5 rounded-lg bg-red-50/50 border border-red-50 px-2 sm:px-3 py-1 text-[9px] sm:text-xs font-medium text-red-600">
                            Motivo: {partido.motivo}
                          </div>
                        )}

                        {partido.campo && (
                          <div className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 border border-slate-100 px-2 sm:px-3 py-1 text-[9px] sm:text-xs font-medium text-slate-600">
                            <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-400" />
                            {partido.campo}
                          </div>
                        )}

                        {partido.arbitra && (
                          <div className="inline-flex items-center gap-1.5 rounded-lg bg-yellow-50 border border-yellow-100 px-2 sm:px-3 py-1 text-[9px] sm:text-xs font-medium text-yellow-800">
                            <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-600" />
                            {partido.arbitra}
                          </div>
                        )}
                      </div>
                    </div>
                  );

                  if (esFinalizado) {
                    return (
                      <Link
                        key={partido.id}
                        href={`/partidos/${partido.id}`}
                        className="group block rounded-[1.5rem] border border-slate-100 bg-white px-3 sm:px-6 py-4 sm:py-5 transition-all hover:border-[#0b4a6f]/30 hover:shadow-lg hover:shadow-[#0b4a6f]/10 shadow-sm"
                      >
                        {contenido}
                      </Link>
                    );
                  }

                  return (
                    <div
                      key={partido.id}
                      className="rounded-[1.5rem] border border-slate-100/60 bg-slate-50/50 px-3 sm:px-6 py-4 sm:py-5 opacity-90 transition-opacity hover:opacity-100"
                    >
                      {contenido}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
