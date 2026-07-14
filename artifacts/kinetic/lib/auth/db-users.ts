import "server-only";
import { randomBytes } from "node:crypto";
import { desc, eq } from "drizzle-orm";
import { db, usersTable, type User } from "@workspace/db";
import { hashPassword } from "./password";
import { pickAvatarColor, slugifyUsername, SWITCH_TOKEN_TTL_MS } from "./constants";
import type { PublicProfile, PublicUser } from "./types";

export function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    avatarColor: user.avatarColor,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    bannerUrl: user.bannerUrl,
    createdAt: user.createdAt.toISOString(),
    plan: user.plan,
    isDev: user.isDev,
  };
}

export function toPublicProfile(user: User): PublicProfile {
  return {
    username: user.username,
    name: user.name,
    avatarColor: user.avatarColor,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    bannerUrl: user.bannerUrl,
    createdAt: user.createdAt.toISOString(),
    isDev: user.isDev,
  };
}

/** Row shape returned to the Dev Center's user-management panel. Never includes passwordHash. */
export interface AdminUserRow {
  id: number;
  name: string;
  email: string;
  username: string;
  plan: string;
  planExpiresAt: string | null;
  isDev: boolean;
  suspended: boolean;
  createdAt: string;
}

function toAdminRow(user: User): AdminUserRow {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    username: user.username,
    plan: user.plan,
    planExpiresAt: user.planExpiresAt ? user.planExpiresAt.toISOString() : null,
    isDev: user.isDev,
    suspended: user.suspended,
    createdAt: user.createdAt.toISOString(),
  };
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);
  return user;
}

export async function findUserById(id: number): Promise<User | undefined> {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id))
    .limit(1);
  return user;
}

export async function findUserByUsername(username: string): Promise<User | undefined> {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .limit(1);
  return user;
}

/** Reserved usernames that normal signup/profile-edit must never claim. */
const RESERVED_USERNAMES = new Set(["dev"]);

/** Generates a unique username from a display name, appending -2, -3, ... on collision. */
async function generateUniqueUsername(name: string): Promise<string> {
  const base = slugifyUsername(name);
  let candidate = base;
  let suffix = 1;
  while (RESERVED_USERNAMES.has(candidate) || (await findUserByUsername(candidate))) {
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }
  return candidate;
}

export async function createUser(params: {
  name: string;
  email: string;
  password: string;
}): Promise<User> {
  const passwordHash = await hashPassword(params.password);
  const username = await generateUniqueUsername(params.name);
  const [user] = await db
    .insert(usersTable)
    .values({
      name: params.name,
      email: params.email,
      username,
      passwordHash,
      avatarColor: pickAvatarColor(params.email),
    })
    .returning();
  return user;
}

/** True if `username` belongs to a different user (or no one). */
export async function isUsernameTaken(username: string, excludeUserId: number): Promise<boolean> {
  const existing = await findUserByUsername(username);
  return existing !== undefined && existing.id !== excludeUserId;
}

export async function updateUserProfile(
  userId: number,
  updates: Partial<Pick<User, "name" | "username" | "bio" | "avatarUrl" | "bannerUrl">>,
): Promise<User> {
  const [user] = await db
    .update(usersTable)
    .set(updates)
    .where(eq(usersTable.id, userId))
    .returning();
  return user;
}

/**
 * Sets a user's membership plan by their billing email, as reported by a
 * DodoPayments webhook. Silently no-ops if no account uses that email —
 * webhooks must never throw for unmatched customers.
 */
export async function setUserPlanByEmail(
  email: string,
  plan: "free" | "pro" | "sponsor" | "lifetime",
): Promise<User | undefined> {
  const [user] = await db
    .update(usersTable)
    .set({ plan, planUpdatedAt: new Date() })
    .where(eq(usersTable.email, email.trim().toLowerCase()))
    .returning();
  return user;
}

/**
 * Generates (or refreshes) a 5-day switch token for the given user.
 * Stores the token + expiry in the DB and returns the raw token string
 * for the client to persist alongside the saved-account entry.
 */
export async function generateSwitchToken(userId: number): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SWITCH_TOKEN_TTL_MS);
  await db
    .update(usersTable)
    .set({ switchToken: token, switchTokenExpiresAt: expiresAt })
    .where(eq(usersTable.id, userId));
  return token;
}

/**
 * Looks up a user by their switch token. Returns undefined if the token
 * doesn't exist or has expired — the caller must fall back to a password flow.
 */
export async function findUserBySwitchToken(token: string): Promise<User | undefined> {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.switchToken, token))
    .limit(1);
  if (!user || !user.switchTokenExpiresAt || user.switchTokenExpiresAt < new Date()) {
    return undefined;
  }
  return user;
}

/** Fixed username/email for the single hidden developer account. */
const DEV_USERNAME = "dev";
const DEV_EMAIL = "dev@internal.local";

/**
 * Finds the hidden developer account, creating it on first successful
 * PIN + name sign-in. The account is not reachable through normal signup
 * (its email/username are reserved) and always carries `isDev: true`.
 */
export async function findOrCreateDevUser(devName: string): Promise<User> {
  const existing = await findUserByUsername(DEV_USERNAME);
  if (existing) {
    // Defense-in-depth: the "dev" username is reserved from normal signup
    // (see RESERVED_USERNAMES), but if it were ever occupied by a non-dev
    // row we must never bind dev sign-in to it.
    if (!existing.isDev) {
      throw new Error(
        "The reserved 'dev' username is occupied by a non-dev account. Refusing to sign in as dev.",
      );
    }
    return existing;
  }

  // Random, never-used password hash — this account only ever signs in
  // through the dev-login route, never through the normal password flow.
  const passwordHash = await hashPassword(randomBytes(32).toString("hex"));
  const [user] = await db
    .insert(usersTable)
    .values({
      name: devName,
      email: DEV_EMAIL,
      username: DEV_USERNAME,
      passwordHash,
      avatarColor: pickAvatarColor(DEV_EMAIL),
      isDev: true,
    })
    .returning();
  return user;
}

/** All users for the Dev Center's user-management panel, newest first. */
export async function getAllUsersForAdmin(): Promise<AdminUserRow[]> {
  const rows = await db.select().from(usersTable).orderBy(desc(usersTable.createdAt));
  return rows.map(toAdminRow);
}

/**
 * Admin-only: changes a user's plan and optionally sets an expiry date.
 * Pass `planExpiresAt: null` to clear the expiry (e.g. for lifetime/free).
 */
export async function setUserPlan(
  userId: number,
  plan: "free" | "pro" | "sponsor" | "lifetime",
  planExpiresAt: Date | null,
): Promise<AdminUserRow | undefined> {
  const [user] = await db
    .update(usersTable)
    .set({ plan, planUpdatedAt: new Date(), planExpiresAt })
    .where(eq(usersTable.id, userId))
    .returning();
  return user ? toAdminRow(user) : undefined;
}

/** Toggles suspension. Suspended users are blocked at the login route. */
export async function setUserSuspended(userId: number, suspended: boolean): Promise<AdminUserRow | undefined> {
  const [user] = await db
    .update(usersTable)
    .set({ suspended })
    .where(eq(usersTable.id, userId))
    .returning();
  return user ? toAdminRow(user) : undefined;
}

/** Permanently deletes a user account. Never allowed on the dev account itself (checked by caller). */
export async function deleteUserById(userId: number): Promise<boolean> {
  const result = await db.delete(usersTable).where(eq(usersTable.id, userId)).returning({ id: usersTable.id });
  return result.length > 0;
}
