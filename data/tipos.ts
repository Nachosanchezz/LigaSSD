// Tipos comunes a los splits con actas (del Split 2 en adelante)

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

export type EventoTarjeta = {
  jugador: string;
  tipo: "amarilla" | "roja";
  minuto?: number;
};

export type TarjetasPartido = {
  local: EventoTarjeta[];
  visitante: EventoTarjeta[];
};

export type Partido = {
  id: string;
  local: string;
  visitante: string;
  dia?: string;
  hora?: string;
  /** Fecha y hora en formato máquina (ISO), para la cuenta atrás */
  iso?: string;
  campo?: string;
  arbitra?: string;
  estado: EstadoPartido;
  motivo?: string;
  resultado?: string;
  resumen?: ResumenPartido;
  tarjetas?: TarjetasPartido;
  mvp?: string;
};

export type Jornada = {
  numero: number;
  /** Con un número impar de equipos, el que no juega esa jornada */
  descansa?: string;
  partidos: Partido[];
};
