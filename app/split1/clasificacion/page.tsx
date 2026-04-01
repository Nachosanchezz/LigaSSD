import PageHeader from "@/components/PageHeader";
import TeamLogoSplit1 from "@/components/TeamLogoSplit1";
import { clasificacionSplit1 } from "@/data/split1";

export default function Split1ClasificacionPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      <PageHeader title="Clasificación" subtitle="Split 1 · Sep 2024 – Feb 2025" />

      <section className="mx-auto max-w-6xl px-3 sm:px-6 -mt-10 sm:-mt-12 relative z-10">
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-xl shadow-[#0b4a6f]/5 border border-slate-100">
          <div className="overflow-x-auto w-full p-2 sm:p-4">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-100 bg-white">
                  <th className="px-2 sm:px-4 py-3 sm:py-5 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 w-10 sm:w-16">#</th>
                  <th className="px-3 sm:px-6 py-3 sm:py-5 text-left text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Equipo</th>
                  <th className="px-2 sm:px-4 py-3 sm:py-5 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">PJ</th>
                  <th className="px-2 sm:px-4 py-3 sm:py-5 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 hidden md:table-cell">GF</th>
                  <th className="px-2 sm:px-4 py-3 sm:py-5 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 hidden md:table-cell">GC</th>
                  <th className="px-2 sm:px-4 py-3 sm:py-5 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">DG</th>
                  <th className="px-2 sm:px-6 py-3 sm:py-5 text-center text-xs sm:text-sm font-black uppercase tracking-wider text-[#0b4a6f]">PTS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {clasificacionSplit1.map((fila, index) => {
                  const medals = ["🥇", "🥈", "🥉"];
                  return (
                    <tr key={fila.equipo} className="group transition-colors hover:bg-slate-50/80">
                      <td className="px-2 sm:px-4 py-3 sm:py-5 text-center text-xl sm:text-2xl drop-shadow-sm font-semibold">
                        {medals[index] ?? <span className="text-sm sm:text-base font-bold text-slate-400">{index + 1}</span>}
                      </td>
                      <td className="px-2 sm:px-6 py-3 sm:py-5">
                        <div className="flex items-center gap-2 sm:gap-4">
                          <TeamLogoSplit1 nombre={fila.equipo} size="sm" />
                          <span className="font-bold text-slate-800 text-xs sm:text-base group-hover:text-[#0b4a6f] transition-colors leading-tight">
                            {fila.equipo}
                          </span>
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-3 sm:py-5 text-center font-mono text-xs sm:text-sm font-semibold text-slate-600">{fila.pj}</td>
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
