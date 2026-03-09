import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const equipos = [
  {
    nombre: "OLD SCHOOL",
    slug: "old-school",
    logo: "/equipos/old-school.png",
    integrantes: ["Cifu", "Tito", "Unai", "Gon Ayllón", "Rafa Llopis", "Dani Pueyo", "Jaime de Sala"],
  },
  {
    nombre: "FILÓSOFOS",
    slug: "filosofos",
    logo: "/equipos/filosofos.png",
    integrantes: ["Melendi", "Rodri Urru", "Petit", "Salva", "Nalda", "Nacho Sánchez", "Lilo"],
  },
  {
    nombre: "BODØ DREAM",
    slug: "bodo-dream",
    logo: "/equipos/bodo-dream.png",
    integrantes: ["Nacho Ramírez", "Kike Vivar", "Nico Sánchez", "Marco Hurtado", "Pablo Hurtado", "Pedro Bañeres (P)", "Juan Sánchez"],
  },
  {
    nombre: "SPITI2",
    slug: "spiti2",
    logo: "/equipos/spiti2.png",
    integrantes: ["Borja", "Caco", "Campa", "Juan Sánchez-Harguindey", "Jordi Sánchez", "Javi Herrera", "Jordi Sánchez (P)", "Guille"],
  },
  {
    nombre: "AÇAI BOYS",
    slug: "acai-boys",
    logo: "/equipos/acai-boys.png",
    integrantes: ["Nico Pueyo", "Charly", "Rober", "Pato", "Mario", "Miguel Fiter", "Arturo", "Carlos (P)"],
  },
  {
    nombre: "ATALAYA",
    slug: "atalaya",
    logo: "/equipos/atalaya.png",
    integrantes: ["Rome", "Nico Marín", "Urru", "Fer Diez", "Jimmy (P)", "Barca", "Nachito"],
  },
  {
    nombre: "TORRE BELDES",
    slug: "torre-beldes",
    logo: "/equipos/torre-beldes.png",
    integrantes: ["Miguel Morán", "Coco", "Lucho", "Sotto", "Gabi", "Pow", "Louis"],
  },
];

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

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
                key={jugador}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800"
              >
                {jugador}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}