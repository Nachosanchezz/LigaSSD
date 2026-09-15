import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { equipos, logosEquipos } from "@/data/split2/equipos";
import { calcularClasificacion } from "@/lib/clasificacion";
import { contarEstadistica } from "@/lib/estadisticas";
import { getJornadasConResultados, getPlayoffConResultados } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const MEDALLAS = ["🥇", "🥈", "🥉"];

function marcador(resultado?: string): [number, number] | null {
  const [local, visitante] = (resultado ?? "").split("-").map(Number);
  return Number.isNaN(local) || Number.isNaN(visitante) ? null : [local, visitante];
}

function Escudo({ equipo, size }: { equipo: string; size: number }) {
  const logo = logosEquipos[equipo];
  if (!logo) return null;
  return <Image src={logo} alt={equipo} width={size} height={size} className="h-full w-full object-contain" />;
}

export default async function Split2Page() {
  const [jornadas, { cuartos, semifinales, final }] = await Promise.all([
    getJornadasConResultados(),
    getPlayoffConResultados(),
  ]);
  const partidosLiga = jornadas.flatMap((jornada) => jornada.partidos);
  const partidosPlayoff = [...cuartos, ...semifinales, final];

  const clasificacion = calcularClasificacion(
    equipos.map((equipo) => equipo.nombre),
    partidosLiga
  );
  const goleadores = contarEstadistica([...partidosLiga, ...partidosPlayoff], "jugador").slice(0, 3);

  const marcadores = [...partidosLiga, ...partidosPlayoff]
    .filter((partido) => partido.estado === "Finalizado")
    .map((partido) => marcador(partido.resultado))
    .filter((goles): goles is [number, number] => goles !== null);
  const totalGoles = marcadores.reduce((suma, [local, visitante]) => suma + local + visitante, 0);
  const mediaGoles = marcadores.length > 0 ? (totalGoles / marcadores.length).toFixed(1).replace(".", ",") : "–";

  const campeon = final.ganador;
  const subcampeon = campeon && (campeon === final.local ? final.visitante : final.local);
  const primeroLiga = clasificacion[0];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      <PageHeader title="Split 2" subtitle="Mar – Jun 2026 · Liga regular y playoffs" />

      <div className="mx-auto max-w-6xl px-3 sm:px-6 -mt-10 sm:-mt-12 relative z-10 space-y-6">

        {/* Campeón */}
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#091f36] to-[#0b4a6f] shadow-xl p-6 sm:p-10 text-center text-white">
          <p className="text-yellow-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">
            {campeon ? "Campeón del Split 2" : "Final pendiente"}
          </p>
          {campeon && (
            <>
              <div className="flex items-center justify-center gap-4 sm:gap-6 mb-3">
                <div className="h-14 w-14 sm:h-20 sm:w-20 shrink-0 rounded-full bg-white p-1.5 sm:p-2 shadow-lg">
                  <Escudo equipo={campeon} size={80} />
                </div>
                <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                  {campeon}
                </h2>
              </div>
              <Link href="/split2/playoffs/final" className="text-sm text-blue-200 hover:text-white transition-colors">
                Final: {final.local} {final.resultado} {final.visitante} · Ver acta →
              </Link>
            </>
          )}
          <div className="mx-auto mt-6 grid max-w-lg grid-cols-2 gap-4 border-t border-white/10 pt-6">
            <div>
              <p className="text-[10px] sm:text-xs text-blue-200 uppercase tracking-wider">Subcampeón</p>
              <p className="mt-1 text-sm sm:text-lg font-black uppercase">{subcampeon ?? "—"}</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-blue-200 uppercase tracking-wider">1º liga regular</p>
              <p className="mt-1 text-sm sm:text-lg font-black uppercase text-yellow-400">{primeroLiga?.equipo ?? "—"}</p>
              {primeroLiga && <p className="text-[10px] sm:text-xs text-blue-200">{primeroLiga.pts} puntos</p>}
            </div>
          </div>
        </div>

        {/* Stats globales */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6">
          {[
            { label: "Partidos jugados", value: marcadores.length },
            { label: "Goles totales", value: totalGoles },
            { label: "Goles por partido", value: mediaGoles },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-2xl bg-white shadow-md border border-slate-100 p-4 sm:p-6 text-center">
              <p className="text-3xl sm:text-4xl font-black text-[#0b4a6f]">{value}</p>
              <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider mt-1 font-medium">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top 3 Clasificación */}
          <div className="rounded-2xl bg-white shadow-md border border-slate-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-black text-[#091f36] uppercase tracking-wide text-sm sm:text-base">Liga regular</h3>
              <Link href="/split2/clasificacion" className="text-xs text-[#0b4a6f] font-semibold hover:underline">
                Ver completa →
              </Link>
            </div>
            <div className="divide-y divide-slate-50">
              {clasificacion.slice(0, 3).map((fila, i) => (
                <div key={fila.equipo} className="flex items-center gap-3 sm:gap-4 px-5 py-4">
                  <span className="text-xl w-6 shrink-0">{MEDALLAS[i]}</span>
                  <div className="h-8 w-8 shrink-0 rounded-full bg-slate-50 border border-slate-100 p-1">
                    <Escudo equipo={fila.equipo} size={28} />
                  </div>
                  <span className="font-bold text-slate-800 text-sm flex-1 truncate">{fila.equipo}</span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#091f36] to-[#0b4a6f] text-sm font-black text-white shadow-sm">
                    {fila.pts}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top 3 Goleadores */}
          <div className="rounded-2xl bg-white shadow-md border border-slate-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-black text-[#091f36] uppercase tracking-wide text-sm sm:text-base">Máximos Goleadores</h3>
              <Link href="/split2/estadisticas" className="text-xs text-[#0b4a6f] font-semibold hover:underline">
                Ver todos →
              </Link>
            </div>
            <div className="divide-y divide-slate-50">
              {goleadores.length === 0 && <p className="px-5 py-4 text-sm text-slate-400">Sin goles registrados.</p>}
              {goleadores.map((jugador, i) => (
                <Link
                  key={jugador.id}
                  href={`/split2/jugadores/${jugador.id}`}
                  className="flex items-center gap-3 sm:gap-4 px-5 py-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-xl w-6 shrink-0">{MEDALLAS[i]}</span>
                  <div className="h-8 w-8 shrink-0 rounded-full bg-slate-50 border border-slate-100 p-1">
                    <Escudo equipo={jugador.equipo} size={28} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-sm truncate">{jugador.jugador}</p>
                    <p className="text-[10px] text-slate-400 truncate">{jugador.equipo}</p>
                  </div>
                  <span className="inline-flex h-8 w-10 items-center justify-center rounded-lg bg-yellow-400 text-sm font-black text-[#091f36] shadow-sm">
                    {jugador.valor}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
