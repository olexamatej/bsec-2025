import { eq } from "drizzle-orm";
import { db } from "../db";
import { type User, users, goalTransactions, type Goal } from "../db/schema";

export const getUserById = async (id: string) => {
  const out = await db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      transactions: true,
      goals: true,
      tags: true,
    },
  });

  for (const goal of out?.goals ?? []) {
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
    goal.amount = paidTowardsGoal
  }

  return out;
};

export type UserWithDeps = Awaited<ReturnType<typeof getUserById>>;


export const getUsers = async () => {
  return await db.query.users.findMany();
};
