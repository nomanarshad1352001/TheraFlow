"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CalendarCheck2,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Code2,
  CreditCard,
  Globe2,
  HeartHandshake,
  Languages,
  Layers3,
  LockKeyhole,
  Menu,
  Moon,
  Network,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Sun,
  UserRound,
  UsersRound,
  Video,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  { icon: CalendarCheck2, title: "Smart patient booking", text: "Service, specialist, location, visit mode and live slot selection in one guided flow." },
  { icon: UserRound, title: "Patient and payer profiles", text: "Book for yourself or another person while keeping patient and payer details separate." },
  { icon: Video, title: "Hybrid care", text: "Offer in-clinic and online appointments with service-specific availability rules." },
  { icon: CreditCard, title: "Payments and invoicing", text: "Ready for payment, refund, invoice and settlement integrations in the production build." },
  { icon: Languages, title: "Bilingual experience", text: "Polish and English journeys with localized copy, validation, dates and confirmations." },
  { icon: BarChart3, title: "Clinic operations", text: "A focused workspace for bookings, schedules, services, specialists and performance." },
  { icon: ShieldCheck, title: "Healthcare-ready quality", text: "Privacy-minded architecture, accessible interactions, validation and clear error recovery." },
  { icon: Workflow, title: "Integration-friendly", text: "Designed to connect with GraphQL, calendars, payments, invoicing and existing clinic systems." },
];

const buyers = [
  {
    icon: Building2,
    label: "Therapy clinics",
    title: "Multi-specialist clinics",
    text: "Centralize public booking and reception workflows across services, rooms and clinicians.",
    fit: "Best for 5–50 specialists",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: UserRound,
    label: "Private practice",
    title: "Independent therapists",
    text: "Replace messages and spreadsheets with a polished, self-service booking journey.",
    fit: "Best for solo practices",
    color: "from-teal-500 to-emerald-500",
  },
  {
    icon: Network,
    label: "Clinic groups",
    title: "Multi-location networks",
    text: "Create consistent patient experiences while preserving location and team-level operations.",
    fit: "Best for growing brands",
    color: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: Globe2,
    label: "Digital care",
    title: "Telehealth providers",
    text: "Match patients with online specialists and route them into secure virtual-care workflows.",
    fit: "Best for remote-first care",
    color: "from-cyan-500 to-blue-500",
  },
];

const stack = [
  ["Next.js", "App Router & server rendering"],
  ["React", "Component-driven UI"],
  ["TypeScript", "Strict, maintainable code"],
  ["React Hook Form", "Performant form state"],
  ["Zod", "Typed validation schemas"],
  ["Apollo Client", "Typed GraphQL integration"],
  ["Zustand + Jotai", "Predictable local state"],
  ["Tailwind CSS v4", "Scalable design system"],
  ["shadcn/ui + Radix", "Accessible primitives"],
  ["next-intl", "Polish and English i18n"],
  ["Playwright", "Critical-flow E2E tests"],
  ["GraphQL Codegen", "End-to-end API types"],
];

export function ProductLanding() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    return () => document.documentElement.classList.remove("dark");
  }, [dark]);

  const navItems = [
    ["Platform", "#platform"],
    ["Features", "#features"],
    ["Who it’s for", "#buyers"],
    ["Tech stack", "#stack"],
  ];

  return (
    <div className={cn("min-h-screen overflow-hidden", dark ? "bg-[#090b1a] text-white" : "bg-white text-slate-950")}>
      <header className={cn("fixed inset-x-0 top-0 z-40 border-b backdrop-blur-xl", dark ? "border-white/10 bg-[#090b1a]/80" : "border-slate-200/80 bg-white/85")}>
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" className="flex items-center gap-2.5" aria-label="TheraFlow home">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-teal-500 text-white shadow-lg shadow-brand-500/20">
              <HeartHandshake size={22} />
            </span>
            <span className="text-lg font-extrabold tracking-tight">Thera<span className="text-brand-500">Flow</span></span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className={cn("text-sm font-medium", dark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-950")}>{label}</a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 sm:flex">
            <button onClick={() => setDark(!dark)} className={cn("grid h-10 w-10 place-items-center rounded-xl", dark ? "bg-white/8 text-amber-300 hover:bg-white/12" : "bg-slate-100 text-slate-600 hover:bg-slate-200")} aria-label="Toggle theme">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a href="/login" className={cn("rounded-xl px-4 py-2.5 text-sm font-semibold", dark ? "text-white hover:bg-white/8" : "text-slate-700 hover:bg-slate-100")}>Staff login</a>
            <a href="/book" className="flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-500/20 hover:bg-brand-700">Open booking <ArrowRight size={16} /></a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className={cn("grid h-10 w-10 place-items-center rounded-xl sm:hidden", dark ? "bg-white/8" : "bg-slate-100")} aria-label="Open menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {menuOpen && (
          <div className={cn("border-t px-5 py-4 sm:hidden", dark ? "border-white/10 bg-[#0d1023]" : "border-slate-200 bg-white")}>
            <div className="flex flex-col gap-1">
              {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium">{label}</a>)}
              <a href="/login" className="mt-2 rounded-xl border border-brand-500 px-4 py-2.5 text-center text-sm font-bold text-brand-500">Staff login</a>
              <a href="/book" className="rounded-xl bg-brand-600 px-4 py-2.5 text-center text-sm font-bold text-white">Open patient booking</a>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative px-5 pb-20 pt-32 lg:px-8 lg:pb-28 lg:pt-40">
          <div className={cn("pointer-events-none absolute left-1/2 top-20 h-[620px] w-[900px] -translate-x-1/2 rounded-full blur-3xl", dark ? "bg-brand-700/15" : "bg-brand-100/70")} />
          <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.02fr_.98fr]">
            <div className="animate-slide-up">
              <div className={cn("mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold", dark ? "border-brand-500/30 bg-brand-500/10 text-brand-300" : "border-brand-200 bg-brand-50 text-brand-700")}>
                <Sparkles size={14} /> Public booking + clinic operations
              </div>
              <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.04] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Care starts with a <span className="bg-gradient-to-r from-brand-500 to-teal-500 bg-clip-text text-transparent">better booking.</span>
              </h1>
              <p className={cn("mt-6 max-w-xl text-lg leading-8", dark ? "text-slate-300" : "text-slate-600")}>
                <strong className={dark ? "text-white" : "text-slate-900"}>TheraFlow</strong> is a white-label patient booking and clinic operations platform for therapists, psychologists, psychiatrists and modern care teams.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="/book" className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-brand-500/25 hover:-translate-y-0.5">Try the patient experience <ArrowRight size={17} className="group-hover:translate-x-1" /></a>
                <a href="/login" className={cn("flex items-center justify-center gap-2 rounded-2xl border px-6 py-3.5 text-sm font-bold", dark ? "border-white/15 bg-white/5 hover:bg-white/10" : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg")}><LockKeyhole size={17} /> Enter staff workspace</a>
              </div>
              <div className={cn("mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium", dark ? "text-slate-400" : "text-slate-500")}>
                {["No setup required", "Dummy data demo", "PL + EN", "Mobile ready"].map((item) => <span key={item} className="flex items-center gap-1.5"><Check size={14} className="text-teal-500" />{item}</span>)}
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className={cn("absolute -inset-8 rounded-[2.5rem] blur-2xl", dark ? "bg-gradient-to-br from-brand-500/15 to-teal-500/10" : "bg-gradient-to-br from-brand-200/60 to-teal-100/60")} />
              <div className={cn("relative overflow-hidden rounded-[2rem] border p-3 shadow-2xl", dark ? "border-white/10 bg-[#11152d]" : "border-slate-200 bg-white")}>
                <div className={cn("rounded-[1.4rem] p-5", dark ? "bg-[#0b0e20]" : "bg-slate-50")}>
                  <div className="mb-5 flex items-center justify-between">
                    <div><p className={cn("text-xs font-medium", dark ? "text-slate-400" : "text-slate-500")}>Good morning, Marta</p><h3 className="mt-1 text-lg font-bold">Clinic overview</h3></div>
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-pink-400 to-brand-500 text-xs font-bold text-white">MN</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[{ v: "18", l: "Today", c: "text-brand-500" }, { v: "4", l: "Pending", c: "text-amber-500" }, { v: "92%", l: "Filled", c: "text-teal-500" }].map((stat) => (
                      <div key={stat.l} className={cn("rounded-xl border p-3", dark ? "border-white/8 bg-white/[.035]" : "border-slate-200 bg-white")}><p className={cn("text-xl font-extrabold", stat.c)}>{stat.v}</p><p className={cn("mt-1 text-[10px]", dark ? "text-slate-400" : "text-slate-500")}>{stat.l}</p></div>
                    ))}
                  </div>
                  <div className={cn("mt-3 rounded-xl border p-4", dark ? "border-white/8 bg-white/[.035]" : "border-slate-200 bg-white")}>
                    <div className="mb-4 flex items-center justify-between"><p className="text-xs font-bold">Today’s schedule</p><span className="text-[10px] font-semibold text-brand-500">View all</span></div>
                    <div className="space-y-3">
                      {[
                        ["09:00", "Julia Kaczmarek", "Psychotherapy", "AK", "from-brand-400 to-brand-600"],
                        ["11:00", "Michał Wójcik", "Online consultation", "PZ", "from-teal-400 to-teal-600"],
                        ["14:30", "Oliwia Lis", "Child psychology", "ZL", "from-pink-400 to-pink-600"],
                      ].map(([time, name, service, initials, color]) => (
                        <div key={time} className="flex items-center gap-3"><span className={cn("w-10 text-[11px] font-bold", dark ? "text-slate-400" : "text-slate-500")}>{time}</span><span className={cn("grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br text-[9px] font-bold text-white", color)}>{initials}</span><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold">{name}</p><p className={cn("truncate text-[10px]", dark ? "text-slate-500" : "text-slate-400")}>{service}</p></div><span className="h-2 w-2 rounded-full bg-emerald-500" /></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className={cn("absolute -bottom-6 -left-7 hidden items-center gap-3 rounded-2xl border p-3 shadow-xl sm:flex", dark ? "border-white/10 bg-[#171b35]" : "border-slate-200 bg-white")}><span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-600"><BadgeCheck size={21} /></span><div><p className="text-xs font-bold">Booking confirmed</p><p className={cn("text-[10px]", dark ? "text-slate-400" : "text-slate-500")}>Automatic patient update</p></div></div>
            </div>
          </div>
        </section>

        <section className={cn("border-y px-5 py-8 lg:px-8", dark ? "border-white/8 bg-white/[.02]" : "border-slate-200 bg-slate-50")}>
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 lg:grid-cols-4">
            {["3-step booking flow", "5 result & error states", "2 languages", "100% responsive"].map((value, index) => <div key={value} className={cn(index > 0 && "lg:border-l", dark ? "lg:border-white/10" : "lg:border-slate-200")}><p className="text-center text-sm font-bold">{value}</p></div>)}
          </div>
        </section>

        <section id="platform" className="px-5 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-extrabold uppercase tracking-[.2em] text-brand-500">What the platform does</p><h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">One connected journey, from discovery to care.</h2><p className={cn("mx-auto mt-5 max-w-2xl leading-7", dark ? "text-slate-400" : "text-slate-600")}>TheraFlow removes booking friction for patients and repetitive coordination work for clinic teams.</p></div>
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {[
                { n: "01", title: "Patients find the right care", text: "Filter by visit mode, service and specialist, then choose a verified available time.", icon: Stethoscope },
                { n: "02", title: "The clinic receives clean data", text: "Validated patient, payer and consent information reaches the existing operational workflow.", icon: UsersRound },
                { n: "03", title: "The workflow continues", text: "Confirmations, payments, invoices, calendar events and status updates happen through integrations.", icon: Zap },
              ].map((item) => (
                <article key={item.n} className={cn("group rounded-3xl border p-7", dark ? "border-white/10 bg-white/[.025] hover:bg-white/[.05]" : "border-slate-200 bg-white hover:-translate-y-1 hover:shadow-xl")}><div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-500/10 text-brand-500"><item.icon size={23} /></span><span className={cn("text-xs font-extrabold", dark ? "text-slate-600" : "text-slate-300")}>{item.n}</span></div><h3 className="mt-7 text-xl font-bold">{item.title}</h3><p className={cn("mt-3 text-sm leading-6", dark ? "text-slate-400" : "text-slate-600")}>{item.text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className={cn("px-5 py-24 lg:px-8", dark ? "bg-[#0d1023]" : "bg-slate-50")}>
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl"><p className="text-xs font-extrabold uppercase tracking-[.2em] text-teal-500">Product capabilities</p><h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">Built for the details that make care feel effortless.</h2></div>
            <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => <div key={feature.title} className="group"><span className={cn("grid h-11 w-11 place-items-center rounded-xl", dark ? "bg-white/7 text-teal-400 group-hover:bg-teal-500 group-hover:text-white" : "bg-white text-brand-600 shadow-sm group-hover:bg-brand-600 group-hover:text-white")}><feature.icon size={21} /></span><h3 className="mt-5 font-bold">{feature.title}</h3><p className={cn("mt-2 text-sm leading-6", dark ? "text-slate-400" : "text-slate-600")}>{feature.text}</p></div>)}
            </div>
          </div>
        </section>

        <section id="buyers" className="px-5 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><div className="max-w-2xl"><p className="text-xs font-extrabold uppercase tracking-[.2em] text-brand-500">Who buys TheraFlow</p><h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">Designed for ambitious mental healthcare teams.</h2></div><p className={cn("max-w-sm text-sm leading-6", dark ? "text-slate-400" : "text-slate-600")}>The strongest fit is a clinic that values patient experience, operational clarity and a maintainable integration layer.</p></div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {buyers.map((buyer) => <article key={buyer.title} className={cn("group relative overflow-hidden rounded-3xl border p-7", dark ? "border-white/10 bg-white/[.025]" : "border-slate-200 bg-white hover:shadow-xl")}><div className={cn("absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br opacity-[.08] blur-2xl", buyer.color)} /><div className="relative flex gap-5"><span className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white", buyer.color)}><buyer.icon size={22} /></span><div><p className="text-xs font-bold uppercase tracking-wider text-brand-500">{buyer.label}</p><h3 className="mt-1 text-xl font-bold">{buyer.title}</h3><p className={cn("mt-3 text-sm leading-6", dark ? "text-slate-400" : "text-slate-600")}>{buyer.text}</p><span className={cn("mt-5 inline-flex rounded-full px-3 py-1 text-[11px] font-bold", dark ? "bg-white/7 text-slate-300" : "bg-slate-100 text-slate-600")}>{buyer.fit}</span></div></div></article>)}
            </div>
          </div>
        </section>

        <section className={cn("px-5 py-24 lg:px-8", dark ? "bg-[#0d1023]" : "bg-slate-950 text-white")}>
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div><p className="text-xs font-extrabold uppercase tracking-[.2em] text-teal-400">Why it stands out</p><h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">Calm for patients. Powerful for clinics.</h2><p className="mt-5 text-sm leading-7 text-slate-400">Not another generic calendar. TheraFlow is designed around sensitive patient journeys and the real operational rules of therapy practices.</p></div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["White-label", "Every clinic can present its own brand, language and service structure.", Layers3],
                ["Reliable", "Explicit loading, empty, payment, conflict and generic failure states.", ShieldCheck],
                ["Maintainable", "Typed modules and tested boundaries reduce regression risk in a mature codebase.", Code2],
                ["Conversion-focused", "Clear pricing, low-friction steps and mobile-first interactions improve completion.", CircleDollarSign],
                ["Accessible", "Keyboard-friendly controls, readable contrast and semantic interaction patterns.", BadgeCheck],
                ["Fast", "Client-side transitions and focused data fetching make the journey feel immediate.", Clock3],
              ].map(([title, text, Icon]) => <div key={title as string} className="rounded-2xl border border-white/10 bg-white/[.045] p-5"><Icon size={20} className="text-teal-400" /><h3 className="mt-4 font-bold">{title as string}</h3><p className="mt-2 text-xs leading-5 text-slate-400">{text as string}</p></div>)}
            </div>
          </div>
        </section>

        <section id="stack" className="px-5 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-extrabold uppercase tracking-[.2em] text-brand-500">Production technology stack</p><h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">Modern, typed and integration-ready.</h2><p className={cn("mt-5 leading-7", dark ? "text-slate-400" : "text-slate-600")}>The interactive preview uses dummy browser data. The production implementation is designed for the following existing SaaS stack.</p></div>
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {stack.map(([name, detail], index) => <div key={name} className={cn("flex items-center gap-3 rounded-2xl border p-4", dark ? "border-white/10 bg-white/[.025]" : "border-slate-200 bg-white hover:border-brand-200 hover:shadow-sm")}><span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg text-xs font-extrabold", index % 2 ? "bg-teal-500/10 text-teal-500" : "bg-brand-500/10 text-brand-500")}>{name.slice(0, 2)}</span><div><p className="text-sm font-bold">{name}</p><p className={cn("text-[10px]", dark ? "text-slate-500" : "text-slate-400")}>{detail}</p></div></div>)}
            </div>
          </div>
        </section>

        <section className="px-5 pb-24 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-700 via-brand-600 to-teal-500 px-6 py-14 text-center text-white shadow-2xl shadow-brand-500/20 sm:px-12">
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full border-[40px] border-white/5" /><div className="absolute -bottom-24 -right-20 h-64 w-64 rounded-full border-[40px] border-white/5" />
            <div className="relative"><Sparkles className="mx-auto mb-5" /><h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">Experience the complete demo.</h2><p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/75">Book a patient visit, then sign in as clinic staff to manage it. All demo changes stay safely in your browser.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a href="/book" className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-brand-700 hover:-translate-y-0.5 hover:shadow-xl">Start patient booking</a><a href="/login" className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/20">Open staff login</a></div></div>
          </div>
        </section>
      </main>

      <footer className={cn("border-t px-5 py-10 lg:px-8", dark ? "border-white/10" : "border-slate-200")}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row"><div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white"><HeartHandshake size={17} /></span><span className="font-extrabold">TheraFlow</span></div><p className={cn("text-center text-xs", dark ? "text-slate-500" : "text-slate-400")}>Patient booking and clinic operations — interactive dummy-data product demo.</p><div className="flex gap-4 text-xs font-semibold"><a href="/book" className="hover:text-brand-500">Patient form</a><a href="/login" className="hover:text-brand-500">Staff login</a></div></div>
      </footer>
    </div>
  );
}
