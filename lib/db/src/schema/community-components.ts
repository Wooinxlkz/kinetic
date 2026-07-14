import { sql } from "drizzle-orm";
import { check, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

/** Community "publish your work" submissions — kept fully separate from the
 * site's own curated component library (kinetic `lib/registry.ts`). These
 * rows power /discover and never appear on /components. */
export const COMMUNITY_CATEGORIES = ["component", "block", "pattern"] as const;

export const communityComponentsTable = pgTable(
  "community_components",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    // URL-safe, globally unique slug derived from name at creation time.
    // Not user-editable — regenerating it would break existing links.
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    category: text("category").notNull().default("component"),
    tags: text("tags").array().notNull().default(sql`'{}'::text[]`),
    // The actual component source — what users copy/install. May have named
    // exports and local imports that the sandbox can't resolve on its own.
    code: text("code").notNull(),
    // Optional standalone demo that imports and renders `code`. When present,
    // the preview sandbox concatenates both files (stripping the demo's
    // import of the component file) so everything is in scope. When absent,
    // `code` itself is rendered directly (legacy / simple self-contained case).
    demoCode: text("demo_code"),
    views: integer("views").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    check(
      "community_components_category_check",
      sql`${t.category} IN ('component', 'block', 'pattern')`,
    ),
  ],
);

export const insertCommunityComponentSchema = createInsertSchema(communityComponentsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  views: true,
});
export type InsertCommunityComponent = z.infer<typeof insertCommunityComponentSchema>;
export type CommunityComponent = typeof communityComponentsTable.$inferSelect;
