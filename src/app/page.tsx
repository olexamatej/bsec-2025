// app/page.tsx
import { Dashboard } from "~/app/_components/dashboard";
import { getUserId } from "~/lib/get-user-id";
import { getUserById } from "~/server/queries/user";

export default async function HomePage() {
  const userId = await getUserId();
  const user = await getUserById(userId);
  //TEMP FIX
  const balance = 1337.42;

  if (!user) {
    return <div>Error: User not found</div>;
  }

  return <Dashboard user={user} balance={balance} tags={user.tags} />;
}
