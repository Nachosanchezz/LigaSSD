import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-black p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold mb-4">Liga SSD</h1>
        <p className="text-lg mb-8">
          Bienvenidos a la web oficial de la liga.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/clasificacion"
            className="rounded-2xl border p-4 hover:shadow-md transition"
          >
            Clasificación
          </Link>

          <Link
            href="/jornadas"
            className="rounded-2xl border p-4 hover:shadow-md transition"
          >
            Jornadas
          </Link>

          <Link
            href="/resultados"
            className="rounded-2xl border p-4 hover:shadow-md transition"
          >
            Resultados
          </Link>

          <Link
            href="/equipos"
            className="rounded-2xl border p-4 hover:shadow-md transition"
          >
            Equipos
          </Link>

          <Link
            href="/jugadores"
            className="rounded-2xl border p-4 hover:shadow-md transition"
          >
            Jugadores
          </Link>
        </div>
      </div>
    </main>
  );
}