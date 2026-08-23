import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import SectionHeading from "../components/ui/SectionHeading";

export default function Categories() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 lg:py-28" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <SectionHeading
            eyebrow="Browse"
            title="Shop by Category"
            subtitle="Everything you need — laptops, smartphones, CCTV, solar power, and smart home products."
          />
        </motion.div>

        {/* Large feature cards row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {categories.filter((c) => c.size === "large").map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
            >
              <Link
                to={`/shop?category=${cat.slug}`}
                className="group relative block h-72 rounded-3xl overflow-hidden border border-[var(--border)]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-xs font-semibold text-white/60 tracking-widest uppercase">
                        {cat.productCount} Products
                      </span>
                      <h3 className="font-display font-bold text-2xl text-white mt-1 mb-1">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-white/70">{cat.description}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm group-hover:bg-[var(--blue)] transition-colors ml-4 shrink-0">
                      <ArrowRight size={18} className="text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Medium cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {categories.filter((c) => c.size === "medium").map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 + i * 0.08, duration: 0.6 }}
            >
              <Link
                to={`/shop?category=${cat.slug}`}
                className="group relative block h-48 rounded-2xl overflow-hidden border border-[var(--border)]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">{cat.name}</h3>
                      <p className="text-xs text-white/60 mt-0.5">{cat.productCount} products</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm group-hover:bg-[var(--blue)] transition-colors">
                      <ArrowRight size={14} className="text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Small cards row */}
        <div className="grid grid-cols-2 gap-5">
          {categories.filter((c) => c.size === "small").map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
            >
              <Link
                to={`/shop?category=${cat.slug}`}
                className="group relative block h-36 rounded-2xl overflow-hidden border border-[var(--border)]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 p-4 flex items-end justify-between">
                  <div>
                    <h3 className="font-display font-bold text-base text-white">{cat.name}</h3>
                    <p className="text-xs text-white/60">{cat.productCount} products</p>
                  </div>
                  <ArrowRight size={14} className="text-white/70 group-hover:text-white transition-colors" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
