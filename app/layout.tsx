import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Liga SSD",
  description: "Web oficial de la Liga SSD",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
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