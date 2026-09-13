"use client";

import { ArrowRight, BadgeCheck, Check, Eye, FileCheck2, Fingerprint, KeyRound, Layers3, LockKeyhole, RefreshCcw, Server, ShieldCheck, UserCheck } from "lucide-react";
import { EditorialHero } from "./EditorialHero";
import { LuxuryPageShell } from "./LuxuryChrome";
import { editorialImages, pagePhotoSets } from "@/lib/media";

const controls = [
  { icon: Fingerprint, title: "Identity and access", text: "Role-aware staff entry points, explicit authenticated routes and integration-ready session boundaries." },
  { icon: KeyRound, title: "Secret boundaries", text: "Credentials and third-party API secrets stay server-side and never enter public client bundles." },
  { icon: Layers3, title: "Data minimization", text: "Collect only the patient, payer, booking and consent information the configured workflow requires." },
  { icon: FileCheck2, title: "Validated input", text: "Typed form schemas, constrained states and server validation reduce malformed or incomplete data." },
  { icon: Eye, title: "Operational visibility", text: "Explicit status and error models support auditable, understandable clinic operations." },
  { icon: RefreshCcw, title: "Safe recovery", text: "Slot conflicts, payment failure and generic errors have controlled recovery paths, never silent failure." },
];

const lifecycle = [
  ["01", "Collect", "The patient provides the minimum information required for the selected service and relationship."],
  ["02", "Validate", "The frontend and production backend apply typed validation and agreed business rules."],
  ["03", "Transmit", "Sensitive requests travel through authenticated, encrypted production infrastructure."],
  ["04", "Process", "Existing clinic systems handle slots, payment, invoices and communication workflows."],
  ["05", "Retain", "Retention and deletion rules follow the clinic's legal obligations."],
];

export function SecurityPage() {
  return (
    <LuxuryPageShell active="/security">
      <main>
        <EditorialHero
          eyebrow="Privacy and trust"
          title="Sensitive journeys deserve"
          italic="deliberate protection."
          description="TheraFlow is designed around clear trust boundaries, minimal data collection, typed validation and deployment-specific security controls — not vague promises."
          photos={pagePhotoSets.security}
          primary={{ label: "Discuss requirements", href: "/contact" }}
          secondary={{ label: "View technology", href: "/technology" }}
        />

        <section className="border-y border-white/10 bg-[#0b0b0d] px-5 py-10 sm:px-8">
          <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#d9bc7f]/40 t-gold">
                <ShieldCheck size={22} />
              </span>
              <div>
                <p className="font-bold t-hi">Security is a shared production responsibility.</p>
                <p className="mt-1 text-xs t-low">Application design, hosting, integrations, policies and clinic operations must work together.</p>
              </div>
            </div>
            <a href="/contact" className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.14em] t-gold">
              Review your environment <ArrowRight size={13} />
            </a>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
              <div>
                <span className="luxury-kicker">Designed with restraint</span>
                <h2 className="luxury-title mt-6 text-5xl sm:text-6xl">Practical controls at every boundary.</h2>
              </div>
              <p className="max-w-xl text-sm leading-7 t-mid lg:justify-self-end">
                The architecture makes sensitive behaviour explicit so it can be reviewed, tested and connected to your
                organization&rsquo;s security program.
              </p>
            </div>
            <div className="stagger-luxury mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {controls.map((control) => (
                <article key={control.title} className="surface surface-hover rounded-2xl p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-[#d9bc7f]/30 t-gold">
                    <control.icon size={19} />
                  </span>
                  <h3 className="luxury-title mt-8 text-3xl">{control.title}</h3>
                  <p className="mt-3 text-xs leading-6 t-low">{control.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0b0b0d] px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center">
              <span className="luxury-kicker justify-center">Data lifecycle</span>
              <h2 className="luxury-title mt-6 text-5xl">Know where information goes.</h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 t-mid">
                The exact production flow is documented against the clinic&rsquo;s backend and chosen providers.
              </p>
            </div>
            <a href={editorialImages.doctorTablet.source} target="_blank" rel="noreferrer" className="luxury-image img-tone mt-12 block h-56 rounded-sm sm:h-72">
              <img src={editorialImages.doctorTablet.src} alt={editorialImages.doctorTablet.alt} />
            </a>
            <div className="mt-10 grid gap-3 lg:grid-cols-5">
              {lifecycle.map(([number, title, text]) => (
                <div key={number} className="border-t border-white/15 pt-5">
                  <span className="luxury-title text-3xl t-gold">{number}</span>
                  <h3 className="mt-6 font-bold t-hi">{title}</h3>
                  <p className="mt-3 text-[11px] leading-5 t-low">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8">
          <div className="mx-auto grid max-w-[1380px] gap-14 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <span className="luxury-kicker">Production readiness</span>
              <h2 className="luxury-title mt-6 text-5xl sm:text-6xl">Security claims should be proven.</h2>
              <p className="mt-5 max-w-md text-sm leading-7 t-mid">
                Compliance depends on final infrastructure, policies, contracts, subprocessors, logging and operational
                controls. TheraFlow supports that work without claiming certifications it has not been assessed for.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                [Server, "Deployment review", "Hosting region, encryption, backups and network controls."],
                [UserCheck, "Access review", "Roles, session policy, staff lifecycle and least privilege."],
                [BadgeCheck, "Vendor review", "Payment, email, calendar, analytics and telehealth subprocessors."],
                [FileCheck2, "Policy alignment", "Retention, breach response, patient rights and audit requirements."],
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

        <section className="border-y border-white/10 bg-[#0b0b0d] px-5 py-24 sm:px-8">
          <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-2">
            <div>
              <LockKeyhole size={22} className="t-gold" />
              <h2 className="luxury-title mt-6 text-5xl">A clearer security conversation.</h2>
              <p className="mt-5 text-sm leading-7 t-mid">
                We begin with architecture, data categories, integrations, staff roles and legal context — then identify
                controls and responsibilities.
              </p>
            </div>
            <div className="space-y-3">
              {["Map patient and payer data fields", "Identify systems and subprocessors", "Confirm authentication and staff roles", "Define retention and recovery expectations", "Document testable acceptance criteria"].map((item) => (
                <div key={item} className="surface flex items-center gap-3 rounded-xl px-4 py-3.5 text-xs font-semibold t-hi">
                  <Check size={14} className="t-gold" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 text-center sm:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="luxury-title text-5xl">Bring your security requirements.</h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 t-mid">
              We&rsquo;ll map them to the frontend, integration, infrastructure and operational layers involved.
            </p>
            <a href="/contact" className="btn-gold mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-[10px] uppercase tracking-[.13em]">
              Start a security review <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </main>
    </LuxuryPageShell>
  );
}
