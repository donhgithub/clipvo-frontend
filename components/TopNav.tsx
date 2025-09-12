"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopNav({ isSignedIn }: { isSignedIn: boolean }) {
  const pathname = usePathname();
  const onHome = pathname === "/";

  return (
    <nav className="flex gap-4 text-sm">
      <Link href="/" className="underline">Home</Link>

      {/* Show Dashboard link in top nav ONLY on the Home page and ONLY when signed in */}
      {isSignedIn && onHome && (
        <Link href="/projects" className="underline">Dashboard</Link>
      )}
    </nav>
  );
}
