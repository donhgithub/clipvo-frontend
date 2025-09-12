// app/not-found.tsx
import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground">The page you’re looking for doesn’t exist.</p>
      <Link href="/" className="inline-block px-4 py-2 rounded-xl border hover:bg-muted">
        Go home
      </Link>
    </div>
  );
}
