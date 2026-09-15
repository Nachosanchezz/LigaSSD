import { notFound } from "next/navigation";
import ActaPartido from "@/components/ActaPartido";
import { jornadas as jornadasStaticas } from "@/data/split2/partidos";
import { logosEquipos } from "@/data/split2/equipos";
import { getJornadasConResultados } from "@/lib/queries";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export function generateStaticParams() {
  return jornadasStaticas
    .flatMap((jornada) => jornada.partidos)
    .map((partido) => ({ id: partido.id }));
}

export default async function PartidoDetallePage({ params }: Props) {
  const { id } = await params;

  const jornadas = await getJornadasConResultados();
  const partido = jornadas
    .flatMap((jornada) => jornada.partidos)
    .find((p) => p.id === id);

  if (!partido || partido.estado !== "Finalizado") {
    notFound();
  }

  return (
    <ActaPartido
      partido={partido}
      volver={{ href: "/split2/jornadas", texto: "Volver a jornadas" }}
      escudo={(equipo) => ({ logo: logosEquipos[equipo] })}
    />
  );
}
