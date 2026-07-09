import "server-only";
import { randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
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

/** Generates a unique username from a display name, appending -2, -3, ... on collision. */
async function generateUniqueUsername(name: string): Promise<string> {
  const base = slugifyUsername(name);
  let candidate = base;
  let suffix = 1;
  while (await findUserByUsername(candidate)) {
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
