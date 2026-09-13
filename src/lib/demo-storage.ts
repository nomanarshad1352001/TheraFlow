import {
  DEMO_BOOKINGS,
  DEMO_MANAGED_SERVICES,
  DEMO_MANAGED_SPECIALISTS,
  STORAGE_KEYS,
  type DemoBooking,
  type ManagedService,
  type ManagedSpecialist,
} from "./demo-data";

function readValue<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeValue<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getDemoBookings() {
  return readValue<DemoBooking[]>(STORAGE_KEYS.bookings, DEMO_BOOKINGS);
}

export function saveDemoBookings(bookings: DemoBooking[]) {
  writeValue(STORAGE_KEYS.bookings, bookings);
}

export function getManagedServices() {
  return readValue<ManagedService[]>(STORAGE_KEYS.services, DEMO_MANAGED_SERVICES);
}

export function saveManagedServices(services: ManagedService[]) {
  writeValue(STORAGE_KEYS.services, services);
}

export function getManagedSpecialists() {
  return readValue<ManagedSpecialist[]>(STORAGE_KEYS.specialists, DEMO_MANAGED_SPECIALISTS);
}

export function saveManagedSpecialists(specialists: ManagedSpecialist[]) {
  writeValue(STORAGE_KEYS.specialists, specialists);
}

export function getReservedSlotIds() {
  return readValue<string[]>(STORAGE_KEYS.reservedSlots, []);
}

export function reserveSlot(slotId: string) {
  const ids = getReservedSlotIds();
  if (!ids.includes(slotId)) writeValue(STORAGE_KEYS.reservedSlots, [...ids, slotId]);
}

export function releaseSlot(slotId: string) {
  writeValue(
    STORAGE_KEYS.reservedSlots,
    getReservedSlotIds().filter((id) => id !== slotId),
  );
}

export function resetDemoWorkspace() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEYS.bookings);
  window.localStorage.removeItem(STORAGE_KEYS.services);
  window.localStorage.removeItem(STORAGE_KEYS.specialists);
  window.localStorage.removeItem(STORAGE_KEYS.reservedSlots);
}
