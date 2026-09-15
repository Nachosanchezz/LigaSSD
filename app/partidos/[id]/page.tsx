import { notFound } from "next/navigation";
import ActaPartido from "@/components/ActaPartido";
import { escudoSplit3, getSplit3, partidosFaseFinal } from "@/lib/split3";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Actas del Split 3: liguilla, play-in y playoff (los ids empiezan por "s3-")
export default async function PartidoDetallePage({ params }: Props) {
  const { id } = await params;
  const split = await getSplit3();

  const deLiguilla = split.jornadas.flatMap((jornada) =>
    jornada.partidos.map((partido) => ({ partido, etiqueta: `Jornada ${jornada.numero}`, fase: false }))
  );
  const deFaseFinal = partidosFaseFinal(split).map((partido) => ({ partido, etiqueta: partido.ronda, fase: true }));
  const encontrado = [...deLiguilla, ...deFaseFinal].find(({ partido }) => partido.id === id);

  if (!encontrado || encontrado.partido.estado !== "Finalizado") {
    notFound();
  }

  return (
    <ActaPartido
      partido={encontrado.partido}
      etiqueta={encontrado.etiqueta}
      escudo={escudoSplit3}
      volver={
        encontrado.fase
          ? { href: "/playoffs", texto: "Volver a playoffs" }
          : { href: "/jornadas", texto: "Volver a jornadas" }
      }
    />
  );
}
