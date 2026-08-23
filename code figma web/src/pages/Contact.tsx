import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import Button from "../components/ui/Button";
import { useToast } from "../context/ToastContext";
import { whatsappUrl } from "../lib/utils";
import SectionHeading from "../components/ui/SectionHeading";

const faqs = [
  { q: "Do you deliver outside Lagos?", a: "Yes, we ship nationwide via courier. Delivery times and charges vary by location. Contact us for a quote." },
  { q: "Are your products genuine?", a: "Absolutely. Every product we sell is 100% genuine, sourced from authorised distributors and comes with the original manufacturer warranty." },
  { q: "How long does CCTV installation take?", a: "A standard home CCTV installation (4–8 cameras) typically takes 4–6 hours. Larger commercial jobs are usually completed in 1–2 days." },
  { q: "Can I get a solar installation quote?", a: "Yes. We provide a free site assessment and custom quotation for every solar project. Chat with us on WhatsApp to get started." },
  { q: "What warranty do repairs come with?", a: "All device repairs carry a 3-month warranty on parts and labour." },
];

export default function Contact() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Message sent! We'll get back to you within 24 hours.", "success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <section className="py-16 relative overflow-hidden" style={{ background: "var(--bg2)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <SectionHeading
              eyebrow="Get In Touch"
              title="Let's Talk Technology."
              subtitle="Have a question about products, services or pricing? We're always happy to help — by phone, WhatsApp, email or in person."
            />
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="font-display font-bold text-lg text-[var(--fg)] mb-5">Contact Details</h2>
                <div className="space-y-4">
                  {[
                    { icon: MapPin, label: "Address", value: "Ikeja, Lagos, Nigeria", href: "https://maps.google.com/?q=Ikeja,Lagos" },
                    { icon: Phone, label: "Phone", value: "+234 706 779 7360", href: "tel:+2347067797360" },
                    { icon: Mail, label: "Email", value: "emmybasil@gmail.com", href: "mailto:emmybasil@gmail.com" },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("https") ? "_blank" : undefined}
                      rel={href.startsWith("https") ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-4 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg2)] hover:border-[var(--blue)]/30 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[var(--blue)]/10 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-[var(--blue)]" />
                      </div>
                      <div>
                        <p className="text-xs text-[var(--fg3)] font-medium mb-0.5">{label}</p>
                        <p className="text-sm text-[var(--fg)] group-hover:text-[var(--blue)] transition-colors">{value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg2)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={16} className="text-[var(--blue)]" />
                  <h3 className="font-display font-bold text-sm text-[var(--fg)]">Business Hours</h3>
                </div>
                <div className="space-y-1.5 text-sm">
                  {[
                    ["Monday – Friday", "8:00am – 7:00pm"],
                    ["Saturday", "9:00am – 6:00pm"],
                    ["Sunday", "11:00am – 4:00pm"],
                  ].map(([day, time]) => (
                    <div key={day} className="flex justify-between">
                      <span className="text-[var(--fg2)]">{day}</span>
                      <span className="text-[var(--fg)] font-medium">{time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg" className="w-full">
                  <MessageCircle size={18} /> Chat on WhatsApp
                </Button>
              </a>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                onSubmit={handleSubmit}
                className="p-8 rounded-3xl border border-[var(--border)] bg-[var(--bg2)] space-y-5"
              >
                <h2 className="font-display font-bold text-xl text-[var(--fg)]">Send a Message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { key: "name", label: "Full Name", type: "text", placeholder: "Your full name" },
                    { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                    { key: "phone", label: "Phone Number", type: "tel", placeholder: "+234 xxx xxxx" },
                    { key: "subject", label: "Subject", type: "text", placeholder: "What's it about?" },
                  ].map(({ key, label, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-xs font-semibold text-[var(--fg2)] mb-1.5">{label}</label>
                      <input
                        type={type}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                        placeholder={placeholder}
                        className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg3)] border border-[var(--border2)] text-[var(--fg)] placeholder:text-[var(--fg3)] text-sm outline-none focus:border-[var(--blue)] transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--fg2)] mb-1.5">Message</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Tell us how we can help..."
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg3)] border border-[var(--border2)] text-[var(--fg)] placeholder:text-[var(--fg3)] text-sm outline-none focus:border-[var(--blue)] transition-colors resize-none"
                  />
                </div>
                <Button variant="primary" size="lg" type="submit" loading={loading} className="w-full">
                  <Send size={16} /> Send Message
                </Button>
              </motion.form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16" style={{ background: "var(--bg2)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Common Questions" className="mb-10" />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-[var(--border)] rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left bg-[var(--bg3)] hover:bg-[var(--bg)] transition-colors"
                >
                  <span className="font-display font-semibold text-sm text-[var(--fg)]">{faq.q}</span>
                  <span className={`text-[var(--blue)] transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    className="px-5 py-4 bg-[var(--bg2)]"
                  >
                    <p className="text-sm text-[var(--fg2)] leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
