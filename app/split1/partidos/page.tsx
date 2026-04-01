import PageHeader from "@/components/PageHeader";
import TeamLogoSplit1 from "@/components/TeamLogoSplit1";
import { jornadasSplit1, equiposSplit1 } from "@/data/split1";

function getCorto(nombre: string) {
  return equiposSplit1.find((e) => e.nombre === nombre)?.corto ?? nombre;
}

export default function Split1PartidosPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      <PageHeader title="Partidos" subtitle="Split 1 · Sep 2024 – Feb 2025 · 56 partidos" />

      <div className="mx-auto max-w-5xl px-3 sm:px-6 -mt-10 sm:-mt-12 relative z-10 space-y-6">
        {jornadasSplit1.map((jornada) => (
          <div key={jornada.numero} className="rounded-2xl bg-white shadow-md border border-slate-100 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 bg-gradient-to-r from-[#091f36]/5 to-transparent">
              <h2 className="font-black text-[#091f36] uppercase tracking-wide text-sm sm:text-base">
                Jornada {jornada.numero}
              </h2>
            </div>
            <div className="divide-y divide-slate-50">
              {jornada.partidos.map((partido, i) => {
                const localGana = partido.golesLocal > partido.golesVisitante;
                const visitanteGana = partido.golesVisitante > partido.golesLocal;
                return (
                  <div key={i} className="px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
                    {/* Local */}
                    <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                      <span className={`font-bold text-xs sm:text-sm truncate ${localGana ? "text-slate-800" : "text-slate-400"}`}>
                        {getCorto(partido.local)}
                      </span>
                      <TeamLogoSplit1 nombre={partido.local} size="sm" />
                    </div>

                    {/* Marcador */}
                    <div className="flex items-center gap-1 shrink-0">
                      <span className={`inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg text-sm sm:text-base font-black shadow-sm ${
                        localGana ? "bg-gradient-to-br from-[#091f36] to-[#0b4a6f] text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                        {partido.golesLocal}
                      </span>
                      <span className="text-slate-300 font-bold text-xs px-0.5">–</span>
                      <span className={`inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg text-sm sm:text-base font-black shadow-sm ${
                        visitanteGana ? "bg-gradient-to-br from-[#091f36] to-[#0b4a6f] text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                        {partido.golesVisitante}
                      </span>
                    </div>

                    {/* Visitante */}
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <TeamLogoSplit1 nombre={partido.visitante} size="sm" />
                      <span className={`font-bold text-xs sm:text-sm truncate ${visitanteGana ? "text-slate-800" : "text-slate-400"}`}>
                        {getCorto(partido.visitante)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
