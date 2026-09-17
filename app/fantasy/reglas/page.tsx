import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { PUNTOS, REGLAS } from "@/data/fantasy";

export const metadata = { title: "Reglas del Fantasy · Liga SSD" };

const PUNTUACION = [
  { que: "Gol", puntos: PUNTOS.gol, nota: "Cada uno que marque" },
  { que: "Asistencia", puntos: PUNTOS.asistencia, nota: "La que se apunte en el acta" },
  { que: "MVP del partido", puntos: PUNTOS.mvp, nota: "Uno por partido" },
  { que: "Gana su equipo", puntos: PUNTOS.victoria, nota: "Solo si jugó" },
  { que: "Empata su equipo", puntos: PUNTOS.empate, nota: "Solo si jugó" },
  { que: "Gol en propia puerta", puntos: PUNTOS.golEnPropia, nota: "Le pasa a cualquiera" },
];

function Bloque({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-md sm:p-6">
      <h2 className="mb-3 text-sm font-black uppercase tracking-wide text-[#091f36]">{titulo}</h2>
      <div className="space-y-2 text-sm leading-relaxed text-slate-600">{children}</div>
    </section>
  );
}

export default function ReglasFantasyPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      <PageHeader kicker="Fantasy · Split 3" title="Reglas" subtitle="Lo que hay que saber, y poco más" />

      <div className="relative z-10 mx-auto -mt-10 max-w-2xl space-y-4 px-3 sm:-mt-12 sm:px-6">
        <Bloque titulo="Tu cinco">
          <p>
            Cada jornada alineas a <strong>{REGLAS.tamanoEquipo} jugadores</strong> de la liga con un presupuesto
            de <strong>{REGLAS.presupuesto} M€</strong>. Los precios son los que se pagaron en la subasta del 15 de
            septiembre; los presidentes y los de Titans, que no pasaron por ella, llevan un valor tasado.
          </p>
          <p>
            Como mucho puedes llevar a <strong>{REGLAS.maxPorEquipo} jugadores del mismo equipo</strong>, así que
            hay que repartirse por al menos tres equipos.
          </p>
          <p>
            Uno de los cinco es el <strong>capitán</strong> y puntúa{" "}
            <strong>doble</strong>, para bien y para mal.
          </p>
        </Bloque>

        <Bloque titulo="Cuándo se cierra">
          <p>
            El mercado de cada jornada se cierra <strong>al empezar el primer partido</strong> de esa jornada.
            Hasta ese momento puedes cambiar tu cinco las veces que quieras; después, ya no se toca.
          </p>
          <p>
            Puedes elegir un cinco distinto cada jornada: no hay fichajes, ni ventas, ni dinero que se arrastre.
            Lo que no vale es no alinear a nadie, porque esa jornada te llevas cero.
          </p>
        </Bloque>

        <Bloque titulo="Cómo se puntúa">
          <div className="overflow-hidden rounded-xl border border-slate-100">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-50">
                {PUNTUACION.map((fila) => (
                  <tr key={fila.que}>
                    <td className="px-3 py-2.5 font-bold text-slate-800">{fila.que}</td>
                    <td className="px-3 py-2.5 text-[11px] text-slate-400">{fila.nota}</td>
                    <td
                      className={`px-3 py-2.5 text-right font-black tabular-nums ${
                        fila.puntos < 0 ? "text-red-500" : "text-[#0b4a6f]"
                      }`}
                    >
                      {fila.puntos > 0 ? `+${fila.puntos}` : fila.puntos}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="pt-1">
            Todo sale del acta del partido, tal y como se sube desde el admin: goles, asistencias, MVP y
            resultado. En cuanto se guarda un resultado, los puntos aparecen solos.
          </p>
        </Bloque>

        <Bloque titulo="Quién jugó">
          <p>
            Los puntos por ganar o empatar solo los cobra <strong>quien jugó el partido</strong>: con el acta se
            apunta también quién estuvo, así que fichar a alguien que se queda en casa no da nada.
          </p>
          <p>
            Si en algún partido se olvida apuntar la asistencia, ahí solo puntúan los que salen en el acta (los
            que marcaron, asistieron o fueron MVP), que es la forma de no regalar puntos.
          </p>
        </Bloque>

        <Bloque titulo="Quién puede jugar">
          <p>
            Solo los <strong>48 jugadores de la liga</strong>. Entras eligiendo tu nombre y un PIN de cuatro
            números que te pones tú la primera vez. Puedes fichar a quien quieras, incluido a ti mismo y a los de
            tu propio equipo.
          </p>
        </Bloque>

        <div className="pt-2 text-center">
          <Link
            href="/fantasy"
            className="inline-block rounded-xl bg-[#0b4a6f] px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#091f36]"
          >
            Volver al fantasy
          </Link>
        </div>
      </div>
    </div>
  );
}
