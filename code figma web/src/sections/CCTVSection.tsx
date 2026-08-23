import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Eye, MessageCircle, Moon, Shield, Wifi } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { whatsappUrl } from "../lib/utils";

const features = [
  { icon: Eye, label: "Remote Monitoring", desc: "Watch your property from anywhere via mobile app" },
  { icon: Moon, label: "Night Vision", desc: "Full-colour 24/7 recording in total darkness" },
  { icon: Shield, label: "AI Detection", desc: "Smart motion alerts — no false alarms" },
  { icon: Wifi, label: "Smart Cameras", desc: "Wi-Fi & PoE IP cameras for homes and businesses" },
];

export default function CCTVSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-transparent to-[var(--blue)]/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-3xl overflow-hidden border border-[var(--border2)]">
              <img
                src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&h=600&fit=crop&auto=format&q=80"
                alt="CCTV security installation by Emmytech"
                className="w-full object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent" />
            </div>

            {/* Glass overlay card */}
            <div className="absolute bottom-6 right-6 glass rounded-2xl p-4 shadow-[var(--shadow-lg)]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[var(--green)] animate-pulse" />
                <span className="text-xs font-bold text-[var(--fg)] font-display">Live Monitoring Active</span>
              </div>
              <p className="text-xs text-[var(--fg3)]">4 cameras · All feeds secure</p>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-px bg-[var(--blue)]" />
              <span className="text-xs font-semibold tracking-widest uppercase text-[var(--blue)] font-display">
                Security Systems
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[var(--fg)] leading-tight mb-5">
              Secure What{" "}
              <span className="gradient-text">Matters Most.</span>
            </h2>
            <p className="text-[var(--fg2)] leading-relaxed mb-8">
              Protect your home, shop, office or warehouse with a professional CCTV system
              installed by Emmytech's certified security engineers. We design, supply and
              install systems that give you total visibility — day or night.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map(({ icon: Icon, label, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex gap-3 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] hover:border-[var(--blue)]/30 transition-colors"
                >
                  <div className="w-9 h-9 rounded-xl bg-[var(--blue)]/10 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-[var(--blue)]" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-sm text-[var(--fg)]">{label}</p>
                    <p className="text-xs text-[var(--fg3)] mt-0.5">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/shop?category=cctv">
                <Button variant="primary" size="md">
                  Shop CCTV Products <ArrowRight size={16} />
                </Button>
              </Link>
              <a href={whatsappUrl("Hello Emmytech, I would like to get a CCTV installation quote.")} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="md">
                  <MessageCircle size={16} /> Get a Free Quote
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
