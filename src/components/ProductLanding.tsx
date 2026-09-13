"use client";

import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  Check,
  CircleDollarSign,
  Globe2,
  HeartHandshake,
  ShieldCheck,
  Stethoscope,
  UsersRound,
  Video,
} from "lucide-react";
import { LuxuryPageShell } from "./LuxuryChrome";
import { editorialImages, pagePhotoSets } from "@/lib/media";

const photos = pagePhotoSets.home;

const services = [
  { name: "Individual therapy", price: "from 220 zł", duration: "50 min", image: editorialImages.therapyRoom, text: "Regular one-to-one psychotherapy delivered online or in the clinic." },
  { name: "First consultation", price: "from 250 zł", duration: "50 min", image: editorialImages.doctorConsultation, text: "A diagnostic first meeting that defines the right care pathway." },
  { name: "Couples therapy", price: "from 320 zł", duration: "80 min", image: editorialImages.careTeam, text: "Structured relationship sessions with a dedicated specialist." },
  { name: "Psychiatric review", price: "from 350 zł", duration: "40 min", image: editorialImages.clinicianDetail, text: "Medical assessment and treatment planning with a psychiatrist." },
];

const howWeWork = [
  { n: "01", title: "Discover", text: "We map your services, specialists, availability rules, languages, and existing integrations.", image: editorialImages.strategySession },
  { n: "02", title: "Design", text: "We shape the patient journey and clinic workspace around how your team actually operates.", image: editorialImages.quietOffice },
  { n: "03", title: "Build", text: "We implement in typed, reviewable milestones without breaking live production behaviour.", image: editorialImages.modernWorkspace },
  { n: "04", title: "Launch", text: "We test critical journeys, verify integrations, and support a calm staged rollout.", image: editorialImages.healthcareTeam },
];

const gallery = [
  editorialImages.clinicLounge,
  editorialImages.therapyRoom,
  editorialImages.botanical,
  editorialImages.hospitalHall,
  editorialImages.quietOffice,
  editorialImages.careInterior,
];

export function ProductLanding() {
  return (
    <LuxuryPageShell>
      <main>
        {/* HERO */}
        <section className="relative px-5 pb-24 pt-32 sm:px-8 lg:pb-28 lg:pt-40">
          <div className="pointer-events-none absolute left-[8%] top-32 h-80 w-80 rounded-full bg-[#d9bc7f]/[.08] blur-[120px] animate-drift" />
          <div className="relative mx-auto grid max-w-[1380px] items-center gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
            <div className="animate-luxury-reveal">
              <span className="luxury-kicker">Mental healthcare, considered</span>
              <h1 className="luxury-title mt-7 text-[clamp(3.6rem,7vw,6.9rem)] leading-[.85]">
                Care begins
                <br />
                before the
                <br />
                <em className="t-gold">first session.</em>
              </h1>
              <p className="mt-8 max-w-xl text-[15px] leading-8 t-mid">
                TheraFlow is a refined patient booking experience and a dedicated clinic CRM, built for therapists,
                psychologists, psychiatrists and the teams around them.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="/book" className="btn-gold group flex items-center justify-center gap-3 rounded-full px-7 py-4 text-[11px] uppercase tracking-[.12em]">
                  Experience booking <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </a>
                <a href="/crm/login" className="btn-ghost rounded-full px-7 py-4 text-center text-[11px] font-extrabold uppercase tracking-[.12em]">
                  Open the CRM
                </a>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-semibold t-low">
                {["Polish + English", "Online + in-clinic", "Patient + payer", "Mobile first"].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <Check size={13} className="t-gold" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative h-[540px] animate-image-reveal sm:h-[660px]">
              <a href={photos[0].source} target="_blank" rel="noreferrer" className="luxury-image img-tone photo-grain absolute left-0 top-0 h-[76%] w-[67%] rounded-sm shadow-2xl shadow-black/60">
                <img src={photos[0].src} alt={photos[0].alt} />
                <span className="absolute bottom-3 left-3 z-10 rounded-full bg-black/60 px-2.5 py-1 text-[9px] font-semibold text-white/85 backdrop-blur">Therapeutic spaces</span>
              </a>
              <a href={photos[1].source} target="_blank" rel="noreferrer" className="luxury-image img-tone absolute right-0 top-[9%] h-[40%] w-[29%] rounded-sm shadow-xl shadow-black/50">
                <img src={photos[1].src} alt={photos[1].alt} />
              </a>
              <a href={photos[2].source} target="_blank" rel="noreferrer" className="luxury-image img-tone absolute bottom-0 right-[8%] h-[39%] w-[37%] rounded-sm shadow-xl shadow-black/50 animate-float-soft">
                <img src={photos[2].src} alt={photos[2].alt} />
              </a>
              <a href={photos[3].source} target="_blank" rel="noreferrer" className="luxury-image img-tone absolute bottom-[5%] left-[7%] h-[22%] w-[30%] rounded-sm border-4 border-[#08080a] shadow-xl shadow-black/60">
                <img src={photos[3].src} alt={photos[3].alt} />
              </a>
              <div className="absolute right-[1%] top-[54%] z-20 flex items-center gap-3 rounded-full border border-white/10 bg-[#121215]/95 px-4 py-2.5 shadow-xl backdrop-blur">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[#d9bc7f] text-[#08080a]">
                  <BadgeCheck size={15} />
                </span>
                <div>
                  <p className="text-[10px] font-extrabold t-hi">Visit confirmed</p>
                  <p className="text-[8px] t-dim">Patient notified instantly</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="border-y border-white/10 bg-[#0b0b0d] px-5 py-10 sm:px-8">
          <div className="mx-auto grid max-w-[1380px] grid-cols-2 gap-y-8 md:grid-cols-4">
            {[["03", "guided steps"], ["05", "complete result states"], ["02", "languages"], ["24/7", "patient access"]].map(([value, label], index) => (
              <div key={label} className={`text-center ${index > 0 ? "md:border-l md:border-white/10" : ""}`}>
                <p className="luxury-title text-4xl t-gold">{value}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[.16em] t-low">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES WITH IMAGES */}
        <section className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
              <div>
                <span className="luxury-kicker">Clinic services</span>
                <h2 className="luxury-title mt-6 text-5xl leading-none sm:text-6xl">
                  Care your patients
                  <br />
                  <em className="t-gold">can understand.</em>
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 t-mid lg:justify-self-end">
                Every service is presented with its purpose, duration, delivery format and price — so patients choose
                confidently instead of calling reception to ask.
              </p>
            </div>

            <div className="stagger-luxury mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <article key={service.name} className="surface surface-hover group overflow-hidden rounded-2xl">
                  <a href={service.image.source} target="_blank" rel="noreferrer" className="luxury-image img-tone block h-44">
                    <img src={service.image.src} alt={service.image.alt} />
                  </a>
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-extrabold uppercase tracking-[.14em] t-gold">{service.duration}</span>
                      <span className="text-[10px] font-bold t-mid">{service.price}</span>
                    </div>
                    <h3 className="luxury-title mt-5 text-3xl">{service.name}</h3>
                    <p className="mt-3 text-xs leading-6 t-low">{service.text}</p>
                    <a href="/book" className="mt-6 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.13em] t-gold">
                      Book now <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HOW WE WORK */}
        <section id="how-we-work" className="border-y border-white/10 bg-[#0b0b0d] px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
              <div>
                <span className="luxury-kicker">How we work</span>
                <h2 className="luxury-title mt-6 text-5xl leading-none sm:text-6xl">
                  A calm path from
                  <br />
                  <em className="t-gold">idea to production.</em>
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 t-mid lg:justify-self-end">
                We work in clear, reviewable stages. You always know what is being built, what is being tested, and what
                changes in your live product.
              </p>
            </div>

            <div className="stagger-luxury mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {howWeWork.map((step) => (
                <article key={step.n} className="surface group overflow-hidden rounded-2xl">
                  <a href={step.image.source} target="_blank" rel="noreferrer" className="luxury-image img-tone block h-36">
                    <img src={step.image.src} alt={step.image.alt} />
                  </a>
                  <div className="p-6">
                    <span className="luxury-title text-3xl t-gold">{step.n}</span>
                    <h3 className="luxury-title mt-4 text-3xl t-hi">{step.title}</h3>
                    <p className="mt-3 text-xs leading-6 t-low">{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1380px]">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <span className="luxury-kicker">Gallery</span>
                <h2 className="luxury-title mt-6 text-5xl sm:text-6xl">Spaces that feel considered.</h2>
              </div>
              <a href="/gallery" className="btn-ghost flex w-fit items-center gap-2 rounded-full px-6 py-3 text-[10px] font-extrabold uppercase tracking-[.13em]">
                View full gallery <ArrowRight size={13} />
              </a>
            </div>
            <div className="stagger-luxury mt-12 grid grid-cols-2 gap-3 lg:grid-cols-3">
              {gallery.map((image, index) => (
                <a
                  key={image.src}
                  href={image.source}
                  target="_blank"
                  rel="noreferrer"
                  className={`luxury-image img-tone relative rounded-sm ${index === 0 || index === 5 ? "h-64 lg:h-80" : "h-64"}`}
                >
                  <img src={image.src} alt={image.alt} />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent opacity-0 transition-opacity hover:opacity-100" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* BUYERS */}
        <section className="border-y border-white/10 bg-[#0b0b0d] px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-14 lg:grid-cols-2">
              <div>
                <span className="luxury-kicker">Built for care businesses</span>
                <h2 className="luxury-title mt-6 text-5xl leading-none sm:text-6xl">
                  One platform,
                  <br />
                  four ideal buyers.
                </h2>
                <p className="mt-6 max-w-lg text-sm leading-7 t-mid">
                  The best fit is a provider that values a premium patient experience, operational clarity, and a
                  dependable integration layer.
                </p>
                <a href="/solutions" className="group mt-8 inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[.16em] t-gold">
                  See every solution <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  [Building2, "Therapy clinics", "Coordinate 5–50 specialists"],
                  [Stethoscope, "Private practice", "Elevate a solo practice"],
                  [Globe2, "Clinic networks", "Unify locations and teams"],
                  [Video, "Telehealth", "Deliver remote-first care"],
                ].map(([Icon, title, text]) => (
                  <div key={title as string} className="surface surface-hover rounded-2xl p-6">
                    <Icon size={20} className="t-gold" />
                    <h3 className="mt-7 font-bold t-hi">{title as string}</h3>
                    <p className="mt-2 text-xs t-low">{text as string}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPLORE */}
        <section className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
              <div>
                <span className="luxury-kicker">Explore TheraFlow</span>
                <h2 className="luxury-title mt-6 text-5xl leading-none sm:text-6xl">
                  The full picture,
                  <br />
                  at your pace.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 t-mid lg:justify-self-end">
                Understand the patient experience, commercial model, implementation foundation, trust boundaries, and the
                thinking behind the product.
              </p>
            </div>
            <div className="stagger-luxury mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                [CalendarDays, "Features", "Every patient and clinic capability", "/features"],
                [CircleDollarSign, "Pricing", "Plans for practice, clinic, and network", "/pricing"],
                [ShieldCheck, "Security", "Privacy boundaries and readiness", "/security"],
                [Globe2, "Technology", "The typed, testable implementation stack", "/technology"],
                [HeartHandshake, "About", "Principles, purpose, and delivery", "/about"],
                [UsersRound, "Contact", "Start a focused product conversation", "/contact"],
              ].map(([Icon, title, text, href]) => (
                <a key={title as string} href={href as string} className="surface surface-hover group rounded-2xl p-6 hover:-translate-y-1">
                  <div className="flex items-start justify-between">
                    <Icon size={19} className="t-gold" />
                    <ArrowRight size={14} className="t-dim transition-transform group-hover:translate-x-1 group-hover:text-[#d9bc7f]" />
                  </div>
                  <h3 className="luxury-title mt-10 text-3xl">{title as string}</h3>
                  <p className="mt-2 text-xs t-low">{text as string}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 pb-28 sm:px-8">
          <div className="relative mx-auto max-w-[1380px] overflow-hidden rounded-sm border border-white/10">
            <img src={editorialImages.calmLandscape.src} alt={editorialImages.calmLandscape.alt} className="absolute inset-0 h-full w-full object-cover opacity-25" />
            <div className="relative bg-[#08080a]/70 px-6 py-20 text-center sm:px-12">
              <span className="text-[10px] font-extrabold uppercase tracking-[.2em] t-gold">Explore the complete product</span>
              <h2 className="luxury-title mt-5 text-5xl sm:text-7xl">
                A more thoughtful
                <br />
                way to book care.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-6 t-mid">
                Try the patient journey, then open the CRM. Demo information stays safely in this browser.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="/book" className="btn-gold rounded-full px-7 py-3.5 text-[11px] uppercase tracking-[.12em]">Book a visit</a>
                <a href="/crm/login" className="btn-ghost rounded-full px-7 py-3.5 text-[11px] font-extrabold uppercase tracking-[.12em]">CRM workspace</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </LuxuryPageShell>
  );
}
