import Link from "next/link";
import type { ReactNode } from "react";
import { isAuthenticated, login, logout } from "./actions";
import type { Partido } from "@/data/tipos";
import { getSplit3, partidosFaseFinal } from "@/lib/split3";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata = { robots: "noindex" };

function LoginForm({ error }: { error?: string }) {
  return (
    <div className="bg-[#091f36] px-4 pt-16 pb-12 flex flex-col items-center">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">⚽</div>
          <h1 className="text-2xl font-black text-white uppercase tracking-tight">
            Admin Liga SSD
          </h1>
          <p className="text-blue-300 text-sm mt-1">Introduce la contraseña</p>
        </div>

        <form action={login} className="space-y-4">
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            autoFocus
            className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/40 text-base focus:outline-none focus:border-yellow-400 focus:bg-white/15 transition"
          />
          {error && (
            <p className="text-red-400 text-sm text-center font-medium">
              Contraseña incorrecta
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded-xl bg-yellow-400 text-[#091f36] font-black py-3 text-base uppercase tracking-wide hover:bg-yellow-300 active:scale-95 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

function Flecha() {
  return (
    <svg className="w-4 h-4 text-slate-400 group-hover:text-[#0b4a6f] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  );
}

// Un partido en las listas del admin. Sin enlace si aún no se sabe quién lo juega.
function FilaAdmin({ partido, etiqueta, editable = true, derecha }: {
  partido: Partido;
  etiqueta: string;
  editable?: boolean;
  derecha: ReactNode;
}) {
  const clase = "flex items-center justify-between bg-white rounded-2xl border border-slate-200 px-4 py-4 shadow-sm transition group";
  const contenido = (
    <>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{etiqueta}</p>
        <p className="font-bold text-slate-800 text-sm mt-0.5 group-hover:text-[#0b4a6f] transition">
          {partido.local} vs {partido.visitante}
        </p>
        {partido.dia && <p className="text-xs text-slate-400 mt-0.5">{partido.dia}</p>}
      </div>
      <div className="flex items-center gap-2">
        {derecha}
        {editable && <Flecha />}
      </div>
    </>
  );

  return editable ? (
    <Link href={`/admin/${partido.id}`} className={`${clase} hover:border-[#0b4a6f]/40 hover:shadow-md`}>
      {contenido}
    </Link>
  ) : (
    <div className={`${clase} opacity-50`} aria-disabled>
      {contenido}
    </div>
  );
}

function Estado({ partido }: { partido: Partido }) {
  if (partido.estado === "Finalizado") {
    return <span className="text-base font-black text-[#0b4a6f] font-mono">{partido.resultado}</span>;
  }
  return (
    <span
      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
        partido.estado === "Aplazado" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-700"
      }`}
    >
      {partido.estado}
    </span>
  );
}

function Seccion({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">{titulo}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const sp = await searchParams;
  const authed = await isAuthenticated();

  if (!authed) {
    return <LoginForm error={sp.error} />;
  }

  const split = await getSplit3();
  const liguilla = split.jornadas.flatMap((j) =>
    j.partidos.map((partido) => ({ partido, etiqueta: `Jornada ${j.numero}` }))
  );
  const faseFinal = partidosFaseFinal(split);

  const pendientes = liguilla.filter(({ partido }) => partido.estado !== "Finalizado");
  const finalizados = [
    ...liguilla,
    ...faseFinal.map((partido) => ({ partido, etiqueta: partido.ronda })),
  ].filter(({ partido }) => partido.estado === "Finalizado");

  return (
    <div className="min-h-screen bg-slate-100 pb-16">
      {/* Header */}
      <div className="bg-[#091f36] px-4 py-5 flex items-center justify-between shadow-lg">
        <div>
          <h1 className="text-xl font-black text-white uppercase tracking-tight">
            Admin Panel
          </h1>
          <p className="text-blue-300 text-xs mt-0.5">Liga SSD · Split 3</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-blue-200 hover:text-yellow-400 text-xs font-bold uppercase tracking-wide transition"
          >
            Ver web
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="text-xs font-bold uppercase tracking-wide text-red-300 hover:text-red-200 transition"
            >
              Salir
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 mt-6 space-y-8">
        <Seccion titulo={`Liguilla · pendientes de resultado (${pendientes.length})`}>
          {pendientes.length === 0 ? (
            <p className="text-center text-slate-400 text-sm py-6 bg-white rounded-2xl border border-slate-200">
              Todos los partidos de la liguilla tienen resultado ✓
            </p>
          ) : (
            pendientes.map(({ partido, etiqueta }) => (
              <FilaAdmin key={partido.id} partido={partido} etiqueta={etiqueta} derecha={<Estado partido={partido} />} />
            ))
          )}
        </Seccion>

        <Seccion titulo="Play-in y playoff">
          {faseFinal.map((partido) => (
            <FilaAdmin
              key={partido.id}
              partido={partido}
              etiqueta={partido.ronda}
              editable={partido.definido}
              derecha={
                partido.definido ? (
                  <Estado partido={partido} />
                ) : (
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-400">
                    Por determinar
                  </span>
                )
              }
            />
          ))}
        </Seccion>

        {finalizados.length > 0 && (
          <Seccion titulo={`Con resultado (${finalizados.length})`}>
            {finalizados.map(({ partido, etiqueta }) => (
              <FilaAdmin key={partido.id} partido={partido} etiqueta={etiqueta} derecha={<Estado partido={partido} />} />
            ))}
          </Seccion>
        )}
      </div>
    </div>
  );
}
