"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { guardarResultado, borrarResultado } from "../actions";

type GolEntry = {
  jugador: string;
  asistente: string;
  minuto: string;
};

const golVacio = (): GolEntry => ({ jugador: "", asistente: "", minuto: "" });

type Props = {
  partidoId: string;
  local: string;
  visitante: string;
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
  resultadoActual,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

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
  const [error, setError] = useState("");
  const [showDelete, setShowDelete] = useState(false);

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
            placeholder="Ej: 3-2"
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
            placeholder="Apodo del jugador MVP"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-[#0b4a6f] focus:bg-white transition"
          />
        </div>
      </div>

      {/* Goles Local */}
      <GolesSection
        titulo={`Goles ${local}`}
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
        goles={golesVisitante}
        onAdd={() => setGolesVisitante([...golesVisitante, golVacio()])}
        onUpdate={(i, campo, val) =>
          updateGol(golesVisitante, setGolesVisitante, i, campo, val)
        }
        onRemove={(i) => removeGol(golesVisitante, setGolesVisitante, i)}
      />

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
        {isPending ? "Guardando…" : "Guardar Resultado"}
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
  goles,
  onAdd,
  onUpdate,
  onRemove,
}: {
  titulo: string;
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
