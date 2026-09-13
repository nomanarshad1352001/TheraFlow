"use client";

import { useMemo } from "react";
import { Check, UsersRound } from "lucide-react";
import { useBookingStore } from "@/lib/store";
import { DEMO_SPECIALISTS, SPECIALIST_SERVICE_IDS } from "@/lib/demo-data";
import { editorialImages } from "@/lib/media";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const avatars = [
  editorialImages.specialistWoman,
  editorialImages.specialistMan,
  editorialImages.therapist,
  editorialImages.specialistWomanTwo,
  editorialImages.clinicianDetail,
];

export function SpecialistSelector() {
  const { selectedService, selectedSpecialist, setSelectedSpecialist, locale } = useBookingStore();

  const specialists = useMemo(
    () => DEMO_SPECIALISTS.filter((s) => (selectedService ? SPECIALIST_SERVICE_IDS[s.id]?.includes(selectedService.id) : true)),
    [selectedService],
  );

  return (
    <div className="space-y-2 stagger-children">
      <label className="block text-sm font-semibold t-hi">{t(locale, "selectSpecialist")}</label>

      <button
        onClick={() => setSelectedSpecialist(null)}
        className={cn(
          "flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left",
          !selectedSpecialist ? "border-[#d9bc7f]/60 bg-[#d9bc7f]/[.08]" : "border-white/10 bg-[#121215] hover:border-white/25",
        )}
      >
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/12 t-gold">
          <UsersRound size={17} />
        </span>
        <div>
          <span className="font-medium t-hi">{t(locale, "anySpecialist")}</span>
          <p className="text-xs t-dim">
            {locale === "pl" ? "Pokaż najbliższy dostępny termin" : "Show the earliest available appointment"}
          </p>
        </div>
      </button>

      {specialists.map((specialist, index) => {
        const isSelected = selectedSpecialist?.id === specialist.id;
        const avatar = avatars[index % avatars.length];
        return (
          <button
            key={specialist.id}
            onClick={() => setSelectedSpecialist(isSelected ? null : specialist)}
            className={cn(
              "flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left",
              isSelected ? "border-[#d9bc7f]/60 bg-[#d9bc7f]/[.08]" : "border-white/10 bg-[#121215] hover:border-white/25",
            )}
          >
            <span className="luxury-image img-tone h-11 w-11 shrink-0 overflow-hidden rounded-full">
              <img src={avatar.src} alt={specialist.firstName} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium t-hi">
                {specialist.title ? `${specialist.title} ` : ""}
                {specialist.firstName} {specialist.lastName}
              </p>
              <p className="truncate text-xs t-low">{specialist.specialty}</p>
            </div>
            {isSelected && (
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#d9bc7f] text-[#08080a] animate-scale-in">
                <Check size={13} strokeWidth={3} />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
