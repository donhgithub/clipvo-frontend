// app/(member)/projects/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ProjectStatus = "draft" | "processing" | "ready" | "error";
type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
};

/**
 * CHANGE THIS to the route that opens your tabs (your old "Open Tabs" destination),
 * e.g. "/projects/workspace" or "/workspace".
 */
const AFTER_SELECT_ROUTE: string = "/projects/workspace";

export default function ProjectsPage() {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  const [items, setItems] = useState<Project[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      // Do NOT navigate here; just refresh the list so the new project appears.
      setName("");
      await load(); // auto-refresh so user sees it immediately
    } catch (e: any) {
      setError(e?.message ?? "Failed to create project");
    } finally {
      setSubmitting(false);
    }
  }

function selectAndOpenTabs(p: { id: string; name: string }): void {
  // 1) Mark this row busy so the button shows "Opening…" and disables
  setBusyId(p.id);

  try {
    // 2) Persist selection so the rest of the app can unlock tabs
    try {
      localStorage.setItem("clipvo:selectedProjectId", p.id);
      localStorage.setItem("clipvo:selectedProjectName", p.name);
      localStorage.setItem("clipvo:tabsUnlocked", "1");
      window.dispatchEvent(
        new CustomEvent("clipvo:project:selected", { detail: { id: p.id, name: p.name } })
      );
    } catch {
      // ignore storage errors (private mode, etc.)
    }

    // 3) Build destination URL
    const url =
      `${AFTER_SELECT_ROUTE}?projectId=${encodeURIComponent(p.id)}&v=${Date.now()}`;

    // 4) Navigate: if staying on /projects, force a refresh so tabs unlock immediately
    if (AFTER_SELECT_ROUTE === "/projects") {
      router.replace(url);
      router.refresh();
    } else {
      router.push(url);
    }
    // Note: navigation will unmount this component, so we don't clear busyId here.
  } catch (err) {
    // If navigation fails for any reason, re-enable the button
    console.error("Select & Open Tabs failed:", err);
    setBusyId(null);
  }
}

  return (
    <div className="p-4 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <p className="text-sm text-gray-500">
          Create a project, then select it to open the rest of the tabs.
        </p>
      </header>

      <section className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          className="border rounded px-3 py-2 w-full sm:w-80"
          placeholder="New project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") createProject();
          }}
          aria-label="New project name"
        />
        <div className="flex gap-2">
          <button
            className="border rounded px-3 py-2"
            onClick={createProject}
            disabled={submitting || !name.trim()}
            aria-busy={submitting}
          >
            {submitting ? "Creating…" : "Create Project"}
          </button>
          <button className="border rounded px-3 py-2" onClick={load} disabled={loading}>
            {loading ? "Loading…" : "Refresh"}
          </button>
        </div>
      </section>

      {error && <div className="text-red-600 text-sm">Error: {error}</div>}

      <section className="border rounded overflow-hidden">
        <div className="px-3 py-2 text-sm bg-gray-50 border-b">Existing projects</div>
        <ul className="divide-y">
          {items.map((p) => (
            <li key={p.id} className="p-3 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-medium truncate">{p.name}</div>
                <div className="text-xs text-gray-500">
                  {p.status} • {new Date(p.updatedAt).toLocaleString()}
                </div>
              </div>
              <div className="shrink-0">
                <button
                  className="border rounded px-3 py-2 cursor-pointer hover:bg-gray-100 hover:border-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => selectAndOpenTabs(p)}
                  disabled={busyId === p.id}
                  aria-busy={busyId === p.id}
                >
                  {busyId === p.id ? "Opening…" : "Select & Open Tabs"}
                </button>
              </div>
            </li>
          ))}
          {!loading && !items.length && (
            <li className="p-3 text-sm text-gray-500">No projects yet.</li>
          )}
          {loading && <li className="p-3 text-sm text-gray-500">Loading projects…</li>}
        </ul>
      </section>
    </div>
  );
}
