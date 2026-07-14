import { NextResponse } from "next/server";
import { getSessionUser, isUsernameTaken, toPublicUser, updateUserProfile } from "@/lib/auth";
import { isValidBio, isValidName, isValidObjectPath, isValidUsername } from "@/lib/auth/validation";

/** Updates the signed-in user's own profile (name, bio, avatar, banner). */
export async function PATCH(req: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, username, bio, avatarUrl, bannerUrl } = (body ?? {}) as Record<string, unknown>;
  const updates: {
    name?: string;
    username?: string;
    bio?: string | null;
    avatarUrl?: string | null;
    bannerUrl?: string | null;
  } = {};

  if (name !== undefined) {
    if (!isValidName(name)) {
      return NextResponse.json({ error: "Please enter a valid name" }, { status: 400 });
    }
    updates.name = name.trim();
  }

  if (username !== undefined) {
    const normalized = typeof username === "string" ? username.trim().toLowerCase() : username;
    if (!isValidUsername(normalized)) {
      return NextResponse.json(
        { error: "Username must be 8-12 characters: lowercase letters, numbers, and dashes" },
        { status: 400 },
      );
    }
    if (await isUsernameTaken(normalized, sessionUser.id)) {
      return NextResponse.json({ error: "That username is already taken" }, { status: 409 });
    }
    updates.username = normalized;
  }

  if (bio !== undefined) {
    if (bio !== null && !isValidBio(bio)) {
      return NextResponse.json({ error: "Bio must be 280 characters or fewer" }, { status: 400 });
    }
    updates.bio = bio === null ? null : bio.trim() || null;
  }

  if (avatarUrl !== undefined) {
    if (avatarUrl !== null && !isValidObjectPath(avatarUrl)) {
      return NextResponse.json({ error: "Invalid avatar image" }, { status: 400 });
    }
    updates.avatarUrl = avatarUrl;
  }

  if (bannerUrl !== undefined) {
    if (bannerUrl !== null && !isValidObjectPath(bannerUrl)) {
      return NextResponse.json({ error: "Invalid banner image" }, { status: 400 });
    }
    updates.bannerUrl = bannerUrl;
  }

  try {
    const updated = await updateUserProfile(sessionUser.id, updates);
    return NextResponse.json(toPublicUser(updated));
  } catch (err) {
    // Defense-in-depth against a race between the isUsernameTaken check above
    // and the write (two requests picking the same username concurrently);
    // the column's unique constraint is the actual source of truth.
    if (err instanceof Error && "code" in err && (err as { code: string }).code === "23505") {
      return NextResponse.json({ error: "That username is already taken" }, { status: 409 });
    }
    throw err;
  }
}
