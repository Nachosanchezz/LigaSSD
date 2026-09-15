import PageHeader from "@/components/PageHeader";
import TablaClasificacion from "@/components/TablaClasificacion";
import { equiposSplit3 } from "@/data/split3/equipos";
import { TRIANGULARES } from "@/data/split3/fases";
import { curiosidades } from "@/lib/rachas";
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
  const split = await getSplit3();
  const { clasificacion, liguillaTerminada } = split;
  const curiosas = curiosidades(
    equiposSplit3.map((equipo) => equipo.nombre),
    split.jornadas.flatMap((jornada) => jornada.partidos)
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10 sm:pb-20">
      <PageHeader kicker="Split 3" title="Clasificación" subtitle="Liguilla a ida y vuelta" />

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

        {curiosas.length > 0 && (
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-black uppercase tracking-tight text-[#0b4a6f] sm:text-xl">
              <span className="inline-block h-5 w-1 rounded-full bg-yellow-400"></span>
              Rachas y curiosidades
            </h2>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {curiosas.map((curiosidad) => (
                <div key={curiosidad.etiqueta} className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm sm:p-4">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-slate-400">{curiosidad.etiqueta}</dt>
                  <dd className="mt-1 font-display text-2xl font-black italic text-[#091f36]">{curiosidad.valor}</dd>
                  {curiosidad.detalle && <dd className="text-[11px] leading-tight text-slate-500">{curiosidad.detalle}</dd>}
                </div>
              ))}
            </dl>
          </section>
        )}

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
