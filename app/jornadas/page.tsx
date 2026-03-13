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
              {jornada.partidos.map((partido, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4"
                >
                  <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div className="text-lg font-medium text-slate-800">
                      {partido.local} <span className="text-slate-400">vs</span>{" "}
                      {partido.visitante}
                    </div>

                    <div className="text-sm font-semibold text-[#0b4a6f]">
                      {partido.dia} · {partido.hora}
                    </div>
                  </div>

                  <div className="inline-block rounded-lg bg-[#f7f3e9] px-3 py-2 text-sm text-slate-700">
                    <span className="font-semibold text-[#0b4a6f]">Arbitra:</span>{" "}
                    {partido.arbitra}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}