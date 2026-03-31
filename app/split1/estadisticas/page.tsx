import PageHeader from "@/components/PageHeader";
import { equiposSplit1, goleadoresSplit1 } from "@/data/split1";


export default function Split1EstadisticasPage() {
  const byGoles = [...goleadoresSplit1].sort((a, b) => b.goles - a.goles);
  const byAsistencias = [...goleadoresSplit1]
    .filter((j) => j.asistencias > 0)
    .sort((a, b) => b.asistencias - a.asistencias);
  const withCards = [...goleadoresSplit1]
    .filter((j) => j.rojas > 0 || j.amarillas > 0)
    .sort((a, b) => b.rojas - a.rojas || b.amarillas - a.amarillas);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      <PageHeader title="Estadísticas" subtitle="Split 1 · Sep 2024 – Feb 2025" />

      <div className="mx-auto max-w-6xl px-3 sm:px-6 -mt-10 sm:-mt-12 relative z-10 space-y-6">

        {/* Goleadores */}
        <div className="rounded-2xl bg-white shadow-md border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-black text-[#091f36] uppercase tracking-wide text-sm sm:text-base">Goleadores</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-3 sm:px-5 py-3 text-left text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 w-10">#</th>
                  <th className="px-3 sm:px-5 py-3 text-left text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Jugador</th>
                  <th className="px-3 sm:px-5 py-3 text-left text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 hidden sm:table-cell">Equipo</th>
                  <th className="px-3 sm:px-5 py-3 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-yellow-500">Goles</th>
                  <th className="px-3 sm:px-5 py-3 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 hidden md:table-cell">Asistencias</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {byGoles.map((jugador, i) => (
                  <tr key={`${jugador.nombre}-${jugador.equipo}`} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 sm:px-5 py-3 text-center font-bold text-slate-300 text-sm">
                      {i + 1}
                    </td>
                    <td className="px-3 sm:px-5 py-3">
                      <span className="font-bold text-slate-800 text-xs sm:text-sm">{jugador.nombre}</span>
                    </td>
                    <td className="px-3 sm:px-5 py-3 text-xs text-slate-500 hidden sm:table-cell">{jugador.equipo}</td>
                    <td className="px-3 sm:px-5 py-3 text-center">
                      <span className="inline-flex h-7 w-10 sm:h-8 sm:w-12 items-center justify-center rounded-lg bg-yellow-400 text-xs sm:text-sm font-black text-[#091f36]">
                        {jugador.goles}
                      </span>
                    </td>
                    <td className="px-3 sm:px-5 py-3 text-center text-xs sm:text-sm font-semibold text-slate-500 hidden md:table-cell">
                      {jugador.asistencias > 0 ? jugador.asistencias : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Asistentes */}
        <div className="rounded-2xl bg-white shadow-md border border-slate-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-black text-[#091f36] uppercase tracking-wide text-sm sm:text-base">Asistentes</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-3 sm:px-5 py-3 text-left text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 w-10">#</th>
                  <th className="px-3 sm:px-5 py-3 text-left text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Jugador</th>
                  <th className="px-3 sm:px-5 py-3 text-left text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 hidden sm:table-cell">Equipo</th>
                  <th className="px-3 sm:px-5 py-3 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-500">Asist.</th>
                  <th className="px-3 sm:px-5 py-3 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 hidden md:table-cell">Goles</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {byAsistencias.map((jugador, i) => (
                  <tr key={`${jugador.nombre}-${jugador.equipo}`} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-3 sm:px-5 py-3 text-center font-bold text-slate-300 text-sm">{i + 1}</td>
                    <td className="px-3 sm:px-5 py-3">
                      <span className="font-bold text-slate-800 text-xs sm:text-sm">{jugador.nombre}</span>
                    </td>
                    <td className="px-3 sm:px-5 py-3 text-xs text-slate-500 hidden sm:table-cell">{jugador.equipo}</td>
                    <td className="px-3 sm:px-5 py-3 text-center">
                      <span className="inline-flex h-7 w-10 sm:h-8 sm:w-12 items-center justify-center rounded-lg bg-blue-100 text-xs sm:text-sm font-black text-blue-700">
                        {jugador.asistencias}
                      </span>
                    </td>
                    <td className="px-3 sm:px-5 py-3 text-center text-xs sm:text-sm font-semibold text-slate-500 hidden md:table-cell">{jugador.goles}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tarjetas */}
        {withCards.length > 0 && (
          <div className="rounded-2xl bg-white shadow-md border border-slate-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-black text-[#091f36] uppercase tracking-wide text-sm sm:text-base">Tarjetas</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="px-3 sm:px-5 py-3 text-left text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Jugador</th>
                    <th className="px-3 sm:px-5 py-3 text-left text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 hidden sm:table-cell">Equipo</th>
                    <th className="px-3 sm:px-5 py-3 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-red-500">Rojas</th>
                    <th className="px-3 sm:px-5 py-3 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-yellow-500">Amarillas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {withCards.map((jugador) => (
                    <tr key={`${jugador.nombre}-${jugador.equipo}`} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-3 sm:px-5 py-3">
                        <span className="font-bold text-slate-800 text-xs sm:text-sm">{jugador.nombre}</span>
                      </td>
                      <td className="px-3 sm:px-5 py-3 text-xs text-slate-500 hidden sm:table-cell">{jugador.equipo}</td>
                      <td className="px-3 sm:px-5 py-3 text-center">
                        {jugador.rojas > 0 ? (
                          <span className="inline-flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded text-xs font-black text-white bg-red-500 shadow-sm">
                            {jugador.rojas}
                          </span>
                        ) : <span className="text-slate-300">–</span>}
                      </td>
                      <td className="px-3 sm:px-5 py-3 text-center">
                        {jugador.amarillas > 0 ? (
                          <span className="inline-flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded text-xs font-black text-[#091f36] bg-yellow-400 shadow-sm">
                            {jugador.amarillas}
                          </span>
                        ) : <span className="text-slate-300">–</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
