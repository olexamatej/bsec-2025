// app/page.tsx
import { eq } from "drizzle-orm";
import { Dashboard } from "~/app/_components/dashboard";
import { getUserId } from "~/lib/get-user-id";
import { db } from "~/server/db";
import { userBalanceView } from "~/server/db/schema";
import { getUserById } from "~/server/queries/user";

export default async function HomePage() {
  const userId = await getUserId();
  const user = await getUserById(userId);
  //TEMP FIX
  const balances = await db
    .select()
    .from(userBalanceView)
    .where(eq(userBalanceView.user_id, userId));

  if (!user || !balances.length) {
    return <div>Error: User not found</div>;
  }

  return (
    <Dashboard user={user} balance={balances[0]!.amount} tags={user.tags} />
  );
}
