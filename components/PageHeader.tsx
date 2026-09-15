export default function PageHeader({
  title,
  subtitle,
  kicker,
}: {
  title: string;
  subtitle: string;
  /** Sobretítulo pequeño en mono, p. ej. "Split 3" */
  kicker?: string;
}) {
  return (
    <div className="relative overflow-hidden border-b-4 border-yellow-400 bg-[#091f36] px-4 sm:px-6 pt-10 sm:pt-14 pb-20 sm:pb-24 text-center">
      {/* Trama diagonal y halo, como un rótulo de televisión */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "repeating-linear-gradient(115deg, #fff 0 2px, transparent 2px 16px)" }}
        aria-hidden
      />
      <div className="absolute -top-28 left-1/2 h-64 w-[38rem] -translate-x-1/2 rounded-full bg-[#0b4a6f]/70 blur-3xl" aria-hidden />

      <div className="relative">
        {kicker && (
          <p className="font-mono text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em] text-yellow-400">
            {kicker}
          </p>
        )}
        <h1 className="mt-2 text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 drop-shadow-sm">
          {title}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
