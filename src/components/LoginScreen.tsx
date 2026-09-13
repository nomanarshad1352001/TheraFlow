"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CalendarCheck2,
  Check,
  Eye,
  EyeOff,
  HeartHandshake,
  LockKeyhole,
  Mail,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
  UserRound,
} from "lucide-react";
import { DEMO_USERS, STORAGE_KEYS } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export function LoginScreen() {
  const router = useRouter();
  const [dark, setDark] = useState(false);
  const [email, setEmail] = useState("owner@theraflow.demo");
  const [password, setPassword] = useState("demo123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    const session = window.localStorage.getItem(STORAGE_KEYS.session);
    if (session) router.replace("/admin");
    return () => document.documentElement.classList.remove("dark");
  }, [dark, router]);

  const selectUser = (index: number) => {
    setEmail(DEMO_USERS[index].email);
    setPassword(DEMO_USERS[index].password);
    setError("");
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    await new Promise((resolve) => window.setTimeout(resolve, 550));
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
    router.push("/admin");
  };

  return (
    <div className={cn("min-h-screen", dark ? "bg-[#090b1a] text-white" : "bg-slate-50 text-slate-950")}>
      <div className="grid min-h-screen lg:grid-cols-[1.02fr_.98fr]">
        <section className="relative hidden overflow-hidden bg-[#111532] p-10 text-white lg:flex lg:flex-col">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(99,102,241,.3),transparent_35%),radial-gradient(circle_at_85%_85%,rgba(20,184,166,.22),transparent_35%)]" />
          <div className="absolute -left-24 top-1/3 h-64 w-64 rounded-full border-[45px] border-white/[.035]" />
          <div className="absolute -right-24 bottom-12 h-72 w-72 rounded-full border-[50px] border-white/[.035]" />
          <a href="/" className="relative z-10 flex items-center gap-2.5 self-start">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-teal-500"><HeartHandshake size={22} /></span>
            <span className="text-xl font-extrabold">TheraFlow</span>
          </a>
          <div className="relative z-10 my-auto max-w-xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.06] px-3 py-1.5 text-xs font-bold text-brand-200"><Sparkles size={14} /> Clinic workspace</div>
            <h1 className="text-5xl font-extrabold leading-[1.08] tracking-[-.04em]">Your clinic day, clear and under control.</h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-300">Manage appointments, patients, specialists and services from one calm, focused workspace.</p>
            <div className="mt-10 space-y-4">
              {[
                [CalendarCheck2, "See today’s schedule and booking statuses at a glance"],
                [ShieldCheck, "Use structured patient and payer information"],
                [BadgeCheck, "Manage demo data with complete local CRUD actions"],
              ].map(([Icon, text]) => (
                <div key={text as string} className="flex items-center gap-3 text-sm text-slate-200"><span className="grid h-9 w-9 place-items-center rounded-xl bg-white/[.07] text-teal-400"><Icon size={18} /></span>{text as string}</div>
              ))}
            </div>
          </div>
          <p className="relative z-10 text-xs text-slate-500">Interactive product demo · Data stays in this browser</p>
        </section>

        <section className="flex min-h-screen flex-col px-5 py-5 sm:px-10 lg:px-16 xl:px-24">
          <div className="flex items-center justify-between">
            <a href="/" className={cn("flex items-center gap-2 text-sm font-semibold lg:text-xs", dark ? "text-slate-300 hover:text-white" : "text-slate-500 hover:text-slate-900")}><ArrowLeft size={16} /> Back to overview</a>
            <button onClick={() => setDark(!dark)} className={cn("grid h-10 w-10 place-items-center rounded-xl", dark ? "bg-white/8 text-amber-300" : "bg-white text-slate-600 shadow-sm")} aria-label="Toggle theme">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
          </div>

          <div className="my-auto w-full max-w-md self-center py-12">
            <div className="mb-8 lg:hidden"><span className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-teal-500 text-white"><HeartHandshake size={22} /></span></div>
            <p className="text-xs font-extrabold uppercase tracking-[.18em] text-brand-500">Welcome back</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Sign in to your clinic</h2>
            <p className={cn("mt-3 text-sm leading-6", dark ? "text-slate-400" : "text-slate-500")}>Use a demo staff account to open the management workspace.</p>

            <form onSubmit={submit} className="mt-8 space-y-4">
              <div>
                <label htmlFor="email" className={cn("mb-1.5 block text-xs font-bold", dark ? "text-slate-300" : "text-slate-700")}>Work email</label>
                <div className="relative"><Mail size={17} className={cn("absolute left-3.5 top-1/2 -translate-y-1/2", dark ? "text-slate-500" : "text-slate-400")} /><input id="email" type="email" autoComplete="username" value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} className={cn("w-full rounded-xl border-2 py-3 pl-11 pr-4 text-sm outline-none", dark ? "border-white/10 bg-white/[.04] text-white focus:border-brand-500" : "border-slate-200 bg-white focus:border-brand-500")} /></div>
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between"><label htmlFor="password" className={cn("text-xs font-bold", dark ? "text-slate-300" : "text-slate-700")}>Password</label><button type="button" onClick={() => setPassword("demo123")} className="text-[11px] font-bold text-brand-500 hover:text-brand-600">Use demo password</button></div>
                <div className="relative"><LockKeyhole size={17} className={cn("absolute left-3.5 top-1/2 -translate-y-1/2", dark ? "text-slate-500" : "text-slate-400")} /><input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={(event) => { setPassword(event.target.value); setError(""); }} className={cn("w-full rounded-xl border-2 py-3 pl-11 pr-11 text-sm outline-none", dark ? "border-white/10 bg-white/[.04] text-white focus:border-brand-500" : "border-slate-200 bg-white focus:border-brand-500")} /><button type="button" onClick={() => setShowPassword(!showPassword)} className={cn("absolute right-3.5 top-1/2 -translate-y-1/2", dark ? "text-slate-400" : "text-slate-500")} aria-label="Show password">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>
              </div>

              {error && <div className={cn("rounded-xl border px-3.5 py-3 text-xs font-medium animate-slide-down", dark ? "border-red-500/30 bg-red-500/10 text-red-300" : "border-red-200 bg-red-50 text-red-700")}>{error}</div>}

              <button type="submit" disabled={loading} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-500/20 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70">
                {loading ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <>Sign in to workspace <ArrowRight size={17} className="group-hover:translate-x-1" /></>}
              </button>
            </form>

            <div className="my-7 flex items-center gap-3"><span className={cn("h-px flex-1", dark ? "bg-white/10" : "bg-slate-200")} /><span className={cn("text-[10px] font-bold uppercase tracking-wider", dark ? "text-slate-500" : "text-slate-400")}>Demo accounts</span><span className={cn("h-px flex-1", dark ? "bg-white/10" : "bg-slate-200")} /></div>

            <div className="grid gap-3 sm:grid-cols-2">
              {DEMO_USERS.map((user, index) => (
                <button key={user.email} type="button" onClick={() => selectUser(index)} className={cn("group rounded-xl border p-3 text-left", email === user.email ? dark ? "border-brand-500 bg-brand-500/10" : "border-brand-300 bg-brand-50" : dark ? "border-white/10 bg-white/[.025] hover:border-white/20" : "border-slate-200 bg-white hover:border-brand-200")}>
                  <div className="flex items-center gap-2.5"><span className={cn("grid h-8 w-8 place-items-center rounded-lg text-[10px] font-extrabold text-white", index === 0 ? "bg-gradient-to-br from-brand-500 to-violet-500" : "bg-gradient-to-br from-teal-500 to-cyan-500")}>{user.initials}</span><div className="min-w-0"><p className="truncate text-xs font-bold">{user.name}</p><p className={cn("text-[10px]", dark ? "text-slate-500" : "text-slate-400")}>{user.role}</p></div>{email === user.email && <Check size={14} className="ml-auto text-brand-500" />}</div>
                </button>
              ))}
            </div>

            <a href="/book" className={cn("mt-7 flex items-center justify-center gap-2 text-xs font-semibold", dark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900")}><UserRound size={15} /> Are you a patient? Book without logging in <ArrowRight size={14} /></a>
          </div>
        </section>
      </div>
    </div>
  );
}
