"use client";

import { useState } from "react";
import { ArrowRight, Building2, Check, CircleDollarSign, HelpCircle, Stethoscope, UsersRound } from "lucide-react";
import { EditorialHero } from "./EditorialHero";
import { LuxuryPageShell } from "./LuxuryChrome";
import { editorialImages, pagePhotoSets } from "@/lib/media";

const plans = [
  {
    name: "Practice",
    description: "For independent therapists building a premium private practice.",
    monthly: 149,
    annual: 119,
    icon: Stethoscope,
    highlight: false,
    action: "Start with Practice",
    image: editorialImages.quietOffice,
    features: ["1 specialist profile", "Public booking experience", "Online and in-office visits", "Polish and English", "Email confirmations", "Basic service management"],
  },
  {
    name: "Clinic",
    description: "For established mental healthcare teams coordinating care at scale.",
    monthly: 499,
    annual: 399,
    icon: UsersRound,
    highlight: true,
    action: "Choose Clinic",
    image: editorialImages.careTeam,
    features: ["Up to 15 specialists", "Everything in Practice", "Patient and payer separation", "Full clinic CRM workspace", "Payments and invoicing hooks", "Priority implementation support"],
  },
  {
    name: "Network",
    description: "For multi-location groups with tailored operations and integrations.",
    monthly: null,
    annual: null,
    icon: Building2,
    highlight: false,
    action: "Talk to sales",
    image: editorialImages.diverseTeam,
    features: ["Unlimited clinic locations", "Custom specialist capacity", "Everything in Clinic", "Custom GraphQL integrations", "White-label design system", "Dedicated rollout planning"],
  },
];

const comparison = [
  ["Public booking page", "Included", "Included", "Included"],
  ["Specialists", "1", "Up to 15", "Custom"],
  ["CRM staff accounts", "1", "Up to 8", "Custom"],
  ["Patient + payer profiles", "—", "Included", "Included"],
  ["Payments and invoices", "Add-on", "Included", "Custom"],
  ["Multiple locations", "—", "Add-on", "Included"],
  ["Implementation support", "Standard", "Priority", "Dedicated"],
];

const faq = [
  ["Is this a per-specialist price?", "Practice is designed for one specialist. Clinic includes up to 15 active specialist profiles, while Network is scoped around your locations and operating model."],
  ["Can we use our existing payments and calendar?", "Yes. TheraFlow is designed to connect with existing payment, invoicing, slot availability, telehealth and calendar workflows."],
  ["Is the patient experience white-label?", "Yes. Clinic identity, colours, service copy, locations, languages and patient communications are configured around your brand."],
  ["What is included in implementation?", "We configure the booking structure, visual identity, content, service rules, staff roles and agreed integrations. Complex migrations are scoped separately."],
];

export function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <LuxuryPageShell active="/pricing">
      <main>
        <EditorialHero
          eyebrow="Simple, considered pricing"
          title="Invest in access to care,"
          italic="not administration."
          description="Choose a plan that reflects your team today, with a clear path from private practice to a connected multi-location network."
          photos={pagePhotoSets.pricing}
          primary={{ label: "Request a walkthrough", href: "/contact" }}
          secondary={{ label: "See all features", href: "/features" }}
        />

        <section className="px-5 pb-24 sm:px-8">
          <div className="mx-auto max-w-[1380px]">
            <div className="flex justify-center">
              <div className="surface inline-flex rounded-full p-1">
                <button
                  onClick={() => setAnnual(false)}
                  className={`rounded-full px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-wider ${!annual ? "btn-gold" : "t-low hover:text-[#f7f5f0]"}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setAnnual(true)}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] font-extrabold uppercase tracking-wider ${annual ? "btn-gold" : "t-low hover:text-[#f7f5f0]"}`}
                >
                  Annual
                  <span className={`rounded-full px-2 py-0.5 text-[8px] ${annual ? "bg-black/20 text-[#08080a]" : "bg-[#d9bc7f]/15 t-gold"}`}>Save 20%</span>
                </button>
              </div>
            </div>

            <div className="stagger-luxury mt-12 grid gap-5 lg:grid-cols-3">
              {plans.map((plan) => (
                <article
                  key={plan.name}
                  className={`relative flex flex-col overflow-hidden rounded-2xl border ${
                    plan.highlight ? "border-[#d9bc7f]/55 bg-[#141311] shadow-2xl shadow-black/60" : "border-white/10 bg-[#121215]"
                  }`}
                >
                  <a href={plan.image.source} target="_blank" rel="noreferrer" className="luxury-image img-tone relative block h-40">
                    <img src={plan.image.src} alt={plan.image.alt} />
                    <span className="absolute inset-0 bg-gradient-to-t from-[#121215] via-[#121215]/35 to-transparent" />
                    {plan.highlight && (
                      <span className="absolute right-4 top-4 rounded-full bg-[#d9bc7f] px-3 py-1 text-[8px] font-extrabold uppercase tracking-wider text-[#08080a]">
                        Most selected
                      </span>
                    )}
                  </a>

                  <div className="flex flex-1 flex-col p-7 sm:p-8">
                    <plan.icon size={22} className="t-gold" />
                    <h2 className="luxury-title mt-6 text-4xl">{plan.name}</h2>
                    <p className="mt-3 min-h-12 text-xs leading-5 t-low">{plan.description}</p>

                    <div className="mt-8">
                      {plan.monthly ? (
                        <>
                          <span className="luxury-title text-5xl">{annual ? plan.annual : plan.monthly} zł</span>
                          <span className="ml-2 text-[10px] t-dim">/ month</span>
                          <p className="mt-1 text-[9px] t-dim">{annual ? "billed annually" : "billed monthly"}</p>
                        </>
                      ) : (
                        <>
                          <span className="luxury-title text-5xl">Custom</span>
                          <p className="mt-1 text-[9px] t-dim">designed around your network</p>
                        </>
                      )}
                    </div>

                    <div className="my-8 h-px bg-white/10" />

                    <ul className="flex-1 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-xs t-mid">
                          <Check size={14} className="mt-0.5 shrink-0 t-gold" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <a
                      href="/contact"
                      className={`mt-9 flex items-center justify-center gap-2 rounded-full py-3.5 text-[10px] font-extrabold uppercase tracking-[.12em] ${
                        plan.highlight ? "btn-gold" : "btn-ghost"
                      }`}
                    >
                      {plan.action}
                      <ArrowRight size={13} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0b0b0d] px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
              <div>
                <span className="luxury-kicker">Clear from the start</span>
                <h2 className="luxury-title mt-6 text-5xl">What implementation includes.</h2>
              </div>
              <p className="max-w-lg text-sm leading-7 t-mid lg:justify-self-end">
                Every rollout begins with a focused implementation phase so the product reflects your care model rather
                than forcing a generic workflow.
              </p>
            </div>
            <div className="stagger-luxury mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {["Booking structure and service rules", "Clinic brand and bilingual content", "CRM workspace and role setup", "Agreed integration configuration"].map((item, index) => (
                <div key={item} className="border-t border-white/15 pt-5">
                  <span className="luxury-title text-2xl t-gold">0{index + 1}</span>
                  <p className="mt-5 text-xs font-bold leading-5 t-hi">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="text-center">
              <span className="luxury-kicker justify-center">Plan comparison</span>
              <h2 className="luxury-title mt-6 text-5xl">Choose with confidence.</h2>
            </div>
            <div className="surface mt-12 overflow-x-auto rounded-2xl">
              <div className="min-w-[680px]">
                <div className="grid grid-cols-[1.35fr_1fr_1fr_1fr] border-b border-white/10 bg-[#17171a] px-5 py-4 text-[9px] font-extrabold uppercase tracking-[.15em] t-gold">
                  <span>Capability</span>
                  <span>Practice</span>
                  <span>Clinic</span>
                  <span>Network</span>
                </div>
                {comparison.map((row, index) => (
                  <div key={row[0]} className={`grid grid-cols-[1.35fr_1fr_1fr_1fr] px-5 py-4 text-xs ${index > 0 ? "border-t border-white/10" : ""}`}>
                    <span className="font-bold t-hi">{row[0]}</span>
                    <span className="t-low">{row[1]}</span>
                    <span className="t-mid">{row[2]}</span>
                    <span className="t-low">{row[3]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0b0b0d] px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1000px]">
            <div className="text-center">
              <HelpCircle className="mx-auto t-gold" />
              <h2 className="luxury-title mt-6 text-5xl">Questions before you choose.</h2>
            </div>
            <div className="mt-12 grid gap-3 md:grid-cols-2">
              {faq.map(([question, answer]) => (
                <div key={question} className="surface rounded-2xl p-7">
                  <h3 className="font-bold t-hi">{question}</h3>
                  <p className="mt-3 text-xs leading-6 t-low">{answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 text-center sm:px-8">
          <CircleDollarSign className="mx-auto t-gold" />
          <h2 className="luxury-title mt-6 text-5xl sm:text-6xl">Let&rsquo;s shape the right plan.</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 t-mid">
            Tell us about your clinic, specialist count, locations and existing integrations.
          </p>
          <a href="/contact" className="btn-gold mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-[10px] uppercase tracking-[.13em]">
            Request a proposal <ArrowRight size={14} />
          </a>
        </section>
      </main>
    </LuxuryPageShell>
  );
}
