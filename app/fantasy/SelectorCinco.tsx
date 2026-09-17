"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Escudo from "@/components/Escudo";
import { REGLAS } from "@/data/fantasy";
import { motivoInvalido, type JugadorMercado } from "@/lib/fantasy";
import { guardarCinco } from "./actions";

export type JugadorSelector = JugadorMercado & {
  /** Contra quién juega su equipo esta jornada */
  rival?: string;
  /** Puntos que lleva en lo que va de split */
  puntos: number;
};

type Props = {
  jornada: number;
  abierta: boolean;
  jugadores: JugadorSelector[];
  inicial?: { jugadores: string[]; capitan: string };
};

/** Con el cinco lleno sobra decirlo en cada fila: ya se ve arriba en el 5/5 */
const CINCO_COMPLETO = "Ya tienes cinco";

const normalizar = (texto: string) =>
  texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function SelectorCinco({ jornada, abierta, jugadores, inicial }: Props) {
  const router = useRouter();
  const [pendiente, startTransition] = useTransition();
  const [elegidos, setElegidos] = useState<string[]>(inicial?.jugadores ?? []);
  const [capitan, setCapitan] = useState<string>(inicial?.capitan ?? "");
  const [busqueda, setBusqueda] = useState("");
  const [filtroEquipo, setFiltroEquipo] = useState("");
  const [error, setError] = useState("");
  const [guardado, setGuardado] = useState(false);

  const porId = useMemo(() => new Map(jugadores.map((jugador) => [jugador.id, jugador])), [jugadores]);
  const equipos = useMemo(
    () => [...new Map(jugadores.map((jugador) => [jugador.equipoId, jugador])).values()],
    [jugadores]
  );

  const fichas = elegidos.map((id) => porId.get(id)!).filter(Boolean);
  const gastado = fichas.reduce((suma, ficha) => suma + ficha.valor, 0);
  const restante = REGLAS.presupuesto - gastado;
  const completo = elegidos.length === REGLAS.tamanoEquipo;

  /** Por qué no se puede fichar a alguien ahora mismo; null si sí se puede */
  function bloqueo(jugador: JugadorSelector): string | null {
    if (elegidos.includes(jugador.id)) return null;
    if (completo) return CINCO_COMPLETO;
    if (jugador.valor > restante) return "No te llega";
    const suyos = fichas.filter((ficha) => ficha.equipoId === jugador.equipoId).length;
    if (suyos >= REGLAS.maxPorEquipo) return `Ya llevas ${REGLAS.maxPorEquipo} de ${jugador.equipo}`;
    return null;
  }

  function alternar(jugador: JugadorSelector) {
    setGuardado(false);
    setError("");
    if (elegidos.includes(jugador.id)) {
      const quedan = elegidos.filter((id) => id !== jugador.id);
      setElegidos(quedan);
      if (capitan === jugador.id) setCapitan("");
      return;
    }
    if (bloqueo(jugador)) return;
    const quedan = [...elegidos, jugador.id];
    setElegidos(quedan);
    // El primero que entra manda de capitán hasta que se diga otra cosa
    if (!capitan) setCapitan(jugador.id);
  }

  function guardar() {
    setError("");
    setGuardado(false);
    const problema = motivoInvalido(elegidos, capitan, porId);
    if (problema) {
      setError(problema);
      return;
    }
    startTransition(async () => {
      const resultado = await guardarCinco(jornada, elegidos, capitan);
      if (resultado.error) {
        setError(resultado.error);
      } else {
        setGuardado(true);
        router.refresh();
      }
    });
  }

  const visibles = jugadores.filter((jugador) => {
    if (filtroEquipo && jugador.equipoId !== filtroEquipo) return false;
    if (!busqueda.trim()) return true;
    const texto = normalizar(`${jugador.apodo} ${jugador.nombre} ${jugador.equipo}`);
    return texto.includes(normalizar(busqueda.trim()));
  });

  return (
    <div className="space-y-5">
      {/* Resumen pegado arriba: lo que llevas gastado y el botón de guardar */}
      <div className="sticky top-[57px] z-30 -mx-3 border-b border-white/10 bg-[#091f36] px-3 py-3 shadow-lg sm:top-[73px] sm:mx-0 sm:rounded-2xl sm:border sm:border-white/10 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-300">Presupuesto</p>
            <p className="font-black tabular-nums text-white">
              <span className={restante < 0 ? "text-red-400" : "text-yellow-400"}>{gastado}</span>
              <span className="text-blue-300"> / {REGLAS.presupuesto} M€</span>
            </p>
          </div>
          <div className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-300">Cinco</p>
            <p className="font-black tabular-nums text-white">
              {elegidos.length}/{REGLAS.tamanoEquipo}
            </p>
          </div>
          {abierta && (
            <button
              onClick={guardar}
              disabled={pendiente || !completo}
              className="shrink-0 rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-black uppercase tracking-wide text-[#091f36] transition hover:bg-yellow-300 active:scale-95 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-blue-300"
            >
              {pendiente ? "…" : guardado ? "✓ Guardado" : "Guardar"}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-2 rounded-lg bg-red-500/15 px-3 py-2 text-center text-xs font-bold text-red-300">{error}</p>
        )}
        {guardado && !error && (
          <p className="mt-2 rounded-lg bg-green-500/15 px-3 py-2 text-center text-xs font-bold text-green-300">
            Cinco guardado para la jornada {jornada}
          </p>
        )}
      </div>

      {/* Tu cinco */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-md sm:p-5">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-sm font-black uppercase tracking-wide text-[#091f36]">Tu cinco</h2>
          <span className="text-[11px] font-medium text-slate-400">
            La estrella marca al capitán: puntúa doble
          </span>
        </div>
        <div className="space-y-2">
          {Array.from({ length: REGLAS.tamanoEquipo }).map((_, indice) => {
            const ficha = fichas[indice];
            if (!ficha) {
              return (
                <div
                  key={`hueco-${indice}`}
                  className="flex h-[52px] items-center justify-center rounded-xl border border-dashed border-slate-200 text-xs font-bold uppercase tracking-wide text-slate-300"
                >
                  Hueco libre
                </div>
              );
            }
            const esCapitan = capitan === ficha.id;
            return (
              <div key={ficha.id} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-2">
                <span className="h-8 w-8 shrink-0">
                  <Escudo nombre={ficha.equipo} logo={ficha.logo} color={ficha.color} size={32} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-[#091f36]">{ficha.apodo}</p>
                  <p className="truncate text-[10px] uppercase tracking-wide text-slate-400">{ficha.equipo}</p>
                </div>
                <span className="shrink-0 text-sm font-black tabular-nums text-[#0b4a6f]">{ficha.valor}</span>
                <button
                  onClick={() => { setCapitan(ficha.id); setGuardado(false); }}
                  disabled={!abierta}
                  aria-label={`Hacer capitán a ${ficha.apodo}`}
                  aria-pressed={esCapitan}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm transition ${
                    esCapitan ? "bg-yellow-400 text-[#091f36]" : "bg-white text-slate-300 hover:text-yellow-500"
                  } disabled:opacity-50`}
                >
                  ★
                </button>
                {abierta && (
                  <button
                    onClick={() => alternar(ficha)}
                    aria-label={`Quitar a ${ficha.apodo}`}
                    className="shrink-0 px-1 text-lg leading-none text-slate-300 transition hover:text-red-500"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {!abierta && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-bold text-amber-800">
          La jornada {jornada} ya ha empezado: este cinco queda como está.
        </p>
      )}

      {/* Mercado */}
      <div className="rounded-2xl border border-slate-100 bg-white shadow-md">
        <div className="space-y-3 border-b border-slate-100 p-4">
          <input
            type="search"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
            placeholder="Buscar jugador…"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 transition focus:border-[#0b4a6f] focus:bg-white focus:outline-none"
          />
          <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
            <button
              onClick={() => setFiltroEquipo("")}
              className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-wide transition ${
                filtroEquipo === "" ? "bg-[#091f36] text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              Todos
            </button>
            {equipos.map((equipo) => (
              <button
                key={equipo.equipoId}
                onClick={() => setFiltroEquipo(filtroEquipo === equipo.equipoId ? "" : equipo.equipoId)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-black uppercase tracking-wide transition ${
                  filtroEquipo === equipo.equipoId
                    ? "bg-[#091f36] text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                <span className="h-4 w-4">
                  <Escudo nombre={equipo.equipo} logo={equipo.logo} color={equipo.color} size={16} />
                </span>
                {equipo.equipo}
              </button>
            ))}
          </div>
        </div>

        <ul className="divide-y divide-slate-50">
          {visibles.map((jugador) => {
            const elegido = elegidos.includes(jugador.id);
            const impedimento = abierta ? bloqueo(jugador) : "Mercado cerrado";
            return (
              <li key={jugador.id}>
                <button
                  onClick={() => abierta && alternar(jugador)}
                  disabled={!abierta || Boolean(impedimento)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${
                    elegido ? "bg-[#0b4a6f]/5" : impedimento ? "opacity-40" : "hover:bg-slate-50"
                  }`}
                >
                  <span className="h-9 w-9 shrink-0">
                    <Escudo nombre={jugador.equipo} logo={jugador.logo} color={jugador.color} size={36} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-[#091f36]">
                      {jugador.apodo}
                      {jugador.posicion && (
                        <span className="ml-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                          {jugador.posicion}
                        </span>
                      )}
                    </p>
                    <p className="truncate text-[11px] text-slate-400">
                      {jugador.rival ?? jugador.equipo}
                      {jugador.puntos > 0 && <span className="text-[#0b4a6f]"> · {jugador.puntos} pts</span>}
                    </p>
                  </div>
                  {impedimento && impedimento !== CINCO_COMPLETO && !elegido && (
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      {impedimento}
                    </span>
                  )}
                  <span
                    className={`shrink-0 rounded-lg px-2 py-1 text-sm font-black tabular-nums ${
                      elegido ? "bg-[#0b4a6f] text-white" : "bg-slate-100 text-[#0b4a6f]"
                    }`}
                    title={jugador.tasado ? "Valor tasado: no pasó por la subasta" : "Lo que costó en la subasta"}
                  >
                    {jugador.valor}
                    {jugador.tasado && <span className="font-normal text-yellow-500">*</span>}
                  </span>
                </button>
              </li>
            );
          })}
          {visibles.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-slate-400">No hay nadie con ese nombre.</li>
          )}
        </ul>
        <p className="border-t border-slate-100 px-4 py-3 text-[11px] text-slate-400">
          Los precios son los de la subasta. El <span className="font-bold text-yellow-500">*</span> marca a los
          que no pasaron por ella (presidentes y Titans): su valor es una tasación.
        </p>
      </div>
    </div>
  );
}
