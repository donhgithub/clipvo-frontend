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

const ITEMS = [
  { label: "Welcome!", href: "/welcome", icon: Home },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Subscriptions", href: "/subscriptions", icon: CreditCard },
  { label: "Settings", href: "/settings", icon: SettingsIcon },
  { label: "Quotas", href: "/quotas", icon: Gauge },
  { label: "My Profile", href: "/profile", icon: User },
  { label: "Help", href: "/help", icon: HelpCircle },
  { label: "Logout", href: "/auth", icon: LogOut },
];

function cx(...c: (string | false | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

// ✅ No props/children here
export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <div className="p-4 text-lg font-semibold">Clipvo</div>
        <nav className="px-2">
          <ul className="space-y-1">
            {ITEMS.map(({ label, href, icon: Icon }) => {
              const active =
                pathname === href || pathname.startsWith(href + "/");
              return (
                <li key={href}>
                  <Link
                    href={href}
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
