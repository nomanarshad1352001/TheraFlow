"use client";

import { useMemo } from "react";
import { useBookingStore } from "@/lib/store";
import { DEMO_SPECIALISTS, SPECIALIST_SERVICE_IDS } from "@/lib/demo-data";
import { t } from "@/lib/i18n";
import { cn, getInitials } from "@/lib/utils";

const AVATAR_COLORS = [
  "from-brand-400 to-brand-600",
  "from-teal-400 to-teal-600",
  "from-purple-400 to-purple-600",
  "from-pink-400 to-pink-600",
  "from-amber-400 to-amber-600",
];

export function SpecialistSelector() {
  const { selectedService, selectedSpecialist, setSelectedSpecialist, locale, theme } = useBookingStore();
  const isDark = theme === "dark";

  const specialists = useMemo(
    () =>
      DEMO_SPECIALISTS.filter((specialist) =>
        selectedService ? SPECIALIST_SERVICE_IDS[specialist.id]?.includes(selectedService.id) : true,
      ),
    [selectedService],
  );

  return (
    <div className="space-y-2 stagger-children">
      <label className={cn("block text-sm font-semibold", isDark ? "text-brand-200" : "text-slate-700")}>
        {t(locale, "selectSpecialist")}
      </label>
      <button
        onClick={() => setSelectedSpecialist(null)}
        className={cn(
          "flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all duration-300",
          !selectedSpecialist
            ? isDark
              ? "border-brand-500 bg-brand-900/60 shadow-lg"
              : "border-brand-500 bg-brand-50 shadow-md"
            : isDark
              ? "border-brand-800/50 bg-brand-950/40 hover:border-brand-600"
              : "border-slate-200 bg-white hover:border-brand-300",
        )}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-teal-500">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div>
          <span className={cn("font-medium", !selectedSpecialist && !isDark ? "text-brand-700" : isDark ? "text-white" : "text-slate-700")}>
            {t(locale, "anySpecialist")}
          </span>
          <p className={cn("text-xs", isDark ? "text-brand-400" : "text-slate-400")}>
            {locale === "pl" ? "Pokaż najbliższy dostępny termin" : "Show the earliest available appointment"}
          </p>
        </div>
      </button>

      {specialists.map((specialist, index) => {
        const isSelected = selectedSpecialist?.id === specialist.id;
        return (
          <button
            key={specialist.id}
            onClick={() => setSelectedSpecialist(isSelected ? null : specialist)}
            className={cn(
              "group relative flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all duration-300",
              isSelected
                ? isDark
                  ? "border-brand-500 bg-brand-900/60 shadow-lg"
                  : "border-brand-500 bg-brand-50 shadow-md"
                : isDark
                  ? "border-brand-800/50 bg-brand-950/40 hover:border-brand-600"
                  : "border-slate-200 bg-white hover:border-brand-300 hover:shadow-sm",
            )}
          >
            <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white", AVATAR_COLORS[index % AVATAR_COLORS.length])}>
              {getInitials(specialist.firstName, specialist.lastName)}
            </div>
            <div className="min-w-0 flex-1">
              <p className={cn("truncate font-medium", isSelected && !isDark ? "text-brand-700" : isDark ? "text-white" : "text-slate-800")}>
                {specialist.title ? `${specialist.title} ` : ""}{specialist.firstName} {specialist.lastName}
              </p>
              <p className={cn("truncate text-xs", isDark ? "text-brand-300" : "text-slate-500")}>
                {specialist.specialty}
              </p>
            </div>
            {isSelected && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white animate-scale-in">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
