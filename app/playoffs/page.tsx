import Link from "next/link";
import Escudo from "@/components/Escudo";
import PageHeader from "@/components/PageHeader";
import { TRIANGULARES } from "@/data/split3/fases";
import type { FilaClasificacion } from "@/lib/clasificacion";
import { ladoGanador, leerMarcador } from "@/lib/resultado";
import { escudoSplit3, getSplit3, type PartidoFaseSplit3, type TriangularSplit3 } from "@/lib/split3";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function EquipoFila({
  nombre,
  definido,
  ganador,
  goles,
}: {
  nombre: string;
  definido: boolean;
  ganador: boolean;
  goles?: number;
}) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2.5 ${ganador ? "bg-yellow-50/60" : ""}`}>
      <div className="h-6 w-6 shrink-0">
        {definido ? (
          <Escudo nombre={nombre} {...escudoSplit3(nombre)} size={24} />
        ) : (
          <span className="flex h-full w-full items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[8px] font-black text-slate-400">?</span>
        )}
      </div>
      <span
        className={`flex-1 truncate text-xs sm:text-sm font-bold leading-tight ${
          !definido ? "italic text-slate-400" : ganador ? "text-slate-900" : "text-slate-700"
        }`}
      >
        {nombre}
      </span>
      {goles !== undefined && (
        <span className={`w-5 shrink-0 text-center font-mono text-sm font-black ${ganador ? "text-slate-900" : "text-slate-400"}`}>
          {goles}
        </span>
      )}
    </div>
  );
}

function TarjetaPartido({ partido, etiqueta }: { partido: PartidoFaseSplit3; etiqueta?: string }) {
  const jugado = partido.estado === "Finalizado";
  const marcador = jugado ? leerMarcador(partido.resultado) : null;
  const ganador = marcador ? ladoGanador(marcador) : null;

  const tarjeta = (
    <div
      className={`overflow-hidden rounded-xl border-2 bg-white shadow-sm transition-shadow ${
        jugado ? "border-[#0b4a6f]/30 hover:border-[#0b4a6f]/50 hover:shadow-md" : "border-slate-100"
      }`}
    >
      {jugado ? (
        <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#091f36] to-[#0b4a6f] px-3 py-1">
          {marcador?.penaltis && (
            <span className="text-[10px] font-black text-yellow-400 tabular-nums">
              Pen. {marcador.penaltis.local}-{marcador.penaltis.visitante}
            </span>
          )}
          <span className="text-[9px] font-bold uppercase tracking-widest text-blue-200 opacity-70">Ver acta →</span>
        </div>
      ) : (
        <div className="border-b border-slate-100 bg-slate-50 px-3 py-1 text-center text-[10px] font-medium text-slate-500">
          {partido.dia ? `${partido.dia}${partido.hora ? ` · ${partido.hora}` : ""}` : "Fecha por confirmar"}
        </div>
      )}
      <EquipoFila nombre={partido.local} definido={partido.definido} ganador={ganador === "local"} goles={marcador?.local} />
      <div className="border-t border-slate-100" />
      <EquipoFila nombre={partido.visitante} definido={partido.definido} ganador={ganador === "visitante"} goles={marcador?.visitante} />
    </div>
  );

  return (
    <div className="w-full">
      {etiqueta && (
        <p className="mb-1.5 text-center text-[9px] font-bold uppercase tracking-widest text-slate-400">{etiqueta}</p>
      )}
      {jugado ? <Link href={`/partidos/${partido.id}`}>{tarjeta}</Link> : tarjeta}
    </div>
  );
}

function TablaTriangular({ filas, terminado }: { filas: FilaClasificacion[]; terminado: boolean }) {
  return (
    <table className="w-full border-collapse text-xs sm:text-sm">
      <thead>
        <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          <th className="py-2 pl-3 text-left">Equipo</th>
          <th className="py-2 text-center">PJ</th>
          <th className="py-2 text-center">DG</th>
          <th className="py-2 pr-3 text-center text-[#0b4a6f]">Pts</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {filas.map((fila, indice) => (
          <tr key={fila.equipo} className={indice < 2 ? "" : "opacity-60"}>
            <td className="py-2 pl-3">
              <div className="flex items-center gap-2">
                <span className="h-5 w-5 shrink-0">
                  <Escudo nombre={fila.equipo} {...escudoSplit3(fila.equipo)} size={20} />
                </span>
                <span className="font-bold text-slate-800">{fila.equipo}</span>
                {terminado && (
                  <span
                    className={`rounded px-1.5 py-0.5 text-[9px] font-black uppercase ${
                      indice < 2 ? "bg-green-100 text-green-700" : "bg-red-50 text-red-600"
                    }`}
                  >
                    {indice < 2 ? "Semis" : "Fuera"}
                  </span>
                )}
              </div>
            </td>
            <td className="py-2 text-center font-mono text-slate-600">{fila.pj}</td>
            <td className="py-2 text-center font-mono text-slate-600">{fila.dg > 0 ? `+${fila.dg}` : fila.dg}</td>
            <td className="py-2 pr-3 text-center font-black text-[#0b4a6f]">{fila.pts}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Triangular({ triangular, provisionales }: { triangular: TriangularSplit3; provisionales: (string | undefined)[] }) {
  const puestos = TRIANGULARES[triangular.grupo];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg shadow-[#0b4a6f]/5">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-[#091f36] to-[#0b4a6f] px-5 py-3.5">
        <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-tight text-white">
          <span className="h-5 w-1 shrink-0 rounded-full bg-yellow-400" />
          Triangular {triangular.grupo}
        </h3>
        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">
          {puestos.map((puesto) => `${puesto}º`).join(" · ")} de la liguilla
        </span>
      </div>

      <div className="space-y-4 p-4">
        {triangular.tabla.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-slate-100">
            <TablaTriangular filas={triangular.tabla} terminado={triangular.terminado} />
          </div>
        ) : (
          <ul className="divide-y divide-slate-50 rounded-xl border border-slate-100">
            {puestos.map((puesto, indice) => (
              <li key={puesto} className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm">
                <span className="font-bold text-slate-700">{puesto}º liguilla</span>
                {provisionales[indice] && (
                  <span className="text-xs text-slate-400">
                    ahora: <strong className="text-slate-600">{provisionales[indice]}</strong>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}

        <div className="space-y-3">
          {triangular.partidos.map((partido) => (
            <TarjetaPartido key={partido.id} partido={partido} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Titulo({ children, detalle }: { children: React.ReactNode; detalle?: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-slate-50 pb-4">
      <h2 className="flex items-center gap-3 text-xl sm:text-3xl font-black uppercase tracking-tight text-[#0b4a6f]">
        <span className="inline-block h-6 sm:h-8 w-1.5 sm:w-2 rounded-full bg-yellow-400"></span>
        {children}
      </h2>
      {detalle && <p className="text-xs sm:text-sm text-slate-500">{detalle}</p>}
    </div>
  );
}

export default async function PlayoffsPage() {
  const split = await getSplit3();
  const hayPartidosJugados = split.clasificacion.some((fila) => fila.pj > 0);
  const provisional = (puesto: number) =>
    !split.liguillaTerminada && hayPartidosJugados ? split.clasificacion[puesto - 1]?.equipo : undefined;

  const [semi1, semi2] = split.semifinales;

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      <PageHeader kicker="Split 3" title="Playoffs" subtitle="Play-in y fase final" />

      <section className="mx-auto max-w-6xl px-3 sm:px-6 -mt-10 sm:-mt-12 relative z-10 space-y-6 sm:space-y-8">
        {split.campeon && (
          <div className="rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-500 p-6 text-center shadow-xl shadow-yellow-400/30">
            <div className="mb-3 text-4xl">🏆</div>
            <div className="mx-auto mb-3 h-16 w-16 rounded-full border-2 border-white/50 bg-white/30 p-1.5">
              <Escudo nombre={split.campeon} {...escudoSplit3(split.campeon)} size={52} />
            </div>
            <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-yellow-900/70">Campeón del Split 3</p>
            <p className="text-lg font-black uppercase text-[#091f36]">{split.campeon}</p>
          </div>
        )}

        <div className="rounded-2xl sm:rounded-[2rem] border border-slate-100 bg-white p-4 sm:p-8 shadow-xl shadow-[#0b4a6f]/5">
          <Titulo detalle="Partido único · pasan los dos primeros de cada triangular">Play-in</Titulo>
          <div className="grid gap-6 md:grid-cols-2">
            {split.triangulares.map((triangular) => (
              <Triangular
                key={triangular.grupo}
                triangular={triangular}
                provisionales={TRIANGULARES[triangular.grupo].map(provisional)}
              />
            ))}
          </div>
        </div>

        <div className="rounded-2xl sm:rounded-[2rem] border border-slate-100 bg-white p-4 sm:p-8 shadow-xl shadow-[#0b4a6f]/5">
          <Titulo detalle="Partido único · si hay empate, prórroga y penaltis">Fase final</Titulo>
          <div className="grid items-center gap-6 md:grid-cols-3">
            <div className="grid gap-4 sm:grid-cols-2 md:col-span-2">
              <TarjetaPartido partido={semi1} etiqueta="Semifinal 1 · 1º A vs 2º B" />
              <TarjetaPartido partido={semi2} etiqueta="Semifinal 2 · 1º B vs 2º A" />
            </div>
            <TarjetaPartido partido={split.final} etiqueta="Final" />
          </div>
        </div>
      </section>
    </div>
  );
}
