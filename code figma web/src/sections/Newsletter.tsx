import { motion, useInView } from "framer-motion";
import { FormEvent, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "../components/ui/Button";
import { useToast } from "../context/ToastContext";

export default function Newsletter() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast("You're subscribed! Welcome to the Emmytech inner circle.", "success");
    setEmail("");
  };

  return (
    <section ref={ref} className="py-16 relative overflow-hidden" style={{ background: "var(--bg3)" }}>
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--blue)]/5 to-[var(--cyan)]/5 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="w-12 h-12 rounded-2xl bg-[var(--blue)]/10 flex items-center justify-center mx-auto mb-5">
            <Sparkles size={22} className="text-[var(--blue)]" />
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--fg)] mb-3">
            Stay Ahead of the Tech Curve.
          </h2>
          <p className="text-[var(--fg2)] max-w-xl mx-auto mb-8">
            Get new arrivals, exclusive deals, repair tips and smart technology updates
            delivered straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-3 rounded-xl bg-[var(--bg2)] border border-[var(--border2)] text-[var(--fg)] placeholder:text-[var(--fg3)] text-sm outline-none focus:border-[var(--blue)] transition-colors"
            />
            <Button variant="primary" size="md" type="submit">
              Subscribe <ArrowRight size={16} />
            </Button>
          </form>
          <p className="text-xs text-[var(--fg3)] mt-4">
            No spam, ever. Unsubscribe anytime. Your information is protected.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
