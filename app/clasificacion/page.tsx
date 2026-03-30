import Image from "next/image";
import { jornadas } from "../../data/partidos";
import { equipos, logosEquipos } from "../../data/equipos";
import { getRankTrophy } from "@/lib/helpers";
import PageHeader from "@/components/PageHeader";

type FilaClasificacion = {
  equipo: string;
  pj: number;
  pg: number;
  pe: number;
  pp: number;
  gf: number;
  gc: number;
  pts: number;
  dg: number;
};

function calcularClasificacion(): FilaClasificacion[] {
  const tabla: Record<string, FilaClasificacion> = {};

  for (const equipo of equipos) {
    tabla[equipo.nombre] = {
      equipo: equipo.nombre,
      pj: 0,
      pg: 0,
      pe: 0,
      pp: 0,
      gf: 0,
      gc: 0,
      pts: 0,
      dg: 0,
    };
  }

  for (const jornada of jornadas) {
    for (const partido of jornada.partidos) {
      if (partido.estado !== "Finalizado" || !partido.resultado) continue;

      const [golesLocalStr, golesVisitanteStr] = partido.resultado.split("-");
      const golesLocal = Number(golesLocalStr);
      const golesVisitante = Number(golesVisitanteStr);

      if (Number.isNaN(golesLocal) || Number.isNaN(golesVisitante)) continue;

      const local = tabla[partido.local];
      const visitante = tabla[partido.visitante];

      if (!local || !visitante) continue;

      local.pj += 1;
      visitante.pj += 1;

      local.gf += golesLocal;
      local.gc += golesVisitante;

      visitante.gf += golesVisitante;
      visitante.gc += golesLocal;

      if (golesLocal > golesVisitante) {
        local.pg += 1;
        local.pts += 3;
        visitante.pp += 1;
      } else if (golesLocal < golesVisitante) {
        visitante.pg += 1;
        visitante.pts += 3;
        local.pp += 1;
      } else {
        local.pe += 1;
        visitante.pe += 1;
        local.pts += 1;
        visitante.pts += 1;
      }
    }
  }

  const clasificacion = Object.values(tabla).map((fila) => ({
    ...fila,
    dg: fila.gf - fila.gc,
  }));

  clasificacion.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.dg !== a.dg) return b.dg - a.dg;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return a.equipo.localeCompare(b.equipo);
  });

  return clasificacion;
}

export default function ClasificacionPage() {
  const clasificacion = calcularClasificacion();

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      <PageHeader title="Clasificación" subtitle="Tabla General de la Temporada" />

      <section className="mx-auto max-w-6xl px-3 sm:px-6 -mt-10 sm:-mt-12 relative z-10">
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-xl shadow-[#0b4a6f]/5 border border-slate-100">

          <div className="overflow-x-auto w-full p-2 sm:p-4">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-100 bg-white">
                  <th className="px-2 sm:px-4 py-3 sm:py-5 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 w-10 sm:w-16">#</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-5 text-left text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Equipo</th>
                  <th className="px-2 sm:px-4 py-3 sm:py-5 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">PJ</th>
                  <th className="px-2 sm:px-4 py-3 sm:py-5 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 hidden sm:table-cell">PG</th>
                  <th className="px-2 sm:px-4 py-3 sm:py-5 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 hidden sm:table-cell">PE</th>
                  <th className="px-2 sm:px-4 py-3 sm:py-5 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 hidden sm:table-cell">PP</th>
                  <th className="px-2 sm:px-4 py-3 sm:py-5 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 hidden md:table-cell">GF</th>
                  <th className="px-2 sm:px-4 py-3 sm:py-5 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 hidden md:table-cell">GC</th>
                  <th className="px-2 sm:px-4 py-3 sm:py-5 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">DG</th>
                  <th className="px-2 sm:px-6 py-3 sm:py-5 text-center text-xs sm:text-sm font-black uppercase tracking-wider text-[#0b4a6f]">PTS</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {clasificacion.map((fila, index) => (
                  <tr
                    key={fila.equipo}
                    className="group transition-colors hover:bg-slate-50/80"
                  >
                    <td className="px-2 sm:px-4 py-3 sm:py-5 text-center text-xl sm:text-2xl drop-shadow-sm font-semibold">
                      {getRankTrophy(index)}
                    </td>

                    <td className="px-2 sm:px-6 py-3 sm:py-5">
                      <div className="flex items-center gap-2 sm:gap-4">
                        <div className="shrink-0 h-7 w-7 sm:h-12 sm:w-12 rounded-full overflow-hidden bg-white ring-2 ring-slate-100 shadow-sm flex items-center justify-center p-1 sm:p-1.5 transition-transform group-hover:scale-105 group-hover:ring-[#0b4a6f]/20">
                          <Image
                            src={logosEquipos[fila.equipo]}
                            alt={fila.equipo}
                            width={32}
                            height={32}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <span className="font-bold text-slate-800 text-xs sm:text-base sm:text-lg group-hover:text-[#0b4a6f] transition-colors leading-tight">
                          {fila.equipo}
                        </span>
                      </div>
                    </td>

                    <td className="px-2 sm:px-4 py-3 sm:py-5 text-center font-mono text-xs sm:text-sm font-semibold text-slate-600">{fila.pj}</td>
                    <td className="px-2 sm:px-4 py-3 sm:py-5 text-center font-mono text-xs sm:text-sm text-slate-500 hidden sm:table-cell">{fila.pg}</td>
                    <td className="px-2 sm:px-4 py-3 sm:py-5 text-center font-mono text-xs sm:text-sm text-slate-500 hidden sm:table-cell">{fila.pe}</td>
                    <td className="px-2 sm:px-4 py-3 sm:py-5 text-center font-mono text-xs sm:text-sm text-slate-500 hidden sm:table-cell">{fila.pp}</td>
                    <td className="px-2 sm:px-4 py-3 sm:py-5 text-center font-mono text-xs sm:text-sm text-green-600 hidden md:table-cell">{fila.gf}</td>
                    <td className="px-2 sm:px-4 py-3 sm:py-5 text-center font-mono text-xs sm:text-sm text-red-500 hidden md:table-cell">{fila.gc}</td>

                    <td className="px-2 sm:px-4 py-3 sm:py-5 text-center">
                      <span className={`inline-flex px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-bold font-mono tracking-wider shadow-sm border ${
                        fila.dg > 0
                          ? "bg-green-50 text-green-700 border-green-200"
                          : fila.dg < 0
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}>
                        {fila.dg > 0 ? `+${fila.dg}` : fila.dg}
                      </span>
                    </td>

                    <td className="px-2 sm:px-6 py-3 sm:py-5 text-center">
                      <div className="mx-auto inline-flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#091f36] to-[#0b4a6f] text-sm sm:text-xl font-black text-white shadow-md shadow-[#0b4a6f]/20 group-hover:scale-110 transition-transform">
                        {fila.pts}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
