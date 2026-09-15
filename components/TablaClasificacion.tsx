import Link from "next/link";
import type { ReactNode } from "react";
import Escudo, { type DatosEscudo } from "@/components/Escudo";
import type { FilaClasificacion } from "@/lib/clasificacion";
import { getRankTrophy } from "@/lib/helpers";

type Props = {
  filas: FilaClasificacion[];
  escudo: (equipo: string) => DatosEscudo;
  /** Ficha del equipo, si la tiene */
  rutaEquipo?: (equipo: string) => string | undefined;
  /** Columna extra al final, p. ej. a qué triangular va cada puesto */
  extra?: { titulo: string; celda: (fila: FilaClasificacion, indice: number) => ReactNode };
};

const th = "px-2 sm:px-4 py-3 sm:py-5 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400";

export default function TablaClasificacion({ filas, escudo, rutaEquipo, extra }: Props) {
  // Sin partidos jugados el orden es alfabético: nada de medallas todavía
  const hayPartidos = filas.some((fila) => fila.pj > 0);

  return (
    <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-xl shadow-[#0b4a6f]/5 border border-slate-100">
      <div className="overflow-x-auto w-full p-2 sm:p-4">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-100 bg-white">
              <th className={`${th} w-10 sm:w-16`}>#</th>
              <th className="px-3 sm:px-6 py-3 sm:py-5 text-left text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">Equipo</th>
              <th className={th}>PJ</th>
              <th className={`${th} hidden sm:table-cell`}>PG</th>
              <th className={`${th} hidden sm:table-cell`}>PE</th>
              <th className={`${th} hidden sm:table-cell`}>PP</th>
              <th className={`${th} hidden md:table-cell`}>GF</th>
              <th className={`${th} hidden md:table-cell`}>GC</th>
              <th className={th}>DG</th>
              <th className="px-2 sm:px-6 py-3 sm:py-5 text-center text-xs sm:text-sm font-black uppercase tracking-wider text-[#0b4a6f]">PTS</th>
              {extra && <th className={th}>{extra.titulo}</th>}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {filas.map((fila, index) => {
              const ruta = rutaEquipo?.(fila.equipo);
              const nombre = (
                <span className="font-bold text-slate-800 text-xs sm:text-base sm:text-lg group-hover:text-[#0b4a6f] transition-colors leading-tight">
                  {fila.equipo}
                </span>
              );

              return (
                <tr key={fila.equipo} className="group transition-colors hover:bg-slate-50/80">
                  <td className="px-2 sm:px-4 py-3 sm:py-5 text-center text-xl sm:text-2xl drop-shadow-sm font-semibold">
                    {hayPartidos ? (
                      getRankTrophy(index)
                    ) : (
                      <span className="text-slate-400 font-mono text-sm sm:text-base font-bold">{index + 1}</span>
                    )}
                  </td>

                  <td className="px-2 sm:px-6 py-3 sm:py-5">
                    <div className="flex items-center gap-2 sm:gap-4">
                      <div className="shrink-0 h-7 w-7 sm:h-12 sm:w-12 rounded-full overflow-hidden bg-white ring-2 ring-slate-100 shadow-sm flex items-center justify-center p-1 sm:p-1.5 transition-transform group-hover:scale-105 group-hover:ring-[#0b4a6f]/20">
                        <Escudo nombre={fila.equipo} {...escudo(fila.equipo)} size={32} />
                      </div>
                      {ruta ? <Link href={ruta} className="hover:underline decoration-[#0b4a6f]">{nombre}</Link> : nombre}
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

                  {extra && <td className="px-2 sm:px-4 py-3 sm:py-5 text-center">{extra.celda(fila, index)}</td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
