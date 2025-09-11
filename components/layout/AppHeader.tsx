"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const ITEMS = [
  { label: "Welcome!", href: "/welcome" },
  { label: "Projects", href: "/projects" },
  { label: "Subscriptions", href: "/subscriptions" },
  { label: "Settings", href: "/settings" },
  { label: "Quotas", href: "/quotas" },
  { label: "My Profile", href: "/profile" },
  { label: "Help", href: "/help" },
  { label: "Login/Logout", href: "/auth" },
];

export default function AppHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/30 backdrop-blur">
      <div className="h-14 px-4 flex items-center justify-between">
        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Open menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <nav className="p-4">
                <div className="text-lg font-semibold mb-4">Clipvo</div>
                <ul className="space-y-1">
                  {ITEMS.map(item => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block rounded-lg px-3 py-2 text-sm ${
                          pathname === item.href || pathname.startsWith(item.href + "/")
                            ? "bg-gray-100 dark:bg-gray-900 font-medium"
                            : "hover:bg-gray-100 dark:hover:bg-gray-900"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Title */}
        <div className="font-semibold">Clipvo</div>

        {/* Right actions (add later) */}
        <div className="flex items-center gap-2" />
      </div>
    </header>
  );
}