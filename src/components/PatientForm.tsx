"use client";

import { CreditCard, UserRound, UsersRound } from "lucide-react";
import { useBookingStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function FormInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[.12em] t-low">
        {label} {required && <span className="text-[#d76a6a]">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/12 bg-[#0e0e11] px-3.5 py-3 text-sm text-[#f7f5f0] outline-none placeholder:text-white/25 focus:border-[#d9bc7f]"
      />
    </div>
  );
}

export function PatientForm() {
  const { formData, setFormData, locale } = useBookingStore();

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <label className="mb-2 block text-sm font-semibold t-hi">{t(locale, "patientData")}</label>
        <div className="grid grid-cols-2 gap-1 rounded-full border border-white/12 bg-[#121215] p-1">
          {(["myself", "someone_else"] as const).map((mode) => {
            const Icon = mode === "myself" ? UserRound : UsersRound;
            const selected = formData.bookingFor === mode;
            return (
              <button
                key={mode}
                onClick={() => setFormData({ bookingFor: mode })}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-full px-3 py-3 text-[10px] font-extrabold uppercase tracking-[.1em]",
                  selected ? "bg-[#d9bc7f] text-[#08080a]" : "t-low hover:text-[#f7f5f0]",
                )}
              >
                <Icon size={14} />
                {t(locale, mode === "myself" ? "forMyself" : "forSomeoneElse")}
              </button>
            );
          })}
        </div>
      </div>

      {/* Patient */}
      <div className="space-y-4 rounded-2xl border border-white/10 bg-[#121215] p-5">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-[#d9bc7f]/30 t-gold">
            <UserRound size={16} />
          </span>
          <h3 className="text-sm font-semibold t-hi">{t(locale, "patientData")}</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormInput label={t(locale, "firstName")} value={formData.patientFirstName} onChange={(v) => setFormData({ patientFirstName: v })} required />
          <FormInput label={t(locale, "lastName")} value={formData.patientLastName} onChange={(v) => setFormData({ patientLastName: v })} required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormInput label={t(locale, "email")} type="email" value={formData.patientEmail} onChange={(v) => setFormData({ patientEmail: v })} placeholder="jan@email.pl" required />
          <FormInput label={t(locale, "phone")} type="tel" value={formData.patientPhone} onChange={(v) => setFormData({ patientPhone: v })} placeholder="+48 123 456 789" required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormInput label={t(locale, "dateOfBirth")} type="date" value={formData.patientDateOfBirth} onChange={(v) => setFormData({ patientDateOfBirth: v })} />
          <FormInput label={t(locale, "pesel")} value={formData.patientPesel} onChange={(v) => setFormData({ patientPesel: v })} placeholder="12345678901" />
        </div>
      </div>

      {/* Payer */}
      {formData.bookingFor === "someone_else" && (
        <div className="animate-slide-up space-y-4 rounded-2xl border border-[#d9bc7f]/30 bg-[#d9bc7f]/[.05] p-5">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[#d9bc7f]/40 t-gold">
              <CreditCard size={16} />
            </span>
            <h3 className="text-sm font-semibold t-hi">{t(locale, "payerData")}</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormInput label={t(locale, "firstName")} value={formData.payerFirstName} onChange={(v) => setFormData({ payerFirstName: v })} required />
            <FormInput label={t(locale, "lastName")} value={formData.payerLastName} onChange={(v) => setFormData({ payerLastName: v })} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <FormInput label={t(locale, "email")} type="email" value={formData.payerEmail} onChange={(v) => setFormData({ payerEmail: v })} required />
            <FormInput label={t(locale, "phone")} type="tel" value={formData.payerPhone} onChange={(v) => setFormData({ payerPhone: v })} required />
          </div>
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[.12em] t-low">{t(locale, "notes")}</label>
        <textarea
          value={formData.notes}
          onChange={(event) => setFormData({ notes: event.target.value })}
          placeholder={t(locale, "notesPlaceholder")}
          rows={3}
          className="w-full resize-none rounded-xl border border-white/12 bg-[#0e0e11] px-3.5 py-3 text-sm text-[#f7f5f0] outline-none placeholder:text-white/25 focus:border-[#d9bc7f]"
        />
      </div>
    </div>
  );
}
