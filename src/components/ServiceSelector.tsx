"use client";

import { useMemo } from "react";
import { useBookingStore } from "@/lib/store";
import { DEMO_SERVICES, SPECIALIST_SERVICE_IDS } from "@/lib/demo-data";
import { t } from "@/lib/i18n";
import { cn, formatPrice } from "@/lib/utils";

export function ServiceSelector() {
  const {
    visitMode,
    selectedService,
    setSelectedService,
    selectedSpecialist,
    locale,
    theme,
  } = useBookingStore();
  const isDark = theme === "dark";

  const services = useMemo(
    () =>
      DEMO_SERVICES.filter((service) => {
        const supportsMode = visitMode === "online" ? service.onlineAvailable : service.inOfficeAvailable;
        const supportsSpecialist = selectedSpecialist
          ? SPECIALIST_SERVICE_IDS[selectedSpecialist.id]?.includes(service.id)
          : true;
        return supportsMode && supportsSpecialist;
      }),
    [selectedSpecialist, visitMode],
  );

  return (
    <div className="space-y-2 stagger-children">
      <div className="flex items-center justify-between">
        <label className={cn("block text-sm font-semibold", isDark ? "text-brand-200" : "text-slate-700")}>
          {t(locale, "selectService")}
        </label>
        <span className={cn("text-[11px]", isDark ? "text-brand-500" : "text-slate-400")}>
          {services.length} {locale === "pl" ? "dostępnych" : "available"}
        </span>
      </div>
      {services.map((service) => {
        const isSelected = selectedService?.id === service.id;
        const serviceName = locale === "en" && service.nameEn ? service.nameEn : service.name;
        const description = locale === "en" && service.descriptionEn ? service.descriptionEn : service.description;

        return (
          <button
            key={service.id}
            onClick={() => setSelectedService(isSelected ? null : service)}
            className={cn(
              "group relative flex w-full items-center justify-between rounded-xl border-2 px-4 py-3.5 text-left transition-all duration-300",
              isSelected
                ? isDark
                  ? "border-brand-500 bg-brand-900/60 shadow-lg shadow-brand-900/30"
                  : "border-brand-500 bg-brand-50 shadow-md shadow-brand-100/50"
                : isDark
                  ? "border-brand-800/50 bg-brand-950/40 hover:border-brand-600 hover:bg-brand-900/40"
                  : "border-slate-200 bg-white hover:border-brand-300 hover:shadow-sm",
            )}
          >
            <div className="flex min-w-0 items-center gap-3 pr-3">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                  isSelected
                    ? "bg-brand-500 text-white"
                    : isDark
                      ? "bg-brand-800/50 text-brand-300"
                      : "bg-brand-100 text-brand-500",
                )}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className={cn("truncate font-medium", isSelected && !isDark ? "text-brand-700" : isDark ? "text-white" : "text-slate-800")}>
                  {serviceName}
                </p>
                <p className={cn("truncate text-xs", isDark ? "text-brand-300" : "text-slate-500")}>
                  {description} · {service.durationMinutes} {t(locale, "duration")}
                </p>
              </div>
            </div>
            <div className={cn("shrink-0 rounded-lg px-3 py-1 text-sm font-bold", isDark ? "bg-brand-800/40 text-brand-200" : "bg-slate-100 text-slate-700")}>
              {formatPrice(service.priceGrosze, service.currency)}
            </div>
            {isSelected && (
              <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white animate-scale-in">
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
