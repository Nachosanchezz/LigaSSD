import Image from "next/image";
import Link from "next/link";

const equipos = [
  { nombre: "Old School", logo: "/equipos/old-school.png", slug: "old-school" },
  { nombre: "Filósofos", logo: "/equipos/filosofos.png", slug: "filosofos" },
  { nombre: "BODØ DREAM", logo: "/equipos/bodo-dream.png", slug: "bodo-dream" },
  { nombre: "Spiti2", logo: "/equipos/spiti2.png", slug: "spiti2" },
  { nombre: "Açai Boys", logo: "/equipos/acai-boys.png", slug: "acai-boys" },
  { nombre: "Atalaya", logo: "/equipos/atalaya.png", slug: "atalaya" },
  { nombre: "Torre Beldes", logo: "/equipos/torre-beldes.png", slug: "torre-beldes" },
];

export default function EquiposPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-10 text-5xl font-bold text-[#0b4a6f]">Equipos</h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {equipos.map((equipo) => (
          <Link
            key={equipo.slug}
            href={`/equipos/${equipo.slug}`}
            className="rounded-2xl border border-slate-200 bg-white/85 p-6 text-center shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-6 flex h-28 items-center justify-center">
              <Image
                src={equipo.logo}
                alt={equipo.nombre}
                width={90}
                height={90}
                className="max-h-full w-auto object-contain"
              />
            </div>

            <h2 className="text-center text-2xl font-semibold text-[#0b4a6f]">
              {equipo.nombre}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  );
}