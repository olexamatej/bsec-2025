import Meadow from "~/components/goals/meadow";
import { getGoalsByUserId } from "~/server/queries/goals";

export default async function Page() {
  const goals = await getGoalsByUserId("c3b9cd23-1298-41a1-889c-8f7639aff150");

  return (
    <div className="h-full w-full items-center justify-center">
      <Meadow flowers={goals} />
    </div>
  );
}
