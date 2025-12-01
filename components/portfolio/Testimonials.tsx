import { TESTIMONIALS } from "@/lib/constants";
import { MessageSquare, Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-24 bg-dark border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white flex items-center gap-4">
            <MessageSquare className="text-secondary" />
            INCOMING <span className="text-slate-700">TRANSMISSIONS</span>
          </h2>
          <div className="hidden md:block h-[1px] flex-1 bg-white/10 ml-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="relative bg-surface p-8 border-l-2 border-slate-800 hover:border-accent transition-colors duration-300 group"
            >
              <Quote className="absolute top-6 right-6 text-white/5 w-12 h-12 group-hover:text-accent/10 transition-colors" />

              <div className="mb-6 relative z-10">
                <p className="text-slate-300 font-mono text-sm leading-loose">
                  &quot;{t.text}&quot;
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full flex items-center justify-center text-xs font-bold text-white border border-white/10">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{t.name}</div>
                  <div className="text-xs font-mono text-primary">
                    {t.role} @ {t.company}
                  </div>
                </div>
              </div>

              {/* Tech Lines */}
              <div className="absolute bottom-0 right-0 w-20 h-[2px] bg-gradient-to-l from-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
