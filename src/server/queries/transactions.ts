import { db } from "../db";
import { transactions } from "../db/schema";

export const addTransaction = async (accountId: number, amount: number) => {
    return await db.insert(transactions).values({
        accountId,
        amount,
    });
}