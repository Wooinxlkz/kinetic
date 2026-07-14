import { NextResponse } from "next/server";
import { getSessionUser, generateSwitchToken } from "@/lib/auth";

/** Authenticated endpoint — generates/refreshes a 5-day switch token for the
 *  currently signed-in user and returns it so the client can persist it
 *  alongside the saved-account entry in localStorage. */
export async function POST() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const token = await generateSwitchToken(user.id);
  return NextResponse.json({ token });
}
