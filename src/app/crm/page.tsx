import { CrmDashboard } from "@/components/crm/CrmDashboard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Clinic CRM",
  description: "Manage appointments, patients, services and specialists in the TheraFlow CRM.",
};

export default function Page() {
  return <CrmDashboard />;
}
