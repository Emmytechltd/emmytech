import { motion } from "framer-motion";
import { ArrowRight, Camera, CheckCircle, Globe, Layers, MessageCircle, Monitor, Sun, Wrench } from "lucide-react";
import { services } from "../data/services";
import Button from "../components/ui/Button";
import { whatsappUrl } from "../lib/utils";
import SectionHeading from "../components/ui/SectionHeading";

const icons: Record<string, React.ElementType> = {
  camera: Camera, sun: Sun, wrench: Wrench, monitor: Monitor, globe: Globe, layers: Layers,
};

export default function Services() {
  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--bg)" }}>
      {/* Hero */}
      <section className="py-16 lg:py-24 relative overflow-hidden" style={{ background: "var(--bg2)" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--blue)]/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <SectionHeading
              eyebrow="Expert Services"
              title="Technology Services That Deliver Results"
              subtitle="Emmytech provides end-to-end technology services for homes and businesses across Lagos. From security to power to repairs — we handle it professionally."
            />
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg">
                  <MessageCircle size={17} /> Chat on WhatsApp
                </Button>
              </a>
              <a href="tel:+2347067797360">
                <Button variant="secondary" size="lg">
                  Call +234 706 779 7360
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {services.map((service, i) => {
              const Icon = icons[service.icon] || Camera;
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={service.id}
                  id={service.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-8 rounded-3xl border border-[var(--border)] bg-[var(--bg2)]`}
                >
                  <div className={isEven ? "order-1" : "order-1 lg:order-2"}>
                    <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-[var(--border)]">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className={isEven ? "order-2" : "order-2 lg:order-1"}>
                    <div className="w-12 h-12 rounded-2xl bg-[var(--blue)]/10 flex items-center justify-center mb-4">
                      <Icon size={22} className="text-[var(--blue)]" />
                    </div>
                    <h2 className="font-display font-black text-2xl text-[var(--fg)] mb-3">
                      {service.name}
                    </h2>
                    <p className="text-[var(--fg2)] leading-relaxed mb-5">{service.description}</p>

                    <ul className="space-y-2 mb-6">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm text-[var(--fg2)]">
                          <CheckCircle size={15} className="text-[var(--green)] shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {service.price && (
                      <p className="text-sm font-semibold text-[var(--blue)] mb-5 font-display">
                        {service.price}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <a
                        href={whatsappUrl(`Hello Emmytech, I would like to enquire about your ${service.name} service.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="primary" size="md">
                          <MessageCircle size={15} /> Request Service
                        </Button>
                      </a>
                      <a href="tel:+2347067797360">
                        <Button variant="secondary" size="md">
                          Call Us <ArrowRight size={15} />
                        </Button>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
