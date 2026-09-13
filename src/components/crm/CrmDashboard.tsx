"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowUpRight,
  CalendarCheck2,
  CheckCircle2,
  CircleDollarSign,
  Download,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Menu,
  Pencil,
  Plus,
  RefreshCcw,
  Search,
  Sparkles,
  Stethoscope,
  Trash2,
  UserRound,
  UsersRound,
  Video,
  X,
} from "lucide-react";
import {
  DEMO_SERVICES,
  DEMO_SPECIALISTS,
  STORAGE_KEYS,
  type DemoBooking,
  type ManagedService,
  type ManagedSpecialist,
} from "@/lib/demo-data";
import {
  getDemoBookings,
  getManagedServices,
  getManagedSpecialists,
  resetDemoWorkspace,
  saveDemoBookings,
  saveManagedServices,
  saveManagedSpecialists,
} from "@/lib/demo-storage";
import { editorialImages } from "@/lib/media";
import { cn, formatPrice, formatTime } from "@/lib/utils";

type View = "overview" | "appointments" | "patients" | "services" | "specialists";
type Modal = "booking" | "service" | "specialist" | null;
type Session = { name: string; role: string; email: string; initials: string };

const statusStyle: Record<DemoBooking["status"], string> = {
  confirmed: "border-[#4ea981]/35 bg-[#4ea981]/12 text-[#8fd8b8]",
  pending: "border-[#d9a441]/35 bg-[#d9a441]/12 text-[#efc887]",
  cancelled: "border-white/15 bg-white/5 text-white/50",
  completed: "border-[#7fb8a0]/30 bg-[#7fb8a0]/10 text-[#a9d6c5]",
  payment_failed: "border-[#d76a6a]/35 bg-[#d76a6a]/12 text-[#f0a3a3]",
};

const specialistPhotos = [
  editorialImages.specialistWoman,
  editorialImages.specialistMan,
  editorialImages.therapist,
  editorialImages.specialistWomanTwo,
  editorialImages.clinicianDetail,
];

const servicePhotos = [
  editorialImages.therapyRoom,
  editorialImages.doctorConsultation,
  editorialImages.careTeam,
  editorialImages.clinicianDetail,
  editorialImages.quietOffice,
  editorialImages.careInterior,
];

export function CrmDashboard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [sidebar, setSidebar] = useState(false);
  const [view, setView] = useState<View>("overview");
  const [modal, setModal] = useState<Modal>(null);
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState<DemoBooking[]>([]);
  const [services, setServices] = useState<ManagedService[]>([]);
  const [specialists, setSpecialists] = useState<ManagedSpecialist[]>([]);
  const [editingService, setEditingService] = useState<string | null>(null);
  const [editingSpecialist, setEditingSpecialist] = useState<string | null>(null);

  const [bookingDraft, setBookingDraft] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    serviceId: DEMO_SERVICES[0].id, specialistId: DEMO_SPECIALISTS[0].id,
    startTime: "", mode: "in_office" as "online" | "in_office",
  });
  const [serviceDraft, setServiceDraft] = useState({ name: "", nameEn: "", durationMinutes: 50, price: 250, onlineAvailable: true, inOfficeAvailable: true });
  const [specialistDraft, setSpecialistDraft] = useState({ firstName: "", lastName: "", title: "mgr", specialty: "" });

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEYS.session);
    if (!raw) { router.replace("/crm/login"); return; }
    try {
      setSession(JSON.parse(raw) as Session);
      setBookings(getDemoBookings());
      setServices(getManagedServices());
      setSpecialists(getManagedSpecialists());
      setReady(true);
    } catch {
      window.localStorage.removeItem(STORAGE_KEYS.session);
      router.replace("/crm/login");
    }
  }, [router]);

  const upcoming = useMemo(
    () => bookings.filter((b) => new Date(b.startTime) >= new Date() && !["cancelled", "completed"].includes(b.status)).sort((a, b) => +new Date(a.startTime) - +new Date(b.startTime)),
    [bookings],
  );

  const patients = useMemo(() => {
    const map = new Map<string, { name: string; email: string; phone: string; visits: number; spend: number; last: string }>();
    bookings.forEach((b) => {
      const key = b.patientEmail.toLowerCase();
      const existing = map.get(key);
      if (existing) {
        existing.visits += 1;
        existing.spend += b.totalGrosze;
        if (new Date(b.startTime) > new Date(existing.last)) existing.last = b.startTime;
      } else {
        map.set(key, { name: `${b.patientFirstName} ${b.patientLastName}`, email: b.patientEmail, phone: b.patientPhone, visits: 1, spend: b.totalGrosze, last: b.startTime });
      }
    });
    return [...map.values()].sort((a, b) => b.visits - a.visits);
  }, [bookings]);

  const revenue = bookings.filter((b) => ["confirmed", "completed"].includes(b.status)).reduce((total, b) => total + b.totalGrosze, 0);

  const persistBookings = (next: DemoBooking[]) => { setBookings(next); saveDemoBookings(next); };
  const persistServices = (next: ManagedService[]) => { setServices(next); saveManagedServices(next); };
  const persistSpecialists = (next: ManagedSpecialist[]) => { setSpecialists(next); saveManagedSpecialists(next); };

  const saveService = (event: FormEvent) => {
    event.preventDefault();
    if (editingService) {
      persistServices(services.map((s) => s.id === editingService ? { ...s, name: serviceDraft.name, nameEn: serviceDraft.nameEn, durationMinutes: serviceDraft.durationMinutes, priceGrosze: Math.round(serviceDraft.price * 100), onlineAvailable: serviceDraft.onlineAvailable, inOfficeAvailable: serviceDraft.inOfficeAvailable } : s));
    } else {
      persistServices([...services, { id: `service-${Date.now()}`, name: serviceDraft.name, nameEn: serviceDraft.nameEn, description: "Custom clinic service", descriptionEn: "Custom clinic service", durationMinutes: serviceDraft.durationMinutes, priceGrosze: Math.round(serviceDraft.price * 100), currency: "PLN", onlineAvailable: serviceDraft.onlineAvailable, inOfficeAvailable: serviceDraft.inOfficeAvailable, active: true }]);
    }
    setModal(null);
  };

  const saveSpecialist = (event: FormEvent) => {
    event.preventDefault();
    if (editingSpecialist) {
      persistSpecialists(specialists.map((s) => s.id === editingSpecialist ? { ...s, ...specialistDraft } : s));
    } else {
      persistSpecialists([...specialists, { id: `specialist-${Date.now()}`, ...specialistDraft, avatarUrl: null, active: true }]);
    }
    setModal(null);
  };

  const createBooking = (event: FormEvent) => {
    event.preventDefault();
    const service = services.find((s) => s.id === bookingDraft.serviceId) ?? services[0];
    const specialist = specialists.find((s) => s.id === bookingDraft.specialistId) ?? specialists[0];
    if (!service || !specialist || !bookingDraft.startTime) return;
    const start = new Date(bookingDraft.startTime);
    persistBookings([{
      id: `HF-${Math.floor(1100 + Math.random() * 8800)}`,
      patientFirstName: bookingDraft.firstName, patientLastName: bookingDraft.lastName,
      patientEmail: bookingDraft.email, patientPhone: bookingDraft.phone,
      serviceId: service.id, serviceName: service.name,
      specialistId: specialist.id, specialistName: `${specialist.title ?? ""} ${specialist.firstName} ${specialist.lastName}`.trim(),
      startTime: start.toISOString(), endTime: new Date(start.getTime() + service.durationMinutes * 60_000).toISOString(),
      mode: bookingDraft.mode, status: "confirmed", totalGrosze: service.priceGrosze, currency: service.currency,
      createdAt: new Date().toISOString(), notes: "Created in CRM", bookingFor: "myself",
    }, ...bookings]);
    setBookingDraft({ firstName: "", lastName: "", email: "", phone: "", serviceId: services[0]?.id ?? "", specialistId: specialists[0]?.id ?? "", startTime: "", mode: "in_office" });
    setModal(null);
  };

  const logout = () => { window.localStorage.removeItem(STORAGE_KEYS.session); router.push("/crm/login"); };
  const resetData = () => { resetDemoWorkspace(); setBookings(getDemoBookings()); setServices(getManagedServices()); setSpecialists(getManagedSpecialists()); };

  if (!ready || !session) {
    return <div className="grid min-h-screen place-items-center bg-[#08080a]"><div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d9bc7f] border-t-transparent" /></div>;
  }

  const nav = [
    { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
    { id: "appointments" as const, label: "Appointments", icon: CalendarCheck2, count: bookings.length },
    { id: "patients" as const, label: "Patients", icon: UserRound, count: patients.length },
    { id: "services" as const, label: "Services", icon: Stethoscope, count: services.length },
    { id: "specialists" as const, label: "Specialists", icon: UsersRound, count: specialists.length },
  ];

  const titles: Record<View, [string, string]> = {
    overview: [`Good morning, ${session.name.split(" ")[0]}`, "Here is what is happening at Harmonia today."],
    appointments: ["Appointments", "Create, confirm and manage patient visits."],
    patients: ["Patients", "Every person who has booked with the clinic."],
    services: ["Services", "Manage the bookable offer and pricing."],
    specialists: ["Specialists", "Manage your clinical team."],
  };

  const filtered = <T,>(list: T[], match: (item: T) => string) =>
    list.filter((item) => !search.trim() || match(item).toLowerCase().includes(search.toLowerCase().trim()));

  return (
    <div className="min-h-screen bg-[#08080a]">
      {sidebar && <button onClick={() => setSidebar(false)} className="fixed inset-0 z-40 bg-black/70 lg:hidden" aria-label="Close menu" />}

      <aside className={cn("fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-[#0b0b0d] transition-transform lg:translate-x-0", sidebar ? "translate-x-0" : "-translate-x-full")}>
        <div className="flex h-20 items-center justify-between px-5">
          <a href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[#d9bc7f]/40 t-gold"><Sparkles size={17} /></span>
            <span className="luxury-title text-xl">TheraFlow</span>
          </a>
          <button onClick={() => setSidebar(false)} className="t-mid lg:hidden"><X size={18} /></button>
        </div>

        <div className="px-3 py-3">
          <p className="px-3 pb-2 text-[9px] font-extrabold uppercase tracking-[.18em] t-dim">CRM</p>
          <nav className="space-y-1">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => { setView(item.id); setSidebar(false); setSearch(""); }}
                className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold", view === item.id ? "bg-[#d9bc7f]/12 t-gold" : "t-mid hover:bg-white/5 hover:text-[#f7f5f0]")}
              >
                <item.icon size={17} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.count !== undefined && <span className="rounded-full bg-white/8 px-2 py-0.5 text-[10px] t-mid">{item.count}</span>}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto space-y-3 p-3">
          <a href="/book" target="_blank" className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider t-mid hover:border-[#d9bc7f]/40 hover:text-[#d9bc7f]">
            <ExternalLink size={13} /> Patient booking site
          </a>
          <div className="surface rounded-2xl p-3">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#d9bc7f] text-[10px] font-extrabold text-[#08080a]">{session.initials}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold t-hi">{session.name}</p>
                <p className="truncate text-[10px] t-dim">{session.role}</p>
              </div>
              <button onClick={logout} className="rounded-lg p-2 t-dim hover:bg-white/5 hover:text-[#f0a3a3]" title="Log out"><LogOut size={15} /></button>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-[#08080a]/92 px-4 backdrop-blur-xl sm:px-7">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebar(true)} className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 t-hi lg:hidden"><Menu size={18} /></button>
            <div>
              <h1 className="luxury-title text-2xl sm:text-3xl">{titles[view][0]}</h1>
              <p className="hidden text-[11px] t-low sm:block">{titles[view][1]}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border border-[#d9bc7f]/25 bg-[#d9bc7f]/8 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider t-gold sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d9bc7f]" /> Local demo data
            </span>
            <button onClick={resetData} className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 t-mid hover:text-[#d9bc7f]" title="Reset demo data"><RefreshCcw size={16} /></button>
          </div>
        </header>

        <main className="p-4 sm:p-7">
          {/* OVERVIEW */}
          {view === "overview" && (
            <div className="mx-auto max-w-[1380px] animate-fade-in">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: "Upcoming visits", value: upcoming.length.toString(), detail: `${bookings.filter((b) => b.status === "pending").length} need attention`, icon: CalendarCheck2 },
                  { label: "Active patients", value: patients.length.toString(), detail: "Unique people booked", icon: UserRound },
                  { label: "Booking revenue", value: formatPrice(revenue), detail: "Confirmed + completed", icon: CircleDollarSign },
                  { label: "Completion rate", value: "92%", detail: "+4.2% this month", icon: Activity },
                ].map((metric) => (
                  <div key={metric.label} className="surface rounded-2xl p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider t-dim">{metric.label}</p>
                        <p className="luxury-title mt-3 text-4xl">{metric.value}</p>
                      </div>
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-[#d9bc7f]/25 t-gold"><metric.icon size={18} /></span>
                    </div>
                    <p className="mt-3 text-[11px] t-low">{metric.detail}</p>
                  </div>
                ))}
              </div>

              {/* Care team strip */}
              <section className="surface mt-5 overflow-hidden rounded-2xl">
                <div className="flex items-center justify-between px-5 py-4">
                  <div>
                    <h2 className="luxury-title text-2xl">Care team today</h2>
                    <p className="mt-0.5 text-[10px] t-dim">Specialists currently accepting appointments</p>
                  </div>
                  <button onClick={() => setView("specialists")} className="text-[10px] font-extrabold uppercase tracking-wider t-gold">Manage team</button>
                </div>
                <div className="grid h-32 grid-cols-2 gap-px sm:h-40 sm:grid-cols-4">
                  {specialistPhotos.slice(0, 4).map((photo, index) => (
                    <a key={photo.src} href={photo.source} target="_blank" rel="noreferrer" className="luxury-image img-tone relative animate-image-reveal" style={{ animationDelay: `${index * 70}ms` }}>
                      <img src={photo.src} alt={photo.alt} />
                      <span className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <span className="absolute bottom-2 left-3 text-[10px] font-bold text-white">
                        {specialists[index] ? `${specialists[index].firstName} ${specialists[index].lastName}` : "Specialist"}
                      </span>
                    </a>
                  ))}
                </div>
              </section>

              <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
                <section className="surface rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="luxury-title text-2xl">Booking activity</h2>
                      <p className="mt-1 text-[11px] t-dim">Appointments during the last 7 days</p>
                    </div>
                    <button className="flex items-center gap-1 rounded-lg border border-white/12 px-2.5 py-1.5 text-[10px] font-bold t-mid hover:text-[#d9bc7f]"><Download size={12} /> Export</button>
                  </div>
                  <div className="mt-8 flex h-48 items-end justify-between gap-3 border-b border-dashed border-white/10 px-2">
                    {[44, 68, 52, 86, 64, 92, 74].map((height, index) => (
                      <div key={index} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                        <div className="relative w-full max-w-12 rounded-t-lg bg-gradient-to-t from-[#8a6f3c] to-[#d9bc7f]" style={{ height: `${height}%` }}>
                          <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold t-mid">{Math.round(height / 5)}</span>
                        </div>
                        <span className="text-[9px] t-dim">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="surface rounded-2xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="luxury-title text-2xl">Next appointments</h2>
                      <p className="mt-1 text-[11px] t-dim">Live clinic queue</p>
                    </div>
                    <button onClick={() => setView("appointments")} className="text-[10px] font-extrabold uppercase tracking-wider t-gold">View all</button>
                  </div>
                  <div className="mt-5 space-y-4">
                    {upcoming.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-full border border-[#d9bc7f]/30 text-[10px] font-extrabold t-gold">
                          {booking.patientFirstName[0]}{booking.patientLastName[0]}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-bold t-hi">{booking.patientFirstName} {booking.patientLastName}</p>
                          <p className="truncate text-[10px] t-dim">{formatTime(booking.startTime)} · {booking.serviceName}</p>
                        </div>
                        <span className={cn("h-2 w-2 rounded-full", booking.status === "pending" ? "bg-[#d9a441]" : "bg-[#4ea981]")} />
                      </div>
                    ))}
                    {upcoming.length === 0 && <p className="py-8 text-center text-xs t-dim">No upcoming appointments</p>}
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* APPOINTMENTS */}
          {view === "appointments" && (
            <div className="mx-auto max-w-[1380px] animate-fade-in">
              <Toolbar search={search} setSearch={setSearch} placeholder="Search patient, service or specialist..." action="New appointment" onAction={() => setModal("booking")} />
              <div className="surface mt-5 overflow-hidden rounded-2xl">
                <div className="hidden grid-cols-[1.2fr_1fr_1fr_.7fr_.8fr_80px] gap-4 border-b border-white/10 px-5 py-3 text-[9px] font-extrabold uppercase tracking-wider t-dim lg:grid">
                  <span>Patient</span><span>Visit</span><span>Specialist</span><span>Date</span><span>Status</span><span>Actions</span>
                </div>
                {filtered(bookings, (b) => `${b.patientFirstName} ${b.patientLastName} ${b.patientEmail} ${b.serviceName} ${b.specialistName}`).map((booking) => (
                  <div key={booking.id} className="grid gap-3 border-b border-white/8 p-4 last:border-0 hover:bg-white/[.02] lg:grid-cols-[1.2fr_1fr_1fr_.7fr_.8fr_80px] lg:items-center lg:gap-4 lg:px-5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#d9bc7f] text-[10px] font-extrabold text-[#08080a]">
                        {booking.patientFirstName[0]}{booking.patientLastName[0]}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold t-hi">{booking.patientFirstName} {booking.patientLastName}</p>
                        <p className="truncate text-[10px] t-dim">{booking.patientEmail}</p>
                      </div>
                    </div>
                    <div>
                      <p className="truncate text-xs font-semibold t-hi">{booking.serviceName}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-[10px] t-dim">
                        {booking.mode === "online" ? <Video size={11} /> : <Stethoscope size={11} />}
                        {booking.mode === "online" ? "Online" : "In office"}
                      </p>
                    </div>
                    <p className="truncate text-xs t-mid">{booking.specialistName}</p>
                    <div>
                      <p className="text-xs font-semibold t-hi">{new Date(booking.startTime).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}</p>
                      <p className="text-[10px] t-dim">{formatTime(booking.startTime)}</p>
                    </div>
                    <select
                      value={booking.status}
                      onChange={(e) => persistBookings(bookings.map((b) => b.id === booking.id ? { ...b, status: e.target.value as DemoBooking["status"] } : b))}
                      className={cn("w-full rounded-full border bg-transparent px-2 py-1.5 text-[10px] font-bold outline-none", statusStyle[booking.status])}
                    >
                      <option className="bg-[#121215]" value="pending">Pending</option>
                      <option className="bg-[#121215]" value="confirmed">Confirmed</option>
                      <option className="bg-[#121215]" value="completed">Completed</option>
                      <option className="bg-[#121215]" value="cancelled">Cancelled</option>
                      <option className="bg-[#121215]" value="payment_failed">Payment failed</option>
                    </select>
                    <div className="flex justify-end gap-1">
                      <button onClick={() => persistBookings(bookings.map((b) => b.id === booking.id ? { ...b, status: "confirmed" } : b))} className="grid h-8 w-8 place-items-center rounded-lg t-dim hover:bg-white/5 hover:text-[#8fd8b8]" title="Confirm"><CheckCircle2 size={15} /></button>
                      <button onClick={() => persistBookings(bookings.filter((b) => b.id !== booking.id))} className="grid h-8 w-8 place-items-center rounded-lg t-dim hover:bg-white/5 hover:text-[#f0a3a3]" title="Delete"><Trash2 size={15} /></button>
                    </div>
                  </div>
                ))}
                {bookings.length === 0 && <Empty label="No appointments yet" />}
              </div>
            </div>
          )}

          {/* PATIENTS */}
          {view === "patients" && (
            <div className="mx-auto max-w-[1380px] animate-fade-in">
              <Toolbar search={search} setSearch={setSearch} placeholder="Search patients..." action="New appointment" onAction={() => setModal("booking")} />
              <div className="stagger-luxury mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filtered(patients, (p) => `${p.name} ${p.email}`).map((patient) => (
                  <article key={patient.email} className="surface surface-hover rounded-2xl p-6">
                    <div className="flex items-center gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-[#d9bc7f] text-sm font-extrabold text-[#08080a]">
                        {patient.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                      </span>
                      <div className="min-w-0">
                        <h3 className="truncate font-bold t-hi">{patient.name}</h3>
                        <p className="truncate text-[10px] t-dim">{patient.email}</p>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                      <div><p className="luxury-title text-2xl t-gold">{patient.visits}</p><p className="text-[9px] uppercase tracking-wider t-dim">Visits</p></div>
                      <div><p className="luxury-title text-2xl t-gold">{formatPrice(patient.spend)}</p><p className="text-[9px] uppercase tracking-wider t-dim">Value</p></div>
                      <div><p className="text-xs font-bold t-hi">{new Date(patient.last).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}</p><p className="text-[9px] uppercase tracking-wider t-dim">Latest</p></div>
                    </div>
                    <p className="mt-4 text-[11px] t-low">{patient.phone}</p>
                  </article>
                ))}
                {patients.length === 0 && <Empty label="No patients yet" />}
              </div>
            </div>
          )}

          {/* SERVICES */}
          {view === "services" && (
            <div className="mx-auto max-w-[1380px] animate-fade-in">
              <Toolbar search={search} setSearch={setSearch} placeholder="Search services..." action="Add service" onAction={() => { setEditingService(null); setServiceDraft({ name: "", nameEn: "", durationMinutes: 50, price: 250, onlineAvailable: true, inOfficeAvailable: true }); setModal("service"); }} />
              <div className="stagger-luxury mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filtered(services, (s) => s.name).map((service, index) => {
                  const photo = servicePhotos[index % servicePhotos.length];
                  return (
                    <article key={service.id} className={cn("surface surface-hover overflow-hidden rounded-2xl", !service.active && "opacity-55")}>
                      <a href={photo.source} target="_blank" rel="noreferrer" className="luxury-image img-tone block h-36"><img src={photo.src} alt={photo.alt} /></a>
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <h3 className="luxury-title text-2xl">{service.name}</h3>
                          <div className="flex gap-1">
                            <button onClick={() => { setEditingService(service.id); setServiceDraft({ name: service.name, nameEn: service.nameEn ?? "", durationMinutes: service.durationMinutes, price: service.priceGrosze / 100, onlineAvailable: service.onlineAvailable, inOfficeAvailable: service.inOfficeAvailable }); setModal("service"); }} className="grid h-8 w-8 place-items-center rounded-lg t-dim hover:bg-white/5 hover:text-[#f7f5f0]"><Pencil size={14} /></button>
                            <button onClick={() => persistServices(services.filter((s) => s.id !== service.id))} className="grid h-8 w-8 place-items-center rounded-lg t-dim hover:bg-white/5 hover:text-[#f0a3a3]"><Trash2 size={14} /></button>
                          </div>
                        </div>
                        <p className="mt-1 text-[11px] t-dim">{service.nameEn}</p>
                        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                          <div>
                            <p className="luxury-title text-2xl t-gold">{formatPrice(service.priceGrosze)}</p>
                            <p className="text-[10px] t-dim">{service.durationMinutes} min · {service.onlineAvailable ? "Online + office" : "Office only"}</p>
                          </div>
                          <button onClick={() => persistServices(services.map((s) => s.id === service.id ? { ...s, active: !s.active } : s))} className={cn("relative h-6 w-11 rounded-full", service.active ? "bg-[#d9bc7f]" : "bg-white/15")}>
                            <span className={cn("absolute top-1 h-4 w-4 rounded-full bg-[#08080a] transition-all", service.active ? "left-6" : "left-1")} />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}

          {/* SPECIALISTS */}
          {view === "specialists" && (
            <div className="mx-auto max-w-[1380px] animate-fade-in">
              <Toolbar search={search} setSearch={setSearch} placeholder="Search specialists..." action="Add specialist" onAction={() => { setEditingSpecialist(null); setSpecialistDraft({ firstName: "", lastName: "", title: "mgr", specialty: "" }); setModal("specialist"); }} />
              <div className="stagger-luxury mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {filtered(specialists, (s) => `${s.firstName} ${s.lastName} ${s.specialty}`).map((specialist, index) => {
                  const photo = specialistPhotos[index % specialistPhotos.length];
                  return (
                    <article key={specialist.id} className={cn("surface surface-hover overflow-hidden rounded-2xl", !specialist.active && "opacity-55")}>
                      <a href={photo.source} target="_blank" rel="noreferrer" className="luxury-image img-tone block h-48"><img src={photo.src} alt={photo.alt} /></a>
                      <div className="p-6">
                        <h3 className="luxury-title text-2xl">{specialist.title} {specialist.firstName} {specialist.lastName}</h3>
                        <p className="mt-1 text-[11px] t-low">{specialist.specialty}</p>
                        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                          <span className={cn("flex items-center gap-1.5 text-[10px] font-bold", specialist.active ? "t-gold" : "t-dim")}>
                            <span className={cn("h-1.5 w-1.5 rounded-full", specialist.active ? "bg-[#d9bc7f]" : "bg-white/30")} />
                            {specialist.active ? "Accepting" : "Inactive"}
                          </span>
                          <div className="flex gap-1">
                            <button onClick={() => { setEditingSpecialist(specialist.id); setSpecialistDraft({ firstName: specialist.firstName, lastName: specialist.lastName, title: specialist.title ?? "", specialty: specialist.specialty ?? "" }); setModal("specialist"); }} className="grid h-8 w-8 place-items-center rounded-lg t-dim hover:text-[#f7f5f0]"><Pencil size={14} /></button>
                            <button onClick={() => persistSpecialists(specialists.filter((s) => s.id !== specialist.id))} className="grid h-8 w-8 place-items-center rounded-lg t-dim hover:text-[#f0a3a3]"><Trash2 size={14} /></button>
                            <button onClick={() => persistSpecialists(specialists.map((s) => s.id === specialist.id ? { ...s, active: !s.active } : s))} className="grid h-8 w-8 place-items-center rounded-lg t-dim hover:text-[#d9bc7f]"><ArrowUpRight size={14} /></button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODALS */}
      {modal && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-black/75 p-4 backdrop-blur-sm" onMouseDown={(e) => { if (e.currentTarget === e.target) setModal(null); }}>
          <div className="surface w-full max-w-lg rounded-3xl p-6 shadow-2xl animate-scale-in sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-wider t-gold">Clinic CRM</p>
                <h2 className="luxury-title mt-1 text-3xl">
                  {modal === "booking" ? "Create appointment" : modal === "service" ? (editingService ? "Edit service" : "Add service") : editingSpecialist ? "Edit specialist" : "Add specialist"}
                </h2>
              </div>
              <button onClick={() => setModal(null)} className="grid h-9 w-9 place-items-center rounded-xl border border-white/12 t-mid"><X size={16} /></button>
            </div>

            {modal === "booking" && (
              <form onSubmit={createBooking} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <CrmField label="First name"><input required value={bookingDraft.firstName} onChange={(e) => setBookingDraft({ ...bookingDraft, firstName: e.target.value })} /></CrmField>
                  <CrmField label="Last name"><input required value={bookingDraft.lastName} onChange={(e) => setBookingDraft({ ...bookingDraft, lastName: e.target.value })} /></CrmField>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <CrmField label="Email"><input required type="email" value={bookingDraft.email} onChange={(e) => setBookingDraft({ ...bookingDraft, email: e.target.value })} /></CrmField>
                  <CrmField label="Phone"><input required value={bookingDraft.phone} onChange={(e) => setBookingDraft({ ...bookingDraft, phone: e.target.value })} /></CrmField>
                </div>
                <CrmField label="Service"><select value={bookingDraft.serviceId} onChange={(e) => setBookingDraft({ ...bookingDraft, serviceId: e.target.value })}>{services.filter((s) => s.active).map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></CrmField>
                <CrmField label="Specialist"><select value={bookingDraft.specialistId} onChange={(e) => setBookingDraft({ ...bookingDraft, specialistId: e.target.value })}>{specialists.filter((s) => s.active).map((s) => <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>)}</select></CrmField>
                <div className="grid grid-cols-2 gap-3">
                  <CrmField label="Date and time"><input required type="datetime-local" value={bookingDraft.startTime} onChange={(e) => setBookingDraft({ ...bookingDraft, startTime: e.target.value })} /></CrmField>
                  <CrmField label="Visit mode"><select value={bookingDraft.mode} onChange={(e) => setBookingDraft({ ...bookingDraft, mode: e.target.value as "online" | "in_office" })}><option value="in_office">In office</option><option value="online">Online</option></select></CrmField>
                </div>
                <ModalActions onCancel={() => setModal(null)} label="Create appointment" />
              </form>
            )}

            {modal === "service" && (
              <form onSubmit={saveService} className="space-y-4">
                <CrmField label="Service name"><input required value={serviceDraft.name} onChange={(e) => setServiceDraft({ ...serviceDraft, name: e.target.value })} /></CrmField>
                <CrmField label="English name"><input value={serviceDraft.nameEn} onChange={(e) => setServiceDraft({ ...serviceDraft, nameEn: e.target.value })} /></CrmField>
                <div className="grid grid-cols-2 gap-3">
                  <CrmField label="Duration (minutes)"><input required min="10" type="number" value={serviceDraft.durationMinutes} onChange={(e) => setServiceDraft({ ...serviceDraft, durationMinutes: +e.target.value })} /></CrmField>
                  <CrmField label="Price (PLN)"><input required min="0" type="number" value={serviceDraft.price} onChange={(e) => setServiceDraft({ ...serviceDraft, price: +e.target.value })} /></CrmField>
                </div>
                <div className="flex gap-3">
                  <CheckField label="Online" checked={serviceDraft.onlineAvailable} setChecked={(v) => setServiceDraft({ ...serviceDraft, onlineAvailable: v })} />
                  <CheckField label="In office" checked={serviceDraft.inOfficeAvailable} setChecked={(v) => setServiceDraft({ ...serviceDraft, inOfficeAvailable: v })} />
                </div>
                <ModalActions onCancel={() => setModal(null)} label={editingService ? "Save changes" : "Add service"} />
              </form>
            )}

            {modal === "specialist" && (
              <form onSubmit={saveSpecialist} className="space-y-4">
                <div className="grid grid-cols-[.35fr_1fr] gap-3">
                  <CrmField label="Title"><input value={specialistDraft.title} onChange={(e) => setSpecialistDraft({ ...specialistDraft, title: e.target.value })} /></CrmField>
                  <CrmField label="First name"><input required value={specialistDraft.firstName} onChange={(e) => setSpecialistDraft({ ...specialistDraft, firstName: e.target.value })} /></CrmField>
                </div>
                <CrmField label="Last name"><input required value={specialistDraft.lastName} onChange={(e) => setSpecialistDraft({ ...specialistDraft, lastName: e.target.value })} /></CrmField>
                <CrmField label="Specialty"><input required value={specialistDraft.specialty} onChange={(e) => setSpecialistDraft({ ...specialistDraft, specialty: e.target.value })} /></CrmField>
                <ModalActions onCancel={() => setModal(null)} label={editingSpecialist ? "Save changes" : "Add specialist"} />
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Toolbar({ search, setSearch, placeholder, action, onAction }: { search: string; setSearch: (v: string) => void; placeholder: string; action: string; onAction: () => void }) {
  return (
    <div className="flex flex-col justify-between gap-3 sm:flex-row">
      <div className="relative w-full sm:max-w-sm">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 t-dim" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-white/12 bg-[#121215] py-3 pl-10 pr-4 text-xs text-[#f7f5f0] outline-none placeholder:text-white/25 focus:border-[#d9bc7f]"
        />
      </div>
      <button onClick={onAction} className="btn-gold flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[10px] uppercase tracking-wider">
        <Plus size={15} />{action}
      </button>
    </div>
  );
}

function CrmField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[.12em] t-low">{label}</span>
      <div className="[&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-white/12 [&_input]:bg-[#0e0e11] [&_input]:px-3.5 [&_input]:py-3 [&_input]:text-xs [&_input]:text-[#f7f5f0] [&_input]:outline-none [&_select]:w-full [&_select]:rounded-xl [&_select]:border [&_select]:border-white/12 [&_select]:bg-[#0e0e11] [&_select]:px-3.5 [&_select]:py-3 [&_select]:text-xs [&_select]:text-[#f7f5f0] [&_select]:outline-none">
        {children}
      </div>
    </label>
  );
}

function CheckField({ label, checked, setChecked }: { label: string; checked: boolean; setChecked: (v: boolean) => void }) {
  return (
    <label className="flex flex-1 cursor-pointer items-center gap-2 rounded-xl border border-white/12 p-3 text-xs font-semibold t-hi">
      <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} className="accent-[#d9bc7f]" />
      {label}
    </label>
  );
}

function ModalActions({ onCancel, label }: { onCancel: () => void; label: string }) {
  return (
    <div className="flex gap-3 pt-2">
      <button type="button" onClick={onCancel} className="btn-ghost flex-1 rounded-full py-3 text-[10px] font-extrabold uppercase tracking-wider">Cancel</button>
      <button type="submit" className="btn-gold flex-[1.5] rounded-full py-3 text-[10px] uppercase tracking-wider">{label}</button>
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className="py-16 text-center">
      <CalendarCheck2 className="mx-auto t-dim" />
      <p className="mt-3 text-xs font-semibold t-dim">{label}</p>
    </div>
  );
}
