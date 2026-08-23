import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../lib/utils";
import Button from "../ui/Button";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeFromCart, updateQuantity, subtotal, itemCount } = useCart();

  const delivery = subtotal >= 100000 ? 0 : 5000;
  const total = subtotal + delivery;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[var(--bg2)] border-l border-[var(--border)] z-60 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-[var(--blue)]" />
                <div>
                  <h2 className="font-display font-bold text-[var(--fg)]">Cart</h2>
                  <p className="text-xs text-[var(--fg3)]">{itemCount} item{itemCount !== 1 ? "s" : ""}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--fg2)] hover:bg-[var(--bg3)] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={48} className="text-[var(--fg3)]" />
                  <div>
                    <p className="font-display font-semibold text-[var(--fg)]">Your cart is empty</p>
                    <p className="text-sm text-[var(--fg3)] mt-1">Add products to get started</p>
                  </div>
                  <Button onClick={onClose} variant="primary" size="md">
                    Browse Shop
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-3 p-3 rounded-2xl border border-[var(--border)] bg-[var(--bg3)]"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-xl bg-[var(--bg)]"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-semibold text-sm text-[var(--fg)] line-clamp-2 leading-snug">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-[var(--fg3)] mt-0.5">{item.product.brand}</p>
                          <p className="font-display font-bold text-sm text-[var(--blue)] mt-1">
                            {formatPrice(item.product.price)}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1 border border-[var(--border2)] rounded-xl overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-[var(--bg)] transition-colors text-[var(--fg2)]"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="w-8 text-center text-sm font-medium text-[var(--fg)]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center hover:bg-[var(--bg)] transition-colors text-[var(--fg2)]"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-[var(--fg3)] hover:text-[var(--red)] transition-colors"
                              aria-label="Remove"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 border-t border-[var(--border)]">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--fg2)]">Subtotal</span>
                    <span className="text-[var(--fg)] font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--fg2)]">Delivery</span>
                    <span className={delivery === 0 ? "text-[var(--green)] font-medium" : "text-[var(--fg)] font-medium"}>
                      {delivery === 0 ? "Free" : formatPrice(delivery)}
                    </span>
                  </div>
                  {delivery > 0 && (
                    <p className="text-xs text-[var(--fg3)]">
                      Free delivery on orders above ₦100,000
                    </p>
                  )}
                  <div className="border-t border-[var(--border)] pt-2 flex justify-between font-display font-bold">
                    <span className="text-[var(--fg)]">Total</span>
                    <span className="text-[var(--blue)] text-lg">{formatPrice(total)}</span>
                  </div>
                </div>
                <Link to="/checkout" onClick={onClose}>
                  <Button variant="primary" size="lg" className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>
                <button
                  onClick={onClose}
                  className="w-full mt-2 py-2 text-sm text-[var(--fg3)] hover:text-[var(--fg)] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
