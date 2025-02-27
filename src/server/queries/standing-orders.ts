import { eq } from "drizzle-orm";
import { db } from "../db";
import { standingOrders } from "../db/schema";

export const getStandingOrdersByUserId = async (user_id: string) => {
    return await db.query.standingOrders.findMany({
        where: eq(standingOrders.user_id, user_id),
        with: {
            tag: true,
        },
    });
}

export type StandingOrderWithDeps = Awaited<ReturnType<typeof getStandingOrdersByUserId>>[number];

export const deleteStandingOrder = async (id: string) => {
    return await db.delete(standingOrders).where(eq(standingOrders.id, id));
}

export const addStandingOrder = async (
    user_id: string,
    amount: number,
    tag_id: string | null,
    interval_start: Date,
    interval_end: Date,
    interval: number,
    interval_amount: number,
    order_type: "incoming" | "outgoing",
    description: string
) => {
    return await db.insert(standingOrders).values({
        user_id,
        amount,
        tag_id,
        interval_start,
        interval_end,
        interval,
        interval_amount,
        order_type,
        description,
    });
} 