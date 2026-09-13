"use client";

import { AlertTriangle, CalendarX2, Check, Clock3, CreditCard } from "lucide-react";
import { useBookingStore } from "@/lib/store";
import { t } from "@/lib/i18n";

const configs = {
  success: { icon: Check, ring: "bg-[#4ea981]/25", tone: "bg-[#4ea981] text-[#08080a]", titleKey: "successTitle" as const, messageKey: "successMessage" as const, actionKey: "bookAnother" as const },
  pending: { icon: Clock3, ring: "bg-[#d9a441]/25", tone: "bg-[#d9a441] text-[#08080a]", titleKey: "pendingTitle" as const, messageKey: "pendingMessage" as const, actionKey: "bookAnother" as const },
  payment_failed: { icon: CreditCard, ring: "bg-[#d76a6a]/25", tone: "bg-[#d76a6a] text-white", titleKey: "paymentFailedTitle" as const, messageKey: "paymentFailedMessage" as const, actionKey: "tryAgain" as const },
  slot_taken: { icon: CalendarX2, ring: "bg-[#d9a441]/25", tone: "bg-[#d9a441] text-[#08080a]", titleKey: "slotTakenTitle" as const, messageKey: "slotTakenMessage" as const, actionKey: "chooseDifferentSlot" as const },
  error: { icon: AlertTriangle, ring: "bg-[#d76a6a]/25", tone: "bg-[#d76a6a] text-white", titleKey: "errorTitle" as const, messageKey: "errorMessage" as const, actionKey: "tryAgain" as const },
};

export function ResultScreen() {
  const { resultScreen, bookingId, locale, reset, setResultScreen, setStep, setSelectedSlot } = useBookingStore();
  if (!resultScreen) return null;

  const config = configs[resultScreen];
  const Icon = config.icon;

  const handleAction = () => {
    if (resultScreen === "slot_taken") {
      setResultScreen(null);
      setSelectedSlot(null);
      setStep(1);
    } else if (resultScreen === "payment_failed" || resultScreen === "error") {
      setResultScreen(null);
      setStep(3);
    } else {
      reset();
    }
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12 animate-fade-in">
      <div className="w-full max-w-md rounded-3xl border border-white/12 bg-[#121215] p-8 text-center shadow-2xl">
        <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
          <div className={`absolute inset-0 rounded-full animate-pulse-ring ${config.ring}`} />
          <div className={`absolute inset-2 rounded-full animate-pulse-ring ${config.ring}`} style={{ animationDelay: ".5s" }} />
          <div className={`relative z-10 grid h-20 w-20 place-items-center rounded-full animate-scale-in ${config.tone}`}>
            <Icon size={34} strokeWidth={2.4} />
          </div>
        </div>

        <h2 className="luxury-title mb-3 text-5xl animate-slide-up">{t(locale, config.titleKey)}</h2>
        <p className="mb-6 text-sm leading-6 t-mid animate-slide-up" style={{ animationDelay: ".1s" }}>
          {t(locale, config.messageKey)}
        </p>

        {bookingId && resultScreen === "success" && (
          <div className="mb-6 rounded-xl border border-[#d9bc7f]/30 bg-[#d9bc7f]/[.07] p-3 animate-slide-up" style={{ animationDelay: ".2s" }}>
            <p className="text-[10px] uppercase tracking-wider t-dim">{t(locale, "bookingRef")}</p>
            <p className="font-mono text-sm font-bold t-gold">{bookingId}</p>
          </div>
        )}

        <button onClick={handleAction} className="btn-gold w-full rounded-full py-3.5 text-[10px] uppercase tracking-[.12em]">
          {t(locale, config.actionKey)}
        </button>
      </div>
    </div>
  );
}
