/** Client-side mirror of `lib/auth/types.ts` — kept dependency-free so it
 * can be imported from client components without pulling in server code. */
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  username: string;
  avatarColor: string;
  bio: string | null;
  avatarUrl: string | null;
  bannerUrl: string | null;
  createdAt: string;
  /** Membership plan — "free", "pro", "sponsor", or "lifetime" (reserved, unused). */
  plan: string;
  /** True only for the hidden developer account. Grants the verified badge and /dev-center access. */
  isDev: boolean;
}
