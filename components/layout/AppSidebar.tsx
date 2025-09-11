"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, FolderKanban, CreditCard, Settings, Gauge, User, HelpCircle, LogIn
} from "lucide-react";

type Item = { label: string; href: string; icon: React.ComponentType<any> };

const ITEMS: Item[] = [
  { label: "Welcome!",      href: "/welcome",        icon: Home },
  { label: "Projects",      href: "/projects",       icon: FolderKanban },
  { label: "Subscriptions", href: "/subscriptions",  icon: CreditCard },
  { label: "Settings",      href: "/settings",       icon: Settings },
  { label: "Quotas",        href: "/quotas",         icon: Gauge },
  { label: "My Profile",    href: "/profile",        icon: User },
  { label: "Help",          href: "/help",           icon: HelpCircle },
  { label: "Logout",  href: "/auth",           icon: LogIn },
];

function cx(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AppSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex w-64 shrink-0 border-r border-gray-200 dark:border-gray-800 min-h-screen">
      <nav className="p-4 w-full">
        <div className="text-lg font-semibold mb-4">Clipvo</div>
        <ul className="space-y-1">
          {ITEMS.map(({ label, href, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cx(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition",
                    active ? "bg-gray-100 dark:bg-gray-900 font-medium"
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
    </aside>
  );
}