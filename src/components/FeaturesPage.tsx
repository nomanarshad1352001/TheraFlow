"use client";

import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  CalendarDays,
  CircleDollarSign,
  ClipboardCheck,
  CreditCard,
  FileText,
  Globe2,
  Languages,
  LayoutDashboard,
  MapPin,
  ShieldCheck,
  Stethoscope,
  UserRound,
  UsersRound,
  Video,
  Workflow,
} from "lucide-react";
import { EditorialHero } from "./EditorialHero";
import { LuxuryPageShell } from "./LuxuryChrome";
import { editorialImages, pagePhotoSets } from "@/lib/media";

const groups = [
  {
    number: "01",
    title: "Patient booking",
    description: "A guided, low-anxiety path from intent to confirmed appointment.",
    image: editorialImages.therapyRoom,
    features: [
      [Stethoscope, "Service discovery", "Present purpose, duration, format and price without clinical complexity."],
      [UsersRound, "Specialist matching", "Filter clinicians by service or surface the earliest qualified specialist."],
      [CalendarDays, "Live availability", "Weekly navigation, empty-week recovery and conflict handling."],
      [Video, "Hybrid visits", "Service-specific online and in-office choices with location context."],
    ],
  },
  {
    number: "02",
    title: "Patient information",
    description: "Structured data collection for real-world healthcare relationships.",
    image: editorialImages.handsCare,
    features: [
      [UserRound, "Book for anyone", "Support booking for oneself, a child, partner, parent or another patient."],
      [CreditCard, "Separate the payer", "Keep care recipient and financially responsible person distinct."],
      [ClipboardCheck, "Typed validation", "Field-level guidance, localized messages and progressive completion."],
      [ShieldCheck, "Consent-ready", "Designed for privacy, policy and clinical consent requirements."],
    ],
  },
  {
    number: "03",
    title: "Clinic CRM",
    description: "The context and controls teams need throughout the working day.",
    image: editorialImages.analyticsDesk,
    features: [
      [LayoutDashboard, "Operational overview", "Upcoming care, attention items, capacity and revenue indicators."],
      [CalendarClock, "Booking management", "Search, create, update, confirm, complete and cancel appointments."],
      [FileText, "Service catalogue", "Control duration, pricing, delivery format, translations and status."],
      [MapPin, "Team and locations", "Connect specialists to services, availability rules and places of care."],
    ],
  },
];

const platformRows = [
  ["Bilingual patient journey", "Included", "Polish and English copy, dates, validation and statuses"],
  ["Payment outcomes", "Integrated", "Success, pending, failed, refunded and retry-ready states"],
  ["Slot protection", "Real-time", "Availability re-check and clear slot-taken recovery"],
  ["Calendar workflow", "Connected", "Existing calendar export and event integrations"],
  ["Accessible interactions", "Built in", "Keyboard flow, contrast, semantics and reduced motion"],
  ["White-label design", "Flexible", "Clinic identity, palette, content and service structure"],
];

export function FeaturesPage() {
  return (
    <LuxuryPageShell active="/features">
      <main>
        <EditorialHero
          eyebrow="Complete capability set"
          title="Everything needed to make care"
          italic="easier to access."
          description="TheraFlow combines a refined patient journey, a structured clinic CRM, and dependable integration states in one white-label experience."
          photos={pagePhotoSets.features}
          primary={{ label: "Try the booking flow", href: "/book" }}
          secondary={{ label: "View pricing", href: "/pricing" }}
        />

        <section className="border-y border-white/10 bg-[#0b0b0d] px-5 py-10 sm:px-8">
          <div className="mx-auto grid max-w-[1380px] grid-cols-2 gap-8 lg:grid-cols-4">
            {[[Globe2, "Bilingual by design"], [Workflow, "Integration-ready"], [BadgeCheck, "Complete UI states"], [ShieldCheck, "Privacy-minded"]].map(([Icon, label]) => (
              <div key={label as string} className="flex items-center justify-center gap-3">
                <Icon size={17} className="t-gold" />
                <span className="text-[10px] font-extrabold uppercase tracking-[.14em] t-mid">{label as string}</span>
              </div>
            ))}
          </div>
        </section>

        {groups.map((group, groupIndex) => (
          <section key={group.number} className={`px-5 py-24 sm:px-8 ${groupIndex % 2 === 1 ? "border-y border-white/10 bg-[#0b0b0d]" : ""}`}>
            <div className="mx-auto max-w-[1380px]">
              <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]">
                <div>
                  <span className="luxury-title text-3xl t-gold">{group.number}</span>
                  <h2 className="luxury-title mt-5 text-5xl">{group.title}</h2>
                  <p className="mt-4 max-w-sm text-sm leading-7 t-mid">{group.description}</p>
                  <a href={group.image.source} target="_blank" rel="noreferrer" className="luxury-image img-tone mt-8 block h-56 rounded-sm">
                    <img src={group.image.src} alt={group.image.alt} />
                  </a>
                </div>
                <div className="stagger-luxury grid gap-3 sm:grid-cols-2">
                  {group.features.map(([Icon, title, text]) => (
                    <article key={title as string} className="surface surface-hover rounded-2xl p-7">
                      <Icon size={19} className="t-gold" />
                      <h3 className="mt-8 font-bold t-hi">{title as string}</h3>
                      <p className="mt-3 text-xs leading-6 t-low">{text as string}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
              <div>
                <span className="luxury-kicker">From click to care</span>
                <h2 className="luxury-title mt-6 text-5xl sm:text-6xl">One continuous workflow.</h2>
              </div>
              <p className="max-w-xl text-sm leading-7 t-mid lg:justify-self-end">
                Each stage passes clean, useful information into the next — without exposing operational complexity to the patient.
              </p>
            </div>
            <div className="mt-14 grid gap-3 md:grid-cols-5">
              {[["01", "Discover", Stethoscope], ["02", "Choose", CalendarDays], ["03", "Validate", ClipboardCheck], ["04", "Pay", CircleDollarSign], ["05", "Confirm", BadgeCheck]].map(([number, label, Icon]) => (
                <div key={label as string} className="surface surface-hover rounded-2xl p-5">
                  <Icon size={18} className="t-gold" />
                  <p className="luxury-title mt-10 text-3xl">{number as string}</p>
                  <p className="mt-1 text-[10px] font-extrabold uppercase tracking-[.15em] t-mid">{label as string}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0b0b0d] px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1100px]">
            <div className="text-center">
              <span className="luxury-kicker justify-center">Platform standards</span>
              <h2 className="luxury-title mt-6 text-5xl">Details are part of the product.</h2>
            </div>
            <div className="surface mt-12 overflow-hidden rounded-2xl">
              {platformRows.map(([name, status, detail], index) => (
                <div key={name} className={`grid gap-3 px-5 py-5 sm:grid-cols-[1fr_.45fr_1.5fr] sm:items-center ${index > 0 ? "border-t border-white/10" : ""}`}>
                  <p className="text-xs font-bold t-hi">{name}</p>
                  <span className="w-fit rounded-full border border-[#d9bc7f]/30 bg-[#d9bc7f]/10 px-3 py-1 text-[9px] font-extrabold uppercase tracking-wider t-gold">{status}</span>
                  <p className="text-xs leading-5 t-low">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 text-center sm:px-8">
          <div className="mx-auto max-w-3xl">
            <Languages className="mx-auto t-gold" />
            <h2 className="luxury-title mt-6 text-5xl">See the complete journey.</h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 t-mid">
              Experience every selection, validation, confirmation and recovery state in the interactive patient demo.
            </p>
            <a href="/book" className="btn-gold mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-[10px] uppercase tracking-[.13em]">
              Open booking demo <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </main>
    </LuxuryPageShell>
  );
}
