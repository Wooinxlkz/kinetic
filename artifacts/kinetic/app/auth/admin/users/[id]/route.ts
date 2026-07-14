import { NextResponse } from "next/server";
import { deleteUserById, getSessionUser, setUserPlan, setUserSuspended } from "@/lib/auth";

const VALID_PLANS = ["free", "pro", "sponsor", "lifetime"] as const;
type ValidPlan = (typeof VALID_PLANS)[number];

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
  const userId = Number(id);
  if (!Number.isInteger(userId)) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const b = (body ?? {}) as Record<string, unknown>;

  // Plan change
  if ("plan" in b) {
    const { plan, planExpiresAt } = b;
    if (!VALID_PLANS.includes(plan as ValidPlan)) {
      return NextResponse.json({ error: "Invalid plan value" }, { status: 400 });
    }
    const expiresAt =
      typeof planExpiresAt === "string" && planExpiresAt
        ? new Date(planExpiresAt)
        : null;

    const updated = await setUserPlan(userId, plan as ValidPlan, expiresAt);
    if (!updated) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  }

  // Suspension toggle
  const { suspended } = b;
  if (typeof suspended !== "boolean") {
    return NextResponse.json({ error: "suspended must be a boolean" }, { status: 400 });
  }

  if (userId === sessionUser.id) {
    return NextResponse.json({ error: "You can't suspend your own account" }, { status: 400 });
  }

  const updated = await setUserSuspended(userId, suspended);
  if (!updated) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const sessionUser = await requireDev();
  if (!sessionUser) {
    return NextResponse.json({ error: "Dev access only" }, { status: 403 });
  }

  const { id } = await params;
  const userId = Number(id);
  if (!Number.isInteger(userId)) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }
  if (userId === sessionUser.id) {
    return NextResponse.json({ error: "You can't delete your own account" }, { status: 400 });
  }

  const deleted = await deleteUserById(userId);
  if (!deleted) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
