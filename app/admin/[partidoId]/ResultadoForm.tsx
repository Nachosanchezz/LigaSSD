"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { guardarResultado, borrarResultado, guardarArbitra, guardarAplazado, quitarAplazado } from "../actions";

type GolEntry = {
  jugador: string;
  asistente: string;
  minuto: string;
};

const golVacio = (): GolEntry => ({ jugador: "", asistente: "", minuto: "" });

const normalizar = (texto: string) =>
  texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

/** Anotaciones del acta que no son un jugador: gol en propia, cedido, etc. */
function esAnotacion(valor: string): boolean {
  const limpio = normalizar(valor);
  return ["sin asistencia", "gol cedido", "cedido", "pp"].includes(limpio) || limpio.endsWith("(pp)");
}

type Props = {
  partidoId: string;
  local: string;
  visitante: string;
  /** Apodos de cada plantilla, para sugerirlos y avisar de los que no cuadran */
  jugadoresLocal: string[];
  jugadoresVisitante: string[];
  /** Quiénes constaban ya como que jugaron; si no hay nada apuntado, se marcan todos */
  jugaronLocalActual?: string[];
  jugaronVisitanteActual?: string[];
  arbitraActual?: string;
  estadoActual?: string;
  motivoActual?: string;
  resultadoActual?: {
    resultado: string;
    mvp?: string;
    resumen?: {
      local: { jugador: string; asistente?: string; minuto?: number }[];
      visitante: { jugador: string; asistente?: string; minuto?: number }[];
    };
  };
};

export default function ResultadoForm({
  partidoId,
  local,
  visitante,
  jugadoresLocal,
  jugadoresVisitante,
  jugaronLocalActual,
  jugaronVisitanteActual,
  arbitraActual,
  estadoActual,
  motivoActual,
  resultadoActual,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Árbitro
  const [arbitra, setArbitra] = useState(arbitraActual ?? "");
  const [arbitraOk, setArbitraOk] = useState(false);
  const [arbitraError, setArbitraError] = useState("");

  // Aplazado
  const [isAplazado, setIsAplazado] = useState(estadoActual === "Aplazado");
  const [motivo, setMotivo] = useState(motivoActual ?? "");
  const [aplazadoOk, setAplazadoOk] = useState(false);
  const [aplazadoError, setAplazadoError] = useState("");

  const [resultado, setResultado] = useState(
    resultadoActual?.resultado ?? ""
  );
  const [mvp, setMvp] = useState(resultadoActual?.mvp ?? "");
  const [golesLocal, setGolesLocal] = useState<GolEntry[]>(
    resultadoActual?.resumen?.local.map((g) => ({
      jugador: g.jugador,
      asistente: g.asistente ?? "",
      minuto: g.minuto?.toString() ?? "",
    })) ?? []
  );
  const [golesVisitante, setGolesVisitante] = useState<GolEntry[]>(
    resultadoActual?.resumen?.visitante.map((g) => ({
      jugador: g.jugador,
      asistente: g.asistente ?? "",
      minuto: g.minuto?.toString() ?? "",
    })) ?? []
  );
  // Quién jugó. Por defecto, todos: es más rápido desmarcar a los que faltaron
  const [jugaronLocal, setJugaronLocal] = useState<string[]>(
    jugaronLocalActual?.length ? jugaronLocalActual : jugadoresLocal
  );
  const [jugaronVisitante, setJugaronVisitante] = useState<string[]>(
    jugaronVisitanteActual?.length ? jugaronVisitanteActual : jugadoresVisitante
  );
  const [error, setError] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  // Nombres escritos que no son de ninguna de las dos plantillas
  const [desconocidos, setDesconocidos] = useState<string[]>([]);

  const conocidos = new Set([...jugadoresLocal, ...jugadoresVisitante].map(normalizar));

  function nombresRaros(): string[] {
    const escritos = [
      ...golesLocal.flatMap((g) => [g.jugador, g.asistente]),
      ...golesVisitante.flatMap((g) => [g.jugador, g.asistente]),
      mvp,
    ];
    const raros = escritos
      .map((valor) => valor.trim())
      .filter((valor) => valor && !esAnotacion(valor) && !conocidos.has(normalizar(valor)));
    return [...new Set(raros)];
  }

  function handleSaveArbitra() {
    setArbitraError("");
    setArbitraOk(false);
    startTransition(async () => {
      const res = await guardarArbitra(partidoId, arbitra);
      if (res.error) {
        setArbitraError(res.error);
      } else {
        setArbitraOk(true);
      }
    });
  }

  function handleGuardarAplazado() {
    setAplazadoError("");
    setAplazadoOk(false);
    startTransition(async () => {
      const res = await guardarAplazado(partidoId, motivo);
      if (res.error) {
        setAplazadoError(res.error);
      } else {
        setIsAplazado(true);
        setAplazadoOk(true);
      }
    });
  }

  function handleQuitarAplazado() {
    setAplazadoError("");
    setAplazadoOk(false);
    startTransition(async () => {
      const res = await quitarAplazado(partidoId);
      if (res.error) {
        setAplazadoError(res.error);
      } else {
        setIsAplazado(false);
        setMotivo("");
        setAplazadoOk(false);
      }
    });
  }

  function updateGol(
    lista: GolEntry[],
    setLista: (g: GolEntry[]) => void,
    index: number,
    campo: keyof GolEntry,
    valor: string
  ) {
    const copia = [...lista];
    copia[index] = { ...copia[index], [campo]: valor };
    setLista(copia);
  }

  function removeGol(
    lista: GolEntry[],
    setLista: (g: GolEntry[]) => void,
    index: number
  ) {
    setLista(lista.filter((_, i) => i !== index));
  }

  function handleSave() {
    setError("");

    // Un nombre mal escrito no da error, simplemente deja el gol sin dueño:
    // por eso conviene avisar antes de guardarlo
    const raros = nombresRaros();
    if (raros.length > 0 && desconocidos.length === 0) {
      setDesconocidos(raros);
      return;
    }
    setDesconocidos([]);

    startTransition(async () => {
      const res = await guardarResultado({
        partidoId,
        resultado,
        mvp: mvp || undefined,
        golesLocal: golesLocal
          .filter((g) => g.jugador.trim())
          .map((g) => ({
            jugador: g.jugador.trim(),
            asistente: g.asistente.trim() || undefined,
            minuto: g.minuto ? Number(g.minuto) : undefined,
          })),
        golesVisitante: golesVisitante
          .filter((g) => g.jugador.trim())
          .map((g) => ({
            jugador: g.jugador.trim(),
            asistente: g.asistente.trim() || undefined,
            minuto: g.minuto ? Number(g.minuto) : undefined,
          })),
        jugaronLocal,
        jugaronVisitante,
      });
      if (res.error) {
        setError(res.error);
      } else {
        router.push("/admin");
        router.refresh();
      }
    });
  }

  function handleDelete() {
    startTransition(async () => {
      const res = await borrarResultado(partidoId);
      if (res.error) {
        setError(res.error);
      } else {
        router.push("/admin");
        router.refresh();
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* Árbitro */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
        <label className="block text-xs font-black uppercase tracking-widest text-slate-500">
          Árbitro (equipo)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={arbitra}
            onChange={(e) => { setArbitra(e.target.value); setArbitraOk(false); }}
            placeholder="Ej: ATALAYA"
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-[#091f36] uppercase tracking-wide focus:outline-none focus:border-[#0b4a6f] focus:bg-white transition"
          />
          <button
            onClick={handleSaveArbitra}
            disabled={isPending || !arbitra.trim()}
            className="rounded-xl bg-[#0b4a6f] text-white font-black px-4 py-3 text-sm uppercase tracking-wide hover:bg-[#091f36] active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            {isPending ? "…" : "Guardar"}
          </button>
        </div>
        {arbitraOk && (
          <p className="text-green-600 text-xs font-bold text-center bg-green-50 rounded-lg py-2 border border-green-100">
            ✓ Árbitro actualizado
          </p>
        )}
        {arbitraError && (
          <p className="text-red-600 text-xs font-bold text-center bg-red-50 rounded-lg py-2 border border-red-100">
            {arbitraError}
          </p>
        )}
      </div>

      {/* Estado: Aplazado (solo si no está Finalizado) */}
      {!resultadoActual && (
        <div className={`rounded-2xl border p-5 shadow-sm space-y-3 ${isAplazado ? "bg-red-50 border-red-200" : "bg-white border-slate-200"}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">
              Estado del partido
            </span>
            {isAplazado && (
              <span className="text-[10px] font-black uppercase tracking-wide bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                Aplazado
              </span>
            )}
          </div>

          {isAplazado ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5">
                  Motivo del aplazamiento
                </label>
                <input
                  type="text"
                  value={motivo}
                  onChange={(e) => { setMotivo(e.target.value); setAplazadoOk(false); }}
                  placeholder="Ej: Falta de jugadores en ATALAYA"
                  className="w-full rounded-xl border border-red-200 bg-white px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-red-400 focus:bg-white transition"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleGuardarAplazado}
                  disabled={isPending}
                  className="flex-1 rounded-xl bg-red-600 text-white font-black py-2.5 text-sm uppercase tracking-wide hover:bg-red-700 active:scale-95 transition disabled:opacity-40"
                >
                  {isPending ? "…" : "Actualizar"}
                </button>
                <button
                  onClick={handleQuitarAplazado}
                  disabled={isPending}
                  className="flex-1 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold py-2.5 text-sm hover:bg-slate-50 active:scale-95 transition disabled:opacity-40"
                >
                  Quitar aplazado
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => setIsAplazado(true)}
              className="w-full rounded-xl border border-dashed border-slate-300 text-slate-500 font-bold py-3 text-sm hover:border-red-300 hover:text-red-500 hover:bg-red-50 active:scale-95 transition"
            >
              Marcar como Aplazado
            </button>
          )}

          {aplazadoOk && (
            <p className="text-green-600 text-xs font-bold text-center bg-green-50 rounded-lg py-2 border border-green-100">
              ✓ Estado actualizado
            </p>
          )}
          {aplazadoError && (
            <p className="text-red-600 text-xs font-bold text-center bg-red-50 rounded-lg py-2 border border-red-200">
              {aplazadoError}
            </p>
          )}
        </div>
      )}

      {/* Resultado y MVP */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
            Resultado
          </label>
          <input
            type="text"
            value={resultado}
            onChange={(e) => setResultado(e.target.value)}
            placeholder="Ej: 3-2 · con penaltis: 4-4 (5-3 pen.)"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg font-black text-[#091f36] text-center tracking-widest focus:outline-none focus:border-[#0b4a6f] focus:bg-white transition"
          />
        </div>
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
            MVP (apodo)
          </label>
          <input
            type="text"
            value={mvp}
            onChange={(e) => setMvp(e.target.value)}
            list="jugadores-todos"
            placeholder="Apodo del jugador MVP"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#0b4a6f] focus:bg-white transition"
          />
        </div>
      </div>

      {/* Goles Local */}
      <GolesSection
        titulo={`Goles ${local}`}
        lista="jugadores-local"
        goles={golesLocal}
        onAdd={() => setGolesLocal([...golesLocal, golVacio()])}
        onUpdate={(i, campo, val) =>
          updateGol(golesLocal, setGolesLocal, i, campo, val)
        }
        onRemove={(i) => removeGol(golesLocal, setGolesLocal, i)}
      />

      {/* Goles Visitante */}
      <GolesSection
        titulo={`Goles ${visitante}`}
        lista="jugadores-visitante"
        goles={golesVisitante}
        onAdd={() => setGolesVisitante([...golesVisitante, golVacio()])}
        onUpdate={(i, campo, val) =>
          updateGol(golesVisitante, setGolesVisitante, i, campo, val)
        }
        onRemove={(i) => removeGol(golesVisitante, setGolesVisitante, i)}
      />

      {/* Quién jugó */}
      <AsistenciaSection
        titulo={`Jugaron · ${local}`}
        plantilla={jugadoresLocal}
        jugaron={jugaronLocal}
        onCambiar={setJugaronLocal}
      />
      <AsistenciaSection
        titulo={`Jugaron · ${visitante}`}
        plantilla={jugadoresVisitante}
        jugaron={jugaronVisitante}
        onCambiar={setJugaronVisitante}
      />

      {/* Sugerencias para los nombres */}
      <datalist id="jugadores-local">
        {jugadoresLocal.map((jugador) => (
          <option key={jugador} value={jugador} />
        ))}
      </datalist>
      <datalist id="jugadores-visitante">
        {jugadoresVisitante.map((jugador) => (
          <option key={jugador} value={jugador} />
        ))}
      </datalist>
      <datalist id="jugadores-todos">
        {[...jugadoresLocal, ...jugadoresVisitante].map((jugador) => (
          <option key={jugador} value={jugador} />
        ))}
      </datalist>

      {/* Nombres que no cuadran con ninguna plantilla */}
      {desconocidos.length > 0 && (
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-4 space-y-2">
          <p className="text-sm font-black uppercase tracking-wide text-amber-800">
            Revisa estos nombres
          </p>
          <p className="text-sm text-amber-800">
            No son de ninguna de las dos plantillas: <strong>{desconocidos.join(", ")}</strong>. Tal y como
            están, esos goles no se le contarán a nadie en las estadísticas.
          </p>
          <p className="text-xs text-amber-700">
            Corrígelos, o vuelve a pulsar Guardar si de verdad van así.
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-600 text-sm font-medium text-center bg-red-50 rounded-xl py-3 px-4 border border-red-100">
          {error}
        </p>
      )}

      {/* Guardar */}
      <button
        onClick={handleSave}
        disabled={isPending || !resultado}
        className="w-full rounded-2xl bg-[#0b4a6f] text-white font-black py-4 text-base uppercase tracking-wide hover:bg-[#091f36] active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#0b4a6f]/20"
      >
        {isPending ? "Guardando…" : desconocidos.length > 0 ? "Guardar de todas formas" : "Guardar Resultado"}
      </button>

      {/* Borrar resultado */}
      {resultadoActual && (
        <div className="border-t border-slate-200 pt-4">
          {!showDelete ? (
            <button
              onClick={() => setShowDelete(true)}
              className="w-full text-xs font-bold uppercase tracking-wide text-red-400 hover:text-red-600 transition py-2"
            >
              Borrar resultado
            </button>
          ) : (
            <div className="bg-red-50 rounded-xl border border-red-100 p-4 space-y-3">
              <p className="text-sm font-bold text-red-700 text-center">
                ¿Seguro que quieres borrar el resultado?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDelete(false)}
                  className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isPending}
                  className="flex-1 rounded-xl bg-red-600 text-white py-2.5 text-sm font-black hover:bg-red-700 active:scale-95 transition disabled:opacity-50"
                >
                  Borrar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function GolesSection({
  titulo,
  lista,
  goles,
  onAdd,
  onUpdate,
  onRemove,
}: {
  titulo: string;
  /** Id del datalist con la plantilla de ese equipo */
  lista: string;
  goles: GolEntry[];
  onAdd: () => void;
  onUpdate: (i: number, campo: keyof GolEntry, val: string) => void;
  onRemove: (i: number) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">
          {titulo}
        </h3>
        <button
          onClick={onAdd}
          className="flex items-center gap-1 text-xs font-bold text-[#0b4a6f] bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-100 active:scale-95 transition"
        >
          <span className="text-base leading-none">+</span> Gol
        </button>
      </div>

      {goles.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-2">Sin goles</p>
      ) : (
        <div className="space-y-3">
          {goles.map((gol, i) => (
            <div
              key={i}
              className="rounded-xl bg-slate-50 border border-slate-100 p-3 space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-4">
                  {i + 1}
                </span>
                <input
                  type="text"
                  value={gol.jugador}
                  onChange={(e) => onUpdate(i, "jugador", e.target.value)}
                  list={lista}
                  placeholder="Goleador (apodo)"
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#0b4a6f] transition"
                />
                <button
                  onClick={() => onRemove(i)}
                  className="text-slate-400 hover:text-red-500 transition text-lg leading-none px-1"
                >
                  ×
                </button>
              </div>
              <div className="flex gap-2 ml-6">
                <input
                  type="text"
                  value={gol.asistente}
                  onChange={(e) => onUpdate(i, "asistente", e.target.value)}
                  list={lista}
                  placeholder="Asistente (opcional)"
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 focus:outline-none focus:border-[#0b4a6f] transition"
                />
                <input
                  type="number"
                  value={gol.minuto}
                  onChange={(e) => onUpdate(i, "minuto", e.target.value)}
                  placeholder="Min."
                  min={1}
                  max={99}
                  className="w-16 rounded-lg border border-slate-200 bg-white px-2 py-2 text-xs text-slate-600 text-center focus:outline-none focus:border-[#0b4a6f] transition"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Los que jugaron el partido. Salen todos marcados porque lo normal es que
 * juegue la plantilla entera: se desmarca a quien faltó. De aquí salen los
 * partidos jugados de cada uno y los puntos por victoria del fantasy, que no
 * se le pueden dar a quien no estuvo.
 */
function AsistenciaSection({
  titulo,
  plantilla,
  jugaron,
  onCambiar,
}: {
  titulo: string;
  plantilla: string[];
  jugaron: string[];
  onCambiar: (jugadores: string[]) => void;
}) {
  const alternar = (jugador: string) =>
    onCambiar(jugaron.includes(jugador) ? jugaron.filter((otro) => otro !== jugador) : [...jugaron, jugador]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">{titulo}</h3>
        <span className="text-xs font-black text-[#0b4a6f] tabular-nums">
          {jugaron.length}/{plantilla.length}
        </span>
      </div>
      <p className="text-[11px] text-slate-400 mb-3">Desmarca a los que no jugaron</p>

      <div className="grid grid-cols-2 gap-2">
        {plantilla.map((jugador) => {
          const activo = jugaron.includes(jugador);
          return (
            <button
              key={jugador}
              type="button"
              onClick={() => alternar(jugador)}
              aria-pressed={activo}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-bold text-left transition active:scale-95 ${
                activo
                  ? "border-[#0b4a6f] bg-[#0b4a6f] text-white"
                  : "border-slate-200 bg-slate-50 text-slate-400 line-through"
              }`}
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] leading-none ${
                  activo ? "border-white/40 bg-white/20 text-white" : "border-slate-300 bg-white text-transparent"
                }`}
                aria-hidden
              >
                ✓
              </span>
              <span className="truncate">{jugador}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => onCambiar(plantilla)}
          className="flex-1 rounded-lg border border-slate-200 bg-white py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 transition"
        >
          Todos
        </button>
        <button
          type="button"
          onClick={() => onCambiar([])}
          className="flex-1 rounded-lg border border-slate-200 bg-white py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 transition"
        >
          Ninguno
        </button>
      </div>
    </div>
  );
}
