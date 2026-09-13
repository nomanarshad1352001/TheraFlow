"use client";

import { useEffect } from "react";
import { ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";
import { useBookingStore, type ClinicData } from "@/lib/store";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { BookingPhotoPanel } from "./BookingPhotoPanel";
import { ConfirmationModal } from "./ConfirmationModal";
import { Header } from "./Header";
import { PatientForm } from "./PatientForm";
import { ResultScreen } from "./ResultScreen";
import { ServiceSelector } from "./ServiceSelector";
import { SpecialistSelector } from "./SpecialistSelector";
import { TimeSlotPicker } from "./TimeSlotPicker";
import { VisitModeToggle } from "./VisitModeToggle";

export function BookingForm({ clinic }: { clinic: ClinicData }) {
  const {
    step,
    setStep,
    setClinic,
    selectedService,
    selectedSlot,
    formData,
    locale,
    resultScreen,
    showConfirmation,
    setShowConfirmation,
  } = useBookingStore();

  useEffect(() => setClinic(clinic), [clinic, setClinic]);

  const canProceedStep1 = Boolean(selectedService && selectedSlot);
  const canProceedStep2 = Boolean(
    formData.patientFirstName.trim() &&
      formData.patientLastName.trim() &&
      formData.patientEmail.trim() &&
      formData.patientPhone.trim() &&
      (formData.bookingFor === "myself" ||
        (formData.payerFirstName.trim() && formData.payerLastName.trim() && formData.payerEmail.trim() && formData.payerPhone.trim())),
  );

  const primary = (enabled = true) =>
    cn(
      "group flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[10px] font-extrabold uppercase tracking-[.12em]",
      enabled ? "btn-gold" : "cursor-not-allowed border border-white/8 bg-white/[.04] text-white/25",
    );

  return (
    <div className="min-h-screen bg-[#08080a] lg:grid lg:grid-cols-[42%_58%]">
      <BookingPhotoPanel />

      <div className="min-w-0">
        <Header />

        {resultScreen ? (
          <ResultScreen />
        ) : (
          <main className="mx-auto max-w-3xl px-4 py-8 sm:px-7 sm:py-10 xl:py-12">
            {step === 1 && (
              <div className="space-y-6 animate-luxury-reveal">
                <div>
                  <span className="luxury-kicker">{locale === "pl" ? "Krok pierwszy" : "Step one"}</span>
                  <h1 className="luxury-title mt-3 text-4xl sm:text-5xl">
                    {locale === "pl" ? "Znajdź swój termin." : "Find your appointment."}
                  </h1>
                  <p className="mt-3 text-xs leading-6 t-low">
                    {locale === "pl"
                      ? "Wybierz formę spotkania, usługę i dogodny termin. Cena jest zawsze widoczna przed potwierdzeniem."
                      : "Choose how you would like to meet, your service, and a convenient time. Pricing is always visible before confirmation."}
                  </p>
                </div>

                <VisitModeToggle />
                <ServiceSelector />
                <SpecialistSelector />
                <TimeSlotPicker />

                <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-6">
                  <span className="hidden items-center gap-2 text-[10px] t-dim sm:flex">
                    <LockKeyhole size={13} /> {locale === "pl" ? "Twoje dane są chronione" : "Your information is protected"}
                  </span>
                  <button onClick={() => setStep(2)} disabled={!canProceedStep1} className={cn(primary(canProceedStep1), "w-full sm:w-auto")}>
                    {t(locale, "nextStep")} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-7 animate-luxury-reveal">
                <div>
                  <span className="luxury-kicker">{locale === "pl" ? "Krok drugi" : "Step two"}</span>
                  <h1 className="luxury-title mt-3 text-4xl sm:text-5xl">
                    {locale === "pl" ? "Opowiedz nam, dla kogo." : "Tell us who it's for."}
                  </h1>
                  <p className="mt-3 text-xs leading-6 t-low">
                    {locale === "pl"
                      ? "Te informacje pozwolą klinice przygotować wizytę i wysłać właściwe potwierdzenie."
                      : "These details help the clinic prepare your visit and send the right confirmation."}
                  </p>
                </div>

                <PatientForm />

                <div className="flex gap-3 border-t border-white/10 pt-6">
                  <button onClick={() => setStep(1)} className="btn-ghost group flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[10px] font-extrabold uppercase tracking-[.1em]">
                    <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                    {t(locale, "prevStep")}
                  </button>
                  <button
                    onClick={() => { setStep(3); setShowConfirmation(true); }}
                    disabled={!canProceedStep2}
                    className={cn(primary(canProceedStep2), "flex-1")}
                  >
                    {t(locale, "nextStep")} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && !showConfirmation && (
              <div className="grid min-h-[55vh] place-items-center animate-luxury-reveal">
                <div className="max-w-md text-center">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[#d9bc7f]/40 t-gold">
                    <LockKeyhole size={21} />
                  </span>
                  <h1 className="luxury-title mt-7 text-5xl">{locale === "pl" ? "Ostatnie spojrzenie." : "One final look."}</h1>
                  <p className="mt-4 text-sm leading-6 t-mid">
                    {locale === "pl" ? "Sprawdź szczegóły wizyty, zanim ją zarezerwujemy." : "Review the visit details before we reserve it for you."}
                  </p>
                  <button onClick={() => setShowConfirmation(true)} className={cn(primary(), "mx-auto mt-8")}>
                    {t(locale, "confirmBooking")} <ArrowRight size={14} />
                  </button>
                  <button onClick={() => setStep(2)} className="mt-5 text-[10px] font-bold uppercase tracking-wider t-dim hover:text-[#f7f5f0]">
                    ← {t(locale, "prevStep")}
                  </button>
                </div>
              </div>
            )}
          </main>
        )}

        <footer className="border-t border-white/10 px-7 py-5 text-center text-[9px] font-bold uppercase tracking-[.14em] t-dim">
          Powered by <a href="/" className="t-gold">TheraFlow</a> · Photos via Unsplash ·{" "}
          <a href="/crm/login" className="hover:text-[#d9bc7f]">Clinic CRM</a>
        </footer>
      </div>

      <ConfirmationModal />
    </div>
  );
}
