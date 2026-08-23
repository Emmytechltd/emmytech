import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Camera, Globe, Layers, Monitor, Sun, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/ui/SectionHeading";

const icons: Record<string, React.ElementType> = {
  camera: Camera, sun: Sun, wrench: Wrench, monitor: Monitor, globe: Globe, layers: Layers,
};

const serviceHighlights = [
  { slug: "cctv-installation", name: "CCTV Installation", icon: "camera", color: "blue", desc: "Professional design, supply and installation for homes and businesses." },
  { slug: "solar-power-installation", name: "Solar & Power", icon: "sun", color: "amber", desc: "End power frustration with a custom solar or inverter system." },
  { slug: "laptop-phone-repairs", name: "Device Repairs", icon: "wrench", color: "green", desc: "Fast, certified repairs with genuine parts and warranty." },
  { slug: "software-installation", name: "Software Setup", icon: "monitor", color: "purple", desc: "Windows, Office, antivirus and any software — correctly installed." },
  { slug: "website-development", name: "Website Development", icon: "globe", color: "cyan", desc: "Modern, fast business websites built to convert visitors into customers." },
  { slug: "digital-solutions", name: "Digital Solutions", icon: "layers", color: "blue", desc: "IT consulting, cloud setup, network installation and digital transformation." },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-500/10 text-[var(--blue)]",
  amber: "bg-amber-500/10 text-[var(--amber)]",
  green: "bg-emerald-500/10 text-[var(--green)]",
  purple: "bg-purple-500/10 text-purple-400",
  cyan: "bg-cyan-500/10 text-[var(--cyan)]",
};

export default function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 lg:py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <SectionHeading
            eyebrow="Services"
            title="Expert Technology Services"
            subtitle="Beyond selling products — Emmytech provides complete technology solutions for homes and businesses."
            align="left"
          />
          <Link
            to="/services"
            className="flex items-center gap-2 text-sm font-semibold text-[var(--blue)] hover:gap-3 transition-all shrink-0"
          >
            All Services <ArrowRight size={15} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceHighlights.map((service, i) => {
            const Icon = icons[service.icon] || Camera;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  to="/services"
                  className="group block p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] hover:border-[var(--blue)]/40 transition-all duration-300 hover:shadow-[0_8px_40px_var(--glow)] h-full"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${colorMap[service.color] || colorMap.blue}`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-display font-bold text-base text-[var(--fg)] group-hover:text-[var(--blue)] transition-colors mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-[var(--fg2)] leading-relaxed mb-4">{service.desc}</p>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--blue)] group-hover:gap-2.5 transition-all">
                    Learn More <ArrowRight size={13} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
