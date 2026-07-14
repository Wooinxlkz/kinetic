import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { deleteFeedbackById, setFeedbackRead } from "@/lib/feedback";

async function requireDev() {
  const sessionUser = await getSessionUser();
  if (!sessionUser?.isDev) return null;
  return sessionUser;
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const sessionUser = await requireDev();
  if (!sessionUser) {
    return NextResponse.json({ error: "Dev access only" }, { status: 403 });
  }

  const { id } = await params;
  const feedbackId = Number(id);
  if (!Number.isInteger(feedbackId)) {
    return NextResponse.json({ error: "Invalid feedback id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const { read } = (body ?? {}) as Record<string, unknown>;
  if (typeof read !== "boolean") {
    return NextResponse.json({ error: "read must be a boolean" }, { status: 400 });
  }

  const updated = await setFeedbackRead(feedbackId, read);
  if (!updated) {
    return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const sessionUser = await requireDev();
  if (!sessionUser) {
    return NextResponse.json({ error: "Dev access only" }, { status: 403 });
  }

  const { id } = await params;
  const feedbackId = Number(id);
  if (!Number.isInteger(feedbackId)) {
    return NextResponse.json({ error: "Invalid feedback id" }, { status: 400 });
  }

  const deleted = await deleteFeedbackById(feedbackId);
  if (!deleted) {
    return NextResponse.json({ error: "Feedback not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
