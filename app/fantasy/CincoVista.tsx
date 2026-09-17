import Link from "next/link";
import Escudo from "@/components/Escudo";
import { REGLAS } from "@/data/fantasy";
import type { JugadorMercado, PuntosJugador } from "@/lib/fantasy";

/** Las acciones que hizo un jugador, en corto: "2 goles · MVP · ganó" */
function detalle(puntos?: PuntosJugador): string {
  if (!puntos) return "No jugó";
  const trozos: string[] = [];
  if (puntos.goles) trozos.push(puntos.goles === 1 ? "1 gol" : `${puntos.goles} goles`);
  if (puntos.asistencias) trozos.push(puntos.asistencias === 1 ? "1 asist." : `${puntos.asistencias} asist.`);
  if (puntos.mvp) trozos.push("MVP");
  if (puntos.enPropia) trozos.push(puntos.enPropia === 1 ? "1 en propia" : `${puntos.enPropia} en propia`);
  if (puntos.resultado === "victoria") trozos.push("ganó");
  else if (puntos.resultado === "empate") trozos.push("empató");
  else if (puntos.resultado === "derrota") trozos.push("perdió");
  return trozos.length > 0 ? trozos.join(" · ") : "Sin acciones";
}

/** Un cinco ya elegido, con lo que hizo cada uno si la jornada se ha jugado */
export default function CincoVista({
  jugadores,
  capitan,
  puntos,
}: {
  jugadores: JugadorMercado[];
  capitan: string;
  /** Si falta, se pinta sin puntos (la jornada aún no se ha jugado) */
  puntos?: Record<string, PuntosJugador>;
}) {
  return (
    <ul className="divide-y divide-slate-50">
      {jugadores.map((jugador) => {
        const suyos = puntos?.[jugador.id];
        const esCapitan = jugador.id === capitan;
        const total = (suyos?.puntos ?? 0) * (esCapitan ? REGLAS.multiplicadorCapitan : 1);
        return (
          <li key={jugador.id} className="flex items-center gap-3 px-4 py-3">
            <span className="h-9 w-9 shrink-0">
              <Escudo nombre={jugador.equipo} logo={jugador.logo} color={jugador.color} size={36} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-1.5 truncate text-sm font-black text-[#091f36]">
                <Link href={`/jugadores/${jugador.id}`} className="truncate hover:text-[#0b4a6f]">
                  {jugador.apodo}
                </Link>
                {jugador.portero && (
                  <span className="shrink-0 rounded bg-slate-200 px-1 text-[9px] font-black text-slate-600">POR</span>
                )}
                {esCapitan && (
                  <span className="shrink-0 rounded bg-yellow-400 px-1 text-[9px] font-black text-[#091f36]">C</span>
                )}
              </p>
              <p className="truncate text-[11px] text-slate-400">
                {puntos ? detalle(suyos) : jugador.equipo}
              </p>
            </div>
            {puntos ? (
              <span
                className={`shrink-0 rounded-lg px-2 py-1 text-sm font-black tabular-nums ${
                  total > 0 ? "bg-[#0b4a6f] text-white" : total < 0 ? "bg-red-100 text-red-600" : "bg-slate-100 text-slate-400"
                }`}
              >
                {total}
              </span>
            ) : (
              <span className="shrink-0 rounded-lg bg-slate-100 px-2 py-1 text-sm font-black tabular-nums text-[#0b4a6f]">
                {jugador.valor}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
