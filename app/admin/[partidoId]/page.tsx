import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isAuthenticated } from "../actions";
import { getJornadasConResultados } from "@/lib/queries";
import ResultadoForm from "./ResultadoForm";

export const metadata = { robots: "noindex" };

type Props = {
  params: Promise<{ partidoId: string }>;
};

export default async function AdminPartidoPage({ params }: Props) {
  const { partidoId } = await params;

  if (!(await isAuthenticated())) {
    redirect("/admin");
  }

  const jornadas = await getJornadasConResultados();
  const partido = jornadas
    .flatMap((j) => j.partidos)
    .find((p) => p.id === partidoId);

  if (!partido) notFound();

  const resultadoActual =
    partido.estado === "Finalizado"
      ? {
          resultado: partido.resultado!,
          mvp: partido.mvp,
          resumen: partido.resumen,
        }
      : undefined;

  return (
    <div className="min-h-screen bg-slate-100 pb-16">
      {/* Header */}
      <div className="bg-[#091f36] px-4 py-5 shadow-lg">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-blue-300 hover:text-yellow-400 text-xs font-bold uppercase tracking-wide transition mb-3"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Volver
        </Link>
        <h1 className="text-lg font-black text-white uppercase tracking-tight leading-tight">
          {partido.local} vs {partido.visitante}
        </h1>
        {partido.dia && (
          <p className="text-blue-300 text-xs mt-0.5">
            {partido.dia}
            {partido.hora ? ` · ${partido.hora}` : ""}
          </p>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-6">
        <ResultadoForm
          partidoId={partidoId}
          local={partido.local}
          visitante={partido.visitante}
          resultadoActual={resultadoActual}
        />
      </div>
    </div>
  );
}
