import Image from "next/image";
import Link from "next/link";
import { equipos } from "@/data/equipos";

export default function EquiposPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      {/* Header Banner */}
      <div className="bg-[#091f36] pt-12 sm:pt-16 pb-20 sm:pb-24 px-4 sm:px-6 text-center border-b border-indigo-900/30">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 drop-shadow-sm">
          Franquicias
        </h1>
        <p className="mt-2 sm:mt-4 text-blue-200 font-medium max-w-2xl mx-auto uppercase tracking-wide text-[10px] sm:text-sm">
          Los Equipos Que Conforman La Liga
        </p>
      </div>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 -mt-10 sm:-mt-12 relative z-10">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3 xl:gap-10">
          {equipos.map((equipo) => (
            <Link
              key={equipo.slug}
              href={`/equipos/${equipo.slug}`}
              className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl sm:rounded-3xl bg-white p-6 sm:p-8 text-center shadow-xl shadow-[#091f36]/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#091f36]/10 border border-slate-100"
            >
              {/* Decorative top border */}
              <div className="absolute top-0 left-0 w-full h-1 sm:h-1.5 bg-gradient-to-r from-slate-200 via-yellow-400 to-slate-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              
              <div className="relative mb-4 sm:mb-6 flex h-28 w-28 sm:h-36 sm:w-36 items-center justify-center rounded-full bg-slate-50 border border-slate-100 shadow-inner group-hover:bg-slate-100 transition-colors p-3 sm:p-4">
                <Image
                  src={equipo.logo}
                  alt={equipo.nombre}
                  width={110}
                  height={110}
                  className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <h2 className="text-center text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-800 transition-colors group-hover:text-[#0b4a6f]">
                {equipo.nombre}
              </h2>
              
              <div className="mt-3 sm:mt-4 flex items-center justify-center gap-2">
                <span className="inline-flex items-center justify-center rounded-full bg-slate-100 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wide text-slate-500 transition-colors group-hover:bg-[#0b4a6f] group-hover:text-white">
                  Ver Perfil
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}