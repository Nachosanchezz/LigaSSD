import Link from "next/link";
import Escudo from "@/components/Escudo";
import PageHeader from "@/components/PageHeader";
import { getClasificacionFantasy, getJornadasFantasy, getSesion } from "@/lib/fantasy-datos";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const MEDALLAS = ["🥇", "🥈", "🥉"];

export default async function ClasificacionFantasyPage() {
  const [clasificacion, jornadas, sesion] = await Promise.all([
    getClasificacionFantasy(),
    getJornadasFantasy(),
    getSesion(),
  ]);
  const jugadas = jornadas.filter((jornada) => jornada.jugada);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <PageHeader
        kicker="Fantasy · Split 3"
        title="Clasificación"
        subtitle={
          jugadas.length === 0
            ? "Todavía no se ha jugado ninguna jornada"
            : `${clasificacion.length} participantes · ${jugadas.length} ${jugadas.length === 1 ? "jornada" : "jornadas"}`
        }
      />

      <div className="relative z-10 mx-auto -mt-10 max-w-4xl space-y-5 px-3 sm:-mt-12 sm:px-6">
        {clasificacion.length === 0 ? (
          <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-md">
            <p className="text-sm text-slate-500">
              Aún no se ha apuntado nadie. <Link href="/fantasy" className="font-bold text-[#0b4a6f] hover:underline">Entra y sé el primero</Link>.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 text-[10px] uppercase tracking-widest text-slate-400">
                    <th className="px-3 py-3 text-left font-black">#</th>
                    <th className="px-2 py-3 text-left font-black">Participante</th>
                    {jugadas.map((jornada) => (
                      <th key={jornada.numero} className="px-2 py-3 text-center font-black">
                        <Link href={`/fantasy/jornada/${jornada.numero}`} className="hover:text-[#0b4a6f]">
                          J{jornada.numero}
                        </Link>
                      </th>
                    ))}
                    <th className="px-3 py-3 text-right font-black text-[#0b4a6f]">Pts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {clasificacion.map((fila, indice) => (
                    <tr
                      key={fila.participante.personaId}
                      className={fila.participante.personaId === sesion?.personaId ? "bg-yellow-50" : ""}
                    >
                      <td className="px-3 py-3 text-center font-black text-slate-400">
                        {MEDALLAS[indice] ?? indice + 1}
                      </td>
                      <td className="px-2 py-3">
                        <div className="flex items-center gap-2">
                          <span className="h-7 w-7 shrink-0">
                            <Escudo
                              nombre={fila.participante.equipo ?? fila.participante.apodo}
                              logo={fila.participante.logo}
                              color={fila.participante.color}
                              size={28}
                            />
                          </span>
                          <span className="truncate font-bold text-slate-800">{fila.participante.apodo}</span>
                        </div>
                      </td>
                      {jugadas.map((jornada) => (
                        <td
                          key={jornada.numero}
                          className="px-2 py-3 text-center tabular-nums text-slate-500"
                        >
                          {fila.porJornada[jornada.numero] ?? 0}
                        </td>
                      ))}
                      <td className="px-3 py-3 text-right font-black tabular-nums text-[#0b4a6f]">{fila.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {clasificacion.some((fila) => fila.sinAlinear > 0) && (
              <p className="border-t border-slate-100 px-4 py-3 text-[11px] text-slate-400">
                Quien no alinea a nadie en una jornada se lleva 0 puntos de esa jornada.
              </p>
            )}
          </div>
        )}

        {jugadas.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {jugadas.map((jornada) => (
              <Link
                key={jornada.numero}
                href={`/fantasy/jornada/${jornada.numero}`}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-[#0b4a6f] shadow-sm transition hover:border-[#0b4a6f]/30"
              >
                Jornada {jornada.numero}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
