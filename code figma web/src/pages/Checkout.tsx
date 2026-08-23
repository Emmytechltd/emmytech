import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, CreditCard, Lock, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../lib/utils";
import Button from "../components/ui/Button";
import { useToast } from "../context/ToastContext";

const paymentMethods = [
  { id: "paystack", label: "Paystack", desc: "Card, bank transfer, USSD" },
  { id: "flutterwave", label: "Flutterwave", desc: "Card, mobile money" },
  { id: "bank", label: "Bank Transfer", desc: "Direct bank transfer" },
  { id: "cash", label: "Pay on Delivery", desc: "Cash on delivery (Lagos only)" },
];

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { showToast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("paystack");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", city: "Lagos", state: "Lagos",
  });

  const delivery = subtotal >= 100000 ? 0 : 5000;
  const total = subtotal + delivery;

  const handleOrder = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setComplete(true);
      clearCart();
    }, 2000);
  };

  if (complete) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4" style={{ background: "var(--bg)" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-[var(--green)]/15 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-[var(--green)]" />
          </div>
          <h1 className="font-display font-black text-3xl text-[var(--fg)] mb-3">Order Placed!</h1>
          <p className="text-[var(--fg2)] mb-8">
            Thank you for your order. Our team will contact you within 1 hour to confirm delivery.
          </p>
          <Link to="/shop">
            <Button variant="primary" size="lg">Continue Shopping</Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-4" style={{ background: "var(--bg)" }}>
        <div className="text-center">
          <ShoppingBag size={48} className="text-[var(--fg3)] mx-auto mb-4" />
          <p className="font-display font-bold text-xl text-[var(--fg)] mb-2">Your cart is empty</p>
          <Link to="/shop" className="text-[var(--blue)] hover:underline">Browse products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--bg)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="font-display font-black text-3xl text-[var(--fg)] mb-8">Checkout</h1>

        <form onSubmit={handleOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left */}
            <div className="lg:col-span-3 space-y-6">
              {/* Customer info */}
              <div className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg2)]">
                <h2 className="font-display font-bold text-lg text-[var(--fg)] mb-5">Customer Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: "name", label: "Full Name", type: "text", span: 2 },
                    { key: "email", label: "Email", type: "email", span: 1 },
                    { key: "phone", label: "Phone", type: "tel", span: 1 },
                    { key: "address", label: "Delivery Address", type: "text", span: 2 },
                    { key: "city", label: "City", type: "text", span: 1 },
                    { key: "state", label: "State", type: "text", span: 1 },
                  ].map(({ key, label, type, span }) => (
                    <div key={key} className={span === 2 ? "sm:col-span-2" : ""}>
                      <label className="block text-xs font-semibold text-[var(--fg2)] mb-1.5">{label}</label>
                      <input
                        required
                        type={type}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg3)] border border-[var(--border2)] text-[var(--fg)] text-sm outline-none focus:border-[var(--blue)] transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div className="p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg2)]">
                <h2 className="font-display font-bold text-lg text-[var(--fg)] mb-5">Payment Method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {paymentMethods.map((m) => (
                    <label
                      key={m.id}
                      className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${paymentMethod === m.id ? "border-[var(--blue)] bg-[var(--blue)]/5" : "border-[var(--border)] hover:border-[var(--border2)]"}`}
                    >
                      <input
                        type="radio"
                        value={m.id}
                        checked={paymentMethod === m.id}
                        onChange={() => setPaymentMethod(m.id)}
                        className="mt-0.5 accent-[var(--blue)]"
                      />
                      <div>
                        <p className="font-display font-semibold text-sm text-[var(--fg)]">{m.label}</p>
                        <p className="text-xs text-[var(--fg3)]">{m.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-[var(--fg3)]">
                  <Lock size={13} className="text-[var(--green)]" />
                  <span>Secure checkout · Your payment information is encrypted and protected</span>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 p-6 rounded-3xl border border-[var(--border)] bg-[var(--bg2)]">
                <h2 className="font-display font-bold text-lg text-[var(--fg)] mb-5">Order Summary</h2>
                <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-14 h-14 object-cover rounded-xl bg-[var(--bg3)] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[var(--fg)] line-clamp-2">{item.product.name}</p>
                        <p className="text-xs text-[var(--fg3)] mt-0.5">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-xs font-bold text-[var(--fg)] shrink-0">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[var(--border)] pt-4 space-y-2 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--fg2)]">Subtotal</span>
                    <span className="text-[var(--fg)]">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--fg2)]">Delivery</span>
                    <span className={delivery === 0 ? "text-[var(--green)]" : "text-[var(--fg)]"}>
                      {delivery === 0 ? "Free" : formatPrice(delivery)}
                    </span>
                  </div>
                  <div className="flex justify-between font-display font-bold pt-2 border-t border-[var(--border)]">
                    <span className="text-[var(--fg)]">Total</span>
                    <span className="text-[var(--blue)] text-lg">{formatPrice(total)}</span>
                  </div>
                </div>

                <Button variant="primary" size="lg" type="submit" loading={loading} className="w-full">
                  <CreditCard size={17} /> Place Order
                </Button>

                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-[var(--fg3)]">
                  <div className="flex items-center gap-1"><Truck size={12} /> Fast delivery</div>
                  <div className="flex items-center gap-1"><ShieldCheck size={12} className="text-[var(--green)]" /> Genuine products</div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
