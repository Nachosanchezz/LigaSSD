import type { Metadata } from "next";
import { Barlow, Barlow_Condensed, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

// Tipografía de retransmisión deportiva: rótulos condensados en cursiva,
// texto en Barlow y números en mono para que las tablas cuadren.
const cuerpo = Barlow({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const rotulo = Barlow_Condensed({
  variable: "--font-condensed",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const numeros = IBM_Plex_Mono({
  variable: "--font-numeric",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: { default: "Liga SSD", template: "%s · Liga SSD" },
  description: "Web oficial de la Liga SSD · Fútbol sala en Torrelodones",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cuerpo.variable} ${rotulo.variable} ${numeros.variable}`}>
      <body className="relative min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-yellow-400 selection:text-blue-950">

        {/* Logo de fondo */}
        <div
          className="fixed inset-0 bg-center bg-no-repeat bg-contain opacity-5 pointer-events-none mix-blend-multiply"
          style={{ backgroundImage: "url('/logo.png')" }}
        />

        <Navbar />

        <main className="relative z-10 flex flex-col min-h-[calc(100vh-80px)]">
          {children}
        </main>

      </body>
    </html>
  );
}
