import { check, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { usersTable } from "./users";

/**
 * One referral code per user. Generated on first access and never changes.
 * Used to construct the invite link: /?ref=<code>
 */
export const referralCodesTable = pgTable("referral_codes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .unique()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  code: text("code").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/**
 * Tracks every referral relationship.
 * - "pending"    → referred user signed up but has not subscribed yet
 * - "subscribed" → referred user subscribed but referrer hit the yearly cap (no reward)
 * - "rewarded"   → referred user subscribed and referrer received 1 free month
 *
 * Business rules (enforced server-side):
 *   • Each referred user can only be attributed to one referrer (referredId is UNIQUE).
 *   • Referrers earn at most MAX_REWARDS_PER_YEAR (3) rewards per calendar year.
 *   • Self-referrals are rejected at registration time.
 */
export const referralsTable = pgTable(
  "referrals",
  {
    id: serial("id").primaryKey(),
    referrerId: integer("referrer_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    // A given user can only have been referred once.
    referredId: integer("referred_id")
      .notNull()
      .unique()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    status: text("status").notNull().default("pending"),
    /** Calendar year the reward was issued — used for the yearly cap check. */
    rewardYear: integer("reward_year"),
    rewardedAt: timestamp("rewarded_at", { withTimezone: true }),
    subscribedAt: timestamp("subscribed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    // DB-enforced: status must be one of the three valid values
    check("referrals_status_check", sql`${t.status} IN ('pending', 'subscribed', 'rewarded')`),
    // DB-enforced: a user cannot refer themselves
    check("referrals_no_self_refer", sql`${t.referrerId} <> ${t.referredId}`),
  ],
);

export type ReferralCode = typeof referralCodesTable.$inferSelect;
export type Referral = typeof referralsTable.$inferSelect;
