import { NextResponse } from "next/server";
import { getSessionUser, destroySession, deleteUserById } from "@/lib/auth";

export async function DELETE(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email } = (body ?? {}) as Record<string, unknown>;

  if (typeof email !== "string" || email.trim().toLowerCase() !== user.email.toLowerCase()) {
    return NextResponse.json({ error: "Email does not match your account" }, { status: 400 });
  }

  // deleteUserById cascades — it removes all sessions for this user too
  const deleted = await deleteUserById(user.id);
  if (!deleted) return NextResponse.json({ error: "Account not found" }, { status: 404 });

  // Clear the session cookie (user row + sessions are already gone from the DB)
  await destroySession();

  return NextResponse.json({ ok: true });
}
