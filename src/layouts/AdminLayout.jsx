import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import AppSidebar from "@/components/admin/AppSidebar";
import DevelopmentBanner from "@/components/DevelopmentBanner";

export default function AdminLayout() {
  return (
    <>
      <DevelopmentBanner />
      <SidebarProvider
        style={{
          "--sidebar-background": "240 5.9% 10%",
          "--sidebar-foreground": "240 4.8% 95.9%",
          "--sidebar-primary": "224.3 76.3% 48%",
          "--sidebar-primary-foreground": "0 0% 100%",
          "--sidebar-accent": "240 3.7% 15.9%",
          "--sidebar-accent-foreground": "240 4.8% 95.9%",
          "--sidebar-border": "240 3.7% 15.9%",
          "--sidebar-ring": "217.2 91.2% 59.8%",
        }}
      >
        <AppSidebar />
        <main className="flex-1 overflow-y-auto bg-slate-100">
          <SidebarTrigger />
          <div className="py-4 px-4">
            <Outlet />
          </div>
        </main>
        <Toaster />
      </SidebarProvider>
    </>
  );
}
