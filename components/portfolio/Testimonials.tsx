import { TESTIMONIALS } from "@/lib/constants";
import { MessageSquare } from "lucide-react";

export default function Testimonials() {
  const [featured, ...supporting] = TESTIMONIALS;

  return (
    <section className="py-24 sm:py-32 bg-dark border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Asymmetric header */}
        <div className="flex items-end justify-between mb-16 sm:mb-20 gap-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white flex items-center gap-4 tracking-tight">
            <MessageSquare className="text-secondary w-6 h-6" />
            Incoming <span className="text-slate-500">Transmissions</span>
          </h2>
          <div className="hidden md:block font-mono text-xs text-slate-500 uppercase tracking-widest pb-2">
            // {TESTIMONIALS.length} Records
          </div>
        </div>

        {/* Featured + supporting — magazine pull-quote layout */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          {/* Featured large quote */}
          <figure className="md:col-span-7 relative">
            <div className="absolute -top-6 -left-2 font-heading text-7xl sm:text-8xl text-primary/30 leading-none select-none">
              &ldquo;
            </div>
            <blockquote className="relative pt-6">
              <p className="font-heading text-2xl sm:text-3xl md:text-4xl text-white leading-[1.25] tracking-tight">
                {featured.text}
              </p>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <div className="w-10 h-10 bg-surface border border-white/10 rounded-full flex items-center justify-center text-xs font-bold text-white">
                {featured.name.charAt(0)}
              </div>
              <div>
                <div className="text-white font-bold text-sm">{featured.name}</div>
                <div className="text-xs font-mono text-primary">
                  {featured.role} @ {featured.company}
                </div>
              </div>
            </figcaption>
          </figure>

          {/* Supporting stacked quotes */}
          <div className="md:col-span-5 flex flex-col gap-8 md:border-l md:border-white/5 md:pl-10">
            {supporting.map((t) => (
              <figure key={t.id} className="group">
                <blockquote>
                  <p className="text-slate-300 text-base leading-relaxed italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-4 flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-8 h-8 bg-surface border border-white/10 rounded-full flex items-center justify-center text-[10px] font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-bold text-xs">{t.name}</div>
                    <div className="text-[10px] font-mono text-slate-500">
                      {t.role} @ {t.company}
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
