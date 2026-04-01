import Image from "next/image";
import { equiposSplit1 } from "@/data/split1";

type Size = "sm" | "md" | "lg";

export default function TeamLogoSplit1({ nombre, size = "md" }: { nombre: string; size?: Size }) {
  const equipo = equiposSplit1.find((e) => e.nombre === nombre);
  const sizeClasses = size === "lg" ? "h-16 w-16" : size === "sm" ? "h-7 w-7 sm:h-9 sm:w-9" : "h-10 w-10 sm:h-12 sm:w-12";

  if (!equipo) return null;

  return (
    <div className={`${sizeClasses} rounded-full overflow-hidden bg-white ring-2 ring-slate-100 shadow-sm shrink-0 flex items-center justify-center p-0.5`}>
      <Image
        src={`/equipos/${equipo.slug}.png`}
        alt={equipo.corto}
        width={64}
        height={64}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
