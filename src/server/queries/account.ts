import { eq } from "drizzle-orm";
import { db } from "../db";
import { accounts } from "../db/schema";

export const getAccountById = async (id: number) => {
    return await db.query.accounts.findFirst({
        where: eq(accounts.id, id),
        with: {
            transactions: true,
        }
    });
}

