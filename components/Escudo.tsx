import Image from "next/image";

export type DatosEscudo = { logo?: string; color?: string };

type Props = DatosEscudo & {
  nombre: string;
  size?: number;
  className?: string;
};

// Escudo de un equipo. Los del Split 3 todavía no tienen: mientras tanto,
// un círculo de su color con la inicial.
export default function Escudo({ nombre, logo, color = "#0b4a6f", size = 32, className = "" }: Props) {
  if (logo) {
    return (
      <Image src={logo} alt={nombre} width={size} height={size} className={`h-full w-full object-contain ${className}`} />
    );
  }

  return (
    <span
      role="img"
      aria-label={nombre}
      className={`flex h-full w-full items-center justify-center rounded-full font-black leading-none text-white ${className}`}
      style={{ backgroundColor: color, fontSize: Math.max(10, Math.round(size * 0.45)) }}
    >
      {nombre.charAt(0)}
    </span>
  );
}
