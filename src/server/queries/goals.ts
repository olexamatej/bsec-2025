import { eq } from "drizzle-orm";
import { db } from "../db";
import { goals } from "../db/schema";

export const addGoal = async (
    user_id: string,
    name: string,
    amount: number,
    target: number,
    target_date: Date | null
) => {
    return await db.insert(goals).values({
        user_id,
        name,
        amount,
        target,
        target_date: target_date,
    });
};

export const getGoalsByUserId = async (user_id: string) => {
    return await db.query.goals.findMany({
        where: eq(goals.user_id, user_id),
    });
};

export const deleteGoal = async (id: string) => {
    return await db.delete(goals).where(eq(goals.id, id));
};

export const getGoalById = async (id: string) => {
    return await db.query.goals.findFirst({
        where: eq(goals.id, id),
    });
}

export type GoalWithDeps = Awaited<ReturnType<typeof getGoalsByUserId>>[number]; 