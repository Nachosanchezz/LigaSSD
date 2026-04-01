import Image from "next/image";
import Link from "next/link";
import { equipos } from "../../data/equipos";
import { nombreCompletoJugador } from "@/lib/helpers";

type FilaJugador = {
  id: string;
  jugador: string;
  equipo: string;
  logo: string;
  apodo?: string;
  edad?: number;
  posicion?: string;
  piernaBuena?: string;
};

function obtenerJugadores(): FilaJugador[] {
  const filas: FilaJugador[] = [];

  for (const equipo of equipos) {
    for (const jugador of equipo.integrantes) {
      filas.push({
        id: jugador.id,
        jugador: nombreCompletoJugador(jugador),
        equipo: equipo.nombre,
        logo: equipo.logo,
        apodo: jugador.apodo,
        edad: jugador.edad,
        posicion: jugador.posicion,
        piernaBuena: jugador.piernaBuena,
      });
    }
  }

  return filas.sort((a, b) => a.jugador.localeCompare(b.jugador));
}

const getShieldForPosition = (posicion?: string) => {
  if (!posicion) return <span className="text-slate-400 font-medium">-</span>;
  
  const isPortero = posicion.toLowerCase().includes("portero");
  return (
    <span className={`inline-flex px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm border ${
      isPortero 
        ? "bg-yellow-100 text-yellow-800 border-yellow-200" 
        : "bg-blue-50 text-blue-700 border-blue-200"
    }`}>
      {posicion}
    </span>
  );
};

export default function JugadoresPage() {
  const jugadores = obtenerJugadores();

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      {/* Header Banner */}
      <div className="bg-[#091f36] pt-12 sm:pt-16 pb-20 sm:pb-24 px-4 sm:px-6 text-center border-b border-indigo-900/30">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 drop-shadow-sm">
          Jugadores
        </h1>
        <p className="mt-2 sm:mt-4 text-blue-200 font-medium max-w-2xl mx-auto uppercase tracking-wide text-[10px] sm:text-sm">
          Plantillas completas y datos de los participantes
        </p>
      </div>

      <section className="mx-auto max-w-6xl px-3 sm:px-6 -mt-10 sm:-mt-12">
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-xl shadow-[#0b4a6f]/5 border border-slate-100">
          <div className="overflow-x-auto p-2 sm:p-4 w-full max-w-[100vw]">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-100 bg-white">
                  <th className="px-3 sm:px-6 py-3 sm:py-5 text-left text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                    Jugador / Apodo
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-5 text-left text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                    Equipo
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-5 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                    Posición
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-5 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 w-16 sm:w-24">
                    Edad
                  </th>
                  <th className="px-3 sm:px-6 py-3 sm:py-5 text-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                    Pierna Fuerte
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-50">
                {jugadores.map((fila) => (
                  <tr
                    key={fila.id}
                    className="group transition-colors hover:bg-slate-50/80"
                  >
                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <Link href={`/jugadores/${fila.id}`} className="flex flex-col hover:underline decoration-[#0b4a6f]">
                        <span className="font-bold text-slate-800 text-sm sm:text-base whitespace-nowrap sm:whitespace-normal group-hover:text-[#0b4a6f] transition-colors">{fila.jugador}</span>
                        {fila.apodo && (
                          <span className="text-xs sm:text-sm font-medium text-slate-500 italic mt-0.5">"{fila.apodo}"</span>
                        )}
                      </Link>
                    </td>

                    <td className="px-3 sm:px-6 py-3 sm:py-4">
                      <div className="inline-flex items-center gap-1.5 sm:gap-3 rounded-full bg-slate-50 px-2 sm:px-4 py-1 sm:py-1.5 border border-slate-100 shadow-sm transition-transform group-hover:bg-white group-hover:border-slate-200 max-w-[120px] sm:max-w-none">
                        <Image
                          src={fila.logo}
                          alt={fila.equipo}
                          width={24}
                          height={24}
                          className="h-4 w-4 sm:h-6 sm:w-6 object-contain shrink-0"
                        />
                        <span className="text-xs sm:text-sm font-bold text-slate-700 truncate">{fila.equipo}</span>
                      </div>
                    </td>

                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                      {getShieldForPosition(fila.posicion)}
                    </td>
                    
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                      <span className="inline-block py-1 px-2 sm:px-3 bg-slate-100 rounded-lg text-slate-700 font-semibold shadow-inner font-mono text-xs sm:text-sm">
                        {fila.edad ?? "-"}
                      </span>
                    </td>
                    
                    <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                      <span className="text-xs sm:text-sm font-semibold text-slate-600 uppercase tracking-wide">
                        {fila.piernaBuena ?? "-"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}