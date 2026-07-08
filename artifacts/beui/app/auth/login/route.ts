import { NextResponse } from "next/server";
import {
  createSession,
  findUserByEmail,
  toPublicUser,
  verifyPassword,
} from "@/lib/auth";
import { isValidEmail, isValidPassword } from "@/lib/auth/validation";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email, password } = (body ?? {}) as Record<string, unknown>;

  if (!isValidEmail(email) || !isValidPassword(password)) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await findUserByEmail(normalizedEmail);

  // Compare against a dummy hash when the user doesn't exist so response
  // timing doesn't reveal whether an email is registered.
  const valid = user
    ? await verifyPassword(password, user.passwordHash)
    : await verifyPassword(password, "0".repeat(32) + ":" + "0".repeat(128));

  if (!user || !valid) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  await createSession(user.id);

  return NextResponse.json(toPublicUser(user));
}
