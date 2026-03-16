import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { jornadas } from "../../../data/partidos";
import { equipos } from "../../../data/equipos";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PartidoDetallePage({ params }: Props) {
  const { id } = await params;

  const partido = jornadas
    .flatMap((jornada) => jornada.partidos)
    .find((partido) => partido.id === id);

  if (!partido || partido.estado !== "Finalizado") {
    notFound();
  }

  const logosEquipos = Object.fromEntries(
    equipos.map((equipo) => [equipo.nombre, equipo.logo])
  ) as Record<string, string>;

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <Link
        href="/jornadas"
        className="mb-8 inline-block text-sm font-medium text-[#0b4a6f] hover:underline"
      >
        ← Volver a jornadas
      </Link>

      <div className="rounded-2xl border border-slate-200 bg-white/90 p-8 shadow-sm backdrop-blur-sm">
        <div className="mb-8 text-center">
          <p className="mb-4 text-sm font-medium text-slate-500">
            {partido.dia} {partido.hora ? `· ${partido.hora}` : ""}
          </p>

          <div className="mb-6 flex flex-col items-center justify-center gap-6 md:flex-row">
            <div className="flex flex-col items-center gap-3">
              <Image
                src={logosEquipos[partido.local]}
                alt={partido.local}
                width={70}
                height={70}
                className="h-[70px] w-[70px] object-contain"
              />
              <span className="text-lg font-semibold text-[#0b4a6f]">
                {partido.local}
              </span>
            </div>

            <div className="text-center">
              <h1 className="text-5xl font-bold text-[#0b4a6f]">
                {partido.resultado}
              </h1>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Image
                src={logosEquipos[partido.visitante]}
                alt={partido.visitante}
                width={70}
                height={70}
                className="h-[70px] w-[70px] object-contain"
              />
              <span className="text-lg font-semibold text-[#0b4a6f]">
                {partido.visitante}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {partido.campo && (
              <div className="rounded-lg bg-slate-200 px-3 py-2 text-sm text-slate-700">
                <span className="font-semibold">Campo:</span> {partido.campo}
              </div>
            )}

            {partido.arbitra && (
              <div className="rounded-lg bg-[#f7f3e9] px-3 py-2 text-sm text-slate-700">
                <span className="font-semibold text-[#0b4a6f]">Arbitra:</span>{" "}
                {partido.arbitra}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-[#0b4a6f]">
              Goles {partido.local}
            </h2>

            <div className="space-y-3">
              {partido.resumen?.local.map((gol, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <p className="font-semibold text-slate-800">{gol.jugador}</p>
                  <p className="text-sm text-slate-600">
                    Asistencia: {gol.asistente ?? "Sin asistencia"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-[#0b4a6f]">
              Goles {partido.visitante}
            </h2>

            <div className="space-y-3">
              {partido.resumen?.visitante.map((gol, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <p className="font-semibold text-slate-800">{gol.jugador}</p>
                  <p className="text-sm text-slate-600">
                    Asistencia: {gol.asistente ?? "Sin asistencia"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}