/** Client-side mirror of `lib/auth/types.ts` — kept dependency-free so it
 * can be imported from client components without pulling in server code. */
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  avatarColor: string;
  createdAt: string;
}
