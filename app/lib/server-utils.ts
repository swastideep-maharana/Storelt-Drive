import { cookies } from "next/headers";

export async function isGuestServer() {
  const cookieStore = await cookies();
  return cookieStore.get("guest")?.value === "true";
}
