"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  FolderKanban,
  CreditCard,
  Settings as SettingsIcon,
  Gauge,
  User,
  HelpCircle,
  LogOut,
} from "lucide-react";

// shadcn sidebar primitives
import { Sidebar, SidebarContent } from "../ui/sidebar";

function cx(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export default function AppSidebar() {
  const pathname = usePathname();

  // Keep only real member routes here (no Logout)
  const items = [
    { label: "Welcome!", href: "/welcome", icon: Home },
    { label: "Projects", href: "/projects", icon: FolderKanban },
    { label: "Subscriptions", href: "/subscriptions", icon: CreditCard },
    { label: "Settings", href: "/settings", icon: SettingsIcon },
    { label: "Quotas", href: "/quotas", icon: Gauge },
    { label: "My Profile", href: "/profile", icon: User }, // use /my-profile if that's your folder
    { label: "Help", href: "/help", icon: HelpCircle },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        {/* Your logo/title */}
        <div className="p-4 text-lg font-semibold">Clipvo</div>

        {/* Section label with top margin to clear the logo */}
        <h2 className="mt-6 px-4 pb-3 text-2xl font-bold tracking-tight text-foreground">
          Dashboard
        </h2>

        {/* Nav */}
        <nav className="px-2">
          <ul className="space-y-1">
            {items.map(({ label, href, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition",
                      active
                        ? "bg-gray-100 dark:bg-gray-900 font-medium"
                        : "hover:bg-gray-100 dark:hover:bg-gray-900"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}

          </ul>
        </nav>
      </SidebarContent>
    </Sidebar>
  );
}
