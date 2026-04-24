"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import type { Noticia } from "@/data/noticias";

const etiquetaColors: Record<string, string> = {
  EXCLUSIVA: "bg-red-600 text-white",
  BREAKING: "bg-red-600 text-white",
  RUMOR: "bg-yellow-400 text-[#091f36]",
  ANÁLISIS: "bg-[#0b4a6f] text-white",
  OPINIÓN: "bg-slate-600 text-white",
};

function Modal({ noticia, onClose }: { noticia: Noticia; onClose: () => void }) {
  // Bloquear scroll del body mientras el modal está abierto
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <article
        className="relative bg-white w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto rounded-t-2xl sm:rounded-sm shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle visual en móvil */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden shrink-0">
          <div className="w-10 h-1 rounded-full bg-slate-300" />
        </div>

        {/* Cabecera */}
        <div className="bg-[#091f36] px-5 py-3 flex items-center justify-between shrink-0">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-400">
            La Prensa del Vestuario
          </span>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-base leading-none transition-colors p-2 -mr-2 touch-manipulation"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Imagen */}
        {noticia.imagen && (
          <div className="relative w-full aspect-video bg-slate-100 shrink-0">
            <Image
              src={noticia.imagen}
              alt={noticia.titular}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}

        {/* Contenido */}
        <div className="p-5 sm:p-8 space-y-4 overflow-y-auto">
          <div className="flex items-center gap-3 flex-wrap">
            {noticia.etiqueta && (
              <span className={`${etiquetaColors[noticia.etiqueta] ?? "bg-slate-600 text-white"} text-[10px] font-black uppercase tracking-widest px-2 py-0.5`}>
                {noticia.etiqueta}
              </span>
            )}
            <span className="text-xs font-medium text-slate-400">{noticia.fecha}</span>
          </div>

          <div className="border-t-4 border-[#091f36] pt-4">
            <h2 className="font-black text-slate-900 text-xl sm:text-3xl leading-tight uppercase tracking-tight">
              {noticia.titular}
            </h2>
            {noticia.subtitular && (
              <p className="mt-2 text-sm sm:text-base font-semibold text-slate-500 italic">
                {noticia.subtitular}
              </p>
            )}
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
            {noticia.cuerpo}
          </p>

          {noticia.equipoSlug && (
            <div className="pt-2 border-t border-slate-100 pb-2">
              <Link
                href={`/equipos/${noticia.equipoSlug}`}
                onClick={onClose}
                className="text-[11px] font-black uppercase tracking-widest text-[#0b4a6f] hover:text-yellow-500 transition-colors"
              >
                Ver equipo →
              </Link>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

function TarjetaNoticia({ noticia, onClick }: { noticia: Noticia; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex-shrink-0 w-[78vw] sm:w-64 md:w-72 text-left bg-white border border-slate-200 shadow-md active:scale-95 sm:hover:shadow-xl sm:hover:-translate-y-1 transition-all duration-300 rounded-sm overflow-hidden snap-start focus:outline-none focus:ring-2 focus:ring-[#091f36] touch-manipulation"
    >
      <div className="relative w-full aspect-video bg-slate-100 overflow-hidden">
        {noticia.imagen ? (
          <Image
            src={noticia.imagen}
            alt={noticia.titular}
            fill
            className="object-cover sm:group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#091f36] to-[#0b4a6f]">
            <span className="text-4xl font-black text-white/10 uppercase">SSD</span>
          </div>
        )}
        {noticia.etiqueta && (
          <span className={`absolute top-2 left-2 ${etiquetaColors[noticia.etiqueta] ?? "bg-slate-600 text-white"} text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5`}>
            {noticia.etiqueta}
          </span>
        )}
      </div>

      <div className="p-3 border-t-4 border-[#091f36]">
        <h3 className="font-black text-slate-900 text-sm leading-tight uppercase tracking-tight line-clamp-3">
          {noticia.titular}
        </h3>
        <p className="mt-2 text-[10px] font-medium text-slate-400">{noticia.fecha}</p>
      </div>
    </button>
  );
}

export default function NoticiasCarrusel({ noticias }: { noticias: Noticia[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [noticiaAbierta, setNoticiaAbierta] = useState<Noticia | null>(null);

  const scroll = (dir: "left" | "right") => {
    if (!ref.current) return;
    const amount = ref.current.clientWidth * 0.8;
    ref.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  if (noticias.length === 0) return null;

  return (
    <>
      {noticiaAbierta && (
        <Modal noticia={noticiaAbierta} onClose={() => setNoticiaAbierta(null)} />
      )}

      <section className="relative py-10 sm:py-16 bg-slate-50 border-t border-slate-200 overflow-hidden">
        {/* Cabecera estilo periódico */}
        <div className="px-4 sm:px-6 mx-auto max-w-6xl mb-5">
          <div className="flex items-end justify-between gap-4 border-b-4 border-[#091f36] pb-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                Liga SSD · Torrelodones
              </p>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#091f36] leading-none mt-0.5">
                La Prensa del Vestuario
              </h2>
            </div>
            {/* Flechas solo en desktop */}
            <div className="hidden sm:flex gap-2 shrink-0">
              <button
                onClick={() => scroll("left")}
                aria-label="Anterior"
                className="h-9 w-9 rounded-full border-2 border-[#091f36] flex items-center justify-center text-[#091f36] hover:bg-[#091f36] hover:text-white transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Siguiente"
                className="h-9 w-9 rounded-full border-2 border-[#091f36] flex items-center justify-center text-[#091f36] hover:bg-[#091f36] hover:text-white transition-colors"
              >
                →
              </button>
            </div>
          </div>
          {/* Subtextos solo en desktop */}
          <div className="hidden sm:flex gap-4 mt-1 border-b border-slate-300 pb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Edición Especial</span>
            <span className="text-[10px] text-slate-300">·</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Noticias sin filtro</span>
            <span className="text-[10px] text-slate-300">·</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Fuentes anónimas</span>
          </div>
          {/* Hint de swipe solo en móvil */}
          <p className="sm:hidden mt-2 text-[10px] font-medium text-slate-400 tracking-wide">
            Desliza para ver más →
          </p>
        </div>

        {/* Carrusel — sangra hasta el borde en móvil */}
        <div
          ref={ref}
          className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 px-4 sm:px-6 sm:mx-auto sm:max-w-6xl overscroll-x-contain"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {noticias.map((noticia) => (
            <TarjetaNoticia
              key={noticia.id}
              noticia={noticia}
              onClick={() => setNoticiaAbierta(noticia)}
            />
          ))}
          {/* Spacer final para que la última card no quede pegada al borde */}
          <div className="flex-shrink-0 w-2 sm:hidden" aria-hidden />
        </div>
      </section>
    </>
  );
}
