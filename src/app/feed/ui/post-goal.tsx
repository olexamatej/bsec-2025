import { Card, CardContent } from "~/components/ui/card";
import type { Post } from "../lib/get-posts";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { goalTransactions } from "~/server/db/schema";
import { GoalChart } from "~/app/goals/[id]/goal-chart";

export async function PostGoal({ goal }: { goal: NonNullable<Post["goal"]> }) {
  const txs = await db.query.goalTransactions.findMany({
    where: eq(goalTransactions.goal_id, goal.id),
  });

  const incoming = txs
    .filter((tx) => tx.order_type === "incoming")
    .reduce((acc, tx) => acc + tx.amount, 0);
  const outgoing = txs
    .filter((tx) => tx.order_type === "outgoing")
    .reduce((acc, tx) => acc + tx.amount, 0);

  const paidTowardsGoal = incoming - outgoing;

  return (
    <Card>
      <CardContent className="flex justify-between pt-6">
        <div className="space-y-2">
          <span className="whitespace-nowrap">
            {goal.user.display_name}{" "}
            {goal.amount <= paidTowardsGoal ? "reached" : "shared"} a goal
          </span>
          <GoalChart progress={paidTowardsGoal} total={goal.target} />
        </div>
        <div className="flex flex-col items-end justify-center space-y-2">
          <span>{goal.name}</span>
          <span className="text-end text-sm">{goal.description}</span>
        </div>
      </CardContent>
    </Card>
  );
}
