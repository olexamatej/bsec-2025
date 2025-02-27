import { getGoalById } from "~/server/queries/goals";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { GoalChart } from "~/app/goals/[id]/goal-chart";
import { PlantVisualizer } from "~/components/goals/plant-visualizer";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUp,
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
import { validateGoalCheckpointsWithDates } from "~/server/queries/goal_checkpoints";
import { getAllGoalTransactions } from "~/server/queries/goalTransactions";
import { formatDistanceToNow } from "date-fns";

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

  const transactions = await getAllGoalTransactions(id);
  console.log(transactions);

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
          <CardFooter>
            <div className="flex w-full justify-end">
              <div className="space-x-2">
                <ShareGoalDialog goal_id={id} />
              </div>
              {/* <Button className="ml-4">Add funds</Button> */}
            </div>
          </CardFooter>
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
      <Card className="flex flex-col md:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Funds</CardTitle>
            <CardDescription>Your latest funds movement</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="space-y-4">
            {transactions
              .sort((a, b) => Number(b.created_at) - Number(a.created_at))
              .map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        transaction.order_type === "incoming"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {transaction.order_type === "incoming" ? (
                        <ArrowUp className="h-5 w-5 text-green-100" />
                      ) : (
                        <ArrowDown className="h-5 w-5 text-red-100" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2"></div>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(transaction.created_at!, {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      transaction.order_type === "incoming"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.order_type === "incoming" ? "+" : "-"}$
                    {transaction.amount.toFixed(2)}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
        <CardFooter className="mt-auto"></CardFooter>
      </Card>
    </div>
  );
}
