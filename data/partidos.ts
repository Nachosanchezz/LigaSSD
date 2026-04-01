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
  mvp?: string;
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
        dia: "",
        hora: "",
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
        estado: "Programado",
      },
      {
        id: "j1-old-school-acai-boys",
        local: "OLD SCHOOL",
        visitante: "AÇAI BOYS",
        dia: "Jueves 12 de marzo",
        hora: "20:30",
        campo: "2",
        arbitra: "ATALAYA",
        estado: "Programado",
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
        estado: "Programado",
      },
      {
        id: "j2-acai-boys-atalaya",
        local: "AÇAI BOYS",
        visitante: "ATALAYA",
        dia: "Jueves 19 de marzo",
        hora: "21:00",
        campo: "1",
        arbitra: "BODØ DREAM",
        estado: "Programado",
      },
      {
        id: "j2-bodo-dream-spiti2",
        local: "BODØ DREAM",
        visitante: "SPITI2",
        dia: "",
        hora: "",
        campo: "1",
        arbitra: "AUTOARBITRAJE",
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
        arbitra: "SPITI2",
        estado: "Programado",
      },
      {
        id: "j3-filosofos-acai-boys",
        local: "FILÓSOFOS",
        visitante: "AÇAI BOYS",
        dia: "Miércoles 25 de marzo",
        hora: "21:15",
        campo: "1",
        arbitra: "TORRE BELDES",
        estado: "Programado",
      },
      {
        id: "j3-spiti2-atalaya",
        local: "SPITI2",
        visitante: "ATALAYA",
        dia: "Martes 24 de marzo",
        hora: "20:30",
        campo: "1",
        arbitra: "OLD SCHOOL",
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
        dia: "Lunes 6 de abril",
        hora: "21:20",
        campo: "1",
        arbitra: "Pendiente",
        estado: "Programado",
      },
      {
        id: "j4-bodo-dream-old-school",
        local: "BODØ DREAM",
        visitante: "OLD SCHOOL",
        dia: "Jueves 9 de abril",
        hora: "21:20",
        campo: "1",
        arbitra: "Pendiente",
        estado: "Programado",
      },
      {
        id: "j4-filosofos-spiti2",
        local: "FILÓSOFOS",
        visitante: "SPITI2",
        dia: "Jueves 9 de abril",
        hora: "20:30",
        campo: "1",
        arbitra: "Pendiente",
        estado: "Programado",
      },
    ],
  },
  {
    numero: 5,
    descansa: "BODØ DREAM",
    partidos: [
      {
        id: "j5-torre-beldes-atalaya",
        local: "TORRE BELDES",
        visitante: "ATALAYA",
        dia: "Jueves 16 de abril",
        hora: "21:20",
        campo: "1",
        arbitra: "Pendiente",
        estado: "Programado",
      },
      {
        id: "j5-old-school-filosofos",
        local: "OLD SCHOOL",
        visitante: "FILÓSOFOS",
        dia: "Lunes 13 de abril",
        hora: "21:00",
        campo: "1",
        arbitra: "Pendiente",
        estado: "Programado",
      },
      {
        id: "j5-acai-boys-spiti2",
        local: "AÇAI BOYS",
        visitante: "SPITI2",
        dia: "Jueves 16 de abril",
        hora: "20:30",
        campo: "1",
        arbitra: "Pendiente",
        estado: "Programado",
      },
    ],
  },
  {
    numero: 6,
    descansa: "AÇAI BOYS",
    partidos: [
      {
        id: "j6-torre-beldes-spiti2",
        local: "TORRE BELDES",
        visitante: "SPITI2",
        dia: "Lunes 20 de abril",
        hora: "21:20",
        campo: "1",
        arbitra: "Pendiente",
        estado: "Programado",
      },
      {
        id: "j6-old-school-atalaya",
        local: "OLD SCHOOL",
        visitante: "ATALAYA",
        dia: "Lunes 20 de abril",
        hora: "20:30",
        campo: "1",
        arbitra: "Pendiente",
        estado: "Programado",
      },
      {
        id: "j6-filosofos-bodo-dream",
        local: "FILÓSOFOS",
        visitante: "BODØ DREAM",
        dia: "Jueves 23 de abril",
        hora: "20:30",
        campo: "1",
        arbitra: "Pendiente",
        estado: "Programado",
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
        dia: "Lunes 27 de abril",
        hora: "20:30",
        campo: "1",
        arbitra: "Pendiente",
        estado: "Programado",
      },
      {
        id: "j7-acai-boys-bodo-dream",
        local: "AÇAI BOYS",
        visitante: "BODØ DREAM",
        dia: "Lunes 27 de abril",
        hora: "21:20",
        campo: "1",
        arbitra: "Pendiente",
        estado: "Programado",
      },
      {
        id: "j7-filosofos-atalaya",
        local: "FILÓSOFOS",
        visitante: "ATALAYA",
        dia: "Jueves 30 de abril",
        hora: "21:00",
        campo: "1",
        arbitra: "Pendiente",
        estado: "Programado",
      },
    ],
  },
];
