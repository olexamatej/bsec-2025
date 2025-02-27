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

export const getUsers = async (): Promise<User[]> => {
  return db.query.users.findMany();
};
