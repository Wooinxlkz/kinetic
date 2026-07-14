import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { eq, and, count as drizzleCount } from "drizzle-orm";
import { cookies } from "next/headers";
import { db, copyUsageTable } from "@workspace/db";
import { getSessionUser } from "@/lib/auth/session";

// Always run fresh — never serve a cached quota count.
export const dynamic = "force-dynamic";

const ANON_COOKIE_NAME = "anon_id";
const ANON_COOKIE_TTL_MS = 1000 * 60 * 60 * 24 * 365; // 1 year

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

async function resolveSubject(): Promise<{ subject: string; jar: Awaited<ReturnType<typeof cookies>> }> {
  const jar = await cookies();
  const user = await getSessionUser();

  if (user) {
    return { subject: `user:${user.id}`, jar };
  }

  let anonId = jar.get(ANON_COOKIE_NAME)?.value;
  if (!anonId) {
    anonId = randomUUID();
    jar.set(ANON_COOKIE_NAME, anonId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ANON_COOKIE_TTL_MS / 1000,
    });
  }
  return { subject: `anon:${anonId}`, jar };
}

/**
 * Returns today's unique-component count for the current subject.
 * Used by the membership page usage counter widget.
 */
export async function GET() {
  try {
    const { subject } = await resolveSubject();
    const day = todayUtc();

    const [row] = await db
      .select({ total: drizzleCount() })
      .from(copyUsageTable)
      .where(and(eq(copyUsageTable.subject, subject), eq(copyUsageTable.day, day)));

    return NextResponse.json(
      { count: row?.total ?? 0, today: day },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { count: 0, today: todayUtc() },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}

/**
 * Records that a component was copied or expanded today.
 * Body: { slug: string } — the component slug (e.g. "orbiting-circles").
 * De-duplicated by (subject, day, slug): copy + expand on the same component
 * both count as the same 1 use. Returns { ok, counted } where counted=true
 * means this slug was new today and the quota counter should increment.
 */
export async function POST(req: Request) {
  try {
    const { subject } = await resolveSubject();
    const day = todayUtc();

    let slug = "misc";
    try {
      const body = await req.json();
      if (typeof body?.slug === "string" && body.slug.length > 0) {
        slug = body.slug.slice(0, 128); // cap length
      }
    } catch {
      // no body or invalid JSON — use default slug
    }

    const inserted = await db
      .insert(copyUsageTable)
      .values({ subject, day, slug, count: 1 })
      .onConflictDoNothing()
      .returning({ id: copyUsageTable.id });

    const counted = inserted.length > 0;
    return NextResponse.json({ ok: true, counted });
  } catch {
    return NextResponse.json({ ok: false, counted: false });
  }
}
