/** Name of the httpOnly session cookie. */
export const SESSION_COOKIE_NAME = "kinetic_session";

/** Session lifetime in milliseconds (30 days). */
export const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

/** Switch-token lifetime in milliseconds (5 days). */
export const SWITCH_TOKEN_TTL_MS = 5 * 24 * 60 * 60 * 1000;

/** Palette used to derive a deterministic avatar color per account. */
export const AVATAR_COLORS = [
  "#f97316", // orange
  "#f43f5e", // rose
  "#8b5cf6", // violet
  "#06b6d4", // cyan
  "#22c55e", // green
  "#eab308", // yellow
  "#3b82f6", // blue
  "#ec4899", // pink
] as const;

export function pickAvatarColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

/** Turns a display name into a URL-safe base for a profile username. */
export function slugifyUsername(name: string): string {
  const slug = name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "user";
}
