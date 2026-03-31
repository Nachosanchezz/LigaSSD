import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated, login, logout } from "./actions";
import { getJornadasConResultados } from "@/lib/queries";

export const metadata = { robots: "noindex" };

function LoginForm({ error }: { error?: string }) {
  return (
    <div className="min-h-screen bg-[#091f36] flex items-center justify-center px-4">
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

  const jornadas = await getJornadasConResultados();
  const partidos = jornadas.flatMap((j) =>
    j.partidos.map((p) => ({ ...p, jornada: j.numero }))
  );

  const pendientes = partidos.filter((p) => p.estado !== "Finalizado");
  const finalizados = partidos.filter((p) => p.estado === "Finalizado");

  return (
    <div className="min-h-screen bg-slate-100 pb-16">
      {/* Header */}
      <div className="bg-[#091f36] px-4 py-5 flex items-center justify-between shadow-lg">
        <div>
          <h1 className="text-xl font-black text-white uppercase tracking-tight">
            Admin Panel
          </h1>
          <p className="text-blue-300 text-xs mt-0.5">Liga SSD</p>
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
        {/* Pendientes */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
            Pendientes de resultado ({pendientes.length})
          </h2>
          <div className="space-y-2">
            {pendientes.length === 0 ? (
              <p className="text-center text-slate-400 text-sm py-6 bg-white rounded-2xl border border-slate-200">
                Todos los partidos tienen resultado ✓
              </p>
            ) : (
              pendientes.map((p) => (
                <Link
                  key={p.id}
                  href={`/admin/${p.id}`}
                  className="flex items-center justify-between bg-white rounded-2xl border border-slate-200 px-4 py-4 shadow-sm hover:border-[#0b4a6f]/40 hover:shadow-md transition group"
                >
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Jornada {p.jornada}
                    </p>
                    <p className="font-bold text-slate-800 text-sm mt-0.5 group-hover:text-[#0b4a6f] transition">
                      {p.local} vs {p.visitante}
                    </p>
                    {p.dia && (
                      <p className="text-xs text-slate-400 mt-0.5">{p.dia}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        p.estado === "Aplazado"
                          ? "bg-red-100 text-red-600"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {p.estado}
                    </span>
                    <svg
                      className="w-4 h-4 text-slate-400 group-hover:text-[#0b4a6f] transition"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* Finalizados */}
        {finalizados.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-3">
              Con resultado ({finalizados.length})
            </h2>
            <div className="space-y-2">
              {finalizados.map((p) => (
                <Link
                  key={p.id}
                  href={`/admin/${p.id}`}
                  className="flex items-center justify-between bg-white rounded-2xl border border-slate-200 px-4 py-4 shadow-sm hover:border-[#0b4a6f]/40 hover:shadow-md transition group"
                >
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Jornada {p.jornada}
                    </p>
                    <p className="font-bold text-slate-800 text-sm mt-0.5 group-hover:text-[#0b4a6f] transition">
                      {p.local} vs {p.visitante}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-[#0b4a6f] font-mono">
                      {p.resultado}
                    </span>
                    <svg
                      className="w-4 h-4 text-slate-400 group-hover:text-[#0b4a6f] transition"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
