"use client";

import { AlignJustify } from "lucide-react";
import { useSidebar } from "../ui/sidebar"; // <-- this hook comes with the shadcn sidebar

export default function MobileSidebarToggle() {
  const { toggleSidebar } = useSidebar(); // gives you the function SidebarTrigger uses internally

  return (
    <button
      type="button"
      aria-label="Toggle sidebar"
      onClick={toggleSidebar}
      className="inline-flex items-center justify-center rounded-md border px-2.5 py-2 text-sm font-medium bg-background shadow-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <AlignJustify className="h-4 w-4" />
    </button>
  );
}
