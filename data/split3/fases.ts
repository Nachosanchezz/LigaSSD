/**
 * Play-in y playoff del Split 3, todo a partido único:
 * - Triangular A: 1º, 3º y 6º de la liguilla. Triangular B: 2º, 4º y 5º.
 *   Pasan los dos primeros de cada uno; el último queda eliminado.
 * - Semifinales: 1º A contra 2º B y 1º B contra 2º A. Después, la final.
 * - En semis y final no hay empate: prórroga y penaltis ("4-4 (5-3 pen.)").
 */

export type Plaza =
  | { de: "liguilla"; puesto: number }
  | { de: "triangular"; grupo: "A" | "B"; puesto: 1 | 2 }
  | { de: "ganador"; partido: string };

export type PartidoFase = {
  id: string;
  ronda: string;
  local: Plaza;
  visitante: Plaza;
  dia?: string;
  hora?: string;
  campo?: string;
};

export const TRIANGULARES = { A: [1, 3, 6], B: [2, 4, 5] } as const;

function triangular(grupo: "A" | "B"): PartidoFase[] {
  const [primero, segundo, tercero] = TRIANGULARES[grupo];
  const plaza = (puesto: number): Plaza => ({ de: "liguilla", puesto });
  const ronda = `Triangular ${grupo}`;
  const prefijo = `s3-t${grupo.toLowerCase()}`;
  // Abren los dos peor clasificados; el mejor juega los dos últimos
  return [
    { id: `${prefijo}-1`, ronda, local: plaza(segundo), visitante: plaza(tercero) },
    { id: `${prefijo}-2`, ronda, local: plaza(primero), visitante: plaza(tercero) },
    { id: `${prefijo}-3`, ronda, local: plaza(primero), visitante: plaza(segundo) },
  ];
}

export const triangularA = triangular("A");
export const triangularB = triangular("B");

export const semifinales: PartidoFase[] = [
  {
    id: "s3-sf1",
    ronda: "Semifinal 1",
    local: { de: "triangular", grupo: "A", puesto: 1 },
    visitante: { de: "triangular", grupo: "B", puesto: 2 },
  },
  {
    id: "s3-sf2",
    ronda: "Semifinal 2",
    local: { de: "triangular", grupo: "B", puesto: 1 },
    visitante: { de: "triangular", grupo: "A", puesto: 2 },
  },
];

export const final: PartidoFase = {
  id: "s3-final",
  ronda: "Final",
  local: { de: "ganador", partido: "s3-sf1" },
  visitante: { de: "ganador", partido: "s3-sf2" },
};

/** Cómo se llama una plaza mientras no se sabe qué equipo la ocupa */
export function nombrePlaza(plaza: Plaza): string {
  if (plaza.de === "liguilla") return `${plaza.puesto}º liguilla`;
  if (plaza.de === "triangular") return `${plaza.puesto}º triangular ${plaza.grupo}`;
  return plaza.partido === "s3-sf1" ? "Ganador semi 1" : "Ganador semi 2";
}
