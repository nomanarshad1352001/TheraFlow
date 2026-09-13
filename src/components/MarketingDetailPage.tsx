"use client";

import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CalendarCheck2,
  Check,
  CircleDollarSign,
  Cloud,
  Code2,
  CreditCard,
  Globe2,
  Languages,
  Layers3,
  LockKeyhole,
  Network,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TestTube2,
  UserRound,
  UsersRound,
  Video,
  Workflow,
  Zap,
} from "lucide-react";
import { EditorialHero } from "./EditorialHero";
import { LuxuryPageShell } from "./LuxuryChrome";
import { editorialImages, pagePhotoSets, type EditorialImage } from "@/lib/media";

export type MarketingVariant = "platform" | "solutions" | "technology";

type PageConfig = {
  active: string;
  eyebrow: string;
  title: string;
  italic: string;
  intro: string;
  note: string;
  metrics: [string, string][];
  chaptersTitle: string;
  chaptersIntro: string;
  chapters: { icon: LucideIcon; title: string; text: string; points: string[]; image: EditorialImage }[];
  statement: string;
  statementText: string;
  outcomes: { icon: LucideIcon; title: string; text: string }[];
  closingImage: EditorialImage;
};

const configs: Record<MarketingVariant, PageConfig> = {
  platform: {
    active: "/platform",
    eyebrow: "The TheraFlow platform",
    title: "Every patient journey,",
    italic: "beautifully connected.",
    intro:
      "A white-label booking experience and a dedicated clinic CRM that connect patients, clinicians, operations teams and your existing infrastructure.",
    note: "Patient-first on the surface. Operationally precise underneath.",
    metrics: [["24/7", "self-service access"], ["03", "guided booking steps"], ["05", "result and recovery states"], ["02", "localized languages"]],
    chaptersTitle: "One platform. Two calm experiences.",
    chaptersIntro: "TheraFlow keeps the patient journey simple while giving clinic teams the controls and context they need.",
    chapters: [
      {
        icon: CalendarCheck2,
        title: "Patient booking",
        text: "A guided booking form that helps people decide without feeling overwhelmed.",
        points: ["Service, specialist and visit-mode filtering", "Live availability and empty-week recovery", "Pricing, duration and location clarity", "Booking for yourself or someone else"],
        image: editorialImages.therapyRoom,
      },
      {
        icon: UsersRound,
        title: "Clinic CRM",
        text: "A focused operational workspace for the team delivering care every day.",
        points: ["Appointment queue and status control", "Patient records and history", "Service and specialist administration", "Search, metrics and activity views"],
        image: editorialImages.modernWorkspace,
      },
      {
        icon: Workflow,
        title: "Connected workflows",
        text: "A typed integration boundary for the systems clinics already depend on.",
        points: ["Payments and refund outcomes", "Invoices and fiscal workflows", "Calendar export and telehealth links", "GraphQL mutations and slot availability"],
        image: editorialImages.secureLaptop,
      },
      {
        icon: Globe2,
        title: "Bilingual delivery",
        text: "A complete Polish and English experience for patients and staff.",
        points: ["Localized copy and validation", "Locale-aware dates and pricing", "Translated service catalogue", "Language-specific confirmations"],
        image: editorialImages.clinicLounge,
      },
    ],
    statement: "Less coordination. More capacity for care.",
    statementText:
      "A thoughtfully designed booking journey reduces reception workload, avoids incomplete data, and gives patients confidence before their first conversation.",
    outcomes: [
      { icon: CircleDollarSign, title: "Higher conversion", text: "Transparent choices and a shorter path to confirmation reduce drop-off." },
      { icon: ShieldCheck, title: "Fewer errors", text: "Typed validation and explicit recovery states prevent avoidable mistakes." },
      { icon: Sparkles, title: "Stronger brand", text: "A premium white-label journey reflects the quality of care patients expect." },
      { icon: BarChart3, title: "Clear operations", text: "Status, service and team context stay visible and actionable." },
    ],
    closingImage: editorialImages.hospitalHall,
  },
  solutions: {
    active: "/solutions",
    eyebrow: "Solutions by care model",
    title: "Made to fit the way",
    italic: "your clinic grows.",
    intro:
      "From an independent therapist to a multi-location mental healthcare group, TheraFlow adapts the patient journey without diluting your brand or workflow.",
    note: "One considered foundation, configured around your care model.",
    metrics: [["01", "experience across channels"], ["05–50", "specialist sweet spot"], ["04", "ideal buyer profiles"], ["100%", "white-label ready"]],
    chaptersTitle: "The right experience for every provider.",
    chaptersIntro: "Choose the rules, services, people, language and integrations that reflect how your team actually works.",
    chapters: [
      {
        icon: UserRound,
        title: "Private practice",
        text: "Give a solo therapy practice the presence and automation of a much larger clinic.",
        points: ["Professional public booking page", "Online and in-person availability", "Simple service and price management", "Less scheduling through messages"],
        image: editorialImages.quietOffice,
      },
      {
        icon: Building2,
        title: "Therapy clinics",
        text: "Coordinate services and specialists while keeping patient choice simple.",
        points: ["Specialist-to-service relationships", "Any-specialist availability search", "Payer and patient separation", "Reception and owner roles"],
        image: editorialImages.careTeam,
      },
      {
        icon: Network,
        title: "Clinic groups",
        text: "Create consistency across locations without losing local flexibility.",
        points: ["Location-aware availability rules", "Shared brand and design system", "Structured integration contracts", "Scalable, typed frontend modules"],
        image: editorialImages.diverseTeam,
      },
      {
        icon: Video,
        title: "Telehealth providers",
        text: "Make online care easy to discover, book, pay for and attend.",
        points: ["Online-first service filtering", "Remote specialist matching", "Virtual appointment confirmations", "Calendar and meeting-link integration"],
        image: editorialImages.doctorTablet,
      },
    ],
    statement: "A premium first impression at every scale.",
    statementText:
      "Patients experience one confident, low-friction brand. Your team retains the operational detail required to deliver safe and reliable care.",
    outcomes: [
      { icon: Globe2, title: "Reach more patients", text: "Bilingual and hybrid experiences make care available to a wider audience." },
      { icon: CreditCard, title: "Protect revenue", text: "Clear pricing and connected payment states support reliable collections." },
      { icon: UsersRound, title: "Support the team", text: "Reduce repetitive reception tasks and give staff a shared view." },
      { icon: BadgeCheck, title: "Build trust", text: "A polished experience signals quality before the first appointment." },
    ],
    closingImage: editorialImages.teamConversation,
  },
  technology: {
    active: "/technology",
    eyebrow: "Technology and delivery",
    title: "A modern foundation for",
    italic: "dependable care.",
    intro:
      "A maintainable, typed and testable frontend architecture designed to integrate safely inside a mature healthcare SaaS product.",
    note: "Built to change confidently, without breaking production workflows.",
    metrics: [["100%", "TypeScript"], ["E2E", "critical-flow coverage"], ["A11y", "primitive-first UI"], ["PL / EN", "localized by design"]],
    chaptersTitle: "Production technology, thoughtfully applied.",
    chaptersIntro: "Every tool has a clear responsibility — from form correctness and API safety to state isolation and accessible interaction.",
    chapters: [
      {
        icon: Code2,
        title: "Application foundation",
        text: "A server-capable React foundation for fast, scalable patient experiences.",
        points: ["Next.js App Router", "React and strict TypeScript", "Tailwind CSS v4 design tokens", "shadcn/ui and Radix primitives"],
        image: editorialImages.modernWorkspace,
      },
      {
        icon: Workflow,
        title: "Forms and state",
        text: "Explicit schemas and focused stores keep complex multistep flows predictable.",
        points: ["React Hook Form", "Zod validation schemas", "Zustand workflow state", "Jotai for isolated atoms"],
        image: editorialImages.analyticsDesk,
      },
      {
        icon: Cloud,
        title: "Data integration",
        text: "Typed contracts keep the frontend aligned with the existing SaaS backend.",
        points: ["Apollo Client", "Typed GraphQL operations", "GraphQL Code Generator", "Server-side secret boundaries"],
        image: editorialImages.secureLaptop,
      },
      {
        icon: TestTube2,
        title: "Quality engineering",
        text: "Production behaviour is protected across browsers, languages and failure states.",
        points: ["Playwright critical journey tests", "Type generation and strict checks", "Responsive and keyboard testing", "Payment and slot conflict scenarios"],
        image: editorialImages.workshop,
      },
    ],
    statement: "Designed for a mature codebase — not a disposable prototype.",
    statementText:
      "Clear module boundaries, typed integration points and comprehensive UI states make the implementation safer to review, release and maintain.",
    outcomes: [
      { icon: Layers3, title: "Composable", text: "Reusable primitives and feature modules avoid duplicated behaviour." },
      { icon: LockKeyhole, title: "Privacy-minded", text: "Secrets stay server-side and sensitive flows have explicit boundaries." },
      { icon: Languages, title: "Localizable", text: "Copy, validation, dates and statuses are designed for PL and EN." },
      { icon: Zap, title: "Performant", text: "Focused rendering and modern delivery keep interactions immediate." },
    ],
    closingImage: editorialImages.forest,
  },
};

export function MarketingDetailPage({ variant }: { variant: MarketingVariant }) {
  const page = configs[variant];
  const photos = pagePhotoSets[variant];

  return (
    <LuxuryPageShell active={page.active}>
      <main>
        <EditorialHero
          eyebrow={page.eyebrow}
          title={page.title}
          italic={page.italic}
          description={page.intro}
          photos={photos}
          primary={{ label: "Try the booking demo", href: "/book" }}
          secondary={{ label: "Open the CRM", href: "/crm/login" }}
        />

        <section className="border-y border-white/10 bg-[#0b0b0d] px-5 py-12 sm:px-8">
          <div className="mx-auto grid max-w-[1380px] grid-cols-2 gap-y-8 lg:grid-cols-4">
            {page.metrics.map(([value, label], index) => (
              <div key={label} className={`text-center ${index > 0 ? "lg:border-l lg:border-white/10" : ""}`}>
                <p className="luxury-title text-4xl t-gold">{value}</p>
                <p className="mt-1 text-[9px] font-extrabold uppercase tracking-[.17em] t-low">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
              <h2 className="luxury-title text-5xl leading-none sm:text-6xl">{page.chaptersTitle}</h2>
              <p className="max-w-xl text-sm leading-7 t-mid lg:justify-self-end">{page.chaptersIntro}</p>
            </div>

            <div className="stagger-luxury mt-14 grid gap-4 md:grid-cols-2">
              {page.chapters.map((chapter, index) => (
                <article key={chapter.title} className="surface surface-hover group overflow-hidden rounded-2xl">
                  <a href={chapter.image.source} target="_blank" rel="noreferrer" className="luxury-image img-tone relative block h-48">
                    <img src={chapter.image.src} alt={chapter.image.alt} />
                    <span className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-transparent" />
                    <span className="luxury-title absolute right-5 top-4 text-3xl text-white/35">0{index + 1}</span>
                  </a>
                  <div className="p-7 sm:p-8">
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-[#d9bc7f]/35 t-gold">
                      <chapter.icon size={19} />
                    </span>
                    <h3 className="luxury-title mt-6 text-4xl">{chapter.title}</h3>
                    <p className="mt-3 text-sm leading-6 t-mid">{chapter.text}</p>
                    <ul className="mt-6 space-y-3">
                      {chapter.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-xs font-medium t-low">
                          <Check size={14} className="mt-0.5 shrink-0 t-gold" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0b0b0d] px-5 py-24 sm:px-8">
          <div className="mx-auto grid max-w-[1380px] gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div>
              <span className="luxury-kicker">The outcome</span>
              <h2 className="luxury-title mt-7 text-5xl leading-none sm:text-6xl">{page.statement}</h2>
              <p className="mt-6 max-w-lg text-sm leading-7 t-mid">{page.statementText}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {page.outcomes.map((outcome) => (
                <div key={outcome.title} className="surface rounded-2xl p-7">
                  <outcome.icon size={20} className="t-gold" />
                  <h3 className="mt-8 font-bold t-hi">{outcome.title}</h3>
                  <p className="mt-2 text-xs leading-5 t-low">{outcome.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8">
          <div className="relative mx-auto max-w-[1380px] overflow-hidden rounded-sm border border-white/10">
            <img src={page.closingImage.src} alt={page.closingImage.alt} className="absolute inset-0 h-full w-full object-cover opacity-20" />
            <div className="relative bg-[#08080a]/72 px-6 py-20 text-center sm:px-12">
              <span className="luxury-kicker justify-center">See it in motion</span>
              <h2 className="luxury-title mt-6 text-5xl sm:text-6xl">
                Turn a considered idea
                <br />
                into a confident booking.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 t-mid">
                The demo uses safe browser data, so you can complete a patient booking and manage it inside the CRM.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="/book" className="btn-gold group flex items-center justify-center gap-3 rounded-full px-7 py-4 text-[11px] uppercase tracking-[.13em]">
                  Try patient booking <ArrowRight size={14} />
                </a>
                <a href="/pricing" className="btn-ghost rounded-full px-7 py-4 text-[11px] font-extrabold uppercase tracking-[.13em]">
                  View pricing
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </LuxuryPageShell>
  );
}
