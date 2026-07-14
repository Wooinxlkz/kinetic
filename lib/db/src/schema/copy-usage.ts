import { integer, pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";

/**
 * Tracks daily copy/expand usage per subject per component.
 * `subject` is either `user:<id>` for signed-in users or `anon:<uuid>` for
 * signed-out visitors (uuid comes from a httpOnly cookie set server-side).
 * `slug` is the component slug (e.g. "orbiting-circles") so that copy + expand
 * on the same component count as 1, not 2. The unique constraint on
 * (subject, day, slug) makes the server idempotent — ON CONFLICT DO NOTHING
 * is used for every insert, and the caller is told whether it actually counted.
 */
export const copyUsageTable = pgTable(
  "copy_usage",
  {
    id: serial("id").primaryKey(),
    subject: text("subject").notNull(),
    // Calendar day in UTC, formatted YYYY-MM-DD.
    day: text("day").notNull(),
    // Component slug — deduplication key so copy+expand on the same component = 1 use.
    slug: text("slug").notNull().default(""),
    count: integer("count").notNull().default(1),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [unique("copy_usage_subject_day_slug_unique").on(t.subject, t.day, t.slug)],
);

export type CopyUsage = typeof copyUsageTable.$inferSelect;
