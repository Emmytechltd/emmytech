import { motion, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "../components/ui/ProductCard";
import SectionHeading from "../components/ui/SectionHeading";
import QuickViewModal from "../components/layout/QuickViewModal";
import { getFeaturedProducts, getTrendingProducts, getNewArrivals } from "../data/products";
import { Product } from "../types";

const tabs = [
  { label: "Featured", products: getFeaturedProducts() },
  { label: "Trending", products: getTrendingProducts() },
  { label: "New Arrivals", products: getNewArrivals() },
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-20 lg:py-28" style={{ background: "var(--bg2)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10"
        >
          <SectionHeading
            eyebrow="Products"
            title="Top Picks for You"
            align="left"
          />
          <Link
            to="/shop"
            className="flex items-center gap-2 text-sm font-semibold text-[var(--blue)] hover:gap-3 transition-all"
          >
            View All Products <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex gap-1 p-1 rounded-2xl bg-[var(--bg3)] w-fit mb-10"
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold font-display transition-all duration-200 ${
                activeTab === i
                  ? "bg-[var(--blue)] text-white shadow-sm"
                  : "text-[var(--fg2)] hover:text-[var(--fg)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Products grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {tabs[activeTab].products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
            >
              <ProductCard product={product} onQuickView={setQuickViewProduct} />
            </motion.div>
          ))}
        </motion.div>

        {tabs[activeTab].products.length === 0 && (
          <div className="text-center py-16 text-[var(--fg3)]">
            <p>No products in this category yet.</p>
          </div>
        )}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
