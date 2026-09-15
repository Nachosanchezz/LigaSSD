import SplitSubnav, { type EnlaceSplit } from "@/components/SplitSubnav";

const enlaces: EnlaceSplit[] = [
  { nombre: "Resumen", ruta: "/split1" },
  { nombre: "Clasificación", ruta: "/split1/clasificacion" },
  { nombre: "Partidos", ruta: "/split1/partidos" },
  { nombre: "Estadísticas", ruta: "/split1/estadisticas" },
];

export default function Split1Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SplitSubnav titulo="Split 1" enlaces={enlaces} />
      {children}
    </>
  );
}
