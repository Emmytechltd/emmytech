import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useToast } from "../../context/ToastContext";
import { Product } from "../../types";
import { formatPrice } from "../../lib/utils";
import Rating from "./Rating";
import Badge from "./Badge";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast } = useToast();
  const wishlisted = isWishlisted(product.id);
  const inCart = isInCart(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    showToast(`${product.name} added to cart`, "success");
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
    showToast(
      wishlisted ? "Removed from wishlist" : `${product.name} added to wishlist`,
      wishlisted ? "info" : "success"
    );
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    onQuickView?.(product);
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className="product-card group relative flex flex-col rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg2)] hover:border-[var(--blue)]/40 transition-all duration-300 hover:shadow-[0_8px_40px_var(--glow)]"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[var(--bg3)] aspect-[4/3]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-image w-full h-full object-cover"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.discount && (
            <Badge variant="red">-{product.discount}%</Badge>
          )}
          {product.newArrival && (
            <Badge variant="cyan">New</Badge>
          )}
          {product.dealOfWeek && (
            <Badge variant="amber">Deal</Badge>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center transition-all duration-200 hover:scale-110"
        >
          <Heart
            size={16}
            className={wishlisted ? "text-red-500 fill-red-500" : "text-[var(--fg2)]"}
          />
        </button>

        {/* Hover actions */}
        <div className="product-actions absolute bottom-0 left-0 right-0 p-3 flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--blue)] text-white text-sm font-semibold font-display hover:bg-[var(--blue-light)] transition-colors"
          >
            <ShoppingCart size={15} />
            {inCart ? "In Cart" : "Add to Cart"}
          </button>
          <button
            onClick={handleQuickView}
            className="w-10 h-10 flex items-center justify-center rounded-xl glass hover:border-[var(--blue)]/50 transition-colors"
            aria-label="Quick view"
          >
            <Eye size={15} className="text-[var(--fg)]" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[var(--fg3)] uppercase tracking-wide">
            {product.brand}
          </span>
          <Rating value={product.rating} reviews={product.reviews} />
        </div>

        <h3 className="font-display font-semibold text-sm leading-snug text-[var(--fg)] line-clamp-2 group-hover:text-[var(--blue)] transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className="font-display font-bold text-lg text-[var(--fg)]">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-[var(--fg3)] line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <div className="text-xs text-[var(--fg3)]">
          {product.stock > 10 ? (
            <span className="text-[var(--green)]">● In Stock</span>
          ) : product.stock > 0 ? (
            <span className="text-[var(--amber)]">● Only {product.stock} left</span>
          ) : (
            <span className="text-[var(--red)]">● Out of Stock</span>
          )}
        </div>
      </div>
    </Link>
  );
}
