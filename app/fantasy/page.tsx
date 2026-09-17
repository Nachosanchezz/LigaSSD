import Link from "next/link";
import Escudo from "@/components/Escudo";
import PageHeader from "@/components/PageHeader";
import { PUNTOS, REGLAS } from "@/data/fantasy";
import { textoDeInstante } from "@/lib/fecha";
import { mercado, puntosDelCinco } from "@/lib/fantasy";
import {
  getCinco,
  getClasificacionFantasy,
  getJornadaActual,
  getJornadasFantasy,
  getSesion,
  hayBaseDeDatos,
} from "@/lib/fantasy-datos";
import CincoVista from "./CincoVista";
import CuentaAtrasCierre from "./CuentaAtrasCierre";
import LoginFantasy from "./LoginFantasy";
import { salir } from "./actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const MEDALLAS = ["🥇", "🥈", "🥉"];

export default async function FantasyPage() {
  const sesion = await getSesion();
  const jugadores = mercado();

  if (!sesion) {
    return (
      <div className="min-h-screen bg-slate-50/50 pb-16">
        <PageHeader
          kicker="Liga SSD · Split 3"
          title="Fantasy"
          subtitle={`Elige tu cinco cada jornada · ${REGLAS.presupuesto} M€ de presupuesto`}
        />
        <div className="relative z-10 mx-auto -mt-10 max-w-lg space-y-5 px-3 sm:-mt-12 sm:px-6">
          {!hayBaseDeDatos() && (
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-bold text-amber-800">
              El fantasy todavía no está conectado a la base de datos.
            </p>
          )}
          <LoginFantasy
            jugadores={jugadores.map((jugador) => ({
              id: jugador.id,
              apodo: jugador.apodo,
              nombre: jugador.nombre,
              equipo: jugador.equipo,
            }))}
          />
          <div className="rounded-2xl border border-slate-100 bg-white p-5 text-sm text-slate-600 shadow-sm">
            <h3 className="mb-2 text-sm font-black uppercase tracking-wide text-[#091f36]">Cómo va esto</h3>
            <ul className="space-y-1.5">
              <li>
                Cada jornada alineas a <strong>{REGLAS.tamanoEquipo} jugadores</strong> con{" "}
                <strong>{REGLAS.presupuesto} M€</strong>, a los precios de la subasta.
              </li>
              <li>
                Uno de los cinco tiene que ser <strong>portero</strong>; los otros cuatro, de pista.
              </li>
              <li>Como mucho {REGLAS.maxPorEquipo} del mismo equipo.</li>
              <li>
                Uno es el capitán y puntúa <strong>doble</strong>.
              </li>
              <li>
                Gol {PUNTOS.gol}, asistencia {PUNTOS.asistencia}, MVP {PUNTOS.mvp}, ganar {PUNTOS.victoria}.
                Las tarjetas restan.
              </li>
              <li>El mercado cierra al empezar el primer partido de cada jornada.</li>
            </ul>
            <Link
              href="/fantasy/reglas"
              className="mt-3 inline-block text-xs font-black uppercase tracking-widest text-[#0b4a6f] hover:text-yellow-500"
            >
              Las reglas enteras →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const [jornada, jornadas, clasificacion] = await Promise.all([
    getJornadaActual(),
    getJornadasFantasy(),
    getClasificacionFantasy(),
  ]);
  const cinco = await getCinco(sesion.personaId, jornada.numero);
  const porId = new Map(jugadores.map((jugador) => [jugador.id, jugador]));
  const fichas = cinco?.jugadores.map((id) => porId.get(id)!).filter(Boolean) ?? [];

  const miFila = clasificacion.find((fila) => fila.participante.personaId === sesion.personaId);
  const miPuesto = miFila ? clasificacion.indexOf(miFila) + 1 : null;
  const ultimaJugada = [...jornadas].reverse().find((candidata) => candidata.jugada);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <PageHeader
        kicker={`Fantasy · ${sesion.apodo}`}
        title={`Jornada ${jornada.numero}`}
        subtitle={jornada.cierre ? `El mercado cierra el ${textoDeInstante(jornada.cierre)}` : "Sin fecha todavía"}
      />

      <div className="relative z-10 mx-auto -mt-10 max-w-3xl space-y-5 px-3 sm:-mt-12 sm:px-6">
        {/* Estado de la jornada */}
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#091f36] to-[#0b4a6f] p-5 text-white shadow-xl sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-blue-300">
                {jornada.abierta ? "Cierra en" : "Mercado cerrado"}
              </p>
              <p className="mt-1 text-xl font-black sm:text-2xl">
                {jornada.abierta && jornada.cierre ? (
                  <CuentaAtrasCierre cierre={jornada.cierre.toISOString()} />
                ) : (
                  <span className="text-yellow-400">Jornada {jornada.numero} en juego</span>
                )}
              </p>
            </div>
            {jornada.abierta && (
              <Link
                href="/fantasy/equipo"
                className="shrink-0 rounded-xl bg-yellow-400 px-4 py-3 text-sm font-black uppercase tracking-wide text-[#091f36] transition hover:bg-yellow-300 active:scale-95"
              >
                {cinco ? "Cambiar cinco" : "Elegir cinco"}
              </Link>
            )}
          </div>

          <div className="mt-4 space-y-1.5 border-t border-white/10 pt-4">
            {jornada.partidos.map((partido) => (
              <div key={partido.id} className="flex items-center gap-2 text-xs">
                <span className="flex-1 truncate text-right font-bold uppercase">{partido.local}</span>
                <span className="shrink-0 rounded bg-white/10 px-2 py-0.5 font-black tabular-nums text-yellow-400">
                  {partido.resultado ?? "vs"}
                </span>
                <span className="flex-1 truncate font-bold uppercase">{partido.visitante}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tu cinco */}
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <h2 className="text-sm font-black uppercase tracking-wide text-[#091f36]">
              Tu cinco de la jornada {jornada.numero}
            </h2>
            {cinco && (
              <span className="text-xs font-black tabular-nums text-[#0b4a6f]">
                {jornada.jugada
                  ? `${puntosDelCinco(cinco.jugadores, cinco.capitan, jornada.puntos)} pts`
                  : `${fichas.reduce((suma, ficha) => suma + ficha.valor, 0)} M€`}
              </span>
            )}
          </div>
          {cinco ? (
            <CincoVista
              jugadores={fichas}
              capitan={cinco.capitan}
              puntos={jornada.jugada ? jornada.puntos : undefined}
            />
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-slate-500">
                {jornada.abierta
                  ? "Todavía no has alineado a nadie esta jornada."
                  : "Esta jornada te la has saltado: 0 puntos."}
              </p>
              {jornada.abierta && (
                <Link
                  href="/fantasy/equipo"
                  className="mt-3 inline-block rounded-xl bg-[#0b4a6f] px-5 py-2.5 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#091f36]"
                >
                  Elegir mi cinco
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Clasificación */}
        {clasificacion.length > 0 && (
          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <h2 className="text-sm font-black uppercase tracking-wide text-[#091f36]">Clasificación</h2>
              <Link href="/fantasy/clasificacion" className="text-xs font-bold text-[#0b4a6f] hover:underline">
                Ver toda →
              </Link>
            </div>
            <ul className="divide-y divide-slate-50">
              {clasificacion.slice(0, 5).map((fila, indice) => (
                <li
                  key={fila.participante.personaId}
                  className={`flex items-center gap-3 px-4 py-3 ${
                    fila.participante.personaId === sesion.personaId ? "bg-yellow-50" : ""
                  }`}
                >
                  <span className="w-6 shrink-0 text-center text-sm font-black text-slate-400">
                    {MEDALLAS[indice] ?? indice + 1}
                  </span>
                  <span className="h-7 w-7 shrink-0">
                    <Escudo
                      nombre={fila.participante.equipo ?? fila.participante.apodo}
                      logo={fila.participante.logo}
                      color={fila.participante.color}
                      size={28}
                    />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-bold text-slate-800">
                    {fila.participante.apodo}
                  </span>
                  <span className="shrink-0 text-sm font-black tabular-nums text-[#0b4a6f]">{fila.total}</span>
                </li>
              ))}
            </ul>
            {miPuesto && miPuesto > 5 && miFila && (
              <div className="flex items-center gap-3 border-t border-slate-100 bg-yellow-50 px-4 py-3">
                <span className="w-6 shrink-0 text-center text-sm font-black text-slate-400">{miPuesto}</span>
                <span className="min-w-0 flex-1 truncate text-sm font-bold text-slate-800">Tú</span>
                <span className="shrink-0 text-sm font-black tabular-nums text-[#0b4a6f]">{miFila.total}</span>
              </div>
            )}
          </div>
        )}

        {ultimaJugada && (
          <Link
            href={`/fantasy/jornada/${ultimaJugada.numero}`}
            className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm transition hover:border-[#0b4a6f]/30 hover:shadow-md"
          >
            <span className="text-sm font-black uppercase tracking-wide text-[#091f36]">
              Cómo fue la jornada {ultimaJugada.numero}
            </span>
            <span className="text-xs font-bold uppercase tracking-wide text-[#0b4a6f]">Ver puntos →</span>
          </Link>
        )}

        <form action={salir} className="pt-2 text-center">
          <button className="text-xs font-bold uppercase tracking-widest text-slate-400 transition hover:text-red-500">
            Salir ({sesion.apodo})
          </button>
        </form>
      </div>
    </div>
  );
}
