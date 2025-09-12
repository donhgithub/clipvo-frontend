// app/projects/workspace/error.tsx
"use client";

import { useEffect } from "react";

export default function WorkspaceError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Workspace error boundary:", error);
  }, [error]);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Workspace ran into an error</h1>
      <p className="text-muted-foreground">
        No worries—tap the button to retry the last render.
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
