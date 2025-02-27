import { and, eq, gte, lt } from "drizzle-orm";
import { db } from "../db";
import { goalTransactions, type GoalCheckpoint } from "../db/schema";
import { getGoalById } from "./goals";

interface CheckpointStatus {
    goalId: string;
    goalName: string;
    checkpointId: string;
    intervalStart: Date;
    intervalEnd: Date;
    expectedAmount: number;
    actualAmount: number;
    isFulfilled: boolean;
    deficit: number;
}

export async function validateGoalCheckpointsWithDates(goalId: string): Promise<CheckpointStatus[]> {
    const results: CheckpointStatus[] = [];
    const goal = await getGoalById(goalId);

    if (!goal) {
        throw new Error("Goal not found");
    }

    const now = new Date();

    if (goal.checkpoints.length === 0) {
        return [];
    }

    const checkpoint = goal.checkpoints[0] as GoalCheckpoint;

    // Calculate all the checkpoint periods from start date until now
    const checkpointPeriods: { start: Date, end: Date }[] = [];
    let currentStart = new Date(checkpoint.interval_start);

    while (currentStart < now) {
        const periodEnd = new Date(currentStart);
        periodEnd.setDate(currentStart.getDate() + checkpoint.interval);

        checkpointPeriods.push({
            start: currentStart,
            end: periodEnd
        });

        // Move to next period
        currentStart = new Date(periodEnd);
    }

    // For each period, check if it was fulfilled
    for (const period of checkpointPeriods) {
        // Get transactions for this specific period
        const periodTxs = await db.query.goalTransactions.findMany({
            where: and(
                eq(goalTransactions.goal_id, goalId),
                gte(goalTransactions.created_at, period.start),
                lt(goalTransactions.created_at, period.end)
            )
        });

        // Calculate actual amount from transactions in this period
        let actualAmount = 0;
        for (const tx of periodTxs) {
            if (tx.order_type === "incoming") {
                actualAmount += tx.amount;
            } else if (tx.order_type === "outgoing") {
                actualAmount -= tx.amount;
            }
        }

        const expectedAmount = checkpoint.interval_amount;
        const isFulfilled = actualAmount >= expectedAmount;
        const deficit = isFulfilled ? 0 : expectedAmount - actualAmount;


        results.push({
            goalId: goal.id,
            goalName: goal.name,
            checkpointId: checkpoint.id,
            intervalStart: period.start,
            intervalEnd: period.end,
            expectedAmount,
            actualAmount,
            isFulfilled,
            deficit
        });
    }

    return results;
}