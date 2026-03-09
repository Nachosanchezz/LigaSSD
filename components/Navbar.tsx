import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-[#0b4a6f] text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">

        {/* Logo + nombre */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Liga SSD"
            width={36}
            height={36}
          />
          <span className="text-lg font-semibold">
            Liga SSD
          </span>
        </Link>

        {/* Links */}
        <div className="flex gap-6 text-sm font-medium">
          <Link href="/clasificacion" className="hover:text-yellow-300">
            Clasificación
          </Link>
          <Link href="/jornadas" className="hover:text-yellow-300">
            Jornadas
          </Link>
          <Link href="/resultados" className="hover:text-yellow-300">
            Resultados
          </Link>
          <Link href="/equipos" className="hover:text-yellow-300">
            Equipos
          </Link>
          <Link href="/jugadores" className="hover:text-yellow-300">
            Jugadores
          </Link>
        </div>

      </nav>
    </header>
  );
}