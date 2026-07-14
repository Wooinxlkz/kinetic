import { NextResponse } from "next/server";
import { getSessionUser, SESSION_COOKIE_NAME } from "@/lib/auth";
import { db, sessionsTable } from "@workspace/db";
import { and, eq, ne } from "drizzle-orm";
import { cookies } from "next/headers";

export async function POST() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const jar = await cookies();
  const currentToken = jar.get(SESSION_COOKIE_NAME)?.value;

  if (!currentToken) {
    return NextResponse.json({ error: "Session not found" }, { status: 400 });
  }

  await db
    .delete(sessionsTable)
    .where(and(eq(sessionsTable.userId, user.id), ne(sessionsTable.id, currentToken)));

  return NextResponse.json({ ok: true });
}
