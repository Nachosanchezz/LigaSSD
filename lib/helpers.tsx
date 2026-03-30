export function nombreCompletoJugador(jugador: {
  nombre: string;
  primerApellido?: string;
  segundoApellido?: string;
}) {
  return [jugador.nombre, jugador.primerApellido, jugador.segundoApellido]
    .filter((parte) => parte && parte.trim() !== "")
    .join(" ");
}

export function getRankTrophy(index: number) {
  if (index === 0) return "🥇";
  if (index === 1) return "🥈";
  if (index === 2) return "🥉";
  return <span className="text-slate-400 font-mono text-sm sm:text-base font-bold">{index + 1}</span>;
}
