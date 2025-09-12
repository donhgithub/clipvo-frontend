// app/page.tsx  (Server Component)
const appName = process.env.NEXT_PUBLIC_SITE_NAME;

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Test Page</h1>
      <p className="mt-2">
        App name from env: <strong>{appName}</strong>
      </p>
      <p className="mt-1 text-sm text-gray-500">
        (This proves env works in a Server Component.)
      </p>
    </main>
  );
}
