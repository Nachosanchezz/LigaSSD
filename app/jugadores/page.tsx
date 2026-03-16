import Image from "next/image";
import { equipos } from "../../data/equipos";

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

function nombreCompletoJugador(jugador: {
  nombre: string;
  primerApellido?: string;
}) {
  return [jugador.nombre, jugador.primerApellido]
    .filter((parte) => parte && parte.trim() !== "")
    .join(" ");
}

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

export default function JugadoresPage() {
  const jugadores = obtenerJugadores();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-10 text-5xl font-bold text-[#0b4a6f]">Jugadores</h1>

      <div className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-[#0b4a6f] text-white">
                <th className="px-4 py-4 text-left text-sm font-semibold">
                  Jugador
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold">
                  Equipo
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold">
                  Apodo
                </th>
                <th className="px-4 py-4 text-center text-sm font-semibold">
                  Edad
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold">
                  Posición
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold">
                  Pierna buena
                </th>
              </tr>
            </thead>

            <tbody>
              {jugadores.map((fila) => (
                <tr
                  key={fila.id}
                  className="border-t border-slate-200 text-slate-800"
                >
                  <td className="px-4 py-4 font-semibold text-[#0b4a6f]">
                    {fila.jugador}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={fila.logo}
                        alt={fila.equipo}
                        width={28}
                        height={28}
                        className="h-7 w-7 object-contain"
                      />
                      <span>{fila.equipo}</span>
                    </div>
                  </td>

                  <td className="px-4 py-4">{fila.apodo ?? "-"}</td>
                  <td className="px-4 py-4 text-center">{fila.edad ?? "-"}</td>
                  <td className="px-4 py-4">{fila.posicion ?? "-"}</td>
                  <td className="px-4 py-4">{fila.piernaBuena ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}