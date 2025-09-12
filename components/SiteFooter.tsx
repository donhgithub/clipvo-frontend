import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t mt-12 lg:pl-64">  {/* ⬅️ add lg:pl-64 */}
      <div className="mx-auto max-w-screen-xl px-6 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Clipvo</p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <Link href="/about" className="hover:text-foreground">About</Link>
          <Link href="/contact" className="hover:text-foreground">Contact</Link>
          <Link href="/tos" className="hover:text-foreground">Terms</Link>
          {/* Optional */}
          <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
        </nav>
      </div>
    </footer>
  );
}
