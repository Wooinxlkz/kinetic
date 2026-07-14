import "server-only";
import { count, desc, eq, sql } from "drizzle-orm";
import {
  communityComponentsTable,
  db,
  usersTable,
  type CommunityComponent as CommunityComponentRow,
  type User,
} from "@workspace/db";
import { getPublishLimit } from "./limits";
import type { CommunityCategory, CommunityComponentDTO, CommunityQuota } from "./types";

function toDTO(row: CommunityComponentRow, author: User): CommunityComponentDTO {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    category: row.category as CommunityCategory,
    tags: row.tags,
    code: row.code,
    demoCode: row.demoCode ?? null,
    views: row.views,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    author: {
      id: author.id,
      name: author.name,
      username: author.username,
      avatarColor: author.avatarColor,
      avatarUrl: author.avatarUrl,
      isDev: author.isDev,
    },
  };
}

/** All published community submissions, newest first. Used by /discover —
 * filtering/search/sort happens client-side over this array. */
export async function listPublishedComponents(): Promise<CommunityComponentDTO[]> {
  const rows = await db
    .select({ component: communityComponentsTable, author: usersTable })
    .from(communityComponentsTable)
    .innerJoin(usersTable, eq(communityComponentsTable.userId, usersTable.id))
    .orderBy(desc(communityComponentsTable.createdAt))
    .limit(300);
  return rows.map((r) => toDTO(r.component, r.author));
}

/** Fetches a single published component by slug and increments its view count. */
export async function getPublishedComponentBySlug(
  slug: string,
): Promise<CommunityComponentDTO | undefined> {
  const [row] = await db
    .update(communityComponentsTable)
    .set({ views: sql`${communityComponentsTable.views} + 1` })
    .where(eq(communityComponentsTable.slug, slug))
    .returning();
  if (!row) return undefined;

  const [author] = await db.select().from(usersTable).where(eq(usersTable.id, row.userId)).limit(1);
  if (!author) return undefined;

  return toDTO(row, author);
}

/** A user's own published work, for their profile page. `author` is already
 * known by the caller (the profile owner), so no join is needed. */
export async function getUserPublishedComponents(
  userId: number,
  author: User,
): Promise<CommunityComponentDTO[]> {
  const rows = await db
    .select()
    .from(communityComponentsTable)
    .where(eq(communityComponentsTable.userId, userId))
    .orderBy(desc(communityComponentsTable.createdAt));
  return rows.map((row) => toDTO(row, author));
}

export async function getPublishQuota(userId: number, plan: string): Promise<CommunityQuota> {
  const limit = getPublishLimit(plan);
  const [{ used }] = await db
    .select({ used: count() })
    .from(communityComponentsTable)
    .where(eq(communityComponentsTable.userId, userId));
  const usedNum = Number(used);
  return {
    plan,
    limit,
    used: usedNum,
    remaining: limit === null ? null : Math.max(0, limit - usedNum),
  };
}
