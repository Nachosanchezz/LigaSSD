export type Noticia = {
  id: string;
  equipoSlug?: string;
  titular: string;
  subtitular?: string;
  cuerpo: string;
  imagen?: string;
  fecha: string;
  etiqueta?: string;
};

export const noticias: Noticia[] = [
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
