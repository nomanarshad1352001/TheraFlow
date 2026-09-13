"use client";

import { useMemo } from "react";
import { Check, Sparkles } from "lucide-react";
import { useBookingStore } from "@/lib/store";
import { DEMO_SERVICES, SPECIALIST_SERVICE_IDS } from "@/lib/demo-data";
import { t } from "@/lib/i18n";
import { cn, formatPrice } from "@/lib/utils";

export function ServiceSelector() {
  const { visitMode, selectedService, setSelectedService, selectedSpecialist, locale } = useBookingStore();

  const services = useMemo(
    () =>
      DEMO_SERVICES.filter((service) => {
        const supportsMode = visitMode === "online" ? service.onlineAvailable : service.inOfficeAvailable;
        const supportsSpecialist = selectedSpecialist ? SPECIALIST_SERVICE_IDS[selectedSpecialist.id]?.includes(service.id) : true;
        return supportsMode && supportsSpecialist;
      }),
    [selectedSpecialist, visitMode],
  );

  return (
    <div className="space-y-2 stagger-children">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-semibold t-hi">{t(locale, "selectService")}</label>
        <span className="text-[11px] t-dim">
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
              "relative flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left",
              isSelected ? "border-[#d9bc7f]/60 bg-[#d9bc7f]/[.08]" : "border-white/10 bg-[#121215] hover:border-white/25",
            )}
          >
            <div className="flex min-w-0 items-center gap-3 pr-3">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border",
                  isSelected ? "border-[#d9bc7f] bg-[#d9bc7f] text-[#08080a]" : "border-white/12 bg-white/[.04] t-gold",
                )}
              >
                <Sparkles size={17} />
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium t-hi">{serviceName}</p>
                <p className="truncate text-xs t-low">
                  {description} · {service.durationMinutes} {t(locale, "duration")}
                </p>
              </div>
            </div>

            <div className="luxury-title shrink-0 rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-lg t-gold">
              {formatPrice(service.priceGrosze, service.currency)}
            </div>

            {isSelected && (
              <div className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-[#d9bc7f] text-[#08080a] animate-scale-in">
                <Check size={13} strokeWidth={3} />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
