import { NextResponse } from "next/server";
import { createSession, findOrCreateDevUser, toPublicUser } from "@/lib/auth";
import { isValidDevPin, isValidName } from "@/lib/auth/validation";

// Small in-memory rate limit — resets on server restart. There is exactly
// one dev credential shared by everyone who reaches this route, so the
// lockout is intentionally global rather than keyed by client IP: IP
// headers are attacker-controlled and easy to spoof, which would make a
// per-IP lockout trivial to bypass. Good enough for a hidden, low-traffic
// entry point; not meant to be bulletproof against a distributed attacker.
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 30_000;
let attemptState = { count: 0, lockedUntil: 0 };

export async function POST(req: Request) {
  if (attemptState.lockedUntil > Date.now()) {
    return NextResponse.json(
      { error: "Too many attempts. Try again shortly." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { pin, name } = (body ?? {}) as Record<string, unknown>;

  const devPin = process.env.DEV_PIN;
  const devName = process.env.DEV_NAME;
  if (!devPin || !devName) {
    return NextResponse.json({ error: "Dev sign-in is not configured." }, { status: 503 });
  }

  const valid =
    isValidDevPin(pin) &&
    pin === devPin &&
    isValidName(name) &&
    (name as string).trim().toLowerCase() === devName.trim().toLowerCase();

  if (!valid) {
    attemptState.count += 1;
    if (attemptState.count >= MAX_ATTEMPTS) {
      attemptState = { count: 0, lockedUntil: Date.now() + LOCKOUT_MS };
    }
    return NextResponse.json({ error: "Invalid PIN or name." }, { status: 401 });
  }

  attemptState = { count: 0, lockedUntil: 0 };

  let user;
  try {
    user = await findOrCreateDevUser((name as string).trim());
  } catch {
    // The reserved "dev" username was somehow occupied by a non-dev row —
    // fail closed rather than signing in as the wrong account.
    return NextResponse.json({ error: "Dev sign-in is not available right now." }, { status: 503 });
  }
  if (user.suspended) {
    return NextResponse.json({ error: "This account has been suspended." }, { status: 403 });
  }

  await createSession(user.id);

  return NextResponse.json(toPublicUser(user));
}
