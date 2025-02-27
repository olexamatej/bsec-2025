import { desc } from "drizzle-orm";
import { db } from "~/server/db";
import { comments } from "~/server/db/schema";

export async function getPosts() {
  return db.query.posts.findMany({
    with: {
      comments: {
        orderBy: [desc(comments.createdAt)],
        with: {
          user: true,
        },
      },
      user: true,
      goal: {
        with: {
          user: true,
        },
      },
      transaction: {
        with: {
          tag: true,
          user: true,
        },
      },
    },
    orderBy: [desc(comments.createdAt)],
  });
}

export type Post = Awaited<ReturnType<typeof getPosts>>[number];
