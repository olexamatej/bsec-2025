import { eq } from "drizzle-orm";
import { db } from "../db";
import { goalCheckpoints, goals } from "../db/schema";

export const addGoal = async (
  user_id: string,
  name: string,
  amount: number,
  target: number,
  target_date: Date | null,
) => {
<<<<<<< HEAD
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
=======
    return await db.insert(goals).values({
        user_id,
        name,
        amount,
        target,
        target_date: target_date,
    }).returning();
};

export const getGoalsByUserId = async (user_id: string) => {
    return await db.query.goals.findMany({
        where: eq(goals.user_id, user_id),
        with: {
            checkpoints: true,
        },
    });
>>>>>>> ca63fa869251370331da3cf551bb8206c4a3438b
};

export const deleteGoal = async (id: string) => {
  return await db.delete(goals).where(eq(goals.id, id));
};

export const getGoalById = async (id: string) => {
<<<<<<< HEAD
  return await db.query.goals.findFirst({
    where: eq(goals.id, id),
  });
};

export type GoalWithDeps = Awaited<ReturnType<typeof getGoalsByUserId>>[number];
=======
    return await db.query.goals.findFirst({
        where: eq(goals.id, id),
        with: {
            checkpoints: true,
        }
    });
}

export type GoalWithDeps = Awaited<ReturnType<typeof getGoalsByUserId>>[number];

export const addGoalCheckpoint = async (goal_id: string, interval_amount: number, interval: number) => {
    return await db.insert(goalCheckpoints).values({
        goal_id,
        interval_amount,
        interval,
    });
};
>>>>>>> ca63fa869251370331da3cf551bb8206c4a3438b
