// app/api/projects/route.ts
import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { CreateProjectInput } from "@/lib/api/projects.schema";

// REQUIRED for Prisma (Node runtime, not Edge)
export const runtime = "nodejs";
// Helpful while developing so you always read fresh data
export const dynamic = "force-dynamic";

// GET /api/projects  -> list all
export async function GET() {
  try {
    console.log("[GET] /api/projects");
    const items = await prisma.project.findMany({ orderBy: { updatedAt: "desc" } });
    return Response.json({ items, total: items.length });
  } catch (e: any) {
    console.error("GET /api/projects failed:", e);
    return Response.json({ message: e?.message ?? "Server error" }, { status: 500 });
  }
}

// POST /api/projects -> create one
export async function POST(req: NextRequest) {
  try {
    console.log("[POST] /api/projects");
    const body = await req.json();
    const { name } = CreateProjectInput.parse(body);
    const project = await prisma.project.create({ data: { name } });
    return Response.json(project, { status: 201 });
  } catch (e: any) {
    console.error("POST /api/projects failed:", e);
    return Response.json({ message: e?.message ?? "Server error" }, { status: 500 });
  }
}
