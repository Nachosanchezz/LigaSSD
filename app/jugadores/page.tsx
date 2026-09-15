import Link from "next/link";
import Escudo from "@/components/Escudo";
import { equiposSplit3 } from "@/data/split3/equipos";
import { nombreCompletoJugador } from "@/lib/helpers";
import { plantillaSplit3 } from "@/lib/split3";

const getShieldForPosition = (posicion?: string) => {
  if (!posicion) return <span className="text-slate-400 font-medium">-</span>;

  const isPortero = posicion.toLowerCase().includes("portero");
  return (
    <span className={`inline-flex px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm border ${
      isPortero
        ? "bg-yellow-100 text-yellow-800 border-yellow-200"
        : "bg-blue-50 text-blue-700 border-blue-200"
    }`}>
      {posicion}
    </span>
  );
};

export default function JugadoresPage() {
  const filas = equiposSplit3
    .flatMap((equipo) => plantillaSplit3(equipo).map((miembro) => ({ ...miembro, equipo })))
    .sort((a, b) => nombreCompletoJugador(a.persona).localeCompare(nombreCompletoJugador(b.persona)));

  const th = "px-3 sm:px-6 py-3 sm:py-5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400";

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      {/* Header Banner */}
      <div className="bg-[#091f36] pt-12 sm:pt-16 pb-20 sm:pb-24 px-4 sm:px-6 text-center border-b border-indigo-900/30">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 drop-shadow-sm">
          Jugadores
        </h1>
        <p className="mt-2 sm:mt-4 text-blue-200 font-medium max-w-2xl mx-auto uppercase tracking-wide text-[10px] sm:text-sm">
          Split 3 · Plantillas y precio de subasta
        </p>
      </div>

      <section className="mx-auto max-w-6xl px-3 sm:px-6 -mt-10 sm:-mt-12 space-y-5">
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-xl shadow-[#0b4a6f]/5 border border-slate-100">
          {filas.length <= equiposSplit3.length ? (
            <p className="p-8 sm:p-12 text-center text-sm sm:text-base font-medium text-slate-500">
              Las plantillas del Split 3 se cierran con la subasta. En cuanto termine, aquí estarán todos.
            </p>
          ) : (
            <div className="overflow-x-auto p-2 sm:p-4 w-full max-w-[100vw]">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-100 bg-white">
                    <th className={`${th} text-left whitespace-nowrap`}>Jugador / Apodo</th>
                    <th className={`${th} text-left`}>Equipo</th>
                    <th className={`${th} text-center`}>Posición</th>
                    <th className={`${th} text-center whitespace-nowrap`}>Subasta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filas.map(({ persona, precio, presidente, equipo }) => (
                    <tr key={persona.id} className="group transition-colors hover:bg-slate-50/80">
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <Link href={`/jugadores/${persona.id}`} className="flex flex-col hover:underline decoration-[#0b4a6f]">
                          <span className="font-bold text-slate-800 text-sm sm:text-base whitespace-nowrap sm:whitespace-normal group-hover:text-[#0b4a6f] transition-colors">
                            {nombreCompletoJugador(persona)}
                          </span>
                          {persona.apodo && (
                            <span className="text-xs sm:text-sm font-medium text-slate-500 italic mt-0.5">&ldquo;{persona.apodo}&rdquo;</span>
                          )}
                        </Link>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <Link
                          href={`/equipos/${equipo.slug}`}
                          className="inline-flex items-center gap-1.5 sm:gap-3 rounded-full bg-slate-50 px-2 sm:px-4 py-1 sm:py-1.5 border border-slate-100 shadow-sm transition-transform group-hover:bg-white group-hover:border-slate-200 max-w-[120px] sm:max-w-none"
                        >
                          <span className="h-4 w-4 sm:h-6 sm:w-6 shrink-0">
                            <Escudo nombre={equipo.nombre} logo={equipo.logo} color={equipo.color} size={24} />
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-slate-700 truncate">{equipo.nombre}</span>
                        </Link>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">{getShieldForPosition(persona.posicion)}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                        <span className="text-xs sm:text-sm font-black text-[#0b4a6f] whitespace-nowrap">
                          {presidente
                            ? "Presidente"
                            : precio !== undefined
                              ? `${precio} M€`
                              : equipo.presupuesto === undefined
                                ? "Sin subasta"
                                : "—"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-center text-sm">
          <Link href="/split2/jugadores" className="font-semibold text-[#0b4a6f] hover:underline">
            Ver los jugadores del Split 2 →
          </Link>
        </p>
      </section>
    </div>
  );
}
