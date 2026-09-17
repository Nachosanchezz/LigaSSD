"use client";

import { useEffect, useState } from "react";

const UNIDADES = [
  { etiqueta: "d", ms: 86400000 },
  { etiqueta: "h", ms: 3600000 },
  { etiqueta: "m", ms: 60000 },
  { etiqueta: "s", ms: 1000 },
];

/**
 * Lo que queda para que cierre el mercado. Empieza vacía y se rellena en el
 * navegador, para que el servidor y el cliente pinten lo mismo.
 */
export default function CuentaAtrasCierre({ cierre }: { cierre: string }) {
  const [restante, setRestante] = useState<number | null>(null);

  useEffect(() => {
    const calcular = () => setRestante(Math.max(0, new Date(cierre).getTime() - Date.now()));
    calcular();
    const reloj = setInterval(calcular, 1000);
    return () => clearInterval(reloj);
  }, [cierre]);

  if (restante === null) return <span className="tabular-nums text-yellow-400">··· ··· ···</span>;
  if (restante === 0) return <span className="text-red-300">Mercado cerrado</span>;

  const trozos: string[] = [];
  let resto = restante;
  for (const { etiqueta, ms } of UNIDADES) {
    const valor = Math.floor(resto / ms);
    resto -= valor * ms;
    if (valor > 0 || trozos.length > 0) trozos.push(`${valor}${etiqueta}`);
  }

  return <span className="tabular-nums text-yellow-400">{trozos.slice(0, 3).join(" ")}</span>;
}
