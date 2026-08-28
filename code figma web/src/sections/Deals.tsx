import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { getDealProducts } from "../data/products";
import { formatPrice } from "../lib/utils";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import Rating from "../components/ui/Rating";
import SectionHeading from "../components/ui/SectionHeading";

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
      return {
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      };
    };
    setTimeLeft(calc());
    const interval = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);
  return timeLeft;
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-14 h-14 rounded-2xl bg-[var(--blue)]/15 border border-[var(--blue)]/30 flex items-center justify-center">
        <span className="font-display font-black text-xl text-[var(--fg)]">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] text-[var(--fg3)] font-medium uppercase tracking-wider">{label}</span>
    </div>
  );
}

export default function Deals() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [dealEnd] = useState(
    () => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 7 * 60 * 60 * 1000)
  );
  const { d, h, m, s } = useCountdown(dealEnd);
  const dealProducts = getDealProducts();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  if (dealProducts.length === 0) return null;

  return (
    <section ref={ref} className="py-20 lg:py-28" style={{ background: "var(--bg2)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <SectionHeading
              eyebrow="Limited Time"
              title="Tech Deals of the Week"
              subtitle="Exclusive discounts on premium products. Offer ends soon."
              align="left"
            />
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Clock size={16} className="text-[var(--red)]" />
            <div className="flex gap-2">
              <TimeUnit value={d} label="Days" />
              <TimeUnit value={h} label="Hrs" />
              <TimeUnit value={m} label="Min" />
              <TimeUnit value={s} label="Sec" />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dealProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg3)] hover:border-[var(--blue)]/30 transition-all"
            >
              <Link to={`/product/${product.slug}`} className="shrink-0">
                <div className="w-28 h-28 rounded-xl overflow-hidden bg-[var(--bg)]">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-[var(--red)] font-bold font-display">
                  {product.discount}% OFF
                </span>
                <Link to={`/product/${product.slug}`}>
                  <h3 className="font-display font-bold text-sm text-[var(--fg)] hover:text-[var(--blue)] transition-colors line-clamp-2 leading-snug">
                    {product.name}
                  </h3>
                </Link>
                <Rating value={product.rating} reviews={product.reviews} />
                <div className="flex items-baseline gap-2 mt-auto">
                  <span className="font-display font-black text-base text-[var(--fg)]">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-xs text-[var(--fg3)] line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    addToCart(product);
                    showToast(`${product.name} added to cart`, "success");
                  }}
                  className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-[var(--blue)] hover:gap-2.5 transition-all"
                >
                  Shop Deal <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
