import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { PORTERIA, PRECIO_DE_SALIDA, PUNTOS, REGLAS } from "@/data/fantasy";

export const metadata = { title: "Reglas del Fantasy · Liga SSD" };

const PUNTUACION = [
  { que: "Gol", puntos: PUNTOS.gol, nota: "Cada uno que marque" },
  { que: "Asistencia", puntos: PUNTOS.asistencia, nota: "La que se apunte en el acta" },
  { que: "MVP del partido", puntos: PUNTOS.mvp, nota: "Uno por partido" },
  { que: "Gana su equipo", puntos: PUNTOS.victoria, nota: "Solo si jugó" },
  { que: "Empata su equipo", puntos: PUNTOS.empate, nota: "Solo si jugó" },
  {
    que: "Portero que encaja 3 o menos",
    puntos: PORTERIA.puntos,
    nota: `Solo porteros, y solo si jugó`,
  },
  { que: "Tarjeta amarilla", puntos: PUNTOS.tarjetaAmarilla, nota: "Cada una" },
  { que: "Tarjeta roja", puntos: PUNTOS.tarjetaRoja, nota: "Duele" },
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
            de <strong>{REGLAS.presupuesto} M€</strong>. En la primera jornada todos cuestan lo mismo; a partir
            de ahí, el precio de cada uno lo marca la gente que lo ficha.
          </p>
          <p>
            Uno de los cinco tiene que ser <strong>portero</strong>, y solo uno: los otros cuatro son de pista. En
            toda la liga hay cinco porteros, así que ahí la elección es corta, pero el portero que encaje poco
            suma tanto como un gol.
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

        <Bloque titulo="Los precios se mueven">
          <p>
            En la jornada 1 <strong>todos valen lo mismo, {PRECIO_DE_SALIDA} M€</strong>: el presupuesto
            repartido entre los cinco huecos. Nadie parte de caro ni de barato, y lo que costaron en la subasta
            da igual.
          </p>
          <p>
            A partir de ahí <strong>el precio lo pone la gente</strong>: lo que cuesta un jugador depende de qué
            parte del grupo lo alineó <strong>la jornada anterior</strong>. Si no lo ficha nadie se queda en
            unos <strong>20 M€</strong>; si lo ficha el grupo entero se pone en unos <strong>70</strong>.
          </p>
          <p>
            No se va acumulando: cada jornada se recalcula desde cero con la demanda de la anterior. Así nadie
            se dispara hasta salirse del presupuesto, y el que deja de gustar vuelve a bajar en vez de quedarse
            encallado arriba.
          </p>
          <p>
            Si a alguien lo ficha medio grupo porque está regalado, sube hasta que deje de estarlo. Si nadie
            quiere a otro porque parece caro, baja hasta que compense. Así los precios se colocan solos y nadie
            tiene que discutirlos.
          </p>
          <p>
            Los porteros se comparan <strong>solo entre porteros</strong>: como hay cinco y todos estáis
            obligados a llevar uno, en la media general subirían siempre.
          </p>
          <p>
            El precio entra en vigor <strong>en la jornada siguiente</strong>, nunca a mitad: los cinco de cada
            uno se destapan al cerrar el mercado, así que hasta entonces no hay demanda que valga. En el mercado
            verás con una flecha lo que se movió cada uno.
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
            Todo sale del acta del partido, tal y como se sube desde el admin: goles, asistencias, MVP,
            tarjetas y resultado. En cuanto se guarda un resultado, los puntos aparecen solos.
          </p>
          <p>
            Lo del portero tiene truco: en esta liga se marcan once goles por partido, así que la portería a
            cero no llegaría nunca. Por eso el premio es por encajar{" "}
            <strong>{PORTERIA.maxGolesEncajados} o menos</strong>, que ya es un partidazo.
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

        <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-center">
          <Link
            href="/fantasy"
            className="inline-block rounded-xl bg-[#0b4a6f] px-6 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-[#091f36]"
          >
            Volver al fantasy
          </Link>
          <a
            href="/fantasy-liga-ssd.pdf"
            className="inline-block rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-black uppercase tracking-wide text-[#0b4a6f] transition hover:border-[#0b4a6f]/30"
          >
            Reglas en PDF
          </a>
        </div>
      </div>
    </div>
  );
}
