import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Battery, MessageCircle, Sun, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { whatsappUrl } from "../lib/utils";

const offerings = [
  { icon: Sun, label: "Solar Panels", desc: "High-efficiency mono & poly panels" },
  { icon: Battery, label: "Power Stations", desc: "EcoFlow, Jackery portable power" },
  { icon: Zap, label: "Inverters", desc: "Pure sine wave hybrid inverters" },
  { icon: Zap, label: "Full Installation", desc: "Professional system design & install" },
];

export default function SolarSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-20 lg:py-28 relative overflow-hidden"
    >
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-[#05050E]" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#05050E] to-[#05050E]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[var(--blue)]/8 blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-px bg-amber-400" />
              <span className="text-xs font-semibold tracking-widest uppercase text-amber-400 font-display">
                Solar & Power
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-5">
              Reliable Power.{" "}
              <span className="text-amber-400">Smarter</span> Living.
            </h2>
            <p className="text-white/60 leading-relaxed mb-8">
              End the frustration of power cuts. Emmytech designs and installs solar systems,
              hybrid inverters, and portable power stations that keep your home or business
              running — even when NEPA fails.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {offerings.map(({ icon: Icon, label, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="p-4 rounded-2xl border border-white/8 bg-white/4 hover:border-amber-400/30 transition-colors"
                >
                  <Icon size={20} className="text-amber-400 mb-2" />
                  <p className="font-display font-semibold text-sm text-white">{label}</p>
                  <p className="text-xs text-white/50 mt-0.5">{desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/shop?category=solar-systems">
                <Button variant="primary" size="md">
                  Shop Power Products <ArrowRight size={16} />
                </Button>
              </Link>
              <a
                href={whatsappUrl("Hello Emmytech, I would like to enquire about a solar/power installation.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="md"
                  className="border-amber-400/50 text-amber-400 hover:bg-amber-400 hover:text-black hover:border-amber-400"
                >
                  <MessageCircle size={16} /> Request Installation
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/8">
              <img
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop&auto=format&q=80"
                alt="Solar panels installed by Emmytech Lagos"
                className="w-full object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40" />
            </div>

            {/* Floating stat */}
            <div className="absolute -bottom-4 -left-4 glass rounded-2xl p-4 border border-amber-400/20">
              <p className="font-display font-black text-2xl text-amber-400">₦0</p>
              <p className="text-xs text-white/60 font-medium">per month power bill<br />after solar payback</p>
            </div>

            <div className="absolute -top-4 -right-4 glass rounded-2xl p-3 border border-white/10">
              <div className="flex items-center gap-2">
                <Sun size={16} className="text-amber-400" />
                <span className="text-xs font-bold text-white font-display">24/7 Clean Power</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
