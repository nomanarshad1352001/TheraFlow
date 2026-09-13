"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowLeft,
  BarChart3,
  CalendarCheck2,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Download,
  HeartHandshake,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  MoreHorizontal,
  Pencil,
  Plus,
  RefreshCcw,
  Search,
  Stethoscope,
  Sun,
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
import { cn, formatPrice, formatTime } from "@/lib/utils";

type View = "overview" | "bookings" | "services" | "specialists";
type Modal = "booking" | "service" | "specialist" | null;
type Session = { name: string; role: string; email: string; initials: string };

const statusStyle: Record<DemoBooking["status"], string> = {
  confirmed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  cancelled: "bg-slate-500/10 text-slate-500 border-slate-500/20",
  completed: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  payment_failed: "bg-red-500/10 text-red-600 border-red-500/20",
};

const statusLabel: Record<DemoBooking["status"], string> = {
  confirmed: "Confirmed",
  pending: "Pending",
  cancelled: "Cancelled",
  completed: "Completed",
  payment_failed: "Payment failed",
};

export function AdminPanel() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<View>("overview");
  const [modal, setModal] = useState<Modal>(null);
  const [search, setSearch] = useState("");
  const [bookings, setBookings] = useState<DemoBooking[]>([]);
  const [services, setServices] = useState<ManagedService[]>([]);
  const [specialists, setSpecialists] = useState<ManagedSpecialist[]>([]);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingSpecialistId, setEditingSpecialistId] = useState<string | null>(null);

  const [bookingDraft, setBookingDraft] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceId: DEMO_SERVICES[0].id,
    specialistId: DEMO_SPECIALISTS[0].id,
    startTime: "",
    mode: "in_office" as "online" | "in_office",
  });
  const [serviceDraft, setServiceDraft] = useState({ name: "", nameEn: "", durationMinutes: 50, price: 250, onlineAvailable: true, inOfficeAvailable: true });
  const [specialistDraft, setSpecialistDraft] = useState({ firstName: "", lastName: "", title: "mgr", specialty: "" });

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEYS.session);
    if (!raw) {
      router.replace("/login");
      return;
    }
    try {
      setSession(JSON.parse(raw) as Session);
      setBookings(getDemoBookings());
      setServices(getManagedServices());
      setSpecialists(getManagedSpecialists());
      setReady(true);
    } catch {
      window.localStorage.removeItem(STORAGE_KEYS.session);
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    return () => document.documentElement.classList.remove("dark");
  }, [dark]);

  const upcomingBookings = useMemo(
    () => bookings.filter((booking) => new Date(booking.startTime) >= new Date() && !["cancelled", "completed"].includes(booking.status)).sort((a, b) => +new Date(a.startTime) - +new Date(b.startTime)),
    [bookings],
  );
  const filteredBookings = useMemo(() => {
    const query = search.toLowerCase().trim();
    return bookings.filter((booking) => !query || `${booking.patientFirstName} ${booking.patientLastName} ${booking.patientEmail} ${booking.serviceName} ${booking.specialistName}`.toLowerCase().includes(query));
  }, [bookings, search]);
  const revenue = bookings.filter((booking) => ["confirmed", "completed"].includes(booking.status)).reduce((total, booking) => total + booking.totalGrosze, 0);

  const persistBookings = (next: DemoBooking[]) => {
    setBookings(next);
    saveDemoBookings(next);
  };
  const persistServices = (next: ManagedService[]) => {
    setServices(next);
    saveManagedServices(next);
  };
  const persistSpecialists = (next: ManagedSpecialist[]) => {
    setSpecialists(next);
    saveManagedSpecialists(next);
  };

  const updateBookingStatus = (id: string, status: DemoBooking["status"]) => persistBookings(bookings.map((booking) => booking.id === id ? { ...booking, status } : booking));
  const deleteBooking = (id: string) => persistBookings(bookings.filter((booking) => booking.id !== id));

  const openNewService = () => {
    setEditingServiceId(null);
    setServiceDraft({ name: "", nameEn: "", durationMinutes: 50, price: 250, onlineAvailable: true, inOfficeAvailable: true });
    setModal("service");
  };
  const openEditService = (service: ManagedService) => {
    setEditingServiceId(service.id);
    setServiceDraft({ name: service.name, nameEn: service.nameEn ?? "", durationMinutes: service.durationMinutes, price: service.priceGrosze / 100, onlineAvailable: service.onlineAvailable, inOfficeAvailable: service.inOfficeAvailable });
    setModal("service");
  };
  const saveService = (event: FormEvent) => {
    event.preventDefault();
    if (editingServiceId) {
      persistServices(services.map((service) => service.id === editingServiceId ? { ...service, name: serviceDraft.name, nameEn: serviceDraft.nameEn, durationMinutes: serviceDraft.durationMinutes, priceGrosze: Math.round(serviceDraft.price * 100), onlineAvailable: serviceDraft.onlineAvailable, inOfficeAvailable: serviceDraft.inOfficeAvailable } : service));
    } else {
      persistServices([...services, { id: `service-${Date.now()}`, name: serviceDraft.name, nameEn: serviceDraft.nameEn, description: "Custom clinic service", descriptionEn: "Custom clinic service", durationMinutes: serviceDraft.durationMinutes, priceGrosze: Math.round(serviceDraft.price * 100), currency: "PLN", onlineAvailable: serviceDraft.onlineAvailable, inOfficeAvailable: serviceDraft.inOfficeAvailable, active: true }]);
    }
    setModal(null);
  };

  const openNewSpecialist = () => {
    setEditingSpecialistId(null);
    setSpecialistDraft({ firstName: "", lastName: "", title: "mgr", specialty: "" });
    setModal("specialist");
  };
  const openEditSpecialist = (specialist: ManagedSpecialist) => {
    setEditingSpecialistId(specialist.id);
    setSpecialistDraft({ firstName: specialist.firstName, lastName: specialist.lastName, title: specialist.title ?? "", specialty: specialist.specialty ?? "" });
    setModal("specialist");
  };
  const saveSpecialist = (event: FormEvent) => {
    event.preventDefault();
    if (editingSpecialistId) {
      persistSpecialists(specialists.map((specialist) => specialist.id === editingSpecialistId ? { ...specialist, ...specialistDraft } : specialist));
    } else {
      persistSpecialists([...specialists, { id: `specialist-${Date.now()}`, ...specialistDraft, avatarUrl: null, active: true }]);
    }
    setModal(null);
  };

  const createBooking = (event: FormEvent) => {
    event.preventDefault();
    const service = services.find((item) => item.id === bookingDraft.serviceId) ?? services[0];
    const specialist = specialists.find((item) => item.id === bookingDraft.specialistId) ?? specialists[0];
    if (!service || !specialist || !bookingDraft.startTime) return;
    const start = new Date(bookingDraft.startTime);
    const next: DemoBooking = {
      id: `HF-${Math.floor(1100 + Math.random() * 8800)}`,
      patientFirstName: bookingDraft.firstName,
      patientLastName: bookingDraft.lastName,
      patientEmail: bookingDraft.email,
      patientPhone: bookingDraft.phone,
      serviceId: service.id,
      serviceName: service.name,
      specialistId: specialist.id,
      specialistName: `${specialist.title ?? ""} ${specialist.firstName} ${specialist.lastName}`.trim(),
      startTime: start.toISOString(),
      endTime: new Date(start.getTime() + service.durationMinutes * 60_000).toISOString(),
      mode: bookingDraft.mode,
      status: "confirmed",
      totalGrosze: service.priceGrosze,
      currency: service.currency,
      createdAt: new Date().toISOString(),
      notes: "Created by clinic staff",
      bookingFor: "myself",
    };
    persistBookings([next, ...bookings]);
    setBookingDraft({ firstName: "", lastName: "", email: "", phone: "", serviceId: services[0]?.id ?? "", specialistId: specialists[0]?.id ?? "", startTime: "", mode: "in_office" });
    setModal(null);
  };

  const resetData = () => {
    resetDemoWorkspace();
    setBookings(getDemoBookings());
    setServices(getManagedServices());
    setSpecialists(getManagedSpecialists());
  };
  const logout = () => {
    window.localStorage.removeItem(STORAGE_KEYS.session);
    router.push("/login");
  };

  if (!ready || !session) {
    return <div className="grid min-h-screen place-items-center bg-[#090b1a]"><div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-400 border-t-transparent" /></div>;
  }

  const nav = [
    { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
    { id: "bookings" as const, label: "Bookings", icon: CalendarCheck2, count: bookings.length },
    { id: "services" as const, label: "Services", icon: Stethoscope, count: services.length },
    { id: "specialists" as const, label: "Specialists", icon: UsersRound, count: specialists.length },
  ];

  const titles: Record<View, [string, string]> = {
    overview: ["Good morning, " + session.name.split(" ")[0], "Here’s what is happening at Harmonia today."],
    bookings: ["Bookings", "Manage patient appointments and statuses."],
    services: ["Services", "Manage the clinic’s bookable offer and pricing."],
    specialists: ["Specialists", "Manage your clinical team and availability."],
  };

  return (
    <div className={cn("min-h-screen", dark ? "bg-[#090b1a] text-white" : "bg-slate-50 text-slate-950")}>
      {sidebarOpen && <button onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-40 bg-black/50 lg:hidden" aria-label="Close menu" />}
      <aside className={cn("fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r transition-transform lg:translate-x-0", sidebarOpen ? "translate-x-0" : "-translate-x-full", dark ? "border-white/8 bg-[#0d1023]" : "border-slate-200 bg-white")}>
        <div className="flex h-20 items-center justify-between px-5"><a href="/" className="flex items-center gap-2.5"><span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-600 to-teal-500 text-white"><HeartHandshake size={21} /></span><span className="text-lg font-extrabold">Thera<span className="text-brand-500">Flow</span></span></a><button onClick={() => setSidebarOpen(false)} className="lg:hidden"><X size={19} /></button></div>
        <div className="px-3 py-3"><p className={cn("px-3 pb-2 text-[10px] font-extrabold uppercase tracking-[.16em]", dark ? "text-slate-600" : "text-slate-400")}>Workspace</p><nav className="space-y-1">{nav.map((item) => <button key={item.id} onClick={() => { setView(item.id); setSidebarOpen(false); setSearch(""); }} className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold", view === item.id ? dark ? "bg-brand-500/15 text-brand-300" : "bg-brand-50 text-brand-700" : dark ? "text-slate-400 hover:bg-white/5 hover:text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900")}><item.icon size={18} /><span className="flex-1 text-left">{item.label}</span>{item.count !== undefined && <span className={cn("rounded-full px-2 py-0.5 text-[10px]", dark ? "bg-white/7" : "bg-slate-100")}>{item.count}</span>}</button>)}</nav></div>
        <div className="mt-auto p-3"><div className={cn("rounded-2xl border p-3", dark ? "border-white/8 bg-white/[.03]" : "border-slate-200 bg-slate-50")}><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-500 text-[10px] font-extrabold text-white">{session.initials}</span><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold">{session.name}</p><p className={cn("truncate text-[10px]", dark ? "text-slate-500" : "text-slate-400")}>{session.role}</p></div><button onClick={logout} className={cn("rounded-lg p-2", dark ? "text-slate-500 hover:bg-white/5 hover:text-white" : "text-slate-400 hover:bg-white hover:text-red-500")} title="Log out"><LogOut size={16} /></button></div></div></div>
      </aside>

      <div className="lg:pl-64">
        <header className={cn("sticky top-0 z-30 flex h-20 items-center justify-between border-b px-4 backdrop-blur-xl sm:px-7", dark ? "border-white/8 bg-[#090b1a]/80" : "border-slate-200 bg-white/80")}>
          <div className="flex items-center gap-3"><button onClick={() => setSidebarOpen(true)} className={cn("grid h-10 w-10 place-items-center rounded-xl lg:hidden", dark ? "bg-white/7" : "bg-slate-100")}><Menu size={19} /></button><div><h1 className="text-lg font-extrabold sm:text-xl">{titles[view][0]}</h1><p className={cn("hidden text-xs sm:block", dark ? "text-slate-500" : "text-slate-400")}>{titles[view][1]}</p></div></div>
          <div className="flex items-center gap-2"><span className={cn("hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold sm:flex", dark ? "bg-teal-500/10 text-teal-400" : "bg-teal-50 text-teal-700")}><span className="h-1.5 w-1.5 rounded-full bg-teal-500" /> Local demo data</span><button onClick={resetData} className={cn("grid h-10 w-10 place-items-center rounded-xl", dark ? "bg-white/7 text-slate-300 hover:bg-white/10" : "bg-white text-slate-500 shadow-sm hover:bg-slate-100")} title="Reset demo data"><RefreshCcw size={17} /></button><button onClick={() => setDark(!dark)} className={cn("grid h-10 w-10 place-items-center rounded-xl", dark ? "bg-white/7 text-amber-300" : "bg-white text-slate-500 shadow-sm")} aria-label="Toggle theme">{dark ? <Sun size={18} /> : <Moon size={18} />}</button></div>
        </header>

        <main className="p-4 sm:p-7">
          {view === "overview" && (
            <div className="mx-auto max-w-7xl animate-fade-in">
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: "Upcoming visits", value: upcomingBookings.length.toString(), detail: `${bookings.filter((b) => b.status === "pending").length} need attention`, icon: CalendarCheck2, color: "bg-brand-500/10 text-brand-500" },
                  { label: "Active specialists", value: specialists.filter((s) => s.active).length.toString(), detail: `${specialists.length} team members`, icon: UsersRound, color: "bg-teal-500/10 text-teal-500" },
                  { label: "Booking revenue", value: formatPrice(revenue), detail: "Confirmed + completed", icon: CircleDollarSign, color: "bg-emerald-500/10 text-emerald-500" },
                  { label: "Completion rate", value: "92%", detail: "+4.2% this month", icon: Activity, color: "bg-violet-500/10 text-violet-500" },
                ].map((metric) => <div key={metric.label} className={cn("rounded-2xl border p-5", dark ? "border-white/8 bg-white/[.025]" : "border-slate-200 bg-white")}><div className="flex items-start justify-between"><div><p className={cn("text-xs font-medium", dark ? "text-slate-500" : "text-slate-500")}>{metric.label}</p><p className="mt-2 text-2xl font-extrabold">{metric.value}</p></div><span className={cn("grid h-10 w-10 place-items-center rounded-xl", metric.color)}><metric.icon size={19} /></span></div><p className={cn("mt-3 text-[11px]", dark ? "text-slate-500" : "text-slate-400")}>{metric.detail}</p></div>)}
              </div>

              <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
                <section className={cn("rounded-2xl border p-5", dark ? "border-white/8 bg-white/[.025]" : "border-slate-200 bg-white")}><div className="flex items-center justify-between"><div><h2 className="font-bold">Booking activity</h2><p className={cn("mt-1 text-xs", dark ? "text-slate-500" : "text-slate-400")}>Appointments during the last 7 days</p></div><button className={cn("flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[10px] font-bold", dark ? "border-white/10" : "border-slate-200")}><Download size={13} /> Export</button></div><div className="mt-8 flex h-48 items-end justify-between gap-3 border-b border-dashed border-slate-500/20 px-2">{[44, 68, 52, 86, 64, 92, 74].map((height, index) => <div key={index} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><div className="relative w-full max-w-12 rounded-t-lg bg-gradient-to-t from-brand-600 to-teal-400" style={{ height: `${height}%` }}><span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold">{Math.round(height / 5)}</span></div><span className={cn("text-[9px]", dark ? "text-slate-600" : "text-slate-400")}>{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}</span></div>)}</div></section>
                <section className={cn("rounded-2xl border p-5", dark ? "border-white/8 bg-white/[.025]" : "border-slate-200 bg-white")}><div className="flex items-center justify-between"><div><h2 className="font-bold">Next appointments</h2><p className={cn("mt-1 text-xs", dark ? "text-slate-500" : "text-slate-400")}>Live clinic queue</p></div><button onClick={() => setView("bookings")} className="text-[11px] font-bold text-brand-500">View all</button></div><div className="mt-5 space-y-4">{upcomingBookings.slice(0, 4).map((booking, index) => <div key={booking.id} className="flex items-center gap-3"><span className={cn("grid h-9 w-9 place-items-center rounded-xl text-[10px] font-extrabold text-white", ["bg-brand-500", "bg-teal-500", "bg-pink-500", "bg-amber-500"][index % 4])}>{booking.patientFirstName[0]}{booking.patientLastName[0]}</span><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold">{booking.patientFirstName} {booking.patientLastName}</p><p className={cn("truncate text-[10px]", dark ? "text-slate-500" : "text-slate-400")}>{formatTime(booking.startTime)} · {booking.serviceName}</p></div><span className={cn("h-2 w-2 rounded-full", booking.status === "pending" ? "bg-amber-500" : "bg-emerald-500")} /></div>)}</div></section>
              </div>
            </div>
          )}

          {view === "bookings" && (
            <div className="mx-auto max-w-7xl animate-fade-in">
              <Toolbar dark={dark} search={search} setSearch={setSearch} placeholder="Search patient, service or specialist..." action="New booking" onAction={() => setModal("booking")} />
              <div className={cn("mt-5 overflow-hidden rounded-2xl border", dark ? "border-white/8 bg-white/[.025]" : "border-slate-200 bg-white")}>
                <div className={cn("hidden grid-cols-[1.2fr_1fr_1fr_.7fr_.8fr_80px] gap-4 border-b px-5 py-3 text-[10px] font-extrabold uppercase tracking-wider lg:grid", dark ? "border-white/8 text-slate-600" : "border-slate-100 text-slate-400")}><span>Patient</span><span>Visit</span><span>Specialist</span><span>Date</span><span>Status</span><span>Actions</span></div>
                {filteredBookings.length === 0 ? <Empty dark={dark} label="No matching bookings" /> : filteredBookings.map((booking) => <div key={booking.id} className={cn("grid gap-3 border-b p-4 last:border-0 lg:grid-cols-[1.2fr_1fr_1fr_.7fr_.8fr_80px] lg:items-center lg:gap-4 lg:px-5", dark ? "border-white/8 hover:bg-white/[.025]" : "border-slate-100 hover:bg-slate-50")}><div className="flex items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-500 text-[10px] font-extrabold text-white">{booking.patientFirstName[0]}{booking.patientLastName[0]}</span><div className="min-w-0"><p className="truncate text-xs font-bold">{booking.patientFirstName} {booking.patientLastName}</p><p className={cn("truncate text-[10px]", dark ? "text-slate-500" : "text-slate-400")}>{booking.patientEmail}</p></div></div><div><p className="truncate text-xs font-semibold">{booking.serviceName}</p><p className={cn("mt-0.5 flex items-center gap-1 text-[10px]", dark ? "text-slate-500" : "text-slate-400")}>{booking.mode === "online" ? <Video size={11} /> : <Stethoscope size={11} />}{booking.mode === "online" ? "Online" : "In office"}</p></div><p className="truncate text-xs">{booking.specialistName}</p><div><p className="text-xs font-semibold">{new Date(booking.startTime).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}</p><p className={cn("text-[10px]", dark ? "text-slate-500" : "text-slate-400")}>{formatTime(booking.startTime)}</p></div><select value={booking.status} onChange={(event) => updateBookingStatus(booking.id, event.target.value as DemoBooking["status"])} className={cn("w-full rounded-full border px-2 py-1.5 text-[10px] font-bold outline-none", statusStyle[booking.status], dark && "bg-transparent")}><option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option><option value="payment_failed">Payment failed</option></select><div className="flex justify-end gap-1"><button onClick={() => updateBookingStatus(booking.id, "confirmed")} className={cn("grid h-8 w-8 place-items-center rounded-lg", dark ? "text-slate-400 hover:bg-white/8 hover:text-emerald-400" : "text-slate-400 hover:bg-emerald-50 hover:text-emerald-600")} title="Confirm"><CheckCircle2 size={15} /></button><button onClick={() => deleteBooking(booking.id)} className={cn("grid h-8 w-8 place-items-center rounded-lg", dark ? "text-slate-400 hover:bg-red-500/10 hover:text-red-400" : "text-slate-400 hover:bg-red-50 hover:text-red-500")} title="Delete"><Trash2 size={15} /></button></div></div>)}
              </div>
            </div>
          )}

          {view === "services" && (
            <div className="mx-auto max-w-7xl animate-fade-in"><Toolbar dark={dark} search={search} setSearch={setSearch} placeholder="Search services..." action="Add service" onAction={openNewService} /><div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{services.filter((service) => service.name.toLowerCase().includes(search.toLowerCase())).map((service) => <article key={service.id} className={cn("rounded-2xl border p-5", dark ? "border-white/8 bg-white/[.025]" : "border-slate-200 bg-white")}><div className="flex items-start justify-between"><span className={cn("grid h-11 w-11 place-items-center rounded-xl", service.active ? "bg-brand-500/10 text-brand-500" : "bg-slate-500/10 text-slate-400")}><Stethoscope size={20} /></span><div className="flex gap-1"><button onClick={() => openEditService(service)} className={cn("grid h-8 w-8 place-items-center rounded-lg", dark ? "text-slate-500 hover:bg-white/8 hover:text-white" : "text-slate-400 hover:bg-slate-100 hover:text-slate-700")}><Pencil size={14} /></button><button onClick={() => persistServices(services.filter((item) => item.id !== service.id))} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-500"><Trash2 size={14} /></button></div></div><h3 className="mt-5 font-bold">{service.name}</h3><p className={cn("mt-1 text-xs", dark ? "text-slate-500" : "text-slate-400")}>{service.nameEn}</p><div className={cn("mt-5 flex items-center justify-between border-t pt-4", dark ? "border-white/8" : "border-slate-100")}><div><p className="text-lg font-extrabold">{formatPrice(service.priceGrosze)}</p><p className={cn("text-[10px]", dark ? "text-slate-500" : "text-slate-400")}>{service.durationMinutes} minutes · {service.onlineAvailable ? "Online + office" : "Office"}</p></div><button onClick={() => persistServices(services.map((item) => item.id === service.id ? { ...item, active: !item.active } : item))} className={cn("relative h-6 w-11 rounded-full", service.active ? "bg-teal-500" : dark ? "bg-slate-700" : "bg-slate-200")}><span className={cn("absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform", service.active ? "left-6" : "left-1")} /></button></div></article>)}</div></div>
          )}

          {view === "specialists" && (
            <div className="mx-auto max-w-7xl animate-fade-in"><Toolbar dark={dark} search={search} setSearch={setSearch} placeholder="Search specialists..." action="Add specialist" onAction={openNewSpecialist} /><div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{specialists.filter((specialist) => `${specialist.firstName} ${specialist.lastName} ${specialist.specialty}`.toLowerCase().includes(search.toLowerCase())).map((specialist, index) => <article key={specialist.id} className={cn("rounded-2xl border p-5", dark ? "border-white/8 bg-white/[.025]" : "border-slate-200 bg-white")}><div className="flex items-start justify-between"><span className={cn("grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-xs font-extrabold text-white", ["from-brand-500 to-violet-500", "from-teal-500 to-cyan-500", "from-pink-500 to-rose-500", "from-amber-500 to-orange-500"][index % 4])}>{specialist.firstName[0]}{specialist.lastName[0]}</span><div className="flex gap-1"><button onClick={() => openEditSpecialist(specialist)} className={cn("grid h-8 w-8 place-items-center rounded-lg", dark ? "text-slate-500 hover:bg-white/8 hover:text-white" : "text-slate-400 hover:bg-slate-100")}><Pencil size={14} /></button><button onClick={() => persistSpecialists(specialists.filter((item) => item.id !== specialist.id))} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-500"><Trash2 size={14} /></button></div></div><h3 className="mt-5 font-bold">{specialist.title} {specialist.firstName} {specialist.lastName}</h3><p className={cn("mt-1 text-xs", dark ? "text-slate-500" : "text-slate-400")}>{specialist.specialty}</p><div className={cn("mt-5 flex items-center justify-between border-t pt-4", dark ? "border-white/8" : "border-slate-100")}><span className={cn("flex items-center gap-1.5 text-[10px] font-bold", specialist.active ? "text-emerald-500" : "text-slate-400")}><span className={cn("h-1.5 w-1.5 rounded-full", specialist.active ? "bg-emerald-500" : "bg-slate-400")} />{specialist.active ? "Accepting bookings" : "Inactive"}</span><button onClick={() => persistSpecialists(specialists.map((item) => item.id === specialist.id ? { ...item, active: !item.active } : item))} className={cn("relative h-6 w-11 rounded-full", specialist.active ? "bg-teal-500" : dark ? "bg-slate-700" : "bg-slate-200")}><span className={cn("absolute top-1 h-4 w-4 rounded-full bg-white shadow", specialist.active ? "left-6" : "left-1")} /></button></div></article>)}</div></div>
          )}
        </main>
      </div>

      {modal && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.currentTarget === event.target) setModal(null); }}>
          <div className={cn("w-full max-w-lg rounded-3xl border p-6 shadow-2xl animate-scale-in", dark ? "border-white/10 bg-[#12162d]" : "border-slate-200 bg-white")}>
            <div className="mb-6 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-brand-500">Clinic workspace</p><h2 className="mt-1 text-xl font-extrabold">{modal === "booking" ? "Create booking" : modal === "service" ? editingServiceId ? "Edit service" : "Add service" : editingSpecialistId ? "Edit specialist" : "Add specialist"}</h2></div><button onClick={() => setModal(null)} className={cn("grid h-9 w-9 place-items-center rounded-xl", dark ? "bg-white/7" : "bg-slate-100")}><X size={17} /></button></div>

            {modal === "booking" && <form onSubmit={createBooking} className="space-y-4"><div className="grid grid-cols-2 gap-3"><Field dark={dark} label="First name"><input required value={bookingDraft.firstName} onChange={(e) => setBookingDraft({ ...bookingDraft, firstName: e.target.value })} /></Field><Field dark={dark} label="Last name"><input required value={bookingDraft.lastName} onChange={(e) => setBookingDraft({ ...bookingDraft, lastName: e.target.value })} /></Field></div><div className="grid grid-cols-2 gap-3"><Field dark={dark} label="Email"><input required type="email" value={bookingDraft.email} onChange={(e) => setBookingDraft({ ...bookingDraft, email: e.target.value })} /></Field><Field dark={dark} label="Phone"><input required value={bookingDraft.phone} onChange={(e) => setBookingDraft({ ...bookingDraft, phone: e.target.value })} /></Field></div><Field dark={dark} label="Service"><select value={bookingDraft.serviceId} onChange={(e) => setBookingDraft({ ...bookingDraft, serviceId: e.target.value })}>{services.filter((s) => s.active).map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></Field><Field dark={dark} label="Specialist"><select value={bookingDraft.specialistId} onChange={(e) => setBookingDraft({ ...bookingDraft, specialistId: e.target.value })}>{specialists.filter((s) => s.active).map((s) => <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>)}</select></Field><div className="grid grid-cols-2 gap-3"><Field dark={dark} label="Date and time"><input required type="datetime-local" value={bookingDraft.startTime} onChange={(e) => setBookingDraft({ ...bookingDraft, startTime: e.target.value })} /></Field><Field dark={dark} label="Visit mode"><select value={bookingDraft.mode} onChange={(e) => setBookingDraft({ ...bookingDraft, mode: e.target.value as "online" | "in_office" })}><option value="in_office">In office</option><option value="online">Online</option></select></Field></div><ModalActions dark={dark} onCancel={() => setModal(null)} label="Create booking" /></form>}

            {modal === "service" && <form onSubmit={saveService} className="space-y-4"><Field dark={dark} label="Service name"><input required value={serviceDraft.name} onChange={(e) => setServiceDraft({ ...serviceDraft, name: e.target.value })} /></Field><Field dark={dark} label="English name"><input value={serviceDraft.nameEn} onChange={(e) => setServiceDraft({ ...serviceDraft, nameEn: e.target.value })} /></Field><div className="grid grid-cols-2 gap-3"><Field dark={dark} label="Duration (minutes)"><input required min="10" type="number" value={serviceDraft.durationMinutes} onChange={(e) => setServiceDraft({ ...serviceDraft, durationMinutes: +e.target.value })} /></Field><Field dark={dark} label="Price (PLN)"><input required min="0" type="number" value={serviceDraft.price} onChange={(e) => setServiceDraft({ ...serviceDraft, price: +e.target.value })} /></Field></div><div className="flex gap-3"><CheckField label="Online" checked={serviceDraft.onlineAvailable} setChecked={(value) => setServiceDraft({ ...serviceDraft, onlineAvailable: value })} dark={dark} /><CheckField label="In office" checked={serviceDraft.inOfficeAvailable} setChecked={(value) => setServiceDraft({ ...serviceDraft, inOfficeAvailable: value })} dark={dark} /></div><ModalActions dark={dark} onCancel={() => setModal(null)} label={editingServiceId ? "Save changes" : "Add service"} /></form>}

            {modal === "specialist" && <form onSubmit={saveSpecialist} className="space-y-4"><div className="grid grid-cols-[.35fr_1fr] gap-3"><Field dark={dark} label="Title"><input value={specialistDraft.title} onChange={(e) => setSpecialistDraft({ ...specialistDraft, title: e.target.value })} /></Field><Field dark={dark} label="First name"><input required value={specialistDraft.firstName} onChange={(e) => setSpecialistDraft({ ...specialistDraft, firstName: e.target.value })} /></Field></div><Field dark={dark} label="Last name"><input required value={specialistDraft.lastName} onChange={(e) => setSpecialistDraft({ ...specialistDraft, lastName: e.target.value })} /></Field><Field dark={dark} label="Specialty"><input required value={specialistDraft.specialty} onChange={(e) => setSpecialistDraft({ ...specialistDraft, specialty: e.target.value })} /></Field><ModalActions dark={dark} onCancel={() => setModal(null)} label={editingSpecialistId ? "Save changes" : "Add specialist"} /></form>}
          </div>
        </div>
      )}
    </div>
  );
}

function Toolbar({ dark, search, setSearch, placeholder, action, onAction }: { dark: boolean; search: string; setSearch: (value: string) => void; placeholder: string; action: string; onAction: () => void }) {
  return <div className="flex flex-col justify-between gap-3 sm:flex-row"><div className="relative w-full sm:max-w-sm"><Search size={16} className={cn("absolute left-3.5 top-1/2 -translate-y-1/2", dark ? "text-slate-500" : "text-slate-400")} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={placeholder} className={cn("w-full rounded-xl border py-2.5 pl-10 pr-4 text-xs outline-none focus:border-brand-500", dark ? "border-white/10 bg-white/[.035] placeholder:text-slate-600" : "border-slate-200 bg-white placeholder:text-slate-400")} /></div><button onClick={onAction} className="flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-brand-500/15 hover:bg-brand-700"><Plus size={16} />{action}</button></div>;
}

function Field({ dark, label, children }: { dark: boolean; label: string; children: React.ReactElement<{ className?: string }> }) {
  return <label className="block"><span className={cn("mb-1.5 block text-[11px] font-bold", dark ? "text-slate-300" : "text-slate-600")}>{label}</span>{<div className={cn("[&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:px-3.5 [&_input]:py-2.5 [&_input]:text-xs [&_input]:outline-none [&_select]:w-full [&_select]:rounded-xl [&_select]:border [&_select]:px-3.5 [&_select]:py-2.5 [&_select]:text-xs [&_select]:outline-none", dark ? "[&_input]:border-white/10 [&_input]:bg-white/[.04] [&_select]:border-white/10 [&_select]:bg-[#171b35]" : "[&_input]:border-slate-200 [&_select]:border-slate-200")}>{children}</div>}</label>;
}

function CheckField({ label, checked, setChecked, dark }: { label: string; checked: boolean; setChecked: (value: boolean) => void; dark: boolean }) {
  return <label className={cn("flex flex-1 cursor-pointer items-center gap-2 rounded-xl border p-3 text-xs font-semibold", dark ? "border-white/10" : "border-slate-200")}><input type="checkbox" checked={checked} onChange={(event) => setChecked(event.target.checked)} className="accent-brand-600" />{label}</label>;
}

function ModalActions({ dark, onCancel, label }: { dark: boolean; onCancel: () => void; label: string }) {
  return <div className="flex gap-3 pt-2"><button type="button" onClick={onCancel} className={cn("flex-1 rounded-xl py-3 text-xs font-bold", dark ? "bg-white/7 text-slate-300" : "bg-slate-100 text-slate-600")}>Cancel</button><button type="submit" className="flex-[1.5] rounded-xl bg-brand-600 py-3 text-xs font-bold text-white hover:bg-brand-700">{label}</button></div>;
}

function Empty({ dark, label }: { dark: boolean; label: string }) {
  return <div className="py-16 text-center"><CalendarCheck2 className={cn("mx-auto", dark ? "text-slate-700" : "text-slate-300")} /><p className={cn("mt-3 text-xs font-semibold", dark ? "text-slate-500" : "text-slate-400")}>{label}</p></div>;
}
