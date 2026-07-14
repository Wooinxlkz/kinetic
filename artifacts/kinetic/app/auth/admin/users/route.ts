import { NextResponse } from "next/server";
import { getAllUsersForAdmin, getSessionUser } from "@/lib/auth";

export async function GET() {
  const sessionUser = await getSessionUser();
  if (!sessionUser?.isDev) {
    return NextResponse.json({ error: "Dev access only" }, { status: 403 });
  }

  const users = await getAllUsersForAdmin();
  return NextResponse.json(users);
}
