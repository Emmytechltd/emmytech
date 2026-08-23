import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { whatsappUrl } from "../../lib/utils";

const shopLinks = [
  { label: "Laptops", to: "/shop?category=laptops" },
  { label: "Smartphones", to: "/shop?category=smartphones" },
  { label: "CCTV Systems", to: "/shop?category=cctv" },
  { label: "Solar Systems", to: "/shop?category=solar-systems" },
  { label: "Power Stations", to: "/shop?category=power-stations" },
  { label: "Accessories", to: "/shop?category=accessories" },
];

const serviceLinks = [
  { label: "CCTV Installation", to: "/services" },
  { label: "Solar & Power", to: "/services" },
  { label: "Laptop Repairs", to: "/services" },
  { label: "Phone Repairs", to: "/services" },
  { label: "Website Development", to: "/services" },
  { label: "Digital Solutions", to: "/services" },
];

const supportLinks = [
  { label: "Contact Us", to: "/contact" },
  { label: "About Emmytech", to: "/about" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
  { label: "Shipping Policy", to: "/shipping" },
  { label: "Refund Policy", to: "/refund" },
];

const socials = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "WhatsApp", href: whatsappUrl() },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-[var(--blue)] flex items-center justify-center">
                <span className="font-display font-black text-white text-lg">E</span>
              </div>
              <div>
                <span className="font-display font-black text-xl text-[var(--fg)]">
                  Emmy<span className="text-[var(--blue)]">tech</span>
                </span>
                <p className="text-xs text-[var(--fg3)] font-medium leading-none">Digital Solutions</p>
              </div>
            </Link>
            <p className="text-sm text-[var(--fg2)] leading-relaxed max-w-xs mb-6">
              Lagos-based technology store and digital solutions company. Genuine products,
              expert services, and professional installation across Ikeja and the Lagos metropolis.
            </p>
            <div className="space-y-3">
              <a
                href="https://maps.google.com/?q=Ikeja,Lagos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-[var(--fg2)] hover:text-[var(--fg)] transition-colors"
              >
                <MapPin size={16} className="text-[var(--blue)] shrink-0 mt-0.5" />
                <span>Ikeja, Lagos, Nigeria</span>
              </a>
              <a
                href="tel:+2347067797360"
                className="flex items-center gap-3 text-sm text-[var(--fg2)] hover:text-[var(--fg)] transition-colors"
              >
                <Phone size={16} className="text-[var(--blue)] shrink-0" />
                <span>+234 706 779 7360</span>
              </a>
              <a
                href="mailto:emmybasil@gmail.com"
                className="flex items-center gap-3 text-sm text-[var(--fg2)] hover:text-[var(--fg)] transition-colors"
              >
                <Mail size={16} className="text-[var(--blue)] shrink-0" />
                <span>emmybasil@gmail.com</span>
              </a>
            </div>

            <div className="flex items-center gap-2 mt-6 flex-wrap">
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl border border-[var(--border2)] text-xs font-medium text-[var(--fg3)] hover:text-[var(--blue)] hover:border-[var(--blue)]/40 transition-all"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-display font-bold text-sm text-[var(--fg)] mb-4 uppercase tracking-wider">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-[var(--fg2)] hover:text-[var(--fg)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-bold text-sm text-[var(--fg)] mb-4 uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-[var(--fg2)] hover:text-[var(--fg)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-display font-bold text-sm text-[var(--fg)] mb-4 uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-[var(--fg2)] hover:text-[var(--fg)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--fg3)]">
            © 2026 Emmytech Digital Solutions. All rights reserved.
          </p>
          <p className="text-xs text-[var(--fg3)]">
            Ikeja, Lagos, Nigeria · Genuine Products · Expert Service
          </p>
        </div>
      </div>
    </footer>
  );
}
