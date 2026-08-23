import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "../data/testimonials";
import Rating from "../components/ui/Rating";
import SectionHeading from "../components/ui/SectionHeading";

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a === 0 ? testimonials.length - 1 : a - 1));
  const next = () => setActive((a) => (a === testimonials.length - 1 ? 0 : a + 1));

  return (
    <section ref={ref} className="py-20 lg:py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12"
        >
          <SectionHeading
            eyebrow="Reviews"
            title="What Customers Say"
            subtitle="Real reviews from real customers across Lagos. We let our work speak for itself."
          />
        </motion.div>

        {/* Featured testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-10"
        >
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative p-8 rounded-3xl border border-[var(--border)] bg-[var(--bg2)]"
          >
            <Quote size={32} className="text-[var(--blue)]/20 absolute top-6 right-6" />
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-display font-bold text-lg"
                style={{ background: testimonials[active].avatarColor }}
              >
                {testimonials[active].initials}
              </div>
              <div>
                <p className="font-display font-bold text-[var(--fg)]">{testimonials[active].name}</p>
                <p className="text-sm text-[var(--fg3)]">{testimonials[active].location}</p>
              </div>
              <div className="ml-auto flex flex-col items-end gap-1">
                <Rating value={testimonials[active].rating} showCount={false} size="md" />
                {testimonials[active].product && (
                  <span className="text-xs text-[var(--fg3)]">{testimonials[active].product}</span>
                )}
              </div>
            </div>
            <p className="text-[var(--fg2)] leading-relaxed text-base italic">
              "{testimonials[active].text}"
            </p>
            <p className="text-xs text-[var(--fg3)] mt-4">{testimonials[active].date}</p>
          </motion.div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-[var(--border2)] flex items-center justify-center text-[var(--fg2)] hover:border-[var(--blue)] hover:text-[var(--blue)] transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-all duration-300 rounded-full ${i === active ? "w-6 h-2 bg-[var(--blue)]" : "w-2 h-2 bg-[var(--border2)]"}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-[var(--border2)] flex items-center justify-center text-[var(--fg2)] hover:border-[var(--blue)] hover:text-[var(--blue)] transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* All testimonials grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.07 }}
              onClick={() => setActive(i)}
              className={`text-left p-4 rounded-2xl border transition-all duration-200 ${
                i === active
                  ? "border-[var(--blue)]/50 bg-[var(--blue)]/5"
                  : "border-[var(--border)] bg-[var(--bg2)] hover:border-[var(--border2)]"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold font-display shrink-0"
                  style={{ background: t.avatarColor }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-display font-semibold text-xs text-[var(--fg)]">{t.name}</p>
                  <p className="text-[10px] text-[var(--fg3)]">{t.location}</p>
                </div>
                <Rating value={t.rating} showCount={false} size="sm" className="ml-auto" />
              </div>
              <p className="text-xs text-[var(--fg3)] line-clamp-2 leading-relaxed">{t.text}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
