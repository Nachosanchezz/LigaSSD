import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { equipos, logosEquipos } from "@/data/equipos";
import { jornadas } from "@/data/partidos";
import { nombreCompletoJugador } from "@/lib/helpers";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return equipos.flatMap((eq) => eq.integrantes.map((j) => ({ id: j.id })));
}

function normalizarTexto(texto: string) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
}

function esValorIgnorable(texto?: string) {
  if (!texto) return true;
  const v = normalizarTexto(texto);
  return v === "sin asistencia" || v === "gol cedido" || v === "cedido";
}

function calcularStatsJugador(jugador: (typeof equipos)[0]["integrantes"][0]) {
  let goles = 0;
  let asistencias = 0;
  let mvps = 0;
  const partidosJugados = new Set<string>();

  // Build lookup keys for this player
  const keys = new Set<string>();
  keys.add(normalizarTexto(jugador.nombre));
  keys.add(normalizarTexto(nombreCompletoJugador(jugador)));
  if (jugador.apodo) keys.add(normalizarTexto(jugador.apodo));

  const matchKey = (texto?: string) => texto && keys.has(normalizarTexto(texto));

  for (const jornada of jornadas) {
    for (const partido of jornada.partidos) {
      if (partido.estado !== "Finalizado" || !partido.resumen) continue;

      for (const gol of [...partido.resumen.local, ...partido.resumen.visitante]) {
        if (!esValorIgnorable(gol.jugador) && matchKey(gol.jugador)) {
          goles++;
          partidosJugados.add(partido.id);
        }
        if (!esValorIgnorable(gol.asistente) && matchKey(gol.asistente)) {
          asistencias++;
          partidosJugados.add(partido.id);
        }
      }

      if (partido.mvp && matchKey(partido.mvp)) {
        mvps++;
      }
    }
  }

  return { goles, asistencias, mvps, partidosJugados: partidosJugados.size };
}

export default async function JugadorPage({ params }: Props) {
  const { id } = await params;

  let jugador: (typeof equipos)[0]["integrantes"][0] | undefined;
  let equipo: (typeof equipos)[0] | undefined;

  for (const eq of equipos) {
    const found = eq.integrantes.find((j) => j.id === id);
    if (found) { jugador = found; equipo = eq; break; }
  }

  if (!jugador || !equipo) notFound();

  const stats = calcularStatsJugador(jugador);
  const nombreCompleto = nombreCompletoJugador(jugador);

  const posicionColor = jugador.posicion?.toLowerCase().includes("portero")
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
          {nombreCompleto}
        </h1>
        {jugador.apodo && (
          <p className="relative z-10 mt-2 text-yellow-400 font-bold text-lg sm:text-xl italic">
            "{jugador.apodo}"
          </p>
        )}
      </div>

      <section className="mx-auto max-w-3xl px-3 sm:px-6 -mt-16 sm:-mt-24 relative z-10">
        <div className="rounded-2xl sm:rounded-[2rem] border border-slate-100 bg-white p-5 sm:p-10 shadow-xl shadow-[#0b4a6f]/5">

          {/* Logo + info básica */}
          <div className="flex flex-col items-center mb-8 sm:mb-10">
            <div className="relative -mt-16 sm:-mt-24 mb-5 h-24 w-24 sm:h-36 sm:w-36 rounded-full bg-slate-50 border-4 sm:border-8 border-white shadow-xl flex items-center justify-center p-3">
              <Image
                src={equipo!.logo}
                alt={equipo!.nombre}
                width={120}
                height={120}
                className="max-h-full w-auto object-contain"
              />
            </div>

            <Link
              href={`/equipos/${equipo!.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-4 py-2 text-sm font-bold text-[#0b4a6f] hover:bg-[#0b4a6f] hover:text-white transition-colors"
            >
              {equipo!.nombre}
            </Link>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {jugador.posicion && (
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${posicionColor}`}>
                  {jugador.posicion}
                </span>
              )}
              {jugador.edad && (
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                  {jugador.edad} años
                </span>
              )}
              {jugador.piernaBuena && (
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase">
                  {jugador.piernaBuena}
                </span>
              )}
            </div>
          </div>

          {/* Stats */}
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#0b4a6f] border-b-2 border-slate-100 pb-3 mb-6 flex items-center gap-3">
            <span className="w-1.5 h-6 bg-yellow-400 rounded-full inline-block"></span>
            Estadísticas
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { label: "Goles", valor: stats.goles, color: "from-[#091f36] to-[#0b4a6f]" },
              { label: "Asistencias", valor: stats.asistencias, color: "from-[#0b4a6f] to-blue-500" },
              { label: "MVPs", valor: stats.mvps, color: "from-yellow-500 to-yellow-400" },
              { label: "Partidos", valor: stats.partidosJugados, color: "from-slate-600 to-slate-500" },
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

          {stats.goles === 0 && stats.asistencias === 0 && stats.mvps === 0 && (
            <p className="mt-6 text-center text-sm text-slate-400">
              Aún no hay estadísticas registradas para este jugador.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
