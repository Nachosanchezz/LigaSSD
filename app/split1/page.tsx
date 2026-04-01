import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import TeamLogoSplit1 from "@/components/TeamLogoSplit1";
import {
  clasificacionSplit1,
  goleadoresSplit1,
  statsSplit1,
} from "@/data/split1";

export default function Split1Page() {
  const top3 = clasificacionSplit1.slice(0, 3);
  const top3Scorers = goleadoresSplit1.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      <PageHeader title="Split 1" subtitle="Sep 2024 – Feb 2025 · Temporada Inaugural" />

      <div className="mx-auto max-w-6xl px-3 sm:px-6 -mt-10 sm:-mt-12 relative z-10 space-y-6">

        {/* Campeón */}
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#091f36] to-[#0b4a6f] shadow-xl p-6 sm:p-10 text-center text-white">
          <p className="text-yellow-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">Campeón del Split 1</p>
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4">
            <TeamLogoSplit1 nombre={statsSplit1.campeón} size="lg" />
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
              {statsSplit1.campeón}
            </h2>
          </div>
          <div className="flex justify-center gap-6 sm:gap-10 mt-4 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-yellow-400">35</p>
              <p className="text-[10px] sm:text-xs text-blue-200 uppercase tracking-wider mt-1">Puntos</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-yellow-400">109</p>
              <p className="text-[10px] sm:text-xs text-blue-200 uppercase tracking-wider mt-1">Goles a favor</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-yellow-400">+67</p>
              <p className="text-[10px] sm:text-xs text-blue-200 uppercase tracking-wider mt-1">Diferencia</p>
            </div>
          </div>
        </div>

        {/* Stats globales */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6">
          {[
            { label: "Partidos jugados", value: statsSplit1.totalPartidos },
            { label: "Goles totales", value: statsSplit1.totalGoles },
            { label: "Goles por partido", value: statsSplit1.mediaGolesPartido },
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
              <h3 className="font-black text-[#091f36] uppercase tracking-wide text-sm sm:text-base">Clasificación Final</h3>
              <Link href="/split1/clasificacion" className="text-xs text-[#0b4a6f] font-semibold hover:underline">
                Ver completa →
              </Link>
            </div>
            <div className="divide-y divide-slate-50">
              {top3.map((fila, i) => (
                <div key={fila.equipo} className="flex items-center gap-3 sm:gap-4 px-5 py-4">
                  <span className="text-xl w-6 shrink-0">{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}</span>
                  <TeamLogoSplit1 nombre={fila.equipo} size="sm" />
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
              <Link href="/split1/estadisticas" className="text-xs text-[#0b4a6f] font-semibold hover:underline">
                Ver todos →
              </Link>
            </div>
            <div className="divide-y divide-slate-50">
              {top3Scorers.map((jugador, i) => (
                <div key={jugador.nombre} className="flex items-center gap-3 sm:gap-4 px-5 py-4">
                  <span className="text-xl w-6 shrink-0">{i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}</span>
                  <TeamLogoSplit1 nombre={jugador.equipo} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 text-sm truncate">{jugador.nombre}</p>
                    <p className="text-[10px] text-slate-400 truncate">{jugador.equipo}</p>
                  </div>
                  <span className="inline-flex h-8 w-10 items-center justify-center rounded-lg bg-yellow-400 text-sm font-black text-[#091f36] shadow-sm">
                    {jugador.goles}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Links a subpáginas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { href: "/split1/clasificacion", label: "Clasificación", desc: "Tabla completa final" },
            { href: "/split1/partidos", label: "Partidos", desc: "Todos los resultados" },
            { href: "/split1/estadisticas", label: "Estadísticas", desc: "Goleadores y asistentes" },
          ].map(({ href, label, desc }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-2xl bg-white border border-slate-100 shadow-md p-5 sm:p-6 text-center hover:border-[#0b4a6f]/30 hover:shadow-lg transition-all"
            >
              <p className="font-black text-[#091f36] uppercase tracking-wide text-sm sm:text-base group-hover:text-[#0b4a6f] transition-colors">{label}</p>
              <p className="text-xs text-slate-400 mt-1">{desc}</p>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
