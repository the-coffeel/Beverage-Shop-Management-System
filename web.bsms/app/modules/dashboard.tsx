import type { Route } from "./+types/home";
import { DashboardShell } from "@/components/layouts/dashboard-shell";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Analytics - Dashboard" },
    { name: "description", content: "Your personal dashboard with key metrics and updates." },
  ];
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="p-4">Dashboard content</div>
    </DashboardShell>
  );
}