import { notFound, redirect } from "next/navigation";
import { personaDelSplit2 } from "@/data/personas";

type Props = {
  params: Promise<{ id: string }>;
};

// Cada persona tiene una sola ficha, con sus números de todos los splits
export default async function JugadorSplit2Page({ params }: Props) {
  const { id } = await params;
  const persona = personaDelSplit2(id);
  if (!persona) notFound();
  redirect(`/jugadores/${persona.id}`);
}
