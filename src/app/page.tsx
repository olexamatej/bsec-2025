// app/page.tsx
import { Dashboard } from "~/app/_components/dashboard";
import { getUserById } from "~/server/queries/user";

export default async function HomePage() {
  const user = await getUserById("c3b9cd23-1298-41a1-889c-8f7639aff150");
  //TEMP FIX
  const balance = 1337.42;

  if (!user) {
    return <div>Error: User not found</div>;
  }

  return <Dashboard user={user} balance={balance} tags={user.tags} />;
}
