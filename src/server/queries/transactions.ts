import { eq } from "drizzle-orm";
import { db } from "../db";
import { transactions } from "../db/schema";

export const addTransaction = async (accountId: number, amount: number) => {
    return await db.insert(transactions).values({
        accountId,
        amount,
    });
}

export const getTransactionsByAccountId = async (accountId: number) => {
    return await db.query.transactions.findMany({
        where: eq(transactions.accountId, accountId),
    });
}