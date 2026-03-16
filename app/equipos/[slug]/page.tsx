import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { equipos } from "../../../data/equipos";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

function nombreCompletoJugador(jugador: {
  nombre: string;
  primerApellido?: string;
  segundoApellido?: string;
}) {
  return [jugador.nombre, jugador.primerApellido, jugador.segundoApellido]
    .filter((parte) => parte && parte.trim() !== "")
    .join(" ");
}

export default async function EquipoPage({ params }: Props) {
  const { slug } = await params;

  const equipo = equipos.find((equipo) => equipo.slug === slug);

  if (!equipo) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <Link
        href="/equipos"
        className="mb-8 inline-block text-sm font-medium text-[#0b4a6f] hover:underline"
      >
        ← Volver a equipos
      </Link>

      <div className="rounded-2xl border border-slate-200 bg-white/90 p-8 shadow-sm backdrop-blur-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-6 flex h-36 items-center justify-center">
            <Image
              src={equipo.logo}
              alt={equipo.nombre}
              width={140}
              height={140}
              className="max-h-full w-auto object-contain"
            />
          </div>

          <h1 className="text-4xl font-bold text-[#0b4a6f]">{equipo.nombre}</h1>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold text-[#0b4a6f]">
            Integrantes
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {equipo.integrantes.map((jugador) => (
              <div
                key={nombreCompletoJugador(jugador)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <p className="font-semibold text-slate-800">
                  {nombreCompletoJugador(jugador)}
                </p>

                {jugador.apodo && (
                  <p className="mt-1 text-sm text-slate-600">
                    Apodo: {jugador.apodo}
                  </p>
                )}

                <div className="mt-2 space-y-1 text-sm text-slate-600">
                  {jugador.edad && <p>Edad: {jugador.edad}</p>}
                  {jugador.posicion && <p>Posición: {jugador.posicion}</p>}
                  {jugador.piernaBuena && <p>Pierna buena: {jugador.piernaBuena}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}