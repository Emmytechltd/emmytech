import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Award, Clock, HeartHandshake, Package, Shield, Star, Truck, Wrench,
} from "lucide-react";
import SectionHeading from "../components/ui/SectionHeading";

const reasons = [
  {
    icon: Package,
    title: "100% Genuine Products",
    desc: "Every product we sell is authentic, sourced from verified distributors with original warranties.",
  },
  {
    icon: Award,
    title: "Certified Technicians",
    desc: "Our engineers are trained and certified in CCTV, solar, and device repair.",
  },
  {
    icon: Shield,
    title: "Transparent Pricing",
    desc: "No surprises. You get a full quote before we start any job.",
  },
  {
    icon: Truck,
    title: "Fast Lagos Delivery",
    desc: "Same-day and next-day delivery across Lagos for online orders.",
  },
  {
    icon: Clock,
    title: "After-Sales Support",
    desc: "We don't disappear after the sale. We're always here to help.",
  },
  {
    icon: Wrench,
    title: "Repair Warranty",
    desc: "All repairs come with a 3-month warranty for your peace of mind.",
  },
  {
    icon: Star,
    title: "Premium Brands Only",
    desc: "Apple, Samsung, Dell, Hikvision, EcoFlow — we sell and service the best.",
  },
  {
    icon: HeartHandshake,
    title: "Trusted by 10,000+ Customers",
    desc: "A Lagos tech brand you can rely on — for products and professional service.",
  },
];

export default function WhyEmmytech() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 lg:py-28" style={{ background: "var(--bg3)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionHeading
            eyebrow="Why Us"
            title="Why Choose Emmytech?"
            subtitle="We've built our reputation on trust, quality and expert technology knowledge since we opened in Ikeja."
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] hover:border-[var(--blue)]/30 hover:shadow-[0_4px_24px_var(--glow)] transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--blue)]/10 flex items-center justify-center mb-4 group-hover:bg-[var(--blue)]/20 transition-colors">
                <Icon size={18} className="text-[var(--blue)]" />
              </div>
              <h3 className="font-display font-bold text-sm text-[var(--fg)] mb-2">{title}</h3>
              <p className="text-xs text-[var(--fg3)] leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
