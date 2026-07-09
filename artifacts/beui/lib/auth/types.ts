/** Shape of a user as returned to the client — never includes passwordHash. */
export interface PublicUser {
  id: number;
  name: string;
  email: string;
  username: string;
  avatarColor: string;
  bio: string | null;
  avatarUrl: string | null;
  bannerUrl: string | null;
  createdAt: string;
}

/** Public-facing subset shown on someone else's profile page (hides email). */
export interface PublicProfile {
  username: string;
  name: string;
  avatarColor: string;
  bio: string | null;
  avatarUrl: string | null;
  bannerUrl: string | null;
  createdAt: string;
}
