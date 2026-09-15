import PageHeader from "@/components/PageHeader";
import TablaClasificacion from "@/components/TablaClasificacion";
import { equiposSplit3 } from "@/data/split3/equipos";
import { TRIANGULARES } from "@/data/split3/fases";
import { escudoSplit3, getSplit3 } from "@/lib/split3";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const triangularDelPuesto = (puesto: number) =>
  (TRIANGULARES.A as readonly number[]).includes(puesto) ? "A" : "B";

const rutaEquipo = (nombre: string) => {
  const equipo = equiposSplit3.find((candidato) => candidato.nombre === nombre);
  return equipo && `/equipos/${equipo.slug}`;
};

export default async function ClasificacionPage() {
  const { clasificacion, liguillaTerminada } = await getSplit3();

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      <PageHeader title="Clasificación" subtitle="Split 3 · Liguilla a ida y vuelta" />

      <section className="mx-auto max-w-6xl px-3 sm:px-6 -mt-10 sm:-mt-12 relative z-10 space-y-5">
        <TablaClasificacion
          filas={clasificacion}
          escudo={escudoSplit3}
          rutaEquipo={rutaEquipo}
          extra={{
            titulo: "Play-in",
            celda: (_, indice) => {
              const grupo = triangularDelPuesto(indice + 1);
              return (
                <span
                  className={`inline-flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full text-[10px] sm:text-xs font-black ${
                    grupo === "A" ? "bg-yellow-400 text-[#091f36]" : "bg-[#0b4a6f] text-white"
                  }`}
                  title={`Triangular ${grupo}`}
                >
                  {grupo}
                </span>
              );
            },
          }}
        />

        <div className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 text-xs sm:text-sm text-slate-600 shadow-sm space-y-1.5">
          <p>
            <strong className="text-slate-800">Todos pasan al play-in.</strong>{" "}
            {liguillaTerminada ? "Así quedan los triangulares:" : "Si la liguilla acabara hoy:"} 1º, 3º y 6º juegan el{" "}
            <strong className="text-slate-800">triangular A</strong>; 2º, 4º y 5º, el <strong className="text-slate-800">triangular B</strong>.
          </p>
          <p className="text-slate-500">
            Desempate: puntos, enfrentamiento directo (cuando ya se han jugado los dos partidos), diferencia de goles y goles a favor.
          </p>
        </div>
      </section>
    </div>
  );
}
