import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu, X, Search, ShoppingCart, Heart, Sun, Moon,
  Laptop, Smartphone, Camera, Zap, Headphones, Home, Wrench
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useTheme } from "../../context/ThemeContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const categories = [
  { label: "Laptops", to: "/shop?category=laptops", icon: Laptop },
  { label: "Smartphones", to: "/shop?category=smartphones", icon: Smartphone },
  { label: "CCTV", to: "/shop?category=cctv", icon: Camera },
  { label: "Solar Systems", to: "/shop?category=solar-systems", icon: Zap },
  { label: "Accessories", to: "/shop?category=accessories", icon: Headphones },
  { label: "Smart Home", to: "/shop?category=smart-home", icon: Home },
  { label: "Repairs", to: "/services#repairs", icon: Wrench },
];

interface NavbarProps {
  onSearchOpen: () => void;
  onCartOpen: () => void;
}

export default function Navbar({ onSearchOpen, onCartOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setShopDropdown(false);
  }, [location]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShopDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "nav-blur py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-[var(--blue)] flex items-center justify-center glow-blue-sm">
                <span className="font-display font-black text-white text-base leading-none">E</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-display font-black text-base text-[var(--fg)] leading-none">
                  Emmy<span className="text-[var(--blue)]">tech</span>
                </span>
                <p className="text-[10px] text-[var(--fg3)] font-medium leading-none mt-0.5">
                  Digital Solutions
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.label === "Shop" ? (
                  <div key={link.label} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setShopDropdown((v) => !v)}
                      className="px-4 py-2 rounded-xl text-sm font-medium text-[var(--fg2)] hover:text-[var(--fg)] hover:bg-[var(--bg3)] transition-all"
                    >
                      Shop ▾
                    </button>
                    <AnimatePresence>
                      {shopDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 w-52 glass rounded-2xl p-2 shadow-[var(--shadow-lg)]"
                        >
                          {categories.map((cat) => {
                            const Icon = cat.icon;
                            return (
                              <Link
                                key={cat.label}
                                to={cat.to}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--bg3)] transition-colors group"
                              >
                                <Icon size={15} className="text-[var(--blue)] shrink-0" />
                                <span className="text-sm text-[var(--fg2)] group-hover:text-[var(--fg)]">
                                  {cat.label}
                                </span>
                              </Link>
                            );
                          })}
                          <div className="border-t border-[var(--border)] mt-1 pt-1">
                            <Link
                              to="/shop"
                              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--bg3)] transition-colors text-[var(--blue)] text-sm font-medium"
                            >
                              View All Products →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    className={({ isActive }) =>
                      `px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "text-[var(--blue)] bg-[var(--blue)]/10"
                          : "text-[var(--fg2)] hover:text-[var(--fg)] hover:bg-[var(--bg3)]"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                )
              )}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={onSearchOpen}
                aria-label="Search"
                className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--fg2)] hover:text-[var(--fg)] hover:bg-[var(--bg3)] transition-all"
              >
                <Search size={18} />
              </button>

              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-10 h-10 rounded-xl hidden sm:flex items-center justify-center text-[var(--fg2)] hover:text-[var(--fg)] hover:bg-[var(--bg3)] transition-all"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <Link
                to="/shop"
                aria-label="Wishlist"
                className="w-10 h-10 rounded-xl hidden sm:flex items-center justify-center text-[var(--fg2)] hover:text-[var(--fg)] hover:bg-[var(--bg3)] transition-all relative"
              >
                <Heart size={18} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button
                onClick={onCartOpen}
                aria-label="Cart"
                className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--fg2)] hover:text-[var(--fg)] hover:bg-[var(--bg3)] transition-all relative"
              >
                <ShoppingCart size={18} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[var(--blue)] text-white text-[10px] flex items-center justify-center font-bold">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Menu"
                className="w-10 h-10 rounded-xl lg:hidden flex items-center justify-center text-[var(--fg2)] hover:text-[var(--fg)] hover:bg-[var(--bg3)] transition-all"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-[var(--bg2)] border-l border-[var(--border)] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
                <span className="font-display font-bold text-[var(--fg)]">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--fg2)] hover:bg-[var(--bg3)]"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.to}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "text-[var(--blue)] bg-[var(--blue)]/10"
                          : "text-[var(--fg2)] hover:text-[var(--fg)] hover:bg-[var(--bg3)]"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="border-t border-[var(--border)] my-2" />
                <p className="px-4 text-xs font-semibold uppercase tracking-widest text-[var(--fg3)] mb-1">
                  Categories
                </p>
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Link
                      key={cat.label}
                      to={cat.to}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-[var(--bg3)] transition-colors"
                    >
                      <Icon size={15} className="text-[var(--blue)]" />
                      <span className="text-sm text-[var(--fg2)]">{cat.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-[var(--border)] flex gap-2">
                <button
                  onClick={toggleTheme}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--bg3)] text-sm text-[var(--fg2)] hover:text-[var(--fg)] transition-colors"
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                  {isDark ? "Light Mode" : "Dark Mode"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
