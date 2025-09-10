"use client";

import { Button } from "../components/ui/button";
import { toast } from "sonner";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Home</h1>
      <Button onClick={() => toast("Hello from Sonner!")}>
        Click me
      </Button>
    </main>
  );
}
