import Image from "next/image";
import { equipos } from "../../data/equipos";

const jugadores = equipos.flatMap((equipo) =>
  equipo.integrantes.map((jugador) => ({
    nombre: jugador,
    equipo: equipo.nombre,
    logo: equipo.logo,
    slug: equipo.slug,
  }))
);

export default function JugadoresPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-10 text-5xl font-bold text-[#0b4a6f]">Jugadores</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jugadores.map((jugador) => (
          <div
            key={`${jugador.equipo}-${jugador.nombre}`}
            className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur-sm"
          >
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center">
                <Image
                  src={jugador.logo}
                  alt={jugador.equipo}
                  width={50}
                  height={50}
                  className="max-h-full w-auto object-contain"
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#0b4a6f]">
                  {jugador.nombre}
                </h2>
                <p className="text-sm text-slate-600">{jugador.equipo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}