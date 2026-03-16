import Image from "next/image";
import { jornadas } from "../../data/partidos";
import { equipos } from "../../data/equipos";

type FilaEstadistica = {
  id: string;
  jugador: string;
  equipo: string;
  logo: string;
  valor: number;
};

function normalizarTexto(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function nombreCompletoJugador(jugador: {
  nombre: string;
  primerApellido?: string;
}) {
  return [jugador.nombre, jugador.primerApellido]
    .filter((parte) => parte && parte.trim() !== "")
    .join(" ");
}

function esValorIgnorable(texto?: string) {
  if (!texto) return true;

  const valor = normalizarTexto(texto);

  return valor === "sin asistencia" || valor === "gol cedido";
}

function crearMapaJugadores() {
  const mapa: Record<
    string,
    {
      id: string;
      jugadorMostrado: string;
      equipo: string;
      logo: string;
    }
  > = {};

  for (const equipo of equipos) {
    for (const jugador of equipo.integrantes) {
      const nombreCompleto = nombreCompletoJugador(jugador);
      const nombreSolo = jugador.nombre;
      const apodo = jugador.apodo;

      const info = {
        id: jugador.id,
        jugadorMostrado: nombreCompleto,
        equipo: equipo.nombre,
        logo: equipo.logo,
      };

      mapa[normalizarTexto(nombreCompleto)] = info;
      mapa[normalizarTexto(nombreSolo)] = info;

      if (apodo && apodo.trim() !== "") {
        mapa[normalizarTexto(apodo)] = info;
      }
    }
  }

  return mapa;
}

function calcularGoleadores(): FilaEstadistica[] {
  const tabla: Record<string, FilaEstadistica> = {};
  const mapaJugadores = crearMapaJugadores();

  for (const jornada of jornadas) {
    for (const partido of jornada.partidos) {
      if (partido.estado !== "Finalizado" || !partido.resumen) continue;

      for (const gol of partido.resumen.local) {
        if (esValorIgnorable(gol.jugador)) continue;

        const info = mapaJugadores[normalizarTexto(gol.jugador)];
        if (!info) continue;

        if (!tabla[info.id]) {
          tabla[info.id] = {
            id: info.id,
            jugador: info.jugadorMostrado,
            equipo: info.equipo,
            logo: info.logo,
            valor: 0,
          };
        }

        tabla[info.id].valor += 1;
      }

      for (const gol of partido.resumen.visitante) {
        if (esValorIgnorable(gol.jugador)) continue;

        const info = mapaJugadores[normalizarTexto(gol.jugador)];
        if (!info) continue;

        if (!tabla[info.id]) {
          tabla[info.id] = {
            id: info.id,
            jugador: info.jugadorMostrado,
            equipo: info.equipo,
            logo: info.logo,
            valor: 0,
          };
        }

        tabla[info.id].valor += 1;
      }
    }
  }

  return Object.values(tabla).sort((a, b) => {
    if (b.valor !== a.valor) return b.valor - a.valor;
    return a.jugador.localeCompare(b.jugador);
  });
}

function calcularAsistencias(): FilaEstadistica[] {
  const tabla: Record<string, FilaEstadistica> = {};
  const mapaJugadores = crearMapaJugadores();

  for (const jornada of jornadas) {
    for (const partido of jornada.partidos) {
      if (partido.estado !== "Finalizado" || !partido.resumen) continue;

      for (const gol of partido.resumen.local) {
        if (esValorIgnorable(gol.asistente)) continue;

        const info = mapaJugadores[normalizarTexto(gol.asistente!)];
        if (!info) continue;

        if (!tabla[info.id]) {
          tabla[info.id] = {
            id: info.id,
            jugador: info.jugadorMostrado,
            equipo: info.equipo,
            logo: info.logo,
            valor: 0,
          };
        }

        tabla[info.id].valor += 1;
      }

      for (const gol of partido.resumen.visitante) {
        if (esValorIgnorable(gol.asistente)) continue;

        const info = mapaJugadores[normalizarTexto(gol.asistente!)];
        if (!info) continue;

        if (!tabla[info.id]) {
          tabla[info.id] = {
            id: info.id,
            jugador: info.jugadorMostrado,
            equipo: info.equipo,
            logo: info.logo,
            valor: 0,
          };
        }

        tabla[info.id].valor += 1;
      }
    }
  }

  return Object.values(tabla).sort((a, b) => {
    if (b.valor !== a.valor) return b.valor - a.valor;
    return a.jugador.localeCompare(b.jugador);
  });
}

function TablaEstadistica({
  titulo,
  filas,
  etiquetaValor,
}: {
  titulo: string;
  filas: FilaEstadistica[];
  etiquetaValor: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-3xl font-semibold text-[#0b4a6f]">{titulo}</h2>
      </div>

      {filas.length === 0 ? (
        <div className="p-6 text-slate-700">Aún no hay datos disponibles.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-[#0b4a6f] text-white">
                <th className="px-4 py-4 text-left text-sm font-semibold">#</th>
                <th className="px-4 py-4 text-left text-sm font-semibold">
                  Jugador
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold">
                  Equipo
                </th>
                <th className="px-4 py-4 text-center text-sm font-semibold">
                  {etiquetaValor}
                </th>
              </tr>
            </thead>

            <tbody>
              {filas.map((fila, index) => (
                <tr
                  key={`${titulo}-${fila.id}`}
                  className="border-t border-slate-200 text-slate-800"
                >
                  <td className="px-4 py-4 font-semibold">{index + 1}</td>

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

                  <td className="px-4 py-4 text-center font-bold">
                    {fila.valor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function EstadisticasPage() {
  const goleadores = calcularGoleadores();
  const asistentes = calcularAsistencias();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-10 text-5xl font-bold text-[#0b4a6f]">Estadísticas</h1>

      <div className="space-y-10">
        <TablaEstadistica
          titulo="Goleadores"
          filas={goleadores}
          etiquetaValor="Goles"
        />

        <TablaEstadistica
          titulo="Asistencias"
          filas={asistentes}
          etiquetaValor="Asistencias"
        />
      </div>
    </section>
  );
}