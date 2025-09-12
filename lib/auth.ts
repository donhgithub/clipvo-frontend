// lib/auth.ts
import "server-only";
import { cookies } from "next/headers";

export async function getAuth() {
  const store = await cookies();           // <- await here
  const c = store.get("auth");
  return { isSignedIn: c?.value === "1" };
}
