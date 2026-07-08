/** Shape of a user as returned to the client — never includes passwordHash. */
export interface PublicUser {
  id: number;
  name: string;
  email: string;
  avatarColor: string;
  createdAt: string;
}
