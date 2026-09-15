import Link from "next/link";
import Escudo from "@/components/Escudo";
import PageHeader from "@/components/PageHeader";
import { DRAFT_FECHA, DRAFT_HORARIO, lotesDraft, type LoteDraft } from "@/data/split3/draft";
import { equiposSplit3 } from "@/data/split3/equipos";
import { nombreCompletoJugador } from "@/lib/helpers";
import { plantillaSplit3 } from "@/lib/split3";

export const metadata = {
  title: "El draft",
  description: "Cómo se repartieron los 35 jugadores del Split 3: plantillas, precios y todas las pujas.",
};

const equipoPorId = new Map(equiposSplit3.map((equipo) => [equipo.id, equipo]));
const vendidos = lotesDraft.filter((lote) => lote.precio !== undefined);
const segundos = (duracion: string) => {
  const [min, seg] = duracion.split(":").map(Number);
  return min * 60 + seg;
};

function Chip({ id }: { id: string }) {
  const equipo = equipoPorId.get(id);
  if (!equipo) return null;
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-bold text-slate-700">
      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: equipo.color }} aria-hidden />
      {equipo.nombre}
    </span>
  );
}

function Dato({ etiqueta, valor, detalle }: { etiqueta: string; valor: string; detalle?: string }) {
  return (
    <div className="border-t border-slate-100 py-3">
      <p className="font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-slate-400">{etiqueta}</p>
      <p className="mt-1 font-bold text-slate-800">{valor}</p>
      {detalle && <p className="text-sm text-slate-500">{detalle}</p>}
    </div>
  );
}

function Lote({ lote }: { lote: LoteDraft }) {
  const ganador = lote.equipo ? equipoPorId.get(lote.equipo) : undefined;
  const maximo = lote.pujas.at(-1)?.importe;

  return (
    <details className="group border-b border-slate-100">
      <summary className="flex cursor-pointer list-none items-center gap-3 px-2 py-3 hover:bg-slate-50">
        <span className="w-8 shrink-0 text-right font-display text-xl font-extrabold italic text-slate-300 tabular-nums">
          {lote.orden}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-bold text-slate-800">
              {lote.persona ? (
                <Link href={`/jugadores/${lote.persona}`} className="hover:text-[#0b4a6f] hover:underline">
                  {lote.nombre}
                </Link>
              ) : (
                lote.nombre
              )}
            </span>
            {lote.portero && (
              <span className="rounded border border-slate-200 px-1 font-mono text-[9px] uppercase tracking-wider text-slate-500">
                Por
              </span>
            )}
            {lote.repetido && <span className="text-[10px] font-bold uppercase tracking-wide text-red-500">2ª vez</span>}
          </span>
          <span className="block font-mono text-[11px] text-slate-400">
            {lote.hora} · sorteo nº {lote.sorteo} · {lote.pujas.length} {lote.pujas.length === 1 ? "puja" : "pujas"} · {lote.duracion}
          </span>
        </span>
        <span className="flex shrink-0 items-baseline gap-2 sm:gap-3">
          {ganador ? (
            <>
              <span className="hidden sm:inline"><Chip id={ganador.id} /></span>
              <span className="font-display text-xl font-extrabold italic text-yellow-600 tabular-nums">{lote.precio} M€</span>
            </>
          ) : (
            <span className="rounded-full bg-red-50 px-3 py-0.5 text-xs font-bold text-red-600">Sin pujas</span>
          )}
        </span>
      </summary>

      {lote.pujas.length === 0 ? (
        <p className="px-2 pb-4 pl-12 text-sm text-slate-500">Nadie pujó en 15 segundos: volvió al final del orden.</p>
      ) : (
        <ol className="px-2 pb-4 sm:pl-12">
          {lote.pujas.map((puja, indice) => {
            const gana = puja.importe === maximo && lote.precio !== undefined;
            return (
              <li
                key={`${puja.hora}-${puja.importe}`}
                className={`grid grid-cols-[4.5rem_1fr_auto] items-baseline gap-3 rounded px-2 py-1 text-sm ${
                  gana ? "bg-green-50 font-semibold" : indice % 2 === 0 ? "bg-slate-50/70" : ""
                }`}
              >
                <span className="font-mono text-[11px] text-slate-400">{puja.hora}</span>
                <Chip id={puja.equipo} />
                <span className="text-right font-bold tabular-nums text-slate-700">{puja.importe} M€</span>
              </li>
            );
          })}
        </ol>
      )}
    </details>
  );
}

export default function DraftPage() {
  const gastado = vendidos.reduce((suma, lote) => suma + (lote.precio ?? 0), 0);
  const presupuesto = equiposSplit3.reduce((suma, equipo) => suma + (equipo.presupuesto ?? 0), 0);
  const pujas = lotesDraft.reduce((suma, lote) => suma + lote.pujas.length, 0);

  const precios = vendidos.map((lote) => lote.precio ?? 0).sort((a, b) => a - b);
  const medio = (gastado / vendidos.length).toFixed(1).replace(".", ",");
  const mediana = precios[Math.floor(precios.length / 2)];

  const masCaro = [...vendidos].sort((a, b) => (b.precio ?? 0) - (a.precio ?? 0));
  const masDisputada = [...lotesDraft].sort((a, b) => b.pujas.length - a.pujas.length)[0];
  const masLarga = [...lotesDraft].sort((a, b) => segundos(b.duracion) - segundos(a.duracion))[0];
  const gangas = vendidos.filter((lote) => lote.precio === 1);
  const porteros = vendidos.filter((lote) => lote.portero).sort((a, b) => (b.precio ?? 0) - (a.precio ?? 0));

  const pujasPorEquipo = equiposSplit3
    .filter((equipo) => equipo.presupuesto !== undefined)
    .map((equipo) => ({
      equipo,
      total: lotesDraft.reduce((suma, lote) => suma + lote.pujas.filter((puja) => puja.equipo === equipo.id).length, 0),
    }))
    .sort((a, b) => b.total - a.total);
  const topPujas = pujasPorEquipo[0]?.total ?? 1;

  const cifras = [
    { etiqueta: "Gastado", valor: `${gastado}`, detalle: `de ${presupuesto} M€` },
    { etiqueta: "Fichajes", valor: `${vendidos.length}`, detalle: "35 de 35" },
    { etiqueta: "Subastas", valor: `${lotesDraft.length}`, detalle: `${lotesDraft.length - vendidos.length} sin pujas` },
    { etiqueta: "Pujas", valor: `${pujas}`, detalle: "en 47 minutos" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      <PageHeader kicker="Split 3" title="El draft" subtitle={`${DRAFT_FECHA} · ${DRAFT_HORARIO}`} />

      <div className="mx-auto max-w-6xl px-3 sm:px-6 -mt-10 sm:-mt-12 relative z-10 space-y-6 sm:space-y-8">

        {/* Cifras */}
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          {cifras.map(({ etiqueta, valor, detalle }) => (
            <div key={etiqueta} className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-md sm:p-6">
              <dd className="font-display text-4xl font-black italic text-[#0b4a6f] tabular-nums sm:text-5xl">{valor}</dd>
              <dt className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">{etiqueta}</dt>
              <dd className="text-xs text-slate-500">{detalle}</dd>
            </div>
          ))}
        </dl>

        {/* Plantillas */}
        <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-[#0b4a6f]/5 sm:rounded-[2rem] sm:p-8">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-slate-50 pb-4">
            <h2 className="flex items-center gap-3 text-xl font-black uppercase tracking-tight text-[#0b4a6f] sm:text-3xl">
              <span className="inline-block h-6 w-1.5 rounded-full bg-yellow-400 sm:h-8 sm:w-2"></span>
              Lo que se llevó cada uno
            </h2>
            <p className="text-xs text-slate-500 sm:text-sm">Por precio. La barra es su presupuesto repartido.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {equiposSplit3
              .filter((equipo) => equipo.presupuesto !== undefined)
              .map((equipo) => {
                const plantilla = plantillaSplit3(equipo);
                const fichajes = plantilla.filter((miembro) => !miembro.presidente);
                const gastadoEquipo = fichajes.reduce((suma, miembro) => suma + (miembro.precio ?? 0), 0);
                const sobra = (equipo.presupuesto ?? 0) - gastadoEquipo;

                return (
                  <article key={equipo.id} className="flex flex-col gap-3 rounded-2xl border border-slate-100 p-4 shadow-sm">
                    <header className="flex items-center gap-3">
                      <span className="h-9 w-9 shrink-0">
                        <Escudo nombre={equipo.nombre} logo={equipo.logo} color={equipo.color} size={36} />
                      </span>
                      <Link href={`/equipos/${equipo.slug}`} className="min-w-0">
                        <h3 className="truncate text-xl font-black uppercase text-slate-800 hover:text-[#0b4a6f]">{equipo.nombre}</h3>
                      </Link>
                    </header>

                    <div>
                      <div className="flex h-2.5 gap-0.5 overflow-hidden rounded-full bg-slate-100">
                        {fichajes.map((miembro) => (
                          <span
                            key={miembro.persona.id}
                            className="min-w-[3px] shrink-0"
                            style={{
                              flexBasis: `${((miembro.precio ?? 0) / (equipo.presupuesto ?? 1)) * 100}%`,
                              backgroundColor: equipo.color,
                            }}
                            title={`${miembro.persona.apodo ?? miembro.persona.nombre} · ${miembro.precio} M€`}
                          />
                        ))}
                      </div>
                      <p className="mt-1.5 flex justify-between text-xs text-slate-500">
                        <span>
                          <strong className="font-bold text-slate-700 tabular-nums">{gastadoEquipo}</strong> de {equipo.presupuesto} M€
                        </span>
                        <span>{sobra > 0 ? `sobran ${sobra}` : "todo gastado"}</span>
                      </p>
                    </div>

                    <ul className="text-sm">
                      {plantilla.map(({ persona, precio, presidente }) => (
                        <li key={persona.id} className="flex items-baseline justify-between gap-2 border-t border-slate-100 py-1.5">
                          <Link href={`/jugadores/${persona.id}`} className="truncate font-medium text-slate-700 hover:text-[#0b4a6f] hover:underline">
                            {persona.apodo ?? nombreCompletoJugador(persona)}
                          </Link>
                          {presidente ? (
                            <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-slate-400">Presidente</span>
                          ) : (
                            <span className="shrink-0 font-bold text-yellow-600 tabular-nums">{precio} M€</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
          </div>
        </section>

        {/* Destacados */}
        <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-md sm:p-7">
            <h2 className="mb-3 flex items-center gap-3 text-xl font-black uppercase tracking-tight text-[#0b4a6f] sm:text-2xl">
              <span className="inline-block h-6 w-1.5 rounded-full bg-yellow-400"></span>
              Lo más destacado
            </h2>
            <dl className="grid gap-x-8 sm:grid-cols-2">
              <Dato etiqueta="Fichaje más caro" valor={`${masCaro[0].nombre} · ${masCaro[0].precio} M€`} detalle={equipoPorId.get(masCaro[0].equipo ?? "")?.nombre} />
              <Dato etiqueta="Subasta más disputada" valor={`${masDisputada.nombre} · ${masDisputada.pujas.length} pujas`} detalle={`${equipoPorId.get(masDisputada.equipo ?? "")?.nombre} por ${masDisputada.precio} M€`} />
              <Dato etiqueta="Subasta más larga" valor={`${masLarga.nombre} · ${masLarga.duracion}`} detalle={masLarga.precio ? `${equipoPorId.get(masLarga.equipo ?? "")?.nombre} por ${masLarga.precio} M€` : undefined} />
              <Dato etiqueta="Gangas" valor={gangas.map((lote) => lote.nombre).join(" y ") + " · 1 M€"} detalle="Tras quedarse sin pujas la primera vez" />
              <Dato etiqueta="Precio medio" valor={`${medio} M€`} detalle={`Mediana: ${mediana} M€`} />
              <Dato etiqueta="Dinero sin gastar" valor={`${presupuesto - gastado} M€`} detalle="Lo que quedó en las carteras" />
            </dl>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-md">
              <h3 className="mb-2 text-lg font-black uppercase tracking-tight text-[#0b4a6f]">Los 5 más caros</h3>
              <ol className="text-sm">
                {masCaro.slice(0, 5).map((lote, indice) => (
                  <li key={lote.orden} className="flex items-baseline gap-3 border-t border-slate-100 py-2">
                    <span className="w-4 font-display text-lg font-extrabold italic text-slate-300">{indice + 1}</span>
                    <span className="min-w-0 flex-1 truncate">
                      {lote.persona ? (
                        <Link href={`/jugadores/${lote.persona}`} className="font-semibold text-slate-700 hover:text-[#0b4a6f] hover:underline">{lote.nombre}</Link>
                      ) : (
                        <span className="font-semibold text-slate-700">{lote.nombre}</span>
                      )}{" "}
                      <span className="text-slate-400">·</span> <Chip id={lote.equipo ?? ""} />
                    </span>
                    <b className="font-bold text-yellow-600 tabular-nums">{lote.precio} M€</b>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-md">
              <h3 className="mb-2 text-lg font-black uppercase tracking-tight text-[#0b4a6f]">Pujas por equipo</h3>
              <ul className="space-y-2">
                {pujasPorEquipo.map(({ equipo, total }) => (
                  <li key={equipo.id} className="grid grid-cols-[6.5rem_1fr_2rem] items-center gap-2 text-sm">
                    <Chip id={equipo.id} />
                    <span className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <span className="block h-full rounded-full" style={{ width: `${(total / topPujas) * 100}%`, backgroundColor: equipo.color }} />
                    </span>
                    <span className="text-right font-bold tabular-nums text-slate-600">{total}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-md">
              <h3 className="mb-2 text-lg font-black uppercase tracking-tight text-[#0b4a6f]">Porteros</h3>
              <ul className="text-sm">
                {porteros.map((lote) => (
                  <li key={lote.orden} className="flex items-baseline justify-between gap-3 border-t border-slate-100 py-2">
                    <span className="truncate text-slate-700">
                      {lote.nombre} <span className="text-slate-400">→</span> <Chip id={lote.equipo ?? ""} />
                    </span>
                    <b className="shrink-0 font-bold text-yellow-600 tabular-nums">{lote.precio} M€</b>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Historial */}
        <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-xl shadow-[#0b4a6f]/5 sm:rounded-[2rem] sm:p-8">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-slate-50 pb-4">
            <h2 className="flex items-center gap-3 text-xl font-black uppercase tracking-tight text-[#0b4a6f] sm:text-3xl">
              <span className="inline-block h-6 w-1.5 rounded-full bg-yellow-400 sm:h-8 sm:w-2"></span>
              Subasta a subasta
            </h2>
            <p className="text-xs text-slate-500 sm:text-sm">Toca una subasta para ver sus pujas.</p>
          </div>
          <div className="border-t border-slate-100">
            {lotesDraft.map((lote) => (
              <Lote key={lote.orden} lote={lote} />
            ))}
          </div>
        </section>

        <p className="text-center text-sm text-slate-500">
          Los M€ son millones ficticios de la subasta.{" "}
          <Link href="/bote" className="font-semibold text-[#0b4a6f] hover:underline">
            El dinero de verdad, en bote y premios →
          </Link>
        </p>
      </div>
    </div>
  );
}
