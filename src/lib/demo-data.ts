import type { ClinicData, ServiceData, SlotData, SpecialistData, VisitMode } from "./store";

export const DEMO_CLINIC: ClinicData = {
  id: "clinic-harmonia",
  name: "Centrum Terapii Harmonia",
  slug: "harmonia",
  address: "ul. Marszałkowska 42, 00-044 Warszawa",
  phone: "+48 22 123 45 67",
  email: "recepcja@harmonia.pl",
  themeColor: "#6366F1",
};

export const DEMO_SERVICES: ServiceData[] = [
  {
    id: "service-consultation",
    name: "Konsultacja psychologiczna",
    nameEn: "Psychological consultation",
    description: "Pierwsza wizyta i rozpoznanie potrzeb",
    descriptionEn: "First visit and needs assessment",
    durationMinutes: 50,
    priceGrosze: 25000,
    currency: "PLN",
    onlineAvailable: true,
    inOfficeAvailable: true,
  },
  {
    id: "service-therapy",
    name: "Sesja psychoterapii",
    nameEn: "Psychotherapy session",
    description: "Regularna indywidualna sesja terapeutyczna",
    descriptionEn: "Regular individual therapy session",
    durationMinutes: 50,
    priceGrosze: 22000,
    currency: "PLN",
    onlineAvailable: true,
    inOfficeAvailable: true,
  },
  {
    id: "service-psychiatry",
    name: "Konsultacja psychiatryczna",
    nameEn: "Psychiatric consultation",
    description: "Konsultacja diagnostyczna z lekarzem psychiatrą",
    descriptionEn: "Diagnostic consultation with a psychiatrist",
    durationMinutes: 40,
    priceGrosze: 35000,
    currency: "PLN",
    onlineAvailable: false,
    inOfficeAvailable: true,
  },
  {
    id: "service-couples",
    name: "Terapia par",
    nameEn: "Couples therapy",
    description: "Sesja terapeutyczna dla par",
    descriptionEn: "Therapy session for couples",
    durationMinutes: 80,
    priceGrosze: 32000,
    currency: "PLN",
    onlineAvailable: true,
    inOfficeAvailable: true,
  },
  {
    id: "service-emdr",
    name: "Sesja EMDR",
    nameEn: "EMDR session",
    description: "Terapia traumy metodą EMDR",
    descriptionEn: "EMDR trauma therapy",
    durationMinutes: 60,
    priceGrosze: 28000,
    currency: "PLN",
    onlineAvailable: false,
    inOfficeAvailable: true,
  },
  {
    id: "service-child",
    name: "Konsultacja dziecięca",
    nameEn: "Child psychology consultation",
    description: "Wsparcie psychologiczne dla dzieci i rodziców",
    descriptionEn: "Psychological support for children and parents",
    durationMinutes: 50,
    priceGrosze: 26000,
    currency: "PLN",
    onlineAvailable: true,
    inOfficeAvailable: true,
  },
];

export const DEMO_SPECIALISTS: SpecialistData[] = [
  {
    id: "specialist-anna",
    firstName: "Anna",
    lastName: "Kowalska",
    title: "dr",
    specialty: "Psychoterapia poznawczo-behawioralna",
    avatarUrl: null,
  },
  {
    id: "specialist-tomasz",
    firstName: "Tomasz",
    lastName: "Nowak",
    title: "mgr",
    specialty: "Terapia par i rodzin",
    avatarUrl: null,
  },
  {
    id: "specialist-maria",
    firstName: "Maria",
    lastName: "Wiśniewska",
    title: "lek.",
    specialty: "Psychiatria dorosłych",
    avatarUrl: null,
  },
  {
    id: "specialist-pawel",
    firstName: "Paweł",
    lastName: "Zieliński",
    title: "mgr",
    specialty: "Psychoterapia psychodynamiczna",
    avatarUrl: null,
  },
  {
    id: "specialist-zofia",
    firstName: "Zofia",
    lastName: "Lewandowska",
    title: "mgr",
    specialty: "Psychologia dzieci i młodzieży",
    avatarUrl: null,
  },
];

export const SPECIALIST_SERVICE_IDS: Record<string, string[]> = {
  "specialist-anna": ["service-consultation", "service-therapy", "service-emdr"],
  "specialist-tomasz": ["service-consultation", "service-couples"],
  "specialist-maria": ["service-psychiatry", "service-consultation"],
  "specialist-pawel": ["service-consultation", "service-therapy", "service-emdr"],
  "specialist-zofia": ["service-consultation", "service-child"],
};

export interface DemoBooking {
  id: string;
  patientFirstName: string;
  patientLastName: string;
  patientEmail: string;
  patientPhone: string;
  serviceId: string;
  serviceName: string;
  specialistId: string;
  specialistName: string;
  startTime: string;
  endTime: string;
  mode: VisitMode;
  status: "pending" | "confirmed" | "cancelled" | "completed" | "payment_failed";
  totalGrosze: number;
  currency: string;
  createdAt: string;
  notes: string;
  bookingFor: "myself" | "someone_else";
  payerFirstName?: string;
  payerLastName?: string;
}

function atFutureDay(daysFromNow: number, hour: number, minutes = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hour, minutes, 0, 0);
  return date.toISOString();
}

export const DEMO_BOOKINGS: DemoBooking[] = [
  {
    id: "HF-1048",
    patientFirstName: "Julia",
    patientLastName: "Kaczmarek",
    patientEmail: "julia.k@example.com",
    patientPhone: "+48 600 321 452",
    serviceId: "service-therapy",
    serviceName: "Sesja psychoterapii",
    specialistId: "specialist-anna",
    specialistName: "dr Anna Kowalska",
    startTime: atFutureDay(1, 9),
    endTime: atFutureDay(1, 9, 50),
    mode: "in_office",
    status: "confirmed",
    totalGrosze: 22000,
    currency: "PLN",
    createdAt: atFutureDay(-3, 11),
    notes: "Pierwsza regularna sesja po konsultacji.",
    bookingFor: "myself",
  },
  {
    id: "HF-1049",
    patientFirstName: "Michał",
    patientLastName: "Wójcik",
    patientEmail: "michal.w@example.com",
    patientPhone: "+48 510 490 283",
    serviceId: "service-consultation",
    serviceName: "Konsultacja psychologiczna",
    specialistId: "specialist-pawel",
    specialistName: "mgr Paweł Zieliński",
    startTime: atFutureDay(1, 11),
    endTime: atFutureDay(1, 11, 50),
    mode: "online",
    status: "pending",
    totalGrosze: 25000,
    currency: "PLN",
    createdAt: atFutureDay(-1, 15),
    notes: "Preferowany kontakt mailowy.",
    bookingFor: "myself",
  },
  {
    id: "HF-1050",
    patientFirstName: "Oliwia",
    patientLastName: "Lis",
    patientEmail: "parent.lis@example.com",
    patientPhone: "+48 730 112 456",
    serviceId: "service-child",
    serviceName: "Konsultacja dziecięca",
    specialistId: "specialist-zofia",
    specialistName: "mgr Zofia Lewandowska",
    startTime: atFutureDay(2, 14),
    endTime: atFutureDay(2, 14, 50),
    mode: "in_office",
    status: "confirmed",
    totalGrosze: 26000,
    currency: "PLN",
    createdAt: atFutureDay(-2, 10),
    notes: "Pierwsze spotkanie z rodzicem.",
    bookingFor: "someone_else",
    payerFirstName: "Karolina",
    payerLastName: "Lis",
  },
  {
    id: "HF-1042",
    patientFirstName: "Adam",
    patientLastName: "Sikora",
    patientEmail: "adam.s@example.com",
    patientPhone: "+48 880 452 771",
    serviceId: "service-psychiatry",
    serviceName: "Konsultacja psychiatryczna",
    specialistId: "specialist-maria",
    specialistName: "lek. Maria Wiśniewska",
    startTime: atFutureDay(-1, 13),
    endTime: atFutureDay(-1, 13, 40),
    mode: "in_office",
    status: "completed",
    totalGrosze: 35000,
    currency: "PLN",
    createdAt: atFutureDay(-8, 9),
    notes: "",
    bookingFor: "myself",
  },
  {
    id: "HF-1038",
    patientFirstName: "Ewa",
    patientLastName: "Dąbrowska",
    patientEmail: "ewa.d@example.com",
    patientPhone: "+48 690 882 113",
    serviceId: "service-couples",
    serviceName: "Terapia par",
    specialistId: "specialist-tomasz",
    specialistName: "mgr Tomasz Nowak",
    startTime: atFutureDay(-3, 16),
    endTime: atFutureDay(-3, 17, 20),
    mode: "online",
    status: "cancelled",
    totalGrosze: 32000,
    currency: "PLN",
    createdAt: atFutureDay(-10, 14),
    notes: "",
    bookingFor: "myself",
  },
];

export interface ManagedService extends ServiceData {
  active: boolean;
}

export interface ManagedSpecialist extends SpecialistData {
  active: boolean;
}

export const DEMO_MANAGED_SERVICES: ManagedService[] = DEMO_SERVICES.map((item) => ({ ...item, active: true }));
export const DEMO_MANAGED_SPECIALISTS: ManagedSpecialist[] = DEMO_SPECIALISTS.map((item) => ({ ...item, active: true }));

export function getDemoSlots(): SlotData[] {
  const slots: SlotData[] = [];
  const hours = [9, 10, 11, 13, 14, 15, 16, 17];

  for (let dayOffset = 0; dayOffset < 28; dayOffset += 1) {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    date.setHours(0, 0, 0, 0);
    const weekday = date.getDay();
    if (weekday === 0) continue;

    DEMO_SPECIALISTS.forEach((specialist, specialistIndex) => {
      const serviceIds = SPECIALIST_SERVICE_IDS[specialist.id] ?? [];
      serviceIds.forEach((serviceId, serviceIndex) => {
        const service = DEMO_SERVICES.find((item) => item.id === serviceId);
        if (!service) return;

        const modes: VisitMode[] = [];
        if (service.inOfficeAvailable) modes.push("in_office");
        if (service.onlineAvailable) modes.push("online");

        hours.forEach((hour, hourIndex) => {
          if ((dayOffset + specialistIndex + serviceIndex + hourIndex) % 4 === 0) return;
          if (weekday === 6 && hour > 13) return;

          modes.forEach((mode) => {
            const start = new Date(date);
            start.setHours(hour, specialistIndex % 2 === 0 ? 0 : 30, 0, 0);
            if (start <= new Date()) return;
            const end = new Date(start.getTime() + service.durationMinutes * 60_000);
            const dateKey = start.toISOString().slice(0, 16).replace(/[:T]/g, "-");

            slots.push({
              id: `${dateKey}-${specialist.id}-${service.id}-${mode}`,
              startTime: start.toISOString(),
              endTime: end.toISOString(),
              mode,
              specialistId: specialist.id,
              serviceId: service.id,
              specialistFirstName: specialist.firstName,
              specialistLastName: specialist.lastName,
              specialistTitle: specialist.title,
              serviceName: service.name,
              serviceNameEn: service.nameEn,
              durationMinutes: service.durationMinutes,
              priceGrosze: service.priceGrosze,
              currency: service.currency,
            });
          });
        });
      });
    });
  }

  return slots;
}

export const STORAGE_KEYS = {
  session: "theraflow-demo-session",
  bookings: "theraflow-demo-bookings",
  services: "theraflow-demo-services",
  specialists: "theraflow-demo-specialists",
  reservedSlots: "theraflow-demo-reserved-slots",
} as const;

export const DEMO_USERS = [
  {
    name: "Marta Nowicka",
    role: "Clinic owner",
    email: "owner@theraflow.demo",
    password: "demo123",
    initials: "MN",
  },
  {
    name: "Kamil Wrona",
    role: "Receptionist",
    email: "staff@theraflow.demo",
    password: "demo123",
    initials: "KW",
  },
] as const;
