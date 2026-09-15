// Marcador de un partido guardado como texto: "3-2" o, en una eliminatoria
// que sigue empatada tras la prórroga, "4-4 (5-3 pen.)".

export type Marcador = {
  local: number;
  visitante: number;
  penaltis?: { local: number; visitante: number };
};

const PATRON = /^\s*(\d+)\s*-\s*(\d+)\s*(?:\(\s*(\d+)\s*-\s*(\d+)\s*pen\.?\s*\))?\s*$/i;

export function leerMarcador(resultado?: string): Marcador | null {
  const partes = resultado?.match(PATRON);
  if (!partes) return null;

  const marcador: Marcador = { local: Number(partes[1]), visitante: Number(partes[2]) };
  if (partes[3] !== undefined) {
    marcador.penaltis = { local: Number(partes[3]), visitante: Number(partes[4]) };
  }
  return marcador;
}

/** Quién gana el partido, contando los penaltis. Null si es un empate sin penaltis. */
export function ladoGanador(marcador: Marcador): "local" | "visitante" | null {
  if (marcador.local !== marcador.visitante) {
    return marcador.local > marcador.visitante ? "local" : "visitante";
  }
  const penaltis = marcador.penaltis;
  if (penaltis && penaltis.local !== penaltis.visitante) {
    return penaltis.local > penaltis.visitante ? "local" : "visitante";
  }
  return null;
}
