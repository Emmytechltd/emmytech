import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock, Search, TrendingUp, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../../data/products";
import { formatPrice } from "../../lib/utils";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const popularSearches = ["iPhone 16", "MacBook", "CCTV Kit", "Solar Panel", "EcoFlow", "AirPods"];

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const results = query.length > 1
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.includes(query.toLowerCase()))
      ).slice(0, 6)
    : [];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-70 flex items-start justify-center pt-20 px-4"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-[var(--bg2)] border border-[var(--border2)] rounded-3xl shadow-[var(--shadow-lg)] overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 p-5 border-b border-[var(--border)]">
              <Search size={20} className="text-[var(--blue)] shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories, services..."
                className="flex-1 bg-transparent text-[var(--fg)] placeholder:text-[var(--fg3)] text-base outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-[var(--fg3)] hover:text-[var(--fg)] transition-colors"
                >
                  <X size={18} />
                </button>
              )}
              <button
                onClick={onClose}
                className="ml-1 w-8 h-8 rounded-xl flex items-center justify-center text-[var(--fg3)] hover:bg-[var(--bg3)] hover:text-[var(--fg)] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {results.length > 0 ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--fg3)] mb-3">
                    Results
                  </p>
                  <div className="flex flex-col gap-1">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg3)] transition-colors group"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg bg-[var(--bg3)]"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[var(--fg)] truncate group-hover:text-[var(--blue)] transition-colors">
                            {product.name}
                          </p>
                          <p className="text-xs text-[var(--fg3)]">{product.category}</p>
                        </div>
                        <span className="font-display font-bold text-sm text-[var(--blue)] shrink-0">
                          {formatPrice(product.price)}
                        </span>
                        <ArrowRight size={14} className="text-[var(--fg3)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                  <Link
                    to={`/shop?q=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="mt-3 flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--border2)] text-sm text-[var(--blue)] hover:bg-[var(--blue)]/5 transition-colors font-medium"
                  >
                    View all results for "{query}" <ArrowRight size={14} />
                  </Link>
                </div>
              ) : query.length > 1 ? (
                <div className="py-8 text-center">
                  <p className="text-[var(--fg2)]">No results for "{query}"</p>
                  <p className="text-sm text-[var(--fg3)] mt-1">Try a different term or browse our shop</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp size={14} className="text-[var(--blue)]" />
                      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--fg3)]">
                        Popular Searches
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((s) => (
                        <button
                          key={s}
                          onClick={() => setQuery(s)}
                          className="px-3 py-1.5 rounded-full border border-[var(--border2)] text-sm text-[var(--fg2)] hover:border-[var(--blue)] hover:text-[var(--blue)] transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={14} className="text-[var(--fg3)]" />
                      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--fg3)]">
                        Quick Links
                      </p>
                    </div>
                    <div className="flex flex-col gap-1">
                      {[
                        { label: "All Products", to: "/shop" },
                        { label: "CCTV Installation Service", to: "/services#cctv" },
                        { label: "Solar Systems", to: "/shop?category=solar-systems" },
                        { label: "Laptop & Phone Repairs", to: "/services#repairs" },
                      ].map((link) => (
                        <Link
                          key={link.label}
                          to={link.to}
                          onClick={onClose}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-[var(--bg3)] transition-colors group"
                        >
                          <ArrowRight size={13} className="text-[var(--blue)] shrink-0" />
                          <span className="text-sm text-[var(--fg2)] group-hover:text-[var(--fg)] transition-colors">
                            {link.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-5 py-3 border-t border-[var(--border)] flex items-center justify-between">
              <p className="text-xs text-[var(--fg3)]">
                Press <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg3)] text-[var(--fg2)] text-xs font-mono">ESC</kbd> to close
              </p>
              <p className="text-xs text-[var(--fg3)]">{products.length} products available</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
