import { BookingForm } from "@/components/BookingForm";
import { DEMO_CLINIC } from "@/lib/demo-data";

export default function BookPage() {
  return <BookingForm clinic={DEMO_CLINIC} />;
}
