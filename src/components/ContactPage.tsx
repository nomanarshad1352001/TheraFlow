"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, BadgeCheck, CalendarCheck2, Check, Clock3, Mail, MapPin, MessageCircle, Phone, Send, ShieldCheck, UsersRound } from "lucide-react";
import { EditorialHero } from "./EditorialHero";
import { LuxuryPageShell } from "./LuxuryChrome";
import { editorialImages, pagePhotoSets } from "@/lib/media";

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", clinic: "", size: "5–15 specialists", interest: "Clinic plan", message: "" });

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    setLoading(false);
    setSent(true);
  };

  return (
    <LuxuryPageShell active="/contact">
      <main>
        <EditorialHero
          eyebrow="Talk to TheraFlow"
          title="Tell us how your clinic"
          italic="cares for people."
          description="We'll discuss your patient journey, team structure, service rules, existing integrations, and the right path from design to a dependable production release."
          photos={pagePhotoSets.contact}
        />

        <section className="px-5 pb-28 sm:px-8">
          <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <span className="luxury-kicker">Start a conversation</span>
              <h2 className="luxury-title mt-6 text-5xl">A useful first call, not a sales pitch.</h2>
              <p className="mt-5 text-sm leading-7 t-mid">
                Share enough context for us to prepare. We focus on fit, implementation risk, integration boundaries and
                the patient outcome you want.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  [Clock3, "Response time", "Within one working day"],
                  [MessageCircle, "First conversation", "30-minute product and implementation review"],
                  [ShieldCheck, "Your information", "Used only to respond to this request"],
                ].map(([Icon, label, value]) => (
                  <div key={label as string} className="flex items-start gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#d9bc7f]/30 t-gold">
                      <Icon size={17} />
                    </span>
                    <div>
                      <p className="text-[9px] font-extrabold uppercase tracking-[.15em] t-dim">{label as string}</p>
                      <p className="mt-1 text-xs font-bold t-hi">{value as string}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-2 gap-2">
                {[editorialImages.careInterior, editorialImages.wellbeing].map((image) => (
                  <a key={image.src} href={image.source} target="_blank" rel="noreferrer" className="luxury-image img-tone h-28 rounded-sm">
                    <img src={image.src} alt={image.alt} />
                  </a>
                ))}
              </div>

              <div className="mt-10 border-t border-white/10 pt-7">
                <p className="text-[9px] font-extrabold uppercase tracking-[.15em] t-dim">Prefer direct contact?</p>
                <div className="mt-4 space-y-3 text-xs font-semibold">
                  <a href="mailto:hello@theraflow.example" className="flex items-center gap-2 t-mid hover:text-[#d9bc7f]">
                    <Mail size={14} /> hello@theraflow.example
                  </a>
                  <a href="tel:+48220000000" className="flex items-center gap-2 t-mid hover:text-[#d9bc7f]">
                    <Phone size={14} /> +48 22 000 00 00
                  </a>
                  <p className="flex items-center gap-2 t-low">
                    <MapPin size={14} /> Warsaw · Remote across Europe
                  </p>
                </div>
              </div>
            </div>

            <div className="surface rounded-2xl p-6 shadow-2xl shadow-black/50 sm:p-9">
              {sent ? (
                <div className="grid min-h-[560px] place-items-center text-center animate-scale-in">
                  <div>
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#d9bc7f] text-[#08080a]">
                      <BadgeCheck size={28} />
                    </span>
                    <h2 className="luxury-title mt-7 text-5xl">Thank you, {form.name.split(" ")[0] || "friend"}.</h2>
                    <p className="mx-auto mt-4 max-w-sm text-sm leading-6 t-mid">
                      Your request has been recorded in this browser. In production it would be sent securely to the
                      TheraFlow team.
                    </p>
                    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                      <button onClick={() => setSent(false)} className="btn-ghost rounded-full px-6 py-3 text-[10px] font-extrabold uppercase tracking-wider">
                        Send another
                      </button>
                      <a href="/book" className="btn-gold rounded-full px-6 py-3 text-[10px] uppercase tracking-wider">
                        Try the demo
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div>
                    <p className="text-[9px] font-extrabold uppercase tracking-[.17em] t-gold">Request a walkthrough</p>
                    <h2 className="luxury-title mt-2 text-4xl">Let&rsquo;s understand your clinic.</h2>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Your name">
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Marta Nowicka" />
                    </Field>
                    <Field label="Work email">
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="marta@clinic.pl" />
                    </Field>
                  </div>

                  <Field label="Clinic or practice">
                    <input required value={form.clinic} onChange={(e) => setForm({ ...form, clinic: e.target.value })} placeholder="Harmonia Clinic" />
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Team size">
                      <select value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })}>
                        <option>Solo practice</option>
                        <option>2–4 specialists</option>
                        <option>5–15 specialists</option>
                        <option>16–50 specialists</option>
                        <option>50+ specialists</option>
                      </select>
                    </Field>
                    <Field label="Primary interest">
                      <select value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}>
                        <option>Practice plan</option>
                        <option>Clinic plan</option>
                        <option>Network plan</option>
                        <option>Custom implementation</option>
                        <option>Security review</option>
                      </select>
                    </Field>
                  </div>

                  <Field label="What should we know?">
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your current booking journey, team, integrations, and what you want to improve."
                    />
                  </Field>

                  <label className="flex items-start gap-2.5 text-[10px] leading-5 t-low">
                    <input required type="checkbox" className="mt-1 accent-[#d9bc7f]" />
                    I agree to be contacted about this request. This demo does not transmit data to a server.
                  </label>

                  <button disabled={loading} className="btn-gold flex w-full items-center justify-center gap-2 rounded-full py-4 text-[10px] uppercase tracking-[.14em] disabled:opacity-60">
                    {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#08080a] border-t-transparent" /> : <>Send request <Send size={14} /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#0b0b0d] px-5 py-24 sm:px-8">
          <div className="mx-auto max-w-[1200px]">
            <div className="text-center">
              <span className="luxury-kicker justify-center">What happens next</span>
              <h2 className="luxury-title mt-6 text-5xl">A clear path to a decision.</h2>
            </div>
            <div className="mt-14 grid gap-3 md:grid-cols-4">
              {[
                ["01", "Discovery", "We understand your clinic, patient journey, current stack and constraints."],
                ["02", "Product review", "You see the relevant flow, CRM, states and configuration options."],
                ["03", "Implementation plan", "We define milestones, responsibilities, testing and release."],
                ["04", "Decision", "You receive a clear scope, timeline, commercial model and next step."],
              ].map(([number, title, text]) => (
                <div key={number} className="surface rounded-2xl p-6">
                  <p className="luxury-title text-3xl t-gold">{number}</p>
                  <h3 className="mt-7 font-bold t-hi">{title}</h3>
                  <p className="mt-3 text-[11px] leading-5 t-low">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-24 sm:px-8">
          <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-2">
            <div>
              <UsersRound className="t-gold" />
              <h2 className="luxury-title mt-6 text-5xl">Not ready for a call?</h2>
              <p className="mt-4 text-sm leading-7 t-mid">
                Explore the complete product at your own pace. Every demo action uses local dummy data.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <a href="/book" className="surface surface-hover group rounded-2xl p-6">
                <CalendarCheck2 className="t-gold" />
                <h3 className="mt-8 font-bold t-hi">Patient experience</h3>
                <p className="mt-2 text-xs t-low">Complete a full booking</p>
                <ArrowRight size={14} className="mt-6 t-mid transition-transform group-hover:translate-x-1" />
              </a>
              <a href="/crm/login" className="surface surface-hover group rounded-2xl p-6">
                <Check className="t-gold" />
                <h3 className="mt-8 font-bold t-hi">Clinic CRM</h3>
                <p className="mt-2 text-xs t-low">Manage demo clinic data</p>
                <ArrowRight size={14} className="mt-6 t-mid transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </LuxuryPageShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.12em] t-low">{label}</span>
      <div className="[&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-white/12 [&_input]:bg-[#0e0e11] [&_input]:px-4 [&_input]:py-3.5 [&_input]:text-xs [&_input]:text-[#f7f5f0] [&_input]:outline-none [&_input]:placeholder:text-white/25 focus-within:[&_input]:border-[#d9bc7f] [&_select]:w-full [&_select]:rounded-xl [&_select]:border [&_select]:border-white/12 [&_select]:bg-[#0e0e11] [&_select]:px-4 [&_select]:py-3.5 [&_select]:text-xs [&_select]:text-[#f7f5f0] [&_select]:outline-none [&_textarea]:w-full [&_textarea]:resize-none [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-white/12 [&_textarea]:bg-[#0e0e11] [&_textarea]:px-4 [&_textarea]:py-3.5 [&_textarea]:text-xs [&_textarea]:leading-5 [&_textarea]:text-[#f7f5f0] [&_textarea]:outline-none [&_textarea]:placeholder:text-white/25">
        {children}
      </div>
    </label>
  );
}
