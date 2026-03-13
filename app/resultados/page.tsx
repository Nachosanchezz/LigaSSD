import Link from "next/link";
import { jornadas } from "../../data/partidos";

const jornadasConResultados = jornadas
  .map((jornada) => ({
    ...jornada,
    partidos: jornada.partidos.filter(
      (partido) => partido.estado === "Finalizado"
    ),
  }))
  .filter((jornada) => jornada.partidos.length > 0);

export default function ResultadosPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-10 text-5xl font-bold text-[#0b4a6f]">Resultados</h1>

      {jornadasConResultados.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm">
          <p className="text-slate-700">
            Aún no hay partidos finalizados.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {jornadasConResultados.map((jornada) => (
            <div
              key={jornada.numero}
              className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm"
            >
              <h2 className="mb-6 text-3xl font-semibold text-[#0b4a6f]">
                Jornada {jornada.numero}
              </h2>

              <div className="space-y-4">
                {jornada.partidos.map((partido) => (
                  <Link
                    key={partido.id}
                    href={`/partidos/${partido.id}`}
                    className="block rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 transition hover:border-[#0b4a6f] hover:shadow-sm"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div className="text-lg font-medium text-slate-800">
                        {partido.local}
                      </div>

                      <div className="rounded-lg bg-[#0b4a6f] px-4 py-2 text-lg font-bold text-white">
                        {partido.resultado}
                      </div>

                      <div className="text-lg font-medium text-slate-800">
                        {partido.visitante}
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
                      {partido.dia && <span>{partido.dia}</span>}
                      {partido.hora && <span>· {partido.hora}</span>}
                      {partido.campo && <span>· Campo {partido.campo}</span>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}