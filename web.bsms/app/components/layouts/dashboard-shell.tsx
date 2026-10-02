import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="[--header-height:calc(--spacing(14))] h-screen overflow-hidden">
      <SidebarProvider className="flex h-full min-h-0 flex-col">
        <SiteHeader />
        <div className="flex min-h-0 flex-1">
          <AppSidebar />
          <SidebarInset className="min-h-0">{children}</SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}