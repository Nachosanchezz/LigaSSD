import PageHeader from "@/components/PageHeader";
import {
  bote,
  cuotaPorEquipo,
  CUOTA_POR_JUGADOR,
  EQUIPOS,
  importePremio,
  JUGADORES_POR_EQUIPO,
  multas,
  premios,
} from "@/data/split3/bote";

export const metadata = { title: "Bote y premios · Liga SSD" };

const euros = (valor: number) => `${valor.toLocaleString("es-ES")} €`;

export default function BotePage() {
  const total = premios.reduce((suma, premio) => suma + premio.porcentaje, 0);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      <PageHeader title="Bote y premios" subtitle="Split 3 · Cuánto se junta y cómo se reparte" />

      <section className="mx-auto max-w-4xl px-3 sm:px-6 -mt-10 sm:-mt-12 relative z-10 space-y-5 sm:space-y-6">

        {/* El bote */}
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#091f36] to-[#0b4a6f] p-6 sm:p-10 text-center text-white shadow-xl">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-yellow-400">Bote del Split</p>
          <p className="mt-2 text-5xl sm:text-7xl font-black tabular-nums">{euros(bote)}</p>
          <p className="mt-3 text-sm text-blue-200">
            {EQUIPOS} equipos × {JUGADORES_POR_EQUIPO} jugadores × {euros(CUOTA_POR_JUGADOR)}
          </p>
        </div>

        {/* Cuota y multas */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-md">
            <h2 className="flex items-center gap-2 text-sm sm:text-base font-black uppercase tracking-wide text-[#091f36]">
              <span className="inline-block h-5 w-1 rounded-full bg-yellow-400"></span>
              Cuota
            </h2>
            <dl className="mt-4 divide-y divide-slate-50">
              <div className="flex items-baseline justify-between gap-3 py-2.5">
                <dt className="text-sm text-slate-600">Por jugador</dt>
                <dd className="text-lg font-black tabular-nums text-[#0b4a6f]">{euros(CUOTA_POR_JUGADOR)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 py-2.5">
                <dt className="text-sm text-slate-600">Por equipo ({JUGADORES_POR_EQUIPO} jugadores)</dt>
                <dd className="text-lg font-black tabular-nums text-[#0b4a6f]">{euros(cuotaPorEquipo)}</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs sm:text-sm text-slate-500">
              Cada presidente reúne el dinero de su equipo y lo abona a la liga. Hay plazo de sobra, pero se agradece cuanto antes.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 sm:p-6 shadow-md">
            <h2 className="flex items-center gap-2 text-sm sm:text-base font-black uppercase tracking-wide text-[#091f36]">
              <span className="inline-block h-5 w-1 rounded-full bg-yellow-400"></span>
              Multas
            </h2>
            <dl className="mt-4 divide-y divide-slate-50">
              {multas.map((multa) => (
                <div key={multa.motivo} className="flex items-baseline justify-between gap-3 py-2.5">
                  <dt className="text-sm text-slate-600">{multa.motivo}</dt>
                  <dd className="text-lg font-black tabular-nums text-red-600">{euros(multa.importe)}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs sm:text-sm text-slate-500">
              Las multas van aparte del bote: lo que entre por ahí no está repartido en la tabla de premios.
            </p>
          </div>
        </div>

        {/* Premios */}
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-100 bg-white shadow-xl shadow-[#0b4a6f]/5">
          <div className="flex items-center gap-2 bg-gradient-to-r from-[#091f36] to-[#0b4a6f] px-5 py-4 sm:px-8 sm:py-5">
            <span className="h-6 w-1.5 shrink-0 rounded-full bg-yellow-400"></span>
            <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight text-white">Reparto de premios</h2>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-100">
                <th className="px-4 sm:px-8 py-3 text-left text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Premio</th>
                <th className="px-2 py-3 text-right text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">%</th>
                <th className="px-4 sm:px-8 py-3 text-right text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Importe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {premios.map((premio) => (
                <tr key={premio.nombre} className="transition-colors hover:bg-slate-50/80">
                  <td className="px-4 sm:px-8 py-3 sm:py-4">
                    <p className="text-sm sm:text-base font-bold text-slate-800">{premio.nombre}</p>
                    <span className="mt-1.5 block h-1.5 w-full max-w-[220px] overflow-hidden rounded-full bg-slate-100">
                      <span className="block h-full rounded-full bg-yellow-400" style={{ width: `${premio.porcentaje}%` }} />
                    </span>
                  </td>
                  <td className="px-2 py-3 sm:py-4 text-right font-mono text-xs sm:text-sm text-slate-500 tabular-nums">{premio.porcentaje} %</td>
                  <td className="px-4 sm:px-8 py-3 sm:py-4 text-right text-base sm:text-xl font-black tabular-nums text-[#0b4a6f]">
                    {euros(importePremio(premio))}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-100 bg-slate-50/60">
                <td className="px-4 sm:px-8 py-3 sm:py-4 text-sm font-black uppercase tracking-wide text-slate-500">Total</td>
                <td className="px-2 py-3 sm:py-4 text-right font-mono text-xs sm:text-sm text-slate-500 tabular-nums">{total} %</td>
                <td className="px-4 sm:px-8 py-3 sm:py-4 text-right text-base sm:text-xl font-black tabular-nums text-[#091f36]">{euros(bote)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <p className="text-center text-xs text-slate-400">
          Los M€ de la subasta son millones ficticios: la cuota, el bote y las multas son euros reales.
        </p>
      </section>
    </div>
  );
}
