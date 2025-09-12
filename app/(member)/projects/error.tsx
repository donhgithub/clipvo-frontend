// app/projects/error.tsx
"use client";

import { useEffect } from "react";

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log it somewhere (Sentry/console) so you can debug
    console.error("Projects error boundary:", error);
  }, [error]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Something went wrong on Projects</h1>
      <p className="text-muted-foreground">
        We hit a snag. You can try again.
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 rounded-xl border hover:bg-muted"
      >
        Try again
      </button>
    </div>
  );
}
