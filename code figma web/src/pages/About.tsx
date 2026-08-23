import { motion } from "framer-motion";
import { ArrowRight, Award, CheckCircle, Heart, Lightbulb, MessageCircle, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import { whatsappUrl } from "../lib/utils";

const values = [
  { icon: Shield, title: "Integrity", desc: "We sell only genuine products and provide honest advice." },
  { icon: Award, title: "Excellence", desc: "High-quality work and premium products in everything we do." },
  { icon: Heart, title: "Customer Focus", desc: "Your satisfaction is the measure of our success." },
  { icon: Lightbulb, title: "Innovation", desc: "Staying current with technology so you can stay ahead." },
];

const expertise = [
  "Apple Products (MacBook, iPhone, iPad)",
  "Samsung Galaxy & Android",
  "Hikvision & Dahua CCTV",
  "EcoFlow & Jackery Power Stations",
  "Solar System Design & Installation",
  "Luminous Hybrid Inverters",
  "Laptop & Phone Diagnostics",
  "Network Setup & Configuration",
  "Windows & macOS Support",
  "Business Website Development",
];

export default function About() {
  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--bg)" }}>
      {/* Hero */}
      <section
        className="py-20 lg:py-28 relative overflow-hidden"
        style={{ background: "var(--bg2)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--blue)]/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="w-6 h-px bg-[var(--blue)]" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[var(--blue)] font-display">Our Story</span>
              </div>
              <h1 className="font-display font-black text-4xl sm:text-5xl text-[var(--fg)] leading-tight mb-6">
                Lagos Technology.<br />
                <span className="gradient-text">Global Standards.</span>
              </h1>
              <p className="text-[var(--fg2)] leading-relaxed mb-6">
                Emmytech Digital Solutions was founded in Ikeja, Lagos, with a clear mission:
                to give Nigerian customers access to genuine, high-quality technology products
                with expert support, professional services, and fair pricing.
              </p>
              <p className="text-[var(--fg2)] leading-relaxed mb-8">
                Over the years, we've grown from a small computer accessories shop into a
                full technology solutions company — selling premium products, installing CCTV and
                solar systems, repairing devices, and building digital solutions for businesses
                across Lagos.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/shop">
                  <Button variant="primary" size="md">
                    Shop Our Products <ArrowRight size={16} />
                  </Button>
                </Link>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="md">
                    <MessageCircle size={16} /> Talk to Us
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&auto=format&q=80"
                  alt="Emmytech Digital Solutions office in Ikeja Lagos"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Our Mission",
                desc: "To make premium technology accessible and reliable for every Nigerian household and business — backed by honest pricing, expert knowledge, and outstanding after-sales support.",
                color: "blue",
              },
              {
                title: "Our Vision",
                desc: "To become the most trusted technology company in Lagos — known for quality products, professional installations, and exceptional customer relationships that last a lifetime.",
                color: "cyan",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl border border-[var(--border)] bg-[var(--bg2)]"
              >
                <h2 className="font-display font-black text-2xl text-[var(--fg)] mb-4">{item.title}</h2>
                <p className="text-[var(--fg2)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16" style={{ background: "var(--bg2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What Drives Us" title="Our Core Values" className="mb-12" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg3)]"
              >
                <div className="w-12 h-12 rounded-2xl bg-[var(--blue)]/10 flex items-center justify-center mx-auto mb-4">
                  <Icon size={20} className="text-[var(--blue)]" />
                </div>
                <h3 className="font-display font-bold text-sm text-[var(--fg)] mb-2">{title}</h3>
                <p className="text-xs text-[var(--fg3)] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading eyebrow="Knowledge" title="Our Technology Expertise" align="left" className="mb-8" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {expertise.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 py-2">
                    <CheckCircle size={14} className="text-[var(--green)] shrink-0" />
                    <span className="text-sm text-[var(--fg2)]">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/3] border border-[var(--border)]">
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop&auto=format&q=80"
                  alt="Technology expertise at Emmytech"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: "var(--bg2)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[var(--fg)] mb-4">
              Let's Work Together
            </h2>
            <p className="text-[var(--fg2)] mb-8">
              Whether you need a laptop, a CCTV system, a solar installation, or a professional website — Emmytech is here to deliver excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/shop">
                <Button variant="primary" size="lg">Browse Products <ArrowRight size={16} /></Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" size="lg">Contact Us <ArrowRight size={16} /></Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
