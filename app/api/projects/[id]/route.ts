// app/api/projects/[id]/route.ts
import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { UpdateProjectInput } from "@/lib/api/projects.schema";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const p = await prisma.project.findUnique({ where: { id: params.id } });
    if (!p) return Response.json({ message: "Not found" }, { status: 404 });
    return Response.json(p);
  } catch (e: any) {
    console.error("GET /api/projects/:id failed:", e);
    return Response.json({ message: e?.message ?? "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const json = await req.json();
    const update = UpdateProjectInput.parse(json);
    const p = await prisma.project.update({ where: { id: params.id }, data: update });
    return Response.json(p);
  } catch (e: any) {
    if ((e as any)?.code === "P2025") {
      return Response.json({ message: "Not found" }, { status: 404 });
    }
    console.error("PATCH /api/projects/:id failed:", e);
    return Response.json({ message: e?.message ?? "Server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.project.delete({ where: { id: params.id } });
    return new Response(null, { status: 204 });
  } catch (e: any) {
    if ((e as any)?.code === "P2025") {
      return Response.json({ message: "Not found" }, { status: 404 });
    }
    console.error("DELETE /api/projects/:id failed:", e);
    return Response.json({ message: e?.message ?? "Server error" }, { status: 500 });
  }
}
