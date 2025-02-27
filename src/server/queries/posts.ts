import { db } from "../db";
import { posts } from "../db/schema";

export const createPostWithTransaction = async (user_id: string, content: string, transaction_id: string): Promise<any> => {

    const post = await db.insert(posts).values({

        user_id,
        content,
        transaction_id,
    }).returning();

    return post;
}

export const createPostWithGoal = async (user_id: string, content: string, goal_id: string): Promise<any> => {

    const post = await db.insert(posts).values({

        user_id,
        content,
        goal_id,
    }).returning();

    return post;
}