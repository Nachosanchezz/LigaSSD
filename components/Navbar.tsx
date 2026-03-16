import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-[#0b4a6f] text-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="Liga SSD"
            width={48}
            height={48}
            className="h-12 w-12 object-contain"
          />
          <span className="text-3xl font-bold tracking-tight">Liga SSD</span>
        </Link>

        <div className="flex items-center gap-8 text-lg font-semibold">
          <Link href="/clasificacion" className="transition hover:text-yellow-300">
            Clasificación
          </Link>
          <Link href="/jornadas" className="transition hover:text-yellow-300">
            Jornadas y Resultados
          </Link>
          <Link href="/estadisticas" className="transition hover:text-yellow-300">
            Estadísticas
          </Link>
          <Link href="/jugadores" className="transition hover:text-yellow-300">
            Jugadores
          </Link>
          <Link href="/equipos" className="transition hover:text-yellow-300">
            Equipos
          </Link>
        </div>
      </nav>
    </header>
  );
}