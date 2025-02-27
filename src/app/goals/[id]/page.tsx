import { getGoalById } from "~/server/queries/goals";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { GoalChart } from "~/app/goals/[id]/goal-chart";
import { PlantVisualizer } from "~/components/goals/plant-visualizer";
import Image from "next/image";
import {
  BookOpenText,
  Calendar,
  CheckCircle,
  Clock,
  FilePlus,
  Flag,
  HandCoins,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { AddFundsDialog } from "./add-funds-dialog";
import { RemoveFundsDialog } from "./remove-funds-dialog";
import { ShareGoalDialog } from "./share-goal-dialog";

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
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between">
                <h4 className="text-xl font-bold">{goal.name}</h4>
                <div className="space-x-2">
                  <RemoveFundsDialog goal_id={id} />
                  <AddFundsDialog goal_id={id} />
                  <ShareGoalDialog goal_id={id} />
                </div>
                {/* <Button className="ml-4">Add funds</Button> */}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex">
              <div>
                <PlantVisualizer
                  goal={goal}
                  style={{}}
                  width={200}
                  height={200}
                />
              </div>
              <div className="ml-8 flex flex-col justify-center space-y-4">
                <div className="flex">
                  <Calendar />
                  <div className="ml-2 font-semibold">
                    Due date: {goal.target_date?.toLocaleString()}
                  </div>
                </div>
                <div className="flex">
                  <HandCoins />
                  <div className="ml-2 font-semibold">
                    Collected : ${goal.amount}
                  </div>
                </div>
                <div className="flex">
                  <Flag />
                  <div className="ml-2 font-semibold">
                    Target: ${goal.target}
                  </div>
                </div>
                <div className="flex">
                  <BookOpenText />
                  <div className="ml-2 font-semibold">
                    Description: {goal.description}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>
              <h4 className="text-xl font-bold">Goal progress</h4>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <GoalChart progress={goal.amount} total={goal.target} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
