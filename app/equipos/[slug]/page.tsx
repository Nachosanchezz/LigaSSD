import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { equipos } from "../../../data/equipos";
import { getArbitrajesDeEquipo } from "@/lib/arbitrajes";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

function nombreCompletoJugador(jugador: {
  nombre: string;
  primerApellido?: string;
  segundoApellido?: string;
}) {
  return [jugador.nombre, jugador.primerApellido, jugador.segundoApellido]
    .filter((parte) => parte && parte.trim() !== "")
    .join(" ");
}

const getShieldForPosition = (posicion?: string) => {
  if (!posicion) return <span className="text-slate-400 font-medium">-</span>;

  const isPortero = posicion.toLowerCase().includes("portero");
  return (
    <span className={`inline-flex px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm border ${isPortero
      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
      : "bg-blue-50 text-blue-700 border-blue-200"
      }`}>
      {posicion}
    </span>
  );
};

export default async function EquipoPage({ params }: Props) {
  const { slug } = await params;

  const equipo = equipos.find((equipo) => equipo.slug === slug);

  if (!equipo) {
    notFound();
  }

  const datosArbitraje = getArbitrajesDeEquipo(equipo.nombre);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      {/* Header Banner */}
      <div className="bg-[#091f36] pt-8 sm:pt-12 pb-24 sm:pb-32 px-4 sm:px-6 text-center border-b border-indigo-900/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply pointer-events-none"></div>
        <Link
          href="/equipos"
          className="relative z-10 inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wide text-blue-200 hover:text-yellow-400 transition-colors mb-6 sm:mb-8 bg-white/5 px-4 py-2 rounded-full border border-white/10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Volver a equipos
        </Link>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white shadow-sm to-blue-200">
          {equipo.nombre}
        </h1>
      </div>

      <section className="mx-auto max-w-4xl px-3 sm:px-6 -mt-16 sm:-mt-24 relative z-10">
        <div className="rounded-2xl sm:rounded-[2rem] border border-slate-100 bg-white p-4 sm:p-10 shadow-xl shadow-[#0b4a6f]/5">

          <div className="flex flex-col items-center mb-8 sm:mb-12">
            <div className="relative -mt-16 sm:-mt-24 mb-4 sm:mb-6 h-28 w-28 sm:h-40 sm:w-40 rounded-full bg-slate-50 border-4 sm:border-8 border-white shadow-xl flex items-center justify-center p-4">
              <Image
                src={equipo.logo}
                alt={equipo.nombre}
                width={140}
                height={140}
                className="max-h-full w-auto object-contain"
              />
            </div>
            <div className="flex gap-2 sm:gap-4 flex-wrap justify-center">
              <div className="bg-slate-100 rounded-lg px-4 py-2 flex flex-col items-center shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Estrella</span>
                <span className="text-sm font-black text-[#0b4a6f]">
                  {equipo.integrantes[0] ? nombreCompletoJugador(equipo.integrantes[0]) : "-"}
                </span>
              </div>
              <div className="bg-slate-100 rounded-lg px-4 py-2 flex flex-col items-center shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Plantilla</span>
                <span className="text-sm font-black text-[#0b4a6f]">{equipo.integrantes.length} Jugadores</span>
              </div>
            </div>
          </div>
          <div className="mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0b4a6f] border-b-2 border-slate-100 pb-3 mb-6 flex items-center gap-3">
              <span className="w-1.5 sm:w-2 h-6 sm:h-8 bg-yellow-400 rounded-full inline-block"></span>
              Arbitrajes
            </h2>

            <div className="mb-5 inline-flex items-center rounded-xl bg-slate-100 px-4 py-3 shadow-sm">
              <span className="text-sm sm:text-base font-bold text-slate-600 uppercase tracking-wide">
                Partidos arbitrados:
              </span>
              <span className="ml-3 text-xl sm:text-2xl font-black text-[#0b4a6f]">
                {datosArbitraje.total}
              </span>
            </div>

            {datosArbitraje.arbitrajes.length > 0 ? (
              <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                {datosArbitraje.arbitrajes.map((partido) => (
                  <div
                    key={partido.id}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
                  >
                    <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-500">
                      Jornada {partido.jornada}
                    </p>

                    <p className="mt-1 text-base sm:text-lg font-black text-slate-800">
                      {partido.local} vs {partido.visitante}
                    </p>

                    <p className="mt-2 text-sm font-semibold text-[#0b4a6f]">
                      Resultado: {partido.resultado ?? "Sin resultado"}
                    </p>

                    <p className="mt-2 text-xs sm:text-sm text-slate-500">
                      {partido.dia ?? "Fecha por confirmar"}
                      {partido.hora ? ` · ${partido.hora}` : ""}
                      {partido.campo ? ` · Campo ${partido.campo}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                Este equipo todavía no ha arbitrado ningún partido finalizado.
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0b4a6f] border-b-2 border-slate-100 pb-3 mb-6 flex items-center gap-3">
              <span className="w-1.5 sm:w-2 h-6 sm:h-8 bg-yellow-400 rounded-full inline-block"></span>
              Plantilla
            </h2>

            <div className="grid gap-3 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {equipo.integrantes.map((jugador) => (
                <div
                  key={nombreCompletoJugador(jugador)}
                  className="group rounded-xl border border-slate-200 bg-white hover:bg-slate-50 overflow-hidden shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="bg-slate-100 px-3 py-2 flex items-center justify-between border-b border-slate-200 group-hover:bg-[#091f36] transition-colors">
                    <span className="font-bold text-slate-800 text-sm group-hover:text-white line-clamp-1">
                      {nombreCompletoJugador(jugador)}
                    </span>
                  </div>

                  <div className="p-3 sm:p-4 flex gap-3 items-center">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-400 text-xl shrink-0">
                      {jugador.nombre.charAt(0)}
                    </div>

                    <div className="space-y-1 w-full flex flex-col justify-center">
                      <div className="flex items-center justify-between">
                        {jugador.apodo ? (
                          <span className="text-xs font-bold text-slate-500 italic line-clamp-1">"{jugador.apodo}"</span>
                        ) : (
                          <span className="text-[10px] text-transparent">-</span>
                        )}
                        {getShieldForPosition(jugador.posicion)}
                      </div>

                      <div className="flex items-center justify-between text-[10px] sm:text-xs">
                        {jugador.edad && (
                          <span className="text-slate-600 font-medium bg-slate-100 px-1.5 py-0.5 rounded">
                            <span className="font-bold">{jugador.edad}</span> años
                          </span>
                        )}
                        {jugador.piernaBuena && (
                          <span className="text-slate-500 uppercase tracking-widest font-semibold ml-auto">
                            {jugador.piernaBuena}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}