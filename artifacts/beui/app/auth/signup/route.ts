import { NextResponse } from "next/server";
import {
  createSession,
  createUser,
  findUserByEmail,
  toPublicUser,
} from "@/lib/auth";
import { isValidEmail, isValidName, isValidPassword } from "@/lib/auth/validation";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, password } = (body ?? {}) as Record<string, unknown>;

  if (!isValidName(name)) {
    return NextResponse.json({ error: "Please enter your name" }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }
  if (!isValidPassword(password)) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters" },
      { status: 400 },
    );
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existing = await findUserByEmail(normalizedEmail);
  if (existing) {
    return NextResponse.json(
      { error: "An account with this email already exists" },
      { status: 409 },
    );
  }

  let user;
  try {
    user = await createUser({ name: name.trim(), email: normalizedEmail, password });
  } catch (err) {
    // Handles the race where two concurrent signups for the same email both
    // pass the pre-check above and hit the DB's unique constraint.
    if (err instanceof Error && /unique/i.test(err.message)) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 },
      );
    }
    throw err;
  }

  await createSession(user.id);

  return NextResponse.json(toPublicUser(user), { status: 201 });
}
