import { NextResponse } from "next/server";

function clear(res: NextResponse, req: Request) {
  // delete the "auth" cookie
  res.cookies.set("auth", "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}

export async function POST(req: Request) {
  return clear(NextResponse.redirect(new URL("/", req.url)), req);
}

export async function GET(req: Request) {   // enables visiting /api/logout in the URL bar
  return clear(NextResponse.redirect(new URL("/", req.url)), req);
}
