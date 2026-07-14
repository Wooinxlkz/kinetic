import { NextResponse } from "next/server";
import { findUserBySwitchToken, toPublicUser, createSession, generateSwitchToken } from "@/lib/auth";

/** Public endpoint — no active session required. Accepts a switch token,
 *  validates it against the DB (must exist and not be expired), creates a
 *  fresh session, and rotates the token so the used value cannot be replayed.
 *  Returns both the user and the new switch token for the client to persist.
 *  Falls back with 401 if the token is invalid/expired. */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { token } = (body ?? {}) as Record<string, unknown>;

  if (!token || typeof token !== "string") {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const user = await findUserBySwitchToken(token);
  if (!user) {
    return NextResponse.json({ error: "Token expired or invalid" }, { status: 401 });
  }
  if (user.suspended) {
    return NextResponse.json({ error: "This account has been suspended." }, { status: 403 });
  }

  // Create the new session and rotate the switch token atomically so the
  // consumed token cannot be replayed by anyone who observed it in transit.
  const [, newSwitchToken] = await Promise.all([
    createSession(user.id),
    generateSwitchToken(user.id),
  ]);

  return NextResponse.json({ user: toPublicUser(user), switchToken: newSwitchToken });
}
