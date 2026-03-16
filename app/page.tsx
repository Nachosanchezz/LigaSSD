import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex w-full flex-1 flex-col pb-8">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] md:min-h-[70vh] items-center justify-center overflow-hidden bg-[#091f36] px-4 py-16 sm:py-24 text-center shadow-2xl">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute -left-1/4 -top-1/4 h-[400px] w-[400px] sm:h-[800px] sm:w-[800px] rounded-full bg-[#0b4a6f]/30 blur-[80px] sm:blur-[120px]"></div>
          <div className="absolute -bottom-1/4 -right-1/4 h-[300px] w-[300px] sm:h-[600px] sm:w-[600px] rounded-full bg-yellow-400/10 blur-[60px] sm:blur-[100px]"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl space-y-6 sm:space-y-8">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 shadow-xl px-3 sm:px-4 py-1.5 text-[0.65rem] sm:text-xs font-semibold uppercase tracking-wider text-yellow-400 backdrop-blur-md">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-yellow-500"></span>
            </span>
            Temporada Actual en Juego
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-white leading-none drop-shadow-xl">
            La Pasión del <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
              Fútbol Sala
            </span>
          </h1>
          
          <p className="mx-auto max-w-2xl px-2 text-base sm:text-lg md:text-xl text-blue-100 font-medium drop-shadow-md">
            Más que una competición. Una excusa perfecta para reunirnos, disfrutar del deporte, y ganar puntos en la cancha.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 pt-4 sm:flex-row w-full max-w-md mx-auto sm:max-w-none">
            <Link
              href="/clasificacion"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-yellow-400 px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-bold uppercase tracking-wide text-[#091f36] shadow-[0_0_20px_rgba(250,204,21,0.3)] transition-all hover:bg-yellow-300 hover:scale-105 active:scale-95"
            >
              Ver Clasificación
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link
              href="/jornadas"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/20 bg-white/5 px-6 sm:px-8 py-3.5 sm:py-4 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10 active:scale-95"
            >
              Últimos Resultados
            </Link>
          </div>
        </div>

        {/* Diagonal cut effect for modern look */}
        <div className="absolute -bottom-1 left-0 right-0 h-10 sm:h-16 w-full bg-slate-50 [clip-path:polygon(0_100%,100%_0,100%_100%)]"></div>
      </section>

      {/* About Section */}
      <section className="relative z-20 px-4 sm:px-6 py-16 sm:py-20 bg-slate-50">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            
            {/* Story */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2 text-center lg:text-left">
                <h2 className="text-xs sm:text-sm font-bold tracking-widest text-[#0b4a6f] uppercase">Quiénes somos</h2>
                <h3 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Nuestra <span className="text-[#091f36]">Historia</span>
                </h3>
              </div>
              
              <div className="space-y-4 sm:space-y-5 text-base sm:text-lg leading-relaxed text-slate-600">
                <p>
                  La <strong className="text-slate-900">Liga SSD</strong> nace de algo muy sencillo: dos amigos con ganas de
                  desconectar durante un rato de los estudios, el trabajo y el ritmo
                  diario. Lo que empezó como una idea para echar un partido a la semana
                  terminó convirtiéndose en una pequeña competición.
                </p>
                
                <div className="flex gap-3 sm:gap-4">
                  <div className="flex-1 rounded-2xl border-2 border-slate-100 bg-white p-4 sm:p-6 shadow-sm text-center lg:text-left">
                    <div className="text-3xl sm:text-4xl font-black text-[#0b4a6f]">7</div>
                    <div className="mt-1 text-xs sm:text-sm font-bold uppercase tracking-wide text-slate-500">Franquicias</div>
                  </div>
                  <div className="flex-1 rounded-2xl border-2 border-slate-100 bg-white p-4 sm:p-6 shadow-sm text-center lg:text-left">
                    <div className="text-3xl sm:text-4xl font-black text-yellow-500">50+</div>
                    <div className="mt-1 text-xs sm:text-sm font-bold uppercase tracking-wide text-slate-500">Jugadores</div>
                  </div>
                </div>

                <p>
                  Celebramos nuestros partidos en <strong>Torrelodones</strong>, con un mismo objetivo:
                  disfrutar del fútbol sala dentro y fuera de la pista. Cada semana hay partidos intensos y
                  muy disputados, donde cualquiera puede ganar a cualquiera.
                </p>
              </div>
            </div>

            {/* Spirit */}
            <div className="relative rounded-[2rem] bg-[#091f36] p-6 sm:p-10 lg:p-12 text-white shadow-2xl overflow-hidden">
              <div className="absolute -right-20 -top-20 h-48 w-48 sm:h-64 sm:w-64 rounded-full bg-[#0b4a6f] blur-[60px] sm:blur-[80px]"></div>
              
              <div className="relative z-10 space-y-5 sm:space-y-6">
                <h3 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl lg:text-4xl text-center lg:text-left">
                  El <span className="text-yellow-400">Espíritu</span>
                </h3>
                
                <div className="space-y-3 sm:space-y-4 text-blue-100 text-base sm:text-lg">
                  <p>
                    Aunque el objetivo principal es disfrutar y compartir un
                    buen momento, el espíritu competitivo también está muy presente.
                    Cada partido cuenta, y todos luchan por sumar puntos.
                  </p>
                  <p>
                    Venimos a pasarlo bien… <strong>pero si se puede ganar, mejor todavía.</strong>
                  </p>
                </div>
                
                <div className="mt-6 sm:mt-8 rounded-xl bg-white/10 p-5 sm:p-6 border border-white/20 backdrop-blur-sm">
                  <p className="font-medium italic text-white/90 text-center text-sm sm:text-base">
                    "Más que una simple competición, esta liga es un espacio donde el fútbol
                    sirve para desconectar y competir de forma sana."
                  </p>
                </div>
                
                <p className="pt-2 sm:pt-4 text-xs sm:text-sm text-blue-200/80 text-center lg:text-left">
                  Aquí podrás consultar resultados, jornadas, clasificación, equipos y jugadores, para estar al día de 
                  todo lo que ocurre.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* Mini Footer */}
      <footer className="mt-auto py-6 sm:py-8 text-center text-xs sm:text-sm font-medium text-slate-400">
        <p>© {new Date().getFullYear()} Liga SSD. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}