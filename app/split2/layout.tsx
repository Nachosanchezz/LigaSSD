import SplitSubnav, { type EnlaceSplit } from "@/components/SplitSubnav";

const enlaces: EnlaceSplit[] = [
  { nombre: "Resumen", ruta: "/split2" },
  { nombre: "Clasificación", ruta: "/split2/clasificacion" },
  { nombre: "Jornadas", ruta: "/split2/jornadas" },
  { nombre: "Playoffs", ruta: "/split2/playoffs" },
  { nombre: "Estadísticas", ruta: "/split2/estadisticas" },
  { nombre: "Equipos", ruta: "/split2/equipos" },
  { nombre: "Jugadores", ruta: "/split2/jugadores" },
];

export default function Split2Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SplitSubnav titulo="Split 2" enlaces={enlaces} />
      {children}
    </>
  );
}
