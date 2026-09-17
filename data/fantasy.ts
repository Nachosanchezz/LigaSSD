/**
 * Reglas del Fantasy del Split 3.
 *
 * Cada jornada eliges un cinco dentro de un presupuesto y uno de ellos es el
 * capitán. Todo lo que puntúa sale del acta del partido (goles, asistencias,
 * MVP y resultado), así que no hace falta inventar nada: se calcula solo en
 * cuanto se guarda el resultado desde /admin.
 */

export const REGLAS = {
  /** Jugadores que se alinean cada jornada */
  tamanoEquipo: 5,
  /** M€ disponibles, con los mismos precios de la subasta */
  presupuesto: 120,
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
} as const;

/**
 * Valor de los 13 que no pasaron por la subasta: los cinco presidentes y los
 * ocho de Titans, que llegaron ya formados. Es una tasación, no un precio
 * pagado, hecha con lo que rindieron en el Split 2 y con el listón que puso
 * la subasta (media de 29 M€, máximo de 79 M€).
 */
export const TASACIONES: Record<string, number> = {
  // Presidentes
  "carlos-hernando": 85, // el mejor de la liga, y sin Split 2 que lo matice
  "nacho-sanchez": 50, // Chete: 11 goles y 12 asistencias en el Split 2
  "borja-sanchez-harguindey": 48, // Borjita: 18 goles, 2 MVPs
  "louis-de-maria": 35, // Lui: 10 asistencias y 2 MVPs
  "juan-sanchez": 32, // Juninho: 4 goles, 7 asistencias
  "jaime-melendi": 30, // Melen: 5 goles, 4 asistencias

  // Titans, que no pasaron por la subasta
  "carlos-charly": 26, // 5 goles, 5 asistencias y un MVP
  "carlos-caco": 24, // 4 goles, 6 asistencias
  "salvador-heras": 22, // Vasal JR: 4 goles, 3 asistencias
  "nicolas-pueyo": 16,
  "pablo-sarabia": 16, // Pato
  "jaime-campanillas": 14, // Campa
  "roberto-rober": 8,
};
