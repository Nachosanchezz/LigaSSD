import type { ResumenPartido } from "./partidos";

export type EstadoPlayoff = "Pendiente" | "Programado" | "Finalizado";

export type PartidoPlayoff = {
  id: string;
  local: string;
  visitante: string;
  seedLocal?: number;
  seedVisitante?: number;
  localEsBye?: boolean;
  resultado?: string;
  ganador?: string;
  mvp?: string;
  resumen?: ResumenPartido;
  estado: EstadoPlayoff;
  dia?: string;
  hora?: string;
};

export const cuartosPlayoff: PartidoPlayoff[] = [
  {
    id: "qf1",
    local: "TORRE BELDES",
    visitante: "AÇAI BOYS",
    seedLocal: 2,
    seedVisitante: 7,
    estado: "Pendiente",
  },
  {
    id: "qf2",
    local: "FILÓSOFOS",
    visitante: "ATALAYA",
    seedLocal: 3,
    seedVisitante: 6,
    estado: "Pendiente",
  },
  {
    id: "qf3",
    local: "OLD SCHOOL",
    visitante: "SPITI2",
    seedLocal: 4,
    seedVisitante: 5,
    estado: "Pendiente",
  },
];

export const semifinalesPlayoff: PartidoPlayoff[] = [
  {
    id: "sf2",
    local: "Gan. QF1",
    visitante: "Gan. QF2",
    estado: "Pendiente",
  },
  {
    id: "sf1",
    local: "BODØ DREAM",
    visitante: "Gan. QF3",
    seedLocal: 1,
    localEsBye: true,
    estado: "Pendiente",
  },
];

export const finalPlayoff: PartidoPlayoff = {
  id: "final",
  local: "Gan. SF2",
  visitante: "Gan. SF1",
  estado: "Pendiente",
};
