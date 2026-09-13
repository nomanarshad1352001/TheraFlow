"use client";

import { ArrowRight, BadgeCheck, Check, HeartHandshake, Layers3, MessageCircle, ShieldCheck, Sparkles, Target, UsersRound } from "lucide-react";
import { EditorialHero } from "./EditorialHero";
import { LuxuryPageShell } from "./LuxuryChrome";
import { editorialImages, pagePhotoSets } from "@/lib/media";

const principles = [
  {
    icon: HeartHandshake,
    title: "Human before technical",
    text: "The patient may be anxious, uncertain, or booking for someone they love. Every choice should respect that.",
    image: editorialImages.handsCare,
  },
  {
    icon: Target,
    title: "Clarity before novelty",
    text: "A beautiful interface matters, but clarity, predictability and recovery matter more in healthcare.",
    image: editorialImages.quietOffice,
  },
  {
    icon: Layers3,
    title: "Fit before replacement",
    text: "Mature clinics already have payments, calendars and operational systems. We connect rather than rebuild.",
    image: editorialImages.secureLaptop,
  },
  {
    icon: ShieldCheck,
    title: "Trust before speed",
    text: "We document sensitive boundaries and test behaviour that could affect patients or clinic revenue.",
    image: editorialImages.hospitalHall,
  },
];

const process = [
  { n: "01", title: "Understand", text: "Read the existing code, prototype, service rules, integrations and known production behaviour.", image: editorialImages.strategySession },
  { n: "02", title: "Define", text: "Turn design intent into explicit interaction, data, validation and error-state acceptance criteria.", image: editorialImages.analyticsDesk },
  { n: "03", title: "Build", text: "Implement in focused modules with typed boundaries and reviewable milestone delivery.", image: editorialImages.modernWorkspace },
  { n: "04", title: "Prove", text: "Test critical journeys, bilingual behaviour, responsive layouts and integration states.", image: editorialImages.workshop },
  { n: "05", title: "Release", text: "Support staged rollout, production verification, documentation and a clean handover.", image: editorialImages.healthcareTeam },
];

const team = [
  { name: "Product design", role: "Patient journey & interface", image: editorialImages.specialistWoman },
  { name: "Frontend engineering", role: "Typed implementation", image: editorialImages.specialistMan },
  { name: "Clinical advisory", role: "Care-model accuracy", image: editorialImages.therapist },
  { name: "Delivery & QA", role: "Testing and rollout", image: editorialImages.specialistWomanTwo },
];

export function AboutPage() {
  return (
    <LuxuryPageShell active="/about">
      <main>
        <EditorialHero
          eyebrow="About TheraFlow"
          title="Technology should make care feel"
          italic="more human."
          description="TheraFlow is a product vision for clinics that believe the patient experience begins long before a session — and that thoughtful software gives care teams more time for what matters."
          photos={pagePhotoSets.about}
          primary={{ label: "Meet the platform", href: "/platform" }}
          secondary={{ label: "Talk to us", href: "/contact" }}
        />

        {/* STORY + SMALL PICTURES */}
        <section className="px-5 py-24 sm:px-8">
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <span className="luxury-kicker">Why it exists</span>
              <h2 className="luxury-title mt-6 text-5xl leading-none sm:text-6xl">
                A small moment with a large emotional weight.
              </h2>
              <div className="mt-8 grid grid-cols-3 gap-2">
                {[editorialImages.botanical, editorialImages.therapyRoom, editorialImages.lake].map((image) => (
                  <a key={image.src} href={image.source} target="_blank" rel="noreferrer" className="luxury-image img-tone h-24 rounded-sm sm:h-28">
                    <img src={image.src} alt={image.alt} />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6 text-sm leading-8 t-mid">
              <p>
                Booking therapy is not the same as reserving a table. A patient may have spent weeks deciding to ask for
                help. They need enough information to choose confidently, without clinical complexity or administrative
                friction.
              </p>
              <p>
                At the same time, clinic teams need structured patient data, reliable slot handling, clear payment
                outcomes, and software that works with established operational systems. TheraFlow is where those needs
                meet.
              </p>
              <p className="luxury-title border-l border-[#d9bc7f] pl-6 text-3xl leading-snug t-gold">
                The product succeeds when the patient feels reassured and the clinic receives exactly what it needs.
              </p>
            </div>
          </div>
        </section>

        {/* PRINCIPLES WITH SMALL PICTURES */}
        <section className="border-y border-white/10 bg-[#0b0b0d] px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1380px]">
            <div className="text-center">
              <span className="luxury-kicker justify-center">Product principles</span>
              <h2 className="luxury-title mt-6 text-5xl sm:text-6xl">The standards behind each decision.</h2>
            </div>
            <div className="stagger-luxury mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {principles.map((principle, index) => (
                <article key={principle.title} className="surface surface-hover overflow-hidden rounded-2xl">
                  <a href={principle.image.source} target="_blank" rel="noreferrer" className="luxury-image img-tone block h-32">
                    <img src={principle.image.src} alt={principle.image.alt} />
                  </a>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <principle.icon size={19} className="t-gold" />
                      <span className="luxury-title text-2xl t-dim">0{index + 1}</span>
                    </div>
                    <h3 className="luxury-title mt-6 text-3xl">{principle.title}</h3>
                    <p className="mt-3 text-xs leading-6 t-low">{principle.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROMISE */}
        <section className="px-5 py-24 sm:px-8">
          <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="luxury-kicker">Our promise</span>
              <h2 className="luxury-title mt-6 text-5xl leading-none sm:text-6xl">
                Calm on the surface.
                <br />
                <em className="t-gold">Rigorous underneath.</em>
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-7 t-mid">
                The visual language is intentionally quiet. Behind it sits careful state management, validation,
                integration handling, localization, accessibility and testing.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                [BadgeCheck, "Product judgement", "Decisions weigh patients, staff, business rules and maintainability together."],
                [UsersRound, "Collaborative delivery", "Milestones create clear review points instead of one risky handoff."],
                [MessageCircle, "Direct communication", "Risks, assumptions and decisions are raised early and plainly."],
                [Sparkles, "Finish with purpose", "Motion, imagery and polish always support hierarchy and trust."],
              ].map(([Icon, title, text]) => (
                <div key={title as string} className="surface rounded-2xl p-7">
                  <Icon size={19} className="t-gold" />
                  <h3 className="mt-8 font-bold t-hi">{title as string}</h3>
                  <p className="mt-3 text-xs leading-5 t-low">{text as string}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW WE WORK — with images, high contrast */}
        <section id="how-we-work" className="border-y border-white/10 bg-[#0b0b0d] px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
              <div>
                <span className="luxury-kicker">How we work</span>
                <h2 className="luxury-title mt-6 text-5xl leading-none sm:text-6xl">
                  A reliable path from
                  <br />
                  <em className="t-gold">prototype to production.</em>
                </h2>
              </div>
              <p className="max-w-lg text-sm leading-7 t-mid lg:justify-self-end">
                The process is designed for existing, mature products where preserving live behaviour matters as much as
                delivering the redesign.
              </p>
            </div>

            <div className="stagger-luxury mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {process.map((step) => (
                <article key={step.n} className="surface surface-hover overflow-hidden rounded-2xl">
                  <a href={step.image.source} target="_blank" rel="noreferrer" className="luxury-image img-tone block h-28">
                    <img src={step.image.src} alt={step.image.alt} />
                  </a>
                  <div className="p-5">
                    <span className="luxury-title text-3xl t-gold">{step.n}</span>
                    <h3 className="mt-4 font-bold t-hi">{step.title}</h3>
                    <p className="mt-3 text-[11px] leading-5 t-low">{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1380px]">
            <div className="text-center">
              <span className="luxury-kicker justify-center">The people</span>
              <h2 className="luxury-title mt-6 text-5xl sm:text-6xl">One accountable team.</h2>
            </div>
            <div className="stagger-luxury mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <article key={member.name} className="surface surface-hover overflow-hidden rounded-2xl text-center">
                  <a href={member.image.source} target="_blank" rel="noreferrer" className="luxury-image img-tone block h-56">
                    <img src={member.image.src} alt={member.image.alt} />
                  </a>
                  <div className="p-6">
                    <h3 className="luxury-title text-2xl">{member.name}</h3>
                    <p className="mt-2 text-[10px] font-extrabold uppercase tracking-[.14em] t-gold">{member.role}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-[#0b0b0d] px-5 py-24 text-center sm:px-8">
          <Check className="mx-auto t-gold" />
          <h2 className="luxury-title mt-6 text-5xl sm:text-6xl">Let&rsquo;s build a calmer path to care.</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 t-mid">
            Share your clinic model, existing product, and the patient experience you want to create.
          </p>
          <a href="/contact" className="btn-gold mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-[10px] uppercase tracking-[.13em]">
            Start a conversation <ArrowRight size={14} />
          </a>
        </section>
      </main>
    </LuxuryPageShell>
  );
}
