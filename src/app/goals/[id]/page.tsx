import { getGoalById } from "~/server/queries/goals";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { GoalChart } from "~/app/goals/[id]/GoalChart";

export default async function GoalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const goal = await getGoalById(id);

  if (!goal) {
    return <div>Goal not found</div>;
  }

  return (
    <div className="space-y-6">
      {/*  Goal overview */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Transactions */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>{goal.name}</CardTitle>
            <CardDescription>Target {goal.target}</CardDescription>
          </CardHeader>
          <CardContent>
            <GoalChart progress={275} total={475} />
          </CardContent>
        </Card>

        {/* Idk */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Ahoj</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
