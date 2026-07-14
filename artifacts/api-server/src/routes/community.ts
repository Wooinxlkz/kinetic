import { and, count, desc, eq, ilike, or, sql } from "drizzle-orm";
import { Router, type IRouter, type Request, type Response } from "express";
import {
  communityComponentsTable,
  db,
  usersTable,
  type CommunityComponent,
  type User,
} from "@workspace/db";
import {
  CreateCommunityComponentBody,
  DeleteCommunityComponentParams,
  GetCommunityComponentParams,
  ListCommunityComponentsQueryParams,
  ListUserCommunityComponentsParams,
  UpdateCommunityComponentBody,
  UpdateCommunityComponentParams,
} from "@workspace/api-zod";
import { getPublishLimit } from "../lib/communityLimits";
import { requireSessionUser } from "../lib/sessionAuth";

const router: IRouter = Router();

/** Shape returned to clients — nests author info, never exposes userId directly. */
function toResponse(row: CommunityComponent, author: User) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    category: row.category,
    tags: row.tags,
    code: row.code,
    demoCode: row.demoCode ?? null,
    views: row.views,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
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

function slugify(name: string): string {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || "component";
}

/** Generates a globally unique slug from `name`, retrying with a random suffix on collision. */
async function generateUniqueSlug(name: string): Promise<string> {
  const base = slugify(name);
  let candidate = base;
  for (let attempt = 0; attempt < 6; attempt++) {
    const [existing] = await db
      .select({ id: communityComponentsTable.id })
      .from(communityComponentsTable)
      .where(eq(communityComponentsTable.slug, candidate))
      .limit(1);
    if (!existing) return candidate;
    candidate = `${base}-${Math.random().toString(36).slice(2, 7)}`;
  }
  throw new Error("Failed to generate a unique slug after 6 attempts");
}

function normalizeTags(tags: string[] | undefined): string[] {
  if (!tags) return [];
  const seen = new Set<string>();
  for (const raw of tags) {
    const tag = raw.trim().toLowerCase();
    if (tag) seen.add(tag);
  }
  return Array.from(seen).slice(0, 6);
}

/* ─────────────────────────────────────────────────────────────────────────────
   GET /community/components
   List published community submissions. Public, no auth required.
───────────────────────────────────────────────────────────────────────────── */
router.get("/community/components", async (req: Request, res: Response): Promise<void> => {
  const parsedQuery = ListCommunityComponentsQueryParams.safeParse(req.query);
  if (!parsedQuery.success) {
    res.status(400).json({ error: parsedQuery.error.message });
    return;
  }
  const { category, tag, q, sort } = parsedQuery.data;

  try {
    const conditions = [
      category ? eq(communityComponentsTable.category, category) : undefined,
      tag ? sql`${tag} = ANY(${communityComponentsTable.tags})` : undefined,
      q ? or(ilike(communityComponentsTable.name, `%${q}%`), ilike(communityComponentsTable.description, `%${q}%`)) : undefined,
    ].filter((c) => c !== undefined);

    const rows = await db
      .select({ component: communityComponentsTable, author: usersTable })
      .from(communityComponentsTable)
      .innerJoin(usersTable, eq(communityComponentsTable.userId, usersTable.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(
        sort === "popular"
          ? desc(communityComponentsTable.views)
          : desc(communityComponentsTable.createdAt),
      )
      .limit(200);

    res.json(rows.map((r) => toResponse(r.component, r.author)));
  } catch (error) {
    req.log.error({ err: error }, "Failed to list community components");
    res.status(500).json({ error: "Failed to load community components" });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   POST /community/components
   Publishes immediately. Enforces the caller's plan-based publish quota.
───────────────────────────────────────────────────────────────────────────── */
router.post("/community/components", requireSessionUser, async (req: Request, res: Response): Promise<void> => {
  const parsed = CreateCommunityComponentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const user = req.sessionUser!;

  try {
    const limit = getPublishLimit(user.plan);
    if (limit !== null) {
      const [{ used }] = await db
        .select({ used: count() })
        .from(communityComponentsTable)
        .where(eq(communityComponentsTable.userId, user.id));
      if (Number(used) >= limit) {
        res.status(403).json({
          error: `You've reached your publish limit (${limit}) for the ${user.plan} plan. Upgrade your membership to publish more.`,
        });
        return;
      }
    }

    const slug = await generateUniqueSlug(parsed.data.name);
    const [row] = await db
      .insert(communityComponentsTable)
      .values({
        userId: user.id,
        slug,
        name: parsed.data.name.trim(),
        description: parsed.data.description.trim(),
        category: parsed.data.category,
        tags: normalizeTags(parsed.data.tags),
        code: parsed.data.code,
        demoCode: parsed.data.demoCode?.trim() || null,
      })
      .returning();

    res.status(201).json(toResponse(row, user));
  } catch (error) {
    req.log.error({ err: error }, "Failed to publish community component");
    res.status(500).json({ error: "Failed to publish component" });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   GET /community/components/:id
───────────────────────────────────────────────────────────────────────────── */
router.get("/community/components/:id", async (req: Request, res: Response): Promise<void> => {
  const params = GetCommunityComponentParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  try {
    const [row] = await db
      .update(communityComponentsTable)
      .set({ views: sql`${communityComponentsTable.views} + 1` })
      .where(eq(communityComponentsTable.id, params.data.id))
      .returning();

    if (!row) {
      res.status(404).json({ error: "Component not found" });
      return;
    }

    const [author] = await db.select().from(usersTable).where(eq(usersTable.id, row.userId)).limit(1);
    if (!author) {
      res.status(404).json({ error: "Component not found" });
      return;
    }

    res.json(toResponse(row, author));
  } catch (error) {
    req.log.error({ err: error }, "Failed to fetch community component");
    res.status(500).json({ error: "Failed to load component" });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   PATCH /community/components/:id — author only
───────────────────────────────────────────────────────────────────────────── */
router.patch("/community/components/:id", requireSessionUser, async (req: Request, res: Response): Promise<void> => {
  const params = UpdateCommunityComponentParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateCommunityComponentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  try {
    const [existing] = await db
      .select()
      .from(communityComponentsTable)
      .where(eq(communityComponentsTable.id, params.data.id))
      .limit(1);
    if (!existing) {
      res.status(404).json({ error: "Component not found" });
      return;
    }
    if (existing.userId !== req.sessionUser!.id) {
      res.status(403).json({ error: "You can only edit your own published work" });
      return;
    }

    const updates: Partial<typeof existing> = {};
    if (parsed.data.name !== undefined) updates.name = parsed.data.name.trim();
    if (parsed.data.description !== undefined) updates.description = parsed.data.description.trim();
    if (parsed.data.category !== undefined) updates.category = parsed.data.category;
    if (parsed.data.tags !== undefined) updates.tags = normalizeTags(parsed.data.tags);
    if (parsed.data.code !== undefined) updates.code = parsed.data.code;
    if (parsed.data.demoCode !== undefined) updates.demoCode = parsed.data.demoCode?.trim() || null;

    const [row] = await db
      .update(communityComponentsTable)
      .set(updates)
      .where(eq(communityComponentsTable.id, params.data.id))
      .returning();

    res.json(toResponse(row, req.sessionUser!));
  } catch (error) {
    req.log.error({ err: error }, "Failed to update community component");
    res.status(500).json({ error: "Failed to update component" });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   DELETE /community/components/:id — author or dev only
───────────────────────────────────────────────────────────────────────────── */
router.delete("/community/components/:id", requireSessionUser, async (req: Request, res: Response): Promise<void> => {
  const params = DeleteCommunityComponentParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  try {
    const [existing] = await db
      .select()
      .from(communityComponentsTable)
      .where(eq(communityComponentsTable.id, params.data.id))
      .limit(1);
    if (!existing) {
      res.status(404).json({ error: "Component not found" });
      return;
    }
    if (existing.userId !== req.sessionUser!.id && !req.sessionUser!.isDev) {
      res.status(403).json({ error: "You can only delete your own published work" });
      return;
    }

    await db.delete(communityComponentsTable).where(eq(communityComponentsTable.id, params.data.id));
    res.sendStatus(204);
  } catch (error) {
    req.log.error({ err: error }, "Failed to delete community component");
    res.status(500).json({ error: "Failed to delete component" });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   GET /community/users/:username/components — public profile listing
───────────────────────────────────────────────────────────────────────────── */
router.get("/community/users/:username/components", async (req: Request, res: Response): Promise<void> => {
  const params = ListUserCommunityComponentsParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  try {
    const [author] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, params.data.username))
      .limit(1);
    if (!author) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const rows = await db
      .select()
      .from(communityComponentsTable)
      .where(eq(communityComponentsTable.userId, author.id))
      .orderBy(desc(communityComponentsTable.createdAt));

    res.json(rows.map((row) => toResponse(row, author)));
  } catch (error) {
    req.log.error({ err: error }, "Failed to list user's community components");
    res.status(500).json({ error: "Failed to load published work" });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   GET /community/quota
───────────────────────────────────────────────────────────────────────────── */
router.get("/community/quota", requireSessionUser, async (req: Request, res: Response): Promise<void> => {
  const user = req.sessionUser!;
  try {
    const limit = getPublishLimit(user.plan);
    const [{ used }] = await db
      .select({ used: count() })
      .from(communityComponentsTable)
      .where(eq(communityComponentsTable.userId, user.id));

    const usedNum = Number(used);
    res.json({
      plan: user.plan,
      limit,
      used: usedNum,
      remaining: limit === null ? null : Math.max(0, limit - usedNum),
    });
  } catch (error) {
    req.log.error({ err: error }, "Failed to load publish quota");
    res.status(500).json({ error: "Failed to load publish quota" });
  }
});

export default router;
