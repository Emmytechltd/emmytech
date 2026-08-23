import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  { value: 10, suffix: "K+", label: "Happy Customers", description: "Across Lagos and Nigeria" },
  { value: 500, suffix: "+", label: "Products Available", description: "Genuine, quality-checked" },
  { value: 24, suffix: "/7", label: "Customer Support", description: "Always here to help" },
  { value: 6, suffix: "+", label: "Years in Business", description: "Trusted Lagos tech brand" },
];

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, value, { duration: 1.8, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, value, motionValue]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (displayRef.current) {
        displayRef.current.textContent = v.toString() + suffix;
      }
    });
  }, [rounded, suffix]);

  return (
    <span ref={displayRef} className="font-display font-black text-4xl lg:text-5xl text-[var(--fg)]">
      0{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
      className="py-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--blue)]/3 via-transparent to-[var(--cyan)]/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="text-center lg:text-left lg:px-8 lg:border-r lg:border-[var(--border)] last:border-none"
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
              <p className="font-display font-bold text-sm text-[var(--fg)] mt-1 mb-0.5">{stat.label}</p>
              <p className="text-xs text-[var(--fg3)]">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
