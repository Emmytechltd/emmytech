import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Heart, MessageCircle, Minus, Plus,
  Share2, ShoppingCart, Shield, Truck, Wrench
} from "lucide-react";
import { getProductBySlug, products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";
import { formatPrice, whatsappUrl } from "../lib/utils";
import Rating from "../components/ui/Rating";
import Badge from "../components/ui/Badge";
import ProductCard from "../components/ui/ProductCard";
import Button from "../components/ui/Button";
import QuickViewModal from "../components/layout/QuickViewModal";
import { Product } from "../types";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = getProductBySlug(slug || "");
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <div className="text-center">
          <p className="font-display font-bold text-xl text-[var(--fg)] mb-2">Product not found</p>
          <Link to="/shop" className="text-[var(--blue)] hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const related = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const inCart = isInCart(product.id);
  const wishlisted = isWishlisted(product.id);

  const handleAdd = () => {
    addToCart(product, qty);
    showToast(`${product.name} added to cart`, "success");
  };

  const savings = product.oldPrice ? product.oldPrice - product.price : 0;

  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[var(--fg3)] mb-8">
          <Link to="/" className="hover:text-[var(--fg)] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[var(--fg)] transition-colors">Shop</Link>
          <span>/</span>
          <Link
            to={`/shop?category=${product.categorySlug}`}
            className="hover:text-[var(--fg)] transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[var(--fg)] truncate max-w-xs">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-3xl overflow-hidden border border-[var(--border2)] bg-[var(--bg3)] aspect-square mb-3"
            >
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.discount && (
                <div className="absolute top-4 left-4">
                  <Badge variant="red">-{product.discount}%</Badge>
                </div>
              )}
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${i === activeImg ? "border-[var(--blue)]" : "border-[var(--border)]"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-semibold text-[var(--blue)] font-display">{product.brand}</span>
              <span className="text-[var(--fg3)]">·</span>
              <Link
                to={`/shop?category=${product.categorySlug}`}
                className="text-sm text-[var(--fg3)] hover:text-[var(--fg)] transition-colors"
              >
                {product.category}
              </Link>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-[var(--fg)] leading-tight mb-3">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-5">
              <Rating value={product.rating} reviews={product.reviews} size="md" />
              {product.newArrival && <Badge variant="cyan">New Arrival</Badge>}
              {product.trending && <Badge variant="blue">Trending</Badge>}
            </div>

            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-display font-black text-3xl text-[var(--fg)]">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-lg text-[var(--fg3)] line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            {savings > 0 && (
              <p className="text-sm text-[var(--green)] font-semibold mb-5">
                You save {formatPrice(savings)}!
              </p>
            )}

            <p className="text-[var(--fg2)] text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Stock */}
            <div className="text-sm mb-6">
              {product.stock > 10 ? (
                <span className="text-[var(--green)] font-medium">● In Stock</span>
              ) : product.stock > 0 ? (
                <span className="text-[var(--amber)] font-medium">● Only {product.stock} remaining</span>
              ) : (
                <span className="text-[var(--red)] font-medium">● Out of Stock</span>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-[var(--fg2)]">Qty:</span>
              <div className="flex items-center border border-[var(--border2)] rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[var(--fg2)] hover:bg-[var(--bg3)] transition-colors"
                >
                  <Minus size={15} />
                </button>
                <span className="w-10 text-center text-sm font-semibold text-[var(--fg)]">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="w-10 h-10 flex items-center justify-center text-[var(--fg2)] hover:bg-[var(--bg3)] transition-colors"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                variant="primary"
                size="lg"
                onClick={handleAdd}
                className="flex-1 min-w-[160px]"
                disabled={product.stock === 0}
              >
                <ShoppingCart size={18} />
                {inCart ? "Add More" : "Add to Cart"}
              </Button>
              <button
                onClick={() => { toggleWishlist(product); showToast(wishlisted ? "Removed from wishlist" : "Added to wishlist", "success"); }}
                className="w-13 h-13 rounded-xl border border-[var(--border2)] flex items-center justify-center hover:border-[var(--blue)]/40 transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={20} className={wishlisted ? "text-red-500 fill-red-500" : "text-[var(--fg2)]"} />
              </button>
              <button
                onClick={() => { if (navigator.share) navigator.share({ title: product.name, url: location.href }); }}
                className="w-13 h-13 rounded-xl border border-[var(--border2)] flex items-center justify-center hover:border-[var(--blue)]/40 transition-colors"
                aria-label="Share"
              >
                <Share2 size={18} className="text-[var(--fg2)]" />
              </button>
            </div>

            {/* Trust row */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: Truck, label: "Lagos Delivery" },
                { icon: Shield, label: "Genuine Product" },
                { icon: Wrench, label: "After-Sales" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[var(--bg3)] border border-[var(--border)]">
                  <Icon size={16} className="text-[var(--blue)]" />
                  <span className="text-xs text-[var(--fg3)] text-center">{label}</span>
                </div>
              ))}
            </div>

            {/* WhatsApp */}
            <a
              href={whatsappUrl(`Hello Emmytech, I would like to enquire about the ${product.name} priced at ${formatPrice(product.price)}.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="md" className="w-full">
                <MessageCircle size={16} className="text-[var(--green)]" />
                Need help choosing? Chat on WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Specifications */}
        <div className="mb-16">
          <h2 className="font-display font-bold text-xl text-[var(--fg)] mb-5">Specifications</h2>
          <div className="rounded-2xl border border-[var(--border)] overflow-hidden">
            {Object.entries(product.specifications).map(([key, val], i) => (
              <div
                key={key}
                className={`flex px-5 py-3.5 text-sm ${i % 2 === 0 ? "bg-[var(--bg3)]" : "bg-[var(--bg2)]"}`}
              >
                <span className="w-40 shrink-0 font-medium text-[var(--fg2)]">{key}</span>
                <span className="text-[var(--fg)]">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display font-bold text-xl text-[var(--fg)] mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
              ))}
            </div>
          </div>
        )}
      </div>

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
