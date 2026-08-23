import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { whatsappUrl } from "../lib/utils";

const repairs = [
  "Screen Replacement",
  "Battery Replacement",
  "Keyboard Repair",
  "OS Installation",
  "Virus Removal",
  "Water Damage",
  "SSD / RAM Upgrade",
  "Hardware Diagnostics",
];

export default function RepairSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 lg:py-28 relative overflow-hidden" style={{ background: "var(--bg2)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-[var(--border2)]">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop&auto=format&q=80"
                alt="Expert laptop repair at Emmytech Digital Solutions"
                className="w-full object-cover aspect-[4/3]"
              />
            </div>
            <div className="absolute bottom-6 left-6 glass rounded-2xl px-5 py-4 shadow-[var(--shadow-lg)]">
              <p className="font-display font-black text-xl text-[var(--fg)]">Same-Day Repairs</p>
              <p className="text-xs text-[var(--fg3)] mt-0.5">Most standard repairs completed in hours</p>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-6 h-px bg-[var(--blue)]" />
              <span className="text-xs font-semibold tracking-widest uppercase text-[var(--blue)] font-display">
                Repair Services
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-[var(--fg)] leading-tight mb-5">
              Don't Replace It.{" "}
              <span className="gradient-text">Repair It.</span>
            </h2>
            <p className="text-[var(--fg2)] leading-relaxed mb-8">
              Emmytech's certified technicians repair all laptop and smartphone brands with
              genuine parts and a repair warranty. We diagnose fast, fix it right, and
              get your device back to you the same day.
            </p>

            {/* Repair tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {repairs.map((r, i) => (
                <motion.span
                  key={r}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="px-3 py-1.5 rounded-full border border-[var(--border2)] text-xs font-medium text-[var(--fg2)]"
                >
                  {r}
                </motion.span>
              ))}
            </div>

            <div className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg3)] mb-6">
              <p className="text-sm font-semibold text-[var(--fg)] font-display mb-1">Starting from ₦8,000</p>
              <p className="text-xs text-[var(--fg3)]">
                Transparent pricing · No hidden charges · 3-month repair warranty
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/services">
                <Button variant="primary" size="md">
                  Book a Repair <ArrowRight size={16} />
                </Button>
              </Link>
              <a
                href={whatsappUrl("Hello Emmytech, I would like to book a repair for my device.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="md">
                  <MessageCircle size={16} /> WhatsApp Us
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
