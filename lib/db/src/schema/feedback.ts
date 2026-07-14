import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

// Submissions from the "Contact us" dialog on /docs/help. Stored so the dev
// account can read/triage them from the Dev Center's Feedback Inbox tab, in
// addition to the existing mailto fallback (kept so contact still works even
// if this table/endpoint is unavailable).
export const feedbackTable = pgTable("feedback", {
  id: serial("id").primaryKey(),
  // One of the CONTACT_TYPES values from the help page: "feedback", "bug",
  // "help", or "other".
  type: text("type").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertFeedbackSchema = createInsertSchema(feedbackTable).omit({
  id: true,
  createdAt: true,
});
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
export type Feedback = typeof feedbackTable.$inferSelect;
