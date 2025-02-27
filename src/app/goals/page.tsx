import { cookies } from "next/headers";
import Meadow from "~/components/goals/meadow";
import { getGoalsByUserId } from "~/server/queries/goals";

export default async function Page() {
  const cookieList = await cookies();
  const userId = cookieList.get("selectedUserId")?.value;
  const goals = await getGoalsByUserId(
    userId ?? "c3b9cd23-1298-41a1-889c-8f7639aff150",
  );

  return (
    <div className="h-full w-full items-center justify-center">
      <Meadow flowers={goals} />
    </div>
  );
}
