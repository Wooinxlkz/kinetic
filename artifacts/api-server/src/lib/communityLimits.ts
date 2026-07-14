/**
 * Publish quota per membership plan for community "publish your work"
 * submissions. `null` means unlimited. Unknown/missing plans fall back to
 * the free tier limit — never to unlimited.
 */
export const COMMUNITY_PUBLISH_LIMITS: Record<string, number | null> = {
  free: 10,
  pro: 25,
  sponsor: 60,
  lifetime: null,
};

export function getPublishLimit(plan: string): number | null {
  return plan in COMMUNITY_PUBLISH_LIMITS ? COMMUNITY_PUBLISH_LIMITS[plan] : COMMUNITY_PUBLISH_LIMITS.free;
}
