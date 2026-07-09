const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && email.length <= 254 && EMAIL_RE.test(email);
}

export function isValidPassword(password: unknown): password is string {
  return typeof password === "string" && password.length >= 8 && password.length <= 200;
}

export function isValidName(name: unknown): name is string {
  return typeof name === "string" && name.trim().length >= 1 && name.length <= 100;
}

/**
 * 8-12 chars, lowercase letters/digits/dashes, no leading/trailing dash.
 * Matches the slug shape produced by `slugifyUsername` at signup so
 * user-chosen usernames stay consistent with auto-generated ones.
 */
const USERNAME_RE = /^[a-z0-9][a-z0-9-]{6,10}[a-z0-9]$/;

export function isValidUsername(username: unknown): username is string {
  return typeof username === "string" && USERNAME_RE.test(username);
}

export function isValidBio(bio: unknown): bio is string {
  return typeof bio === "string" && bio.length <= 280;
}

/**
 * Object storage path, e.g. "/objects/uploads/<uuid>". Never a full URL.
 * Scoped to the "uploads/" prefix, matching the only prefix the api-server
 * upload/serve routes actually use — rejects anything else outright.
 */
export function isValidObjectPath(path: unknown): path is string {
  return typeof path === "string" && path.length <= 512 && /^\/objects\/uploads\/[\w.-]+$/.test(path);
}
