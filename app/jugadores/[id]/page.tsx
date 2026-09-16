import Link from "next/link";
import { notFound } from "next/navigation";
import Escudo from "@/components/Escudo";
import { getPersona, personas } from "@/data/personas";
import { equipos as equiposSplit2 } from "@/data/split2/equipos";
import { statsDeJugador, type StatsJugador } from "@/lib/estadisticas";
import { nombreCompletoJugador } from "@/lib/helpers";
import { filaSplit1DePersona } from "@/lib/palmares";
import { getJornadasConResultados, getPlayoffConResultados } from "@/lib/queries";
import { equipoDePersona, getSplit3, partidosFaseFinal } from "@/lib/split3";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function generateStaticParams() {
  return personas.map((persona) => ({ id: persona.id }));
}

type FilaHistorial = {
  split: string;
  equipo: string;
  ruta?: string;
  goles: number;
  asistencias: number;
  /** El Split 1 no guardaba MVPs */
  mvps?: number;
};

// Ficha única de cada persona: su equipo actual y sus números de todos los splits
export default async function JugadorPage({ params }: Props) {
  const { id } = await params;
  const persona = getPersona(id);
  if (!persona) notFound();

  const equipo = equipoDePersona(persona.id);
  const fichaje = equipo?.plantilla.find((candidato) => candidato.persona === persona.id);
  const equipoSplit2 = persona.split2
    ? equiposSplit2.find((candidato) => candidato.integrantes.some((jugador) => jugador.id === persona.split2))
    : undefined;

  const [split3, jornadasSplit2, playoffSplit2] = await Promise.all([
    getSplit3(),
    equipoSplit2 ? getJornadasConResultados() : undefined,
    equipoSplit2 ? getPlayoffConResultados() : undefined,
  ]);

  const statsSplit3 = equipo
    ? statsDeJugador(persona, [...split3.jornadas.flatMap((j) => j.partidos), ...partidosFaseFinal(split3)])
    : undefined;

  const historial: FilaHistorial[] = [];
  if (equipo && statsSplit3) {
    historial.push({ split: "Split 3", equipo: equipo.nombre, ruta: `/equipos/${equipo.slug}`, ...statsSplit3 });
  }
  if (equipoSplit2 && jornadasSplit2 && playoffSplit2) {
    const stats: StatsJugador = statsDeJugador(persona, [
      ...jornadasSplit2.flatMap((j) => j.partidos),
      ...playoffSplit2.cuartos,
      ...playoffSplit2.semifinales,
      playoffSplit2.final,
    ]);
    historial.push({ split: "Split 2", equipo: equipoSplit2.nombre, ruta: `/split2/equipos/${equipoSplit2.slug}`, ...stats });
  }
  // El Split 1 solo guardaba goles y asistencias, por nombre
  const filaSplit1 = filaSplit1DePersona(persona);
  if (filaSplit1) {
    historial.push({ split: "Split 1", equipo: filaSplit1.equipo, goles: filaSplit1.goles, asistencias: filaSplit1.asistencias });
  }

  const posicionColor = persona.posicion?.toLowerCase().includes("portero")
    ? "bg-yellow-100 text-yellow-800 border-yellow-200"
    : "bg-blue-50 text-blue-700 border-blue-200";

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      {/* Header */}
      <div className="bg-[#091f36] pt-8 sm:pt-12 pb-24 sm:pb-32 px-4 sm:px-6 text-center border-b border-indigo-900/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply pointer-events-none"></div>
        <Link
          href="/jugadores"
          className="relative z-10 inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wide text-blue-200 hover:text-yellow-400 transition-colors mb-6 sm:mb-8 bg-white/5 px-4 py-2 rounded-full border border-white/10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Volver a jugadores
        </Link>
        <h1 className="relative z-10 text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
          {nombreCompletoJugador(persona)}
        </h1>
        {persona.apodo && (
          <p className="relative z-10 mt-2 text-yellow-400 font-bold text-lg sm:text-xl italic">
            &ldquo;{persona.apodo}&rdquo;
          </p>
        )}
      </div>

      <section className="mx-auto max-w-3xl px-3 sm:px-6 -mt-16 sm:-mt-24 relative z-10">
        <div className="rounded-2xl sm:rounded-[2rem] border border-slate-100 bg-white p-5 sm:p-10 shadow-xl shadow-[#0b4a6f]/5">

          {/* Equipo actual + info básica */}
          <div className="flex flex-col items-center mb-8 sm:mb-10">
            <div className="relative -mt-16 sm:-mt-24 mb-5 h-24 w-24 sm:h-36 sm:w-36 rounded-full bg-slate-50 border-4 sm:border-8 border-white shadow-xl flex items-center justify-center p-3">
              {equipo ? (
                <Escudo nombre={equipo.nombre} logo={equipo.logo} color={equipo.color} size={120} />
              ) : (
                <span className="text-4xl font-black text-slate-300">{persona.nombre.charAt(0)}</span>
              )}
            </div>

            {equipo ? (
              <Link
                href={`/equipos/${equipo.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-4 py-2 text-sm font-bold text-[#0b4a6f] hover:bg-[#0b4a6f] hover:text-white transition-colors"
              >
                {equipo.nombre}
              </Link>
            ) : (
              <span className="text-sm font-semibold text-slate-400">No juega el Split 3</span>
            )}

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {fichaje?.presidente && (
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-yellow-400 text-[#091f36]">
                  Presidente
                </span>
              )}
              {fichaje?.precio !== undefined && (
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-black bg-[#091f36] text-white">
                  Fichado por {fichaje.precio} M€
                </span>
              )}
              {persona.posicion && (
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${posicionColor}`}>
                  {persona.posicion}
                </span>
              )}
              {persona.edad && (
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                  {persona.edad} años
                </span>
              )}
              {persona.piernaBuena && (
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase">
                  {persona.piernaBuena}
                </span>
              )}
            </div>
          </div>

          {/* Split 3 */}
          {statsSplit3 && (
            <>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0b4a6f] border-b-2 border-slate-100 pb-3 mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-yellow-400 rounded-full inline-block"></span>
                Split 3
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-10">
                {[
                  { label: "Goles", valor: statsSplit3.goles, color: "from-[#091f36] to-[#0b4a6f]" },
                  { label: "Asistencias", valor: statsSplit3.asistencias, color: "from-[#0b4a6f] to-blue-500" },
                  { label: "MVPs", valor: statsSplit3.mvps, color: "from-yellow-500 to-yellow-400" },
                  { label: "Partidos", valor: statsSplit3.partidos, color: "from-slate-600 to-slate-500" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl overflow-hidden shadow-md">
                    <div className={`bg-gradient-to-br ${stat.color} p-4 sm:p-5 text-center`}>
                      <div className="text-3xl sm:text-4xl font-black text-white">{stat.valor}</div>
                    </div>
                    <div className="bg-white px-2 py-2 text-center border border-slate-100 border-t-0 rounded-b-2xl">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Historial por split */}
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0b4a6f] border-b-2 border-slate-100 pb-3 mb-4 flex items-center gap-3">
            <span className="w-1.5 h-6 bg-yellow-400 rounded-full inline-block"></span>
            Historial
          </h2>
          {historial.length === 0 ? (
            <p className="text-center text-sm text-slate-400">Primer split en la liga.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-100 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                    <th className="px-2 py-3 text-left">Split</th>
                    <th className="px-2 py-3 text-left">Equipo</th>
                    <th className="px-2 py-3 text-center">Goles</th>
                    <th className="px-2 py-3 text-center">Asist.</th>
                    <th className="px-2 py-3 text-center">MVPs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {historial.map((fila) => (
                    <tr key={fila.split}>
                      <td className="px-2 py-3 font-black text-[#091f36] whitespace-nowrap">{fila.split}</td>
                      <td className="px-2 py-3 font-semibold text-slate-700">
                        {fila.ruta ? <Link href={fila.ruta} className="hover:underline">{fila.equipo}</Link> : fila.equipo}
                      </td>
                      <td className="px-2 py-3 text-center font-mono font-bold text-slate-800">{fila.goles}</td>
                      <td className="px-2 py-3 text-center font-mono font-bold text-slate-800">{fila.asistencias}</td>
                      <td className="px-2 py-3 text-center font-mono font-bold text-slate-800">{fila.mvps ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="mt-4 text-center text-[11px] text-slate-400">
            Las actas no recogen quién jugó: &ldquo;partidos&rdquo; cuenta aquellos en los que marcó o asistió.
          </p>
        </div>
      </section>
    </div>
  );
}
