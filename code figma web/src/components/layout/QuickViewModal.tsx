import { AnimatePresence, motion } from "framer-motion";
import { Heart, ShoppingCart, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useToast } from "../../context/ToastContext";
import { Product } from "../../types";
import { formatPrice } from "../../lib/utils";
import Rating from "../ui/Rating";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();

  if (!product) return null;

  const inCart = isInCart(product.id);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    showToast(`${product.name} added to cart`, "success");
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-70 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl bg-[var(--bg2)] border border-[var(--border2)] rounded-3xl shadow-[var(--shadow-lg)] overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl glass flex items-center justify-center text-[var(--fg2)] hover:text-[var(--fg)] transition-colors"
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image */}
              <div className="bg-[var(--bg3)] aspect-square overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-[var(--fg3)] uppercase tracking-wide">
                      {product.brand}
                    </span>
                    <span className="text-[var(--fg3)]">·</span>
                    <span className="text-xs text-[var(--fg3)]">{product.category}</span>
                  </div>
                  <h2 className="font-display font-bold text-xl text-[var(--fg)] leading-snug">
                    {product.name}
                  </h2>
                  <div className="flex items-center gap-3 mt-2">
                    <Rating value={product.rating} reviews={product.reviews} />
                    {product.discount && <Badge variant="red">-{product.discount}%</Badge>}
                    {product.newArrival && <Badge variant="cyan">New</Badge>}
                  </div>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="font-display font-black text-2xl text-[var(--fg)]">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-base text-[var(--fg3)] line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>

                <p className="text-sm text-[var(--fg2)] leading-relaxed">
                  {product.shortDescription}
                </p>

                <div className="text-sm">
                  {product.stock > 10 ? (
                    <span className="text-[var(--green)]">● In Stock ({product.stock} available)</span>
                  ) : product.stock > 0 ? (
                    <span className="text-[var(--amber)]">● Only {product.stock} left</span>
                  ) : (
                    <span className="text-[var(--red)]">● Out of Stock</span>
                  )}
                </div>

                <div className="flex gap-3 mt-auto">
                  <Button
                    variant="primary"
                    size="md"
                    className="flex-1"
                    onClick={handleAddToCart}
                    disabled={inCart}
                  >
                    <ShoppingCart size={16} />
                    {inCart ? "In Cart" : "Add to Cart"}
                  </Button>
                  <button
                    onClick={() => {
                      toggleWishlist(product);
                      showToast(wishlisted ? "Removed from wishlist" : "Added to wishlist", "success");
                    }}
                    className="w-11 h-11 rounded-xl border border-[var(--border2)] flex items-center justify-center hover:border-[var(--blue)]/50 transition-colors"
                  >
                    <Heart
                      size={18}
                      className={wishlisted ? "text-red-500 fill-red-500" : "text-[var(--fg2)]"}
                    />
                  </button>
                </div>

                <Link
                  to={`/product/${product.slug}`}
                  onClick={onClose}
                  className="text-center text-sm text-[var(--blue)] hover:underline font-medium"
                >
                  View Full Details →
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
