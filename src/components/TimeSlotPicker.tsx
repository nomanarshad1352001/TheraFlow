"use client";

import { useEffect, useMemo, useState } from "react";
import { addDays, endOfWeek, format, isSameDay, startOfWeek } from "date-fns";
import { enGB, pl } from "date-fns/locale";
import { CalendarDays, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
import { getDemoSlots } from "@/lib/demo-data";
import { getReservedSlotIds } from "@/lib/demo-storage";
import { useBookingStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { cn, formatPrice, formatTime } from "@/lib/utils";

export function TimeSlotPicker() {
  const { visitMode, selectedService, selectedSpecialist, selectedSlot, setSelectedSlot, locale } = useBookingStore();
  const [weekOffset, setWeekOffset] = useState(0);
  const [reservedIds, setReservedIds] = useState<string[]>([]);

  useEffect(() => setReservedIds(getReservedSlotIds()), []);

  const weekStart = useMemo(() => addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), weekOffset * 7), [weekOffset]);
  const weekEnd = useMemo(() => endOfWeek(weekStart, { weekStartsOn: 1 }), [weekStart]);
  const days = useMemo(() => Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)), [weekStart]);

  const slots = useMemo(() => {
    if (!selectedService) return [];
    return getDemoSlots().filter((slot) => {
      const start = new Date(slot.startTime);
      return (
        slot.serviceId === selectedService.id &&
        slot.mode === visitMode &&
        (!selectedSpecialist || slot.specialistId === selectedSpecialist.id) &&
        start >= weekStart &&
        start <= weekEnd &&
        !reservedIds.includes(slot.id)
      );
    });
  }, [selectedService, selectedSpecialist, visitMode, weekStart, weekEnd, reservedIds]);

  if (!selectedService) return null;

  const slotsByDay = days.map((date) => ({ date, slots: slots.filter((slot) => isSameDay(new Date(slot.startTime), date)) }));
  const hasAnySlots = slotsByDay.some((day) => day.slots.length > 0);
  const dateLocale = locale === "pl" ? pl : enGB;

  return (
    <div className="space-y-3 animate-slide-up">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold t-hi">{t(locale, "selectTimeSlot")}</label>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setWeekOffset((value) => Math.max(0, value - 1))}
            disabled={weekOffset === 0}
            className={cn("grid h-8 w-8 place-items-center rounded-lg", weekOffset === 0 ? "cursor-not-allowed t-dim opacity-40" : "t-mid hover:bg-white/5 hover:text-[#d9bc7f]")}
            aria-label={t(locale, "prevWeek")}
          >
            <ChevronLeft size={15} />
          </button>
          <span className="px-2 text-xs font-medium t-low">
            {format(weekStart, "d MMM", { locale: dateLocale })} – {format(weekEnd, "d MMM", { locale: dateLocale })}
          </span>
          <button
            onClick={() => setWeekOffset((value) => value + 1)}
            className="grid h-8 w-8 place-items-center rounded-lg t-mid hover:bg-white/5 hover:text-[#d9bc7f]"
            aria-label={t(locale, "nextWeek")}
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {!hasAnySlots ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-[#121215] py-10 text-center">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full border border-white/12 t-gold">
            <CalendarDays size={22} />
          </div>
          <p className="text-sm font-medium t-mid">{t(locale, "noSlotsAvailable")}</p>
          <button onClick={() => setWeekOffset((value) => value + 1)} className="mt-2 text-sm font-semibold t-gold">
            {t(locale, "tryNextWeek")} →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1">
          {slotsByDay.map(({ date, slots: daySlots }) => {
            const isToday = isSameDay(date, new Date());
            return (
              <div key={date.toISOString()} className="min-w-0">
                <div className={cn("mb-1.5 rounded-lg py-1 text-center", isToday && "bg-[#d9bc7f]/12")}>
                  <div className={cn("text-[10px] font-semibold uppercase", isToday ? "t-gold" : "t-dim")}>
                    {format(date, "EEE", { locale: dateLocale })}
                  </div>
                  <div className={cn("text-sm font-bold", isToday ? "t-gold" : "t-hi")}>{format(date, "d")}</div>
                </div>
                <div className="max-h-48 space-y-1 overflow-y-auto">
                  {daySlots.length === 0 ? (
                    <div className="py-2 text-center text-[10px] t-dim">—</div>
                  ) : (
                    daySlots.slice(0, 8).map((slot) => {
                      const isSelected = selectedSlot?.id === slot.id;
                      return (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedSlot(isSelected ? null : slot)}
                          title={`${slot.specialistFirstName} ${slot.specialistLastName}`}
                          className={cn(
                            "w-full rounded-lg px-1 py-1.5 text-[11px] font-medium sm:text-xs",
                            isSelected
                              ? "scale-[1.03] bg-[#d9bc7f] text-[#08080a]"
                              : "border border-white/10 bg-[#121215] t-mid hover:border-[#d9bc7f]/45 hover:text-[#f7f5f0]",
                          )}
                        >
                          {formatTime(slot.startTime)}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedSlot && (
        <div className="animate-slide-up rounded-2xl border border-[#d9bc7f]/35 bg-[#d9bc7f]/[.07] p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#d9bc7f]/40 t-gold">
                <Clock3 size={17} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold t-hi">
                  {formatTime(selectedSlot.startTime)} – {formatTime(selectedSlot.endTime)}
                </p>
                <p className="truncate text-xs t-low">
                  {selectedSlot.specialistTitle} {selectedSlot.specialistFirstName} {selectedSlot.specialistLastName}
                </p>
              </div>
            </div>
            <div className="luxury-title shrink-0 text-2xl t-gold">{formatPrice(selectedSlot.priceGrosze, selectedSlot.currency)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
