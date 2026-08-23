import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Grid3x3, List, Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../components/ui/ProductCard";
import QuickViewModal from "../components/layout/QuickViewModal";
import { products } from "../data/products";
import { categories } from "../data/categories";
import { Product } from "../types";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Best Rated" },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "all");
  const [sort, setSort] = useState("featured");
  const [priceMax, setPriceMax] = useState(2000000);
  const [filterOpen, setFilterOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    if (activeCategory !== "all") {
      result = result.filter((p) => p.categorySlug === activeCategory);
    }

    result = result.filter((p) => p.price <= priceMax);

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result = result.filter((p) => p.newArrival).concat(result.filter((p) => !p.newArrival));
        break;
      default:
        result = result.filter((p) => p.featured).concat(result.filter((p) => !p.featured));
    }

    return result;
  }, [search, activeCategory, sort, priceMax]);

  const updateCategory = (slug: string) => {
    setActiveCategory(slug);
    const params = new URLSearchParams(searchParams);
    if (slug === "all") params.delete("category");
    else params.set("category", slug);
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <div style={{ background: "var(--bg2)", borderBottom: "1px solid var(--border)" }} className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-black text-3xl text-[var(--fg)] mb-1">Shop Products</h1>
          <p className="text-[var(--fg3)]">
            {filtered.length} product{filtered.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--fg3)]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--bg2)] border border-[var(--border2)] text-[var(--fg)] placeholder:text-[var(--fg3)] text-sm outline-none focus:border-[var(--blue)] transition-colors"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--fg3)] hover:text-[var(--fg)]">
                <X size={14} />
              </button>
            )}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-[var(--bg2)] border border-[var(--border2)] text-sm text-[var(--fg)] outline-none focus:border-[var(--blue)] cursor-pointer"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <button
            onClick={() => setFilterOpen((v) => !v)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--bg2)] border border-[var(--border2)] text-sm text-[var(--fg2)] hover:text-[var(--fg)] transition-colors sm:hidden"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden sm:block w-56 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--fg3)] mb-3">
                  Category
                </p>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => updateCategory("all")}
                    className={`text-left px-3 py-2 rounded-xl text-sm transition-colors ${activeCategory === "all" ? "bg-[var(--blue)]/10 text-[var(--blue)] font-semibold" : "text-[var(--fg2)] hover:bg-[var(--bg2)] hover:text-[var(--fg)]"}`}
                  >
                    All Products ({products.length})
                  </button>
                  {categories.map((cat) => {
                    const count = products.filter((p) => p.categorySlug === cat.slug).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => updateCategory(cat.slug)}
                        className={`text-left px-3 py-2 rounded-xl text-sm transition-colors flex justify-between items-center ${activeCategory === cat.slug ? "bg-[var(--blue)]/10 text-[var(--blue)] font-semibold" : "text-[var(--fg2)] hover:bg-[var(--bg2)] hover:text-[var(--fg)]"}`}
                      >
                        {cat.name}
                        <span className="text-xs text-[var(--fg3)]">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[var(--fg3)] mb-3">
                  Max Price
                </p>
                <input
                  type="range"
                  min={10000}
                  max={2000000}
                  step={10000}
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-[var(--blue)]"
                />
                <p className="text-xs text-[var(--fg2)] mt-1">
                  Up to ₦{(priceMax / 1000).toFixed(0)}K
                </p>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {filtered.length > 0 ? (
                <motion.div
                  key={`${activeCategory}-${search}-${sort}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {filtered.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.05, 0.5) }}
                    >
                      <ProductCard product={product} onQuickView={setQuickView} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-24"
                >
                  <Search size={40} className="text-[var(--fg3)] mx-auto mb-4" />
                  <p className="font-display font-bold text-[var(--fg)]">No products found</p>
                  <p className="text-sm text-[var(--fg3)] mt-2">Try a different search or category</p>
                  <button
                    onClick={() => { setSearch(""); setActiveCategory("all"); setPriceMax(2000000); }}
                    className="mt-4 text-sm text-[var(--blue)] hover:underline"
                  >
                    Clear filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
