const equipos = [
  { nombre: "Old School", logo: "/equipos/old-school.png" },
  { nombre: "Filósofos", logo: "/equipos/filosofos.png" },
  { nombre: "Equipo Juan", logo: "/equipos/cartagena.png" },
  { nombre: "Spiti2", logo: "/equipos/spiti2.png" },
  { nombre: "Açai Boys", logo: "/equipos/acai-boys.png" },
  { nombre: "Atalaya", logo: "/equipos/atalaya.png" },
  { nombre: "Torre Beldes", logo: "/equipos/torre-beldes.png" },
];

import Image from "next/image";

export default function EquiposPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-10 text-5xl font-bold text-[#0b4a6f]">Equipos</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {equipos.map((equipo) => (
          <div
            key={equipo.nombre}
            className="rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-sm backdrop-blur-sm transition hover:shadow-md"
          >
            <div className="mb-4 flex justify-center">
              <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[#f7f3e9]">
                <Image
                  src={equipo.logo}
                  alt={equipo.nombre}
                  width={96}
                  height={96}
                  className="object-contain"
                />
              </div>
            </div>

            <h2 className="text-center text-2xl font-semibold text-[#0b4a6f]">
              {equipo.nombre}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}