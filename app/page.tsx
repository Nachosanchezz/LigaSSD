import Link from "next/link";

export default function HomePage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
  <h1 className="mb-6 text-5xl font-bold text-[#0b4a6f]">¿Quiénes somos?</h1>

  <div className="space-y-5 text-lg text-slate-800">
    <p>
      La Liga SSD nace de algo muy sencillo: dos amigos con ganas de
      desconectar durante un rato de los estudios, el trabajo y el ritmo
      diario. Lo que empezó como una idea para echar un partido a la semana
      y pasar un buen rato terminó convirtiéndose en una pequeña competición
      organizada donde el fútbol sala es la excusa perfecta para reunirnos,
      competir y disfrutar.
    </p>

    <p>
      La liga se celebra en Torrelodones y reúne actualmente a 7 franquicias
      y más de 50 jugadores, todos con algo en común: la pasión por el fútbol
      sala y las ganas de pasar un buen rato dentro y fuera de la pista.
      Cada semana los equipos se enfrentan en partidos intensos, equilibrados
      y muy disputados, donde cualquiera puede ganar a cualquiera.
    </p>

    <p>
      Aunque el objetivo principal es disfrutar del deporte y compartir un
      buen momento, el espíritu competitivo también está muy presente.
      Cada partido cuenta, cada jornada importa y todos los equipos luchan
      por sumar puntos y mejorar en la clasificación. Porque sí, venimos a
      pasarlo bien… pero si se puede ganar, mejor todavía.
    </p>

    <p>
      Esta web nace con la intención de centralizar toda la información de la
      liga en un solo lugar. Aquí podrás consultar resultados, jornadas,
      clasificación, equipos y jugadores, seguir la evolución de la
      competición y estar al día de todo lo que ocurre en la Liga SSD.
    </p>

    <p>
      Más que una simple competición, esta liga es un espacio donde el fútbol
      sirve para desconectar, competir de forma sana y compartir tiempo con
      amigos. Un pequeño proyecto que empezó como una idea entre dos personas
      y que ahora reúne a decenas de jugadores cada semana con un mismo
      objetivo: disfrutar del fútbol sala.
    </p>
  </div>
</section>
  );
}