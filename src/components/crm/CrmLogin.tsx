"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, BadgeCheck, CalendarCheck2, Check, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, Sparkles, UserRound, Wand2 } from "lucide-react";
import { DEMO_USERS, STORAGE_KEYS } from "@/lib/demo-data";
import { pagePhotoSets } from "@/lib/media";

const photos = pagePhotoSets.login;

export function CrmLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [autofilled, setAutofilled] = useState(false);

  // Demo autofill: credentials are filled in automatically on arrival.
  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEYS.session)) {
      router.replace("/crm");
      return;
    }
    const timer = window.setTimeout(() => {
      setEmail(DEMO_USERS[0].email);
      setPassword(DEMO_USERS[0].password);
      setAutofilled(true);
    }, 350);
    return () => window.clearTimeout(timer);
  }, [router]);

  const useAccount = (index: number) => {
    setEmail(DEMO_USERS[index].email);
    setPassword(DEMO_USERS[index].password);
    setAutofilled(true);
    setError("");
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    const user = DEMO_USERS.find((candidate) => candidate.email === email.trim().toLowerCase() && candidate.password === password);
    if (!user) {
      setError("Email or password is incorrect. Use one of the demo accounts below.");
      setLoading(false);
      return;
    }
    window.localStorage.setItem(
      STORAGE_KEYS.session,
      JSON.stringify({ name: user.name, role: user.role, email: user.email, initials: user.initials, signedInAt: new Date().toISOString() }),
    );
    router.push("/crm");
  };

  return (
    <div className="min-h-screen bg-[#08080a]">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_.95fr]">
        {/* Visual panel */}
        <section className="relative hidden overflow-hidden border-r border-white/10 lg:block">
          <div className="absolute inset-x-6 top-6 bottom-[38%] grid grid-cols-12 grid-rows-12 gap-2 animate-image-reveal">
            <a href={photos[0].source} target="_blank" rel="noreferrer" className="luxury-image img-tone relative col-span-8 row-span-12 rounded-sm">
              <img src={photos[0].src} alt={photos[0].alt} />
              <span className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/60" />
            </a>
            <a href={photos[1].source} target="_blank" rel="noreferrer" className="luxury-image img-tone col-span-4 row-span-7 rounded-sm">
              <img src={photos[1].src} alt={photos[1].alt} />
            </a>
            <a href={photos[2].source} target="_blank" rel="noreferrer" className="luxury-image img-tone col-span-4 row-span-5 rounded-sm">
              <img src={photos[2].src} alt={photos[2].alt} />
            </a>
          </div>

          <a href="/" className="absolute left-10 top-10 z-20 flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-black/25 t-gold backdrop-blur">
              <Sparkles size={18} />
            </span>
            <span className="luxury-title text-3xl text-white">TheraFlow CRM</span>
          </a>

          <div className="absolute inset-x-10 bottom-10 grid grid-cols-[1fr_160px] items-end gap-8 xl:inset-x-14">
            <div className="animate-luxury-reveal">
              <div className="luxury-kicker">Private clinic workspace</div>
              <h1 className="luxury-title mt-5 text-5xl leading-[.93] xl:text-6xl">
                Your clinic day,
                <br />
                <em className="t-gold">beautifully clear.</em>
              </h1>
              <p className="mt-4 max-w-md text-xs leading-6 t-mid">
                Appointments, patients, specialists and services in one focused operational view.
              </p>
              <div className="mt-5 flex items-center gap-4 text-[9px] font-bold uppercase tracking-wider t-low">
                <span className="flex items-center gap-1.5"><ShieldCheck size={12} className="t-gold" /> Secure access</span>
                <span className="flex items-center gap-1.5"><BadgeCheck size={12} className="t-gold" /> Local demo</span>
              </div>
            </div>
            <a href={photos[3].source} target="_blank" rel="noreferrer" className="luxury-image img-tone h-44 rounded-sm border-2 border-white/10 animate-float-soft">
              <img src={photos[3].src} alt={photos[3].alt} />
            </a>
          </div>
        </section>

        {/* Form panel */}
        <section className="flex min-h-screen flex-col px-5 py-6 sm:px-10 lg:px-14 xl:px-20">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.12em] t-mid hover:text-[#d9bc7f]">
              <ArrowLeft size={15} /> Back to site
            </a>
            <span className="rounded-full border border-[#d9bc7f]/30 bg-[#d9bc7f]/10 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider t-gold">
              Demo environment
            </span>
          </div>

          <div className="my-auto w-full max-w-md self-center py-12">
            <div className="mb-8 grid grid-cols-4 gap-1 lg:hidden">
              {photos.map((photo, index) => (
                <a key={photo.src} href={photo.source} target="_blank" rel="noreferrer" className="luxury-image img-tone h-20 rounded-sm animate-image-reveal" style={{ animationDelay: `${index * 70}ms` }}>
                  <img src={photo.src} alt={photo.alt} />
                </a>
              ))}
            </div>

            <span className="luxury-kicker">Welcome back</span>
            <h2 className="luxury-title mt-4 text-4xl leading-none sm:text-5xl">Sign in to the CRM</h2>
            <p className="mt-3 text-sm leading-6 t-mid">
              Credentials are filled in automatically for this demo. Just press sign in.
            </p>

            {autofilled && (
              <div className="mt-5 flex items-center gap-2 rounded-xl border border-[#d9bc7f]/30 bg-[#d9bc7f]/[.08] px-3.5 py-2.5 text-[10px] font-bold t-gold animate-slide-down">
                <Wand2 size={13} /> Demo credentials autofilled
              </div>
            )}

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[.12em] t-low">Work email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 t-dim" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    className="w-full rounded-xl border border-white/12 bg-[#0e0e11] py-3.5 pl-11 pr-4 text-sm text-[#f7f5f0] outline-none placeholder:text-white/25 focus:border-[#d9bc7f]"
                    placeholder="owner@theraflow.demo"
                  />
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="password" className="text-[10px] font-extrabold uppercase tracking-[.12em] t-low">Password</label>
                  <button type="button" onClick={() => useAccount(0)} className="text-[10px] font-extrabold uppercase tracking-wider t-gold">Autofill again</button>
                </div>
                <div className="relative">
                  <LockKeyhole size={16} className="absolute left-4 top-1/2 -translate-y-1/2 t-dim" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    className="w-full rounded-xl border border-white/12 bg-[#0e0e11] py-3.5 pl-11 pr-11 text-sm text-[#f7f5f0] outline-none placeholder:text-white/25 focus:border-[#d9bc7f]"
                    placeholder="demo123"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 t-dim hover:text-[#f7f5f0]" aria-label="Show password">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="animate-slide-down rounded-xl border border-[#d76a6a]/40 bg-[#d76a6a]/10 px-3.5 py-3 text-xs font-medium text-[#f3b4b4]">
                  {error}
                </div>
              )}

              <button disabled={loading} className="btn-gold group flex w-full items-center justify-center gap-2 rounded-full py-4 text-[11px] uppercase tracking-[.13em] disabled:cursor-wait disabled:opacity-70">
                {loading ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#08080a] border-t-transparent" /> : <>Sign in to CRM <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></>}
              </button>
            </form>

            <div className="my-7 flex items-center gap-3">
              <span className="h-px flex-1 bg-white/10" />
              <span className="text-[9px] font-extrabold uppercase tracking-wider t-dim">Demo accounts</span>
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {DEMO_USERS.map((user, index) => (
                <button
                  key={user.email}
                  type="button"
                  onClick={() => useAccount(index)}
                  className={`rounded-xl border p-3.5 text-left ${email === user.email ? "border-[#d9bc7f]/60 bg-[#d9bc7f]/[.08]" : "border-white/10 bg-[#121215] hover:border-white/25"}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#d9bc7f] text-[10px] font-extrabold text-[#08080a]">{user.initials}</span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold t-hi">{user.name}</p>
                      <p className="text-[10px] t-dim">{user.role}</p>
                    </div>
                    {email === user.email && <Check size={14} className="ml-auto t-gold" />}
                  </div>
                  <p className="mt-3 truncate text-[9px] t-low">{user.email} · {user.password}</p>
                </button>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-wider">
              <a href="/book" className="flex items-center gap-1.5 t-mid hover:text-[#d9bc7f]"><UserRound size={13} /> Patient booking</a>
              <span className="h-3 w-px bg-white/15" />
              <a href="/contact" className="flex items-center gap-1.5 t-mid hover:text-[#d9bc7f]"><CalendarCheck2 size={13} /> Request access</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
