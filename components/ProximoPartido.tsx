"use client";

import { useEffect, useState } from "react";
import Escudo, { type DatosEscudo } from "@/components/Escudo";

type Props = {
  local: string;
  visitante: string;
  escudoLocal: DatosEscudo;
  escudoVisitante: DatosEscudo;
  cuando: string;
  /** Fecha y hora en ISO; si falta, no hay cuenta atrás */
  iso?: string;
  campo?: string;
  jornada: string;
};

const unidades = [
  { etiqueta: "días", ms: 86400000 },
  { etiqueta: "horas", ms: 3600000 },
  { etiqueta: "min", ms: 60000 },
  { etiqueta: "seg", ms: 1000 },
];

// Cuenta atrás del siguiente partido. Empieza en blanco y se rellena en el
// navegador: así el servidor y el cliente pintan lo mismo.
function CuentaAtras({ iso }: { iso: string }) {
  const [restante, setRestante] = useState<number | null>(null);

  useEffect(() => {
    const calcular = () => setRestante(Math.max(0, new Date(iso).getTime() - Date.now()));
    calcular();
    const reloj = setInterval(calcular, 1000);
    return () => clearInterval(reloj);
  }, [iso]);

  return (
    <div className="flex items-start justify-center gap-3 sm:gap-5">
      {unidades.map(({ etiqueta, ms }, indice) => {
        const previa = unidades[indice - 1]?.ms;
        const valor = restante === null ? null : Math.floor((previa ? restante % previa : restante) / ms);
        return (
          <div key={etiqueta} className="w-12 text-center sm:w-16">
            <p className="font-display text-3xl font-black italic tabular-nums text-white sm:text-5xl">
              {valor === null ? "–" : String(valor).padStart(2, "0")}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-blue-300">{etiqueta}</p>
          </div>
        );
      })}
    </div>
  );
}

export default function ProximoPartido({ local, visitante, escudoLocal, escudoVisitante, cuando, iso, campo, jornada }: Props) {
  return (
    <section className="relative overflow-hidden bg-[#091f36] px-4 py-8 sm:py-10 text-center text-white">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "repeating-linear-gradient(115deg, #fff 0 2px, transparent 2px 16px)" }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-yellow-400">Próximo partido · {jornada}</p>

        <div className="mt-4 flex items-center justify-center gap-3 sm:gap-8">
          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
            <span className="truncate text-right text-sm font-bold uppercase sm:text-2xl">{local}</span>
            <span className="h-10 w-10 shrink-0 sm:h-16 sm:w-16">
              <Escudo nombre={local} {...escudoLocal} size={64} />
            </span>
          </div>
          <span className="shrink-0 font-display text-xl font-black italic text-blue-300 sm:text-3xl">VS</span>
          <div className="flex flex-1 items-center gap-2 sm:gap-4">
            <span className="h-10 w-10 shrink-0 sm:h-16 sm:w-16">
              <Escudo nombre={visitante} {...escudoVisitante} size={64} />
            </span>
            <span className="truncate text-sm font-bold uppercase sm:text-2xl">{visitante}</span>
          </div>
        </div>

        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-blue-200">
          {cuando}
          {campo ? ` · Campo ${campo}` : ""}
        </p>

        {iso && (
          <div className="mt-5">
            <CuentaAtras iso={iso} />
          </div>
        )}
      </div>
    </section>
  );
}
