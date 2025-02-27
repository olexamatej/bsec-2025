import { eq } from "drizzle-orm";
import { db } from "../db"
import { goalTransactions, goals } from "../db/schema";
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
    });

    return goalTransaction;
}

