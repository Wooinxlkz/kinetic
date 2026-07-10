import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { setUserPlanByEmail } from "@/lib/auth";

/**
 * Maps a DodoPayments product id to the membership plan it should unlock.
 * Keep in sync with the checkout links in
 * components/app/membership/plans-data.ts.
 */
const PRODUCT_TO_PLAN: Record<string, "pro" | "sponsor"> = {
  pdt_0NisoGPJcM5Teg8zGdfT8: "pro", // Pro — monthly
  pdt_0NisoOelj1LjqeOSXwk6y: "pro", // Pro — yearly
  pdt_0NisodeF2cjOsGDoA6AhR: "sponsor", // Sponsor — monthly
  pdt_0NisojMMWshe713iX5u4P: "sponsor", // Sponsor — yearly
};

/** Event types that mean "this purchase is now active/paid". */
const ACTIVATING_EVENTS = new Set([
  "payment.succeeded",
  "subscription.active",
  "subscription.renewed",
]);

/**
 * Verifies a Standard Webhooks-style signature (the scheme DodoPayments
 * uses). Secret is `whsec_<base64>`; signed message is
 * `${id}.${timestamp}.${rawBody}`; header carries one or more
 * space-separated `v1,<base64>` values — any match is accepted.
 */
function isValidSignature(params: {
  secret: string;
  id: string;
  timestamp: string;
  rawBody: string;
  signatureHeader: string;
}): boolean {
  const { secret, id, timestamp, rawBody, signatureHeader } = params;
  const secretBytes = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  const signedContent = `${id}.${timestamp}.${rawBody}`;
  const expected = createHmac("sha256", secretBytes).update(signedContent).digest();

  return signatureHeader
    .split(" ")
    .filter(Boolean)
    .some((part) => {
      const [, encoded] = part.split(",");
      if (!encoded) return false;
      try {
        const provided = Buffer.from(encoded, "base64");
        return (
          provided.length === expected.length && timingSafeEqual(provided, expected)
        );
      } catch {
        return false;
      }
    });
}

export async function POST(req: Request) {
  const secret = process.env.DODO_PAYMENTS_WEBHOOK_SECRET;
  if (!secret) {
    // Not configured yet — respond 200 so DodoPayments doesn't retry forever,
    // but do nothing. Nothing in the app currently depends on this route.
    return NextResponse.json({ received: true, skipped: "not configured" });
  }

  const rawBody = await req.text();
  const id = req.headers.get("webhook-id");
  const timestamp = req.headers.get("webhook-timestamp");
  const signature = req.headers.get("webhook-signature");

  if (!id || !timestamp || !signature) {
    return NextResponse.json({ error: "Missing signature headers" }, { status: 400 });
  }

  if (!isValidSignature({ secret, id, timestamp, rawBody, signatureHeader: signature })) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: unknown;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { type, data } = (event ?? {}) as {
    type?: string;
    data?: {
      product_id?: string;
      customer?: { email?: string };
      email?: string;
    };
  };

  if (!type || !ACTIVATING_EVENTS.has(type)) {
    return NextResponse.json({ received: true, skipped: "ignored event type" });
  }

  const productId = data?.product_id;
  const email = data?.customer?.email ?? data?.email;
  const plan = productId ? PRODUCT_TO_PLAN[productId] : undefined;

  if (!plan || !email) {
    return NextResponse.json({ received: true, skipped: "unmapped product or missing email" });
  }

  await setUserPlanByEmail(email, plan);

  return NextResponse.json({ received: true });
}
