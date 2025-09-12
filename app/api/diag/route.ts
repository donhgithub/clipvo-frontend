// app/api/_diag/route.ts
export const runtime = "nodejs";

import fs from "node:fs";
import path from "node:path";

export async function GET() {
  const cwd = process.cwd();
  const dbUrl = process.env.DATABASE_URL || "";
  const relFromEnv = dbUrl.startsWith("file:") ? dbUrl.slice(5) : dbUrl; // e.g. ./prisma/dev.db
  const absFromEnv = path.resolve(cwd, relFromEnv || "");

  const existsRel  = relFromEnv ? fs.existsSync(relFromEnv)  : false;
  const existsAbs  = relFromEnv ? fs.existsSync(absFromEnv)  : false;

  return Response.json({
    cwd,
    dbUrl,
    relFromEnv,
    absFromEnv,
    existsRel,
    existsAbs,
  });
}
