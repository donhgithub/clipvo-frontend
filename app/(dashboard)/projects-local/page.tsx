// /app/(dashboard)/projects/page.tsx
"use client";

import { useEffect, useState } from "react";

type ProjectStatus = "draft" | "processing" | "ready" | "error";

type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
};

export default function ProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/projects", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: { items: Project[] } = await res.json();
      setItems(Array.isArray(data.items) ? data.items : []);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function createProject() {
    if (!name.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      if (!res.ok) {
        const msg = (await res.json().catch(() => null))?.message;
        throw new Error(msg || `HTTP ${res.status}`);
      }
      setName("");
      await load();
    } catch (e: any) {
      setError(e?.message ?? "Failed to create project");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Projects (Local)</h1>

      <div className="flex gap-2">
        <input
          className="border rounded px-3 py-2"
          placeholder="New project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="border rounded px-3 py-2"
          onClick={createProject}
          disabled={submitting || !name.trim()}
          aria-busy={submitting}
        >
          {submitting ? "Creating…" : "Create"}
        </button>
        <button className="border rounded px-3 py-2" onClick={load} disabled={loading}>
          Refresh
        </button>
      </div>

      {loading && <div>Loading…</div>}
      {error && <div className="text-red-600">Error: {error}</div>}

      <ul className="divide-y border rounded">
        {items.map((p) => (
          <li key={p.id} className="p-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-gray-500">{p.status}</div>
            </div>
            <div className="text-xs text-gray-400">
              {new Date(p.updatedAt).toLocaleString()}
            </div>
          </li>
        ))}
        {!loading && !items.length && (
          <li className="p-3 text-sm text-gray-500">No projects yet.</li>
        )}
      </ul>
    </div>
  );
}
