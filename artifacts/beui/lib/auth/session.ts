import "server-only";
import { randomBytes } from "node:crypto";
import { eq, lt } from "drizzle-orm";
import { cookies } from "next/headers";
import { db, sessionsTable, type User } from "@workspace/db";
import { SESSION_COOKIE_NAME, SESSION_TTL_MS } from "./constants";
import { findUserById } from "./db-users";

/** Creates a new session row and sets the httpOnly session cookie. */
export async function createSession(userId: number): Promise<void> {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await db.insert(sessionsTable).values({ id: token, userId, expiresAt });

  const jar = await cookies();
  jar.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  // Best-effort cleanup of expired sessions so the table doesn't grow forever.
  void db.delete(sessionsTable).where(lt(sessionsTable.expiresAt, new Date()));
}

/** Reads the session cookie and resolves the associated user, if valid. */
export async function getSessionUser(): Promise<User | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;

  const [session] = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.id, token))
    .limit(1);

  if (!session || session.expiresAt.getTime() < Date.now()) {
    if (session) {
      // Session row is expired — remove it and clear the stale cookie.
      await db.delete(sessionsTable).where(eq(sessionsTable.id, token));
    }
    jar.delete(SESSION_COOKIE_NAME);
    return null;
  }

  const user = await findUserById(session.userId);
  return user ?? null;
}

/** Deletes the current session from the database and clears the cookie. */
export async function destroySession(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE_NAME)?.value;

  if (token) {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, token));
  }

  jar.delete(SESSION_COOKIE_NAME);
}
