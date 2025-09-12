// app/loading.tsx
export default function GlobalLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Simple spinning circle */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-transparent" />

        {/* Message */}
        <p className="text-muted-foreground text-lg">Loading…</p>
      </div>
    </div>
  );
}
