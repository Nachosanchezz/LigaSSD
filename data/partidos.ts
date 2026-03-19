export type EstadoPartido =
  | "Pendiente de programar"
  | "Programado"
  | "Aplazado"
  | "Finalizado";

export type EventoGol = {
  jugador: string;
  asistente?: string;
  minuto?: number;
};

export type ResumenPartido = {
  local: EventoGol[];
  visitante: EventoGol[];
};

export type Partido = {
  id: string;
  local: string;
  visitante: string;
  dia?: string;
  hora?: string;
  campo?: string;
  arbitra?: string;
  estado: EstadoPartido;
  motivo?: string;
  resultado?: string;
  resumen?: ResumenPartido;
};

export type Jornada = {
  numero: number;
  descansa: string;
  partidos: Partido[];
};

export const jornadas: Jornada[] = [
  {
    numero: 1,
    descansa: "SPITI2",
    partidos: [
      {
        id: "j1-torre-beldes-filosofos",
        local: "TORRE BELDES",
        visitante: "FILÓSOFOS",
        dia: "Lunes 18 de marzo",
        hora: "20:00",
        campo: "1",
        arbitra: "AUTOARBITRAJE",
        estado: "Aplazado",
        motivo: "Falta de jugadores en FILÓSOFOS",
      },
      {
        id: "j1-atalaya-bodo-dream",
        local: "ATALAYA",
        visitante: "BODØ DREAM",
        dia: "Jueves 12 de marzo",
        hora: "21:00",
        campo: "1",
        arbitra: "AÇAI BOYS",
        estado: "Finalizado",
        resultado: "4-4",
        resumen: {
          local: [
            { jugador: "Nico Marín", asistente: "Borja Urrutia" },
            { jugador: "Fernando Diez", asistente: "Borja Urrutia" },
            { jugador: "Borja Urrutia", asistente: "Nico Marín" },
            { jugador: "Nachito", asistente: "Sin asistencia" },
          ],
          visitante: [
            { jugador: "Enrique Vivar", asistente: "Juan Sánchez" },
            { jugador: "Nacho Ramírez", asistente: "Nicolás Sánchez" },
            { jugador: "Nicolás Sánchez", asistente: "Pablo Hurtado" },
            { jugador: "Nicolás Sánchez", asistente: "Nacho Ramírez" },
          ],
        },
      },
      {
        id: "j1-old-school-acai-boys",
        local: "OLD SCHOOL",
        visitante: "AÇAI BOYS",
        dia: "Jueves 12 de marzo",
        hora: "20:30",
        campo: "2",
        arbitra: "ATALAYA",
        estado: "Finalizado",
        resultado: "5-3",
        resumen: {
          local: [
            { jugador: "Unai", asistente: "Rafael Llopis" },
            { jugador: "Gon Ayllón", asistente: "Rafael Llopis" },
            { jugador: "Jaime de Sala", asistente: "Cifu" },
            { jugador: "Rafael Llopis", asistente: "Sin asistencia" },
            { jugador: "Jaime de Sala", asistente: "Rafael Llopis" },
          ],
          visitante: [
            { jugador: "Arturo", asistente: "Sin asistencia" },
            { jugador: "Gol cedido", asistente: "Sin asistencia" },
            { jugador: "Gol cedido", asistente: "Sin asistencia" },
          ],
        },
      },
    ],
  },
  {
    numero: 2,
    descansa: "FILÓSOFOS",
    partidos: [
      {
        id: "j2-torre-beldes-old-school",
        local: "TORRE BELDES",
        visitante: "OLD SCHOOL",
        dia: "Lunes 16 de marzo",
        hora: "21:20",
        campo: "1",
        arbitra: "BODØ DREAM",
        estado: "Finalizado",
        resultado: "9-5",
        resumen: {
          local: [
            { jugador: "Coco", asistente: "Miguel Morán" },
            { jugador: "Coco", asistente: "Miguel Morán" },
            { jugador: "Lucho", asistente: "Sin asistencia" },
            { jugador: "Coco", asistente: "Sin asistencia" },
            { jugador: "Coco", asistente: "Louis" },
            { jugador: "Miguel Morán", asistente: "Lucho" },
            { jugador: "Gabi", asistente: "Lucho" },
            { jugador: "Coco", asistente: "Miguel Morán" },
            { jugador: "Miguel Morán", asistente: "Gabi" },
          ],
          visitante: [
            { jugador: "Unai", asistente: "Rafael Llopis" },
            { jugador: "Rafael Llopis", asistente: "Sin asistencia" },
            { jugador: "Cifu", asistente: "Rafael Llopis" },
            { jugador: "Unai", asistente: "Cifu" },
            { jugador: "Cedido", asistente: "Sin asistencia" },
          ],
        },
      },
      {
        id: "j2-acai-boys-atalaya",
        local: "AÇAI BOYS",
        visitante: "ATALAYA",
        dia: "Jueves 19 de marzo",
        hora: "21:00",
        campo: "1",
        arbitra: "BODØ DREAM",
        estado: "Finalizado",
        resultado: "4-4",
        resumen: {
          local: [
            { jugador: "Pato", asistente: "Charly", minuto: 13 },
            { jugador: "Pueyo", asistente: "Pato", minuto: 29 },
            { jugador: "Cedido", asistente: "Mario", minuto: 30 },
            { jugador: "Cedido", asistente: "Sin asistencia", minuto: 40 },
          ],
          visitante: [
            { jugador: "Fer", asistente: "Urru", minuto: 10 },
            { jugador: "Nico Marín", asistente: "Fer", minuto: 17 },
            { jugador: "Nico Marín", asistente: "Fer", minuto: 25 },
            { jugador: "Jimmy", asistente: "Sin asistencia", minuto: 37 },
          ],
        },
      },
      {
        id: "j2-bodo-dream-spiti2",
        local: "BODØ DREAM",
        visitante: "SPITI2",
        dia: "Lunes 16 de marzo",
        hora: "20:30",
        campo: "1",
        arbitra: "Autoarbitraje",
        estado: "Aplazado",
        motivo: "Falta de jugadores en BODØ DREAM",
      },
    ],
  },
  {
    numero: 3,
    descansa: "OLD SCHOOL",
    partidos: [
      {
        id: "j3-torre-beldes-bodo-dream",
        local: "TORRE BELDES",
        visitante: "BODØ DREAM",
        dia: "Lunes 23 de marzo",
        hora: "21:20",
        campo: "1",
        arbitra: "FILÓSOFOS",
        estado: "Programado",
      },
      {
        id: "j3-filosofos-acai-boys",
        local: "FILÓSOFOS",
        visitante: "AÇAI BOYS",
        dia: "Lunes 23 de marzo",
        hora: "20:30",
        campo: "1",
        arbitra: "TORRE BELDES",
        estado: "Programado",
      },
      {
        id: "j3-spiti2-atalaya",
        local: "SPITI2",
        visitante: "ATALAYA",
        dia: "Jueves 26 de marzo",
        hora: "20:30",
        campo: "1",
        arbitra: "BODØ DREAM",
        estado: "Programado",
      },
    ],
  },
  {
    numero: 4,
    descansa: "ATALAYA",
    partidos: [
      {
        id: "j4-torre-beldes-acai-boys",
        local: "TORRE BELDES",
        visitante: "AÇAI BOYS",
        estado: "Pendiente de programar",
      },
      {
        id: "j4-bodo-dream-old-school",
        local: "BODØ DREAM",
        visitante: "OLD SCHOOL",
        estado: "Pendiente de programar",
      },
      {
        id: "j4-filosofos-spiti2",
        local: "FILÓSOFOS",
        visitante: "SPITI2",
        estado: "Pendiente de programar",
      },
    ],
  },
  {
    numero: 5,
    descansa: "AÇAI BOYS",
    partidos: [
      {
        id: "j5-torre-beldes-spiti2",
        local: "TORRE BELDES",
        visitante: "SPITI2",
        estado: "Pendiente de programar",
      },
      {
        id: "j5-old-school-atalaya",
        local: "OLD SCHOOL",
        visitante: "ATALAYA",
        estado: "Pendiente de programar",
      },
      {
        id: "j5-filosofos-bodo-dream",
        local: "FILÓSOFOS",
        visitante: "BODØ DREAM",
        estado: "Pendiente de programar",
      },
    ],
  },
  {
    numero: 6,
    descansa: "BODØ DREAM",
    partidos: [
      {
        id: "j6-torre-beldes-atalaya",
        local: "TORRE BELDES",
        visitante: "ATALAYA",
        estado: "Pendiente de programar",
      },
      {
        id: "j6-old-school-filosofos",
        local: "OLD SCHOOL",
        visitante: "FILÓSOFOS",
        estado: "Pendiente de programar",
      },
      {
        id: "j6-acai-boys-spiti2",
        local: "AÇAI BOYS",
        visitante: "SPITI2",
        estado: "Pendiente de programar",
      },
    ],
  },
  {
    numero: 7,
    descansa: "TORRE BELDES",
    partidos: [
      {
        id: "j7-old-school-spiti2",
        local: "OLD SCHOOL",
        visitante: "SPITI2",
        estado: "Pendiente de programar",
      },
      {
        id: "j7-acai-boys-bodo-dream",
        local: "AÇAI BOYS",
        visitante: "BODØ DREAM",
        estado: "Pendiente de programar",
      },
      {
        id: "j7-filosofos-atalaya",
        local: "FILÓSOFOS",
        visitante: "ATALAYA",
        estado: "Pendiente de programar",
      },
    ],
  },
];