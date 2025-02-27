import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

export const getUserById = async (id: string) => {
    return await db.query.users.findFirst({
        where: eq(users.id, id),
        with: {
            transactions: true,
        }
    });
}

