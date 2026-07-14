import "server-only";
import { desc, eq } from "drizzle-orm";
import { db, feedbackTable, type Feedback } from "@workspace/db";

/** The only valid "what's this about" values from the /docs/help contact form. */
export const CONTACT_TYPES = ["feedback", "bug", "help", "other"] as const;
export type ContactType = (typeof CONTACT_TYPES)[number];

export function isValidContactType(value: unknown): value is ContactType {
  return typeof value === "string" && (CONTACT_TYPES as readonly string[]).includes(value);
}

export async function createFeedback(params: {
  type: ContactType;
  email: string;
  message: string;
}): Promise<Feedback> {
  const [row] = await db
    .insert(feedbackTable)
    .values({ type: params.type, email: params.email, message: params.message })
    .returning();
  return row;
}

/** All feedback submissions for the Dev Center's Feedback Inbox tab, newest first. */
export async function getAllFeedback(): Promise<Feedback[]> {
  return db.select().from(feedbackTable).orderBy(desc(feedbackTable.createdAt));
}

export async function setFeedbackRead(id: number, read: boolean): Promise<Feedback | undefined> {
  const [row] = await db
    .update(feedbackTable)
    .set({ read })
    .where(eq(feedbackTable.id, id))
    .returning();
  return row;
}

export async function deleteFeedbackById(id: number): Promise<boolean> {
  const [row] = await db.delete(feedbackTable).where(eq(feedbackTable.id, id)).returning();
  return !!row;
}
