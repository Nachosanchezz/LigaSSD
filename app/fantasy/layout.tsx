import SplitSubnav, { type EnlaceSplit } from "@/components/SplitSubnav";

const enlaces: EnlaceSplit[] = [
  { nombre: "Portada", ruta: "/fantasy" },
  { nombre: "Mi cinco", ruta: "/fantasy/equipo" },
  { nombre: "Clasificación", ruta: "/fantasy/clasificacion" },
  { nombre: "Reglas", ruta: "/fantasy/reglas" },
];

export const metadata = {
  title: "Fantasy · Liga SSD",
  description: "El fantasy del Split 3: elige tu cinco cada jornada.",
};

export default function FantasyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SplitSubnav titulo="Fantasy" enlaces={enlaces} />
      {children}
    </>
  );
}
