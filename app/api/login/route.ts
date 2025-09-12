import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const res = NextResponse.redirect(new URL("/projects", req.url));
  res.cookies.set("auth", "1", { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 7 });
  return res;
}
