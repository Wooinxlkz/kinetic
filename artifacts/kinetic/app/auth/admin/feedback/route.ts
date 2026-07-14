import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getAllFeedback } from "@/lib/feedback";

export async function GET() {
  const sessionUser = await getSessionUser();
  if (!sessionUser?.isDev) {
    return NextResponse.json({ error: "Dev access only" }, { status: 403 });
  }

  const feedback = await getAllFeedback();
  return NextResponse.json(feedback);
}
