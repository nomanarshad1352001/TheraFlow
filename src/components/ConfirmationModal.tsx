"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { useBookingStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { cn, formatDate, formatPrice, formatTime } from "@/lib/utils";
import { getDemoBookings, getReservedSlotIds, reserveSlot, saveDemoBookings } from "@/lib/demo-storage";
import type { DemoBooking } from "@/lib/demo-data";

export function ConfirmationModal() {
  const {
    showConfirmation,
    setShowConfirmation,
    selectedSlot,
    selectedService,
    formData,
    locale,
    visitMode,
    setResultScreen,
    setBookingId,
    setStep,
  } = useBookingStore();
  const [submitting, setSubmitting] = useState(false);

  if (!showConfirmation || !selectedSlot || !selectedService) return null;

  const handleConfirm = async () => {
    setSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 700));

    try {
      if (getReservedSlotIds().includes(selectedSlot.id)) {
        setResultScreen("slot_taken");
        return;
      }

      const bookingId = `HF-${Math.floor(1100 + Math.random() * 8800)}`;
      const booking: DemoBooking = {
        id: bookingId,
        patientFirstName: formData.patientFirstName,
        patientLastName: formData.patientLastName,
        patientEmail: formData.patientEmail,
        patientPhone: formData.patientPhone,
        serviceId: selectedSlot.serviceId,
        serviceName: locale === "en" && selectedSlot.serviceNameEn ? selectedSlot.serviceNameEn : selectedSlot.serviceName,
        specialistId: selectedSlot.specialistId,
        specialistName: `${selectedSlot.specialistTitle ?? ""} ${selectedSlot.specialistFirstName} ${selectedSlot.specialistLastName}`.trim(),
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        mode: visitMode,
        status: "confirmed",
        totalGrosze: selectedSlot.priceGrosze,
        currency: selectedSlot.currency,
        createdAt: new Date().toISOString(),
        notes: formData.notes,
        bookingFor: formData.bookingFor,
        payerFirstName: formData.bookingFor === "someone_else" ? formData.payerFirstName : undefined,
        payerLastName: formData.bookingFor === "someone_else" ? formData.payerLastName : undefined,
      };

      reserveSlot(selectedSlot.id);
      saveDemoBookings([booking, ...getDemoBookings()]);
      setBookingId(bookingId);
      setResultScreen("success");
    } catch {
      setResultScreen("error");
    } finally {
      setSubmitting(false);
      setShowConfirmation(false);
    }
  };

  const serviceName = locale === "en" && selectedService.nameEn ? selectedService.nameEn : selectedService.name;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => !submitting && setShowConfirmation(false)} />

      <div className="relative w-full max-w-lg rounded-3xl border border-white/12 bg-[#121215] p-6 shadow-2xl animate-scale-in sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="luxury-title text-4xl">{t(locale, "confirmBooking")}</h2>
          <button
            onClick={() => !submitting && setShowConfirmation(false)}
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/12 t-mid hover:text-[#f7f5f0]"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mb-4 space-y-3 rounded-2xl border border-white/10 bg-[#0e0e11] p-5">
          <h3 className="text-[10px] font-extrabold uppercase tracking-[.14em] t-gold">{t(locale, "visitSummary")}</h3>
          <div className="space-y-2.5">
            <SummaryRow icon="💼" label={t(locale, "service")} value={serviceName} />
            <SummaryRow icon="👤" label={t(locale, "specialist")} value={`${selectedSlot.specialistTitle || ""} ${selectedSlot.specialistFirstName} ${selectedSlot.specialistLastName}`} />
            <SummaryRow icon="📅" label={t(locale, "date")} value={formatDate(selectedSlot.startTime, locale)} />
            <SummaryRow icon="🕐" label={t(locale, "time")} value={`${formatTime(selectedSlot.startTime)} – ${formatTime(selectedSlot.endTime)}`} />
            <SummaryRow icon={visitMode === "online" ? "💻" : "🏥"} label={t(locale, "mode")} value={t(locale, visitMode === "online" ? "online" : "inOffice")} />
          </div>

          <div className="mt-3 space-y-2.5 border-t border-white/10 pt-3">
            <SummaryRow icon="🧑" label={t(locale, "patient")} value={`${formData.patientFirstName} ${formData.patientLastName}`} />
            {formData.bookingFor === "someone_else" && (
              <SummaryRow icon="💳" label={t(locale, "payer")} value={`${formData.payerFirstName} ${formData.payerLastName}`} />
            )}
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between rounded-2xl border border-[#d9bc7f]/30 bg-[#d9bc7f]/[.07] p-4">
          <span className="text-[10px] font-extrabold uppercase tracking-[.13em] t-mid">{t(locale, "total")}</span>
          <span className="luxury-title text-3xl t-gold">{formatPrice(selectedSlot.priceGrosze, selectedSlot.currency)}</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => { setShowConfirmation(false); setStep(2); }}
            disabled={submitting}
            className="btn-ghost flex-1 rounded-full py-3 text-[10px] font-extrabold uppercase tracking-wider"
          >
            {t(locale, "edit")}
          </button>
          <button
            onClick={handleConfirm}
            disabled={submitting}
            className={cn("btn-gold flex flex-[2] items-center justify-center gap-2 rounded-full py-3 text-[10px] uppercase tracking-wider", submitting && "cursor-wait opacity-70")}
          >
            {submitting ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#08080a] border-t-transparent" />
            ) : (
              <>
                <Check size={15} strokeWidth={3} />
                {t(locale, "confirm")}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-sm">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-wider t-dim">{label}</p>
        <p className="truncate text-sm font-medium t-hi">{value}</p>
      </div>
    </div>
  );
}
