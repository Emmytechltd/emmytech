import { Link, useLocation } from "react-router-dom";

const policies = {
  privacy: {
    eyebrow: "Your Privacy",
    title: "Privacy Policy",
    intro: "This policy explains how Emmytech Digital Solutions collects, uses and protects information shared when you browse our website, contact us or place an order.",
    sections: [
      ["Information we collect", "We may collect your name, phone number, email address, delivery details, order information and messages you send to us. We also receive limited technical information needed to keep the website secure and working properly."],
      ["How we use information", "We use information to process orders, arrange delivery, respond to enquiries, provide support, improve our services and send updates you have requested. We do not sell your personal information."],
      ["Sharing and protection", "Information is shared only with trusted providers where needed to complete payment, delivery, communications or other requested services. We use reasonable administrative and technical measures to protect your information."],
      ["Your choices", "You may ask us to update or delete personal information, or opt out of non-essential messages, by contacting us using the details below. We may retain transaction records where required for business or legal purposes."],
    ],
  },
  terms: {
    eyebrow: "Please Read",
    title: "Terms & Conditions",
    intro: "By using the Emmytech website or purchasing from us, you agree to these terms. Product availability, pricing and delivery estimates may change without prior notice.",
    sections: [
      ["Products and orders", "Product descriptions and images are provided to help you choose. An order is accepted when Emmytech confirms it. We may contact you to verify details or cancel an order if an item is unavailable or information is materially incorrect."],
      ["Prices and payment", "Prices are shown in Nigerian Naira unless stated otherwise. Payment must be completed through an approved payment method before an order is processed. You are responsible for providing accurate billing and delivery details."],
      ["Use of the website", "You agree not to misuse the website, attempt unauthorised access, submit fraudulent information or interfere with its operation. Content on this website belongs to Emmytech or its respective owners and may not be reused without permission."],
      ["Service support", "Installation, repairs and digital services are provided according to the scope agreed with you. Additional work may require a separate quote and approval before it begins."],
    ],
  },
  shipping: {
    eyebrow: "Delivery Information",
    title: "Shipping Policy",
    intro: "We arrange delivery from our Ikeja, Lagos location and will confirm the available delivery option, fee and expected timing before dispatch.",
    sections: [
      ["Delivery areas", "We deliver within Lagos and may arrange delivery to other parts of Nigeria subject to courier availability. Delivery charges and coverage depend on the destination, package size and selected courier."],
      ["Processing time", "Orders are normally prepared after payment and confirmation of delivery details. We will contact you if an item needs additional preparation or if a delay is expected."],
      ["Receiving your order", "Please inspect the package when it arrives and report visible damage or missing items as soon as possible. Keep your payment confirmation, order details and delivery evidence for support."],
      ["Delays and failed delivery", "Courier delays, traffic, weather and circumstances outside our control may affect delivery estimates. If delivery cannot be completed because the provided details are incorrect or nobody is available, re-delivery charges may apply."],
    ],
  },
  refund: {
    eyebrow: "Returns and Refunds",
    title: "Refund Policy",
    intro: "We want you to be confident in your purchase. Refund requests for eligible orders must be submitted within one week (7 calendar days) after payment.",
    sections: [
      ["Eligibility window", "A refund request must reach us within one week (7 calendar days) after the date payment was made. Requests received after this period may not qualify, except where required by applicable law or where Emmytech confirms an exception."],
      ["Eligible reasons", "A refund may be considered for an item that is faulty on arrival, materially different from the confirmed order or unavailable after payment. We may ask for photographs, videos, order details or an inspection before approving a request."],
      ["Condition and exclusions", "Products should be returned in their original condition with included accessories, packaging and proof of purchase where possible. Damage caused by misuse, accidental damage, unauthorised repair, normal wear or missing parts may not qualify."],
      ["Refund process", "Once approved, we will confirm the return or collection steps and the expected refund method. Refunds are issued to the original payment method where possible. Delivery, collection or inspection charges may be deducted when applicable."],
    ],
  },
} as const;

type PolicyKey = keyof typeof policies;

export default function Policy() {
  const { pathname } = useLocation();
  const type = pathname.slice(1);
  const policy = policies[(type || "privacy") as PolicyKey] || policies.privacy;

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--blue)] mb-4">{policy.eyebrow}</p>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-[var(--fg)] mb-5">{policy.title}</h1>
          <p className="text-lg text-[var(--fg2)] leading-relaxed max-w-3xl">{policy.intro}</p>
          <p className="text-xs text-[var(--fg3)] mt-4">Last updated: August 23, 2026</p>
        </div>

        <div className="space-y-8">
          {policy.sections.map(([heading, content]) => (
            <section key={heading} className="border-t border-[var(--border)] pt-7">
              <h2 className="font-display font-bold text-xl text-[var(--fg)] mb-3">{heading}</h2>
              <p className="text-sm sm:text-base text-[var(--fg2)] leading-7">{content}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-[var(--bg3)] border border-[var(--border)]">
          <h2 className="font-display font-bold text-lg text-[var(--fg)] mb-2">Questions about this policy?</h2>
          <p className="text-sm text-[var(--fg2)] mb-4">Contact Emmytech Digital Solutions for help with an order or request.</p>
          <Link to="/contact" className="text-sm font-semibold text-[var(--blue)] hover:underline">Contact us</Link>
        </div>
      </div>
    </main>
  );
}
