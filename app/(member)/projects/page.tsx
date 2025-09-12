"use client";

import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const router = useRouter();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <p className="mb-4">Select or create a project to continue.</p>
      <Button onClick={() => router.push("/projects/workspace")}>
        Select / Create Project
      </Button>
    </div>
  );
}