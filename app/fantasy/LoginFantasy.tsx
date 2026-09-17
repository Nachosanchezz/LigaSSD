"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { entrar } from "./actions";

export type JugadorLogin = { id: string; apodo: string; nombre: string; equipo: string };

/**
 * Entrada al fantasy: eliges tu nombre de la lista de la liga y tu PIN. La
 * primera vez, el PIN que escribes se queda como el tuyo.
 */
export default function LoginFantasy({ jugadores }: { jugadores: JugadorLogin[] }) {
  const router = useRouter();
  const [pendiente, startTransition] = useTransition();
  const [personaId, setPersonaId] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const equipos = [...new Set(jugadores.map((jugador) => jugador.equipo))];

  function enviar() {
    setError("");
    startTransition(async () => {
      const resultado = await entrar(personaId, pin);
      if (resultado.error) {
        setError(resultado.error);
        setPin("");
      } else {
        router.refresh();
      }
    });
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl sm:p-8">
      <h2 className="text-lg font-black uppercase tracking-tight text-[#091f36] sm:text-2xl">
        Entra con tu nombre
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        El fantasy es solo para los jugadores de la liga. La primera vez, el PIN que escribas se
        queda como el tuyo.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label htmlFor="quien" className="mb-1.5 block text-xs font-black uppercase tracking-widest text-slate-500">
            ¿Quién eres?
          </label>
          <select
            id="quien"
            value={personaId}
            onChange={(evento) => setPersonaId(evento.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-[#091f36] transition focus:border-[#0b4a6f] focus:bg-white focus:outline-none"
          >
            <option value="">Elige tu nombre…</option>
            {equipos.map((equipo) => (
              <optgroup key={equipo} label={equipo}>
                {jugadores
                  .filter((jugador) => jugador.equipo === equipo)
                  .map((jugador) => (
                    <option key={jugador.id} value={jugador.id}>
                      {jugador.apodo} — {jugador.nombre}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="pin" className="mb-1.5 block text-xs font-black uppercase tracking-widest text-slate-500">
            Tu PIN (4 números)
          </label>
          <input
            id="pin"
            type="password"
            inputMode="numeric"
            autoComplete="off"
            maxLength={4}
            value={pin}
            onChange={(evento) => setPin(evento.target.value.replace(/\D/g, ""))}
            onKeyDown={(evento) => {
              if (evento.key === "Enter" && personaId && pin.length === 4) enviar();
            }}
            placeholder="····"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-center text-2xl font-black tracking-[0.5em] text-[#091f36] transition focus:border-[#0b4a6f] focus:bg-white focus:outline-none"
          />
        </div>

        {error && (
          <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm font-bold text-red-600">
            {error}
          </p>
        )}

        <button
          onClick={enviar}
          disabled={pendiente || !personaId || pin.length !== 4}
          className="w-full rounded-2xl bg-[#0b4a6f] py-4 text-base font-black uppercase tracking-wide text-white shadow-lg shadow-[#0b4a6f]/20 transition hover:bg-[#091f36] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {pendiente ? "Entrando…" : "Entrar"}
        </button>
      </div>
    </div>
  );
}
