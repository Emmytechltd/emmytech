import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, ChevronRight, MessageCircle, ShieldCheck, Star, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { whatsappUrl } from "../lib/utils";

const trustBadges = [
  { icon: CheckCircle, label: "Genuine Products" },
  { icon: ShieldCheck, label: "Secure Shopping" },
  { icon: Truck, label: "Lagos Delivery" },
  { icon: Star, label: "Expert Support" },
];

const floatingCard = {
  product: "MacBook Air M3 15\"",
  price: "₦1,450,000",
  rating: 4.9,
  image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop&auto=format&q=80",
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background grid */}
      <div className="absolute inset-0 hero-grid opacity-30" />

      {/* Background glow */}
      <div className="absolute inset-0 hero-bg" />
      <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-[var(--blue)]/8 blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[var(--cyan)]/6 blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">
        {/* Left: Copy */}
        <div>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--blue)]/30 bg-[var(--blue)]/8 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-pulse" />
            <span className="text-xs font-semibold text-[var(--blue)] tracking-wide font-display">
              Ikeja, Lagos · Premium Tech Store
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display font-black text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.06] tracking-tight text-[var(--fg)] mb-6"
          >
            Technology That{" "}
            <span className="gradient-text">Moves You</span>{" "}
            Forward.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-lg text-[var(--fg2)] leading-relaxed max-w-xl mb-8"
          >
            Premium gadgets, smarter security, reliable power solutions and expert technology
            services — all from Emmytech Digital Solutions.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <Link to="/shop">
              <Button variant="primary" size="lg">
                Shop Products
                <ArrowRight size={17} />
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="secondary" size="lg">
                Explore Services
                <ChevronRight size={17} />
              </Button>
            </Link>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="lg">
                <MessageCircle size={17} className="text-[var(--green)]" />
                WhatsApp
              </Button>
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            {trustBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon size={14} className="text-[var(--blue)]" />
                <span className="text-xs text-[var(--fg3)] font-medium">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Product composition */}
        <div className="relative flex items-center justify-center lg:justify-end">
          {/* Main laptop image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="relative z-10 animate-float-slow"
          >
            <div className="relative w-full max-w-xl rounded-3xl overflow-hidden border border-[var(--border2)] glow-blue">
              <img
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&h=600&fit=crop&auto=format&q=85"
                alt="Premium MacBook laptop from Emmytech"
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </motion.div>

          {/* Floating product card */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute -bottom-4 -left-4 sm:left-0 z-20 w-56 glass rounded-2xl p-3 shadow-[var(--shadow-lg)] animate-float"
          >
            <img
              src={floatingCard.image}
              alt={floatingCard.product}
              className="w-full h-24 object-cover rounded-xl mb-2.5"
            />
            <p className="font-display font-bold text-xs text-[var(--fg)] line-clamp-1 mb-1">
              {floatingCard.product}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-sm text-[var(--blue)]">
                {floatingCard.price}
              </span>
              <div className="flex items-center gap-1">
                <Star size={10} className="fill-[var(--amber)] text-[var(--amber)]" />
                <span className="text-[10px] font-bold text-[var(--fg2)]">{floatingCard.rating}</span>
              </div>
            </div>
          </motion.div>

          {/* Floating phone card */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute -top-8 right-0 z-20 glass rounded-2xl p-3 flex items-center gap-3 shadow-[var(--shadow-lg)]"
            style={{ animationDelay: "2s" }}
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--blue)]/20 flex items-center justify-center">
              <span className="text-lg">📱</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--fg)] font-display">iPhone 16 Pro Max</p>
              <p className="text-xs text-[var(--blue)] font-semibold">₦1,180,000</p>
            </div>
          </motion.div>

          {/* Stats badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="absolute top-1/2 -right-4 lg:-right-8 z-20 glass rounded-2xl p-4 text-center shadow-[var(--shadow-lg)]"
          >
            <p className="font-display font-black text-2xl text-[var(--fg)]">10K+</p>
            <p className="text-xs text-[var(--fg3)] font-medium">Happy Customers</p>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-[var(--fg3)]">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-5 h-8 rounded-full border-2 border-[var(--border2)] flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[var(--blue)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
