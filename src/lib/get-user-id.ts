import { cookies } from "next/headers";

export async function getUserId() {
  const cookieList = await cookies();
  const userId = cookieList.get("selectedUserId")?.value;

  if (!userId) {
    return "c3b9cd23-1298-41a1-889c-8f7639aff150";
  }

  return userId;
}
