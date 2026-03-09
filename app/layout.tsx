import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Liga SSD",
  description: "Web oficial de la Liga SSD",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}