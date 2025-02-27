import { eq } from "drizzle-orm";
import { db } from "../db";
import { transactions } from "../db/schema";



export const addTransaction = async (user_id: string, amount: number, tag_id: string, timestamp: number) => {
    return await db.insert(transactions).values(
        {
            user_id,
            amount,
            tag_id,
            timestamp: new Date(timestamp),
            transaction_type: "outgoing", // or "incoming" based on your needs
        }
    )
}

export const getTransactionsByUserId = async (user_id: string) => {
    return await db.query.transactions.findMany({
        where: eq(transactions.user_id, user_id),
    });
}