import { NextResponse } from "next/server";
import { createFeedback, isValidContactType } from "@/lib/feedback";
import { isValidEmail } from "@/lib/auth/validation";

/** Public endpoint backing the /docs/help "Contact us" dialog. No session
 *  required — anyone can submit feedback, same as the existing mailto flow
 *  this runs alongside. */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { type, email, message } = (body ?? {}) as Record<string, unknown>;

  if (!isValidContactType(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }
  if (typeof email !== "string" || !isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (typeof message !== "string" || !message.trim() || message.length > 4000) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  const row = await createFeedback({ type, email: email.trim(), message: message.trim() });
  return NextResponse.json({ id: row.id });
}
