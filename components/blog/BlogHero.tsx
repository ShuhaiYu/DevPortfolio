export default function BlogHero() {
  return (
    <section className="relative py-20 sm:py-32 bg-dark overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="px-3 py-1 bg-primary/10 border border-primary/30 text-primary font-mono text-xs uppercase tracking-widest rounded-full">
            // DATA_LOG
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white mb-4 tracking-tighter">
          DIGITAL <span className="text-slate-600">JOURNAL</span>
        </h1>

        <p className="text-slate-400 max-w-2xl">
          Thoughts on web development, AI integration, and building the future
          of the internet.
        </p>
      </div>
    </section>
  );
}
