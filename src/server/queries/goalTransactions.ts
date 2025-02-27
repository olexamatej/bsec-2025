import { db } from "../db"
import { goalTransactions } from "../db/schema";
import { getGoalById } from "./goals"

export async function addFundToGoal(goalId: string, amount: number) {
    const goal = await getGoalById(goalId);
    if (!goal) {
        throw new Error("Goal not found");
    }

    if (amount <= 0) {
        throw new Error("Amount must be greater than 0");
    }

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

    const goalTransaction = await db.insert(goalTransactions).values({
        goal_id: goalId,
        order_type: "outgoing",
        amount,
    });

    return goalTransaction;
}

