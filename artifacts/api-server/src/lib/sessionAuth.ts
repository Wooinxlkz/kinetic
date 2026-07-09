import type { NextFunction, Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db, sessionsTable, usersTable, type User } from "@workspace/db";

/** Name of beui's httpOnly session cookie — see beui `lib/auth/constants.ts`. */
const SESSION_COOKIE_NAME = "kinetic_session";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      sessionUser?: User;
    }
  }
}

/**
 * Resolves the beui session cookie against the shared `sessions`/`users`
 * tables. This app has its own homegrown email/password auth (not Replit
 * Auth or passport), so the API server reads the same cookie beui issues
 * instead of relying on `req.isAuthenticated()`.
 */
export async function resolveSessionUser(req: Request): Promise<User | null> {
  const token = req.cookies?.[SESSION_COOKIE_NAME];
  if (!token || typeof token !== "string") return null;

  const [session] = await db
    .select()
    .from(sessionsTable)
    .where(eq(sessionsTable.id, token))
    .limit(1);
  if (!session || session.expiresAt.getTime() < Date.now()) return null;

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, session.userId))
    .limit(1);
  return user ?? null;
}

/** Requires a valid beui session; responds 401 and stops the chain if absent. */
export async function requireSessionUser(req: Request, res: Response, next: NextFunction) {
  const user = await resolveSessionUser(req);
  if (!user) {
    res.status(401).json({ error: "Not signed in" });
    return;
  }
  req.sessionUser = user;
  next();
}
