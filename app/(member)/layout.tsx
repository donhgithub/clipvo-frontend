// app/(member)/layout.tsx
// SERVER component — do NOT add "use client"
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth";

import AppSidebar from "@/components/layout/AppSidebar";
import MobileSidebarToggle from "@/components/layout/MobileSidebarToggle";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default async function MemberLayout({ children }: { children: ReactNode }) {
  const { isSignedIn } = await getAuth();
  if (!isSignedIn) redirect("/signin");

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-screen flex flex-col">
        <div className="p-2 lg:hidden">
          <MobileSidebarToggle />
        </div>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
