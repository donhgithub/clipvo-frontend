// app/page.tsx (server component)
import Link from "next/link";
import { getAuth } from "@/lib/auth";

export default async function Home() {
  const { isSignedIn } = await getAuth();

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Home Page</h1>

      {/* (Optional) keep your env note or remove this block */}
      <p>
        App name from env: <strong>{process.env.NEXT_PUBLIC_APP_NAME ?? "Clipvo"}</strong>
      </p>
      <p className="text-muted-foreground">(This proves env works in a Server Component.)</p>

      <div className="pt-4">
        {isSignedIn ? (
          <Link
            href="/projects"
            className="inline-block px-4 py-2 rounded-xl border hover:bg-muted"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            href="/signin"
            className="inline-block px-4 py-2 rounded-xl border hover:bg-muted"
          >
            Sign in
          </Link>
        )}
      </div>
    </main>
  );
}
