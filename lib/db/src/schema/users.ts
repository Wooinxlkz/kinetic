import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  // Public, URL-safe handle used for profile pages (e.g. /profile/jane-doe).
  // Auto-generated from name at signup; not user-editable yet.
  username: text("username").notNull().unique(),
  // Never store plaintext passwords. This column holds a salted hash in the
  // form `salt:hash` (see kinetic `lib/auth/password.ts` for the scrypt-based
  // hashing implementation).
  passwordHash: text("password_hash").notNull(),
  avatarColor: text("avatar_color").notNull(),
  bio: text("bio"),
  // Object storage paths (e.g. "/objects/uploads/<uuid>"), not full URLs.
  // Served through /api/storage/objects/<...>. Null means "use default".
  avatarUrl: text("avatar_url"),
  bannerUrl: text("banner_url"),
  // Used for the 5-day instant account-switch flow. A random token is
  // generated server-side when a user saves their account for quick switching.
  // Null means no active switch token. Validated by /auth/switch route.
  switchToken: text("switch_token"),
  switchTokenExpiresAt: timestamp("switch_token_expires_at", {
    withTimezone: true,
  }),
  // Membership plan — "free" (default), "pro", "sponsor", or "lifetime".
  // Set by the DodoPayments webhook when a checkout for that plan completes;
  // matched by billing email (see kinetic app/api/webhooks/dodopayments/route.ts).
  // "lifetime" is a reserved future value: no checkout product maps to it
  // yet, so no user can have this plan today.
  plan: text("plan").notNull().default("free"),
  planUpdatedAt: timestamp("plan_updated_at", { withTimezone: true }),
  // Optional expiry for time-limited plans (pro, sponsor). Null means the
  // plan does not expire (e.g. lifetime, or free). Set by the admin panel
  // or the DodoPayments webhook for subscription cancellations.
  planExpiresAt: timestamp("plan_expires_at", { withTimezone: true }),
  // True only for the single hidden developer account created by the
  // PIN + name dev sign-in flow (see kinetic app/auth/dev-login/route.ts).
  // Grants the verified badge and access to /dev-center.
  isDev: boolean("is_dev").notNull().default(false),
  // Set by a dev from the Dev Center user-management panel. Suspended
  // users are blocked from signing in (checked in the login route).
  suspended: boolean("suspended").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const insertUserSchema = createInsertSchema(usersTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof usersTable.$inferSelect;
