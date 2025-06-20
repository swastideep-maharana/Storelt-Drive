import { signOutUser } from "@/lib/actions/user.actions";
import { NextResponse } from "next/server";

export async function POST() {
  await signOutUser();
  return NextResponse.json({ success: true });
} 