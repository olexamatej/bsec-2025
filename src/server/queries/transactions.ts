import { eq } from "drizzle-orm";
import { db } from "../db";
import { transactions, standingOrderType } from "../db/schema";



export const addTransaction = async (user_id: string, amount: number, tag_id: string, timestamp: number, description: string, transaction_type: typeof standingOrderType['enumValues'][number]) => {
    return await db.insert(transactions).values(
        {
            user_id,
            amount,
            tag_id,
            timestamp: new Date(timestamp),
            transaction_type,
            description
        }
    )
}

export const getTransactionsByUserId = async (user_id: string) => {
    return await db.query.transactions.findMany({
        where: eq(transactions.user_id, user_id),
        with: {
            tag: true,
        },
    });
}

export type TransactionWithDeps = Awaited<ReturnType<typeof getTransactionsByUserId>>[number];

export const deleteTransaction = async (id: string) => {
    return await db.delete(transactions).where(eq(transactions.id, id));
}