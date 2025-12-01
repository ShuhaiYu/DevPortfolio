import { SERVICES } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";

export default function Services() {
  return (
    <section id="services" className="py-24 bg-dark relative">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="font-mono text-xs text-slate-300 uppercase tracking-widest">
              System Capabilities
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6">
            ACTIVE{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              PROTOCOLS
            </span>
          </h2>
          <p className="text-slate-400">
            Deploying high-end digital solutions with surgical precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              className="group relative p-8 bg-surface/50 backdrop-blur-sm border border-white/5 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Hover Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 mb-6 flex items-center justify-center bg-dark border border-white/10 group-hover:border-primary group-hover:scale-110 transition-all duration-500 rounded-lg text-white group-hover:text-primary group-hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                  <Icon name={service.iconName} size={32} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 bg-primary"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
