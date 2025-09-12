"use client";

const appName = process.env.NEXT_PUBLIC_SITE_NAME; // no fallback

export default function AddTextVoice() {
  const isSet = appName !== undefined && appName !== "";
  return (
    <div className="rounded-lg border p-4">
      Add Text / Voice — Env: <strong>{isSet ? appName : "🛑 NOT SET"}</strong>
    </div>
  );
}
