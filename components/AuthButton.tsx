"use client";

export default function AuthButton({ isSignedIn }: { isSignedIn: boolean }) {
  if (isSignedIn) {
    return (
      <form action="/api/logout" method="POST">
        <button className="px-3 py-2 rounded-xl border hover:bg-muted" type="submit">
          Sign out
        </button>
      </form>
    );
  }
  return (
    <a href="/signin" className="px-3 py-2 rounded-xl border hover:bg-muted">
      Sign in
    </a>
  );
}
