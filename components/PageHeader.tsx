export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="bg-[#091f36] pt-12 sm:pt-16 pb-20 sm:pb-24 px-4 sm:px-6 text-center border-b border-indigo-900/30">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 drop-shadow-sm">
        {title}
      </h1>
      <p className="mt-2 sm:mt-4 text-blue-200 font-medium max-w-2xl mx-auto uppercase tracking-wide text-[10px] sm:text-sm">
        {subtitle}
      </p>
    </div>
  );
}
