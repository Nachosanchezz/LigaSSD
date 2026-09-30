"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { guardarResultado, borrarResultado, guardarArbitra, guardarAplazado, quitarAplazado } from "../actions";

type GolEntry = {
  jugador: string;
  asistente: string;
  minuto: string;
};

const golVacio = (): GolEntry => ({ jugador: "", asistente: "", minuto: "" });

type TarjetaEntry = {
  jugador: string;
  tipo: "amarilla" | "roja";
  minuto: string;
};

const tarjetaVacia = (): TarjetaEntry => ({ jugador: "", tipo: "amarilla", minuto: "" });

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
  tarjetasActuales?: {
    local: { jugador: string; tipo: "amarilla" | "roja"; minuto?: number }[];
    visitante: { jugador: string; tipo: "amarilla" | "roja"; minuto?: number }[];
  };
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
  tarjetasActuales,
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
  const comoEntrada = (lado: "local" | "visitante"): TarjetaEntry[] =>
    (tarjetasActuales?.[lado] ?? []).map((tarjeta) => ({
      jugador: tarjeta.jugador,
      tipo: tarjeta.tipo,
      minuto: tarjeta.minuto?.toString() ?? "",
    }));
  const [tarjetasLocal, setTarjetasLocal] = useState<TarjetaEntry[]>(comoEntrada("local"));
  const [tarjetasVisitante, setTarjetasVisitante] = useState<TarjetaEntry[]>(comoEntrada("visitante"));
  const [error, setError] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  // Nombres escritos que no son de ninguna de las dos plantillas
  const [desconocidos, setDesconocidos] = useState<string[]>([]);

  const conocidos = new Set([...jugadoresLocal, ...jugadoresVisitante].map(normalizar));

  function nombresRaros(): string[] {
    const escritos = [
      ...golesLocal.flatMap((g) => [g.jugador, g.asistente]),
      ...golesVisitante.flatMap((g) => [g.jugador, g.asistente]),
      ...tarjetasLocal.map((t) => t.jugador),
      ...tarjetasVisitante.map((t) => t.jugador),
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
        tarjetasLocal: tarjetasLocal
          .filter((tarjeta) => tarjeta.jugador.trim())
          .map((tarjeta) => ({
            jugador: tarjeta.jugador.trim(),
            tipo: tarjeta.tipo,
            minuto: tarjeta.minuto ? Number(tarjeta.minuto) : undefined,
          })),
        tarjetasVisitante: tarjetasVisitante
          .filter((tarjeta) => tarjeta.jugador.trim())
          .map((tarjeta) => ({
            jugador: tarjeta.jugador.trim(),
            tipo: tarjeta.tipo,
            minuto: tarjeta.minuto ? Number(tarjeta.minuto) : undefined,
          })),
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
          <EntradaJugador
            value={mvp}
            onChange={setMvp}
            plantilla={[...jugadoresLocal, ...jugadoresVisitante]}
            placeholder="Apodo del jugador MVP"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#0b4a6f] focus:bg-white transition"
          />
        </div>
      </div>

      {/* Goles Local */}
      <GolesSection
        titulo={`Goles ${local}`}
        plantilla={jugadoresLocal}
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
        plantilla={jugadoresVisitante}
        goles={golesVisitante}
        onAdd={() => setGolesVisitante([...golesVisitante, golVacio()])}
        onUpdate={(i, campo, val) =>
          updateGol(golesVisitante, setGolesVisitante, i, campo, val)
        }
        onRemove={(i) => removeGol(golesVisitante, setGolesVisitante, i)}
      />

      {/* Tarjetas */}
      <TarjetasSection
        titulo={`Tarjetas ${local}`}
        plantilla={jugadoresLocal}
        tarjetas={tarjetasLocal}
        onCambiar={setTarjetasLocal}
      />
      <TarjetasSection
        titulo={`Tarjetas ${visitante}`}
        plantilla={jugadoresVisitante}
        tarjetas={tarjetasVisitante}
        onCambiar={setTarjetasVisitante}
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

/**
 * Campo de nombre con la plantilla a un toque.
 *
 * Antes esto era un <datalist>, que el Safari del iPhone no llega a pintar:
 * apuntando el acta desde el móvil a pie de pista no salía ninguna sugerencia
 * y había que escribir el apodo entero y bien. Ahora los nombres son botones.
 */
function EntradaJugador({
  value,
  onChange,
  plantilla,
  placeholder,
  /** Anotaciones que no son un jugador, como "Cedido" */
  extras = [],
  className = "",
}: {
  value: string;
  onChange: (valor: string) => void;
  plantilla: string[];
  placeholder: string;
  extras?: string[];
  className?: string;
}) {
  const campo = useRef<HTMLInputElement>(null);
  const [abierto, setAbierto] = useState(false);

  const escrito = normalizar(value);
  const opciones = [...plantilla, ...extras].filter(
    (opcion) => !escrito || normalizar(opcion).includes(escrito)
  );

  function elegir(opcion: string) {
    onChange(opcion);
    setAbierto(false);
    campo.current?.blur();
  }

  return (
    <div className="min-w-0 flex-1">
      <input
        ref={campo}
        type="text"
        value={value}
        onChange={(e) => { onChange(e.target.value); setAbierto(true); }}
        onFocus={() => setAbierto(true)}
        onBlur={() => setAbierto(false)}
        autoComplete="off"
        placeholder={placeholder}
        className={className}
      />
      {abierto && opciones.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {opciones.map((opcion) => (
            <button
              key={opcion}
              type="button"
              // El dedo saca el foco del campo antes de que llegue el click, y
              // eso cerraría la lista sin elegir nada: mejor actuar aquí
              onPointerDown={(e) => { e.preventDefault(); elegir(opcion); }}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-[#0b4a6f] shadow-sm transition active:scale-95 active:border-[#0b4a6f] active:bg-[#0b4a6f] active:text-white"
            >
              {opcion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function GolesSection({
  titulo,
  plantilla,
  goles,
  onAdd,
  onUpdate,
  onRemove,
}: {
  titulo: string;
  /** Apodos de ese equipo, para ofrecerlos de un toque */
  plantilla: string[];
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
              <div className="flex items-start gap-2">
                <span className="mt-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest w-4">
                  {i + 1}
                </span>
                <EntradaJugador
                  value={gol.jugador}
                  onChange={(valor) => onUpdate(i, "jugador", valor)}
                  plantilla={plantilla}
                  extras={["Cedido"]}
                  placeholder="Goleador (apodo)"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#0b4a6f] transition"
                />
                <button
                  onClick={() => onRemove(i)}
                  className="mt-1 text-slate-400 hover:text-red-500 transition text-lg leading-none px-1"
                >
                  ×
                </button>
              </div>
              <div className="flex items-start gap-2 ml-6">
                <EntradaJugador
                  value={gol.asistente}
                  onChange={(valor) => onUpdate(i, "asistente", valor)}
                  plantilla={plantilla}
                  extras={["Cedido"]}
                  placeholder="Asistente (opcional)"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 focus:outline-none focus:border-[#0b4a6f] transition"
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

/** Las tarjetas del acta. Restan en el fantasy y salen en la ficha del partido. */
function TarjetasSection({
  titulo,
  plantilla,
  tarjetas,
  onCambiar,
}: {
  titulo: string;
  plantilla: string[];
  tarjetas: TarjetaEntry[];
  onCambiar: (tarjetas: TarjetaEntry[]) => void;
}) {
  const actualizar = (indice: number, campo: keyof TarjetaEntry, valor: string) =>
    onCambiar(tarjetas.map((tarjeta, i) => (i === indice ? { ...tarjeta, [campo]: valor } : tarjeta)));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">{titulo}</h3>
        <button
          onClick={() => onCambiar([...tarjetas, tarjetaVacia()])}
          className="flex items-center gap-1 text-xs font-bold text-[#0b4a6f] bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg hover:bg-blue-100 active:scale-95 transition"
        >
          <span className="text-base leading-none">+</span> Tarjeta
        </button>
      </div>

      {tarjetas.length === 0 ? (
        <p className="text-sm text-slate-400 text-center py-2">Sin tarjetas</p>
      ) : (
        <div className="space-y-3">
          {tarjetas.map((tarjeta, i) => (
            <div key={i} className="rounded-xl bg-slate-50 border border-slate-100 p-3 space-y-2">
              <div className="flex items-start gap-2">
                <span
                  className={`mt-2 h-5 w-3.5 shrink-0 rounded-sm ${
                    tarjeta.tipo === "roja" ? "bg-red-500" : "bg-yellow-400"
                  }`}
                  aria-hidden
                />
                <EntradaJugador
                  value={tarjeta.jugador}
                  onChange={(valor) => actualizar(i, "jugador", valor)}
                  plantilla={plantilla}
                  placeholder="Jugador (apodo)"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#0b4a6f] transition"
                />
                <button
                  onClick={() => onCambiar(tarjetas.filter((_, indice) => indice !== i))}
                  className="mt-1 text-slate-400 hover:text-red-500 transition text-lg leading-none px-1"
                  aria-label="Quitar tarjeta"
                >
                  ×
                </button>
              </div>
              <div className="flex gap-2 ml-6">
                <select
                  value={tarjeta.tipo}
                  onChange={(e) => actualizar(i, "tipo", e.target.value)}
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 focus:outline-none focus:border-[#0b4a6f] transition"
                >
                  <option value="amarilla">Amarilla</option>
                  <option value="roja">Roja</option>
                </select>
                <input
                  type="number"
                  value={tarjeta.minuto}
                  onChange={(e) => actualizar(i, "minuto", e.target.value)}
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
