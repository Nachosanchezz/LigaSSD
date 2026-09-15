"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type EnlaceSplit = { nombre: string; ruta: string };

// Pestañas de un split archivado. La primera es su portada; el resto se marcan
// también en sus páginas de detalle (p. ej. /split2/equipos/atalaya).
export default function SplitSubnav({ titulo, enlaces }: { titulo: string; enlaces: EnlaceSplit[] }) {
  const pathname = usePathname();
  const portada = enlaces[0]?.ruta;

  const esActiva = (ruta: string) =>
    pathname === ruta || (ruta !== portada && pathname.startsWith(`${ruta}/`));

  return (
    <nav aria-label={`Secciones del ${titulo}`} className="bg-[#0b4a6f] text-white border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-3 sm:px-6">
        <span className="shrink-0 border-r border-white/20 pr-3 mr-1 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-yellow-400">
          {titulo}
        </span>
        {enlaces.map((enlace) => {
          const activa = esActiva(enlace.ruta);
          return (
            <Link
              key={enlace.ruta}
              href={enlace.ruta}
              aria-current={activa ? "page" : undefined}
              className={`relative shrink-0 px-3 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wide transition-colors ${
                activa ? "text-white" : "text-blue-200 hover:text-white"
              }`}
            >
              {enlace.nombre}
              <span
                className={`absolute inset-x-3 bottom-0 h-0.5 bg-yellow-400 transition-transform duration-300 ${
                  activa ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
