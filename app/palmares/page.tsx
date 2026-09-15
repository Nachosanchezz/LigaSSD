import Link from "next/link";
import Escudo from "@/components/Escudo";
import PageHeader from "@/components/PageHeader";
import { nombreCompletoJugador } from "@/lib/helpers";
import { escudoHistorico, getPalmares, type FilaHistorica } from "@/lib/palmares";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Palmarés",
  description: "Campeones de cada split y los números de todos los jugadores desde que empezó la liga.",
};

function Equipo({ nombre }: { nombre?: string }) {
  if (!nombre) return <span className="text-slate-400">—</span>;
  const escudo = escudoHistorico(nombre);
  return (
    <span className="inline-flex items-center gap-2">
      {escudo && (
        <span className="h-6 w-6 shrink-0">
          <Escudo nombre={nombre} {...escudo} size={24} />
        </span>
      )}
      <span className="font-bold">{nombre}</span>
    </span>
  );
}

function TablaHistorica({
  titulo,
  filas,
  etiqueta,
  limite = 10,
}: {
  titulo: string;
  filas: FilaHistorica[];
  etiqueta: string;
  limite?: number;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md">
      <div className="flex items-center gap-2 bg-gradient-to-r from-[#091f36] to-[#0b4a6f] px-5 py-3.5">
        <span className="h-5 w-1 shrink-0 rounded-full bg-yellow-400"></span>
        <h2 className="text-base font-black uppercase tracking-tight text-white sm:text-lg">{titulo}</h2>
      </div>

      {filas.length === 0 ? (
        <p className="p-6 text-center text-sm text-slate-400">Todavía no hay datos.</p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-slate-100 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-400">
              <th className="px-3 py-2 text-left">Jugador</th>
              <th className="px-1 py-2 text-center">S1</th>
              <th className="px-1 py-2 text-center">S2</th>
              <th className="px-1 py-2 text-center">S3</th>
              <th className="px-3 py-2 text-right text-[#0b4a6f]">{etiqueta}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filas.slice(0, limite).map((fila, indice) => (
              <tr key={fila.persona.id} className="hover:bg-slate-50/80">
                <td className="px-3 py-2.5">
                  <Link href={`/jugadores/${fila.persona.id}`} className="flex items-baseline gap-2 hover:text-[#0b4a6f] hover:underline">
                    <span className="w-4 shrink-0 font-display text-base font-extrabold italic text-slate-300">{indice + 1}</span>
                    <span className="truncate font-semibold text-slate-700">
                      {fila.persona.apodo ?? nombreCompletoJugador(fila.persona)}
                    </span>
                  </Link>
                </td>
                <td className="px-1 py-2.5 text-center font-mono text-xs text-slate-400">{fila.split1 || "·"}</td>
                <td className="px-1 py-2.5 text-center font-mono text-xs text-slate-400">{fila.split2 || "·"}</td>
                <td className="px-1 py-2.5 text-center font-mono text-xs text-slate-400">{fila.split3 || "·"}</td>
                <td className="px-3 py-2.5 text-right font-display text-xl font-black italic tabular-nums text-[#0b4a6f]">
                  {fila.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default async function PalmaresPage() {
  const { campeones, goleadores, asistentes, mvps } = await getPalmares();

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      <PageHeader kicker="Liga SSD" title="Palmarés" subtitle="Campeones y números de las tres temporadas" />

      <div className="mx-auto max-w-6xl px-3 sm:px-6 -mt-10 sm:-mt-12 relative z-10 space-y-6 sm:space-y-8">

        {/* Campeones */}
        <section className="grid gap-4 sm:grid-cols-3">
          {campeones.map((campeon) => (
            <article
              key={campeon.split}
              className={`rounded-2xl border p-5 shadow-md ${
                campeon.enJuego ? "border-yellow-400 bg-yellow-50" : "border-slate-100 bg-white"
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-2xl font-black uppercase tracking-tight text-[#091f36]">{campeon.split}</h2>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400">{campeon.periodo}</span>
              </div>

              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-400">
                    {campeon.enJuego ? "Campeón" : "🏆 Campeón"}
                  </dt>
                  <dd className="mt-0.5 text-slate-800">
                    {campeon.enJuego ? <span className="font-bold text-yellow-700">En juego</span> : <Equipo nombre={campeon.campeon} />}
                  </dd>
                </div>
                {campeon.subcampeon && (
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-400">Subcampeón</dt>
                    <dd className="mt-0.5 text-slate-700"><Equipo nombre={campeon.subcampeon} /></dd>
                  </div>
                )}
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-400">Liga regular</dt>
                  <dd className="mt-0.5 text-slate-700">
                    {campeon.ligaRegular ? <Equipo nombre={campeon.ligaRegular} /> : <span className="text-slate-400">Por decidir</span>}
                  </dd>
                </div>
              </dl>

              <Link href={campeon.ruta} className="mt-4 inline-block text-xs font-bold uppercase tracking-wide text-[#0b4a6f] hover:underline">
                Ver {campeon.split} →
              </Link>
            </article>
          ))}
        </section>

        <TablaHistorica titulo="Goleadores de siempre" filas={goleadores} etiqueta="Goles" />

        <div className="grid gap-6 md:grid-cols-2">
          <TablaHistorica titulo="Asistencias de siempre" filas={asistentes} etiqueta="Asist." limite={8} />
          <TablaHistorica titulo="MVPs de siempre" filas={mvps} etiqueta="MVPs" limite={8} />
        </div>

        <p className="text-center text-xs text-slate-400">
          Del Split 1 solo se guardaron goles y asistencias, y por nombre: si alguien no aparece, es que su apodo de entonces
          no casa con su ficha de ahora.
        </p>
      </div>
    </div>
  );
}
