"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { name: "Clasificación", path: "/clasificacion" },
    { name: "Jornadas", path: "/jornadas" },
    { name: "Estadísticas", path: "/estadisticas" },
    { name: "Jugadores", path: "/jugadores" },
    { name: "Equipos", path: "/equipos" },
    { name: "Split 1", path: "/split1" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-indigo-900/20 bg-[#091f36]/95 backdrop-blur-md shadow-xl text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo Section */}
        <Link href="/" className="group flex items-center gap-3 sm:gap-4 transition-transform hover:scale-105 active:scale-95" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="relative flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center overflow-hidden rounded-full bg-white/10 p-1 shadow-inner ring-2 ring-white/20 transition-all duration-300 group-hover:ring-yellow-400 group-hover:shadow-[0_0_15px_rgba(250,204,21,0.5)]">
            <Image
              src="/logo.png"
              alt="Liga SSD"
              width={56}
              height={56}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-300">
              Liga SSD
            </span>
            <span className="hidden sm:inline text-[0.65rem] font-medium tracking-[0.2em] text-yellow-500 uppercase opacity-90">
              Torneo de Fútbol Sala
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="relative px-4 py-2 text-sm font-semibold tracking-wide text-gray-200 transition-colors hover:text-white group uppercase"
            >
              {link.name}
              <span className="absolute inset-x-4 -bottom-1 h-0.5 scale-x-0 bg-yellow-400 transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden flex items-center justify-center p-2 text-gray-200 hover:text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#091f36]/95 backdrop-blur-md border-b border-indigo-900/20 shadow-xl">
          <div className="flex flex-col px-4 py-4 space-y-2">
            {links.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-base font-semibold tracking-wide text-gray-200 hover:bg-white/10 hover:text-white uppercase transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}