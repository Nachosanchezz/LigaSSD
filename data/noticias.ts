export type Noticia = {
  id: string;
  equipoSlug?: string;
  titular: string;
  subtitular?: string;
  cuerpo: string;
  imagen?: string;
  /** Qué parte de la foto se conserva al recortarla en la tarjeta (por defecto, el centro) */
  encuadre?: "arriba" | "centro" | "abajo";
  fecha: string;
  etiqueta?: string;
};

export const noticias: Noticia[] = [
  {
    id: "los-tercios-dos-maximos-goleadores",
    equipoSlug: "los-tercios",
    titular: "Los Tercios juntan a los dos máximos goleadores de la historia y la liga mira hacia otro lado",
    subtitular: "Borja se ficha a Nico, suma a Rodri Urru y convierte el escudo imperial en una declaración de intenciones: si no puedes ser Filósofos, cómprate media historia",
    cuerpo: `Hay presidentes que construyen equipos.

Hay presidentes que buscan equilibrio.

Y luego está Borja.

Borja ha decidido que, para el tercer split, lo mejor era no complicarse con conceptos abstractos como "proyecto", "identidad" o "scouting". Ha ido directamente a por los goles. Y no a por unos pocos: a por casi todos.

Porque Los Tercios ha juntado en el mismo vestuario a Nico, máximo goleador histórico de la liga con 43 goles, y a Borjita, segundo con 41.

Uno y dos. Primer y segundo puesto del palmarés. En el mismo equipo.

Una cosa discretísima. Una plantilla perfectamente normal. Nada que ver aquí.

Y por si parecía insuficiente, Borja también se ha llevado a Rodri Urru por 53 millones: otro nombre importante y, para darle más salsa al asunto, uno de los jugadores históricos de Filósofos.

Ahí empieza la sospecha emocional. Porque esto ya no parece una construcción de plantilla. Parece una venganza estética contra Filósofos.

Filósofos ganó, tuvo nombres, construyó relato y dio jugadores a la historia de la liga. Y Borja, aparentemente, lo ha mirado desde lejos durante dos splits pensando: "pues yo también quiero."

Así que ha hecho lo más sencillo. Se los ha llevado. Sobre todo a Rodri.

La operación tiene ese punto maravilloso del equipo nuevo rico que no quiere inventar nada, solo importar prestigio. Si el fútbol de Filósofos funcionaba, se compra. Si sus jugadores eran buenos, se fichan. Si tenían aura, se absorbe.

Colonización deportiva. Muy acorde, por cierto, con el nombre y el escudo.

Porque estamos hablando de Los Tercios. Escudo imperial. Águila. Estética de "venimos a conquistar". Y una plantilla ofensiva que ya no parece un equipo de fútbol sala, sino un decreto de expansión territorial.

El mensaje es bastante claro: esto no es un ataque, es una anexión.

Nico trae 43 goles históricos. Borjita, 41. Entre los dos suman 84 goles en la liga. Ochenta y cuatro. Hay equipos enteros que necesitarían varias temporadas, una prórroga y ayuda administrativa para acercarse a esa cifra.

Los Tercios los ha puesto juntos y ha dicho: "a ver qué pasa".

Qué puede salir mal. Bueno, muchas cosas. Juntar dos goleadores no garantiza que todo funcione: hay egos, roles, balón, jerarquías, química y esa pequeña costumbre del fútbol de castigar a cualquiera que llegue demasiado convencido de que ya ha ganado antes de empezar.

Pero también hay otra realidad. Como conecten, la liga va a tener un problema. Porque si Nico y Borjita se entienden, y Rodri Urru añade lo suyo, el ataque de Los Tercios puede convertirse en una de esas cosas que después se explican con palabras tipo "abusivo", "innecesario" o "esto quién lo permitió".

Y ahí está la ironía. Torre Beldes recibe 30 millones extra. Bodø Dream paga 79 por Mario. Filósofos apuesta 74 por un desconocido. Y Los Tercios, mientras todos miran esas historias, ha hecho algo mucho más sencillo: juntar al número 1 y al número 2 del ranking histórico de goleadores.

Sin demasiado ruido. Con águila. Con escudo imperial. Y con cara de "todo legal".

Borja, además, sale reforzado en su doble papel. Presidente, sí, pero también jugador histórico y segundo máximo goleador de la liga. Porque eso también tiene gracia: no ha fichado a una estrella para acompañar a su equipo, se ha fichado a sí mismo un socio. O mejor dicho, ha fichado al único jugador que, históricamente, ha marcado más goles que él.

Eso no es planificación. Eso es resolver una crisis de ego con presupuesto.

"¿Quién tiene más goles que yo?" Nico. "Pues fichado."

Simple. Elegante. Imperial.

Y luego está Rodri Urru, el fichaje que termina de darle a la operación ese aroma de expolio filosófico: no solo construyes una delantera con dos goleadores históricos, además te llevas una pieza asociada a uno de los proyectos más exitosos de la liga.

Hay quien lo llamaría mercado. Otros, apropiación cultural. Los Tercios lo llamará seguramente planificación deportiva.

Y quizá tenga razón, porque si algo ha dejado claro esta subasta es que el tercer split no va de humildad. Eso murió hace tiempo. Ahora va de presupuestos, apuestas, ego y equipos intentando construir el relato antes de que ruede el balón.

En ese terreno, Los Tercios ha entrado con botas militares.

No sabemos si serán campeones. No sabemos si Nico y Borjita se repartirán los goles o se los discutirán. No sabemos si Rodri será la pieza que conecte todo o si el escudo imperial acabará siendo más grande que el rendimiento.

Pero una cosa sí está clara. Borja ha visto la historia de Filósofos, la ha estudiado, la ha envidiado un poquito y ha tomado una decisión muy humana: si no puedes superar el imperio, róbale las tropas.

Los Tercios ya tiene ataque.

Ahora solo falta saber si esto es un equipo. O una invasión.`,
    imagen: "/noticias/noticiatercios.png",
    encuadre: "arriba",
    fecha: "16 sep 2026",
    etiqueta: "EXCLUSIVA",
  },
  {
    id: "los-jinetos-la-jineta-cazo-de-noche",
    equipoSlug: "los-jinetos",
    titular: "La jineta cazó de noche: Los Jinetos se llevaron el músculo de Bodø y el cerebro de Old School",
    subtitular: "Carlos desvalija media liga, se queda sin un millón y monta alrededor del mejor jugador del campeonato una plantilla que ya empieza a dar bastante miedo",
    cuerpo: `Hay equipos que fichan.

Hay equipos que negocian.

Y luego están Los Jinetos, que directamente entraron de noche.

La jineta, el animal del escudo, es sigilosa, nocturna y caza sin hacer demasiado ruido. Carlos debió de leerse la Wikipedia antes de la subasta, porque cuando el resto de presidentes quiso darse cuenta, media liga estaba mirando su plantilla y preguntándose dónde estaban sus jugadores.

Bodø Dream perdió dos piezas importantes: Nacho Ram y Hurta.

Old School vio marcharse a Rafa, el MVP que apareció en el momento más importante del segundo split.

Atalaya perdió a Jimmy, el gato de las minas y probablemente el único hombre que evitaba que aquella urbanización fuera declarada en ruinas. Y también a Fer, una de sus referencias de gol.

Açai Boys perdió a Fiter.

Y todos fueron a parar al mismo sitio.

Esto ya no es scouting. Esto es entrar en seis vestuarios con una bolsa negra y salir antes de que salte la alarma.

Carlos fue mirando las mejores piezas disponibles y actuó con una filosofía bastante sencilla: "Eso me gusta. Me lo llevo."

Bodø Dream tenía músculo. Fuera. Old School tenía MVP. Fuera. Atalaya tenía portero y gol. Fuera. Açai todavía tenía algo aprovechable. También fuera.

Cuando terminó la subasta, a Los Jinetos no le quedaba ni un millón. Cero. Pero tampoco parecía necesitarlo, porque si gastar hasta el último euro fuera delito, el tercer split empezaría con media liga declarando en comisaría: Torre Beldes ya había descubierto que ahorrar es de cobardes, Filósofos apostó 74 millones a una caja misteriosa llamada Samu y Juan pagó 79 por su hijo deportivo.

Lo preocupante, en todo caso, no es la plantilla. Es quién la dirige.

Porque Carlos no es precisamente un presidente que necesite que sus compañeros le salven la temporada. Estamos hablando, según el consenso general de la prensa más objetiva y nada exagerada de esta liga, del mejor jugador del campeonato con bastante diferencia.

Normalmente, cuando construyes una plantilla alrededor de una estrella, intentas darle apoyo. Carlos ha interpretado "apoyo" como llevarse medio once ideal de los demás. Un enfoque valiente. Quizá innecesario. Pero valiente.

Los Jinetos no llega al tercer split diciendo "vamos a competir". Llega diciendo "aparta".

Y claro, ya han empezado los periódicos. Que si van a arrasar. Que si esto está hecho. Que si habría que darles algunos puntos antes de empezar para ahorrar tiempo. Que si la jineta no va a cazar, va a extinguir especies.

El problema de llegar con semejante cartel es que ahora cualquier cosa que no sea ganar va a ser divertidísima para el resto. Si ganan, todo el mundo dirá que era lo normal. Si pierden, se abrirá una investigación internacional. Y si empatan contra el último de la tabla, probablemente haya que cerrar las redes sociales durante veinticuatro horas.

Esa es la maldición de las grandes plantillas: cuanto más impresionas en septiembre, más material das para diciembre.

Pero sobre el papel, el equipo asusta. Rafa llega después de demostrar en playoffs que podía ser mucho más que una pieza suelta de Old School. Jimmy abandona definitivamente la tarea humanitaria de sostener Atalaya para ponerse bajo palos en un proyecto donde, por una vez, quizá no tenga que parar veinte tiros por partido. Fer añade gol. Nacho Ram y Hurta llegan desde Bodø Dream, otro proyecto que ya sabía bastante de acumular talento. Y Fiter deja el açai.

Todos orbitando alrededor de Carlos.

La operación tiene una belleza especial, porque en lugar de construir una identidad propia, Los Jinetos ha formado su plantilla mediante saqueo selectivo de los mejores recuerdos ajenos. Un poco de Bodø. Un poco de Old School. Un poco de Atalaya. Un poco de Açai. Lo mezclas todo, le añades al mejor jugador de la liga y a correr.

Literalmente.

Ahora su mayor enemigo puede ser precisamente la expectativa, porque el mercado los ha convertido en favoritos antes de que ruede el balón. Si la temporada sale bien, será lo esperado. Si sale mal, la hemeroteca va a ser un parque de atracciones.

De momento, Los Jinetos empieza el tercer split con seis vestuarios revisando sus bolsillos y Carlos mirando su nueva plantilla como quien acaba de volver de una noche especialmente productiva.

No dejó dinero. No dejó piezas buenas fuera. Y tampoco dejó demasiada tranquilidad.

El resto de la liga todavía está intentando entender qué pasó. Pero la explicación es bastante sencilla.

Era de noche. Nadie vigilaba. Y la jineta tenía hambre.`,
    imagen: "/noticias/noticiacarlos.png",
    fecha: "16 sep 2026",
    etiqueta: "RUMOR",
  },
  {
    id: "torre-beldes-campeones-final",
    equipoSlug: "torre-beldes",
    titular: "Torre Beldes toca el cielo: 5-4 a Old School y el pueblo ya tiene su split",
    subtitular: "El equipo de Louis gana una final apretadísima, sin Miguel, callando bocas y convirtiendo el “este año sí” en algo peligrosamente real",
    cuerpo: `Hay frases que en el fútbol se dicen mucho y casi nunca significan nada.

"Este año sí."

Normalmente es mentira. Normalmente es humo. Normalmente es un audio motivacional de pretemporada que acaba en semifinales, en excusas o en alguien diciendo que "el proyecto necesita tiempo".

Pero esta vez no.

Esta vez Torre Beldes ganó el segundo split.

Y lo hizo como solo podía hacerlo Torre Beldes: sufriendo, mandando en el marcador, mirando de reojo al desastre, dejando que Old School se acercara una y otra vez y terminando con un 5-4 que seguramente envejeció a media plantilla cinco años en una sola noche.

La final fue igualada, tensa y con ese punto de caos que necesita cualquier partido importante de esta liga para ser recordado. Torre Beldes fue siempre por delante. Old School, fiel a su nueva versión de puzzle perfectamente montado, fue siempre a remolque, apretando, molestando y recordando que no había llegado a la final por casualidad.

Pero cada vez que el partido parecía abrir una puerta al drama, Torre Beldes encontraba la forma de cerrarla.

A veces con fútbol.

A veces con carácter.

A veces con esa energía de equipo del pueblo que no sabes si es orgullo competitivo o pura cabezonería municipal.

Y tiene mucho mérito, porque Torre Beldes jugó la final sin Miguel, su MVP del primer split. No estaba. Lesionado. Fuera. Baja sensible. De esas que antes del partido sirven para preparar la excusa perfecta por si todo sale mal.

Pero no hizo falta.

Torre Beldes no ganó porque le sobrara talento. No ganó porque tuviera el camino fácil. No ganó porque la final se pusiera cómoda. Ganó porque hizo lo que llevaba toda la temporada prometiendo entre risas, piques y frases demasiado grandes para un grupo de WhatsApp:

competir de verdad.

Y claro, ahora toca revisar el archivo.

Porque durante mucho tiempo, Torre Beldes fue ese equipo del que todo el mundo hablaba con una mezcla de respeto y cachondeo. Que si mucho nombre. Que si mucho fichaje. Que si mucho MVP. Que si mucho pueblo. Que si Louis se viene arriba. Que si Lucho, Sotto y compañía viven en una película. Que si cuando llega la hora buena siempre aparece alguien para bajarles los humos.

Pues ya no.

Primero rompieron la maldición contra Filósofos con un 8-2 que todavía debe estar doliendo en alguna biblioteca. Y después, cuando tocaba rematar la historia, ganaron la final.

No hay más.

Filósofos fuera. Bodo Dream fuera. Old School derrotado. Torre Beldes campeón.

La administración podrá revisar actas, inventar formatos, equilibrar plantillas, crear calendarios, medir coeficientes, consultar Excels y hacer como que todo estaba bajo control. Pero al final el segundo split se lo llevó el equipo que más ruido había hecho y que, por una vez, tuvo el detalle de respaldarlo con resultados.

Eso es lo peligroso de Torre Beldes ahora.

Antes hablaban mucho.

Ahora hablan mucho y encima tienen razón.

Old School, eso sí, merece respeto. El equipo que empezó siendo un Mister Potato con piezas de distintas cajas terminó la temporada jugando como un conjunto serio, competitivo y muy bien encajado. Llegaron a la final cargándose a Bodo Dream, jugaron bien, pelearon hasta el final y obligaron a Torre Beldes a ganar el título de verdad, no de paseo.

Pero una final no entiende de cuentos bonitos.

Old School tuvo épica.

Torre Beldes tuvo el marcador.

Y en una noche de 5-4, eso es todo lo que importa.

Para Torre Beldes, esta victoria tiene sabor especial. Porque no es solo ganar una final. Es ganar después de haber acumulado memes, dudas, piques, derrotas antiguas, traumas contra Filósofos y semanas enteras de gente esperando que Torre Beldes volviera a hacer una de Torre Beldes.

Pero esta vez no hubo caída.

Esta vez no hubo chiste final contra ellos.

Esta vez el chiste lo contaron ellos.

Y probablemente lo van a contar muchas veces.

Demasiadas.

Porque si algo está claro es que Torre Beldes campeón no va a ser un equipo discreto. No van a levantar el título y volver tranquilamente a casa. No. Van a recordarlo. Van a reenviar fotos. Van a rescatar mensajes antiguos. Van a hablar del 8-2, del 5-4, de la final, de la semifinal, de Miguel lesionado, de Louis presidente campeón y de cómo nadie confiaba en ellos hasta que ya era demasiado tarde.

El pueblo ha ganado.

Y cuando el pueblo gana, no celebra.

Hace ruido.

El segundo split termina con Torre Beldes en lo más alto. Un equipo que empezó entre dudas, siguió entre piques, sobrevivió a sus propios dramas internos, rompió su maldición histórica y acabó levantando el título en una final apretada contra un Old School que vendió carísima la derrota.

No fue perfecto.

No fue cómodo.

No fue tranquilo.

Pero fue suyo.

Torre Beldes ya no necesita decir "este año sí".

Ahora puede decir algo bastante más insoportable:

"Os lo dijimos."`,
    imagen: "/noticias/torrebeldes-campeones.png",
    fecha: "9 jun 2026",
    etiqueta: "CAMPEÓN",
  },
  {
    id: "old-school-bodo-dream-playoff",
    equipoSlug: "old-school",
    titular: "Old School deja de ser Mr. Potato: 10-8 a Bodo Dream y el puzzle ya está en la final",
    subtitular: "El equipo hecho a piezas encaja en el mejor momento, tumba al campeón de la liga regular y convierte a Rafa en MVP sorpresa",
    cuerpo: `Durante meses, Old School fue ese equipo al que mirabas y pensabas: "no sé muy bien qué es esto, pero algo intenta ser". Un grupo montado por piezas, con nombre en inglés de flipados y ese aire de Mister Potato futbolístico en el que cada parte parecía venir de una caja distinta.

Pues bien.

Parece que alguien encontró el manual.

Porque Old School está en la final. Y no llegó sobreviviendo ni rascando una heroicidad de barro. Llegó cargándose a Bodo Dream, campeón de la liga regular, en una semifinal desatada que terminó 10-8. Un marcador que no parece de fútbol sala, sino del descanso de un All-Star sin defensa.

Lo más sorprendente no fue solo ganar. Fue cómo.

El equipo que durante la temporada parecía un puzzle torcido, con piezas de distinto tamaño y química de mercadillo, apareció de repente como un bloque. Juntos, combinativos, ordenados y, por momentos, sorprendentemente bien cosidos. El Mister Potato, contra todo pronóstico, tenía cara reconocible.

Y enfrente estaba Bodo Dream, que no era precisamente un rival menor. El equipo de Juan, uno de los administradores, había ganado la liga regular con su mezcla habitual de plantilla premium, regularidad y sospecha simpática de que, cuando montas la liga, siempre ayuda saber demasiado.

Pero llegó Old School.

Y le metió diez.

Durante semanas se decía que Old School no tenía una estrella clara. Que iba más en bloque. Que competía, sí, pero que le faltaba ese jugador que apareciera en los días grandes.

Pues apareció Rafa.

Rafa se llevó el MVP y firmó la gran sorpresa de la semifinal. No llegó como galáctico, ni como salvador anunciado, ni como nombre inflado por el marketing del vestuario. Apareció cuando más hacía falta y le dio sentido a todo el proyecto.

Mientras Bodo Dream venía con la chapa del campeón regular, con Pedro bajo palos en modo porterazo y con Juan mirando la competición desde la zona noble, Old School respondió como responden los equipos que por fin se creen lo que son: jugando juntos, corriendo juntos y atacando como si alguien hubiera apretado el botón correcto.

El meme del Mister Potato se giró.

Antes eran piezas raras, fichajes low cost, química dudosa y manual perdido. Ahora resulta que las piezas no solo encajaron: encajaron en semifinales y contra el favorito.

Eso es lo cruel de los playoffs. La liga regular te da prestigio, mérito y derecho a ir un poco de serio por la vida. Pero luego llega una semifinal a partido único, te meten un 10-8 y descubres que haber sido el más regular no siempre te salva del caos bien organizado.

Bodo Dream fue el mejor de la fase regular.

Pero ese día, el mejor fue Old School.

Y eso cambia el relato.

El supuesto equipo improvisado eliminó al campeón. El puzzle sin instrucciones dejó fuera al proyecto más estable. El nombre en inglés que sonaba a flipada se convirtió, al menos por una noche, en una declaración de intenciones.

Old School está en la final. Rafa sale como MVP sorpresa. Bodo Dream se queda con el consuelo de haber sido muy bueno durante la liga regular… hasta que el Mister Potato decidió montarse solo.

Y cuando el caos se organiza, pasan estas cosas.

Que el equipo hecho a piezas te gana una semifinal.

Que el favorito se queda fuera.

Y que el puzzle termina encajando justo cuando más duele.`,
    imagen: "/noticias/oldschool-rafa.png",
    fecha: "28 may 2026",
    etiqueta: "BREAKING",
  },
  {
    id: "torre-beldes-filosofos-playoff",
    equipoSlug: "torre-beldes",
    titular: "Torre Beldes rompe la maldición: 8-2 a Filósofos y primera carcajada histórica del pueblo",
    subtitular: "El equipo de Louis pasa a la final, firma su primera victoria contra su bestia negra y deja a Filósofos buscando explicaciones donde solo había un marcador",
    cuerpo: `Hay días que cambian una temporada. Hay días que cambian una rivalidad. Y luego está el día en el que Torre Beldes le mete un 8-2 a Filósofos en semifinales de playoffs y media liga tiene que comprobar dos veces el resultado para asegurarse de que no era un error de la web.

Porque sí.

Pasó.

Torre Beldes ganó a Filósofos.

Y no ganó de casualidad, ni por la mínima, ni con un gol rebotado en el último minuto. Ganó 8-2. Ocho. Dos. Un resultado que no se lee: se digiere. La primera victoria en la historia de Torre Beldes contra su bestia negra llegó de la forma más cruel posible para Filósofos: con baño de realidad, pase a la final y el equipo del pueblo por fin con permiso oficial para hablar más de la cuenta.

Durante toda la temporada, la rivalidad había ido acumulando capas. Pique entre presidentes, mensajes cruzados, ego, memoria histórica y esa sensación de que Filósofos siempre aparecía justo cuando Torre Beldes empezaba a creerse algo. Era el examen de Álgebra del pueblo. El muro. La asignatura pendiente. El equipo que le tenía tomada la matrícula.

Pero esta vez el guion cambió.

Y cambió mucho.

Torre Beldes llegó a la semifinal con un plan. Algo extraño, porque en Torre Beldes muchas veces el plan suele ser correr, protestar, venirse arriba y luego preguntarse qué ha pasado. Pero esta vez hubo cambios tácticos, cabeza y una idea bastante clara: jugar a lo que tenían que jugar.

Y les salió.

Louis, Lucho, Sotto, Miguel, Pow y compañía entendieron el partido desde el principio. No fueron a demostrar que eran más listos. No fueron a ganar el debate. No fueron a convencer a nadie con teorías. Fueron a hacer daño donde tocaba, a competir como tocaba y a dejar a Filósofos sin esa comodidad tan suya de equipo que normalmente parece tener siempre una explicación preparada.

Filósofos, por su parte, no encontró la manera.

El equipo presidido por Nacho, acostumbrado a mirar este duelo desde arriba, se encontró con algo nuevo: Torre Beldes no estaba nervioso, no estaba acomplejado y no estaba esperando el golpe habitual. Esta vez el pueblo no fue a sobrevivir a Filósofos.

Fue a pasarles la mano por la cara.

Y eso se notó.

El partido fue una de esas noches en las que todo lo que durante meses había sido trauma se convirtió en gasolina. Cada gol de Torre Beldes no era solo un gol. Era un mensaje. Era un "ahora qué". Era una captura antigua volviendo a circular. Era Louis sonriendo como quien llevaba demasiado tiempo esperando este momento.

Porque si alguien tenía ganas de esta victoria, era él.

Louis, presidente de Torre Beldes, llevaba toda la rivalidad cargando con el peso de las derrotas, las bromas, los precedentes y esa superioridad filosófica que tanto gusta en el otro lado. Y por fin pudo mirar a Nacho, no como administrador, no como rival histórico, no como filósofo jefe, sino como alguien que acababa de comerse un 8-2 en semifinales.

Hay pocas teorías que arreglen eso.

Filósofos podrá hablar de contexto, de partido raro, de mala noche, de sensaciones o de lo que quiera. Pero un 8-2 no deja demasiado margen para la literatura. Es un marcador que entra en la sala, se sienta en la mesa y pide silencio.

También hubo polémica, claro. Porque en esta liga no puede pasar algo importante sin que alguien señale al árbitro, al reglamento o al primo del que estaba mirando desde la banda. La jugada más discutida llegó con una posible roja a Pow, el portero de Torre Beldes, que pudo haber cambiado el partido y que dejó a Filósofos con la sensación de que quizá la historia también les debía alguna excusa.

Pero incluso con polémica, el relato no se cae.

Porque puedes discutir una jugada. Puedes debatir una roja. Puedes decir que el partido tuvo momentos raros. Lo que no puedes hacer es mirar un 8-2 y fingir que todo fue por el árbitro. Eso no es una decisión arbitral. Eso es una mudanza emocional.

Filósofos no perdió por una acción. Perdió porque Torre Beldes jugó mejor, compitió mejor y, por primera vez en mucho tiempo, pareció entender exactamente qué partido estaba jugando.

Y ahí está la verdadera noticia.

No es solo que Torre Beldes esté en la final. No es solo que haya eliminado a Filósofos. Es que lo hizo justo contra el equipo que más necesitaba ganar. Contra el rival que más dolía. Contra el escudo que siempre aparecía en sus pesadillas deportivas.

La maldición se rompió.

Y se rompió con ocho goles.

Ahora Torre Beldes llega a la final con el pecho inflado, el grupo de WhatsApp ardiendo y una frase que probablemente se repetirá durante semanas:

"Os metimos ocho."

Filósofos, mientras tanto, tendrá que hacer lo que mejor sabe: pensar. Pensar qué pasó, pensar cómo se les escapó, pensar cómo un equipo al que tantas veces habían frenado terminó mandándolos a casa con semejante golpe.

Eso sí, esta vez no hay charla TED que valga.

Porque el fútbol, de vez en cuando, deja de ser filosofía y se convierte en una cosa mucho más simple:

marcar ocho goles.

Torre Beldes ya está en la final.

Filósofos ya está fuera.

Y Louis, Lucho, Sotto, Miguel, Pouw y compañía ya tienen lo que llevaban esperando toda la vida deportiva de esta liga:

una victoria contra Filósofos.

La primera.

La más grande.

La que no se explica.

La que se enseña.

Porque durante mucho tiempo Filósofos tuvo la historia.

Pero esta vez Torre Beldes tuvo el marcador.

Y con un 8-2, la historia se reescribe sola.`,
    imagen: "/noticias/torrebeldes-filosofos-playoff.png",
    fecha: "28 may 2026",
    etiqueta: "BREAKING",
  },
  {
    id: "torre-beldes-filosofos-1",
    equipoSlug: "torre-beldes",
    titular: "Torre Beldes adelanta a Filósofos: el pueblo no tendrá títulos, pero sí memoria",
    subtitular: "Filósofos empata con Bodo Dream, pierde la batalla del ego y deja vivo el milagro municipal",
    cuerpo: `Hay partidos que deciden ligas. Hay partidos que definen temporadas. Y luego hay partidos que acaban en empate, no los gana nadie, pero dejan a Torre Beldes descorchando ironía como si acabara de levantar la Champions en la plaza del pueblo.

Ayer se jugó el gran partido de la liga regular: Filósofos contra Bodo Dream. El duelo gordo. Por un lado, Filósofos, con Nacho al frente del ego académico-deportivo. Por otro, Bodo Dream, el equipo de Juan, invicto, serio y con ese ligero aroma a plantilla premium cocinada en despacho.

El contexto era sencillo: quien ganase, se ponía primero.

Pero no ganó nadie.

Empate.

Y ese empate abrió una puerta que parecía cerrada: Torre Beldes todavía puede ganar la liga regular. Con una condición bastante absurda: Bodo Dream tiene que perder contra Açai Boys, el último clasificado. Es decir, el equipo invicto de Juan tiene que caer contra el equipo que no ha ganado todavía. Hace falta fe, sí. Hace falta una alineación de planetas. Hace falta que Açai Boys pase de bowl de frutas a milagro deportivo en menos de una jornada.

Pero matemáticamente se puede. Y cuando algo se puede, Torre Beldes lo convierte en discurso.

Porque lo verdaderamente importante no es solo que el pueblo siga vivo. Lo realmente delicioso es que Torre Beldes ha terminado por delante de Filósofos. Y eso, en esta liga, no es un dato: es una declaración de guerra.

Filósofos podrá hablar de enfrentamientos directos, de historia, de merecimientos y de superioridad táctica. Podrá convocar una charla TED con espinilleras y explicar que "el fútbol no se entiende solo desde la clasificación". Pero la realidad es bastante más simple:

Torre Beldes ha quedado por delante.

Duele. Porque Filósofos lleva toda la temporada con ese aire de equipo que no solo juega, sino que viene a explicarte el sentido de la competición. No ganan partidos: elaboran argumentos. No empatan: gestionan escenarios complejos. Y cuando ganan, no celebran: redactan una conclusión.

Pero ahora llega Torre Beldes, con su orgullo municipal y su humildad de mentira, y les dice: "Muy bonito todo, pero mirad la tabla."

Al final, en una liga, el ego no puntúa. La filosofía tampoco. Lo que puntúa es cerrar la fase regular por delante del rival que lleva semanas mirándote por encima del hombro.

Pase lo que pase, Filósofos ya no puede quedar por delante de Torre Beldes. Y eso, para el pueblo, vale casi como un título. De hecho, en Torre Beldes probablemente ya estén preparando la pancarta:

"Por encima de Filósofos. Temporada 2."

Ahora todo depende de Açai Boys. El último clasificado. El equipo gafado. El bowl de frutas con botas. La última esperanza del pueblo.

¿Probable que tumben a Bodo Dream? No demasiado. ¿Posible? Sí. ¿Suficiente para que Torre Beldes se pase la semana dando la turra? Absolutamente.

Filósofos podrá decir que el empate fue digno, que el partido era difícil y que la liga está igualada. Y todo será verdad.

Pero la frase que va a sonar más fuerte será otra:

"Habéis quedado por debajo de Torre Beldes."

Y no hay tratado filosófico que arregle eso.`,
    imagen: "/noticias/torre-beldes-filosofos.png",
    fecha: "8 may 2026",
    etiqueta: "BREAKING",
  },
  {
    id: "torre-beldes-pelea-1",
    equipoSlug: "torre-beldes",
    titular: "Torre Beldes explota por dentro: Sotto y Lucho llegan a las manos por una teoría nuclear que nadie pidió",
    subtitular: "La directiva estudia sanciones mientras el presidente Louis intenta poner orden con más buena intención que contundencia",
    cuerpo: `El vestuario de Torre Beldes vive un auténtico polvorín. Ayer estalló una pelea entre Pablo Sotto y Álvaro Aguilar, conocido como Lucho, que acabó con ambos llegando a las manos, medio equipo separando como pudo y el presidente Louis intentando imponer autoridad con la misma contundencia con la que defiende: poca, pero con buena intención.

La directiva ya estudiaría una sanción para ambos. No se contempla castigo deportivo, porque Torre Beldes está demasiado cerca de soñar con la liga regular como para ponerse digno justo ahora. Pero en el club aseguran que habrá consecuencias.

Cuáles, todavía no se sabe. Y eso, en Torre Beldes, casi da más miedo.

El origen fue tan absurdo que parece inventado por alguien con fiebre. Todo empezó con una conversación sobre qué carrera era más difícil, hasta que Sotto, futuro físico nuclear e incapaz de escuchar la palabra "energía" sin ponerse académico, soltó que "el fútbol sala, en realidad, es una simulación termodinámica de partículas en un sistema cerrado".

Nadie pidió esa frase. Nadie la entendió. Nadie salió mejor de ella.

Pero Sotto siguió. Intentó explicar el vestuario como un reactor nuclear: Mori era el moderador; Pow, el portero polaco de dos metros, era la barra de control; Álvaro MK era la energía potencial; Coco, lesionado y fiestero, era una partícula inestable; y Louis era "la pérdida energética del sistema".

Louis no supo si aquello era una explicación científica o una falta de respeto, así que decidió ofenderse a medias.

El que no esperó fue Lucho.

Tras varios minutos escuchando a Sotto convertir el vestuario en una central nuclear, soltó la frase que lo cambió todo:

"Tú serás físico nuclear, pero no sabes ni cargar el móvil sin pedir cable."

Y ahí se acabó la ciencia.

Sotto pidió respeto para la física. Lucho pidió respeto para la vida real. La discusión subió de temperatura y en segundos, Torre Beldes pasó de charla de vestuario a recreación municipal del Big Bang.

Llegaron los empujones, los agarrones y ese momento clásico en el que nadie sabe si separar o grabar.

Mori intentó mediar, pero su diplomacia duró menos que una promesa de humildad de Torre Beldes. Coco apareció cojeando: mucho "parad ya" y poca velocidad punta. Pow se plantó en la puerta — con dos metros de portero polaco, la salida se convirtió en frontera internacional. Y cuando apareció Álvaro MK, el volumen bajó notablemente. No por madurez colectiva, sino porque cuando aparece el fuertecito, el cuerpo recuerda que quiere llegar vivo al lunes.

Entonces llegó Louis. Levantó la mano, pidió silencio y trató de poner orden. No hubo discurso épico ni amenaza definitiva. Solo esa mezcla de autoridad improvisada y preocupación real de quien sabe que su equipo está peleando por la liga, pero puede autodestruirse por una conversación sobre física nuclear.

El incidente llega en el peor momento posible. Torre Beldes está arriba, ha quedado por delante de Filósofos y todavía sueña con ganar la liga regular si Bodo Dream pierde contra Açai Boys. Y ha decidido gestionar ese momento histórico convirtiendo el vestuario en una mezcla entre clase magistral, after mal cerrado y junta de vecinos con testosterona.

Sotto insiste en que todo fue una reacción en cadena. Lucho asegura que la única cadena fue la de tonterías que tuvo que escuchar antes de explotar.

Torre Beldes quería ser campeón. De momento, tendrá que conformarse con ser noticia.

No por un gol. No por una táctica.

Sino porque Sotto y Lucho llegaron a las manos después de una discusión que empezó con física nuclear, siguió con cargadores de móvil y acabó con la directiva preparando una sanción que todavía nadie conoce.

Y eso, en Torre Beldes, es probablemente lo más peligroso de todo.`,
    imagen: "/noticias/pelea-torre-beldes.png",
    fecha: "8 may 2026",
    etiqueta: "EXCLUSIVA",
  },
  {
    id: "torre-beldes-1",
    equipoSlug: "torre-beldes",
    titular: "Torre Beldes: mucho MVP, mucho ruido… y al final filosofía aplicada",
    subtitular: "El equipo del pueblo llega con chaqueta nueva, cuatro victorias y la lección de siempre",
    cuerpo: `Torre Beldes llegaba a este split con ese aura de equipo que se ha comprado una chaqueta nueva y ya cree que es empresario. El conjunto del pueblo, el equipo de la gente, el club que huele a bar de confianza y "este año sí", decidió dar un golpe encima de la mesa fichando nada más y nada menos que al MVP del split pasado.

Y claro, cuando tú fichas al MVP, pasan cosas. Las expectativas suben, los mensajes del grupo cambian, los presidentes se vienen arriba. Cuatro victorias, una derrota, y en el pueblo ya se hablaba de título, de proyecto, de "este año hay plantilla". Alguno incluso pronunció la palabra "dinastía". Y ahí fue cuando el fútbol, que es muy suyo, decidió intervenir.

Porque había una última parada antes del descanso. Y esa parada tenía nombre propio: Filósofos.

Filósofos es para Torre Beldes lo que el examen de Álgebra es para el estudiante confiado: puedes venir con subrayadores de colores, puedes decir que este año vas preparado… pero luego te sientas, lees la primera pregunta y entiendes que la vida es sufrimiento. Da igual el año, da igual el split, da igual que Torre Beldes fiche al MVP (robándoselo a Filósofos): cuando enfrente está Filósofos, el guion suele venir escrito.

Y esta vez no fue diferente.

Perder contra Filósofos ya no es solo perder un partido: es desbloquear recuerdos, memes, audios antiguos y al presidente rival escribiendo con una sonrisa que se nota hasta sin verlo. Cuatro victorias y dos derrotas no es ningún drama. Pero el problema no es la derrota. El problema es contra quién.

Torre Beldes puede ser candidato real al título. Tiene nivel, tiene resultados, tiene al MVP del split pasado. Pero queda una pregunta flotando en el aire: ¿es un equipazo o simplemente un equipo muy bueno hasta que aparece Filósofos?

De momento, el balance dice que están arriba. La historia dice que Filósofos les tiene tomada la matrícula. Y el meme dice que puedes fichar una estrella y ganar cuatro partidos, pero si tu bestia negra te espera en la esquina, igual lo que necesitas no es un MVP.

Igual necesitas un psicólogo.

O peor.

Un filósofo.`,
    imagen: "/noticias/torre-beldes-1.png",
    fecha: "24 abr 2026",
    etiqueta: "ANÁLISIS",
  },
  {
    id: "bodo-dream-1",
    equipoSlug: "bodo-dream",
    titular: "Bodo Dream: Juan se monta el FIFA Ultimate Team y encima pretende que parezca casualidad",
    subtitular: "El administrador de la liga descubre que organizar la competición tiene sus ventajas",
    cuerpo: `Hay equipos que nacen desde la humildad. Con el amigo que puede los domingos, el que llega tarde pero corre, el que dice "yo de portero si hace falta" y luego se queja a los tres minutos.

Y luego está Bodo Dream.

El equipo de Juan, uno de los administradores de la liga. Porque no era suficiente con organizar la competición, controlar el calendario y tener acceso mental al sistema. Juan decidió que ya que estaba montando una liga, también podía montarse el equipo. El resultado: tres victorias y un empate. Invictos. En modo paseo premium.

La sensación no es de "estamos compitiendo bien". Es de que Juan abrió el Excel, miró a los demás equipos, sonrió ligeramente y dijo: "me voy a hacer uno gracioso." Gracioso para él, claro. Para el resto, una inspección.

El nombre ya avisa: Bodo Dream. Dream. Sueño. Juan directamente puso "Dream", como diciendo: "sí, he venido a dormir tranquilo mientras vosotros sufrís."

Y dentro del equipo hay dos figuras que merecen mención aparte. Primero, Nacho RAM: ese jugador que cuando entra al campo no sabes si va a disputar un balón dividido o a pedir licencia de obra. Un físico que no corre: desplaza el terreno de juego. En Bodo Dream no defienden en zona, aparcan al mastodonte en medio y ya está.

Y luego está Pedro, el portero. Cada tiro rival parece pasar por un trámite administrativo:

—Solicitud de gol recibida.
—Revisión en curso.
—Denegada por el departamento de milagros.

Así que ahí están: el administrador con complejo de Florentino, el mastodonte que ocupa dos carriles y el portero en modo santo. La gran pregunta que circula por la liga es sencilla: ¿Bodo Dream es un equipazo o Juan se aprovechó de saber demasiado?

La respuesta oficial: todo legal, el invicto se gana en el campo.

La respuesta popular: Juan vio la liga desde dentro y dijo "me pido ganar."

Ganarle a Bodo Dream no sería solo una victoria. Sería un acto de justicia social.`,
    imagen: "/noticias/bodo-dream-1.png",
    fecha: "24 abr 2026",
    etiqueta: "EXCLUSIVA",
  },
  {
    id: "acai-boys-1",
    equipoSlug: "acai-boys",
    titular: "Açai Boys: mucho bowl, mucho bíceps… y muy pocos puntos",
    subtitular: "El equipo más healthy de la liga sigue sin encontrar la vitamina de la victoria",
    cuerpo: `Hay nombres que intimidan. Y luego está Açai Boys.

Un nombre que no sabes si corresponde a un equipo de fútbol o a una franquicia de bowls con granola y semillas de chía. Tú lees "Açai Boys" y no piensas en presión alta ni en entradas duras. Piensas en gente diciendo "bro" sin venir a cuento y en una merienda que cuesta más que una cuota de socio.

La cosa tenía pinta seria, siendo honestos. A principio de split más de uno pensaba que podían estar arriba, dando guerra. Pues nada. Cuatro partidos, cero victorias, un empate y tres derrotas. El bowl viene con fruta, topping y una capa generosa de mala suerte.

Ya no parece una mala racha: parece una maldición. Como si hubieran abierto un paraguas en el vestuario, roto siete espejos y jugado un amistoso en un cementerio. Tienen base, tienen nivel para competir, pero luego miras la clasificación y parece que en vez de entrenar fútbol han hecho un retiro espiritual.

Eso sí, si en el campo no intimidan, en la foto de directiva compensan. El presidente de Açai Boys va muy fuerte. Estamos hablando de un señor con un pectoral que probablemente tenga código postal propio. Un torso que no preside un club: preside una federación de gimnasio. El músculo más competitivo de Açai Boys no está en el once, está en la parte superior del cuerpo de su presidente.

Y por si faltaba algo, está el portero. Ese jugador que ficharon para dar seguridad atrás. Una incorporación necesaria, una apuesta importante... que simple y llanamente no ha aparecido. Ni está, ni se le espera, ni contesta. El chat no responde, las llamadas no las coge. A este ritmo va a tener más protagonismo el cartel de "última conexión hace semanas" que sus guantes.

Açai Boys tiene mejor pinta de lo que dicen los números. En cualquier momento puede hacer clic y amargarle la tarde a cualquiera. Pero mientras llega ese despertar, la clasificación solo entiende de puntos.

Quizá les falte gol. Quizá les falte portero. Quizá les sobre açai.`,
    imagen: "/noticias/acai-boys-1.png",
    fecha: "24 abr 2026",
    etiqueta: "RUMOR",
  },
  {
    id: "atalaya-1",
    equipoSlug: "atalaya",
    titular: "Atalaya: mismos vecinos, mismo presidente y el fútbol en junta extraordinaria",
    subtitular: "Dos splits, cero victorias y un portero que sostiene el edificio él solo",
    cuerpo: `Hay equipos que cambian de split para reinventarse. Cambian jugadores, actitud, dinámica, hasta la foto de grupo para transmitir otra energía.

Y luego está Atalaya.

Atalaya del Archipreste. Nombre que suena a club histórico y señorial, pero que cuando lo escuchas solo puedes pensar en esa urbanización donde los problemas no se solucionan, simplemente se aplazan hasta la siguiente junta de vecinos. Porque eso es este equipo: una comunidad con goteras futbolísticas, derramas emocionales y un presidente que lleva dos splits prometiendo reformas mientras el edificio se cae por el lateral.

Mismo presidente, misma película, mismo olor a sótano.

Dos empates y tres derrotas. Cinco partidos sin ganar. El equipo está instalado en esa zona donde ya no se mira hacia arriba, sino al calendario buscando rivales contra los que rascar algo sin que parezca un milagro.

Y eso que tienen a Jimmy.

Jimmy, el portero. Le llaman el gato de las minas, y con razón. Mientras el resto del equipo parece moverse con la coordinación de una mudanza mal organizada, Jimmy se tira, vuela, rasca balones imposibles y sostiene el edificio como puede. No está jugando de portero: está haciendo de comunidad de propietarios, seguro del hogar y bombero municipal al mismo tiempo.

El problema de Atalaya no está bajo palos. Bajo palos tienen un milagro. El problema está en todo lo demás. Cualquier partido puede convertirse en una junta de vecinos a gritos:

—"¿Quién cubría al suyo?"
—"Yo pensaba que era tuyo."
—"Eso no estaba en el acta."

Y encima ficharon al presidente de Filósofos, campeón del split anterior. Sobre el papel: experiencia, mentalidad ganadora, liderazgo. En la práctica: misterio. Atalaya necesitaba un ascensor y de momento parece una derrama más, una barca a la deriva.

El resumen es sencillo: Jimmy sostiene, el resto discute la derrama.

Nueva temporada. Mismo presidente. Misma mierda. Y una comunidad entera esperando que, por una vez, el acta de la jornada incluya tres puntos.`,
    imagen: "/noticias/atalaya-1.png",
    fecha: "24 abr 2026",
    etiqueta: "ANÁLISIS",
  },
  {
    id: "spiti2-1",
    equipoSlug: "spiti2",
    titular: "Spiti2: plantilla compensada, pulmones dudosos y compromiso en revisión",
    subtitular: "Un 12-4, un presidente-portero en modo parte médico y victorias con asistencia externa",
    cuerpo: `Hay equipos que desde fuera parecen bien montados. Y luego está Spiti2, que también parecía todo eso, pero con un cigarro en el logo, lo cual ya debería haber activado alguna alarma competitiva.

Tú ves el cigarro y entiendes rápido la propuesta deportiva: fútbol, sí, pero sin obsesionarse con correr demasiado. Un equipo que no presiona alto; presiona cuando le apetece. Que no te plantea un bloque bajo, te plantea una sobremesa larga.

Sobre el papel, dos victorias y dos derrotas. Ni desastre ni proyecto imperial. Pero luego está el partido del 12-4.

Doce a cuatro. Un resultado que no es una derrota, es una notificación del juzgado. Spiti2 fue arrollado. Pasó por el campo como quien entra a una reunión tarde, sin haber leído nada. En una liga donde los memes vuelan, encajar doce no es un accidente: es material audiovisual.

La palabra peligrosa que rodea al equipo: compromiso. O más bien, su ausencia.

Y en el centro de todo está su presidente, que además es portero. En teoría: el líder, el que organiza, el que da ejemplo. En la práctica: un parte médico infinito. Siempre hay algo. Una molestia, una lesión, un "estoy tocado". A estas alturas, más que presidente-portero, parece presidente de la mutua. Spiti2 no sabe si cada jornada tiene guardameta o tiene comunicado clínico.

Las dos victorias tienen su explicación. Una llegó con un cedido top 3 de la liga. Ganar así es un poco como aprobar un examen porque se te sienta al lado el de matrícula y te deja mirar: la victoria cuenta, pero el orgullo competitivo se queda fumando fuera. La otra llegó gracias a Borja, la estrella del equipo, que ese día apareció. El problema es que solo ha aparecido ese día.

La plantilla tiene mimbres. Pero el fútbol no se gana en el papel, y mucho menos en el papel de fumar.

Porque en esta liga se puede perder. Lo que no se puede es encajar doce y luego pedir fuego.`,
    imagen: "/noticias/spiti2-1.png",
    fecha: "24 abr 2026",
    etiqueta: "OPINIÓN",
  },
  {
    id: "old-school-1",
    equipoSlug: "old-school",
    titular: "Old School: el jeque montó un Mister Potato y le llamó vieja escuela",
    subtitular: "Piezas de distintas cajas, química en construcción y un split que no refleja lo que prometen",
    cuerpo: `Hay nombres que imponen. Nombres que transmiten historia, carácter, un fútbol de los de antes.

Y luego está Old School. Vieja escuela, dicen. Pero en inglés, claro, porque "Vieja Escuela" no sonaba lo suficientemente serio para una liga de colegas. Había que meterle ese toque internacional, esa vibra de club con tradición, cuando en realidad el equipo parece haberse formado con un WhatsApp que decía: "¿quién puede jugar?".

Es un equipo hecho a piezas. No piezas iguales, no piezas del mismo puzzle. Piezas de distintas cajas, distintos tamaños y probablemente distintos muebles. El Mister Potato del fútbol: un ojo de aquí, una oreja de allá, una bota que no encaja y, de lejos, parece que tiene forma humana.

Y al mando, el presidente haciendo de jeque de bajo presupuesto. No en plan fichar estrellas, sino más bien un jeque de mercadillo: juntando jugadores normalitos con la esperanza de que todo encaje y parezca un proyecto. Porque Old School no tiene una estrella clara. No hay un jugador al que decirle "si se complica, balón a este". Van más en bloque, más a ratos, más de "entre todos hacemos algo".

Y ojo, algo hacen. No son un desastre. Juegan decente, compiten tramos, tienen momentos en los que se juntan bien. No es fútbol champagne, pero tampoco garrafón. El problema es que es como montar un mueble de Ikea sin instrucciones: al principio parece que tiene sentido, luego te sobran tres tornillos, después una pata queda torcida, y al final te convences de que "así también vale".

Dos victorias, tres derrotas. La clasificación no refleja sus momentos decentes, pero tampoco va a regalarles puntos por intentarlo.

Les queda un partido. Una última oportunidad para demostrar que el proyecto no era solo un Mister Potato con nombre en inglés.

Pero para eso, el Mister Potato tendrá que encajar todas las piezas.

Y el jeque tendrá que demostrar que esto era un proyecto deportivo. No una manualidad.`,
    imagen: "/noticias/old-school-1.png",
    fecha: "24 abr 2026",
    etiqueta: "ANÁLISIS",
  },
  {
    id: "filosofos-1",
    equipoSlug: "filosofos",
    titular: "Filósofos: qué casualidad, uno de los administradores peleando la liga",
    subtitular: "El campeón del primer split vuelve a estar arriba y nadie puede demostrar nada, pero todos sospechan",
    cuerpo: `Hay equipos que ganan y caen bien. Equipos humildes, discretos, que suman puntos y no molestan.

Y luego está Filósofos.

Filósofos no gana partidos. Filósofos genera debate, sospecha, teorías y audios de treinta segundos que empiezan con "yo no quiero decir nada, pero…". Son los campeones del primer split, el equipo que arrasó con la tranquilidad de quien sabía que algo no estaba del todo bien, pero tampoco iba a denunciarse a sí mismo.

Y en ese equipo estaba Nacho, uno de los administradores de la liga. Porque si hay algo más bonito que crear una competición, es crearla, jugarla y ganarla. Una historia preciosa de superación, esfuerzo y acceso privilegiado al Excel.

Llegó el segundo split, se cambiaron las normas, los administradores formarían ellos los equipos buscando más igualdad. Una decisión lógica y necesaria. Y hay que decirlo: la liga está igualada. El formato ha funcionado.

El problema es que, dentro de esa igualdad tan bonita, Filósofos vuelve a estar arriba. Tres victorias y una derrota. Otra vez. Con esa cara de "no sé por qué os sorprende". El equipo ha cambiado, la liga ha cambiado, el formato ha cambiado… pero Filósofos sigue en la zona noble. Qué cosas tiene el destino. O la administración.

Porque el otro gran candidato es Bodo Dream, el equipo de Juan, el otro administrador. Se cambian normas, se busca igualdad, se vende transparencia… y al final la liga puede acabar ganándola Nacho o Juan. Precioso.

Dentro del equipo merece mención aparte PT7, creador de la web anterior. La web mala. La web que más que una página de la liga parecía un monumento al ego con botones: entrabas a ver la clasificación y acababas leyendo su nombre más veces que los resultados. Pues ese mismo PT7 ahora lleva dos MVPs. Si antes ya era egocéntrico con una web regulera, imagínate con dos premios de mejor jugador.

Filósofos no celebra victorias: redacta conclusiones. No gana duelos: demuestra tesis. No tiene jugadores: tiene argumentos. Tú solo querías jugar al fútbol y acabas en una charla TED con espinilleras.

La pregunta que flota en la liga es incómoda: ¿hemos cambiado todo para que vuelva a ganar un administrador?

La respuesta todavía no está escrita.

Pero Filósofos ya tiene el bolígrafo en la mano.`,
    imagen: "/noticias/filosofos-1.png",
    fecha: "24 abr 2026",
    etiqueta: "EXCLUSIVA",
  },
];
