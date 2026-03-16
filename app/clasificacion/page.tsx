import Image from "next/image";
import { jornadas } from "../../data/partidos";
import { equipos } from "../../data/equipos";

type FilaClasificacion = {
  equipo: string;
  pj: number;
  pg: number;
  pe: number;
  pp: number;
  gf: number;
  gc: number;
  pts: number;
  dg: number;
};

function calcularClasificacion(): FilaClasificacion[] {
  const tabla: Record<string, FilaClasificacion> = {};

  for (const equipo of equipos) {
    tabla[equipo.nombre] = {
      equipo: equipo.nombre,
      pj: 0,
      pg: 0,
      pe: 0,
      pp: 0,
      gf: 0,
      gc: 0,
      pts: 0,
      dg: 0,
    };
  }

  for (const jornada of jornadas) {
    for (const partido of jornada.partidos) {
      if (partido.estado !== "Finalizado" || !partido.resultado) continue;

      const [golesLocalStr, golesVisitanteStr] = partido.resultado.split("-");
      const golesLocal = Number(golesLocalStr);
      const golesVisitante = Number(golesVisitanteStr);

      if (Number.isNaN(golesLocal) || Number.isNaN(golesVisitante)) continue;

      const local = tabla[partido.local];
      const visitante = tabla[partido.visitante];

      if (!local || !visitante) continue;

      local.pj += 1;
      visitante.pj += 1;

      local.gf += golesLocal;
      local.gc += golesVisitante;

      visitante.gf += golesVisitante;
      visitante.gc += golesLocal;

      if (golesLocal > golesVisitante) {
        local.pg += 1;
        local.pts += 3;
        visitante.pp += 1;
      } else if (golesLocal < golesVisitante) {
        visitante.pg += 1;
        visitante.pts += 3;
        local.pp += 1;
      } else {
        local.pe += 1;
        visitante.pe += 1;
        local.pts += 1;
        visitante.pts += 1;
      }
    }
  }

  const clasificacion = Object.values(tabla).map((fila) => ({
    ...fila,
    dg: fila.gf - fila.gc,
  }));

  clasificacion.sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.dg !== a.dg) return b.dg - a.dg;
    if (b.gf !== a.gf) return b.gf - a.gf;
    return a.equipo.localeCompare(b.equipo);
  });

  return clasificacion;
}

export default function ClasificacionPage() {
  const clasificacion = calcularClasificacion();

  const logosEquipos = Object.fromEntries(
    equipos.map((equipo) => [equipo.nombre, equipo.logo])
  ) as Record<string, string>;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-10 text-5xl font-bold text-[#0b4a6f]">Clasificación</h1>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white/90 shadow-sm backdrop-blur-sm">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-[#0b4a6f] text-white">
              <th className="px-4 py-4 text-left text-sm font-semibold">#</th>
              <th className="px-4 py-4 text-left text-sm font-semibold">Equipo</th>
              <th className="px-4 py-4 text-center text-sm font-semibold">PJ</th>
              <th className="px-4 py-4 text-center text-sm font-semibold">PG</th>
              <th className="px-4 py-4 text-center text-sm font-semibold">PE</th>
              <th className="px-4 py-4 text-center text-sm font-semibold">PP</th>
              <th className="px-4 py-4 text-center text-sm font-semibold">GF</th>
              <th className="px-4 py-4 text-center text-sm font-semibold">GC</th>
              <th className="px-4 py-4 text-center text-sm font-semibold">DG</th>
              <th className="px-4 py-4 text-center text-sm font-semibold">PTS</th>
            </tr>
          </thead>

          <tbody>
            {clasificacion.map((fila, index) => (
              <tr
                key={fila.equipo}
                className="border-t border-slate-200 text-slate-800"
              >
                <td className="px-4 py-4 font-semibold">{index + 1}</td>

                <td className="px-4 py-4 font-semibold text-[#0b4a6f]">
                  <div className="flex items-center gap-3">
                    <Image
                      src={logosEquipos[fila.equipo]}
                      alt={fila.equipo}
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain"
                    />
                    <span>{fila.equipo}</span>
                  </div>
                </td>

                <td className="px-4 py-4 text-center">{fila.pj}</td>
                <td className="px-4 py-4 text-center">{fila.pg}</td>
                <td className="px-4 py-4 text-center">{fila.pe}</td>
                <td className="px-4 py-4 text-center">{fila.pp}</td>
                <td className="px-4 py-4 text-center">{fila.gf}</td>
                <td className="px-4 py-4 text-center">{fila.gc}</td>
                <td className="px-4 py-4 text-center">{fila.dg}</td>
                <td className="px-4 py-4 text-center font-bold">{fila.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}