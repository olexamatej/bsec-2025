import { eq } from "drizzle-orm";
import { db } from "../db";
import { type User, users } from "../db/schema";

export const getUserById = async (id: string) => {
  return await db.query.users.findFirst({
    where: eq(users.id, id),
    with: {
      transactions: true,
      goals: true,
      tags: true,
    },
  });
};

export type UserWithDeps = Awaited<ReturnType<typeof getUserById>>;


export const getUsers = async () => {
  return await db.query.users.findMany();
};
