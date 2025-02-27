import { db } from "../db";

export const getTags = async () => {
    return await db.query.tags.findMany();
}