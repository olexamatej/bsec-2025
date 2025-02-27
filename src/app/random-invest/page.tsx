import { getUserId } from "~/lib/get-user-id";
import { getUserById } from "~/server/queries/user";

export default async function OrdersPage() {
  const userId = await getUserId();
  const user = await getUserById(userId);

  return <div className="min-h-screen bg-background"></div>;
}
