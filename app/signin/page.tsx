import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm border rounded-2xl p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="text-muted-foreground">Demo: any email/password.</p>

        <form action="/api/login" method="POST" className="space-y-3">
          <input name="email" type="email" placeholder="you@example.com"
                 className="w-full border rounded-xl p-2" required />
          <input name="password" type="password" placeholder="password"
                 className="w-full border rounded-xl p-2" required />
          <button type="submit" className="w-full px-4 py-2 rounded-xl border hover:bg-muted">
            Sign in
          </button>
        </form>

        <div className="text-sm"><Link href="/" className="underline">Go home</Link></div>
      </div>
    </main>
  );
}
