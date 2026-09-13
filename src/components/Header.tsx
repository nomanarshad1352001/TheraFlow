"use client";

import { ArrowLeft, Sparkles } from "lucide-react";
import { useBookingStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Header() {
  const { locale, setLocale, step, clinic } = useBookingStore();
  const labels = [t(locale, "step1Title"), t(locale, "step2Title"), t(locale, "step3Title")];

  return (
    <header className="border-b border-white/10 bg-[#0b0b0d] px-4 py-4 sm:px-7">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <a href="/" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#d9bc7f]/40 t-gold" aria-label="Back to TheraFlow">
              <ArrowLeft size={15} className="sm:hidden" />
              <Sparkles size={16} className="hidden sm:block" />
            </a>
            <div className="min-w-0">
              <p className="luxury-title truncate text-xl leading-none sm:text-2xl">{clinic?.name ?? "Harmonia"}</p>
              <p className="mt-1 text-[9px] font-bold uppercase tracking-[.14em] t-dim">
                {locale === "pl" ? "Bezpieczna rezerwacja wizyty" : "Secure appointment booking"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setLocale(locale === "pl" ? "en" : "pl")}
            className="rounded-full border border-white/12 px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-wider t-mid hover:border-[#d9bc7f]/50 hover:text-[#d9bc7f]"
          >
            {locale === "pl" ? "EN" : "PL"}
          </button>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {labels.map((label, index) => {
            const number = index + 1;
            const active = number <= step;
            return (
              <div key={label}>
                <div className={cn("h-px origin-left", active ? "bg-[#d9bc7f] animate-[lineGrow_.6s_ease-out_both]" : "bg-white/12")} />
                <div className="mt-2 flex items-center gap-2">
                  <span className={cn("luxury-title text-lg", active ? "t-gold" : "t-dim")}>0{number}</span>
                  <span className={cn("hidden truncate text-[9px] font-bold uppercase tracking-[.1em] sm:block", active ? "t-mid" : "t-dim")}>{label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
