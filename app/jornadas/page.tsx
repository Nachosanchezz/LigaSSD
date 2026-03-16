import Image from "next/image";
import Link from "next/link";
import { jornadas } from "../../data/partidos";
import { equipos } from "../../data/equipos";

export default function JornadasPage() {
  const logosEquipos = Object.fromEntries(
    equipos.map((equipo) => [equipo.nombre, equipo.logo])
  ) as Record<string, string>;

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

              <span className="flex w-fit items-center gap-2 rounded-full bg-[#0b4a6f] px-4 py-2 text-sm font-medium text-white">
                {logosEquipos[jornada.descansa] && (
                  <Image
                    src={logosEquipos[jornada.descansa]}
                    alt={jornada.descansa}
                    width={22}
                    height={22}
                    className="h-5 w-5 object-contain"
                  />
                )}
                <span>Descansa: {jornada.descansa}</span>
              </span>
            </div>

            <div className="space-y-4">
              {jornada.partidos.map((partido, index) => {
                const esFinalizado = partido.estado === "Finalizado";

                const contenido = esFinalizado ? (
                  <>
                    <div className="mb-4 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-3 md:w-1/3">
                        <Image
                          src={logosEquipos[partido.local]}
                          alt={partido.local}
                          width={36}
                          height={36}
                          className="h-9 w-9 object-contain"
                        />
                        <span className="text-2xl font-semibold text-slate-800">
                          {partido.local}
                        </span>
                      </div>

                      <div className="flex justify-center md:w-1/3">
                        <div className="rounded-2xl bg-[#0b4a6f] px-6 py-3 text-3xl font-bold text-white">
                          {partido.resultado}
                        </div>
                      </div>

                      <div className="flex items-center justify-start gap-3 md:w-1/3 md:justify-end">
                        <span className="text-2xl font-semibold text-slate-800">
                          {partido.visitante}
                        </span>
                        <Image
                          src={logosEquipos[partido.visitante]}
                          alt={partido.visitante}
                          width={36}
                          height={36}
                          className="h-9 w-9 object-contain"
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {partido.dia && partido.hora && (
                        <div className="inline-block rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
                          <span className="font-semibold">Fecha:</span>{" "}
                          {partido.dia} · {partido.hora}
                        </div>
                      )}

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

                      <div className="inline-block rounded-lg bg-green-100 px-3 py-2 text-sm font-semibold text-green-700">
                        {partido.estado}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div className="flex flex-wrap items-center gap-3 text-lg font-medium text-slate-800">
                        <div className="flex items-center gap-2">
                          <Image
                            src={logosEquipos[partido.local]}
                            alt={partido.local}
                            width={28}
                            height={28}
                            className="h-7 w-7 object-contain"
                          />
                          <span>{partido.local}</span>
                        </div>

                        <span className="text-slate-400">vs</span>

                        <div className="flex items-center gap-2">
                          <Image
                            src={logosEquipos[partido.visitante]}
                            alt={partido.visitante}
                            width={28}
                            height={28}
                            className="h-7 w-7 object-contain"
                          />
                          <span>{partido.visitante}</span>
                        </div>
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
                          partido.estado === "Aplazado"
                            ? "bg-red-100 text-red-700"
                            : partido.estado === "Programado"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {partido.estado}
                      </div>

                      {partido.estado === "Aplazado" && partido.motivo && (
                        <div className="inline-block rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                          <span className="font-semibold">Motivo:</span>{" "}
                          {partido.motivo}
                        </div>
                      )}
                    </div>
                  </>
                );

                if (esFinalizado) {
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