import Link from "next/link";
import { jornadas } from "../../data/partidos";

export default function JornadasPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-10 text-5xl font-bold text-[#0b4a6f]">Jornadas</h1>

      <div className="space-y-8">
        {jornadas.map((jornada) => (
          <div
            key={jornada.numero}
            className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm"
          >
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className="text-3xl font-semibold text-[#0b4a6f]">
                Jornada {jornada.numero}
              </h2>

              <span className="w-fit rounded-full bg-[#0b4a6f] px-4 py-2 text-sm font-medium text-white">
                Descansa: {jornada.descansa}
              </span>
            </div>

            <div className="space-y-4">
              {jornada.partidos.map((partido, index) => {
                const contenido = (
                  <>
                    <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div className="text-lg font-medium text-slate-800">
                        {partido.local} <span className="text-slate-400">vs</span>{" "}
                        {partido.visitante}
                      </div>

                      <div className="text-sm font-semibold text-[#0b4a6f]">
                        {partido.dia && partido.hora
                          ? `${partido.dia} · ${partido.hora}`
                          : "Pendiente de programar"}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {partido.arbitra && (
                        <div className="inline-block rounded-lg bg-[#f7f3e9] px-3 py-2 text-sm text-slate-700">
                          <span className="font-semibold text-[#0b4a6f]">
                            Arbitra:
                          </span>{" "}
                          {partido.arbitra}
                        </div>
                      )}

                      {partido.campo && (
                        <div className="inline-block rounded-lg bg-slate-200 px-3 py-2 text-sm text-slate-700">
                          <span className="font-semibold">Campo:</span>{" "}
                          {partido.campo}
                        </div>
                      )}

                      <div
                        className={`inline-block rounded-lg px-3 py-2 text-sm font-semibold ${
                          partido.estado === "Finalizado"
                            ? "bg-green-100 text-green-700"
                            : partido.estado === "Aplazado"
                            ? "bg-red-100 text-red-700"
                            : partido.estado === "Programado"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {partido.estado}
                      </div>

                      {partido.estado === "Finalizado" && partido.resultado && (
                        <div className="inline-block rounded-lg bg-[#0b4a6f] px-3 py-2 text-sm font-semibold text-white">
                          Resultado: {partido.resultado}
                        </div>
                      )}

                      {partido.estado === "Aplazado" && partido.motivo && (
                        <div className="inline-block rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                          <span className="font-semibold">Motivo:</span>{" "}
                          {partido.motivo}
                        </div>
                      )}
                    </div>
                  </>
                );

                if (partido.estado === "Finalizado") {
                  return (
                    <Link
                      key={index}
                      href={`/partidos/${partido.id}`}
                      className="block rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 transition hover:border-[#0b4a6f] hover:shadow-sm"
                    >
                      {contenido}
                    </Link>
                  );
                }

                return (
                  <div
                    key={index}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4"
                  >
                    {contenido}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}