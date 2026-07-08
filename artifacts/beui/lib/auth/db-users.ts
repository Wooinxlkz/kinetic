import "server-only";
import { eq } from "drizzle-orm";
import { db, usersTable, type User } from "@workspace/db";
import { hashPassword } from "./password";
import { pickAvatarColor } from "./constants";
import type { PublicUser } from "./types";

export function toPublicUser(user: User): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarColor: user.avatarColor,
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

export async function createUser(params: {
  name: string;
  email: string;
  password: string;
}): Promise<User> {
  const passwordHash = await hashPassword(params.password);
  const [user] = await db
    .insert(usersTable)
    .values({
      name: params.name,
      email: params.email,
      passwordHash,
      avatarColor: pickAvatarColor(params.email),
    })
    .returning();
  return user;
}
