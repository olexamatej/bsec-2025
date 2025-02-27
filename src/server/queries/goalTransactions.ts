import { eq } from "drizzle-orm";
import { db } from "../db"
import { type GoalTransaction, goalTransactions, goals } from "../db/schema";
import { getGoalById } from "./goals"

export async function addFundToGoal(goalId: string, amount: number) {
    const goal = await getGoalById(goalId);
    if (!goal) {
        throw new Error("Goal not found");
    }

    if (amount <= 0) {
        throw new Error("Amount must be greater than 0");
    }

    // update the goal amount
    await db.update(goals).set({
        amount: goal.amount + amount,
    }).where(eq(goals.id, goalId));

    const goalTransaction = await db.insert(goalTransactions).values({
        goal_id: goalId,
        order_type: "incoming",
        amount,
        created_at: new Date(),
    });

    return goalTransaction;
}

export async function removeFundFromGoal(goalId: string, amount: number) {
    const goal = await getGoalById(goalId);
    if (!goal) {
        throw new Error("Goal not found");
    }

    if (amount <= 0) {
        throw new Error("Amount must be greater than 0");
    }

    if (goal.amount - amount < 0) {
        throw new Error("Amount to remove is greater than the current amount");
    }


    // update the goal amount
    await db.update(goals).set({
        amount: goal.amount - amount,
    }).where(eq(goals.id, goalId));

    const goalTransaction = await db.insert(goalTransactions).values({
        goal_id: goalId,
        order_type: "outgoing",
        amount,
        created_at: new Date(),
    });

    return goalTransaction;
}


export async function getAllGoalTransactions(goalId: string): Promise<GoalTransaction[]> {
    return await db.query.goalTransactions.findMany({
        where: eq(goalTransactions.goal_id, goalId),
    });
}