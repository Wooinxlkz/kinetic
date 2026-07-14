/**
 * Publish quota per membership plan. Must stay in sync with
 * `artifacts/api-server/src/lib/communityLimits.ts` — the API server is the
 * source of truth for enforcement; this copy is only used to render quota
 * server-side on the profile page without an extra network hop.
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
