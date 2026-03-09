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
      <body className="relative min-h-screen bg-[#f7f3e9]">

        {/* Logo de fondo */}
        <div
          className="fixed inset-0 bg-center bg-no-repeat bg-contain opacity-10 pointer-events-none"
          style={{ backgroundImage: "url('/logo.png')" }}
        />

        <Navbar />

        <main className="relative z-10">
          {children}
        </main>

      </body>
    </html>
  );
}