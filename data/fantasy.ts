/**
 * Reglas del Fantasy del Split 3.
 *
 * Cada jornada eliges un cinco —un portero y cuatro de pista— dentro de un
 * presupuesto, y uno de ellos es el capitán. Todo lo que puntúa sale del acta
 * del partido (goles, asistencias, MVP y resultado), así que no hace falta
 * inventar nada: se calcula solo en cuanto se guarda el resultado desde /admin.
 */

export const REGLAS = {
  /** Jugadores que se alinean cada jornada */
  tamanoEquipo: 5,
  /** M€ disponibles */
  presupuesto: 150,
  /** Porteros que hay que alinear: ni más ni menos */
  porteros: 1,
  /** Tope de jugadores del mismo equipo real, para que no se copien todos el mismo cinco */
  maxPorEquipo: 2,
  /** Los puntos del capitán se multiplican por esto */
  multiplicadorCapitan: 2,
  /** Jornadas de liguilla que entran en el juego */
  jornadas: 10,
} as const;

export const PUNTOS = {
  gol: 4,
  asistencia: 3,
  mvp: 5,
  victoria: 3,
  empate: 1,
  derrota: 0,
  golEnPropia: -2,
  tarjetaAmarilla: -1,
  tarjetaRoja: -3,
} as const;

/**
 * Premio al portero que aguanta. En el Split 2 se marcaron 11 goles por
 * partido, así que la portería a cero no llegaría nunca: el listón está en
 * encajar 3 o menos, que ahí sí es un partidazo.
 */
export const PORTERIA = {
  maxGolesEncajados: 3,
  puntos: 4,
} as const;

/**
 * La bolsa. Todos arrancan valiendo lo mismo —el presupuesto repartido entre
 * los cinco huecos— y a partir de ahí manda la demanda: al cerrar cada
 * jornada, el precio se mueve según qué parte del grupo alineó a ese jugador
 * comparado con lo que le tocaría de media.
 *
 * Se mide en porcentaje de participantes y no en número de fichajes para que
 * el mercado se mueva igual seamos diez o cuarenta.
 *
 * Los porteros se comparan solo entre porteros: como hay cinco y todo el mundo
 * está obligado a llevar uno, en la media general saldrían siempre disparados.
 */
export const VALORES = {
  /**
   * Distancia, en M€, entre el que no ficha nadie y el que ficha todo el
   * grupo. Con 50 el mercado va de unos 20 a unos 70, y así al más caro se le
   * pueden poner otros cuatro al lado sin pasarse de los 150.
   */
  recorrido: 50,
  minimo: 1,
  /** Tope, para que al más caro se le pueda seguir acompañando de otros cuatro */
  maximo: 120,
} as const;

/**
 * Lo que vale cada jugador antes de que nadie fiche a nadie.
 *
 * Va por debajo del presupuesto entre cinco (150/5 = 30) a propósito: con 25
 * sobran 25 M€ en la primera jornada, y ese colchón es lo que permite fichar
 * después a alguien que haya subido. Si todos valieran justo 30, cualquier
 * subida dejaría a ese jugador fuera del presupuesto de todo el mundo y el
 * precio rebotaría arriba y abajo sin llegar a asentarse.
 */
export const PRECIO_DE_SALIDA = 25;

/**
 * Valor de los 13 que no pasaron por la subasta: los cinco presidentes y los
 * ocho de Titans, que llegaron ya formados. Es una tasación, no un precio
 * pagado, hecha con lo que rindieron en el Split 2 y con el listón que puso
 * la subasta (media de 29 M€, máximo de 79 M€).
 */
export const TASACIONES: Record<string, number> = {
  // Presidentes, con lo que hicieron en el Split 2 como guía
  "carlos-hernando": 85, // el mejor de la liga, y sin Split 2 que lo matice
  "nacho-sanchez": 50, // Chete: 11 goles y 12 asistencias
  "borja-sanchez-harguindey": 48, // Borjita: 18 goles y 2 MVPs
  "louis-de-maria": 35, // Lui: 10 asistencias y 2 MVPs
  "juan-sanchez": 32, // Juninho: 4 goles y 7 asistencias

  // Titans llegó ya formado, así que aquí manda el orden de mejor a peor que
  // dio su presidente. Melen es el suyo y entra en su sitio, el segundo.
  "nicolas-pueyo": 32, // Pueyo
  "jaime-melendi": 28, // Melen
  "carlos-charly": 25, // Charly
  "carlos-caco": 22, // Caco
  "roberto-rober": 18, // Rober
  "salvador-heras": 15, // Vasal JR
  "jaime-campanillas": 11, // Campa
  "pablo-sarabia": 8, // Pato
};
