"use client";

import { Building2, Video } from "lucide-react";
import { useBookingStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function VisitModeToggle() {
  const { visitMode, setVisitMode, locale } = useBookingStore();

  return (
    <div className="grid grid-cols-2 gap-1 rounded-full border border-white/12 bg-[#121215] p-1">
      {(["in_office", "online"] as const).map((mode) => {
        const selected = visitMode === mode;
        const Icon = mode === "in_office" ? Building2 : Video;
        return (
          <button
            key={mode}
            onClick={() => setVisitMode(mode)}
            className={cn(
              "flex items-center justify-center gap-2 rounded-full px-4 py-3 text-[10px] font-extrabold uppercase tracking-[.1em]",
              selected ? "bg-[#d9bc7f] text-[#08080a]" : "t-low hover:text-[#f7f5f0]",
            )}
          >
            <Icon size={14} />
            {t(locale, mode === "in_office" ? "inOffice" : "online")}
          </button>
        );
      })}
    </div>
  );
}
