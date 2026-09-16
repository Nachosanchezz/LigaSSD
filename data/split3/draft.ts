/**
 * El draft del Split 3, tal y como ocurrió: las 38 subastas en el orden en que
 * salieron, con todas sus pujas. Sale de la sala de la app de subastas.
 */

export type PujaDraft = { hora: string; equipo: string; importe: number };

export type LoteDraft = {
  /** Orden en que salió a subasta */
  orden: number;
  /** Su número en el sorteo previo */
  sorteo: number;
  nombre: string;
  /** Id en data/personas.ts, para enlazar con su ficha */
  persona?: string;
  portero: boolean;
  /** Se quedó sin pujas la primera vez y volvió al final del orden */
  repetido: boolean;
  hora: string;
  duracion: string;
  /** Id del equipo que se lo llevó; vacío si se quedó sin pujas */
  equipo?: string;
  precio?: number;
  pujas: PujaDraft[];
};

export const DRAFT_FECHA = "martes 15 de septiembre de 2026";
export const DRAFT_HORARIO = "20:15 – 21:02";

export const lotesDraft: LoteDraft[] = [
  {
    orden: 1, sorteo: 1, nombre: "Jorge", persona: "jorge-sanchez-portero",
    portero: true, repetido: false, hora: "20:15", duracion: "0:40", equipo: "juan", precio: 19,
    pujas: [{ hora: "20:15:36", equipo: "carlos", importe: 1 }, { hora: "20:15:39", equipo: "borja", importe: 2 }, { hora: "20:15:41", equipo: "juan", importe: 3 }, { hora: "20:15:43", equipo: "lui", importe: 4 }, { hora: "20:15:44", equipo: "carlos", importe: 5 }, { hora: "20:15:45", equipo: "borja", importe: 6 }, { hora: "20:15:48", equipo: "lui", importe: 11 }, { hora: "20:15:48", equipo: "juan", importe: 16 }, { hora: "20:15:50", equipo: "lui", importe: 17 }, { hora: "20:15:51", equipo: "borja", importe: 18 }, { hora: "20:15:55", equipo: "juan", importe: 19 }],
  },
  {
    orden: 2, sorteo: 2, nombre: "Dani Lozano", persona: "dani-lozano",
    portero: false, repetido: false, hora: "20:17", duracion: "1:10", equipo: "lui", precio: 19,
    pujas: [{ hora: "20:17:27", equipo: "lui", importe: 1 }, { hora: "20:17:28", equipo: "borja", importe: 6 }, { hora: "20:17:29", equipo: "nacho", importe: 7 }, { hora: "20:17:34", equipo: "carlos", importe: 8 }, { hora: "20:17:37", equipo: "nacho", importe: 9 }, { hora: "20:17:38", equipo: "borja", importe: 10 }, { hora: "20:17:40", equipo: "nacho", importe: 11 }, { hora: "20:17:45", equipo: "carlos", importe: 12 }, { hora: "20:17:46", equipo: "nacho", importe: 13 }, { hora: "20:17:50", equipo: "carlos", importe: 14 }, { hora: "20:17:52", equipo: "nacho", importe: 15 }, { hora: "20:17:57", equipo: "carlos", importe: 16 }, { hora: "20:17:58", equipo: "nacho", importe: 17 }, { hora: "20:18:05", equipo: "borja", importe: 18 }, { hora: "20:18:17", equipo: "lui", importe: 19 }],
  },
  {
    orden: 3, sorteo: 3, nombre: "Nacho Ram", persona: "nacho-ramirez",
    portero: false, repetido: false, hora: "20:18", duracion: "1:15", equipo: "carlos", precio: 48,
    pujas: [{ hora: "20:18:58", equipo: "borja", importe: 5 }, { hora: "20:18:59", equipo: "lui", importe: 10 }, { hora: "20:19:00", equipo: "borja", importe: 15 }, { hora: "20:19:01", equipo: "lui", importe: 25 }, { hora: "20:19:03", equipo: "borja", importe: 30 }, { hora: "20:19:05", equipo: "lui", importe: 31 }, { hora: "20:19:07", equipo: "carlos", importe: 36 }, { hora: "20:19:10", equipo: "borja", importe: 41 }, { hora: "20:19:13", equipo: "carlos", importe: 42 }, { hora: "20:19:17", equipo: "lui", importe: 43 }, { hora: "20:19:19", equipo: "borja", importe: 44 }, { hora: "20:19:24", equipo: "lui", importe: 45 }, { hora: "20:19:28", equipo: "carlos", importe: 46 }, { hora: "20:19:43", equipo: "lui", importe: 47 }, { hora: "20:19:56", equipo: "carlos", importe: 48 }],
  },
  {
    orden: 4, sorteo: 4, nombre: "Jaime", persona: "jaime-de-sala",
    portero: false, repetido: false, hora: "20:20", duracion: "1:10", equipo: "borja", precio: 33,
    pujas: [{ hora: "20:20:45", equipo: "carlos", importe: 1 }, { hora: "20:20:48", equipo: "nacho", importe: 2 }, { hora: "20:20:49", equipo: "juan", importe: 3 }, { hora: "20:20:51", equipo: "nacho", importe: 4 }, { hora: "20:20:52", equipo: "carlos", importe: 5 }, { hora: "20:20:53", equipo: "nacho", importe: 10 }, { hora: "20:20:55", equipo: "juan", importe: 11 }, { hora: "20:20:57", equipo: "nacho", importe: 12 }, { hora: "20:20:59", equipo: "juan", importe: 13 }, { hora: "20:21:00", equipo: "nacho", importe: 14 }, { hora: "20:21:02", equipo: "carlos", importe: 15 }, { hora: "20:21:02", equipo: "juan", importe: 16 }, { hora: "20:21:04", equipo: "nacho", importe: 21 }, { hora: "20:21:06", equipo: "juan", importe: 22 }, { hora: "20:21:08", equipo: "borja", importe: 23 }, { hora: "20:21:11", equipo: "nacho", importe: 24 }, { hora: "20:21:13", equipo: "juan", importe: 25 }, { hora: "20:21:16", equipo: "nacho", importe: 26 }, { hora: "20:21:19", equipo: "juan", importe: 27 }, { hora: "20:21:20", equipo: "nacho", importe: 28 }, { hora: "20:21:25", equipo: "juan", importe: 29 }, { hora: "20:21:26", equipo: "nacho", importe: 30 }, { hora: "20:21:28", equipo: "borja", importe: 31 }, { hora: "20:21:34", equipo: "juan", importe: 32 }, { hora: "20:21:37", equipo: "borja", importe: 33 }],
  },
  {
    orden: 5, sorteo: 5, nombre: "Marco", persona: "marco-hurtado",
    portero: false, repetido: false, hora: "20:22", duracion: "1:03", equipo: "lui", precio: 6,
    pujas: [{ hora: "20:22:26", equipo: "lui", importe: 1 }, { hora: "20:22:34", equipo: "borja", importe: 2 }, { hora: "20:22:37", equipo: "lui", importe: 3 }, { hora: "20:22:47", equipo: "juan", importe: 4 }, { hora: "20:23:00", equipo: "nacho", importe: 5 }, { hora: "20:23:08", equipo: "lui", importe: 6 }],
  },
  {
    orden: 6, sorteo: 6, nombre: "Fiter", persona: "miguel-fiter",
    portero: false, repetido: false, hora: "20:23", duracion: "0:59", equipo: "carlos", precio: 12,
    pujas: [{ hora: "20:23:35", equipo: "nacho", importe: 1 }, { hora: "20:23:36", equipo: "borja", importe: 2 }, { hora: "20:23:40", equipo: "nacho", importe: 3 }, { hora: "20:23:42", equipo: "borja", importe: 4 }, { hora: "20:23:52", equipo: "carlos", importe: 5 }, { hora: "20:23:57", equipo: "borja", importe: 6 }, { hora: "20:23:58", equipo: "carlos", importe: 7 }, { hora: "20:23:59", equipo: "juan", importe: 8 }, { hora: "20:24:00", equipo: "borja", importe: 9 }, { hora: "20:24:02", equipo: "carlos", importe: 10 }, { hora: "20:24:13", equipo: "borja", importe: 11 }, { hora: "20:24:16", equipo: "carlos", importe: 12 }],
  },
  {
    orden: 7, sorteo: 7, nombre: "Tito", persona: "alberto-fernandez",
    portero: false, repetido: false, hora: "20:24", duracion: "1:15", equipo: "juan", precio: 29,
    pujas: [{ hora: "20:24:43", equipo: "nacho", importe: 1 }, { hora: "20:24:50", equipo: "carlos", importe: 2 }, { hora: "20:24:52", equipo: "nacho", importe: 3 }, { hora: "20:24:53", equipo: "carlos", importe: 8 }, { hora: "20:24:55", equipo: "nacho", importe: 13 }, { hora: "20:24:56", equipo: "borja", importe: 18 }, { hora: "20:25:00", equipo: "nacho", importe: 19 }, { hora: "20:25:05", equipo: "borja", importe: 20 }, { hora: "20:25:08", equipo: "nacho", importe: 21 }, { hora: "20:25:18", equipo: "juan", importe: 22 }, { hora: "20:25:20", equipo: "nacho", importe: 23 }, { hora: "20:25:21", equipo: "juan", importe: 24 }, { hora: "20:25:24", equipo: "nacho", importe: 25 }, { hora: "20:25:27", equipo: "juan", importe: 26 }, { hora: "20:25:29", equipo: "borja", importe: 27 }, { hora: "20:25:31", equipo: "carlos", importe: 28 }, { hora: "20:25:39", equipo: "juan", importe: 29 }],
  },
  {
    orden: 8, sorteo: 8, nombre: "Hurta", persona: "pablo-hurtado",
    portero: false, repetido: false, hora: "20:26", duracion: "0:16",
    pujas: [],
  },
  {
    orden: 9, sorteo: 9, nombre: "Urru pequeño", persona: "rodrigo-urrutia",
    portero: false, repetido: false, hora: "20:26", duracion: "1:11", equipo: "borja", precio: 53,
    pujas: [{ hora: "20:26:49", equipo: "borja", importe: 10 }, { hora: "20:26:51", equipo: "nacho", importe: 20 }, { hora: "20:26:52", equipo: "borja", importe: 30 }, { hora: "20:26:53", equipo: "lui", importe: 35 }, { hora: "20:26:53", equipo: "nacho", importe: 40 }, { hora: "20:26:55", equipo: "carlos", importe: 41 }, { hora: "20:26:56", equipo: "borja", importe: 46 }, { hora: "20:26:57", equipo: "lui", importe: 47 }, { hora: "20:26:58", equipo: "borja", importe: 48 }, { hora: "20:27:11", equipo: "nacho", importe: 49 }, { hora: "20:27:18", equipo: "borja", importe: 50 }, { hora: "20:27:31", equipo: "nacho", importe: 51 }, { hora: "20:27:42", equipo: "juan", importe: 52 }, { hora: "20:27:42", equipo: "borja", importe: 53 }],
  },
  {
    orden: 10, sorteo: 10, nombre: "Petit", persona: "lucas-rodriguez",
    portero: false, repetido: false, hora: "20:29", duracion: "1:07", equipo: "juan", precio: 14,
    pujas: [{ hora: "20:29:06", equipo: "nacho", importe: 1 }, { hora: "20:29:12", equipo: "juan", importe: 2 }, { hora: "20:29:15", equipo: "nacho", importe: 3 }, { hora: "20:29:18", equipo: "juan", importe: 8 }, { hora: "20:29:22", equipo: "nacho", importe: 9 }, { hora: "20:29:27", equipo: "juan", importe: 10 }, { hora: "20:29:30", equipo: "nacho", importe: 11 }, { hora: "20:29:32", equipo: "juan", importe: 12 }, { hora: "20:29:46", equipo: "nacho", importe: 13 }, { hora: "20:29:53", equipo: "juan", importe: 14 }],
  },
  {
    orden: 11, sorteo: 11, nombre: "Rome", persona: "alejandro-romero",
    portero: false, repetido: false, hora: "20:30", duracion: "0:42", equipo: "nacho", precio: 55,
    pujas: [{ hora: "20:30:25", equipo: "nacho", importe: 10 }, { hora: "20:30:28", equipo: "carlos", importe: 11 }, { hora: "20:30:30", equipo: "lui", importe: 16 }, { hora: "20:30:31", equipo: "nacho", importe: 26 }, { hora: "20:30:33", equipo: "lui", importe: 31 }, { hora: "20:30:35", equipo: "juan", importe: 36 }, { hora: "20:30:36", equipo: "lui", importe: 37 }, { hora: "20:30:37", equipo: "nacho", importe: 46 }, { hora: "20:30:46", equipo: "lui", importe: 47 }, { hora: "20:30:46", equipo: "juan", importe: 52 }, { hora: "20:30:47", equipo: "nacho", importe: 53 }, { hora: "20:30:48", equipo: "borja", importe: 54 }, { hora: "20:30:49", equipo: "nacho", importe: 55 }],
  },
  {
    orden: 12, sorteo: 12, nombre: "Fer", persona: "fernando-diez",
    portero: false, repetido: false, hora: "20:31", duracion: "1:20", equipo: "carlos", precio: 30,
    pujas: [{ hora: "20:31:15", equipo: "nacho", importe: 1 }, { hora: "20:31:16", equipo: "lui", importe: 2 }, { hora: "20:31:17", equipo: "carlos", importe: 7 }, { hora: "20:31:20", equipo: "borja", importe: 8 }, { hora: "20:31:22", equipo: "nacho", importe: 13 }, { hora: "20:31:24", equipo: "carlos", importe: 14 }, { hora: "20:31:26", equipo: "borja", importe: 15 }, { hora: "20:31:27", equipo: "nacho", importe: 16 }, { hora: "20:31:29", equipo: "borja", importe: 17 }, { hora: "20:31:30", equipo: "nacho", importe: 18 }, { hora: "20:31:32", equipo: "borja", importe: 19 }, { hora: "20:31:33", equipo: "nacho", importe: 20 }, { hora: "20:31:34", equipo: "borja", importe: 21 }, { hora: "20:31:35", equipo: "nacho", importe: 22 }, { hora: "20:31:36", equipo: "borja", importe: 23 }, { hora: "20:31:37", equipo: "nacho", importe: 24 }, { hora: "20:31:38", equipo: "borja", importe: 25 }, { hora: "20:31:44", equipo: "nacho", importe: 26 }, { hora: "20:31:51", equipo: "borja", importe: 27 }, { hora: "20:31:57", equipo: "nacho", importe: 28 }, { hora: "20:32:07", equipo: "borja", importe: 29 }, { hora: "20:32:16", equipo: "carlos", importe: 30 }],
  },
  {
    orden: 13, sorteo: 13, nombre: "Nicoplasman", persona: "nicolas-sanchez",
    portero: false, repetido: false, hora: "20:32", duracion: "0:58", equipo: "borja", precio: 48,
    pujas: [{ hora: "20:32:54", equipo: "lui", importe: 5 }, { hora: "20:32:56", equipo: "borja", importe: 15 }, { hora: "20:32:57", equipo: "lui", importe: 25 }, { hora: "20:32:58", equipo: "borja", importe: 35 }, { hora: "20:33:00", equipo: "lui", importe: 36 }, { hora: "20:33:02", equipo: "juan", importe: 41 }, { hora: "20:33:04", equipo: "lui", importe: 42 }, { hora: "20:33:04", equipo: "borja", importe: 46 }, { hora: "20:33:18", equipo: "lui", importe: 47 }, { hora: "20:33:33", equipo: "borja", importe: 48 }],
  },
  {
    orden: 14, sorteo: 14, nombre: "Mario", persona: "mario-fuentes",
    portero: false, repetido: false, hora: "20:34", duracion: "0:59", equipo: "juan", precio: 79,
    pujas: [{ hora: "20:34:40", equipo: "borja", importe: 10 }, { hora: "20:34:42", equipo: "nacho", importe: 20 }, { hora: "20:34:43", equipo: "carlos", importe: 30 }, { hora: "20:34:43", equipo: "lui", importe: 50 }, { hora: "20:34:44", equipo: "borja", importe: 60 }, { hora: "20:34:46", equipo: "nacho", importe: 70 }, { hora: "20:34:57", equipo: "carlos", importe: 71 }, { hora: "20:34:58", equipo: "nacho", importe: 72 }, { hora: "20:35:07", equipo: "carlos", importe: 73 }, { hora: "20:35:09", equipo: "nacho", importe: 78 }, { hora: "20:35:20", equipo: "juan", importe: 79 }],
  },
  {
    orden: 15, sorteo: 15, nombre: "Guillermo", persona: "guillermo-portero",
    portero: true, repetido: false, hora: "20:35", duracion: "0:47", equipo: "lui", precio: 10,
    pujas: [{ hora: "20:35:52", equipo: "lui", importe: 5 }, { hora: "20:36:01", equipo: "juan", importe: 6 }, { hora: "20:36:03", equipo: "borja", importe: 7 }, { hora: "20:36:05", equipo: "lui", importe: 8 }, { hora: "20:36:19", equipo: "borja", importe: 9 }, { hora: "20:36:20", equipo: "lui", importe: 10 }],
  },
  {
    orden: 16, sorteo: 16, nombre: "Nachito", persona: "nacho-lopez",
    portero: false, repetido: false, hora: "20:36", duracion: "0:28", equipo: "lui", precio: 36,
    pujas: [{ hora: "20:36:51", equipo: "lui", importe: 10 }, { hora: "20:36:53", equipo: "nacho", importe: 20 }, { hora: "20:36:55", equipo: "lui", importe: 25 }, { hora: "20:36:56", equipo: "borja", importe: 30 }, { hora: "20:36:57", equipo: "lui", importe: 31 }, { hora: "20:36:57", equipo: "nacho", importe: 35 }, { hora: "20:37:01", equipo: "lui", importe: 36 }],
  },
  {
    orden: 17, sorteo: 17, nombre: "Urru", persona: "borja-urrutia",
    portero: false, repetido: false, hora: "20:37", duracion: "0:28", equipo: "nacho", precio: 13,
    pujas: [{ hora: "20:37:38", equipo: "borja", importe: 1 }, { hora: "20:37:40", equipo: "nacho", importe: 6 }, { hora: "20:37:43", equipo: "carlos", importe: 7 }, { hora: "20:37:44", equipo: "borja", importe: 8 }, { hora: "20:37:48", equipo: "nacho", importe: 13 }],
  },
  {
    orden: 18, sorteo: 18, nombre: "Juli", persona: "juli",
    portero: false, repetido: false, hora: "20:38", duracion: "0:36", equipo: "nacho", precio: 29,
    pujas: [{ hora: "20:38:23", equipo: "lui", importe: 1 }, { hora: "20:38:26", equipo: "borja", importe: 6 }, { hora: "20:38:30", equipo: "nacho", importe: 16 }, { hora: "20:38:31", equipo: "juan", importe: 21 }, { hora: "20:38:33", equipo: "nacho", importe: 26 }, { hora: "20:38:38", equipo: "borja", importe: 27 }, { hora: "20:38:39", equipo: "juan", importe: 28 }, { hora: "20:38:40", equipo: "nacho", importe: 29 }],
  },
  {
    orden: 19, sorteo: 19, nombre: "Unai", persona: "unai-retes",
    portero: false, repetido: false, hora: "20:39", duracion: "0:36", equipo: "borja", precio: 19,
    pujas: [{ hora: "20:39:06", equipo: "lui", importe: 5 }, { hora: "20:39:08", equipo: "borja", importe: 10 }, { hora: "20:39:09", equipo: "lui", importe: 11 }, { hora: "20:39:11", equipo: "nacho", importe: 12 }, { hora: "20:39:12", equipo: "borja", importe: 17 }, { hora: "20:39:16", equipo: "nacho", importe: 18 }, { hora: "20:39:24", equipo: "borja", importe: 19 }],
  },
  {
    orden: 20, sorteo: 20, nombre: "Manu", persona: "manu",
    portero: false, repetido: false, hora: "20:40", duracion: "1:12", equipo: "juan", precio: 9,
    pujas: [{ hora: "20:40:11", equipo: "lui", importe: 1 }, { hora: "20:40:13", equipo: "juan", importe: 2 }, { hora: "20:40:15", equipo: "carlos", importe: 3 }, { hora: "20:40:18", equipo: "nacho", importe: 4 }, { hora: "20:40:25", equipo: "juan", importe: 5 }, { hora: "20:40:31", equipo: "carlos", importe: 6 }, { hora: "20:40:38", equipo: "juan", importe: 7 }, { hora: "20:40:53", equipo: "carlos", importe: 8 }, { hora: "20:41:02", equipo: "juan", importe: 9 }],
  },
  {
    orden: 21, sorteo: 21, nombre: "Cifu", persona: "cifu",
    portero: false, repetido: false, hora: "20:41", duracion: "0:58", equipo: "lui", precio: 49,
    pujas: [{ hora: "20:41:36", equipo: "nacho", importe: 5 }, { hora: "20:41:37", equipo: "lui", importe: 35 }, { hora: "20:41:45", equipo: "nacho", importe: 40 }, { hora: "20:41:47", equipo: "lui", importe: 41 }, { hora: "20:41:55", equipo: "nacho", importe: 42 }, { hora: "20:41:56", equipo: "lui", importe: 43 }, { hora: "20:42:06", equipo: "nacho", importe: 44 }, { hora: "20:42:08", equipo: "lui", importe: 45 }, { hora: "20:42:09", equipo: "nacho", importe: 46 }, { hora: "20:42:11", equipo: "lui", importe: 47 }, { hora: "20:42:12", equipo: "nacho", importe: 48 }, { hora: "20:42:13", equipo: "lui", importe: 49 }],
  },
  {
    orden: 22, sorteo: 22, nombre: "Jimmy", persona: "jaime-diez",
    portero: true, repetido: false, hora: "20:42", duracion: "1:38", equipo: "carlos", precio: 15,
    pujas: [{ hora: "20:42:44", equipo: "carlos", importe: 1 }, { hora: "20:42:49", equipo: "nacho", importe: 2 }, { hora: "20:42:55", equipo: "carlos", importe: 3 }, { hora: "20:42:57", equipo: "nacho", importe: 4 }, { hora: "20:42:59", equipo: "carlos", importe: 9 }, { hora: "20:43:11", equipo: "nacho", importe: 10 }, { hora: "20:43:14", equipo: "carlos", importe: 11 }, { hora: "20:43:28", equipo: "borja", importe: 12 }, { hora: "20:43:40", equipo: "carlos", importe: 13 }, { hora: "20:43:55", equipo: "borja", importe: 14 }, { hora: "20:43:59", equipo: "carlos", importe: 15 }],
  },
  {
    orden: 23, sorteo: 23, nombre: "Pow", persona: "adrian-antropow",
    portero: true, repetido: false, hora: "20:44", duracion: "2:49", equipo: "borja", precio: 22,
    pujas: [{ hora: "20:44:37", equipo: "nacho", importe: 1 }, { hora: "20:44:44", equipo: "lui", importe: 2 }, { hora: "20:44:47", equipo: "nacho", importe: 3 }, { hora: "20:44:48", equipo: "juan", importe: 4 }, { hora: "20:44:50", equipo: "nacho", importe: 5 }, { hora: "20:44:53", equipo: "juan", importe: 6 }, { hora: "20:45:01", equipo: "nacho", importe: 7 }, { hora: "20:45:02", equipo: "juan", importe: 8 }, { hora: "20:45:07", equipo: "nacho", importe: 9 }, { hora: "20:45:08", equipo: "juan", importe: 10 }, { hora: "20:45:20", equipo: "borja", importe: 11 }, { hora: "20:45:28", equipo: "nacho", importe: 12 }, { hora: "20:45:34", equipo: "juan", importe: 13 }, { hora: "20:45:40", equipo: "nacho", importe: 14 }, { hora: "20:45:42", equipo: "juan", importe: 15 }, { hora: "20:45:54", equipo: "borja", importe: 16 }, { hora: "20:45:59", equipo: "juan", importe: 17 }, { hora: "20:46:12", equipo: "borja", importe: 18 }, { hora: "20:46:25", equipo: "juan", importe: 19 }, { hora: "20:46:39", equipo: "borja", importe: 20 }, { hora: "20:46:52", equipo: "nacho", importe: 21 }, { hora: "20:47:05", equipo: "borja", importe: 22 }],
  },
  {
    orden: 24, sorteo: 24, nombre: "Sainz", persona: "adrian-sainz",
    portero: false, repetido: false, hora: "20:47", duracion: "1:43", equipo: "juan", precio: 17,
    pujas: [{ hora: "20:47:40", equipo: "juan", importe: 1 }, { hora: "20:47:43", equipo: "carlos", importe: 2 }, { hora: "20:47:45", equipo: "juan", importe: 3 }, { hora: "20:47:47", equipo: "borja", importe: 4 }, { hora: "20:47:49", equipo: "juan", importe: 5 }, { hora: "20:48:03", equipo: "nacho", importe: 6 }, { hora: "20:48:04", equipo: "juan", importe: 7 }, { hora: "20:48:09", equipo: "nacho", importe: 8 }, { hora: "20:48:13", equipo: "juan", importe: 9 }, { hora: "20:48:15", equipo: "nacho", importe: 10 }, { hora: "20:48:18", equipo: "juan", importe: 11 }, { hora: "20:48:30", equipo: "nacho", importe: 12 }, { hora: "20:48:41", equipo: "juan", importe: 13 }, { hora: "20:48:45", equipo: "nacho", importe: 14 }, { hora: "20:48:47", equipo: "juan", importe: 15 }, { hora: "20:48:59", equipo: "nacho", importe: 16 }, { hora: "20:49:02", equipo: "juan", importe: 17 }],
  },
  {
    orden: 25, sorteo: 25, nombre: "Dante", persona: "dante",
    portero: false, repetido: false, hora: "20:49", duracion: "1:58", equipo: "carlos", precio: 34,
    pujas: [{ hora: "20:49:39", equipo: "borja", importe: 10 }, { hora: "20:49:51", equipo: "carlos", importe: 11 }, { hora: "20:49:58", equipo: "nacho", importe: 12 }, { hora: "20:50:08", equipo: "juan", importe: 17 }, { hora: "20:50:19", equipo: "carlos", importe: 18 }, { hora: "20:50:29", equipo: "juan", importe: 23 }, { hora: "20:50:40", equipo: "carlos", importe: 24 }, { hora: "20:50:45", equipo: "juan", importe: 25 }, { hora: "20:50:49", equipo: "carlos", importe: 26 }, { hora: "20:50:57", equipo: "juan", importe: 31 }, { hora: "20:51:08", equipo: "carlos", importe: 32 }, { hora: "20:51:12", equipo: "juan", importe: 33 }, { hora: "20:51:18", equipo: "carlos", importe: 34 }],
  },
  {
    orden: 26, sorteo: 26, nombre: "Barca", persona: "pablo-rodriguez",
    portero: false, repetido: false, hora: "20:51", duracion: "0:16",
    pujas: [],
  },
  {
    orden: 27, sorteo: 27, nombre: "Rafa", persona: "rafael-llopis",
    portero: false, repetido: false, hora: "20:52", duracion: "1:17", equipo: "carlos", precio: 42,
    pujas: [{ hora: "20:52:49", equipo: "lui", importe: 10 }, { hora: "20:52:51", equipo: "borja", importe: 20 }, { hora: "20:52:52", equipo: "lui", importe: 21 }, { hora: "20:52:54", equipo: "juan", importe: 22 }, { hora: "20:53:03", equipo: "lui", importe: 26 }, { hora: "20:53:12", equipo: "nacho", importe: 31 }, { hora: "20:53:16", equipo: "juan", importe: 32 }, { hora: "20:53:18", equipo: "nacho", importe: 37 }, { hora: "20:53:28", equipo: "carlos", importe: 38 }, { hora: "20:53:30", equipo: "nacho", importe: 39 }, { hora: "20:53:31", equipo: "carlos", importe: 40 }, { hora: "20:53:46", equipo: "nacho", importe: 41 }, { hora: "20:53:48", equipo: "carlos", importe: 42 }],
  },
  {
    orden: 28, sorteo: 28, nombre: "Pedro", persona: "pedro-baneres",
    portero: true, repetido: false, hora: "20:54", duracion: "0:50", equipo: "nacho", precio: 21,
    pujas: [{ hora: "20:54:19", equipo: "borja", importe: 10 }, { hora: "20:54:26", equipo: "nacho", importe: 15 }, { hora: "20:54:34", equipo: "juan", importe: 20 }, { hora: "20:54:48", equipo: "nacho", importe: 21 }],
  },
  {
    orden: 29, sorteo: 29, nombre: "Gabi", persona: "gabriel-furnieles",
    portero: false, repetido: false, hora: "20:55", duracion: "0:26", equipo: "lui", precio: 36,
    pujas: [{ hora: "20:55:19", equipo: "borja", importe: 10 }, { hora: "20:55:23", equipo: "juan", importe: 20 }, { hora: "20:55:24", equipo: "borja", importe: 21 }, { hora: "20:55:27", equipo: "juan", importe: 31 }, { hora: "20:55:28", equipo: "lui", importe: 36 }],
  },
  {
    orden: 30, sorteo: 30, nombre: "Jordi", persona: "jordi-sanchez",
    portero: false, repetido: false, hora: "20:56", duracion: "0:16",
    pujas: [],
  },
  {
    orden: 31, sorteo: 31, nombre: "Nalda", persona: "guillermo-garcia",
    portero: false, repetido: false, hora: "20:56", duracion: "1:16", equipo: "nacho", precio: 7,
    pujas: [{ hora: "20:56:38", equipo: "nacho", importe: 1 }, { hora: "20:56:52", equipo: "borja", importe: 2 }, { hora: "20:57:00", equipo: "nacho", importe: 3 }, { hora: "20:57:12", equipo: "borja", importe: 4 }, { hora: "20:57:14", equipo: "nacho", importe: 5 }, { hora: "20:57:26", equipo: "borja", importe: 6 }, { hora: "20:57:32", equipo: "nacho", importe: 7 }],
  },
  {
    orden: 32, sorteo: 32, nombre: "Lucho", persona: "alvaro-aguilar",
    portero: false, repetido: false, hora: "20:58", duracion: "1:09", equipo: "juan", precio: 29,
    pujas: [{ hora: "20:58:22", equipo: "carlos", importe: 1 }, { hora: "20:58:35", equipo: "borja", importe: 2 }, { hora: "20:58:38", equipo: "carlos", importe: 3 }, { hora: "20:58:50", equipo: "borja", importe: 4 }, { hora: "20:58:57", equipo: "juan", importe: 14 }, { hora: "20:59:01", equipo: "carlos", importe: 19 }, { hora: "20:59:04", equipo: "juan", importe: 29 }],
  },
  {
    orden: 33, sorteo: 33, nombre: "Samu", persona: "samu",
    portero: false, repetido: false, hora: "20:59", duracion: "0:39", equipo: "nacho", precio: 74,
    pujas: [{ hora: "20:59:31", equipo: "borja", importe: 10 }, { hora: "20:59:32", equipo: "carlos", importe: 11 }, { hora: "20:59:32", equipo: "nacho", importe: 21 }, { hora: "20:59:43", equipo: "borja", importe: 22 }, { hora: "20:59:49", equipo: "nacho", importe: 74 }],
  },
  {
    orden: 34, sorteo: 34, nombre: "Goyo", persona: "goyo",
    portero: false, repetido: false, hora: "21:00", duracion: "0:27", equipo: "borja", precio: 20,
    pujas: [{ hora: "21:00:16", equipo: "borja", importe: 1 }, { hora: "21:00:19", equipo: "carlos", importe: 19 }, { hora: "21:00:23", equipo: "borja", importe: 20 }],
  },
  {
    orden: 35, sorteo: 35, nombre: "Coco", persona: "jorge-vazquez",
    portero: false, repetido: false, hora: "21:00", duracion: "0:23", equipo: "lui", precio: 74,
    pujas: [{ hora: "21:00:55", equipo: "borja", importe: 5 }, { hora: "21:00:58", equipo: "carlos", importe: 6 }, { hora: "21:01:00", equipo: "lui", importe: 74 }],
  },
  {
    orden: 36, sorteo: 8, nombre: "Hurta", persona: "pablo-hurtado",
    portero: false, repetido: true, hora: "21:01", duracion: "0:25", equipo: "carlos", precio: 19,
    pujas: [{ hora: "21:01:28", equipo: "carlos", importe: 19 }],
  },
  {
    orden: 37, sorteo: 26, nombre: "Barca", persona: "pablo-rodriguez",
    portero: false, repetido: true, hora: "21:01", duracion: "0:30", equipo: "nacho", precio: 1,
    pujas: [{ hora: "21:02:02", equipo: "nacho", importe: 1 }],
  },
  {
    orden: 38, sorteo: 30, nombre: "Jordi", persona: "jordi-sanchez",
    portero: false, repetido: true, hora: "21:02", duracion: "0:17", equipo: "borja", precio: 1,
    pujas: [{ hora: "21:02:35", equipo: "borja", importe: 1 }],
  },
];
