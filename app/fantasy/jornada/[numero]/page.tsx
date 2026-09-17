import Link from "next/link";
import { notFound } from "next/navigation";
import Escudo from "@/components/Escudo";
import PageHeader from "@/components/PageHeader";
import { mercado, puntosDelCinco } from "@/lib/fantasy";
import {
  getJornadasFantasy,
  getParticipantes,
  getSesion,
  getTodosLosCincos,
} from "@/lib/fantasy-datos";
import CincoVista from "../../CincoVista";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const MEDALLAS = ["🥇", "🥈", "🥉"];

type Props = { params: Promise<{ numero: string }> };

export default async function JornadaFantasyPage({ params }: Props) {
  const { numero } = await params;
  const jornadas = await getJornadasFantasy();
  const jornada = jornadas.find((candidata) => candidata.numero === Number(numero));
  if (!jornada) notFound();

  const [cincos, participantes, sesion] = await Promise.all([
    getTodosLosCincos(),
    getParticipantes(),
    getSesion(),
  ]);
  const jugadores = mercado();
  const porId = new Map(jugadores.map((jugador) => [jugador.id, jugador]));

  // Los cinco se enseñan cuando la jornada ya ha empezado, no antes
  const visible = !jornada.abierta;
  const deLaJornada = cincos.filter((cinco) => cinco.jornada === jornada.numero);

  const tabla = participantes
    .map((participante) => {
      const cinco = deLaJornada.find((candidato) => candidato.personaId === participante.personaId);
      return {
        participante,
        cinco,
        puntos: cinco ? puntosDelCinco(cinco.jugadores, cinco.capitan, jornada.puntos) : 0,
      };
    })
    .filter((fila) => fila.cinco || jornada.jugada)
    .sort((a, b) => b.puntos - a.puntos || a.participante.apodo.localeCompare(b.participante.apodo));

  const mejores = Object.entries(jornada.puntos)
    .map(([id, puntos]) => ({ jugador: porId.get(id), puntos }))
    .filter((fila) => fila.jugador)
    .sort((a, b) => b.puntos.puntos - a.puntos.puntos)
    .slice(0, 5);

  const anterior = jornadas.find((candidata) => candidata.numero === jornada.numero - 1);
  const siguiente = jornadas.find((candidata) => candidata.numero === jornada.numero + 1);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <PageHeader
        kicker="Fantasy · Split 3"
        title={`Jornada ${jornada.numero}`}
        subtitle={jornada.jugada ? "Puntos de la jornada" : "Todavía sin jugar"}
      />

      <div className="relative z-10 mx-auto -mt-10 max-w-3xl space-y-5 px-3 sm:-mt-12 sm:px-6">
        {/* Resultados */}
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-md">
          <div className="space-y-2">
            {jornada.partidos.map((partido) => {
              // El acta solo existe si el partido se ha jugado
              const jugado = partido.estado === "Finalizado";
              const marcador = (
                <>
                  <span className="flex-1 truncate text-right font-bold uppercase text-slate-700">{partido.local}</span>
                  <span className="shrink-0 rounded bg-[#091f36] px-2 py-0.5 font-black tabular-nums text-yellow-400">
                    {partido.resultado ?? "vs"}
                  </span>
                  <span className="flex-1 truncate font-bold uppercase text-slate-700">{partido.visitante}</span>
                </>
              );
              return jugado ? (
                <Link
                  key={partido.id}
                  href={`/partidos/${partido.id}`}
                  className="flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm transition hover:bg-slate-50"
                >
                  {marcador}
                </Link>
              ) : (
                <div key={partido.id} className="flex items-center gap-2 px-2 py-1.5 text-sm">
                  {marcador}
                </div>
              );
            })}
          </div>
        </div>

        {jornada.jugada && jornada.sinAsistencia.length > 0 && (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
            Falta apuntar quién jugó en {jornada.sinAsistencia.length}{" "}
            {jornada.sinAsistencia.length === 1 ? "partido" : "partidos"}: ahí solo han puntuado los que salen en el
            acta.
          </p>
        )}

        {/* Los que más puntuaron */}
        {mejores.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md">
            <h2 className="border-b border-slate-100 px-4 py-3 text-sm font-black uppercase tracking-wide text-[#091f36]">
              Los que más puntuaron
            </h2>
            <ul className="divide-y divide-slate-50">
              {mejores.map(({ jugador, puntos }) => (
                <li key={jugador!.id} className="flex items-center gap-3 px-4 py-3">
                  <span className="h-8 w-8 shrink-0">
                    <Escudo nombre={jugador!.equipo} logo={jugador!.logo} color={jugador!.color} size={32} />
                  </span>
                  <Link href={`/jugadores/${jugador!.id}`} className="min-w-0 flex-1 truncate text-sm font-black text-[#091f36] hover:text-[#0b4a6f]">
                    {jugador!.apodo}
                  </Link>
                  <span className="shrink-0 text-[11px] text-slate-400">{jugador!.valor} M€</span>
                  <span className="shrink-0 rounded-lg bg-[#0b4a6f] px-2 py-1 text-sm font-black tabular-nums text-white">
                    {puntos.puntos}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Los cinco de cada uno */}
        {visible ? (
          tabla.length === 0 ? (
            <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center text-sm text-slate-500 shadow-md">
              Esta jornada no alineó nadie.
            </div>
          ) : (
            <div className="space-y-4">
              {tabla.map((fila, indice) => (
                <div
                  key={fila.participante.personaId}
                  className={`overflow-hidden rounded-2xl border bg-white shadow-md ${
                    fila.participante.personaId === sesion?.personaId ? "border-yellow-300" : "border-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
                    <span className="w-6 shrink-0 text-center text-sm font-black text-slate-400">
                      {MEDALLAS[indice] ?? indice + 1}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-black uppercase tracking-wide text-[#091f36]">
                      {fila.participante.apodo}
                    </span>
                    <span className="shrink-0 rounded-lg bg-[#091f36] px-2.5 py-1 text-sm font-black tabular-nums text-yellow-400">
                      {fila.puntos}
                    </span>
                  </div>
                  {fila.cinco ? (
                    <CincoVista
                      jugadores={fila.cinco.jugadores.map((id) => porId.get(id)!).filter(Boolean)}
                      capitan={fila.cinco.capitan}
                      puntos={jornada.puntos}
                    />
                  ) : (
                    <p className="px-4 py-4 text-center text-sm text-slate-400">No alineó a nadie</p>
                  )}
                </div>
              ))}
            </div>
          )
        ) : (
          <p className="rounded-2xl border border-slate-100 bg-white px-4 py-6 text-center text-sm text-slate-500 shadow-md">
            Los cinco de cada uno se ven cuando empiece la jornada. Hasta entonces, cada uno con su secreto.
          </p>
        )}

        <div className="flex justify-between gap-3">
          {anterior ? (
            <Link
              href={`/fantasy/jornada/${anterior.numero}`}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-black uppercase tracking-wide text-[#0b4a6f] shadow-sm transition hover:border-[#0b4a6f]/30"
            >
              ← Jornada {anterior.numero}
            </Link>
          ) : (
            <span />
          )}
          {siguiente && (
            <Link
              href={`/fantasy/jornada/${siguiente.numero}`}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-black uppercase tracking-wide text-[#0b4a6f] shadow-sm transition hover:border-[#0b4a6f]/30"
            >
              Jornada {siguiente.numero} →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
