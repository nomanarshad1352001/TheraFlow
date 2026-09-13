"use client";

import { useEffect, useMemo, useState } from "react";
import { addDays, endOfWeek, format, isSameDay, startOfWeek } from "date-fns";
import { enGB, pl } from "date-fns/locale";
import { getDemoSlots } from "@/lib/demo-data";
import { getReservedSlotIds } from "@/lib/demo-storage";
import { useBookingStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { cn, formatPrice, formatTime } from "@/lib/utils";

export function TimeSlotPicker() {
  const {
    visitMode,
    selectedService,
    selectedSpecialist,
    selectedSlot,
    setSelectedSlot,
    locale,
    theme,
  } = useBookingStore();
  const isDark = theme === "dark";
  const [weekOffset, setWeekOffset] = useState(0);
  const [reservedIds, setReservedIds] = useState<string[]>([]);

  useEffect(() => setReservedIds(getReservedSlotIds()), []);

  const weekStart = useMemo(
    () => addDays(startOfWeek(new Date(), { weekStartsOn: 1 }), weekOffset * 7),
    [weekOffset],
  );
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
        <label className={cn("text-sm font-semibold", isDark ? "text-brand-200" : "text-slate-700")}>
          {t(locale, "selectTimeSlot")}
        </label>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setWeekOffset((value) => Math.max(0, value - 1))}
            disabled={weekOffset === 0}
            className={cn("rounded-lg p-1.5", weekOffset === 0 ? "cursor-not-allowed opacity-30" : isDark ? "text-brand-300 hover:bg-brand-800" : "text-slate-500 hover:bg-slate-100")}
            aria-label={t(locale, "prevWeek")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <span className={cn("px-2 text-xs font-medium", isDark ? "text-brand-300" : "text-slate-500")}>
            {format(weekStart, "d MMM", { locale: dateLocale })} – {format(weekEnd, "d MMM", { locale: dateLocale })}
          </span>
          <button
            onClick={() => setWeekOffset((value) => value + 1)}
            className={cn("rounded-lg p-1.5", isDark ? "text-brand-300 hover:bg-brand-800" : "text-slate-500 hover:bg-slate-100")}
            aria-label={t(locale, "nextWeek")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      </div>

      {!hasAnySlots ? (
        <div className={cn("rounded-xl border-2 border-dashed py-8 text-center", isDark ? "border-brand-800 bg-brand-950/30" : "border-slate-200 bg-white")}>
          <div className={cn("mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full", isDark ? "bg-brand-800/50 text-brand-400" : "bg-slate-100 text-slate-400")}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
          </div>
          <p className={cn("text-sm font-medium", isDark ? "text-brand-300" : "text-slate-500")}>{t(locale, "noSlotsAvailable")}</p>
          <button onClick={() => setWeekOffset((value) => value + 1)} className={cn("mt-2 text-sm font-semibold", isDark ? "text-brand-400" : "text-brand-600")}>
            {t(locale, "tryNextWeek")} →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1">
          {slotsByDay.map(({ date, slots: daySlots }) => {
            const isToday = isSameDay(date, new Date());
            return (
              <div key={date.toISOString()} className="min-w-0">
                <div className={cn("mb-1.5 rounded-lg py-1 text-center text-[10px] font-semibold uppercase", isToday ? isDark ? "bg-brand-600/30 text-brand-300" : "bg-brand-100 text-brand-700" : isDark ? "text-brand-400" : "text-slate-500")}>
                  <div>{format(date, "EEE", { locale: dateLocale })}</div>
                  <div className={cn("text-sm", isDark ? "text-white" : "text-slate-800")}>{format(date, "d")}</div>
                </div>
                <div className="max-h-48 space-y-1 overflow-y-auto">
                  {daySlots.length === 0 ? (
                    <div className={cn("py-2 text-center text-[10px]", isDark ? "text-brand-800" : "text-slate-300")}>—</div>
                  ) : (
                    daySlots.slice(0, 8).map((slot) => {
                      const isSelected = selectedSlot?.id === slot.id;
                      return (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedSlot(isSelected ? null : slot)}
                          title={`${slot.specialistFirstName} ${slot.specialistLastName}`}
                          className={cn(
                            "w-full rounded-lg px-1 py-1.5 text-[11px] font-medium transition-all sm:text-xs",
                            isSelected
                              ? "scale-105 bg-brand-500 text-white shadow-md"
                              : isDark
                                ? "bg-brand-900/50 text-brand-200 hover:bg-brand-700"
                                : "border border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:bg-brand-50",
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
        <div className={cn("animate-slide-up rounded-xl border-2 p-3", isDark ? "border-brand-600/50 bg-brand-900/60" : "border-brand-200 bg-gradient-to-r from-brand-50 to-teal-50")}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", isDark ? "bg-brand-700 text-brand-200" : "bg-brand-100 text-brand-600")}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <div className="min-w-0">
                <p className={cn("text-sm font-semibold", isDark ? "text-white" : "text-slate-800")}>{formatTime(selectedSlot.startTime)} – {formatTime(selectedSlot.endTime)}</p>
                <p className={cn("truncate text-xs", isDark ? "text-brand-300" : "text-slate-500")}>{selectedSlot.specialistTitle} {selectedSlot.specialistFirstName} {selectedSlot.specialistLastName}</p>
              </div>
            </div>
            <div className={cn("shrink-0 rounded-lg px-3 py-1 text-sm font-bold", isDark ? "bg-teal-900/50 text-teal-300" : "bg-teal-100 text-teal-700")}>{formatPrice(selectedSlot.priceGrosze, selectedSlot.currency)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
