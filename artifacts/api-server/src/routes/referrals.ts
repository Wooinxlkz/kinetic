import { randomBytes } from "crypto";
import { and, count, eq, sql } from "drizzle-orm";
import { Router, type IRouter, type Request, type Response } from "express";
import { db, referralCodesTable, referralsTable } from "@workspace/db";
import { requireSessionUser } from "../lib/sessionAuth";

/** Returns true if an error is a Postgres unique-violation (code 23505). */
function isUniqueViolation(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code: unknown }).code === "23505"
  );
}

const router: IRouter = Router();

const MAX_REWARDS_PER_YEAR = 3;

/** Generate a cryptographically random 10-character hex referral code. */
function generateCode(): string {
  return randomBytes(5).toString("hex");
}

/**
 * Fetch the existing referral code for `userId`, or atomically create one.
 * Retries up to 5 times on the unlikely event of a collision.
 */
async function getOrCreateCode(userId: number): Promise<string> {
  const [existing] = await db
    .select()
    .from(referralCodesTable)
    .where(eq(referralCodesTable.userId, userId))
    .limit(1);
  if (existing) return existing.code;

  for (let attempt = 0; attempt < 5; attempt++) {
    const code = generateCode();
    const [conflict] = await db
      .select({ id: referralCodesTable.id })
      .from(referralCodesTable)
      .where(eq(referralCodesTable.code, code))
      .limit(1);
    if (conflict) continue;

    await db.insert(referralCodesTable).values({ userId, code });
    return code;
  }

  throw new Error("Failed to generate a unique referral code after 5 attempts");
}

/* ─────────────────────────────────────────────────────────────────────────────
   GET /referrals/me
   Returns the authenticated user's referral code, stats, and referral list.
   Creates a code automatically on first access.
───────────────────────────────────────────────────────────────────────────── */
router.get("/referrals/me", requireSessionUser, async (req: Request, res: Response) => {
  const userId = req.sessionUser!.id;

  try {
    const code = await getOrCreateCode(userId);
    const thisYear = new Date().getFullYear();

    const referrals = await db
      .select()
      .from(referralsTable)
      .where(eq(referralsTable.referrerId, userId))
      .orderBy(referralsTable.createdAt);

    const rewardedThisYear = referrals.filter(
      (r) => r.status === "rewarded" && r.rewardYear === thisYear,
    ).length;
    const totalRewarded = referrals.filter((r) => r.status === "rewarded").length;

    res.json({
      code,
      stats: {
        rewardedThisYear,
        totalRewarded,
        maxPerYear: MAX_REWARDS_PER_YEAR,
      },
      referrals: referrals.map((r) => ({
        id: r.id,
        status: r.status,
        createdAt: r.createdAt,
        subscribedAt: r.subscribedAt ?? null,
        rewardedAt: r.rewardedAt ?? null,
      })),
    });
  } catch (error) {
    req.log.error({ err: error }, "Failed to fetch referral info");
    res.status(500).json({ error: "Failed to load referral info" });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   POST /referrals/register
   Called after a new user signs up to associate them with a referrer's code.
   Body: { code: string }
───────────────────────────────────────────────────────────────────────────── */
router.post("/referrals/register", requireSessionUser, async (req: Request, res: Response) => {
  const referredId = req.sessionUser!.id;
  const { code } = req.body as { code?: unknown };

  if (!code || typeof code !== "string" || code.trim() === "") {
    res.status(400).json({ error: "Missing or invalid referral code" });
    return;
  }

  try {
    // Look up the referrer by code (case-insensitive)
    const [referralCode] = await db
      .select()
      .from(referralCodesTable)
      .where(eq(referralCodesTable.code, code.trim().toLowerCase()))
      .limit(1);

    if (!referralCode) {
      res.status(400).json({ error: "Invalid referral code" });
      return;
    }

    if (referralCode.userId === referredId) {
      res.status(400).json({ error: "You cannot use your own referral code" });
      return;
    }

    // Guard: each user can only be referred once
    const [alreadyReferred] = await db
      .select({ id: referralsTable.id })
      .from(referralsTable)
      .where(eq(referralsTable.referredId, referredId))
      .limit(1);

    if (alreadyReferred) {
      res.status(409).json({ error: "You have already been referred" });
      return;
    }

    try {
      await db.insert(referralsTable).values({
        referrerId: referralCode.userId,
        referredId,
        status: "pending",
      });
    } catch (insertErr) {
      if (isUniqueViolation(insertErr)) {
        res.status(409).json({ error: "You have already been referred" });
        return;
      }
      throw insertErr;
    }

    res.json({ success: true, message: "Referral registered" });
  } catch (error) {
    req.log.error({ err: error }, "Failed to register referral");
    res.status(500).json({ error: "Failed to register referral" });
  }
});

/* ─────────────────────────────────────────────────────────────────────────────
   POST /referrals/complete
   Webhook endpoint — called by a payment provider when a referred user
   successfully subscribes. Protected by the X-Referral-Secret header.
   Body: { referredUserId: number }
───────────────────────────────────────────────────────────────────────────── */
router.post("/referrals/complete", async (req: Request, res: Response) => {
  const secret = process.env.REFERRAL_WEBHOOK_SECRET;
  if (!secret) {
    req.log.warn("REFERRAL_WEBHOOK_SECRET is not set — webhook endpoint disabled");
    res.status(503).json({ error: "Referral webhook is not configured on this server" });
    return;
  }

  const provided = req.headers["x-referral-secret"];
  if (!provided || provided !== secret) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { referredUserId } = req.body as { referredUserId?: unknown };
  if (!referredUserId || typeof referredUserId !== "number") {
    res.status(400).json({ error: "Missing or invalid referredUserId" });
    return;
  }

  try {
    const thisYear = new Date().getFullYear();
    const now = new Date();

    // Everything inside a single serializable transaction with a row-level
    // lock on the referral row so concurrent webhook deliveries cannot both
    // pass the cap check and over-grant rewards.
    const result = await db.transaction(async (tx) => {
      // Lock the specific referral row (FOR UPDATE) so concurrent calls block here.
      const [referral] = await tx.execute<{
        id: number;
        referrer_id: number;
        referred_id: number;
        status: string;
      }>(
        sql`
          SELECT id, referrer_id, referred_id, status
          FROM referrals
          WHERE referred_id = ${referredUserId}
            AND status = 'pending'
          LIMIT 1
          FOR UPDATE
        `,
      );

      if (!referral) {
        return { found: false, rewarded: false };
      }

      // Count rewards already granted to referrer this year (within the same tx).
      const [{ rewardCount }] = await tx
        .select({ rewardCount: count() })
        .from(referralsTable)
        .where(
          and(
            eq(referralsTable.referrerId, referral.referrer_id),
            eq(referralsTable.status, "rewarded"),
            eq(referralsTable.rewardYear, thisYear),
          ),
        );

      if (Number(rewardCount) >= MAX_REWARDS_PER_YEAR) {
        await tx
          .update(referralsTable)
          .set({ status: "subscribed", subscribedAt: now })
          .where(eq(referralsTable.id, referral.id));
        return { found: true, rewarded: false, referrerId: referral.referrer_id };
      }

      await tx
        .update(referralsTable)
        .set({ status: "rewarded", subscribedAt: now, rewardedAt: now, rewardYear: thisYear })
        .where(eq(referralsTable.id, referral.id));

      return { found: true, rewarded: true, referrerId: referral.referrer_id };
    });

    if (!result.found) {
      res.json({ success: false, rewarded: false, message: "No pending referral found for this user" });
      return;
    }

    if (!result.rewarded) {
      res.json({ success: true, rewarded: false, message: "Subscription recorded but referrer has reached the yearly reward cap (3/year)" });
      return;
    }

    req.log.info(
      { referrerId: result.referrerId, referredId: referredUserId },
      "Referral reward granted — 1 free month",
    );
    res.json({ success: true, rewarded: true, message: "Referrer rewarded with 1 free month" });
  } catch (error) {
    req.log.error({ err: error }, "Failed to complete referral");
    res.status(500).json({ error: "Failed to complete referral" });
  }
});

export default router;
