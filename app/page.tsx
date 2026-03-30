import Link from "next/link";
import Image from "next/image";
import { jornadas } from "@/data/partidos";
import { equipos, logosEquipos } from "@/data/equipos";

// --- Clasificación top 3 ---
function calcularTop3() {
  const tabla: Record<string, { equipo: string; pts: number; dg: number; gf: number }> = {};
  for (const eq of equipos) {
    tabla[eq.nombre] = { equipo: eq.nombre, pts: 0, dg: 0, gf: 0 };
  }
  for (const jornada of jornadas) {
    for (const partido of jornada.partidos) {
      if (partido.estado !== "Finalizado" || !partido.resultado) continue;
      const [gl, gv] = partido.resultado.split("-").map(Number);
      if (isNaN(gl) || isNaN(gv)) continue;
      const local = tabla[partido.local];
      const visitante = tabla[partido.visitante];
      if (!local || !visitante) continue;
      local.gf += gl; local.dg += gl - gv;
      visitante.gf += gv; visitante.dg += gv - gl;
      if (gl > gv) { local.pts += 3; }
      else if (gv > gl) { visitante.pts += 3; }
      else { local.pts += 1; visitante.pts += 1; }
    }
  }
  return Object.values(tabla)
    .sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf || a.equipo.localeCompare(b.equipo))
    .slice(0, 3);
}

// --- Últimos resultados (máx 3) ---
function getUltimosResultados() {
  return jornadas
    .flatMap((j) => j.partidos.map((p) => ({ ...p, jornada: j.numero })))
    .filter((p) => p.estado === "Finalizado")
    .slice(-3)
    .reverse();
}

// --- Próximos partidos (máx 3) ---
function getProximosPartidos() {
  return jornadas
    .flatMap((j) => j.partidos.map((p) => ({ ...p, jornada: j.numero })))
    .filter((p) => p.estado === "Programado")
    .slice(0, 3);
}

export default function HomePage() {
  const top3 = calcularTop3();
  const ultimosResultados = getUltimosResultados();
  const proximosPartidos = getProximosPartidos();

  const rankColors = ["text-yellow-500", "text-slate-400", "text-amber-600"];
  const rankLabels = ["1º", "2º", "3º"];

  return (
    <div className="flex w-full flex-1 flex-col pb-8">
      {/* Hero Section */}
      <section className="relative flex min-h-[55vh] md:min-h-[65vh] items-center justify-center overflow-hidden bg-[#091f36] px-4 py-16 sm:py-20 text-center shadow-2xl">
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-1/4 -top-1/4 h-[400px] w-[400px] sm:h-[800px] sm:w-[800px] rounded-full bg-[#0b4a6f]/30 blur-[80px] sm:blur-[120px]"></div>
          <div className="absolute -bottom-1/4 -right-1/4 h-[300px] w-[300px] sm:h-[600px] sm:w-[600px] rounded-full bg-yellow-400/10 blur-[60px] sm:blur-[100px]"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl space-y-6 sm:space-y-8">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 shadow-xl px-3 sm:px-4 py-1.5 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-wider text-yellow-400 backdrop-blur-md">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-yellow-500"></span>
            </span>
            Temporada Actual en Juego
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-white leading-none drop-shadow-xl">
            La Pasión del <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
              Fútbol Sala
            </span>
          </h1>

          <p className="mx-auto max-w-2xl px-2 text-base sm:text-lg md:text-xl text-blue-100 font-medium drop-shadow-md">
            Más que una competición. Una excusa perfecta para reunirnos, disfrutar del deporte, y ganar puntos en la cancha.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 pt-4 sm:flex-row w-full max-w-md mx-auto sm:max-w-none">
            <Link
              href="/clasificacion"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-yellow-400 px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-bold uppercase tracking-wide text-[#091f36] shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all hover:bg-yellow-300 hover:scale-105 active:scale-95"
            >
              Ver Clasificación
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              href="/jornadas"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/20 bg-white/5 px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10 active:scale-95"
            >
              Últimos Resultados
            </Link>
          </div>
        </div>

        <div className="absolute -bottom-1 left-0 right-0 h-10 sm:h-16 w-full bg-slate-50 [clip-path:polygon(0_100%,100%_0,100%_100%)]"></div>
      </section>

      {/* Live section: Clasificación + Resultados + Próximos */}
      <section className="relative z-20 px-4 sm:px-6 py-12 sm:py-16 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-3">

            {/* Top 3 clasificación */}
            <div className="rounded-2xl bg-white border border-slate-100 shadow-lg shadow-[#0b4a6f]/5 overflow-hidden">
              <div className="bg-gradient-to-r from-[#091f36] to-[#0b4a6f] px-5 py-4 flex items-center justify-between">
                <h2 className="text-base font-black uppercase tracking-tight text-white flex items-center gap-2">
                  <span className="w-1 h-5 bg-yellow-400 rounded-full inline-block"></span>
                  Clasificación
                </h2>
                <Link href="/clasificacion" className="text-[10px] font-bold uppercase tracking-wider text-yellow-400 hover:text-yellow-300 transition-colors">
                  Ver todo →
                </Link>
              </div>
              <div className="divide-y divide-slate-50">
                {top3.map((fila, i) => (
                  <div key={fila.equipo} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                    <span className={`text-lg font-black w-6 text-center ${rankColors[i]}`}>{rankLabels[i]}</span>
                    <div className="h-8 w-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center p-1 shrink-0">
                      <Image src={logosEquipos[fila.equipo]} alt={fila.equipo} width={28} height={28} className="h-full w-full object-contain" />
                    </div>
                    <span className="flex-1 font-bold text-slate-800 text-sm leading-tight">{fila.equipo}</span>
                    <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-gradient-to-br from-[#091f36] to-[#0b4a6f] text-sm font-black text-white shadow">
                      {fila.pts}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Últimos resultados */}
            <div className="rounded-2xl bg-white border border-slate-100 shadow-lg shadow-[#0b4a6f]/5 overflow-hidden">
              <div className="bg-gradient-to-r from-[#091f36] to-[#0b4a6f] px-5 py-4 flex items-center justify-between">
                <h2 className="text-base font-black uppercase tracking-tight text-white flex items-center gap-2">
                  <span className="w-1 h-5 bg-yellow-400 rounded-full inline-block"></span>
                  Últimos Resultados
                </h2>
                <Link href="/jornadas" className="text-[10px] font-bold uppercase tracking-wider text-yellow-400 hover:text-yellow-300 transition-colors">
                  Ver todo →
                </Link>
              </div>
              <div className="divide-y divide-slate-50">
                {ultimosResultados.map((p) => {
                  const [gl, gv] = p.resultado!.split("-").map(Number);
                  return (
                    <Link key={p.id} href={`/partidos/${p.id}`} className="flex items-center gap-2 px-4 py-3 hover:bg-slate-50 transition-colors group">
                      <div className="flex flex-col items-center flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 w-full justify-end">
                          <span className={`text-xs font-bold truncate text-right ${gl > gv ? "text-slate-800" : "text-slate-400"}`}>{p.local}</span>
                          <div className="h-5 w-5 shrink-0">
                            <Image src={logosEquipos[p.local]} alt={p.local} width={20} height={20} className={`h-full w-full object-contain ${gl < gv ? "opacity-40" : ""}`} />
                          </div>
                        </div>
                      </div>
                      <div className="shrink-0 rounded-lg bg-[#091f36] px-2.5 py-1 text-sm font-black text-white tabular-nums tracking-wider">
                        {p.resultado}
                      </div>
                      <div className="flex flex-col items-center flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 w-full justify-start">
                          <div className="h-5 w-5 shrink-0">
                            <Image src={logosEquipos[p.visitante]} alt={p.visitante} width={20} height={20} className={`h-full w-full object-contain ${gv < gl ? "opacity-40" : ""}`} />
                          </div>
                          <span className={`text-xs font-bold truncate ${gv > gl ? "text-slate-800" : "text-slate-400"}`}>{p.visitante}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Próximos partidos */}
            <div className="rounded-2xl bg-white border border-slate-100 shadow-lg shadow-[#0b4a6f]/5 overflow-hidden">
              <div className="bg-gradient-to-r from-[#091f36] to-[#0b4a6f] px-5 py-4 flex items-center justify-between">
                <h2 className="text-base font-black uppercase tracking-tight text-white flex items-center gap-2">
                  <span className="w-1 h-5 bg-yellow-400 rounded-full inline-block"></span>
                  Próximos Partidos
                </h2>
                <Link href="/jornadas" className="text-[10px] font-bold uppercase tracking-wider text-yellow-400 hover:text-yellow-300 transition-colors">
                  Ver todo →
                </Link>
              </div>
              <div className="divide-y divide-slate-50">
                {proximosPartidos.map((p) => (
                  <div key={p.id} className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 shrink-0">
                        <Image src={logosEquipos[p.local]} alt={p.local} width={20} height={20} className="h-full w-full object-contain" />
                      </div>
                      <span className="text-xs font-bold text-slate-700 truncate flex-1">{p.local}</span>
                      <span className="text-[10px] font-black text-slate-300 uppercase">vs</span>
                      <span className="text-xs font-bold text-slate-700 truncate flex-1 text-right">{p.visitante}</span>
                      <div className="h-5 w-5 shrink-0">
                        <Image src={logosEquipos[p.visitante]} alt={p.visitante} width={20} height={20} className="h-full w-full object-contain" />
                      </div>
                    </div>
                    {p.dia && (
                      <p className="mt-1 text-[10px] font-medium text-slate-400 text-center">
                        {p.dia}{p.hora ? ` · ${p.hora}` : ""}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative z-20 px-4 sm:px-6 py-12 sm:py-16 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">

            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2 text-center lg:text-left">
                <h2 className="text-xs sm:text-sm font-bold tracking-widest text-[#0b4a6f] uppercase">Quiénes somos</h2>
                <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Nuestra <span className="text-[#091f36]">Historia</span>
                </h3>
              </div>

              <div className="space-y-4 sm:space-y-5 text-base sm:text-lg leading-relaxed text-slate-600">
                <p>
                  La <strong className="text-slate-900">Liga SSD</strong> nace de algo muy sencillo: dos amigos con ganas de
                  desconectar durante un rato de los estudios, el trabajo y el ritmo
                  diario. Lo que empezó como una idea para echar un partido a la semana
                  terminó convirtiéndose en una pequeña competición.
                </p>

                <div className="flex gap-3 sm:gap-4">
                  <div className="flex-1 rounded-2xl border-2 border-slate-100 bg-white p-4 sm:p-6 shadow-sm text-center lg:text-left">
                    <div className="text-3xl sm:text-4xl font-black text-[#0b4a6f]">7</div>
                    <div className="mt-1 text-xs sm:text-sm font-bold uppercase tracking-wide text-slate-500">Franquicias</div>
                  </div>
                  <div className="flex-1 rounded-2xl border-2 border-slate-100 bg-white p-4 sm:p-6 shadow-sm text-center lg:text-left">
                    <div className="text-3xl sm:text-4xl font-black text-yellow-500">50+</div>
                    <div className="mt-1 text-xs sm:text-sm font-bold uppercase tracking-wide text-slate-500">Jugadores</div>
                  </div>
                </div>

                <p>
                  Celebramos nuestros partidos en <strong>Torrelodones</strong>, con un mismo objetivo:
                  disfrutar del fútbol sala dentro y fuera de la pista.
                </p>
              </div>
            </div>

            <div className="relative rounded-[2rem] bg-[#091f36] p-6 sm:p-10 lg:p-12 text-white shadow-2xl overflow-hidden">
              <div className="absolute -right-20 -top-20 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-[#0b4a6f] blur-[60px] sm:blur-[80px]"></div>

              <div className="relative z-10 space-y-5 sm:space-y-6">
                <h3 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl lg:text-4xl text-center lg:text-left">
                  El <span className="text-yellow-400">Espíritu</span>
                </h3>

                <div className="space-y-3 sm:space-y-4 text-blue-100 text-base sm:text-lg">
                  <p>
                    Aunque el objetivo principal es disfrutar y compartir un
                    buen momento, el espíritu competitivo también está muy presente.
                    Cada partido cuenta, y todos luchan por sumar puntos.
                  </p>
                  <p>
                    Venimos a pasarlo bien… <strong>pero si se puede ganar, mejor todavía.</strong>
                  </p>
                </div>

                <div className="mt-6 sm:mt-8 rounded-xl bg-white/10 p-5 sm:p-6 border border-white/20 backdrop-blur-sm">
                  <p className="font-medium italic text-white/90 text-center text-sm sm:text-base">
                    "Más que una simple competición, esta liga es un espacio donde el fútbol
                    sirve para desconectar y competir de forma sana."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <footer className="mt-auto py-6 sm:py-8 text-center text-xs sm:text-sm font-medium text-slate-400 bg-slate-50">
        <p>© {new Date().getFullYear()} Liga SSD. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
