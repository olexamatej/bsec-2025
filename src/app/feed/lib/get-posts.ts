import { db } from "~/server/db";

export async function getPosts() {
  return db.query.posts.findMany({
    with: {
      comments: true,
      user: true,
      goal: true,
      transaction: {
        with: {
          tag: true,
        },
      },
    },
  });
}

export type Post = Awaited<ReturnType<typeof getPosts>>[number];
